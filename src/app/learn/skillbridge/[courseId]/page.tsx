
"use client";

import { AppShell } from "@/components/shared/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getCourseById, updateCourseProgress, getCourseProgress, type UserProgress } from "@/lib/firebase/firestore";
import type { Course } from "@/lib/courses-data";
import { useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { ArrowLeft, CheckCircle, ExternalLink, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { useParams } from "next/navigation";

function getPlatformName(url: string): string {
    if (!url) return "an external learning platform";
    try {
        const hostname = new URL(url).hostname;

        if (hostname.includes('cloudskillsboost.google')) {
            return "Google Cloud Skills Boost";
        }
        if (hostname.includes('credly.com')) {
            return "Credly";
        }
        if (hostname.includes('codelabs.developers.google.com')) {
            return "Google Codelabs";
        }
        // A sensible default that shows the domain name
        return hostname;
    } catch (error) {
        console.error("Invalid URL for course:", url);
        return "an external learning platform";
    }
}


function CoursePlayerSkeleton() {
    return (
        <div className="space-y-6">
            <div className="h-8 w-40 bg-muted rounded-md animate-pulse"></div>
            <Card>
                <CardHeader>
                    <div className="h-8 w-3/5 bg-muted rounded-md animate-pulse mb-2"></div>
                    <div className="h-4 w-4/5 bg-muted rounded-md animate-pulse"></div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="aspect-video w-full bg-muted rounded-lg animate-pulse"></div>
                    <div className="h-10 w-full bg-muted rounded-md animate-pulse"></div>
                </CardContent>
            </Card>
        </div>
    )
}

export default function CoursePlayerPage() {
    const params = useParams();
    const courseId = params.courseId as string;
    
    const [course, setCourse] = useState<Course | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const { toast } = useToast();

    // Effect for fetching user and course data
    useEffect(() => {
        if (!courseId) return;

        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setLoading(true);
            setUser(currentUser);

            const courseData = await getCourseById(courseId);
            setCourse(courseData);

            if (currentUser && courseData) {
                const userProgress = await getCourseProgress(currentUser.uid, courseId);
                
                if (userProgress) {
                    setProgress(userProgress.progress);
                    setIsCompleted(userProgress.completed);
                } else {
                    // First time visiting, mark as started
                    await updateCourseProgress(currentUser.uid, courseId, 5);
                    setProgress(5);
                    setIsCompleted(false);
                }
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [courseId]);


    const handleMarkComplete = async () => {
        if (!user || !course) {
            toast({ variant: 'destructive', title: "Error", description: "You must be logged in to update progress." });
            return;
        }
        setIsUpdating(true);
        try {
            await updateCourseProgress(user.uid, course.id, 100);
            setProgress(100);
            setIsCompleted(true);
            toast({
                title: "Course Completed!",
                description: `Congratulations on completing "${course.title}"!`,
                variant: 'success'
            });
        } catch (error) {
             toast({ variant: 'destructive', title: "Error", description: "Could not update progress. Please try again." });
        } finally {
            setIsUpdating(false);
        }
    }
    
    if (loading) {
        return <AppShell><CoursePlayerSkeleton /></AppShell>
    }

    if (!course) {
        return (
            <AppShell>
                <div className="text-center">
                    <h1 className="text-2xl font-bold">Course Not Found</h1>
                    <p className="text-muted-foreground">We couldn't find the course you were looking for.</p>
                     <Button asChild variant="link">
                        <Link href="/learn/skillbridge/explore-courses">Back to SkillBridge</Link>
                    </Button>
                </div>
            </AppShell>
        );
    }

    const platformName = getPlatformName(course.courseUrl);

    return (
        <AppShell>
            <div className="max-w-4xl mx-auto space-y-6">
                 <div>
                    <Button asChild variant="outline" size="sm" className="mb-4">
                        <Link href="/learn/skillbridge/explore-courses"><ArrowLeft className="mr-2"/> Back to SkillBridge</Link>
                    </Button>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-3xl font-bold">{course.title}</CardTitle>
                            <CardDescription className="text-lg">{course.description}</CardDescription>
                            <div className="flex gap-2 pt-2">
                                <Badge>{course.difficulty}</Badge>
                                <Badge variant="secondary">{course.duration}</Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <Card className="bg-accent/50 text-center p-6 sm:p-8">
                                <CardHeader className="p-0 pb-4">
                                    <CardTitle>{platformName} Content</CardTitle>
                                    <CardDescription>
                                        This course is hosted on {platformName}. Click the button below to open it in a new tab and start learning.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <Button asChild size="lg">
                                        <a href={course.courseUrl} target="_blank" rel="noopener noreferrer">
                                            Go to Course <ExternalLink className="ml-2 h-4 w-4" />
                                        </a>
                                    </Button>
                                </CardContent>
                            </Card>
                             <div>
                                <h3 className="text-lg font-semibold mb-2">Your Progress</h3>
                                <Progress value={progress} className="h-3 mb-4" />
                                {!isCompleted ? (
                                    <Button onClick={handleMarkComplete} disabled={isUpdating} className="w-full">
                                        {isUpdating ? <Loader2 className="animate-spin" /> : <CheckCircle />}
                                        <span className="ml-2">Mark as Complete</span>
                                    </Button>
                                ) : (
                                    <div className="flex items-center justify-center p-4 bg-success/10 text-success-foreground rounded-lg">
                                        <CheckCircle className="mr-2 text-success"/>
                                        <span className="font-semibold text-success">Congratulations, you've completed this course!</span>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppShell>
    )
}
