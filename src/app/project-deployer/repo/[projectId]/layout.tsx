
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { getProjectById, type Project } from "@/lib/firebase/firestore";
import { GitCommit, Star, File, Folder, Save, Pencil, Book, Code, GitPullRequest, ShieldCheck, LineChart, Settings, Bot, Users, Shell as ShellIcon, Layers, History, GanttChartSquare, Package, GitFork } from "lucide-react";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

const navItems = [
    { name: 'Code', icon: Code, href: '' },
    { name: 'Issues', icon: ShieldCheck, href: '/issues' },
    { name: 'Pull Requests', icon: GitPullRequest, href: '/prs' },
    { name: 'Contributors', icon: Users, href: '/contributors' },
    { name: 'Insights', icon: LineChart, href: '/insights' },
    { name: 'Settings', icon: Settings, href: '/settings' },
];

function ProjectDetailSkeleton() {
    return (
        <div className="space-y-6 animate-pulse">
            <div className="h-8 w-3/5 bg-muted rounded-md"></div>
            <div className="h-5 w-4/5 bg-muted rounded-md"></div>
            <div className="flex gap-4 border-b">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-9 w-20 bg-muted rounded-t-md"></div>
                ))}
            </div>
            <div className="h-64 w-full bg-muted rounded-md"></div>
        </div>
    )
}

export default function RepositoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const params = useParams();
    const pathname = usePathname();
    const projectId = params.projectId as string;
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchProject = async () => {
        if (!projectId) return;
        setLoading(true);
        const projectData = await getProjectById(projectId);
        setProject(projectData);
        setLoading(false);
    };

    useEffect(() => {
        fetchProject();
    }, [projectId]);
    
    if (loading) {
        return <ProjectDetailSkeleton />
    }

    if (!project) {
        return (
            <div className="text-center py-10">
                <h1 className="text-2xl font-bold">Project Not Found</h1>
                <p className="text-muted-foreground">We couldn't find the project you were looking for.</p>
                <Button asChild variant="link" className="mt-4">
                    <Link href="/project-deployer">Back to Projects</Link>
                </Button>
            </div>
        );
    }
    
    return (
         <div className="space-y-4">
            <div className="flex flex-col gap-4">
                <h1 className="text-2xl font-normal text-muted-foreground">
                    <Link href="/project-deployer" className="hover:underline text-primary">Projects</Link>
                    <span className="mx-2">/</span>
                    <span className="font-semibold text-foreground">{project.name}</span>
                    <Badge variant="outline" className="ml-3 align-middle capitalize">{project.visibility}</Badge>
                </h1>
                
                <div className="border-b">
                    <nav className="-mb-px flex space-x-2 overflow-x-auto">
                        {navItems.map((item) => {
                             const itemPath = `/project-deployer/repo/${projectId}${item.href}`;
                             const isActive = pathname === itemPath;
                             return (
                                <Link key={item.name} href={itemPath} className={`flex items-center gap-2 whitespace-nowrap border-b-2 px-3 py-2 text-sm font-medium ${
                                    isActive
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-muted-foreground hover:border-gray-300 hover:text-foreground'
                                }`}>
                                    <item.icon className="h-4 w-4" />
                                    {item.name}
                                </Link>
                            )
                        })}
                    </nav>
                </div>
            </div>
            <div>
                {children}
            </div>
        </div>
    );
}
