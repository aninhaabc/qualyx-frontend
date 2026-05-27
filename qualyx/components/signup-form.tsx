"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Plan = "free" | "pro" | "enterprise";

const planMeta: Record<Plan, { label: string; price: string; tagline: string }> = {
  free: {
    label: "Gratuito",
    price: "R$ 0/mês",
    tagline: "Para começar e testar a plataforma.",
  },
  pro: {
    label: "Pro",
    price: "R$ 1500/mês",
    tagline: "Para operações em produção.",
  },
  enterprise: {
    label: "Enterprise",
    price: "Sob consulta",
    tagline: "Para times com requisitos avançados.",
  },
};

// SVG icons inline (lucide-react@1.x ainda não disponível como API estável aqui)
function Check({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12l5 5L20 7" />
    </svg>
  );
}
function Mail({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}
function Eye({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
function EyeOff({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-6 0-10-7-10-7a18.16 18.16 0 0 1 4.06-5.06" />
      <path d="M9.9 4.24A10.94 10.94 0 0 1 12 4c6 0 10 7 10 7a18.16 18.16 0 0 1-2.16 3.19" />
      <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
      <line x1="2" y1="2" x2="22" y2="22" />
    </svg>
  );
}
function Spinner({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <path d="M21 12a9 9 0 1 1-6.22-8.56" />
    </svg>
  );
}

export default function SignupForm() {
  const params = useSearchParams();
  const initialPlan = (params.get("plan") as Plan) || "free";
  const [plan, setPlan] = useState<Plan>(initialPlan);

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{ email: string } | null>(null);

  useEffect(() => {
    if ((["free", "pro", "enterprise"] as Plan[]).includes(initialPlan)) {
      setPlan(initialPlan);
    }
  }, [initialPlan]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, company, email, password, plan }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Não foi possível criar a conta.");
        return;
      }
      setSuccess({ email });
    } catch {
      setError("Erro de conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center"
      >
        <div className="mx-auto h-14 w-14 rounded-full bg-emerald-50 grid place-items-center">
          <Mail className="h-7 w-7 text-emerald-500" />
        </div>
        <h1 className="mt-5 text-2xl font-bold tracking-tight text-[#0b1220]">
          Verifique seu email
        </h1>
        <p className="mt-3 text-black/60">
          Enviamos um link de acesso ao seu dashboard para{" "}
          <strong className="text-[#0b1220]">{success.email}</strong>. Pode levar
          um ou dois minutos para chegar.
        </p>
        <div className="mt-6 rounded-2xl border border-black/5 bg-black/[0.02] p-4 text-left text-sm">
          <p className="font-medium text-[#0b1220]">Não recebeu?</p>
          <ul className="mt-2 space-y-1 text-black/60 list-disc list-inside">
            <li>Confira a pasta de spam</li>
            <li>Tente fazer login direto com email e senha</li>
          </ul>
        </div>
        <Link href="/login" className="btn btn-secondary mt-6 inline-flex">
          Ir para o login
        </Link>
      </motion.div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-[#0b1220]">
        Crie sua conta na <span className="text-gradient-brand">Qualyx</span>
      </h1>
      <p className="mt-2 text-sm text-black/60">
        Já tem conta?{" "}
        <Link href="/login" className="text-cyan-700 hover:underline">
          Entrar
        </Link>
      </p>

      <fieldset className="mt-6">
        <legend className="label">Seu plano</legend>
        <div className="grid grid-cols-3 gap-2">
          {(Object.keys(planMeta) as Plan[]).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPlan(p)}
              className={cn(
                "rounded-2xl border p-3 text-left transition-all focus:outline-none",
                plan === p
                  ? "border-cyan-300 bg-cyan-50/60 ring-2 ring-cyan-200"
                  : "border-black/10 hover:border-black/20 bg-white"
              )}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-[#0b1220]">
                  {planMeta[p].label}
                </span>
                {plan === p && <Check className="h-3.5 w-3.5 text-cyan-600" />}
              </div>
              <div className="mt-0.5 text-[11px] text-black/50">
                {planMeta[p].price}
              </div>
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-black/50">{planMeta[plan].tagline}</p>
      </fieldset>

      <form onSubmit={handleSubmit} className="mt-5 space-y-3">
        <div>
          <label htmlFor="name" className="label">Nome completo</label>
          <input
            id="name"
            className="input"
            placeholder="Ana Beatriz"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            minLength={2}
            autoComplete="name"
          />
        </div>

        <div>
          <label htmlFor="company" className="label">Empresa</label>
          <input
            id="company"
            className="input"
            placeholder="Acme Corp"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
            minLength={2}
            autoComplete="organization"
          />
        </div>

        <div>
          <label htmlFor="email" className="label">Email corporativo</label>
          <input
            id="email"
            type="email"
            className="input"
            placeholder="ana@acmecorp.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>

        <div>
          <label htmlFor="password" className="label">Senha</label>
          <div className="relative">
            <input
              id="password"
              type={showPwd ? "text" : "password"}
              className="input pr-12"
              placeholder="Mínimo 8 caracteres"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowPwd((v) => !v)}
              className="absolute inset-y-0 right-0 px-3 text-black/40 hover:text-black/70"
              aria-label={showPwd ? "Ocultar senha" : "Mostrar senha"}
            >
              {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full mt-1 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Spinner className="h-4 w-4 animate-spin" /> Criando conta…
            </>
          ) : (
            "Criar conta e receber acesso"
          )}
        </button>

        <p className="text-[11px] text-black/45 text-center leading-relaxed">
          Ao criar uma conta, você concorda com nossos{" "}
          <a className="underline hover:text-black/70" href="#">Termos</a> e{" "}
          <a className="underline hover:text-black/70" href="#">Privacidade</a>.
          Nada será cobrado no plano gratuito.
        </p>
      </form>
    </div>
  );
}
