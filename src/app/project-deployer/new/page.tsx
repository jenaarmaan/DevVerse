
"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Github, Rocket, Sparkles, Wand2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

export default function DeployNewProjectPage() {
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
    // Mock deployment logic
    setIsLoading(true);
    setTimeout(() => {
        setIsLoading(false);
        toast({
            title: "Deployment Queued!",
            description: "Your project has been added to the deployment queue."
        })
    }, 2000);
  };

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit}>
        <Card className="w-full max-w-3xl mx-auto shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Deploy a New Project</CardTitle>
            <CardDescription>Link a GitHub repository to get started.</CardDescription>
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
                <Label htmlFor="project-name">Project Name</Label>
                <Input id="project-name" placeholder="my-awesome-project" required />
            </div>

            <div className="space-y-2">
                <Label htmlFor="project-description">Description</Label>
                <Textarea id="project-description" placeholder="A short description of your project." />
            </div>

            <div className="space-y-2">
              <Label>Visibility</Label>
              <RadioGroup defaultValue="public" className="flex gap-4">
                  <Label htmlFor="public" className="flex items-center gap-2 cursor-pointer">
                    <RadioGroupItem value="public" id="public" /> Public
                  </Label>
                  <Label htmlFor="private" className="flex items-center gap-2 cursor-pointer">
                    <RadioGroupItem value="private" id="private" /> Private
                  </Label>
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="project-type">Tech Stack</Label>
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
            
            <div className="flex items-center justify-between p-4 bg-accent/50 rounded-lg">
                <div className='space-y-1'>
                    <Label htmlFor="gemini-assist" className="flex items-center gap-2 font-semibold">
                        <Sparkles className="w-5 h-5 text-primary" />
                        Enable Gemini CI/CD Assistant
                    </Label>
                    <p className="text-xs text-muted-foreground">Let Gemini AI help generate your CI/CD configuration files.</p>
                </div>
                <Switch id="gemini-assist" />
            </div>

          </CardContent>
          <CardFooter>
              <Button type="submit" className="w-full font-semibold" disabled={isLoading}>
                  {isLoading ? <Rocket className="mr-2 h-4 w-4 animate-spin" /> : <Rocket className="mr-2 h-4 w-4" />}
                  Deploy Project
              </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
