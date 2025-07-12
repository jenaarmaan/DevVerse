
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useFormState, useFormStatus } from "react-dom";
import { getProjectById, type Project } from "@/lib/firebase/firestore";
import { updateProjectAction, deleteProjectAction } from "../actions";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

function SubmitButton({ children, variant }: { children: React.ReactNode, variant?: "default" | "destructive" }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} variant={variant}>
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      {children}
    </Button>
  );
}

export default function SettingsPage() {
    const params = useParams();
    const router = useRouter();
    const projectId = params.projectId as string;
    const [project, setProject] = useState<Project | null>(null);
    const { toast } = useToast();

    const [updateState, updateFormAction] = useFormState(updateProjectAction.bind(null, projectId), { success: false, message: '' });

    useEffect(() => {
        if (updateState.message) {
            if (updateState.success) {
                toast({ title: "Success!", description: updateState.message });
            } else {
                toast({ variant: "destructive", title: "Error", description: updateState.message });
            }
        }
    }, [updateState, toast]);

    useEffect(() => {
        if (projectId) {
            getProjectById(projectId).then(setProject);
        }
    }, [projectId]);

    if (!project) {
        return <div className="text-center">Loading settings...</div>;
    }

    return (
        <div className="space-y-8">
            <form action={updateFormAction}>
                <Card>
                    <CardHeader>
                        <CardTitle>General Settings</CardTitle>
                        <CardDescription>Update your project's name, description, and visibility.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Project Name</Label>
                            <Input id="name" name="name" defaultValue={project.name} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Input id="description" name="description" defaultValue={project.description} />
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-end border-t pt-6">
                        <SubmitButton>Save Changes</SubmitButton>
                    </CardFooter>
                </Card>
                <Card className="mt-8">
                     <CardHeader>
                        <CardTitle>Visibility</CardTitle>
                        <CardDescription>Control who can see this project.</CardDescription>
                    </CardHeader>
                     <CardContent>
                        <RadioGroup name="visibility" defaultValue={project.visibility}>
                            <div className="space-y-2">
                                <Label htmlFor="public" className="flex items-center gap-4 p-4 border rounded-md cursor-pointer hover:bg-accent has-[input:checked]:border-primary">
                                    <RadioGroupItem value="public" id="public" />
                                    <div>
                                        <p className="font-semibold">Public</p>
                                        <p className="text-sm text-muted-foreground">Anyone on the internet can see this project. You choose who can commit.</p>
                                    </div>
                                </Label>
                                 <Label htmlFor="private" className="flex items-center gap-4 p-4 border rounded-md cursor-pointer hover:bg-accent has-[input:checked]:border-primary">
                                    <RadioGroupItem value="private" id="private" />
                                     <div>
                                        <p className="font-semibold">Private</p>
                                        <p className="text-sm text-muted-foreground">You choose who can see and commit to this project.</p>
                                    </div>
                                </Label>
                            </div>
                        </RadioGroup>
                     </CardContent>
                     <CardFooter className="flex justify-end border-t pt-6">
                        <SubmitButton>Update Visibility</SubmitButton>
                    </CardFooter>
                </Card>
            </form>

            <Card className="border-destructive">
                <CardHeader>
                    <CardTitle>Danger Zone</CardTitle>
                    <CardDescription>These actions are irreversible. Please be certain.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-semibold">Delete this project</p>
                            <p className="text-sm text-muted-foreground">Once you delete a project, there is no going back.</p>
                        </div>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete Project
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <form action={async () => {
                                    await deleteProjectAction(projectId);
                                    toast({ title: 'Project deleted' });
                                }}>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will permanently delete the <strong>{project.name}</strong> project and all of its associated data.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <SubmitButton variant="destructive">Yes, delete project</SubmitButton>
                                    </AlertDialogFooter>
                                </form>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
