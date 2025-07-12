"use client";

import { useFormStatus } from "react-dom";
import { useActionState, useEffect, useRef, useState } from "react";
import { generateIdeasAction, type FormState } from "@/app/idea-generator/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Wand2, Sparkles, Lightbulb, Save, Trash2, BadgeCheck } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import type { ProjectIdea } from "@/ai/flows/generate-project-ideas";
import { Badge } from "@/components/ui/badge";

const initialState: FormState = {
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full font-semibold">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
      Generate Ideas
    </Button>
  );
}

function GeneratedIdeas({ state, onSave, savedIdeas }: { state: FormState; onSave: (idea: ProjectIdea) => void; savedIdeas: ProjectIdea[] }) {
  const { pending } = useFormStatus();

  if (pending) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="bg-transparent">
            <CardHeader>
              <Skeleton className="h-5 w-3/5" />
              <Skeleton className="h-4 w-4/5" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full mt-2" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-10 w-24" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  if (state.data?.ideas && state.data.ideas.length > 0) {
    return (
      <div className="space-y-6">
        {state.data.ideas.map((idea, index) => {
          const isSaved = savedIdeas.some(savedIdea => savedIdea.title === idea.title);
          return (
            <Card key={index} className="bg-gradient-to-br from-accent/50 to-background shadow-md">
              <CardHeader>
                <CardTitle>{idea.title}</CardTitle>
                <CardDescription>{idea.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-semibold mb-2">Suggested Tech Stack:</p>
                <div className="flex flex-wrap gap-2">
                  {idea.techStack.map(tech => <Badge key={tech} variant="secondary">{tech}</Badge>)}
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => onSave(idea)} disabled={isSaved}>
                  {isSaved ? <BadgeCheck className="mr-2 h-4 w-4" /> : <Save className="mr-2 h-4 w-4" />}
                  {isSaved ? 'Saved' : 'Save Idea'}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center text-center text-muted-foreground h-full min-h-[400px] bg-muted/30 rounded-lg">
       <div className="space-y-4">
        <Lightbulb className="w-16 h-16 mx-auto text-muted-foreground/50"/>
        <p>Your generated ideas will appear here.</p>
      </div>
    </div>
  );
}

function SavedIdeas({ ideas, onRemove }: { ideas: ProjectIdea[]; onRemove: (idea: ProjectIdea) => void; }) {
  if (ideas.length === 0) {
    return null;
  }
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-4 font-headline flex items-center gap-2"><Save /> Saved Ideas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ideas.map((idea, index) => (
          <Card key={index} className="flex flex-col bg-card shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">{idea.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription>{idea.description}</CardDescription>
              <p className="text-sm font-semibold mt-4 mb-2">Tech Stack:</p>
              <div className="flex flex-wrap gap-2">
                {idea.techStack.map(tech => <Badge key={tech} variant="outline">{tech}</Badge>)}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" onClick={() => onRemove(idea)}>
                <Trash2 className="mr-2 h-4 w-4" />
                Remove
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

export function IdeaGeneratorForm() {
  const [state, formAction] = useActionState(generateIdeasAction, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [savedIdeas, setSavedIdeas] = useState<ProjectIdea[]>([]);

  useEffect(() => {
    // Client-side only
    try {
      const ideasFromStorage = localStorage.getItem("savedProjectIdeas");
      if (ideasFromStorage) {
        setSavedIdeas(JSON.parse(ideasFromStorage));
      }
    } catch (error) {
      console.error("Could not parse saved ideas from localStorage", error);
    }
  }, []);

  useEffect(() => {
    if (state.message === "success") {
      toast({
        title: "Ideas Generated!",
        description: "Your new project ideas are ready below.",
      });
    } else if (state.message && state.message !== "" && !state.message.includes("Validation failed")) {
      toast({
        variant: "destructive",
        title: "Error",
        description: state.message,
      });
    }
  }, [state, toast]);
  
  const handleSaveIdea = (idea: ProjectIdea) => {
    const newSavedIdeas = [...savedIdeas, idea];
    setSavedIdeas(newSavedIdeas);
    localStorage.setItem("savedProjectIdeas", JSON.stringify(newSavedIdeas));
    toast({
      title: "Idea Saved!",
      description: `"${idea.title}" has been added to your saved ideas.`,
    })
  }

  const handleRemoveIdea = (ideaToRemove: ProjectIdea) => {
    const newSavedIdeas = savedIdeas.filter(idea => idea.title !== ideaToRemove.title);
    setSavedIdeas(newSavedIdeas);
    localStorage.setItem("savedProjectIdeas", JSON.stringify(newSavedIdeas));
    toast({
        title: "Idea Removed",
        description: `"${ideaToRemove.title}" has been removed.`,
    })
  }


  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-1 lg:sticky lg:top-20">
          <form ref={formRef} action={formAction}>
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Define Your Project</CardTitle>
                <CardDescription>Enter a domain and keywords to fuel the AI.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="categories">Domain</Label>
                  <Input id="categories" name="categories" placeholder="e.g., HealthTech, FinTech" defaultValue={state.fields?.categories} required/>
                  {state.issues && state.issues.length > 0 && <p className="text-sm font-medium text-destructive">{state.issues.find(issue => issue.includes('category'))}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tags">Keywords (optional)</Label>
                  <Input id="tags" name="tags" placeholder="e.g., AI, Social, Real-time" defaultValue={state.fields?.tags}/>
                </div>
              </CardContent>
              <CardFooter>
                <SubmitButton />
              </CardFooter>
            </Card>
          </form>
        </div>

        <div className="lg:col-span-2">
          <Card className="min-h-full bg-transparent border-none">
              <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl font-headline">
                      <Sparkles className="text-primary"/>
                      Generated Ideas
                  </CardTitle>
              </CardHeader>
              <CardContent>
                  <GeneratedIdeas state={state} onSave={handleSaveIdea} savedIdeas={savedIdeas} />
              </CardContent>
          </Card>
        </div>
      </div>
      <SavedIdeas ideas={savedIdeas} onRemove={handleRemoveIdea} />
    </>
  );
}
