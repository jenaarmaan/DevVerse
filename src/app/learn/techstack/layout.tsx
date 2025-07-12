
import { AppShell } from "@/components/shared/app-shell";

export default function TechStackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppShell>
      {children}
    </AppShell>
  );
}
