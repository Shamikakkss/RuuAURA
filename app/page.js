import MagneticCursor from "@/app/components/MagneticCursor";
import AllInOneSanctuary from "@/app/components/AllInOneSanctuary";

export const metadata = {
  title: "RuuAURA — Sanctuary of Haute Coiffure & Aesthetic Radiance | Colombo 07",
  description:
    "Colombo's premier luxury beauty sanctuary. Bespoke hair architecture, artisan color, cellular spa rituals, and editorial bridal couture. Book your private appointment today.",
};

export default function HomePage() {
  return (
    <>
      <MagneticCursor />
      <AllInOneSanctuary />
    </>
  );
}
