
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    CodeSquare, User, HelpCircle, BookText,
    BookUser, Mail, Github, MessageSquare, Sparkles
} from "lucide-react";
import Link from "next/link";
import { SidebarTrigger } from "../ui/sidebar";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider,
} from "@/components/ui/tooltip";
import { useState, useEffect } from "react";
import { GeminiChat } from "./gemini-chat";
import { UniversalSearch } from "./universal-search";
import { onAuthStateChanged, type User as FirebaseUser } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { signOutUser } from "@/lib/firebase/auth";

export function Header() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    const { error } = await signOutUser();
    if (error) {
      toast({
        variant: "destructive",
        title: "Logout Failed",
        description: "An error occurred while logging out. Please try again.",
      });
    } else {
      toast({
        title: "Success!",
        description: "You have been logged out successfully.",
      });
      router.push("/login");
    }
  };

  return (
    <>
      <TooltipProvider>
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 sm:px-6">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <Link href="/" className="flex items-center gap-2 font-bold">
              <CodeSquare className="w-7 h-7 text-primary" />
              <span className="text-lg font-headline">DevVerse</span>
            </Link>
          </div>
          
          <div className="flex items-center justify-end gap-2">
            <UniversalSearch />
            <Tooltip>
              <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="Toggle Gemini Chat" onClick={() => setIsChatOpen(!isChatOpen)}>
                      <Sparkles className="h-5 w-5" />
                  </Button>
              </TooltipTrigger>
              <TooltipContent>
                  <p>DevVerse Assistant</p>
              </TooltipContent>
            </Tooltip>

            <DropdownMenu>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" aria-label="Help & Support Menu">
                                <HelpCircle className="h-5 w-5" />
                            </Button>
                        </DropdownMenuTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Help & Support</p>
                    </TooltipContent>
                </Tooltip>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                        <Link href="#" role="menuitem">
                            <BookText className="mr-2 h-4 w-4" />
                            <span>Frequently Asked Questions</span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="#" role="menuitem">
                            <BookUser className="mr-2 h-4 w-4" />
                            <span>User Guide</span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                        <a href="mailto:contact@devverse.com" role="menuitem">
                            <Mail className="mr-2 h-4 w-4" />
                            <span>Contact Us</span>
                        </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer" role="menuitem">
                            <Github className="mr-2 h-4 w-4" />
                            <span>View on GitHub</span>
                        </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <a href="mailto:feedback@devverse.com" role="menuitem">
                            <MessageSquare className="mr-2 h-4 w-4" />
                            <span>Send Feedback</span>
                        </a>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="overflow-hidden rounded-full"
                  aria-label="Open user menu"
                >
                  <Avatar>
                    {user?.photoURL && <AvatarImage src={user.photoURL} alt={user.displayName ?? 'User avatar'} />}
                    <AvatarFallback>
                      {user ? (user.email?.charAt(0).toUpperCase() ?? 'U') : <User />}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {user ? (
                  <>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild><Link href="/account/profile">Profile</Link></DropdownMenuItem>
                    <DropdownMenuItem asChild><Link href="/account/settings">Settings</Link></DropdownMenuItem>
                    <DropdownMenuItem asChild><Link href="/account/support">Support</Link></DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:bg-destructive focus:text-destructive-foreground">
                      Logout
                    </DropdownMenuItem>
                  </>
                ) : (
                  <DropdownMenuItem asChild>
                    <Link href="/login">Login</Link>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
      </TooltipProvider>
      <GeminiChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
}
