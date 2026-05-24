"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import HeroDashboardPreview from "./hero-dashboard-preview";

const trustedLogos = ["unifique", "V4 Company", "nuvemshop", "bling!", "stone"];

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background glow */}
      <div
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[700px] bg-cyan-300/25 blur-3xl rounded-full pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[60vh] bg-grid-soft opacity-60 pointer-events-none"
        style={{
          maskImage:
            "radial-gradient(ellipse at top, black 25%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at top, black 25%, transparent 70%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-24 md:pt-24 md:pb-32 grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* LEFT */}
        <div className="lg:col-span-5 flex flex-col gap-7">
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-fit px-4 py-1.5 rounded-full border border-black/10 bg-white/60 backdrop-blur-sm"
          >
            <span className="text-sm font-medium">✨ QA para agentes de IA</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-[clamp(2.4rem,4.8vw,3.6rem)] font-bold leading-[1.05] tracking-tight"
          >
            Sua IA atende clientes.
            <br />
            A Qualyx garante
            <br />
            <span className="text-gradient-brand italic">a qualidade.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="max-w-xl text-[17px] leading-[1.6] text-black/60"
          >
            Monitore, avalie e detecte falhas em agentes de IA
            automaticamente, com foco em negócio e compliance.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Link
              href="/signup"
              className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-300 to-blue-400 font-semibold shadow-xl shadow-cyan-300/40 hover:scale-[1.02] transition-all text-center text-[#0b1220]"
            >
              Teste grátis
            </Link>
            <a
              href="#contato"
              className="px-7 py-3.5 rounded-2xl border border-black/10 bg-white/70 backdrop-blur-sm hover:bg-white transition-all font-semibold text-center"
            >
              Agendar demo
            </a>
          </motion.div>
        </div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7"
        >
          <HeroDashboardPreview />
        </motion.div>
      </div>
    </section>
  );
}
