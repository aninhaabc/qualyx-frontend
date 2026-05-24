"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export function FinalCta() {
  return (
    <section
      id="contato"
      className="relative section overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 800px 400px at 50% 0%, rgba(117,232,229,0.2), transparent 70%), #e1e6e7",
      }}
    >
      <div className="max-w-4xl mx-auto px-6 text-center relative">
        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="text-4xl lg:text-5xl font-bold tracking-tight text-[#0b1220]"
        >
          Comece a medir a{" "}
          <span className="text-gradient-brand italic">qualidade real</span>{" "}
          dos seus agentes em minutos.
        </motion.h2>
        <p className="mt-5 text-black/55 max-w-xl mx-auto">
          Crie sua conta gratuita, conecte seu primeiro canal e veja os
          primeiros resultados no mesmo dia.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/signup"
            className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-300 to-blue-400 font-semibold text-[#0b1220] hover:opacity-95 transition shadow-lg shadow-cyan-200/40"
          >
            Teste grátis
          </Link>
          <a
            href="mailto:contato@qualyx.ai"
            className="px-7 py-3.5 rounded-2xl border border-black/10 bg-white/70 backdrop-blur-sm hover:bg-white transition font-semibold"
          >
            Falar com vendas
          </a>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer id="sobre" className="bg-[#0b1220] text-white/70">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-2 md:grid-cols-5 gap-8">
        <div className="col-span-2">
          <Image
            src="/img/Logo_Typo_white 1.png"
            alt="Qualyx"
            width={150}
            height={48}
          />
          <p className="mt-4 text-sm text-white/55 max-w-xs leading-relaxed">
            QA automatizado para agentes de IA. Visibilidade, controle e
            compliance — sem revisão manual.
          </p>
        </div>

        <div>
          <h4 className="text-white text-sm font-semibold">Produto</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><a href="#recursos" className="hover:text-white transition">Recursos</a></li>
            <li><a href="#precos" className="hover:text-white transition">Preços</a></li>
            <li><a href="#produto" className="hover:text-white transition">Como funciona</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white text-sm font-semibold">Empresa</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition">Sobre</a></li>
            <li><a href="#" className="hover:text-white transition">Blog</a></li>
            <li><a href="mailto:contato@qualyx.ai" className="hover:text-white transition">Contato</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white text-sm font-semibold">Legal</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition">Privacidade</a></li>
            <li><a href="#" className="hover:text-white transition">Termos</a></li>
            <li><a href="#" className="hover:text-white transition">LGPD</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <span>© {new Date().getFullYear()} Qualyx. Todos os direitos reservados.</span>
          <span>Feito com cuidado no Brasil.</span>
        </div>
      </div>
    </footer>
  );
}
