
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PlusCircle, Search, Loader2, Folder, Users as UsersIcon, HardHat, Package } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { getUserProjects, type Project } from "@/lib/firebase/firestore";
import { AddProjectDialog } from "@/components/project-deployer/add-project-dialog";


export default function ProjectDeployerPage() {
    const [user, setUser] = useState<User | null>(null);
    const [ownedProjects, setOwnedProjects] = useState<Project[]>([]);
    const [contributedProjects, setContributedProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchProjects = async (currentUser: User | null) => {
        if (currentUser) {
            setLoading(true);
            const { owned, contributed } = await getUserProjects(currentUser.uid);
            setOwnedProjects(owned);
            setContributedProjects(contributed);
            setLoading(false);
        } else {
            setOwnedProjects([]);
            setContributedProjects([]);
            setLoading(false);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            fetchProjects(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const onProjectAdded = () => {
        fetchProjects(user);
    };

    const ProjectCard = ({ project }: { project: Project }) => (
        <Card key={project.id} className="hover:bg-card/95 transition-colors">
            <CardHeader>
                 <div className="flex items-center gap-4">
                    <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                            <Link href={`/project-deployer/repo/${project.id}`} className="font-semibold text-primary hover:underline text-lg">
                                {project.name}
                            </Link>
                            <Badge variant="outline" className="capitalize text-xs">
                                {project.visibility}
                            </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button asChild>
                            <Link href={`/project-deployer/repo/${project.id}`}>
                                <Folder className="mr-2"/> Open Project
                            </Link>
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-6 text-xs text-muted-foreground">
                    <div className="flex flex-wrap gap-2">
                    {project.techStack.map(tech => (
                        <Badge variant="secondary" key={tech}>{tech}</Badge>
                    ))}
                    </div>
                    <span className="flex items-center gap-1.5">
                        <UsersIcon className="w-4 h-4" />
                        {project.contributors.length} {project.contributors.length === 1 ? 'Contributor' : 'Contributors'}
                    </span>
                </div>
            </CardContent>
            <CardFooter className="text-xs text-muted-foreground">
                Last updated {formatDistanceToNow(project.updatedAt?.toDate() || new Date(), { addSuffix: true })}
            </CardFooter>
        </Card>
    );

    const EmptyState = ({ title, description, showAddButton }: { title: string, description: string, showAddButton?: boolean }) => (
        <Card className="text-center p-8 border-dashed">
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
            {showAddButton && (
                <div className="mt-4">
                    <AddProjectDialog onProjectAdded={onProjectAdded} />
                </div>
            )}
        </Card>
    );


    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <h1 className="text-2xl font-semibold">All Projects</h1>
                 <div className="flex items-center gap-2 w-full md:w-auto">
                    <div className="relative flex-1">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Filter by name or stack..." className="pl-8" />
                    </div>
                    <AddProjectDialog onProjectAdded={onProjectAdded} />
                </div>
            </div>
            
            <div className="space-y-8">
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                ) : (
                    <>
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold flex items-center gap-2"><Package/> My Projects</h2>
                            {ownedProjects.length > 0 ? (
                                ownedProjects.map((project) => <ProjectCard key={project.id} project={project} />)
                            ) : (
                                <EmptyState 
                                    title="No Projects Found" 
                                    description="Get started by creating your first project." 
                                    showAddButton={true} 
                                />
                            )}
                        </div>

                         <div className="space-y-4">
                             <h2 className="text-xl font-semibold flex items-center gap-2"><HardHat/> Contributed Projects</h2>
                            {contributedProjects.length > 0 ? (
                                contributedProjects.map((project) => <ProjectCard key={project.id} project={project} />)
                            ) : (
                                <EmptyState 
                                    title="No Contributed Projects" 
                                    description="Projects you are invited to will appear here." 
                                />
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
