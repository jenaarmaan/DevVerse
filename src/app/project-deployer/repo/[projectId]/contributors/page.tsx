
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge, type BadgeProps } from "@/components/ui/badge";
import { MoreHorizontal, Trash2, UserPlus, Users, Loader2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { getProjectById, type Project, addContributor, type Contributor, getUserByEmail } from "@/lib/firebase/firestore";
import { auth } from "@/lib/firebase/config";


type Role = 'Owner' | 'Maintainer' | 'Viewer';

const roleVariantMap: Record<Role, BadgeProps['variant']> = {
    Owner: 'destructive',
    Maintainer: 'success',
    Viewer: 'secondary'
};

export default function ContributorsPage() {
    const params = useParams();
    const projectId = params.projectId as string;
    const [project, setProject] = useState<Project | null>(null);
    const [contributors, setContributors] = useState<Contributor[]>([]);
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        const fetchProjectData = async () => {
            if (!projectId) return;
            setIsFetching(true);
            const projectData = await getProjectById(projectId);
            setProject(projectData);
            setContributors(projectData?.contributorsData || []);
            setIsFetching(false);
        };
        fetchProjectData();
    }, [projectId]);

    const handleAddContributor = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim() || !project) {
            toast({ variant: 'destructive', title: "Error", description: "Please enter a valid email." });
            return;
        }
        
        const currentUser = auth.currentUser;
        if (project.ownerId !== currentUser?.uid) {
             toast({ variant: 'destructive', title: "Error", description: "Only the project owner can add contributors." });
             return;
        }

        if (project.contributors.some(c => c.email === email)) {
            toast({ variant: 'destructive', title: "Error", description: "This user is already a contributor." });
            return;
        }

        setIsLoading(true);
        try {
            const userToAdd = await getUserByEmail(email);
            if (!userToAdd) {
                toast({ variant: 'destructive', title: "User Not Found", description: "No user is registered with this email on DevVerse." });
                return;
            }

            await addContributor(projectId, userToAdd.uid, userToAdd.email);
            setContributors(prev => [...prev, { uid: userToAdd.uid, email: userToAdd.email, role: 'Viewer' }]);
            setEmail('');
            toast({ title: "Success!", description: "Contributor added successfully." });
        } catch (error) {
            toast({ variant: 'destructive', title: "Error", description: "Failed to add contributor." });
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Invite New Contributor</CardTitle>
                    <CardDescription>Enter the email address of a registered DevVerse user to invite them.</CardDescription>
                </CardHeader>
                <form onSubmit={handleAddContributor}>
                    <CardContent className="flex flex-col md:flex-row gap-4">
                        <Input 
                            placeholder="contributor@example.com" 
                            className="flex-1"
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? <Loader2 className="mr-2 animate-spin" /> : <UserPlus className="mr-2" />} 
                            Add Contributor
                        </Button>
                    </CardContent>
                </form>
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
                            {isFetching ? (
                                <TableRow>
                                    <TableCell colSpan={3} className="text-center">
                                        <Loader2 className="mx-auto my-4 h-6 w-6 animate-spin" />
                                    </TableCell>
                                </TableRow>
                            ) : contributors.map((user) => (
                                <TableRow key={user.uid}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar>
                                                <AvatarImage src={`https://placehold.co/40x40.png?text=${user.email[0].toUpperCase()}`} alt={user.email} data-ai-hint="user avatar" />
                                                <AvatarFallback>{user.email[0].toUpperCase()}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-semibold">{user.email}</p>
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

