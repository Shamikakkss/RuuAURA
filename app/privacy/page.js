import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export const metadata = { title: "Privacy Policy — RuuAURA" };

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-36 pb-24 bg-brand-black min-h-screen">
        <article className="container-luxury max-w-3xl">
          <p className="section-label mb-4">Guest Care</p>
          <h1 style={{ fontFamily: "var(--font-serif)" }} className="text-4xl md:text-5xl text-brand-cream mb-6">Privacy Policy</h1>
          <div className="space-y-6 text-sm text-brand-muted leading-relaxed">
            <p>RuuAURA collects only the information needed to respond to enquiries, manage appointments, and provide a considered sanctuary experience.</p>
            <h2 style={{ fontFamily: "var(--font-serif)" }} className="text-2xl text-brand-cream">Information we use</h2>
            <p>Contact details, appointment preferences, and notes are used to coordinate your visit. We do not sell personal information or use WhatsApp as an authentication method.</p>
            <h2 style={{ fontFamily: "var(--font-serif)" }} className="text-2xl text-brand-cream">Your choices</h2>
            <p>You may request an update or deletion of your information by contacting concierge@ruuaura.lk.</p>
          </div>
          <Link href="/" className="inline-flex mt-10 text-xs uppercase tracking-widest text-brand-gold hover:text-brand-cream">Return to sanctuary</Link>
        </article>
      </main>
      <Footer />
    </>
  );
}
