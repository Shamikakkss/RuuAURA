import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import MagneticCursor from "@/app/components/MagneticCursor";
import HeroSlider from "@/app/components/HeroSlider";
import MarqueeStrip from "@/app/components/MarqueeStrip";
import ServicesSection from "@/app/components/ServicesSection";
import ArtisansSection from "@/app/components/ArtisansSection";
import AboutTeaserSection from "@/app/components/AboutTeaserSection";
import TestimonialsSection from "@/app/components/TestimonialsSection";
import LocationTeaser from "@/app/components/LocationTeaser";
import BookingCTA from "@/app/components/BookingCTA";

export const metadata = {
  title: "RuuAURA — Sanctuary of Haute Coiffure & Aesthetic Radiance | Colombo 07",
  description:
    "Colombo's premier luxury beauty sanctuary. Bespoke hair architecture, artisan color, cellular spa rituals, and editorial bridal couture. Book your private appointment today.",
};

export default function HomePage() {
  return (
    <>
      <MagneticCursor />
      <Navbar />
      <main>
        <HeroSlider />
        <MarqueeStrip />
        <ServicesSection />
        <AboutTeaserSection />
        <ArtisansSection />
        <TestimonialsSection />
        <LocationTeaser />
        <BookingCTA />
      </main>
      <Footer />
    </>
  );
}
