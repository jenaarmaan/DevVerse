"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Search, FolderKanban, Users, CodeSquare } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const mockData = {
  projects: [
    { name: "Next.js Firebase Starter", href: "/hackstack" },
    { name: "AI Agent with Genkit", href: "/hackstack" },
    { name: "Flutter Chat App", href: "/hackstack" },
  ],
  users: [
    { name: "Alice Johnson", href: "#" },
    { name: "Bob Williams", href: "#" },
    { name: "Charlie Brown", href: "#" },
  ],
  tools: [
    { name: "HackStack Hub", href: "/hackstack" },
    { name: "CollabBoard", href: "/collabboard" },
    { name: "Project Deployer", href: "/project-deployer" },
    { name: "Idea Generator", href: "/idea-generator" },
  ],
};

type SearchResult = {
  projects: { name: string; href: string }[];
  users: { name: string; href: string }[];
  tools: { name: string; href: string }[];
};

export function UniversalSearch() {
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<SearchResult | null>(null);
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            setIsOpen(false);
        }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  React.useEffect(() => {
    if (query.trim().length > 0) {
      setIsOpen(true);
      const lowerCaseQuery = query.toLowerCase();
      const filteredResults = {
        projects: mockData.projects.filter((p) =>
          p.name.toLowerCase().includes(lowerCaseQuery)
        ),
        users: mockData.users.filter((u) =>
          u.name.toLowerCase().includes(lowerCaseQuery)
        ),
        tools: mockData.tools.filter((t) =>
          t.name.toLowerCase().includes(lowerCaseQuery)
        ),
      };
      
      const hasResults = filteredResults.projects.length > 0 || filteredResults.users.length > 0 || filteredResults.tools.length > 0;
      setResults(hasResults ? filteredResults : null);
    } else {
      setIsOpen(false);
      setResults(null);
    }
  }, [query]);
  
  const handleItemClick = () => {
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div className="relative ml-auto flex-1 md:grow-0">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
                type="search"
                placeholder="Search DevVerse…"
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                aria-label="Search DevVerse"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
            <div className="flex flex-col gap-y-1 p-1">
              {results ? (
                <>
                  {results.tools.length > 0 && (
                    <div>
                      <p className="p-2 text-xs font-semibold text-muted-foreground">Tools</p>
                      <ul className="space-y-1">
                        {results.tools.map((tool) => (
                          <li key={tool.name}>
                            <Link href={tool.href} className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-accent text-sm" onClick={handleItemClick}>
                              <CodeSquare className="h-4 w-4" />
                              <span>{tool.name}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {results.projects.length > 0 && results.tools.length > 0 && <Separator className="my-1" />}

                  {results.projects.length > 0 && (
                    <div>
                      <p className="p-2 text-xs font-semibold text-muted-foreground">Projects</p>
                      <ul className="space-y-1">
                        {results.projects.map((project) => (
                          <li key={project.name}>
                            <Link href={project.href} className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-accent text-sm" onClick={handleItemClick}>
                              <FolderKanban className="h-4 w-4" />
                              <span>{project.name}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {results.users.length > 0 && (results.projects.length > 0 || results.tools.length > 0) && <Separator className="my-1" />}

                  {results.users.length > 0 && (
                    <div>
                      <p className="p-2 text-xs font-semibold text-muted-foreground">Users</p>
                      <ul className="space-y-1">
                        {results.users.map((user) => (
                          <li key={user.name}>
                            <Link href={user.href} className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-accent text-sm" onClick={handleItemClick}>
                              <Users className="h-4 w-4" />
                              <span>{user.name}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              ) : (
                <div className="p-4 text-sm text-center text-muted-foreground">
                  No results found.
                </div>
              )}
            </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
