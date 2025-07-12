
import { AppShell } from "@/components/shared/app-shell";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Eye, Github, Linkedin, MessageSquare, Repeat, Search, Send, ThumbsUp, UserPlus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ProfileHeader } from "@/components/collabboard/profile-header";
import { UserPosts } from "@/components/collabboard/user-posts";

const feedPosts = [
  {
    user: { name: "Elena Rodriguez", avatarUrl: "https://placehold.co/48x48.png", dataAiHint: "woman portrait", headline: "Senior AI Engineer @ Google", profileUrl: "#" },
    content: "Looking for a frontend developer skilled in Next.js and Tailwind for a new AI-powered project. We're building a tool to automate code documentation. If you're passionate about clean UI and AI, let's connect!",
    likes: 28,
    comments: 9,
    timestamp: "2h ago",
  },
  {
    user: { name: "Aisha Khan", avatarUrl: "https://placehold.co/48x48.png", dataAiHint: "woman face", headline: "Lead Product Manager @ Microsoft", profileUrl: "#" },
    content: "Just shipped v2 of our project management tool! Huge thanks to the team. We've integrated a new CollabBoard feature that helps teams visualize their workflow in real-time. Feedback is welcome!",
    likes: 56,
    comments: 15,
    timestamp: "5h ago",
  },
];

const connectUsers = [
  { name: "Marcus Chen", avatarUrl: "https://placehold.co/80x80.png", dataAiHint: "man portrait", college: "Stanford University", expertise: ["Cloud", "AWS", "Architecture"], github: "#", linkedin: "#" },
  { name: "David Lee", avatarUrl: "https://placehold.co/80x80.png", dataAiHint: "man face", college: "MIT", expertise: ["Cybersecurity", "Firebase", "Pentesting"], github: "#", linkedin: "#" },
  { name: "Alice Johnson", avatarUrl: "https://placehold.co/80x80.png", dataAiHint: "woman avatar", college: "Carnegie Mellon", expertise: ["React", "Flutter", "UI/UX"], github: "#", linkedin: "#" },
  { name: "Bob Williams", avatarUrl: "https://placehold.co/80x80.png", dataAiHint: "man avatar", college: "UC Berkeley", expertise: ["Node.js", "GraphQL", "DevOps"], github: "#", linkedin: "#" },
];

const invitesReceived = [
  { from: "Charlie Brown", project: "DevVerse Mobile App", avatarUrl: "https://placehold.co/40x40.png", dataAiHint: "person avatar", profileUrl: "#" },
  { from: "Diana Prince", project: "AI-Powered Analytics Dashboard", avatarUrl: "https://placehold.co/40x40.png", dataAiHint: "woman face", profileUrl: "#" },
];

const invitesSent = [
  { to: "Ethan Hunt", project: "E-Commerce Platform Security Audit", status: "Pending", avatarUrl: "https://placehold.co/40x40.png", dataAiHint: "man face", profileUrl: "#" },
  { to: "Frank Moses", project: "Cloud Migration Strategy", status: "Accepted", avatarUrl: "https://placehold.co/40x40.png", dataAiHint: "man portrait", profileUrl: "#" },
  { to: "Grace Hart", project: "AI-Powered CRM Dashboard", status: "Declined", avatarUrl: "https://placehold.co/40x40.png", dataAiHint: "woman portrait", profileUrl: "#" },
];


export default function CollabBoardPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl font-headline">
              CollabBoard
            </h1>
            <p className="mt-2 text-lg leading-8 text-muted-foreground">
              Your central hub for collaboration, networking, and team formation.
            </p>
          </div>
        </div>

        <Tabs defaultValue="feed" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="feed">Feed</TabsTrigger>
            <TabsTrigger value="connect">Connect</TabsTrigger>
            <TabsTrigger value="invitations">Invitations</TabsTrigger>
            <TabsTrigger value="profile">My Profile</TabsTrigger>
          </TabsList>
          
          {/* FEED TAB */}
          <TabsContent value="feed" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-3 space-y-6">
                <Card>
                  <CardHeader className="flex flex-row items-center gap-4">
                    <Avatar>
                      <AvatarImage src="https://placehold.co/48x48.png" data-ai-hint="user avatar"/>
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <Input placeholder="Start a post about your project..." className="h-12"/>
                  </CardHeader>
                  <CardFooter>
                    <Button className="ml-auto">Post</Button>
                  </CardFooter>
                </Card>

                {feedPosts.map((post, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <Link href={post.user.profileUrl}>
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={post.user.avatarUrl} data-ai-hint={post.user.dataAiHint} />
                            <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                        </Link>
                        <div>
                          <Link href={post.user.profileUrl}>
                            <p className="font-semibold hover:underline">{post.user.name}</p>
                          </Link>
                          <p className="text-xs text-muted-foreground">{post.user.headline}</p>
                          <p className="text-xs text-muted-foreground">{post.timestamp}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{post.content}</p>
                    </CardContent>
                    <CardFooter className="flex flex-col items-start gap-4">
                      <div className="flex justify-between w-full text-xs text-muted-foreground">
                        <span>{post.likes} Likes</span>
                        <span>{post.comments} Comments</span>
                      </div>
                      <Separator />
                      <div className="grid grid-cols-4 w-full gap-2">
                          <Button variant="ghost" size="sm"><ThumbsUp className="mr-2"/>Like</Button>
                          <Button variant="ghost" size="sm"><MessageSquare className="mr-2"/>Comment</Button>
                          <Button variant="ghost" size="sm"><Repeat className="mr-2"/>Repost</Button>
                          <Button variant="ghost" size="sm"><Send className="mr-2"/>Send</Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              <div className="lg:col-span-1">
                <Card>
                    <CardHeader>
                        <CardTitle>Who to follow</CardTitle>
                        <CardDescription>People you might know from the DevVerse community.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {connectUsers.slice(0, 3).map(user => (
                             <div key={user.name} className="flex items-center gap-3">
                                <Avatar><AvatarImage src={user.avatarUrl} data-ai-hint={user.dataAiHint}/><AvatarFallback>{user.name.charAt(0)}</AvatarFallback></Avatar>
                                <div className="flex-grow">
                                    <p className="font-semibold">{user.name}</p>
                                    <p className="text-xs text-muted-foreground">{user.college}</p>
                                </div>
                                <Button variant="outline" size="sm"><UserPlus className="mr-2"/>Follow</Button>
                            </div>
                        ))}
                    </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          {/* CONNECT TAB */}
          <TabsContent value="connect" className="mt-6 space-y-8">
            <Card>
              <CardContent className="p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input placeholder="Search by name, skill, or college..." className="h-12 pl-10 text-base" />
                </div>
              </CardContent>
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {connectUsers.map(user => (
                <Card key={user.name} className="text-center flex flex-col">
                  <CardHeader className="items-center">
                    <Avatar className="w-24 h-24 mb-4 border-4 border-background ring-2 ring-primary">
                      <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint={user.dataAiHint} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <CardTitle>{user.name}</CardTitle>
                    <CardDescription>{user.college}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="flex flex-wrap gap-2 justify-center">
                      {user.expertise.map(skill => <Badge key={skill} variant="secondary">{skill}</Badge>)}
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-2">
                    <Button className="w-full"><UserPlus className="mr-2"/>Send Invite</Button>
                    <Button variant="secondary" className="w-full"><Eye className="mr-2"/>View Profile</Button>
                    <div className="flex gap-4 mt-2">
                      <Link href={user.github}><Github className="h-5 w-5 text-muted-foreground hover:text-primary"/></Link>
                      <Link href={user.linkedin}><Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary"/></Link>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
             <Card className="bg-primary text-primary-foreground text-center">
                <CardHeader>
                    <CardTitle>Explore Our Alumni Network</CardTitle>
                    <CardDescription className="text-primary-foreground/80">
                    Discover successful alumni who are making an impact in the tech industry.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button variant="secondary" size="lg" asChild>
                    <Link href="/alumni-showcase">
                        Visit Alumni Showcase <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                    </Button>
                </CardContent>
            </Card>
          </TabsContent>

          {/* INVITATIONS TAB */}
          <TabsContent value="invitations" className="mt-6">
             <Card>
                <CardHeader>
                  <CardTitle>Manage Your Invitations</CardTitle>
                  <CardDescription>Respond to project invitations and track your sent requests.</CardDescription>
                </CardHeader>
                <CardContent className="overflow-x-auto">
                  <Tabs defaultValue="received" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="received">Invitations Received</TabsTrigger>
                      <TabsTrigger value="sent">Requests Sent</TabsTrigger>
                    </TabsList>
                    <TabsContent value="received" className="mt-4">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>From</TableHead>
                                    <TableHead>Project</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {invitesReceived.map((invite, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <Link href={invite.profileUrl} className="flex items-center gap-3 group">
                                                <Avatar className="h-10 w-10">
                                                    <AvatarImage src={invite.avatarUrl} data-ai-hint={invite.dataAiHint} />
                                                    <AvatarFallback>{invite.from.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <span className="font-medium group-hover:underline">{invite.from}</span>
                                            </Link>
                                        </TableCell>
                                        <TableCell>
                                            <p className="font-medium">{invite.project}</p>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex gap-2 justify-end">
                                                <Button size="sm">Accept</Button>
                                                <Button size="sm" variant="outline">Decline</Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TabsContent>
                    <TabsContent value="sent" className="mt-4">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>To</TableHead>
                                    <TableHead>Project</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {invitesSent.map((invite, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <Link href={invite.profileUrl} className="flex items-center gap-3 group">
                                                <Avatar className="h-10 w-10">
                                                    <AvatarImage src={invite.avatarUrl} data-ai-hint={invite.dataAiHint} />
                                                    <AvatarFallback>{invite.to.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                 <span className="font-medium group-hover:underline">{invite.to}</span>
                                            </Link>
                                        </TableCell>
                                        <TableCell>
                                            <p className="font-medium">{invite.project}</p>
                                        </TableCell>
                                        <TableCell>
                                             <Badge variant={
                                                invite.status === "Accepted" ? "success" : 
                                                invite.status === "Declined" ? "destructive" : "default"
                                             }>{invite.status}</Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {invite.status === "Pending" && (
                                                <Button size="sm" variant="outline">Cancel</Button>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TabsContent>
                  </Tabs>
                </CardContent>
             </Card>
          </TabsContent>

          {/* PROFILE TAB */}
          <TabsContent value="profile" className="mt-6">
              <div className="space-y-8">
                  <ProfileHeader />
                  <UserPosts />
              </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  );
}
