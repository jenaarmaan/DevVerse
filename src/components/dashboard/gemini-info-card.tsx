import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import Link from "next/link";

export function GeminiInfoCard() {
  return (
    <Card className="bg-accent/80 shadow-sm hover:shadow-md transition-shadow rounded-lg">
      <CardHeader>
        <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg font-semibold">DevVerse Assistant</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Ask questions, generate ideas, or explore modules using our Gemini-powered AI chat.
        </p>
        <Button variant="link" asChild className="p-0 h-auto mt-4 font-semibold">
            <Link href="#">
                Try Gemini →
            </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
