
"use client";

import { Badge, type BadgeProps } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { formatDistanceToNow } from 'date-fns';
import { Terminal } from "lucide-react";
import { CardDescription } from "@/components/ui/card";

type CommitStatus = "Success" | "Failed" | "Cancelled" | "In Progress";

const commits = [
    { 
        hash: "a1b2c3d", 
        message: "feat: Implement user authentication", 
        author: "Alice", 
        avatar: "https://placehold.co/40x40.png",
        dataAiHint: "woman avatar",
        time: new Date(Date.now() - 2 * 60 * 60 * 1000), 
        project: "devverse-hub-frontend",
        status: "Success" as CommitStatus,
    },
    { 
        hash: "e4f5g6h", 
        message: "fix: Correct alignment on mobile", 
        author: "Bob", 
        avatar: "https://placehold.co/40x40.png",
        dataAiHint: "man avatar",
        time: new Date(Date.now() - 5 * 60 * 60 * 1000), 
        project: "collabboard-backend",
        status: "In Progress" as CommitStatus,
    },
    { 
        hash: "i7j8k9l", 
        message: "docs: Update README with setup instructions", 
        author: "Alice", 
        avatar: "https://placehold.co/40x40.png",
        dataAiHint: "woman avatar",
        time: new Date(Date.now() - 24 * 60 * 60 * 1000), 
        project: "devverse-hub-frontend",
        status: "Cancelled" as CommitStatus,
    },
    { 
        hash: "m0n1o2p", 
        message: "refactor: Simplify component logic", 
        author: "Charlie", 
        avatar: "https://placehold.co/40x40.png",
        dataAiHint: "person avatar",
        time: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        project: "authentication-service",
        status: "Failed" as CommitStatus,
    },
];

const statusVariantMap: Record<CommitStatus, BadgeProps['variant']> = {
  Success: 'success',
  Failed: 'destructive',
  Cancelled: 'secondary',
  "In Progress": 'default'
};

export default function LogsPage() {
    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-3xl font-bold flex items-center gap-2"><Terminal /> Deploy Logs</h1>
                <p className="text-muted-foreground mt-1">
                    View real-time CI/CD logs and build status for your projects.
                </p>
            </header>
            <Card>
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>A timeline of your recent deployment-related commits.</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Commit</TableHead>
                                <TableHead>Author</TableHead>
                                <TableHead>Project</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Time</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {commits.map((commit) => (
                                <TableRow key={commit.hash}>
                                    <TableCell>
                                        <div className="font-medium">{commit.message}</div>
                                        <div className="text-xs text-muted-foreground font-mono">{commit.hash}</div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src={commit.avatar} alt={commit.author} data-ai-hint={commit.dataAiHint} />
                                                <AvatarFallback>{commit.author.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <span>{commit.author}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{commit.project}</TableCell>
                                    <TableCell>
                                        <Badge variant={statusVariantMap[commit.status]}>{commit.status}</Badge>
                                    </TableCell>
                                    <TableCell className="text-right">{formatDistanceToNow(commit.time, { addSuffix: true })}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
