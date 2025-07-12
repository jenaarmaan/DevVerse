import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderKanban, Users, Github, Rocket } from "lucide-react";
import Link from "next/link";
import type { VariantProps } from "class-variance-authority";
import type { badgeVariants } from "@/components/ui/badge";

type BadgeVariant = VariantProps<typeof badgeVariants>["variant"];

const summaryData: {
  icon: React.ReactNode;
  title: string;
  count: string;
  subtext: string;
  badgeVariant: BadgeVariant;
  href: string;
}[] = [
  {
    icon: <FolderKanban className="h-6 w-6 text-muted-foreground" />,
    title: "Total Projects",
    count: "128",
    subtext: "View All Projects",
    badgeVariant: "default",
    href: "/hackstack"
  },
  {
    icon: <Users className="h-6 w-6 text-muted-foreground" />,
    title: "Active Teams",
    count: "34",
    subtext: "Manage Teams",
    badgeVariant: "success",
    href: "/collabboard"
  },
  {
    icon: <Github className="h-6 w-6 text-muted-foreground" />,
    title: "GitHub Linked Repos",
    count: "56",
    subtext: "Link a New Repo",
    badgeVariant: "warning",
    href: "#"
  },
  {
    icon: <Rocket className="h-6 w-6 text-muted-foreground" />,
    title: "Recent Deployments",
    count: "12",
    subtext: "View Deployment Logs",
    badgeVariant: "destructive",
    href: "/project-deployer"
  },
];

export function DashboardSummary() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {summaryData.map((item) => (
        <Link key={item.title} href={item.href} className="block">
          <Card className="hover:shadow-xl transition-shadow duration-300 h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
              {item.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.count}</div>
              <p className="text-xs text-muted-foreground">{item.subtext}</p>
              <Badge variant={item.badgeVariant} className="mt-4 font-semibold">
                {item.badgeVariant === 'default' ? 'Info' : item.badgeVariant?.charAt(0).toUpperCase()! + item.badgeVariant!.slice(1)}
              </Badge>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
