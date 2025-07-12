
import { AppShell } from "@/components/shared/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
    return (
        <AppShell>
            <div className="max-w-3xl mx-auto space-y-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-primary font-headline">
                        App Settings
                    </h1>
                    <p className="mt-2 text-lg text-muted-foreground">
                        Customize your DevVerse Hub experience.
                    </p>
                </div>

                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle>Notification Preferences</CardTitle>
                        <CardDescription>Manage how you receive notifications from us.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="email-notifications">Email Notifications</Label>
                            <Switch id="email-notifications" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                            <Label htmlFor="push-alerts">Push Alerts</Label>
                            <Switch id="push-alerts" />
                        </div>
                         <div className="flex items-center justify-between">
                            <Label htmlFor="system-warnings">System Warnings</Label>
                            <Switch id="system-warnings" defaultChecked />
                        </div>
                    </CardContent>
                </Card>
                
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle>Appearance</CardTitle>
                        <CardDescription>Adjust the look and feel of the application.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-2">
                             <Label htmlFor="theme">Theme</Label>
                            <Select defaultValue="system">
                                <SelectTrigger id="theme" className="w-full">
                                    <SelectValue placeholder="Select theme" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="light">Light</SelectItem>
                                    <SelectItem value="dark">Dark</SelectItem>
                                    <SelectItem value="system">System</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle>Language</CardTitle>
                        <CardDescription>Set your preferred language for the interface.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <div className="grid gap-2">
                            <Label htmlFor="language">Language</Label>
                            <Select defaultValue="en">
                                <SelectTrigger id="language" className="w-full">
                                    <SelectValue placeholder="Select language" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="en">English</SelectItem>
                                    <SelectItem value="es">Español</SelectItem>
                                    <SelectItem value="hi">हिन्दी</SelectItem>
                                    <SelectItem value="fr">Français</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

            </div>
        </AppShell>
    );
}
