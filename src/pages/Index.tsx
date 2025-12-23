import { Navigation } from '@/components/Navigation';
import { LandingSection } from '@/components/LandingSection';
import { HeroSection } from '@/components/HeroSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { SkillsSection } from '@/components/SkillsSection';
import { AwardsSection } from '@/components/AwardsSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <main className="bg-slate-950 min-h-screen">
      <Navigation />
      <LandingSection />
      <HeroSection />
      <ProjectsSection />
      <SkillsSection />
      <AwardsSection />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default Index;
