
"use client";

import { AppShell } from "@/components/shared/app-shell";
import { Badge, type BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowUpRight, BookText, Github, PlusCircle, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Domain = "AI/ML" | "Full Stack" | "Cloud & DevOps" | "Cybersecurity";

const domainColors: Record<Domain, BadgeProps['variant']> = {
  "AI/ML": "destructive",
  "Full Stack": "success",
  "Cloud & DevOps": "default",
  "Cybersecurity": "secondary",
};

const projects = [
  {
    title: "AI Code Assistant",
    author: "Elena Rodriguez",
    college: "Stanford University",
    year: 2023,
    imageUrl: "https://placehold.co/600x400.png",
    dataAiHint: "AI code",
    domain: "AI/ML" as Domain,
    githubUrl: "#",
    blogUrl: "#",
  },
  {
    title: "Real-Time Collaborative whiteboard",
    author: "Marcus Chen",
    college: "MIT",
    year: 2023,
    imageUrl: "https://placehold.co/600x400.png",
    dataAiHint: "whiteboard collaboration",
    domain: "Full Stack" as Domain,
    githubUrl: "#",
    blogUrl: null,
  },
  {
    title: "Automated Cloud Provisioning",
    author: "Aisha Khan",
    college: "UC Berkeley",
    year: 2022,
    imageUrl: "https://placehold.co/600x400.png",
    dataAiHint: "cloud infrastructure",
    domain: "Cloud & DevOps" as Domain,
    githubUrl: "#",
    blogUrl: "#",
  },
  {
    title: "Threat Detection Platform",
    author: "David Lee",
    college: "Carnegie Mellon",
    year: 2024,
    imageUrl: "https://placehold.co/600x400.png",
    dataAiHint: "cyber security",
    domain: "Cybersecurity" as Domain,
    githubUrl: "#",
    blogUrl: null,
  },
  {
    title: "NextGen Social Media Analytics",
    author: "Grace Hart",
    college: "Georgia Tech",
    year: 2024,
    imageUrl: "https://placehold.co/600x400.png",
    dataAiHint: "social media analytics",
    domain: "AI/ML" as Domain,
    githubUrl: "#",
    blogUrl: "#",
  },
  {
    title: "Serverless E-Commerce API",
    author: "Frank Moses",
    college: "University of Washington",
    year: 2022,
    imageUrl: "https://placehold.co/600x400.png",
    dataAiHint: "serverless architecture",
    domain: "Full Stack" as Domain,
    githubUrl: "#",
    blogUrl: "#",
  },
];

export default function AlumniShowcasePage() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <AppShell>
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl font-headline">
              Alumni Projects Showcase
            </h1>
            <p className="mt-4 text-lg leading-8 text-muted-foreground max-w-3xl mx-auto">
              Discover innovative projects built by our talented community. Get inspired and see what's possible.
            </p>
          </div>
          <Card>
            <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4 items-center">
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input placeholder="Search projects by title or author..." className="pl-10" />
                    </div>
                    <div className="flex gap-2 flex-wrap justify-center w-full md:w-auto">
                        <Select>
                            <SelectTrigger className="w-full md:w-[150px]">
                                <SelectValue placeholder="Filter by Year" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="2024">2024</SelectItem>
                                <SelectItem value="2023">2023</SelectItem>
                                <SelectItem value="2022">2022</SelectItem>
                            </SelectContent>
                        </Select>
                         <Select>
                            <SelectTrigger className="w-full md:w-[180px]">
                                <SelectValue placeholder="Filter by Domain" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ai">AI/ML</SelectItem>
                                <SelectItem value="fullstack">Full Stack</SelectItem>
                                <SelectItem value="cloud">Cloud & DevOps</SelectItem>
                                <SelectItem value="security">Cybersecurity</SelectItem>
                            </SelectContent>
                        </Select>
                         <Select>
                            <SelectTrigger className="w-full md:w-[200px]">
                                <SelectValue placeholder="Filter by College" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="stanford">Stanford University</SelectItem>
                                <SelectItem value="mit">MIT</SelectItem>
                                <SelectItem value="berkeley">UC Berkeley</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </CardContent>
          </Card>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button size="lg" className="w-full md:w-auto md:float-right font-semibold">
              <PlusCircle className="mr-2"/> Submit My Work
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-xl">
            <DialogHeader>
              <DialogTitle>Showcase Your Project</DialogTitle>
              <DialogDescription>
                Fill out the form below to submit your project to the showcase.
              </DialogDescription>
            </DialogHeader>
            <form className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">Title</Label>
                    <Input id="title" placeholder="My Awesome Project" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="github" className="text-right">GitHub Link</Label>
                    <Input id="github" placeholder="https://github.com/..." className="col-span-3" />
                </div>
                 <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="blog" className="text-right">Blog Link</Label>
                    <Input id="blog" placeholder="https://my.blog/..." className="col-span-3" />
                </div>
                 <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="tech" className="text-right">Tech Stack</Label>
                    <Input id="tech" placeholder="Next.js, Firebase, Genkit" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="image" className="text-right">Thumbnail</Label>
                    <Input id="image" type="file" className="col-span-3" />
                </div>
            </form>
            <DialogFooter>
                <Button type="submit" onClick={() => setIsOpen(false)}>Submit Project</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 clear-both">
          {projects.map((project) => (
            <Card key={project.title} className="flex flex-col overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <Link href={project.githubUrl} target="_blank">
                <div className="relative h-48 w-full overflow-hidden">
                    <Image src={project.imageUrl} data-ai-hint={project.dataAiHint} alt={project.title} layout="fill" className="object-cover group-hover:scale-105 transition-transform" />
                    <div className="absolute top-2 right-2 bg-background/80 p-1 rounded-full backdrop-blur-sm">
                        <ArrowUpRight className="w-5 h-5"/>
                    </div>
                </div>
              </Link>
              <CardHeader>
                <Badge variant={domainColors[project.domain]} className="w-fit mb-2">{project.domain}</Badge>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>
                  Built by {project.author} ({project.college} &apos;{project.year.toString().slice(-2)})
                </CardDescription>
              </CardHeader>
              <CardFooter className="mt-auto bg-muted/50 p-3 flex justify-end gap-2">
                <Button variant="outline" size="icon" asChild>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`${project.title}'s Github`}>
                    <Github className="h-4 w-4" />
                  </a>
                </Button>
                {project.blogUrl && (
                    <Button variant="outline" size="icon" asChild>
                        <a href={project.blogUrl} target="_blank" rel="noopener noreferrer" aria-label={`${project.title}'s Blog Post`}>
                        <BookText className="h-4 w-4" />
                        </a>
                    </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}

    