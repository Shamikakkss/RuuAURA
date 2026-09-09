"use client";
import { useEffect, useRef } from "react";

export default function MagneticCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const raf = useRef(null);

  useEffect(() => {
    if (window.innerWidth < 1024) return;

    const dot = dotRef.current;
    const ring = ringRef.current;

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dot) {
        dot.style.left = e.clientX + "px";
        dot.style.top = e.clientY + "px";
      }
    };

    const lerp = (a, b, n) => (1 - n) * a + n * b;

    const animate = () => {
      ringPos.current.x = lerp(ringPos.current.x, pos.current.x, 0.1);
      ringPos.current.y = lerp(ringPos.current.y, pos.current.y, 0.1);
      if (ring) {
        ring.style.left = ringPos.current.x + "px";
        ring.style.top = ringPos.current.y + "px";
      }
      raf.current = requestAnimationFrame(animate);
    };

    const onEnterHover = () => ring?.classList.add("hovered");
    const onLeaveHover = () => ring?.classList.remove("hovered");

    window.addEventListener("mousemove", onMove);
    raf.current = requestAnimationFrame(animate);

    const hoverEls = document.querySelectorAll(
      "a, button, [data-cursor-hover]"
    );
    hoverEls.forEach((el) => {
      el.addEventListener("mouseenter", onEnterHover);
      el.addEventListener("mouseleave", onLeaveHover);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <div id="cursor-dot" ref={dotRef} />
      <div id="cursor-ring" ref={ringRef} />
    </>
  );
}
