import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ThumbsUp, MessageSquare, Repeat, Send } from "lucide-react";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";

const userPosts = [
  {
    content: "Just finished building the authentication flow for my new project using NextAuth and Firebase. It was a great learning experience! Anyone have tips for implementing role-based access control with it?",
    likes: 15,
    comments: 4,
    timestamp: "1 day ago",
  },
  {
    content: "I'm starting a new open-source project to create a library of accessible-first UI components for React. Looking for contributors who are passionate about accessibility and design systems. DM me if interested!",
    likes: 32,
    comments: 11,
    timestamp: "3 days ago",
  }
];

const currentUser = {
  name: "Jordan Lee",
  avatarUrl: "https://placehold.co/48x48.png",
  dataAiHint: "user avatar"
};

export function UserPosts() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-start gap-4">
          <Avatar>
            <AvatarImage src={currentUser.avatarUrl} data-ai-hint={currentUser.dataAiHint} />
            <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="w-full space-y-2">
             <Textarea placeholder="What's on your mind, Jordan?" className="h-24"/>
             <Input placeholder="Add required skills (e.g., React, Python, Figma)"/>
          </div>
        </CardHeader>
        <CardFooter className="justify-end">
          <Button>Create Post</Button>
        </CardFooter>
      </Card>

      <h3 className="text-xl font-bold">My Activity</h3>
      
      {userPosts.map((post, index) => (
        <Card key={index}>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={currentUser.avatarUrl} data-ai-hint={currentUser.dataAiHint} />
                <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{currentUser.name}</p>
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
  );
}
