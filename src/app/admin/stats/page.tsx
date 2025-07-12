import { AppShell } from "@/components/shared/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectsOverTimeChart } from "@/components/admin/stats/projects-over-time-chart";
import { UserRolesChart } from "@/components/admin/stats/user-roles-chart";
import { TopModulesChart } from "@/components/admin/stats/top-modules-chart";
import { Download } from "lucide-react";

export default function StatsPage() {
  return (
    <AppShell>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-primary font-headline">
              Platform Analytics
            </h1>
            <p className="text-muted-foreground">
              An overview of key metrics and user engagement across DevVerse.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Tabs defaultValue="30d" className="w-full md:w-auto">
              <TabsList className="grid w-full grid-cols-3 md:w-auto">
                <TabsTrigger value="7d">7d</TabsTrigger>
                <TabsTrigger value="30d">30d</TabsTrigger>
                <TabsTrigger value="custom">Custom</TabsTrigger>
              </TabsList>
            </Tabs>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export (CSV)
            </Button>
          </div>
        </div>

        <Tabs defaultValue="30d">
          <TabsContent value="7d">
            {/* Content for 7 days can be different if needed */}
          </TabsContent>
          <TabsContent value="30d">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
              <Card className="xl:col-span-2">
                <CardHeader>
                  <CardTitle>Projects Over Time</CardTitle>
                  <CardDescription>
                    Total number of projects created on the platform.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ProjectsOverTimeChart />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>User Roles Distribution</CardTitle>
                  <CardDescription>
                    Breakdown of users by their assigned role.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <UserRolesChart />
                </CardContent>
              </Card>

              <Card className="lg:col-span-2 xl:col-span-3">
                <CardHeader>
                  <CardTitle>Top Used Modules</CardTitle>
                  <CardDescription>
                    Most frequently accessed modules by users.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <TopModulesChart />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="custom">
            {/* Custom date range picker can be added here */}
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  );
}
