

import {
  LayoutDashboard,
  Rocket,
  Users,
  Compass,
  UploadCloud,
  School,
  Lightbulb,
  GraduationCap,
  Calendar,
  type LucideIcon,
  BrainCog,
  FolderKanban,
  GitCommit,
  LineChart,
  ShieldCheck,
} from "lucide-react";

export type NavItem = {
  title: string;
  href: string;
  icon: LucideIcon;
  external?: boolean;
  subItems?: NavItem[];
  description?: string;
};

export type NavCategory = {
  title: string;
  items: NavItem[];
};

export const navConfig: NavCategory[] = [
  {
    title: "Learn",
    items: [
      {
        title: "SkillBridge",
        href: "/learn/skillbridge",
        icon: School,
        description: "Explore curated courses, security insights, and hands-on labs.",
         subItems: [
          { title: "Explore Courses", href: "/learn/skillbridge/explore-courses" },
          { title: "My Completions", href: "/learn/skillbridge/completions" },
          { title: "Practice Zone", href: "/learn/skillbridge/practice" },
        ],
      },
      {
        title: "TechStack Hub",
        href: "/learn/techstack",
        icon: Compass,
        description: "Explore Google technologies and documentation.",
        subItems: [
          { title: "Web", href: "/learn/techstack/web" },
          { title: "Mobile", href: "/learn/techstack/mobile" },
          { title: "AI/ML", href: "/learn/techstack/ai" },
          { title: "Other", href: "/learn/techstack/other" },
        ],
      },
    ],
  },
  {
    title: "Build",
    items: [
      {
        title: "Idea Generator",
        icon: Lightbulb,
        href: "/idea-generator",
        description: "AI-powered tool to generate project ideas.",
      },
      {
        title: "Project Deployer",
        icon: Rocket,
        href: "/project-deployer",
        description: "Manage and deploy your projects.",
      },
    ],
  },
  {
    title: "Explore",
    items: [
      {
        title: "CollabBoard",
        icon: Users,
        href: "/collabboard",
        description: "Invite collaborators and find project partners.",
      },
      {
        title: "Alumni Showcase",
        icon: GraduationCap,
        href: "/alumni-showcase",
        description: "Highlights of senior projects and blogs.",
      },
      {
        title: "Campus Hub",
        icon: Calendar,
        href: "/campus-hub",
        description: "Event announcements and hackathons.",
      },
    ],
  },
  {
    title: "General",
    items: [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
        description: "Dashboard with analytics and quick links.",
      },
    ]
  }
];
