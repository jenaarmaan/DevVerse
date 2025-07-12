
import { Button } from "@/components/ui/button";
import { popularTechnologies } from "@/lib/techstack-data";
import { ArrowRight, Rocket } from "lucide-react";
import Link from "next/link";
import { TechCard } from "@/components/learn/techstack/tech-card";

export default function TechStackHubPage() {
  return (
    <div className="space-y-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl font-headline">
          TechStack Hub
        </h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground max-w-3xl mx-auto">
          Explore Google's powerful technologies. Find official documentation and resources to fuel your next project.
        </p>
      </div>

      <div>
        <h2 className="text-3xl font-bold font-headline mb-6 flex items-center gap-3">
          <Rocket />
          Most Explored Stacks
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {popularTechnologies.map((tech) => (
            <TechCard key={tech.id} tech={tech} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Button size="lg" asChild>
            <Link href="/learn/techstack/web">
              Explore More Technologies <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
