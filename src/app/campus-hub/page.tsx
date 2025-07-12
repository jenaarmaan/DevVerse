
"use client";

import { AppShell } from "@/components/shared/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Megaphone, Calendar, MapPin, ArrowRight, Linkedin, Download, PlusCircle, Search, FileText, Video, Presentation } from "lucide-react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import React from "react";


const events = [
    {
        title: "Global AI Hackathon 2025",
        date: "October 26-28, 2024",
        location: "Virtual",
        tags: ["AI", "Machine Learning", "Competition"],
        description: "Join thousands of developers worldwide to solve real-world problems using cutting-edge AI.",
        href: "#",
    },
    {
        title: "Web Dev Summit",
        date: "November 15, 2024",
        location: "San Francisco, CA",
        tags: ["Web", "Next.js", "Workshops"],
        description: "A full day of talks and workshops from industry leaders on the future of web development.",
        href: "#",
    },
    {
        title: "Open Source Contribution Day",
        date: "December 5, 2024",
        location: "Online",
        tags: ["Open Source", "Community"],
        description: "Contribute to popular open-source projects and get mentored by experienced maintainers.",
        href: "#",
    }
];

const mentors = [
    {
        name: "Elena Rodriguez",
        title: "Senior AI Engineer @ Google",
        avatarUrl: "https://placehold.co/128x128.png",
        dataAiHint: "woman portrait",
        bio: "Passionate about building scalable AI systems and mentoring the next generation of engineers.",
        tags: ["AI/ML", "Genkit", "Python", "Cloud"],
        linkedinUrl: "#",
    },
    {
        name: "Marcus Chen",
        title: "Product Manager @ Firebase",
        avatarUrl: "https://placehold.co/128x128.png",
        dataAiHint: "man portrait",
        bio: "Focused on developer tools and creating seamless user experiences. Former SWE.",
        tags: ["Product", "Firebase", "UX", "Strategy"],
        linkedinUrl: "#",
    },
    {
        name: "Aisha Khan",
        title: "Lead Security Analyst",
        avatarUrl: "https://placehold.co/128x128.png",
        dataAiHint: "woman face",
        bio: "Cybersecurity expert with a background in ethical hacking and threat modeling.",
        tags: ["Cybersecurity", "OWASP", "Pentesting"],
        linkedinUrl: "#",
    },
    {
        name: "David Lee",
        title: "Flutter GDE",
        avatarUrl: "https://placehold.co/128x128.png",
        dataAiHint: "man face",
        bio: "Building beautiful and performant cross-platform applications with Flutter.",
        tags: ["Flutter", "Mobile", "UI/UX", "Dart"],
        linkedinUrl: "#",
    }
];

const resources = [
    { name: "Intro to Genkit Agents.pptx", type: "Presentation", date: "2024-07-21", href: "#", icon: <Presentation className="h-5 w-5 text-orange-500" /> },
    { name: "Firebase Security Best Practices.pdf", type: "PDF", date: "2024-07-20", href: "#", icon: <FileText className="h-5 w-5 text-red-500" /> },
    { name: "Web Dev Summit Keynote.mp4", type: "Video", date: "2024-07-18", href: "#", icon: <Video className="h-5 w-5 text-blue-500" /> },
    { name: "Building Your First Flutter App.pdf", type: "PDF", date: "2024-07-15", href: "#", icon: <FileText className="h-5 w-5 text-red-500" /> },
];

export default function CampusHubPage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <AppShell>
        <div className="space-y-8">
            <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl font-headline">
                    Campus Hub
                </h1>
                <p className="mt-4 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
                    Your central place to find developer events, connect with mentors, and access exclusive resources.
                </p>
            </div>

            <Tabs defaultValue="events">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="events">Events</TabsTrigger>
                    <TabsTrigger value="mentors">Mentors & Judges</TabsTrigger>
                    <TabsTrigger value="resources">Resource Archive</TabsTrigger>
                </TabsList>

                {/* EVENTS TAB */}
                <TabsContent value="events" className="mt-6 space-y-8">
                    <Alert className="bg-accent border-accent-foreground/20">
                        <Megaphone className="h-4 w-4" />
                        <AlertTitle className="font-semibold">Announcements</AlertTitle>
                        <AlertDescription>
                            Applications for the DevVerse Campus Ambassador program are now open! <a href="#" className="font-bold underline">Apply here</a>.
                        </AlertDescription>
                    </Alert>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-6">
                            <h2 className="text-2xl font-bold font-headline">Upcoming Events & Hackathons</h2>
                            <div className="space-y-4">
                                {events.map(event => (
                                    <Card key={event.title} className="hover:shadow-md transition-shadow">
                                        <CardHeader>
                                            <CardTitle>{event.title}</CardTitle>
                                            <div className="flex items-center gap-4 text-sm text-muted-foreground pt-1">
                                                <div className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /><span>{event.date}</span></div>
                                                <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /><span>{event.location}</span></div>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-muted-foreground mb-4">{event.description}</p>
                                            <div className="flex flex-wrap gap-2">
                                                {event.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                                            </div>
                                        </CardContent>
                                        <CardFooter>
                                            <Button asChild>
                                                <Link href={event.href}>Register Now <ArrowRight className="ml-2 h-4 w-4" /></Link>
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-6">
                             <h2 className="text-2xl font-bold font-headline">Events Calendar</h2>
                             <Card>
                                <CardContent className="p-2">
                                    <CalendarComponent
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        className="rounded-md"
                                    />
                                </CardContent>
                             </Card>
                        </div>
                    </div>
                </TabsContent>

                {/* MENTORS TAB */}
                <TabsContent value="mentors" className="mt-6 space-y-6">
                     <h2 className="text-2xl font-bold font-headline text-center">Meet Our Mentors & Judges</h2>
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {mentors.map(mentor => (
                            <Card key={mentor.name} className="flex flex-col text-center items-center p-4">
                                <Avatar className="w-24 h-24 mb-4">
                                    <AvatarImage src={mentor.avatarUrl} data-ai-hint={mentor.dataAiHint} alt={mentor.name}/>
                                    <AvatarFallback>{mentor.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <CardTitle>{mentor.name}</CardTitle>
                                <CardDescription>{mentor.title}</CardDescription>
                                <CardContent className="text-sm text-muted-foreground mt-4 flex-grow">
                                    <p>&quot;{mentor.bio}&quot;</p>
                                    <div className="flex flex-wrap gap-2 justify-center mt-4">
                                        {mentor.tags.map(tag => <Badge key={tag}>{tag}</Badge>)}
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button asChild variant="outline">
                                        <Link href={mentor.linkedinUrl} target="_blank">
                                            <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
                                        </Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                     </div>
                </TabsContent>

                {/* RESOURCES TAB */}
                <TabsContent value="resources" className="mt-6 space-y-6">
                     <h2 className="text-2xl font-bold font-headline text-center">Resource Archive</h2>
                     <Card>
                        <CardHeader className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <div className="relative w-full md:flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input placeholder="Search resources..." className="pl-10"/>
                            </div>
                            <div className="flex gap-2 w-full md:w-auto">
                                <Select>
                                    <SelectTrigger className="w-full md:w-[180px]">
                                        <SelectValue placeholder="Filter by type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Types</SelectItem>
                                        <SelectItem value="pdf">PDF</SelectItem>
                                        <SelectItem value="presentation">Presentation</SelectItem>
                                        <SelectItem value="video">Video</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Button>
                                    <PlusCircle className="mr-2 h-4 w-4" /> Add Resource
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Date Added</TableHead>
                                        <TableHead className="text-right">Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {resources.map(resource => (
                                        <TableRow key={resource.name}>
                                            <TableCell className="font-medium flex items-center gap-2">
                                                {resource.icon}
                                                {resource.name}
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="secondary">{resource.type}</Badge>
                                            </TableCell>
                                            <TableCell>{resource.date}</TableCell>
                                            <TableCell className="text-right">
                                                <Button asChild variant="outline" size="sm">
                                                    <Link href={resource.href}><Download className="mr-2 h-4 w-4" /> Download</Link>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                     </Card>
                </TabsContent>
            </Tabs>
        </div>
    </AppShell>
  );
}
