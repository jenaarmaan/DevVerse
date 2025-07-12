import { AppShell } from "@/components/shared/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { TriangleAlert } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <AppShell>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-4">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader>
                    <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                        <TriangleAlert className="h-12 w-12 text-primary" />
                    </div>
                </CardHeader>
                <CardContent className="space-y-2">
                    <CardTitle className="text-3xl font-bold">404 - Page Not Found</CardTitle>
                    <CardDescription className="text-muted-foreground text-lg">
                        Oops! The page you're looking for doesn't exist or has been moved.
                    </CardDescription>
                </CardContent>
                <CardFooter>
                    <Button asChild className="w-full">
                        <Link href="/">Return to Homepage</Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    </AppShell>
  );
}
