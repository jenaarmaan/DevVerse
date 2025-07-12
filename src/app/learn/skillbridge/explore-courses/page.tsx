
"use client";

import { AppShell } from "@/components/shared/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, BookOpen, Check, Lightbulb, Loader2, Sparkles, Trash2, PlusCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { getCourses, getUserProgress, type UserProgress, deleteCourse } from "@/lib/firebase/firestore";
import type { Course } from "@/lib/courses-data";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { AddCourseDialog } from "@/components/learn/skillbridge/add-course-dialog";

// Define the Admin User
const ADMIN_EMAIL = "admin@gmail.com";

function CourseCard({ course, progress, isHighlighted, isAdmin, onDelete }: { course: Course; progress?: UserProgress, isHighlighted?: boolean, isAdmin: boolean, onDelete: (courseId: string) => void }) {
    const isStarted = progress && progress.progress > 0;
    const isCompleted = progress && progress.completed;
    
    return (
        <Card className={cn("flex flex-col overflow-hidden group shadow-lg hover:shadow-xl transition-all duration-300", {
            "ring-2 ring-primary ring-offset-2": isHighlighted,
        })}>
            <div className="relative h-48 w-full">
                <Image src={course.thumbnailUrl} alt={course.title} layout="fill" className="object-cover group-hover:scale-105 transition-transform" />
            </div>
            <CardHeader>
                <CardTitle>{course.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
                <CardDescription>{course.description}</CardDescription>
                <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">{course.difficulty}</Badge>
                    <Badge variant="secondary">{course.duration}</Badge>
                    {course.tags.map(tag => <Badge key={tag}>{tag}</Badge>)}
                </div>
                {isStarted && !isCompleted && (
                    <div className="space-y-1 pt-2">
                        <p className="text-xs text-muted-foreground">{progress.progress}% complete</p>
                        <Progress value={progress.progress} className="h-2" />
                    </div>
                )}
            </CardContent>
            <CardFooter className="flex justify-between items-center">
                <Button asChild>
                    <Link href={`/learn/skillbridge/${course.id}`}>
                        {isCompleted ? <><Check className="mr-2"/>Review Course</> : isStarted ? <><BookOpen className="mr-2"/>Continue</> : <>Start Course <ArrowRight className="ml-2 h-4 w-4" /></>}
                    </Link>
                </Button>
                {isAdmin && (
                    <Button variant="destructive" size="icon" onClick={() => onDelete(course.id)}>
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete Course</span>
                    </Button>
                )}
            </CardFooter>
        </Card>
    )
}

function CoursesSection({ title, courses, userProgress, highlightedCourses, isAdmin, onDelete }: { title: string; courses: Course[], userProgress: UserProgress[], highlightedCourses: string[], isAdmin: boolean, onDelete: (courseId: string) => void }) {
    if (courses.length === 0) return null;
    return (
        <div>
            <h2 className="text-3xl font-bold font-headline mb-6">{title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {courses.map(course => (
                    <CourseCard 
                        key={course.id} 
                        course={course}
                        progress={userProgress.find(p => p.courseId === course.id)}
                        isHighlighted={highlightedCourses.includes(course.id)}
                        isAdmin={isAdmin}
                        onDelete={onDelete}
                    />
                ))}
            </div>
        </div>
    )
}

function AIChatAssistant({ onSuggestions }: { onSuggestions: (ids: string[]) => void }) {
    const [query, setQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        setIsLoading(true);
        try {
            const response = await fetch('/api/suggest-courses', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to get suggestions from AI.");
            }

            const data = await response.json();
            if (data.suggestedCourseIds && data.suggestedCourseIds.length > 0) {
                 onSuggestions(data.suggestedCourseIds);
                toast({
                    title: "Suggestions Found!",
                    description: "We've highlighted some courses that match your interest."
                })
            } else {
                onSuggestions([]);
                toast({
                    title: "No specific matches found",
                    description: "We couldn't find a direct match, but feel free to browse all our courses!"
                })
            }
           
        } catch (error) {
            console.error(error);
            toast({
                variant: 'destructive',
                title: 'AI Assistant Error',
                description: (error as Error).message,
            })
            onSuggestions([]);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Card className="shadow-xl bg-accent/50 sticky top-20">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Sparkles className="text-primary"/>
                    AI Course Assistant
                </CardTitle>
                <CardDescription>What topic are you interested in learning about?</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-2">
                    <Input 
                        placeholder="e.g., 'Build a mobile app'" 
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Lightbulb className="mr-2 h-4 w-4" />}
                        Get Suggestions
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}

export default function ExploreCoursesPage() {
    const [user, setUser] = useState<User | null>(null);
    const [allCourses, setAllCourses] = useState<Course[]>([]);
    const [userProgress, setUserProgress] = useState<UserProgress[]>([]);
    const [loading, setLoading] = useState(true);
    const [highlightedCourses, setHighlightedCourses] = useState<string[]>([]);
    const { toast } = useToast();

    const isAdmin = user?.email === ADMIN_EMAIL;

    const fetchAllData = async () => {
        setLoading(true);
        const courses = await getCourses();
        setAllCourses(courses);
        if (auth.currentUser) {
            const progress = await getUserProgress(auth.currentUser.uid);
            setUserProgress(progress);
        }
        setLoading(false);
    };
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            // We'll call fetchAllData inside the effect and when the user changes
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        fetchAllData();
    }, [user]); // Re-fetch all data when user logs in or out

    const handleDeleteCourse = async (courseId: string) => {
        if (!isAdmin) return;
        if (confirm(`Are you sure you want to delete this course? This action cannot be undone.`)) {
            try {
                await deleteCourse(courseId);
                toast({ title: "Success", description: "Course deleted successfully." });
                await fetchAllData(); // Re-fetch to update UI
            } catch (error) {
                toast({ variant: "destructive", title: "Error", description: "Failed to delete course." });
                console.error("Failed to delete course:", error);
            }
        }
    };

    const inProgressCourses = allCourses.filter(course => 
        userProgress.some(p => p.courseId === course.id && !p.completed)
    );

    const completedCourses = allCourses.filter(course => 
        userProgress.some(p => p.courseId === course.id && p.completed)
    );

    const newCourses = allCourses.filter(course => 
        !userProgress.some(p => p.courseId === course.id)
    );
    
    return (
        <AppShell>
            <div className="space-y-12">
                <div className="text-center">
                    <div className="flex justify-center items-center gap-4 mb-4">
                        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl font-headline">
                            Explore All Courses
                        </h1>
                        {isAdmin && <AddCourseDialog onCourseAdded={fetchAllData} />}
                    </div>
                    <p className="mt-4 text-lg leading-8 text-muted-foreground max-w-3xl mx-auto">
                        Explore curated courses, security insights, and hands-on labs designed to elevate your developer skills.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    <div className="lg:col-span-2 space-y-12">
                         {loading ? (
                            <div className="text-center">
                                <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary"/>
                                <p className="text-muted-foreground mt-2">Loading your learning journey...</p>
                            </div>
                         ) : (
                            <>
                                {allCourses.length === 0 && !loading && (
                                     <Card className="text-center p-8">
                                        <CardTitle>No Courses Found</CardTitle>
                                        <CardDescription>
                                            It looks like the courses haven't been added to the database yet.
                                            {isAdmin ? " As an admin, you can add courses using the button above." : " Please check back later!"}
                                        </CardDescription>
                                    </Card>
                                )}
                                {user ? (
                                    <>
                                        <CoursesSection title="Continue Learning" courses={inProgressCourses} userProgress={userProgress} highlightedCourses={highlightedCourses} isAdmin={isAdmin} onDelete={handleDeleteCourse} />
                                        <CoursesSection title="New Courses" courses={newCourses} userProgress={userProgress} highlightedCourses={highlightedCourses} isAdmin={isAdmin} onDelete={handleDeleteCourse} />
                                        <CoursesSection title="Completed Courses" courses={completedCourses} userProgress={userProgress} highlightedCourses={highlightedCourses} isAdmin={isAdmin} onDelete={handleDeleteCourse} />
                                    </>
                                ) : (
                                    <CoursesSection title="All Courses" courses={allCourses} userProgress={userProgress} highlightedCourses={highlightedCourses} isAdmin={isAdmin} onDelete={handleDeleteCourse} />
                                )}
                            </>
                         )}
                    </div>
                    <div className="lg:col-span-1">
                        <AIChatAssistant onSuggestions={setHighlightedCourses} />
                    </div>
                </div>

            </div>
        </AppShell>
    );
}
