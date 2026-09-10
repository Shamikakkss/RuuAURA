"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AccountRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/?modal=dashboard");
  }, [router]);
  return (
    <div className="min-h-screen bg-brand-black flex items-center justify-center text-brand-gold">
      <div className="w-6 h-6 border-2 border-brand-gold border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
