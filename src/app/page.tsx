"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { BeneficiaryStories } from "@/components/sections/BeneficiaryStories";
import { Collaboration } from "@/components/sections/Collaboration";
import { MediaImpact } from "@/components/sections/MediaImpact";
import { TelemedicineCentres } from "@/components/sections/TelemedicineCentres";
import { BMICalculator } from "@/components/features/BMICalculator";
import { AwardSection } from "@/components/sections/AwardSection";
import { VideoHighlight } from "@/components/sections/VideoHighlight";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />
      <AwardSection />
      <MediaImpact />
      <VideoHighlight />
      <Services />
      <BeneficiaryStories />
      <Collaboration />
      <TelemedicineCentres />

      {/* BMI Calculator Section */}
      <section className="py-20 bg-gray-100">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900 tracking-tight">{t("bmi.title")}</h2>
            <p className="text-gray-600 mt-3 text-lg max-w-2xl mx-auto">{t("bmi.subtitle")}</p>
            <p className="text-[10px] text-gray-400 mt-2 italic font-medium">{t("bmi.disclaimer")}</p>
          </div>
          <BMICalculator />
        </div>
      </section>

      {/* Social Media Follow Section */}
      <section className="py-12 bg-white border-t">
        <div className="container text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-6">{t("social.followTitle")}</h3>
          <div className="flex justify-center gap-6">
            <a href="https://www.facebook.com/DigiSwasthya/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary-600 font-medium">Facebook</a>
            <a href="https://x.com/DigiSwasthya" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary-600 font-medium">Twitter</a>
            <a href="https://www.instagram.com/digiswasthya/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary-600 font-medium">Instagram</a>
            <a href="https://www.linkedin.com/company/digiswasthya" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary-600 font-medium">LinkedIn</a>
            <a href="https://www.youtube.com/channel/UC52n8c8U4jAtHsIzq7-wKvQ" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary-600 font-medium">YouTube</a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
