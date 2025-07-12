
"use client";

import { AppShell } from "@/components/shared/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getCompletedCourses, getQuizResultsForUser } from "@/lib/firebase/firestore";
import type { Course } from "@/lib/courses-data";
import type { QuizResult } from "./quiz/actions";
import { useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { Loader2, PenSquare, Dumbbell, History, Clock } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function PracticePage() {
  const [user, setUser] = useState<User | null>(null);
  const [completedCourses, setCompletedCourses] = useState<Course[]>([]);
  const [quizResults, setQuizResults] = useState<Record<string, QuizResult>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      const fetchPracticeData = async () => {
        setLoading(true);
        const [courses, results] = await Promise.all([
            getCompletedCourses(user.uid),
            getQuizResultsForUser(user.uid)
        ]);
        
        const resultsMap: Record<string, QuizResult> = {};
        results.forEach(res => {
            resultsMap[res.courseId] = res;
        });

        setCompletedCourses(courses);
        setQuizResults(resultsMap);
        setLoading(false);
      };

      fetchPracticeData();
    }
  }, [user]);

  return (
    <AppShell>
      <div className="space-y-8">
        <div>
            <h1 className="text-3xl font-bold tracking-tight text-primary font-headline flex items-center gap-2">
                <Dumbbell className="w-8 h-8"/>
                Practice Zone
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
                Test your knowledge with quizzes for the courses you've completed.
            </p>
        </div>

        {loading && (
          <div className="text-center py-12">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
            <p className="mt-2 text-muted-foreground">Loading practice materials...</p>
          </div>
        )}

        {!loading && completedCourses.length === 0 && (
          <Card className="text-center p-8">
            <CardTitle>No Quizzes Available</CardTitle>
            <CardDescription>
              Complete a course to unlock its practice quiz.
            </CardDescription>
             <Button asChild className="mt-4">
                <Link href="/learn/skillbridge/explore-courses">Explore Courses</Link>
            </Button>
          </Card>
        )}

        {!loading && completedCourses.length > 0 && (
          <div className="space-y-4">
            {completedCourses.map((course) => {
              const result = quizResults[course.id];
              const timeFormatted = result ? `${Math.floor(result.timeTaken / 60)}m ${result.timeTaken % 60}s` : '';
              return (
                 <Card key={course.id} className="flex flex-col md:flex-row items-center justify-between p-4 gap-4">
                    <CardHeader className="p-0 flex-1">
                      <CardTitle>{course.title}</CardTitle>
                       {result ? (
                          <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
                              <div className="flex items-center gap-1.5"><History className="w-4 h-4"/> Last Score: <strong>{result.score}/10</strong></div>
                              <div className="flex items-center gap-1.5"><Clock className="w-4 h-4"/> Time: <strong>{timeFormatted}</strong></div>
                          </div>
                      ) : (
                        <div className="flex flex-wrap gap-2 pt-2">
                          {course.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                        </div>
                      )}
                    </CardHeader>
                    <div className="w-full md:w-auto">
                        <Button asChild className="w-full">
                            <Link href={`/learn/skillbridge/practice/quiz/${course.id}`}>
                                <PenSquare className="mr-2" /> {result ? "Retake Quiz" : "Take Quiz"}
                            </Link>
                        </Button>
                    </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </AppShell>
  );
}
