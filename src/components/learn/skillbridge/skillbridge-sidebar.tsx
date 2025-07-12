"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BookOpen, Dumbbell, Trophy } from "lucide-react";
import Link from "next/link";

export function SkillBridgeSidebar() {
  const navItems = [
    {
      title: "Explore Courses",
      href: "/learn/skillbridge/explore-courses",
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      title: "My Completions",
      href: "/learn/skillbridge/completions",
      icon: <Trophy className="h-5 w-5" />,
    },
    {
      title: "Practice Zone",
      href: "/learn/skillbridge/practice",
      icon: <Dumbbell className="h-5 w-5" />,
    },
  ];

  return (
    <aside className="fixed top-16 bottom-16 right-0 z-30 hidden w-20 flex-col items-center border-l bg-background py-6 lg:flex">
      <TooltipProvider>
        <nav className="flex flex-col items-center gap-4">
          {navItems.map((item) => (
            <Tooltip key={item.title} delayDuration={0}>
              <TooltipTrigger asChild>
                <Button
                  asChild
                  variant="ghost"
                  size="icon"
                  aria-label={item.title}
                >
                  <Link href={item.href}>{item.icon}</Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>{item.title}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </nav>
      </TooltipProvider>
    </aside>
  );
}
