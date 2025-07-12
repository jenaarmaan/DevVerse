
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
import { addCourse } from "@/lib/firebase/firestore";
import type { Course } from "@/lib/courses-data";
import { Loader2, PlusCircle, Upload } from "lucide-react";
import Papa from "papaparse";

interface AddCourseDialogProps {
    onCourseAdded: () => void;
}

export function AddCourseDialog({ onCourseAdded }: AddCourseDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const handleManualSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const courseData: Course = {
        id: formData.get("id") as string,
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        duration: formData.get("duration") as string,
        difficulty: formData.get("difficulty") as 'Beginner' | 'Intermediate' | 'Advanced',
        tags: (formData.get("tags") as string).split(',').map(tag => tag.trim()),
        thumbnailUrl: formData.get("thumbnailUrl") as string,
        courseUrl: formData.get("courseUrl") as string,
    };

    if (!courseData.id || !courseData.title) {
        toast({ variant: "destructive", title: "Error", description: "Course ID and Title are required." });
        setIsLoading(false);
        return;
    }

    try {
        await addCourse(courseData);
        toast({ title: "Success!", description: "Course added successfully." });
        onCourseAdded();
        setIsOpen(false);
    } catch (error) {
        toast({ variant: "destructive", title: "Error", description: "Failed to add course." });
        console.error(error);
    } finally {
        setIsLoading(false);
    }
  };

  const handleBulkUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      setIsLoading(true);
      Papa.parse(file, {
          header: true,
          skipEmptyLines: true,
          complete: async (results) => {
              const courses = results.data as any[];
              let successCount = 0;
              let errorCount = 0;

              const uploadPromises = courses.map(async (course) => {
                   if (!course.id || !course.title) {
                        errorCount++;
                        return;
                    }
                  try {
                    const courseData: Course = {
                        ...course,
                        tags: course.tags && typeof course.tags === 'string' 
                            ? course.tags.split(',').map((t: string) => t.trim()) 
                            : [],
                    };
                    await addCourse(courseData);
                    successCount++;
                  } catch (e) {
                    console.error("Error adding course from CSV:", e);
                    errorCount++;
                  }
              });

              await Promise.all(uploadPromises);
              
              toast({
                  title: "Bulk Upload Complete",
                  description: `${successCount} courses added. ${errorCount > 0 ? `${errorCount} failed.` : ''}`.trim()
              });

              if (successCount > 0) {
                onCourseAdded();
              }
              
              setIsLoading(false);
              setIsOpen(false);
          },
          error: (error) => {
              toast({ variant: "destructive", title: "CSV Error", description: error.message });
              setIsLoading(false);
          }
      });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Course
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add a New Course</DialogTitle>
          <DialogDescription>
            Fill in the details for a single course or upload a CSV for bulk creation.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleManualSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="id">Course ID (Unique)</Label>
              <Input id="id" name="id" required placeholder="e.g., google-ai-essentials" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Course Title</Label>
              <Input id="title" name="title" required placeholder="Introduction to AI"/>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input id="description" name="description" placeholder="A foundational course..."/>
          </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Input id="duration" name="duration" placeholder="e.g., 4 Hours" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="difficulty">Difficulty</Label>
                <Input id="difficulty" name="difficulty" placeholder="Beginner / Intermediate / Advanced" />
              </div>
          </div>
          <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input id="tags" name="tags" placeholder="AI, Gemini, Google Cloud" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="courseUrl">Course URL</Label>
                <Input id="courseUrl" name="courseUrl" placeholder="https://..." />
            </div>
            <div className="space-y-2">
                <Label htmlFor="thumbnailUrl">Thumbnail URL</Label>
                <Input id="thumbnailUrl" name="thumbnailUrl" placeholder="https://placehold.co/..." />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Add Course
            </Button>
          </DialogFooter>
        </form>
        <div className="mt-6 border-t pt-6">
            <h3 className="font-semibold text-center mb-2">Or Bulk Upload</h3>
             <div className="flex justify-center">
                <Button asChild variant="outline">
                    <Label htmlFor="csv-upload">
                        <Upload className="mr-2 h-4 w-4"/>
                        Upload CSV
                        <Input id="csv-upload" type="file" accept=".csv" className="sr-only" onChange={handleBulkUpload}/>
                    </Label>
                </Button>
             </div>
             <p className="text-xs text-muted-foreground text-center mt-2">
                Make sure your CSV has headers: id, title, description, duration, difficulty, tags, thumbnailUrl, courseUrl.
                <a href="/courses.csv" download className="underline text-primary ml-1">Download sample CSV</a>
            </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
