
import { AppShell } from "@/components/shared/app-shell";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil } from "lucide-react";

// Mock user data for demonstration
const user = {
    name: "Alex Doe",
    email: "alex.doe@example.com",
    avatarUrl: "https://placehold.co/128x128.png",
    dataAiHint: "user avatar",
    bio: "Full-stack developer with a passion for building beautiful and functional web applications. Enthusiast of open-source and AI.",
};

export default function ProfilePage() {
    return (
        <AppShell>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-primary font-headline">
                        My Profile
                    </h1>
                    <p className="mt-2 text-lg text-muted-foreground">
                        View and manage your personal information.
                    </p>
                </div>
                <div className="flex justify-center">
                    <Card className="w-full max-w-2xl shadow-lg">
                        <CardHeader>
                            <div className="flex flex-col md:flex-row items-center gap-6">
                                <Avatar className="h-24 w-24">
                                    <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint={user.dataAiHint} />
                                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="text-center md:text-left">
                                    <CardTitle className="text-3xl">{user.name}</CardTitle>
                                    <CardDescription className="text-base">{user.email}</CardDescription>
                                </div>
                                <Button variant="outline" size="icon" className="md:ml-auto">
                                    <Pencil className="h-4 w-4" />
                                    <span className="sr-only">Edit Profile</span>
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-semibold text-lg">Bio</h4>
                                    <p className="text-muted-foreground">{user.bio}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppShell>
    );
}
