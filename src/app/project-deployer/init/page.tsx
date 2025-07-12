
"use client";

import { AddProjectDialog } from "@/components/project-deployer/add-project-dialog";
import { Button } from "@/components/ui/button";

// This page can be a simple wrapper or offer a more guided experience.
// For now, we will just use the dialog component.
export default function InitializeProjectPage() {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <h1 className="text-3xl font-bold mb-2">Initialize a New Project</h1>
            <p className="text-muted-foreground mb-6 max-w-lg">
                Start by providing the basic details for your new project. You can link a GitHub repository later.
            </p>
            {/* The onProjectAdded can redirect or refetch data on the main page */}
            <AddProjectDialog onProjectAdded={() => {
                // Potentially redirect user back to the main deployer page
                window.location.href = "/project-deployer";
            }} />
        </div>
    );
}
