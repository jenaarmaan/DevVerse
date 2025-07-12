"use client";

import { AppShell } from "@/components/shared/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Book, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const technologies = [
  {
    name: "Gemini",
    description: "Google's most capable and general AI model for building generative AI applications.",
    iconUrl: "https://placehold.co/100x100.png",
    dataAiHint: "AI brain",
    docsUrl: "https://ai.google.dev/docs",
    category: "AI/ML",
  },
  {
    name: "Firebase",
    description: "An app development platform for building and growing apps and games users love.",
    iconUrl: "https://placehold.co/100x100.png",
    dataAiHint: "database icon",
    docsUrl: "https://firebase.google.com/docs",
    category: "Backend",
  },
  {
    name: "Flutter",
    description: "Build, test, and deploy beautiful mobile, web, desktop, and embedded apps from a single codebase.",
    iconUrl: "https://placehold.co/100x100.png",
    dataAiHint: "mobile development",
    docsUrl: "https://docs.flutter.dev/",
    category: "Frontend",
  },
  {
    name: "Google Cloud",
    description: "A suite of cloud computing services that runs on the same infrastructure that Google uses internally.",
    iconUrl: "https://placehold.co/100x100.png",
    dataAiHint: "cloud storage",
    docsUrl: "https://cloud.google.com/docs",
    category: "Backend",
  },
  {
    name: "Keras",
    description: "A deep learning API written in Python, running on top of TensorFlow, for fast experimentation.",
    iconUrl: "https://placehold.co/100x100.png",
    dataAiHint: "neural network",
    docsUrl: "https://keras.io/",
    category: "AI/ML",
  },
  {
    name: "Android",
    description: "The world's most popular mobile OS. Build apps for phones, tablets, watches, and more.",
    iconUrl: "https://placehold.co/100x100.png",
    dataAiHint: "android robot",
    docsUrl: "https://developer.android.com/docs",
    category: "Frontend",
  },
  {
    name: "TensorFlow",
    description: "An end-to-end open source platform for machine learning. It has a comprehensive, flexible ecosystem of tools.",
    iconUrl: "https://placehold.co/100x100.png",
    dataAiHint: "machine learning",
    docsUrl: "https://www.tensorflow.org/overview",
    category: "AI/ML",
  },
  {
    name: "Google Maps Platform",
    description: "Add real-world context to your apps with dynamic maps, routes, and places.",
    iconUrl: "https://placehold.co/100x100.png",
    dataAiHint: "map pin",
    docsUrl: "https://developers.google.com/maps/documentation",
    category: "Frontend",
  },
  {
    name: "Firebase Security",
    description: "Secure your data with robust, flexible, and scalable security rules for Firebase products.",
    iconUrl: "https://placehold.co/100x100.png",
    dataAiHint: "security shield",
    docsUrl: "https://firebase.google.com/docs/security",
    category: "Security",
  },
];

const categories = ["All", "Frontend", "Backend", "AI/ML", "Security"];

export default function TechExplorerPage() {
    const [query, setQuery] = React.useState("");
    const [activeCategory, setActiveCategory] = React.useState("All");

    const filteredTechnologies = technologies.filter(tech => {
        const matchesCategory = activeCategory === "All" || tech.category === activeCategory;
        const matchesQuery = tech.name.toLowerCase().includes(query.toLowerCase());
        return matchesCategory && matchesQuery;
    });

    return (
        <AppShell>
            <div className="space-y-8">
                <div className="text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl font-headline">
                        TechStack Hub
                    </h1>
                    <p className="mt-4 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
                        Explore Google's powerful technologies. Find official documentation and resources to fuel your next project.
                    </p>
                </div>
                
                <Card>
                    <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row items-center gap-4">
                            <div className="relative flex-grow w-full">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input 
                                    placeholder="Search for a tool or technology..." 
                                    className="pl-10 text-base h-11"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                            </div>
                            <div className="flex gap-2 flex-wrap justify-center">
                                {categories.map(category => (
                                    <Button 
                                        key={category}
                                        variant={activeCategory === category ? "default" : "outline"}
                                        onClick={() => setActiveCategory(category)}
                                    >
                                        {category}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredTechnologies.map((tech) => (
                        <Card key={tech.name} className="flex flex-col h-full shadow-lg hover:shadow-2xl transition-shadow duration-300">
                            <CardHeader className="flex-row items-start gap-4 space-y-0">
                                <Image src={tech.iconUrl} data-ai-hint={tech.dataAiHint} alt={`${tech.name} logo`} width={48} height={48} className="rounded-lg"/>
                                <div>
                                    <CardTitle>{tech.name}</CardTitle>
                                    <Badge variant="secondary" className="mt-1">{tech.category}</Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <CardDescription>{tech.description}</CardDescription>
                            </CardContent>
                            <CardFooter>
                                <Button asChild className="w-full font-semibold">
                                    <a href={tech.docsUrl} target="_blank" rel="noopener noreferrer">
                                        <Book className="mr-2 h-4 w-4" />
                                        Docs
                                    </a>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
                {filteredTechnologies.length === 0 && (
                     <div className="text-center col-span-full py-12">
                        <p className="text-muted-foreground">No technologies found matching your criteria.</p>
                    </div>
                )}
            </div>
        </AppShell>
    );
}
