
"use client";

import { AppShell } from "@/components/shared/app-shell";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Folder, GitCommit, Github, Layers, Plus, Sparkles, Terminal, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const deployerNavItems = [
    { title: "All Projects", href: "/project-deployer", icon: Folder },
    { title: "Initialize", href: "/project-deployer/init", icon: Plus },
    { title: "Deploy Logs", href: "/project-deployer/logs", icon: Terminal },
    { title: "Contributors", href: "/project-deployer/contributors", icon: Users },
    { title: "GitHub Integration", href: "/project-deployer/github", icon: Github },
    { title: "Gemini Assistant", href: "/project-deployer/gemini", icon: Sparkles },
    { title: "My Builds", href: "/project-deployer/builds", icon: Layers },
];

function ProjectDeployerSidebar() {
    const pathname = usePathname();
    return (
        <aside className="hidden w-64 flex-col border-r bg-background lg:flex">
            <div className="flex-1 overflow-y-auto">
                <nav className="flex flex-col gap-1 p-4">
                    {deployerNavItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link key={item.href} href={item.href}>
                                <Button
                                    variant={isActive ? "secondary" : "ghost"}
                                    className="w-full justify-start gap-2"
                                    aria-current={isActive ? "page" : undefined}
                                >
                                    <item.icon className="h-4 w-4" />
                                    <span>{item.title}</span>
                                </Button>
                            </Link>
                        )
                    })}
                </nav>
            </div>
        </aside>
    )
}

export default function ProjectDeployerLayout({ children }: { children: ReactNode }) {
  return (
    <AppShell>
        <div className="flex min-h-[calc(100vh-4rem)] w-full">
            <ProjectDeployerSidebar />
            <main className="flex-1 p-6 bg-muted/30">
                {children}
            </main>
        </div>
    </AppShell>
  );
}
