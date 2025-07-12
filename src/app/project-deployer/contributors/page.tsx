
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge, type BadgeProps } from "@/components/ui/badge";
import { MoreHorizontal, Trash2, UserPlus, Users } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Role = 'Owner' | 'Maintainer' | 'Viewer';

const contributors = [
    { name: "Alice Johnson", email: "alice@example.com", avatar: "https://placehold.co/40x40.png", dataAiHint: "woman avatar", role: "Owner" as Role },
    { name: "Bob Williams", email: "bob@example.com", avatar: "https://placehold.co/40x40.png", dataAiHint: "man avatar", role: "Maintainer" as Role },
];

const roleVariantMap: Record<Role, BadgeProps['variant']> = {
    Owner: 'destructive',
    Maintainer: 'success',
    Viewer: 'secondary'
};

export default function ContributorsPage() {
    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-3xl font-bold flex items-center gap-2"><Users /> Contributors</h1>
                <p className="text-muted-foreground mt-1">
                    Manage roles and access for your project collaborators.
                </p>
            </header>

            <Card>
                <CardHeader>
                    <CardTitle>Invite New Contributor</CardTitle>
                    <CardDescription>Enter an email address to invite someone to your project.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col md:flex-row gap-4">
                    <Input placeholder="contributor@example.com" className="flex-1"/>
                     <Select defaultValue="Viewer">
                        <SelectTrigger className="w-full md:w-[180px]">
                            <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Maintainer">Maintainer</SelectItem>
                            <SelectItem value="Viewer">Viewer</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button><UserPlus className="mr-2" /> Add Contributor</Button>
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle>Manage Access</CardTitle>
                    <CardDescription>
                        {contributors.length} people have access to this project.
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Member</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {contributors.map((user) => (
                                <TableRow key={user.email}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar>
                                                <AvatarImage src={user.avatar} alt={user.name} data-ai-hint={user.dataAiHint} />
                                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-semibold">{user.name}</p>
                                                <p className="text-sm text-muted-foreground">{user.email}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={roleVariantMap[user.role]}>{user.role}</Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {user.role !== 'Owner' && (
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon"><MoreHorizontal /></Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent>
                                                    <DropdownMenuItem className="text-red-500 focus:bg-red-500 focus:text-white">
                                                        <Trash2 className="mr-2"/> Remove
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
