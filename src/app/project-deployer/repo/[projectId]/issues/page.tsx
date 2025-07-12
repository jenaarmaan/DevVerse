
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, GitCommit, MessageSquare, PlusCircle } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

const mockIssues = [
  {
    id: 1,
    title: "Authentication flow fails on mobile",
    status: "Open",
    labels: ["bug", "critical"],
    author: "alice",
    comments: 3,
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: 2,
    title: "Add dark mode support",
    status: "Open",
    labels: ["enhancement", "ui"],
    author: "bob",
    comments: 0,
    updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
  {
    id: 3,
    title: "Refactor database connection logic",
    status: "Closed",
    labels: ["refactor"],
    author: "charlie",
    comments: 8,
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
];

const labelColors: Record<string, "destructive" | "default" | "secondary" | "success"> = {
    bug: "destructive",
    critical: "destructive",
    enhancement: "success",
    ui: "default",
    refactor: "secondary"
}

export default function IssuesPage() {
    const openIssues = mockIssues.filter(issue => issue.status === 'Open');
    const closedIssues = mockIssues.filter(issue => issue.status === 'Closed');

    return (
        <div className="space-y-6">
            <div className="flex justify-end">
                <Button>
                    <PlusCircle className="mr-2"/>
                    New Issue
                </Button>
            </div>
            <Card>
                <Tabs defaultValue="open">
                    <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
                        <TabsTrigger value="open" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none px-4">
                            <AlertCircle className="mr-2"/> {openIssues.length} Open
                        </TabsTrigger>
                        <TabsTrigger value="closed" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none px-4">
                            <CheckCircle className="mr-2"/> {closedIssues.length} Closed
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="open">
                       {openIssues.map(issue => (
                           <div key={issue.id} className="border-t p-4 flex items-start gap-4 hover:bg-muted/50">
                                <AlertCircle className="h-5 w-5 mt-1 text-green-600"/>
                                <div className="flex-1">
                                    <Link href="#" className="font-semibold hover:text-primary">{issue.title}</Link>
                                    <div className="flex flex-wrap gap-2 my-1">
                                        {issue.labels.map(label => (
                                            <Badge key={label} variant={labelColors[label] || "secondary"} className="capitalize">{label}</Badge>
                                        ))}
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        #{issue.id} opened {formatDistanceToNow(issue.updatedAt, { addSuffix: true })} by {issue.author}
                                    </p>
                                </div>
                                {issue.comments > 0 && (
                                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                        <MessageSquare className="h-4 w-4"/>
                                        {issue.comments}
                                    </div>
                                )}
                           </div>
                       ))}
                    </TabsContent>
                    <TabsContent value="closed">
                         {closedIssues.map(issue => (
                           <div key={issue.id} className="border-t p-4 flex items-start gap-4 hover:bg-muted/50">
                                <CheckCircle className="h-5 w-5 mt-1 text-purple-600"/>
                                <div className="flex-1">
                                    <Link href="#" className="font-semibold hover:text-primary">{issue.title}</Link>
                                     <div className="flex flex-wrap gap-2 my-1">
                                        {issue.labels.map(label => (
                                            <Badge key={label} variant={labelColors[label] || "secondary"} className="capitalize">{label}</Badge>
                                        ))}
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        #{issue.id} by {issue.author} was closed {formatDistanceToNow(issue.updatedAt, { addSuffix: true })}
                                    </p>
                                </div>
                                 {issue.comments > 0 && (
                                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                        <MessageSquare className="h-4 w-4"/>
                                        {issue.comments}
                                    </div>
                                )}
                           </div>
                       ))}
                    </TabsContent>
                </Tabs>
            </Card>
        </div>
    );
}
