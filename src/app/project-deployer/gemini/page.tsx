
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Wand2, Sparkles, FileText, FolderTree, FileCode2 } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function GeminiToolsPage() {
    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-3xl font-bold flex items-center gap-2"><Sparkles /> Gemini Assistant</h1>
                <p className="text-muted-foreground mt-1">
                    Leverage AI to generate READMEs, folder structures, CI/CD pipelines, and more.
                </p>
            </header>

             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                       <FileText /> Generate README.md
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Textarea placeholder="Describe your project's purpose and key features..." />
                    <Button><Wand2 className="mr-2" /> Generate</Button>
                </CardContent>
            </Card>

            <Accordion type="single" collapsible className="w-full space-y-4">
                <AccordionItem value="item-1">
                    <Card>
                        <AccordionTrigger className="p-6">
                             <CardTitle className="flex items-center gap-2">
                                <FolderTree /> Suggest Folder Structure
                            </CardTitle>
                        </AccordionTrigger>
                        <AccordionContent className="p-6 pt-0">
                           <div className="space-y-4">
                                <Input placeholder="Enter tech stack (e.g., Next.js, Express, MongoDB)" />
                                <Button><Wand2 className="mr-2" /> Suggest Structure</Button>
                           </div>
                        </AccordionContent>
                    </Card>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <Card>
                         <AccordionTrigger className="p-6">
                             <CardTitle className="flex items-center gap-2">
                                <FileCode2 /> Generate CI/CD Pipeline
                            </CardTitle>
                        </AccordionTrigger>
                        <AccordionContent className="p-6 pt-0">
                            <div className="space-y-4">
                                <Input placeholder="Enter hosting provider (e.g., Firebase, Vercel)" />
                                <Button><Wand2 className="mr-2" /> Generate Pipeline</Button>
                            </div>
                        </AccordionContent>
                    </Card>
                </AccordionItem>
            </Accordion>
        </div>
    );
}
