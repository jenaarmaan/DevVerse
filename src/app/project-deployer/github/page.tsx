
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Github, Link2 } from "lucide-react";

export default function GitHubIntegrationPage() {
    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-3xl font-bold flex items-center gap-2"><Github /> GitHub Integration</h1>
                <p className="text-muted-foreground mt-1">
                    Connect a GitHub repository to pull in stats, commits, and file information.
                </p>
            </header>
            <Card>
                <CardHeader>
                    <CardTitle>Link a Repository</CardTitle>
                    <CardDescription>
                        Enter the URL of a public GitHub repository to link it to your project.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="flex flex-col md:flex-row gap-4">
                        <Input placeholder="https://github.com/username/repository" className="flex-1" />
                        <Button type="submit">
                            <Link2 className="mr-2"/> Link Repository
                        </Button>
                    </form>
                </CardContent>
            </Card>
            <Card className="text-center p-8 border-dashed">
                <CardTitle>No Repository Linked</CardTitle>
                <CardDescription>
                    Link a repository to see your commit history, file tree, and other stats here.
                </CardDescription>
            </Card>
        </div>
    );
}
