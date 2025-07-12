'use client';

import { AppShell } from "@/components/shared/app-shell";
import { Badge, type BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp, Copy, Flame, Play, RotateCw, Search, Settings, X, MoreVertical } from "lucide-react";
import React from "react";

type DeploymentStatus = "Success" | "Failed" | "In Progress" | "Canceled";
type Platform = "Firebase" | "Vercel" | "Netlify";

const deployments = [
  {
    project: "devverse-hub-frontend",
    platform: "Vercel" as Platform,
    status: "Success" as DeploymentStatus,
    lastDeployed: "5m ago",
    commit: "feat: Add new hero section (#a1b2c3d)",
    logs: [
      "10:30:00.123 INFO: Build started",
      "10:30:05.456 INFO: Cloning repository...",
      "10:30:15.789 INFO: Installing dependencies...",
      "10:31:00.123 INFO: Building application...",
      "10:31:30.456 SUCCESS: Build completed successfully.",
      "10:31:45.789 INFO: Deploying to production...",
      "10:32:00.123 SUCCESS: Deployment live!",
    ],
    config: `version: 2.1
jobs:
  build:
    docker:
      - image: cimg/node:18.0
    steps:
      - checkout
      - run: npm install
      - run: npm run build`
  },
  {
    project: "ai-idea-generator-api",
    platform: "Firebase" as Platform,
    status: "Failed" as DeploymentStatus,
    lastDeployed: "2h ago",
    commit: "fix: Handle API rate limits (#e4f5g6h)",
    logs: [
        "11:00:00.000 INFO: Build started",
        "11:00:05.000 INFO: Authenticating with Firebase...",
        "11:00:10.000 ERROR: Authentication failed. Invalid credentials.",
    ],
    config: `hosting:
  public: "out"
  ignore:
    - "firebase.json"
    - "**/.*"
    - "**/node_modules/**"`
  },
  {
    project: "collabboard-backend",
    platform: "Netlify" as Platform,
    status: "In Progress" as DeploymentStatus,
    lastDeployed: "10s ago",
    commit: "refactor: Optimize Firestore queries (#i7j8k9l)",
    logs: [
        "12:00:00.000 INFO: Build started",
        "12:00:05.000 INFO: Detected new commit, starting deploy...",
        "12:00:10.000 INFO: Installing project dependencies...",
    ],
    config: `build:
  command: "npm run build"
  publish: "dist"`
  },
];

const statusVariantMap: Record<DeploymentStatus, BadgeProps['variant']> = {
  Success: 'success',
  Failed: 'destructive',
  "In Progress": 'default',
  Canceled: 'secondary'
};

const PlatformIcon = ({ platform }: { platform: Platform }) => {
    switch(platform) {
        case "Firebase": return <Flame className="w-4 h-4 text-orange-500" />;
        case "Vercel": return <svg height="16" viewBox="0 0 75 65" fill="currentColor"><path d="M37.59.25l36.95 64H.64l36.95-64z"></path></svg>;
        case "Netlify": return <svg height="16" viewBox="0 0 512 512" fill="currentColor"><path d="M464 4.3L16 262.7l239.5 31.8L256 496l208-491.7z" stroke="currentColor" strokeWidth="36" strokeLinejoin="round"></path><path d="M464 4.3L16 262.7l239.5 31.8L256 496l208-491.7z"></path></svg>;
        default: return null;
    }
}

function DeploymentRow({ deployment }: { deployment: typeof deployments[0] }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Collapsible asChild key={deployment.project} open={isOpen} onOpenChange={setIsOpen}>
      <>
        <CollapsibleTrigger asChild>
          <TableRow className="cursor-pointer hover:bg-muted/50">
            <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                    {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    {deployment.project}
                </div>
            </TableCell>
            <TableCell>
                <div className="flex items-center gap-2">
                    <PlatformIcon platform={deployment.platform} />
                    {deployment.platform}
                </div>
            </TableCell>
            <TableCell>
              <Badge variant={statusVariantMap[deployment.status]}>{deployment.status}</Badge>
            </TableCell>
            <TableCell>{deployment.lastDeployed}</TableCell>
            <TableCell className="text-right">
              <Button variant="outline" size="sm">View Logs</Button>
            </TableCell>
          </TableRow>
        </CollapsibleTrigger>
        <CollapsibleContent asChild>
          <TableRow>
            <TableCell colSpan={5} className="p-0">
                <div className="bg-muted/50 p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Live Console Logs</CardTitle>
                            <CardDescription>{deployment.commit}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="bg-gray-900 text-white font-mono text-xs rounded-lg p-4 h-64 overflow-y-auto">
                                {deployment.logs.map((log, i) => <p key={i}>{log}</p>)}
                            </div>
                        </CardContent>
                    </Card>
                    <div className="space-y-6">
                        <Card>
                             <CardHeader>
                                <CardTitle>Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-2 gap-2">
                                <Button variant="outline"><RotateCw className="mr-2"/>Redeploy</Button>
                                <Button variant="outline"><Play className="mr-2 scale-x-[-1]"/>Rollback</Button>
                                <Button variant="outline"><Settings className="mr-2"/>Edit Config</Button>
                                <Button variant="outline"><Copy className="mr-2"/>Copy Link</Button>
                                {deployment.status === "In Progress" && (
                                     <Button variant="destructive" className="col-span-2"><X className="mr-2"/>Cancel Build</Button>
                                )}
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Deployment Config</CardTitle>
                            </CardHeader>
                            <CardContent>
                                 <pre className="bg-gray-100 text-gray-800 text-xs rounded p-2 overflow-x-auto"><code>{deployment.config}</code></pre>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </TableCell>
          </TableRow>
        </CollapsibleContent>
      </>
    </Collapsible>
  );
}


export default function HackStackHubPage() {
    return (
        <AppShell>
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-primary font-headline">
                        Your Cloud Activity
                    </h1>
                    <p className="mt-2 text-lg text-muted-foreground">
                        Track all your deployment events across platforms in real-time.
                    </p>
                </div>
                
                <Card>
                    <CardHeader>
                        <div className="flex flex-col md:flex-row items-center gap-4">
                            <div className="relative flex-1 w-full md:w-auto">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Search deployments..." className="pl-8" />
                            </div>
                            <div className="flex gap-2 w-full md:w-auto">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" className="flex-1 md:flex-initial">Platform: All</Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuCheckboxItem checked>All Platforms</DropdownMenuCheckboxItem>
                                        <DropdownMenuCheckboxItem>Firebase</DropdownMenuCheckboxItem>
                                        <DropdownMenuCheckboxItem>Vercel</DropdownMenuCheckboxItem>
                                        <DropdownMenuCheckboxItem>Netlify</DropdownMenuCheckboxItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" className="flex-1 md:flex-initial">Status: All</Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuCheckboxItem checked>All Statuses</DropdownMenuCheckboxItem>
                                        <DropdownMenuCheckboxItem>Success</DropdownMenuCheckboxItem>
                                        <DropdownMenuCheckboxItem>Failed</DropdownMenuCheckboxItem>
                                        <DropdownMenuCheckboxItem>In Progress</DropdownMenuCheckboxItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Project Name</TableHead>
                                    <TableHead>Platform</TableHead>
                                    <TableHead>CI/CD Status</TableHead>
                                    <TableHead>Last Deployed</TableHead>
                                    <TableHead className="text-right">Logs</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                               {deployments.map((deployment) => (
                                   <DeploymentRow key={deployment.project} deployment={deployment} />
                               ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}
