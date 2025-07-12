import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Github, Linkedin, Mail, MapPin, Pencil } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const userProfile = {
  name: "Jordan Lee",
  avatarUrl: "https://placehold.co/128x128.png",
  dataAiHint: "user avatar",
  coverImageUrl: "https://placehold.co/1200x300.png",
  coverImageDataAiHint: "abstract background",
  headline: "Aspiring Full-Stack Developer | React & Node.js Enthusiast",
  college: "University of Washington",
  location: "Seattle, WA",
  domain: "Web Development",
  github: "#",
  linkedin: "#",
  email: "jordan.lee@example.com",
};

export function ProfileHeader() {
  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <Image 
          src={userProfile.coverImageUrl} 
          data-ai-hint={userProfile.coverImageDataAiHint} 
          alt="Cover image" 
          width={1200} 
          height={300} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4">
            <Button size="icon" variant="secondary">
                <Pencil className="h-4 w-4" />
                <span className="sr-only">Edit Profile</span>
            </Button>
        </div>
        <div className="absolute -bottom-16 left-8">
          <Avatar className="w-32 h-32 border-4 border-background">
            <AvatarImage src={userProfile.avatarUrl} data-ai-hint={userProfile.dataAiHint} />
            <AvatarFallback>{userProfile.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <CardHeader className="pt-20">
        <h2 className="text-3xl font-bold">{userProfile.name}</h2>
        <p className="text-muted-foreground">{userProfile.headline}</p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground pt-2">
          <span>{userProfile.college}</span>
          <span>{userProfile.location}</span>
        </div>
        <div className="flex items-center gap-4 pt-4">
            <Button asChild>
                <Link href={userProfile.linkedin} target="_blank">
                    <Linkedin className="mr-2"/> LinkedIn
                </Link>
            </Button>
            <Button variant="secondary" asChild>
                <Link href={userProfile.github} target="_blank">
                    <Github className="mr-2"/> GitHub
                </Link>
            </Button>
             <Button variant="outline" asChild>
                <a href={`mailto:${userProfile.email}`}>
                    <Mail className="mr-2"/> Contact
                </a>
            </Button>
        </div>
      </CardHeader>
    </Card>
  );
}
