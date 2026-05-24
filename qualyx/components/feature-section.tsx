"use client";

import { motion } from "framer-motion";

const features = [
  {
    title: "AI Health Score",
    body: "Uma única métrica composta resume a saúde dos seus agentes — empatia, clareza, resolução, aderência e tom em um só número.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    title: "Regras flexíveis por modo",
    body: "Configure regras como correspondeu (sim/não), nota (0–10) ou contagem. A IA aplica em cada conversa, com justificativa.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="8" y1="6" x2="21" y2="6" />
        <line x1="8" y1="12" x2="21" y2="12" />
        <line x1="8" y1="18" x2="21" y2="18" />
        <polyline points="3 6 4 7 6 5" />
        <polyline points="3 12 4 13 6 11" />
        <polyline points="3 18 4 19 6 17" />
      </svg>
    ),
  },
  {
    title: "Detecção de falhas em tempo real",
    body: "Alertas quando uma conversa rompe um guardrail crítico — fora de escopo, vazamento, tom inadequado, promessa indevida.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
  {
    title: "Integrações nativas",
    body: "Conecte seus canais — WhatsApp, Intercom, Zendesk, agentes próprios — via API REST em minutos.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    title: "Compliance e LGPD",
    body: "Dados em infra brasileira, logs auditáveis, retenção configurável, controles de acesso por workspace.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    title: "Justificativas com IA",
    body: "Cada avaliação vem com a justificativa textual da decisão — auditável, explicável, acionável.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8 5.8 21.3l2.4-7.4L2 9.4h7.6z" />
      </svg>
    ),
  },
];

export default function FeatureSection() {
  return (
    <section id="recursos" className="section bg-white/40">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <span className="text-xs uppercase tracking-[0.18em] text-cyan-700 font-semibold">
            Recursos
          </span>
          <h2 className="mt-3 text-4xl lg:text-5xl font-bold tracking-tight text-[#0b1220]">
            Tudo que sua operação de IA precisa para{" "}
            <span className="text-gradient-brand italic">operar com confiança</span>.
          </h2>
          <p className="mt-4 text-black/55">
            Da medição automática à investigação de falhas, a Qualyx cobre o
            ciclo completo de qualidade — sem revisão manual.
          </p>
        </motion.div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
              className="card-soft p-7"
            >
              <span className="block h-5 w-5 text-cyan-600">{f.icon}</span>
              <h3 className="mt-5 text-lg font-bold text-[#0b1220] tracking-tight">
                {f.title}
              </h3>
              <p className="mt-2 text-[15px] text-black/55 leading-relaxed">
                {f.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
