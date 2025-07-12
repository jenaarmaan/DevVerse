import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function TipsCard() {
  return (
    <Card className="shadow-sm bg-accent/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Lightbulb className="w-5 h-5 text-yellow-500" />
          <span>Developer Tip</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Use Next.js Server Components by default to reduce client-side JavaScript and improve your app's load times.
        </p>
        <Button variant="link" asChild className="p-0 h-auto mt-4 font-semibold">
          <Link href="https://nextjs.org/docs/app/building-your-application/rendering/server-components" target="_blank">
            Learn More <ArrowRight className="ml-1 w-4 h-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
