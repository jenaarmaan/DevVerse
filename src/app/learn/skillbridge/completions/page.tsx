
"use client";

import { AppShell } from "@/components/shared/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getUserProgress, getCourseById } from "@/lib/firebase/firestore";
import type { Course } from "@/lib/courses-data";
import { useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { Book, BrainCircuit, Loader2, MessageSquare, Trophy } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from 'date-fns';

type CompletedCourse = Course & {
    completedAt: Date;
};

function getPlatformName(url: string): string {
    if (!url) return "External Platform";
    try {
        const hostname = new URL(url).hostname.replace('www.', '');
        return hostname.split('.')[0].charAt(0).toUpperCase() + hostname.split('.')[0].slice(1);
    } catch {
        return "External Platform";
    }
}

export default function CompletionsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [completedCourses, setCompletedCourses] = useState<CompletedCourse[]>([]);
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
      const fetchCompletions = async () => {
        setLoading(true);
        const progressList = await getUserProgress(user.uid);
        const completed = progressList.filter(p => p.completed);

        const coursePromises = completed.map(async (p) => {
          const courseDetails = await getCourseById(p.courseId);
          if (courseDetails) {
            return {
              ...courseDetails,
              completedAt: p.lastUpdatedAt?.toDate() || new Date()
            };
          }
          return null;
        });

        const courses = (await Promise.all(coursePromises)).filter(Boolean) as CompletedCourse[];
        setCompletedCourses(courses.sort((a, b) => b.completedAt.getTime() - a.completedAt.getTime()));
        setLoading(false);
      };

      fetchCompletions();
    }
  }, [user]);

  return (
    <AppShell>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary font-headline flex items-center gap-2">
            <Trophy className="w-8 h-8" />
            My Completions
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Review your achievements and take the next step in your learning journey.
          </p>
        </div>

        {loading && (
          <div className="text-center py-12">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
            <p className="mt-2 text-muted-foreground">Loading your completed courses...</p>
          </div>
        )}

        {!loading && completedCourses.length === 0 && (
          <Card className="text-center p-8">
            <CardTitle>No Courses Completed Yet</CardTitle>
            <CardDescription>
              Your completed courses will appear here.
            </CardDescription>
            <Button asChild className="mt-4">
                <Link href="/learn/skillbridge/explore-courses">Explore Courses</Link>
            </Button>
          </Card>
        )}

        {!loading && completedCourses.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedCourses.map((course) => (
              <Card key={course.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle>{course.title}</CardTitle>
                  <CardDescription>
                    Completed {formatDistanceToNow(course.completedAt, { addSuffix: true })} on {getPlatformName(course.courseUrl)}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto flex flex-col gap-2 items-stretch">
                  <Button asChild>
                    <Link href={`/learn/skillbridge/${course.id}`}>
                        <Book className="mr-2" /> Review Course
                    </Link>
                  </Button>
                  <Button asChild variant="secondary">
                     <Link href={`/idea-generator?topic=${encodeURIComponent(course.title)}`}>
                        <BrainCircuit className="mr-2" /> Try a Project
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href={`/collabboard?post_title=${encodeURIComponent(`I just completed the ${course.title} course!`)}`}>
                        <MessageSquare className="mr-2" /> Share on CollabBoard
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
