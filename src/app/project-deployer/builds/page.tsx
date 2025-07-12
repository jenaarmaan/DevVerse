
"use client";

import { Badge, type BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Layers, RotateCw, History } from "lucide-react";

type BuildStatus = "Success" | "Failed" | "In-Progress";

const builds = [
    { id: "build_1a2b3c", timestamp: "2 hours ago", status: "Success" as BuildStatus, link: "#" },
    { id: "build_4d5e6f", timestamp: "5 hours ago", status: "Failed" as BuildStatus, link: null },
    { id: "build_7g8h9i", timestamp: "1 day ago", status: "Success" as BuildStatus, link: "#" },
];

const statusVariantMap: Record<BuildStatus, BadgeProps['variant']> = {
    Success: 'success',
    Failed: 'destructive',
    "In-Progress": 'default',
};

export default function BuildHistoryPage() {
    return (
         <div className="space-y-6">
            <header>
                <h1 className="text-3xl font-bold flex items-center gap-2"><Layers /> Build History</h1>
                <p className="text-muted-foreground mt-1">
                    Review past and in-progress deployments for your projects.
                </p>
            </header>
            <Card>
                 <CardHeader>
                    <CardTitle>Previous Builds</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Build ID</TableHead>
                                <TableHead>Timestamp</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {builds.map((build) => (
                                <TableRow key={build.id}>
                                    <TableCell className="font-mono">{build.id}</TableCell>
                                    <TableCell>{build.timestamp}</TableCell>
                                    <TableCell><Badge variant={statusVariantMap[build.status]}>{build.status}</Badge></TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex gap-2 justify-end">
                                            <Button variant="outline" size="sm"><History className="mr-2" /> View Logs</Button>
                                            <Button variant="outline" size="sm"><RotateCw className="mr-2" /> Re-deploy</Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
