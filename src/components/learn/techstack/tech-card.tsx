
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { Technology } from "@/lib/techstack-data";
import { Book, Github, Lightbulb } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface TechCardProps {
  tech: Technology;
}

export function TechCard({ tech }: TechCardProps) {
  return (
    <Card className="flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <div className="flex items-center gap-4">
          <Image src={tech.iconUrl} data-ai-hint={tech.dataAiHint} alt={`${tech.title} logo`} width={48} height={48} className="rounded-lg" />
          <div>
            <CardTitle>{tech.title}</CardTitle>
            {tech.type && <Badge variant="secondary" className="mt-1">{tech.type}</Badge>}
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <CardDescription>{tech.description}</CardDescription>
        <div className="flex flex-wrap gap-2">
            {tech.tags.map(tag => <Badge key={tag} variant="outline">{tag}</Badge>)}
        </div>
      </CardContent>
      <CardFooter className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <Button asChild className="font-semibold w-full">
          <a href={tech.docsUrl} target="_blank" rel="noopener noreferrer">
            <Book className="mr-2" /> Docs
          </a>
        </Button>
        <Button asChild variant="secondary" className="font-semibold w-full">
          <a href={tech.githubUrl} target="_blank" rel="noopener noreferrer">
            <Github className="mr-2" /> GitHub
          </a>
        </Button>
        <Button asChild variant="outline" className="font-semibold w-full">
          <Link href={`/idea-generator?tech=${tech.id}`}>
            <Lightbulb className="mr-2" /> Try It
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
