
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GitPullRequest, GitMerge, GitPullRequestClosed, PlusCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";


const mockPRs = [
    {
        id: 1,
        title: "feat: Add dark mode toggle",
        status: "Open",
        author: "alice",
        branch: "feature/dark-mode",
        updatedAt: new Date(Date.now() - 3 * 60 * 60 * 1000)
    },
    {
        id: 2,
        title: "fix: Correct spelling mistakes in README",
        status: "Merged",
        author: "bob",
        branch: "fix/readme-typos",
        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    },
    {
        id: 3,
        title: "refactor: Simplify component API",
        status: "Closed",
        author: "alice",
        branch: "refactor/component-api",
        updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
    }
];

export default function PullRequestsPage() {
    const openPRs = mockPRs.filter(pr => pr.status === 'Open');
    const mergedPRs = mockPRs.filter(pr => pr.status === 'Merged');
    const closedPRs = mockPRs.filter(pr => pr.status === 'Closed');

    const renderPRList = (prs: typeof mockPRs) => {
        if (prs.length === 0) {
            return <div className="text-center p-8 text-muted-foreground">No pull requests here.</div>;
        }
        return prs.map(pr => (
            <div key={pr.id} className="border-t p-4 flex items-start gap-4 hover:bg-muted/50">
                {pr.status === "Open" && <GitPullRequest className="h-5 w-5 mt-1 text-green-600"/>}
                {pr.status === "Merged" && <GitMerge className="h-5 w-5 mt-1 text-purple-600"/>}
                {pr.status === "Closed" && <GitPullRequestClosed className="h-5 w-5 mt-1 text-red-600"/>}
                <div className="flex-1">
                    <Link href="#" className="font-semibold hover:text-primary">{pr.title}</Link>
                    <p className="text-xs text-muted-foreground mt-1">
                        #{pr.id} opened {formatDistanceToNow(pr.updatedAt, { addSuffix: true })} by {pr.author} from <strong>{pr.branch}</strong>
                    </p>
                </div>
            </div>
        ));
    };

    return (
        <div className="space-y-6">
             <div className="flex justify-end">
                <Button>
                    <PlusCircle className="mr-2"/>
                    New Pull Request
                </Button>
            </div>
            <Card>
                 <Tabs defaultValue="open">
                     <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
                        <TabsTrigger value="open" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none px-4">
                            <GitPullRequest className="mr-2"/> {openPRs.length} Open
                        </TabsTrigger>
                         <TabsTrigger value="merged" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none px-4">
                            <GitMerge className="mr-2"/> {mergedPRs.length} Merged
                        </TabsTrigger>
                        <TabsTrigger value="closed" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none px-4">
                            <GitPullRequestClosed className="mr-2"/> {closedPRs.length} Closed
                        </TabsTrigger>
                    </TabsList>
                     <TabsContent value="open">
                        {renderPRList(openPRs)}
                     </TabsContent>
                    <TabsContent value="merged">
                        {renderPRList(mergedPRs)}
                    </TabsContent>
                    <TabsContent value="closed">
                        {renderPRList(closedPRs)}
                    </TabsContent>
                 </Tabs>
            </Card>
        </div>
    );
}
