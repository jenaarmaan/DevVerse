
import { TechCard } from "@/components/learn/techstack/tech-card";
import { technologies, categories } from "@/lib/techstack-data";

export default function WebTechPage() {
  const webTechs = technologies.filter(tech => tech.category === 'Web');
  const categoryInfo = categories.web;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl font-headline flex items-center justify-center gap-3">
            <categoryInfo.icon className="w-10 h-10" />
            {categoryInfo.title}
        </h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
          {categoryInfo.description}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {webTechs.map(tech => (
          <TechCard key={tech.id} tech={tech} />
        ))}
      </div>
    </div>
  );
}
