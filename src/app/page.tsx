import { AppShell } from '@/components/shared/app-shell';
import { FeatureCards } from '@/components/home/feature-cards';
import { HeroSection } from '@/components/home/hero-section';

export default function Home() {
  return (
    <AppShell>
      <div className="space-y-16">
        <HeroSection />
        <FeatureCards />
      </div>
    </AppShell>
  );
}
