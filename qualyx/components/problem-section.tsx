"use client";

import { motion } from "framer-motion";

const problems = [
  {
    title: "Sem visibilidade",
    body: "Ninguém sabe o que o bot realmente disse.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    title: "Revisão manual não escala",
    body: "Times lendo conversas: caro, lento, falível.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6" />
        <line x1="8" y1="13" x2="16" y2="13" />
        <line x1="8" y1="17" x2="13" y2="17" />
      </svg>
    ),
  },
  {
    title: "Risco de compliance",
    body: "Respostas fora do padrão geram exposição.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L4 6v6c0 5 3.5 9.5 8 10 4.5-.5 8-5 8-10V6l-8-4z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
  },
  {
    title: "Métricas que enganam",
    body: "Métricas superficiais não explicam por que algo falhou.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
];

export default function ProblemSection() {
  return (
    <section id="produto" className="section relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center text-4xl lg:text-5xl font-bold tracking-tight text-[#0b1220]"
        >
          O problema é <span className="text-gradient-brand italic">real</span>.
        </motion.h2>

        <p className="mt-4 text-center text-black/55 max-w-xl mx-auto">
          Os agentes de IA estão respondendo milhões de mensagens por dia — e
          ninguém está realmente medindo se elas estão certas.
        </p>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {problems.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="card-soft p-7 group"
            >
              <div className="h-12 w-12 rounded-2xl bg-cyan-50 grid place-items-center text-cyan-600 group-hover:scale-105 transition-transform">
                <span className="block h-5 w-5">{p.icon}</span>
              </div>
              <h3 className="mt-5 text-lg font-bold text-[#0b1220] tracking-tight">
                {p.title}
              </h3>
              <p className="mt-2 text-[15px] text-black/55 leading-relaxed">
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
