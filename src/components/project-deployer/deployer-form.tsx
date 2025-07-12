"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Github, Rocket } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export function DeployerForm() {
  const [repoUrl, setRepoUrl] = useState('');
  const [projectType, setProjectType] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!repoUrl || !projectType) {
      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: 'Please provide both a repository URL and a project type.',
      });
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="w-full max-w-2xl mx-auto shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <CardTitle>Deploy a New Project</CardTitle>
          <CardDescription>Fill in the details below to start the deployment process.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="github-repo" className="flex items-center gap-2">
                <Github className="w-4 h-4" />
                GitHub Repository URL
            </Label>
            <Input 
                id="github-repo" 
                placeholder="https://github.com/username/repo" 
                required 
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="project-type">Project Type</Label>
            <Select onValueChange={setProjectType} value={projectType} required>
              <SelectTrigger id="project-type">
                <SelectValue placeholder="Select project type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="react">React</SelectItem>
                <SelectItem value="flutter">Flutter</SelectItem>
                <SelectItem value="nextjs">Next.js</SelectItem>
                <SelectItem value="nodejs">Node.js</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button type="button" className="w-full font-semibold" disabled={!repoUrl || !projectType}>
                        <Rocket className="mr-2 h-4 w-4" />
                        Deploy Now
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Deployment Coming Soon!</AlertDialogTitle>
                    <AlertDialogDescription>
                        Live integration with hosting providers is currently under development. Stay tuned for updates!
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogAction>Got it!</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <div className="text-xs text-muted-foreground text-center space-y-1">
                <p>Powered by Firebase Hosting</p>
                <p>Vercel Support Coming</p>
            </div>
        </CardFooter>
      </Card>
    </form>
  );
}
