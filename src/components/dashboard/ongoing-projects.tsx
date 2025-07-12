import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderKanban, MoreVertical, GitCommit } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const projects = [
  {
    name: "DevVerse Hub Frontend",
    href: "/project-deployer/devverse-hub-frontend",
    progress: 75,
    lastCommit: "feat: Implement dashboard widgets",
  },
  {
    name: "AI Idea Generator API",
    href: "/project-deployer/ai-idea-generator-api",
    progress: 40,
    lastCommit: "refactor: Optimize Genkit prompt",
  },
  {
    name: "CollabBoard Backend",
    href: "/project-deployer/collabboard-backend",
    progress: 90,
    lastCommit: "fix: Add real-time listeners",
  },
];

export function OngoingProjects() {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-lg">
          <div className="flex items-center gap-2">
            <FolderKanban className="w-5 h-5 text-primary" />
            <span>Ongoing Projects</span>
          </div>
          <Button variant="link" asChild className="text-sm">
            <Link href="/project-deployer">View All</Link>
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-6">
          {projects.map((project) => (
            <li key={project.name}>
                <div className="flex items-center justify-between mb-2">
                    <Link href={project.href} className="font-semibold hover:underline">
                        {project.name}
                    </Link>
                    <p className="text-sm font-medium">{project.progress}%</p>
                </div>
              <Progress value={project.progress} aria-label={`${project.name} progress`} />
              <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                    <GitCommit className="w-3 h-3"/>
                    <span>{project.lastCommit}</span>
                </div>
                <Badge variant="secondary">In Progress</Badge>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
