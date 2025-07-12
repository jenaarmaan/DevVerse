"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge, type BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


type Role = 'student' | 'mentor' | 'organizer' | 'admin';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: Role;
}

const initialUsers: User[] = [
  { id: 'usr_1', name: 'Alice Johnson', email: 'alice@example.com', avatar: 'https://placehold.co/40x40.png', role: 'student' },
  { id: 'usr_2', name: 'Bob Williams', email: 'bob@example.com', avatar: 'https://placehold.co/40x40.png', role: 'mentor' },
  { id: 'usr_3', name: 'Charlie Brown', email: 'charlie@example.com', avatar: 'https://placehold.co/40x40.png', role: 'organizer' },
  { id: 'usr_4', name: 'Diana Prince', email: 'diana@example.com', avatar: 'https://placehold.co/40x40.png', role: 'admin' },
  { id: 'usr_5', name: 'Ethan Hunt', email: 'ethan@example.com', avatar: 'https://placehold.co/40x40.png', role: 'student' },
];

const roleBadgeVariant: Record<Role, BadgeProps['variant']> = {
  student: 'default', // Blue
  mentor: 'success', // Green
  organizer: 'secondary', // Gray
  admin: 'destructive', // Red
};

const roleDisplayName: Record<Role, string> = {
    student: 'Student',
    mentor: 'Mentor',
    organizer: 'Organizer',
    admin: 'Admin',
};


export function RoleManager() {
  const [users, setUsers] = useState<User[]>(initialUsers);

  const handleRoleChange = (userId: string, newRole: Role) => {
    setUsers(users.map(user => user.id === userId ? { ...user, role: newRole } : user));
  };

  return (
    <Card className="shadow-2xl">
      <CardHeader>
        <CardTitle>User Role Management</CardTitle>
        <CardDescription>Assign roles and manage users on the platform.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold">User</TableHead>
                <TableHead className="font-semibold">Role</TableHead>
                <TableHead className="text-right font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map(user => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar} alt={user.name} data-ai-hint="user avatar" />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                     <div className="flex items-center gap-2">
                        <Badge variant={roleBadgeVariant[user.role]} className="w-20 justify-center">
                            {roleDisplayName[user.role]}
                        </Badge>
                        <Select value={user.role} onValueChange={(value: Role) => handleRoleChange(user.id, value)}>
                            <SelectTrigger className="w-40 h-9">
                                <SelectValue placeholder="Change role..." />
                            </SelectTrigger>
                            <SelectContent>
                                {(Object.keys(roleDisplayName) as Role[]).map(roleKey => (
                                     <SelectItem key={roleKey} value={roleKey}>{roleDisplayName[roleKey]}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                     <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu for {user.name}</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Edit User</DropdownMenuItem>
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive focus:text-destructive-foreground focus:bg-destructive">Delete User</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
