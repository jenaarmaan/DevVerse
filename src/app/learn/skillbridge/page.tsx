
"use client";

import { AppShell } from "@/components/shared/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getCourses } from "@/lib/firebase/firestore";
import type { Course } from "@/lib/courses-data";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Loader2, School } from "lucide-react";

function CourseCard({ course }: { course: Course }) {
  return (
    <Card className="flex flex-col overflow-hidden group shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="relative h-64 w-full">
        <Image src={course.thumbnailUrl} alt={course.title} layout="fill" className="object-cover group-hover:scale-105 transition-transform" />
      </div>
      <CardHeader>
        <CardTitle className="text-lg leading-tight">{course.title}</CardTitle>
      </CardHeader>
       <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-4">
          {course.description}
        </p>
      </CardContent>
      <CardFooter className="mt-auto pt-4">
        <Button asChild variant="secondary" className="w-full">
          <Link href={`/learn/skillbridge/${course.id}`}>Start Learning</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function SkillBridgePage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopCourses = async () => {
      setLoading(true);
      const allCourses = await getCourses();
      // Simple logic to get top 5, can be replaced with ranking later
      setCourses(allCourses.slice(0, 5));
      setLoading(false);
    };

    fetchTopCourses();
  }, []);

  return (
    <AppShell>
      <div className="space-y-12">
        <div className="text-center">
            <School className="w-16 h-16 mx-auto text-primary mb-4" />
          <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl font-headline">
            Welcome to SkillBridge
          </h1>
          <p className="mt-4 text-lg leading-8 text-muted-foreground max-w-3xl mx-auto">
            Your gateway to mastering new developer skills. Start with one of our featured courses or explore the full catalog.
          </p>
        </div>

        <div>
            <h2 className="text-3xl font-bold font-headline mb-6 text-center lg:text-left">Featured Courses</h2>
            {loading ? (
                <div className="text-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {courses.map((course) => (
                        <CourseCard key={course.id} course={course} />
                    ))}
                </div>
            )}
            <div className="text-center mt-8">
                <Button size="lg" asChild>
                    <Link href="/learn/skillbridge/explore-courses">
                        Explore Full Catalog <ArrowRight className="ml-2" />
                    </Link>
                </Button>
            </div>
        </div>
      </div>
    </AppShell>
  );
}
