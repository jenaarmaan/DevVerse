
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { getProjectById, updateProjectReadme, type Project } from "@/lib/firebase/firestore";
import { GitCommit, Star, File, Folder, Save, Pencil, Book, Users, GitFork, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

function ReadmeCard({ project, onUpdate }: { project: Project; onUpdate: (newContent: string) => void }) {
    const [isEditing, setIsEditing] = useState(false);
    const [readmeContent, setReadmeContent] = useState(project.readme || '');
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();

    const handleSave = () => {
        startTransition(async () => {
            try {
                await updateProjectReadme(project.id, readmeContent);
                onUpdate(readmeContent);
                toast({ title: "Success", description: "README updated successfully." });
                setIsEditing(false);
            } catch (error) {
                toast({ variant: "destructive", title: "Error", description: "Failed to update README." });
            }
        });
    };
    
    return (
        <Card>
            <CardHeader className="flex flex-row justify-between items-center bg-muted/50 p-3">
                <div className="flex items-center gap-2">
                    <Book className="h-4 w-4"/>
                    <CardTitle className="text-base font-semibold">README.md</CardTitle>
                </div>
                {!isEditing ? (
                    <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
                        <Pencil className="mr-2 h-4 w-4"/> Edit
                    </Button>
                ) : (
                    <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={() => {
                            setIsEditing(false);
                            setReadmeContent(project.readme);
                        }}>
                            Cancel
                        </Button>
                        <Button size="sm" onClick={handleSave} disabled={isPending}>
                            {isPending ? <Skeleton className="w-4 h-4 rounded-full animate-spin" /> : <Save className="mr-2 h-4 w-4"/>}
                            Save Changes
                        </Button>
                    </div>
                )}
            </CardHeader>
            <CardContent className="p-6 prose dark:prose-invert max-w-none">
                {isEditing ? (
                    <Textarea 
                        value={readmeContent}
                        onChange={(e) => setReadmeContent(e.target.value)}
                        className="min-h-[300px] font-mono text-sm"
                        placeholder="Start writing your README..."
                    />
                ) : project.readme ? (
                    <p className="whitespace-pre-wrap font-mono text-sm">{project.readme}</p>
                ) : (
                    <div className="text-center text-muted-foreground italic py-8">
                        <p>No README file yet.</p>
                        <Button variant="link" onClick={() => setIsEditing(true)}>Click 'Edit' to create one.</Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

const AboutCard = ({ project }: { project: Project }) => {
    return (
         <Card>
            <CardHeader>
                <CardTitle className="text-lg">About</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{project.description || "No description provided."}</p>
                {project.visibility === 'public' && (
                    <a href="#" className="text-sm text-primary hover:underline mb-4 block">https://devverse.app/{project.ownerId}/{project.name}</a>
                )}
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.map(tech => (
                        <Badge key={tech} variant="secondary">{tech}</Badge>
                    ))}
                </div>
                <div className="flex flex-col space-y-2 text-sm">
                    <span className="flex items-center gap-2"><GitCommit className="h-4 w-4"/> - Commits</span>
                    <span className="flex items-center gap-2"><Star className="h-4 w-4"/> - Stars</span>
                    <span className="flex items-center gap-2"><GitFork className="h-4 w-4"/> - Forks</span>
                    <span className="flex items-center gap-2"><Users className="h-4 w-4"/> {project.contributors?.length || 1} {project.contributors?.length === 1 ? 'Contributor' : 'Contributors'}</span>
                </div>
            </CardContent>
        </Card>
    )
}

export default function RepositoryViewPage() {
    const params = useParams();
    const projectId = params.projectId as string;
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchProject = async () => {
        setLoading(true);
        const projectData = await getProjectById(projectId);
        setProject(projectData);
        setLoading(false);
    };

    useEffect(() => {
        if (projectId) {
            fetchProject();
        }
    }, [projectId]);
    
    const handleReadmeUpdate = (newContent: string) => {
        if (project) {
            setProject({...project, readme: newContent});
        }
    }

    if (loading) {
        return <div className="text-center py-10"><Skeleton className="h-8 w-8 animate-spin" /></div>
    }

    if (!project) {
        return (
            <div className="text-center py-10">
                <AlertCircle className="mx-auto h-12 w-12 text-destructive" />
                <h1 className="mt-4 text-2xl font-bold">Project Not Found</h1>
                <p className="mt-2 text-muted-foreground">We couldn't find the project you were looking for.</p>
                <Button asChild variant="link" className="mt-4">
                    <Link href="/project-deployer">Back to Projects</Link>
                </Button>
            </div>
        );
    }
    
    const files = [
        { name: 'src', type: 'folder', commit: 'Initial commit', updated: '2 days ago'},
        { name: '.gitignore', type: 'file', commit: 'Initial commit', updated: '2 days ago'},
        { name: 'package.json', type: 'file', commit: 'Add dependencies', updated: '1 day ago'},
        { name: 'README.md', type: 'file', commit: 'Update docs', updated: '3 hours ago'},
    ];


    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            <div className="lg:col-span-2 space-y-6">
                <Card>
                    <CardHeader className="flex flex-row justify-between items-center p-3 bg-muted/50 border-b">
                        <p className="text-sm font-semibold">main</p>
                        <div className="flex gap-2">
                           <Button variant="outline" size="sm">Add file</Button>
                           <Button size="sm">Code</Button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y">
                            {files.map(file => (
                                <div key={file.name} className="grid grid-cols-3 items-center p-3 hover:bg-muted/50 text-sm">
                                    <div className="flex items-center gap-2">
                                        {file.type === 'folder' ? <Folder className="h-4 w-4 text-primary"/> : <File className="h-4 w-4 text-muted-foreground"/>}
                                        <span className="font-mono">{file.name}</span>
                                    </div>
                                    <p className="text-muted-foreground truncate">{file.commit}</p>
                                    <p className="text-muted-foreground text-right">{file.updated}</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
                
                <ReadmeCard project={project} onUpdate={handleReadmeUpdate} />
            </div>
            <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-24">
               <AboutCard project={project} />
            </div>
        </div>
    );
}
