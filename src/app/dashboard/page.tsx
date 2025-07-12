import { AppShell } from "@/components/shared/app-shell";
import { QuickAccessGrid } from "@/components/dashboard/quick-access-grid";
import { GeminiInfoCard } from "@/components/dashboard/gemini-info-card";
import { OngoingProjects } from "@/components/dashboard/ongoing-projects";
import { TodaysLogs } from "@/components/dashboard/todays-logs";
import { StatusMonitor } from "@/components/dashboard/status-monitor";
import { TipsCard } from "@/components/dashboard/tips-card";
import { LayoutDashboard } from "lucide-react";

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="flex flex-col gap-8 animate-in fade-in-0 duration-300 ease-in-out">
        <div>
            <h1 className="text-3xl font-bold tracking-tight text-primary font-headline flex items-center gap-3">
                <LayoutDashboard className="h-8 w-8"/>
                Dashboard
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
                Welcome back! Here's a summary of your activities.
            </p>
        </div>
        
        {/* Quick Access Panel at the top */}
        <div className="w-full">
            <QuickAccessGrid />
        </div>

        {/* Main 3-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4 items-start">
            {/* Left Column */}
            <div className="space-y-8">
                <OngoingProjects />
                <TodaysLogs />
            </div>

            {/* Center Column */}
            <div className="space-y-8">
                 <GeminiInfoCard />
            </div>

            {/* Right Column */}
            <div className="space-y-8">
                <StatusMonitor />
                <TipsCard />
            </div>
        </div>
      </div>
    </AppShell>
  );
}
