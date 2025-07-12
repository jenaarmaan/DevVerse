"use client";

import { categories } from "@/lib/techstack-data";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePathname } from "next/navigation";

export function TechCategorySidebar() {
  const pathname = usePathname();
  const categoryValues = Object.values(categories);

  return (
    <aside className="fixed top-16 bottom-16 right-0 z-30 hidden w-20 flex-col items-center border-l bg-background py-6 lg:flex">
      <TooltipProvider>
        <nav className="flex flex-col items-center gap-4">
          {categoryValues.map((category) => {
            const isActive = pathname.includes(`/learn/techstack/${category.id}`);
            return (
              <Tooltip key={category.id} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Button
                    asChild
                    variant={isActive ? "secondary" : "ghost"}
                    size="icon"
                    aria-label={category.title}
                  >
                    <Link href={`/learn/techstack/${category.id}`}>
                      <category.icon className="h-5 w-5" />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left">
                  <p>{category.title}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </nav>
      </TooltipProvider>
    </aside>
  );
}
