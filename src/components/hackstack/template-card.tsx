import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, Layers } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

export interface TemplateCardProps {
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  icon?: ReactNode;
}

export function TemplateCard({ title, description, tags, githubUrl, icon }: TemplateCardProps) {
  return (
    <Card className="flex flex-col h-full shadow-lg hover:shadow-2xl transition-shadow duration-300">
      <CardHeader>
        {icon || <Layers className="w-10 h-10 mb-4 text-primary" />}
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full font-semibold">
          <Link href={githubUrl} target="_blank" rel="noopener noreferrer">
            <Github className="mr-2 h-4 w-4" />
            View on GitHub
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
