"use client";

import { LoginForm } from "@/components/auth/login-form";
import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function LoginSkeleton() {
    return (
        <Card className="w-full max-w-md shadow-2xl">
            <CardHeader className="text-center space-y-4 pt-6">
                <div className="flex justify-center items-center gap-2 mb-4">
                    <Skeleton className="w-10 h-10" />
                    <Skeleton className="h-8 w-40" />
                </div>
                <Skeleton className="h-7 w-48 mx-auto" />
                <Skeleton className="h-5 w-72 mx-auto" />
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                </div>
                <div className="relative py-2">
                    <div className="absolute inset-0 flex items-center">
                        <Skeleton className="w-full h-[1px]" />
                    </div>
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-10 w-full" />
                </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-5 w-60 mx-auto" />
            </CardFooter>
        </Card>
    );
}


export default function LoginPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // This effect runs only on the client, after the component has mounted
    setIsClient(true);
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-secondary p-4">
      {isClient ? <LoginForm /> : <LoginSkeleton />}
    </div>
  );
}
