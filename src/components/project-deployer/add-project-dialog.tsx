
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, PlusCircle } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Textarea } from "../ui/textarea";
import { addProject } from "@/lib/firebase/firestore";
import { auth } from "@/lib/firebase/config";
import { Checkbox } from "../ui/checkbox";

interface AddProjectDialogProps {
    onProjectAdded: () => void;
}

const defaultReadme = `# My New Project

A brief description of what this project is about.

## Getting Started

...

`;

export function AddProjectDialog({ onProjectAdded }: AddProjectDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const currentUser = auth.currentUser;
    if (!currentUser || !currentUser.email) {
        toast({ variant: "destructive", title: "Error", description: "You must be logged in to create a project." });
        return;
    }
    
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const techStack = formData.get("techStack") as string;
    const initializeReadme = formData.get("initializeReadme") === 'on';

    try {
        await addProject({
            name: formData.get("name") as string,
            description: formData.get("description") as string,
            visibility: formData.get("visibility") as 'public' | 'private',
            techStack: techStack ? techStack.split(',').map(t => t.trim()) : [],
            readme: initializeReadme ? defaultReadme : '',
            ownerId: currentUser.uid,
            contributors: [{ uid: currentUser.uid, email: currentUser.email, role: 'Owner' }],
        });
        toast({ title: "Success!", description: "Project created successfully." });
        onProjectAdded();
        setIsOpen(false);
    } catch (error) {
        toast({ variant: "destructive", title: "Error", description: "Failed to create project." });
        console.error(error);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create New Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Create a New Project</DialogTitle>
          <DialogDescription>
            This will create a new project in your DevVerse account. You can link a GitHub repository later.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Project Name</Label>
            <Input id="name" name="name" required placeholder="e.g., my-awesome-app" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description (About)</Label>
            <Textarea id="description" name="description" placeholder="A short and sweet description of your project."/>
          </div>
           <div className="space-y-2">
            <Label htmlFor="techStack">Tech Stack (comma-separated)</Label>
            <Input id="techStack" name="techStack" placeholder="e.g., React, Firebase, Next.js" />
           </div>
          <div className="space-y-2">
              <Label>Visibility</Label>
              <RadioGroup name="visibility" defaultValue="private" className="flex gap-4">
                  <Label htmlFor="public" className="flex items-center gap-2 cursor-pointer font-normal">
                    <RadioGroupItem value="public" id="public" /> Public
                  </Label>
                  <Label htmlFor="private" className="flex items-center gap-2 cursor-pointer font-normal">
                    <RadioGroupItem value="private" id="private" /> Private
                  </Label>
              </RadioGroup>
            </div>
            <div className="flex items-center space-x-2">
                <Checkbox id="initializeReadme" name="initializeReadme" defaultChecked/>
                <label
                    htmlFor="initializeReadme"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Add a README file
                </label>
            </div>

          <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Project
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
