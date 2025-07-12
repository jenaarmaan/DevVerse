import { AppShell } from "@/components/shared/app-shell";
import { RoleManager } from "@/components/admin/role-manager";

export default function RoleManagerPage() {
  return (
    <AppShell>
      <div className="flex flex-col items-center">
        <div className="w-full max-w-5xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl font-headline">
            User Role Manager
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Assign roles and manage platform users from this dashboard.
          </p>
        </div>
        <div className="mt-10 w-full max-w-5xl">
          <RoleManager />
        </div>
      </div>
    </AppShell>
  );
}
