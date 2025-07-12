
"use client";

import { AppShell } from "@/components/shared/app-shell";
import { getCourseById } from "@/lib/firebase/firestore";
import type { Course } from "@/lib/courses-data";
import { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";
import { generateQuizAction, saveQuizResultAction, type QuizResult } from "../actions";
import type { QuizQuestion } from "@/ai/flows/generate-quiz-flow";
import { Loader2, Clock, CheckCircle, XCircle, ArrowLeft, Lightbulb, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

type QuizState = "loading" | "active" | "finished";

// Helper to format time from seconds to MM:SS
const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
}

export default function QuizPage() {
    const params = useParams();
    const courseId = params.courseId as string;
    const router = useRouter();
    const { toast } = useToast();

    const [quizState, setQuizState] = useState<QuizState>("loading");
    const [course, setCourse] = useState<Course | null>(null);
    const [questions, setQuestions] = useState<QuizQuestion[]>([]);
    const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [visitedQuestions, setVisitedQuestions] = useState<Set<number>>(new Set([0]));
    
    const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
    const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
    const [timePerQuestion, setTimePerQuestion] = useState<Record<number, number>>({});

    const timerRef = useRef<NodeJS.Timeout>();
    const startTimeRef = useRef<number>(Date.now());
    const questionStartTimeRef = useRef<number>(0);

    const finishQuiz = useCallback(async () => {
        clearInterval(timerRef.current);

        // Log time for the final question
        const finalTimeSpent = (Date.now() - questionStartTimeRef.current) / 1000;
        const finalTimes = {
            ...timePerQuestion,
            [currentQuestionIndex]: (timePerQuestion[currentQuestionIndex] || 0) + finalTimeSpent,
        };
        setTimePerQuestion(finalTimes);

        const timeTaken = Math.floor((Date.now() - startTimeRef.current) / 1000);
        let finalScore = 0;
        questions.forEach((q, index) => {
            if (userAnswers[index] === q.correctAnswerIndex) {
                finalScore++;
            }
        });

        const result: QuizResult = {
            courseId,
            score: finalScore,
            timeTaken,
            completedAt: new Date(),
            timePerQuestion: finalTimes,
        };
        setQuizResult(result);

        try {
            await saveQuizResultAction(result);
            toast({
                title: "Quiz Submitted!",
                description: `You scored ${finalScore}/${questions.length}.`,
                variant: 'success'
            });
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to save your quiz results.",
            });
        } finally {
            setQuizState("finished");
        }
    }, [courseId, questions, userAnswers, toast, timePerQuestion, currentQuestionIndex]);


    useEffect(() => {
        if (quizState !== 'active') return;

        timerRef.current = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime <= 1) {
                    clearInterval(timerRef.current);
                    finishQuiz();
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timerRef.current);
    }, [quizState, finishQuiz]);

    useEffect(() => {
        const loadQuiz = async () => {
            if (!courseId) return;
            setQuizState("loading");
            
            const fetchedCourse = await getCourseById(courseId);
            if (!fetchedCourse) {
                toast({ variant: 'destructive', title: 'Error', description: 'Course not found.' });
                router.push('/learn/skillbridge/practice');
                return;
            }
            setCourse(fetchedCourse);

            try {
                const quizData = await generateQuizAction({ courseTitle: fetchedCourse.title, courseDescription: fetchedCourse.description });
                if (quizData.questions) {
                    setQuestions(quizData.questions);
                    startTimeRef.current = Date.now();
                    questionStartTimeRef.current = Date.now();
                    setQuizState("active");
                } else {
                    throw new Error("AI did not return questions.");
                }
            } catch (error) {
                 toast({ variant: 'destructive', title: 'AI Error', description: 'Could not generate a quiz for this course. Please try again later.' });
                router.push('/learn/skillbridge/practice');
            }
        };
        loadQuiz();
    }, [courseId, router, toast]);

    const handleSelectOption = (optionIndex: number) => {
        setUserAnswers(prev => ({ ...prev, [currentQuestionIndex]: optionIndex }));
    };

    const goToQuestion = (index: number) => {
        if (index >= 0 && index < questions.length && index !== currentQuestionIndex) {
            // Log time for the current question before switching
            const timeSpent = (Date.now() - questionStartTimeRef.current) / 1000;
            setTimePerQuestion(prev => ({
                ...prev,
                [currentQuestionIndex]: (prev[currentQuestionIndex] || 0) + timeSpent,
            }));
            
            // Reset timer for the new question
            questionStartTimeRef.current = Date.now();
            
            setCurrentQuestionIndex(index);
            setVisitedQuestions(prev => new Set(prev).add(index));
        }
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            goToQuestion(currentQuestionIndex + 1);
        } else {
            finishQuiz();
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            goToQuestion(currentQuestionIndex - 1);
        }
    };

    if (quizState === 'loading' || !course) {
        return (
            <AppShell>
                <div className="flex flex-col items-center justify-center h-full text-center p-8">
                    <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
                    <h1 className="text-2xl font-bold">Generating Your Quiz...</h1>
                    <p className="text-muted-foreground">The AI is preparing questions for {course?.title || 'this course'}. Please wait.</p>
                </div>
            </AppShell>
        );
    }

    if (quizState === 'finished' && quizResult) {
        const finalScore = quizResult.score;

        return (
            <AppShell>
                <div className="max-w-4xl mx-auto space-y-6">
                    <Card className="text-center">
                        <CardHeader>
                            <CardTitle className="text-3xl">Quiz Results for {course.title}</CardTitle>
                            <CardDescription>You scored</CardDescription>
                            <p className="text-5xl font-bold text-primary">{finalScore} / {questions.length}</p>
                            <p className="text-lg text-muted-foreground pt-2">
                                Total Time: {formatTime(quizResult.timeTaken)}
                            </p>
                        </CardHeader>
                        <CardFooter className="flex-col sm:flex-row justify-center gap-4">
                            <Button onClick={() => window.location.reload()}>Retake Quiz</Button>
                            <Button asChild variant="secondary"><Link href="/learn/skillbridge/practice">Back to Practice Zone</Link></Button>
                        </CardFooter>
                    </Card>

                    <h3 className="text-2xl font-bold text-center">Review Your Answers</h3>
                    <div className="space-y-4">
                        {questions.map((q, index) => {
                            const userAnswerIndex = userAnswers[index];
                            const isAnswered = userAnswerIndex !== undefined;
                            const isCorrect = isAnswered && userAnswerIndex === q.correctAnswerIndex;
                            const timeForQuestion = quizResult.timePerQuestion?.[index] ?? 0;

                            return (
                                <Card key={index} className={cn("border-2", isAnswered ? (isCorrect ? 'border-green-500' : 'border-red-500') : 'border-destructive')}>
                                    <CardHeader>
                                        <div className="flex justify-between items-start gap-2">
                                            <CardTitle className="text-lg flex items-start gap-2 flex-1">
                                                <span>{index + 1}.</span>
                                                <span>{q.question}</span>
                                            </CardTitle>
                                            {!isAnswered && (
                                                <Badge variant="destructive">Not Answered</Badge>
                                            )}
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        {q.options.map((option, optionIndex) => {
                                            const isUserChoice = userAnswerIndex === optionIndex;
                                            const isCorrectChoice = q.correctAnswerIndex === optionIndex;
                                            return (
                                                <div key={optionIndex} className={cn(
                                                    "flex items-center gap-3 rounded-md p-3 border text-sm",
                                                    isCorrectChoice && "bg-green-100 dark:bg-green-900/30 border-green-500 font-semibold",
                                                    isUserChoice && !isCorrectChoice && "bg-red-100 dark:bg-red-900/30 border-red-500 line-through"
                                                )}>
                                                    {isCorrectChoice ? <CheckCircle className="text-green-600 h-5 w-5 flex-shrink-0" /> : isUserChoice ? <XCircle className="text-red-600 h-5 w-5 flex-shrink-0" /> : <div className="w-5 h-5 flex-shrink-0" />}
                                                    <p>{option}</p>
                                                </div>
                                            )
                                        })}
                                    </CardContent>
                                    <CardFooter className="justify-between items-center flex-wrap gap-2">
                                        {!isCorrect && (
                                            <Alert variant={'destructive'} className="bg-orange-50 border-orange-200 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 [&>svg]:text-orange-500 w-full">
                                                <Lightbulb className="h-4 w-4" />
                                                <AlertTitle>Explanation</AlertTitle>
                                                <AlertDescription>
                                                    {q.explanation}
                                                </AlertDescription>
                                            </Alert>
                                        )}
                                        <div className="flex items-center gap-1 text-sm text-muted-foreground ml-auto pt-2">
                                            <Clock className="h-4 w-4" />
                                            <span>Time: {Math.round(timeForQuestion)}s</span>
                                        </div>
                                    </CardFooter>
                                </Card>
                            )
                        })}
                    </div>
                </div>
            </AppShell>
        );
    }
    
    const currentQuestion = questions[currentQuestionIndex];

    return (
        <AppShell>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-3">
                    <Card>
                        <CardHeader>
                            <CardTitle>{course.title} Quiz</CardTitle>
                            <CardDescription>Question {currentQuestionIndex + 1} of {questions.length}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <p className="text-xl font-semibold">{currentQuestion.question}</p>
                            <RadioGroup onValueChange={(value) => handleSelectOption(parseInt(value))} value={userAnswers[currentQuestionIndex]?.toString()}>
                                {currentQuestion.options.map((option, index) => (
                                    <div key={index} className="flex items-center space-x-2">
                                        <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                                        <Label htmlFor={`option-${index}`} className="text-base cursor-pointer">{option}</Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button onClick={handlePrevious} disabled={currentQuestionIndex === 0} variant="outline">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Previous
                            </Button>
                            <Button onClick={handleNext}>
                                {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Submit Quiz"}
                                {currentQuestionIndex < questions.length - 1 && <ArrowRight className="ml-2 h-4 w-4" />}
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
                <div className="lg:sticky lg:top-20 space-y-4">
                    <Card>
                        <CardHeader className="flex-row items-center justify-between">
                            <CardTitle className="text-lg">Timer</CardTitle>
                            <Clock />
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold text-center">{formatTime(timeLeft)}</p>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Questions</CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-5 gap-2">
                            {questions.map((_, index) => {
                                const isCurrent = index === currentQuestionIndex;
                                const isAnswered = userAnswers[index] !== undefined;
                                const isVisited = visitedQuestions.has(index);

                                return (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() => goToQuestion(index)}
                                        className={cn(
                                            "w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 cursor-pointer transition-transform hover:scale-110",
                                            isCurrent 
                                                ? "bg-yellow-400 border-yellow-600 text-black scale-110" 
                                                : isAnswered 
                                                    ? "bg-green-500 border-green-700 text-white" 
                                                    : isVisited
                                                        ? "bg-red-500 border-red-700 text-white"
                                                        : "bg-muted border-border"
                                        )}
                                        aria-label={`Go to question ${index + 1}`}
                                    >
                                        {index + 1}
                                    </button>
                                )
                            })}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppShell>
    );
}
