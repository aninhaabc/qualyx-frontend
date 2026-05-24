"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const nav = [
  { label: "Produto", href: "#produto" },
  { label: "Recursos", href: "#recursos" },
  { label: "Preços", href: "#precos" },
  { label: "Sobre nós", href: "#sobre" },
  { label: "Contato", href: "#contato" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 inset-x-0 z-50 transition-all",
        scrolled
          ? "bg-[#e1e6e7]/80 backdrop-blur-xl border-b border-black/5"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/img/Logo_Typo_Colored 1.png"
            alt="Qualyx"
            width={170}
            height={54}
            priority
          />
        </Link>

        {/* Menu desktop */}
        <nav className="hidden md:flex items-center gap-9 text-sm font-medium">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-black/70 hover:text-black transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="px-5 py-2 rounded-2xl border border-black/10 hover:bg-white transition text-sm font-medium"
          >
            Entrar
          </Link>
          <Link
            href="/signup"
            className="px-5 py-2 rounded-2xl bg-gradient-to-r from-cyan-300 to-blue-400 font-medium hover:opacity-90 transition text-sm"
          >
            Teste grátis
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          aria-label="Abrir menu"
          className="md:hidden p-2 rounded-lg hover:bg-white/60"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            {mobileOpen ? (
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <>
                <path d="M3 6h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M3 12h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-black/5">
          <div className="px-6 py-5 flex flex-col gap-4">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="text-black/70 hover:text-black"
              >
                {item.label}
              </a>
            ))}
            <div className="flex gap-2 pt-2">
              <Link
                href="/login"
                className="flex-1 px-5 py-2.5 rounded-2xl border border-black/10 bg-white text-center text-sm font-medium"
              >
                Entrar
              </Link>
              <Link
                href="/signup"
                className="flex-1 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-300 to-blue-400 text-center text-sm font-semibold"
              >
                Teste grátis
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
