"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

function Check({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12l5 5L20 7" />
    </svg>
  );
}

const plans = [
  {
    id: "free",
    name: "Gratuito",
    price: "R$ 0",
    period: "/mês",
    features: [
      "Até 100 conversas/mês",
      "Dashboard básico",
      "1 regra de avaliação",
      "Suporte por email",
    ],
    cta: "Começar grátis",
    href: "/signup?plan=free",
    highlight: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: "R$ 499",
    period: "/mês",
    badge: "Mais escolhido",
    features: [
      "Conversas ilimitadas",
      "Regras ilimitadas",
      "Alertas e detecção de falhas",
      "Integrações",
      "Suporte prioritário",
    ],
    cta: "Testar agora",
    href: "/signup?plan=pro",
    highlight: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Sob consulta",
    period: "",
    features: [
      "Tudo do plano Pro",
      "Infraestrutura dedicada",
      "Compliance e LGPD",
      "SSO e auditoria avançada",
      "Suporte dedicado",
    ],
    cta: "Falar com especialista",
    href: "/signup?plan=enterprise",
    highlight: false,
  },
];

export default function PricingSection() {
  return (
    <section id="precos" className="section relative overflow-hidden">
      {/* background grid suave */}
      <div
        aria-hidden
        className="absolute inset-0 bg-grid-soft opacity-50"
        style={{
          maskImage:
            "radial-gradient(ellipse at top, black 15%, transparent 60%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at top, black 15%, transparent 60%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-[#0b1220]">
            Planos simples e{" "}
            <span className="text-gradient-brand italic">transparentes</span>.
          </h2>
          <p className="mt-3 text-black/55">
            Comece grátis. Escale conforme sua operação cresce.
          </p>
        </motion.div>

        <div className="mt-14 grid md:grid-cols-3 gap-5">
          {plans.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={cn(
                "relative rounded-3xl bg-white border p-8 flex flex-col",
                p.highlight
                  ? "border-cyan-300 ring-2 ring-cyan-200 shadow-[0_8px_40px_-12px_rgba(117,232,229,0.6)]"
                  : "border-black/5"
              )}
            >
              {p.badge && (
                <div className="absolute top-5 right-5 inline-flex items-center rounded-full bg-cyan-100 text-cyan-700 border border-cyan-200 text-[11px] font-semibold px-2.5 py-0.5">
                  {p.badge}
                </div>
              )}

              <h3 className="text-xl font-bold text-[#0b1220]">{p.name}</h3>

              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-bold tracking-tight text-[#0b1220]">
                  {p.price}
                </span>
                {p.period && (
                  <span className="text-sm text-black/50">{p.period}</span>
                )}
              </div>

              <ul className="mt-7 space-y-3 flex-1">
                {p.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2.5 text-[15px] text-black/70"
                  >
                    <Check className="h-4 w-4 text-emerald-500 mt-1 flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={p.href}
                className={cn(
                  "mt-8 w-full text-center px-5 py-3 rounded-2xl font-semibold transition-all text-sm",
                  p.highlight
                    ? "bg-gradient-to-r from-cyan-300 to-blue-400 text-[#0b1220] hover:opacity-95 shadow-lg shadow-cyan-200/40"
                    : "bg-white border border-black/10 text-[#0b1220] hover:bg-black/5"
                )}
              >
                {p.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
