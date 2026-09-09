import { MARQUEE_ITEMS } from "@/data/mockData";

export default function MarqueeStrip() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div className="bg-brand-gold/5 border-y border-brand-gold/20 py-4 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {items.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-6 px-8"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            <span className="text-xs tracking-[0.25em] uppercase text-brand-gold-light font-medium">
              {item}
            </span>
            <span className="text-brand-gold text-lg leading-none select-none">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
