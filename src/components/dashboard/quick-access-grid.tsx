
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Calendar,
  Compass,
  Flame,
  GraduationCap,
  Lightbulb,
  Rocket,
  School,
  UploadCloud,
  Users,
} from "lucide-react";
import Link from "next/link";

const quickAccessItems = [
  {
    title: "SkillBridge",
    href: "/learn/skillbridge",
    icon: <School className="h-6 w-6 text-primary" />,
  },
  {
    title: "TechStack Hub",
    href: "/tech-explorer",
    icon: <Compass className="h-6 w-6 text-primary" />,
  },
  {
    title: "Idea Generator",
    href: "/idea-generator",
    icon: <Lightbulb className="h-6 w-6 text-primary" />,
  },
  {
    title: "CollabBoard",
    href: "/collabboard",
    icon: <Users className="h-6 w-6 text-primary" />,
  },
  {
    title: "Project Deployer",
    href: "/project-deployer",
    icon: <UploadCloud className="h-6 w-6 text-primary" />,
  },
  {
    title: "HackStack Hub",
    href: "/hackstack",
    icon: <Rocket className="h-6 w-6 text-primary" />,
  },
  {
    title: "Alumni Showcase",
    href: "/alumni-showcase",
    icon: <GraduationCap className="h-6 w-6 text-primary" />,
  },
  {
    title: "Campus Hub",
    href: "/campus-hub",
    icon: <Calendar className="h-6 w-6 text-primary" />,
  },
  {
    title: "Platform Analytics",
    href: "/admin/stats",
    icon: <Flame className="h-6 w-6 text-primary" />,
  },
];

export function QuickAccessGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {quickAccessItems.map((item) => (
        <Link key={item.title} href={item.href} className="block group">
          <Card className="shadow-sm hover:shadow-md transition-shadow duration-200 rounded-lg flex items-center h-28">
            <CardContent className="p-4 flex items-center gap-4 w-full">
              <div className="bg-primary/10 p-3 rounded-lg shrink-0">
                {item.icon}
              </div>
              <div className="overflow-hidden">
                 <p className="font-medium text-sm text-foreground group-hover:text-primary transition-colors truncate">{item.title}</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
