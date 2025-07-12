"use client";

import type { ReactNode } from "react";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from 'next/navigation';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from "@/lib/firebase/config";
import { Sidebar, SidebarProvider } from "@/components/ui/sidebar";
import { SidebarContent } from "./sidebar-content";
import { Footer } from "./footer";
import { Header } from "./header";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SkillBridgeSidebar } from "../learn/skillbridge/skillbridge-sidebar";
import { TechCategorySidebar } from "../learn/techstack/tech-category-sidebar";

// List of path prefixes that require authentication
const restrictedPaths = [
  '/idea-generator',
  '/collabboard',
  '/project-deployer',
  '/hackstack',
  '/dashboard',
  '/account',
  '/learn/skillbridge'
];

// A simple loading skeleton for the shell
function AppShellSkeleton() {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-background">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
    );
}

function Shell({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const isSkillBridgePage = pathname.startsWith('/learn/skillbridge');
    const isTechStackPage = pathname.startsWith('/learn/techstack');

    return (
        <div className="flex min-h-screen w-full">
            <Sidebar>
                <SidebarContent />
            </Sidebar>
            <div className="flex flex-1 flex-col">
                <Header />
                <main className={cn(
                    "flex-1 overflow-y-auto p-6 bg-[#f8f9fa]",
                    (isSkillBridgePage || isTechStackPage) && "lg:pr-20"
                )}>
                    {children}
                </main>
                <div className={cn(
                    (isSkillBridgePage || isTechStackPage) && "lg:pr-20"
                )}>
                    <Footer />
                </div>
            </div>
            {isSkillBridgePage && <SkillBridgeSidebar />}
            {isTechStackPage && <TechCategorySidebar />}
        </div>
    )
}

export function AppShell({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (loading) {
      return; // Wait until auth state is confirmed
    }

    const isRestricted = restrictedPaths.some(path => pathname.startsWith(path));

    if (!user && isRestricted) {
        // If user is not logged in and tries to access a restricted path
        setShowLoginPrompt(true);
    } else {
        setShowLoginPrompt(false);
    }
  }, [user, loading, pathname]);

  if (loading) {
    return <AppShellSkeleton />;
  }
  
  // To prevent content flashing on restricted pages, we show a skeleton instead of the actual children
  const isEffectivelyBlocked = !user && restrictedPaths.some(path => pathname.startsWith(path));

  return (
    <SidebarProvider>
      <Shell>
        {isEffectivelyBlocked ? <AppShellSkeleton /> : children}
        
        <AlertDialog open={showLoginPrompt}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Authentication Required</AlertDialogTitle>

                    <AlertDialogDescription>
                        You need to be logged in to access this feature. Please log in to continue.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel asChild>
                        <Button variant="outline" onClick={() => {
                            setShowLoginPrompt(false);
                            router.push('/');
                        }}>
                            Cancel
                        </Button>
                    </AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <Button onClick={() => {
                            setShowLoginPrompt(false);
                            router.push('/login');
                        }}>
                            Login
                        </Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
      </Shell>
    </SidebarProvider>
  );
}
