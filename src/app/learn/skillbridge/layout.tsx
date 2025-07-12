"use client";

import type { ReactNode } from "react";

// This layout now simply passes its children through.
// The main AppShell now controls the persistent SkillBridge sidebar.
export default function SkillBridgeLayout({ children }: { children: ReactNode }) {
    return <>{children}</>;
}
