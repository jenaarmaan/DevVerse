import { AppShell } from "@/components/shared/app-shell";
import { IdeaGeneratorForm } from "@/components/idea-generator-form";

export default function IdeaGeneratorPage() {
  return (
    <AppShell>
        <div className="space-y-8">
            <div className="mx-auto max-w-3xl text-center">
                <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl font-headline">
                Get Inspired to Build
                </h1>
                <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Choose a domain and enter some keywords, then let our AI brainstorm innovative project ideas for you.
                </p>
            </div>
            <div>
                <IdeaGeneratorForm />
            </div>
        </div>
    </AppShell>
  );
}
