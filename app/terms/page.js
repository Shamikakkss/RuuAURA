import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export const metadata = { title: "Terms of Service — RuuAURA" };

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-36 pb-24 bg-brand-black min-h-screen">
        <article className="container-luxury max-w-3xl">
          <p className="section-label mb-4">Reservation Policy</p>
          <h1 style={{ fontFamily: "var(--font-serif)" }} className="text-4xl md:text-5xl text-brand-cream mb-6">Terms of Service</h1>
          <div className="space-y-6 text-sm text-brand-muted leading-relaxed">
            <p>Appointments are held for the guest and artisan named in the reservation request. A request remains pending until the sanctuary confirms availability.</p>
            <h2 style={{ fontFamily: "var(--font-serif)" }} className="text-2xl text-brand-cream">Cancellations</h2>
            <p>Please provide at least 24 hours notice when cancelling or requesting a change. Late cancellations may require a concierge conversation before a future reservation.</p>
            <h2 style={{ fontFamily: "var(--font-serif)" }} className="text-2xl text-brand-cream">Contact</h2>
            <p>For changes or accessibility requests, contact concierge@ruuaura.lk or call +94 11 268 9400.</p>
          </div>
          <Link href="/booking" className="inline-flex mt-10 text-xs uppercase tracking-widest text-brand-gold hover:text-brand-cream">Begin a reservation</Link>
        </article>
      </main>
      <Footer />
    </>
  );
}
