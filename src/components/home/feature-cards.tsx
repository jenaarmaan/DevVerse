import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Layers, Users, UploadCloud, Calendar } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: <Layers className="w-10 h-10 mb-4 text-primary" />,
    title: "Explore Templates",
    description: "Kickstart your next project with our collection of ready-to-use templates.",
    href: "/hackstack",
    cta: "Browse Templates",
  },
  {
    icon: <Users className="w-10 h-10 mb-4 text-primary" />,
    title: "Join a Team",
    description: "Find collaborators and build your dream team on our interactive project board.",
    href: "/collabboard",
    cta: "Find a Team",
  },
  {
    icon: <UploadCloud className="w-10 h-10 mb-4 text-primary" />,
    title: "Project Deployment",
    description: "Seamlessly deploy your applications to the cloud with our integrated deployer.",
    href: "/project-deployer",
    cta: "Deploy Now",
  },
  {
    icon: <Calendar className="w-10 h-10 mb-4 text-primary" />,
    title: "Browse Programs",
    description: "Discover Google's developer programs and find the right one for you.",
    href: "/campus-hub",
    cta: "Explore Programs",
  },
];

export function FeatureCards() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 md:px-8">
       <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
              Everything You Need to Build
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
                From idea to deployment, DevVerse provides the tools to bring your projects to life.
            </p>
        </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {features.map((feature) => (
          <Card key={feature.title} className="flex flex-col text-center items-center shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6">
            <CardHeader className="items-center">
              {feature.icon}
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription className="text-base">{feature.description}</CardDescription>
            </CardContent>
            <CardFooter>
              <Button asChild size="lg" className="font-semibold">
                <Link href={feature.href}>{feature.cta}</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
