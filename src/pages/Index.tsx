import { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { PasswordModal } from '@/components/PasswordModal';
import { LandingSection } from '@/components/LandingSection';
import { HeroSection } from '@/components/HeroSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { SkillsSection } from '@/components/SkillsSection';
import { AwardsSection } from '@/components/AwardsSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';

const Index = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    // Check if already unlocked in session
    const sessionUnlocked = sessionStorage.getItem('siteUnlocked');
    if (sessionUnlocked === 'true') {
      setIsUnlocked(true);
    }
  }, []);

  const handleUnlock = () => {
    setIsUnlocked(true);
    sessionStorage.setItem('siteUnlocked', 'true');
  };

  return (
    <main className="bg-slate-950 min-h-screen">
      <PasswordModal isOpen={!isUnlocked} onUnlock={handleUnlock} />
      {isUnlocked && (
        <>
          <Navigation />
          <LandingSection />
          <HeroSection />
          <ProjectsSection />
          <SkillsSection />
          <AwardsSection />
          <ContactSection />
          <Footer />
        </>
      )}
    </main>
  );
};

export default Index;
