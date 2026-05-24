"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { getRecentResults, getRegras, type ResultadosRecentes, type Avaliacao, type Regra } from "@/lib/api";
import Sidebar from "./sidebar";

// ---------- Tipos da prop ----------
type Props = {
  clienteId: number;
  userName: string;
  userEmail: string;
  plan: string;
  showWelcome?: boolean;
};

// ---------- KPI Card (sem spark e sem delta fictício) ----------
function KpiCard({
  label,
  value,
  unit,
  color,
}: {
  label: string;
  value: string;
  unit?: string;
  color: string;
}) {
  return (
    <div className="card-soft p-5">
      <div
        className="w-2 h-2 rounded-full mb-3"
        style={{ background: color }}
      />
      <div className="text-[11px] uppercase tracking-[0.16em] text-black/45 font-semibold">
        {label}
      </div>
      <div className="mt-2 flex items-baseline gap-1">
        <span className="text-3xl font-bold text-[#0b1220] tracking-tight">
          {value}
        </span>
        {unit && <span className="text-sm text-black/40">{unit}</span>}
      </div>
    </div>
  );
}

function computeKpis(resultados: ResultadosRecentes | null) {
  if (!resultados || resultados.resultados.length === 0) return null;

  const todas: Avaliacao[] = resultados.resultados.flatMap((c) => c.avaliacoes);
  const notas = todas.filter((a) => a.modo === "nota" && a.nota != null);
  const correspondeu = todas.filter((a) => a.modo === "correspondeu" && a.correspondeu != null);

  const mediaNota = notas.length ? notas.reduce((s, a) => s + (a.nota || 0), 0) / notas.length : 0;
  const healthScore = Math.round((mediaNota / 10) * 100);

  const taxaResolucao = correspondeu.length
    ? Math.round((correspondeu.filter((a) => a.correspondeu).length / correspondeu.length) * 100)
    : 0;

  const indiceRisco = correspondeu.length
    ? Math.round((correspondeu.filter((a) => !a.correspondeu).length / correspondeu.length) * 100)
    : 0;

  const satisfacao = notas.length ? +(mediaNota / 2).toFixed(1) : 0;

  return {
    healthScore,
    taxaResolucao,
    indiceRisco,
    satisfacao,
    totalConversas: resultados.resultados.length,
    totalAvaliacoes: todas.length,
  };
}

// ---------- Componente ----------
export default function DashboardPreview({
  clienteId,
  userName,
  userEmail,
  plan,
  showWelcome = false,
}: Props) {
  const router = useRouter();
  const [resultados, setResultados] = useState<ResultadosRecentes | null>(null);
  const [regras, setRegras] = useState<Regra[]>([]);
  const [loading, setLoading] = useState(true);
  const [backendError, setBackendError] = useState<string | null>(null);
  const [welcomeOpen, setWelcomeOpen] = useState(showWelcome);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const [r1, r2] = await Promise.allSettled([
          getRecentResults(clienteId),
          getRegras(clienteId),
        ]);
        if (!active) return;
        if (r1.status === "fulfilled") setResultados(r1.value);
        if (r2.status === "fulfilled") setRegras(r2.value.regras);

        if (r1.status === "rejected" && r2.status === "rejected") {
          setBackendError("Não foi possível conectar ao backend.");
        }
      } catch (e) {
        if (!active) return;
        setBackendError(e instanceof Error ? e.message : "Erro de conexão.");
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, [clienteId]);

  const kpis = useMemo(() => computeKpis(resultados), [resultados]);
  const hasData = !!kpis;

  const display = kpis || {
    healthScore: 0,
    taxaResolucao: 0,
    indiceRisco: 0,
    satisfacao: 0,
    totalConversas: 0,
    totalAvaliacoes: 0,
  };

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  const planLabel = plan === "free" ? "Gratuito" : plan === "pro" ? "Pro" : "Enterprise";

  return (
    <div className="grid grid-cols-[260px_1fr] min-h-screen">
      <Sidebar
        userName={userName}
        userEmail={userEmail}
        onLogout={handleLogout}
      />

      <div className="p-8 md:p-10 overflow-x-hidden">
        {/* Welcome */}
        <AnimatePresence>
          {welcomeOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mb-6 relative rounded-2xl border border-cyan-200 bg-gradient-to-r from-cyan-50/60 via-white to-blue-50/40 p-5 pr-12"
            >
              <button
                onClick={() => setWelcomeOpen(false)}
                className="absolute top-3 right-3 p-1 rounded-md hover:bg-white/60 text-black/40"
                aria-label="Fechar"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
              <h3 className="font-bold text-[#0b1220]">
                Bem-vindo(a), {userName.split(" ")[0]}! 👋
              </h3>
              <p className="text-sm text-black/60 mt-1">
                Sua conta está ativa no plano <strong>{planLabel}</strong>. Para começar,
                cadastre suas primeiras{" "}
                <a href="/regras" className="text-cyan-700 font-medium hover:underline">
                  regras de avaliação
                </a>{" "}
                e envie sua primeira conversa para o endpoint{" "}
                <code className="text-xs bg-black/5 rounded px-1.5 py-0.5">/rawevents</code>.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header */}
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-[#0b1220]">
              Dashboard
            </h1>
            <p className="text-black/55 mt-2 text-lg">
              Visão geral da qualidade dos seus agentes de IA
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <div className="px-3 py-2 rounded-xl bg-white border border-black/5 text-sm font-medium">
              ID #{clienteId}
            </div>
          </div>
        </div>

        {/* Backend warning */}
        {backendError && !loading && (
          <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 flex items-start gap-3">
            <svg className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <div>
              <strong>API do Qualyx Engine indisponível.</strong>{" "}
              <span className="text-amber-800">
                Verifique se o backend FastAPI está rodando em{" "}
                <code className="text-xs bg-amber-100 rounded px-1.5 py-0.5">
                  {process.env.NEXT_PUBLIC_QUALYX_API_URL || "http://localhost:8000"}
                </code>.
              </span>
            </div>
          </div>
        )}

        {/* KPI grid — só mostra se tiver dados reais */}
        {hasData && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KpiCard label="AI Health Score" value={String(display.healthScore)} unit="/100" color="#14b8a6" />
            <KpiCard label="Taxa de resolução" value={`${display.taxaResolucao}%`} color="#0ea5e9" />
            <KpiCard label="Índice de risco" value={`${display.indiceRisco}%`} color="#a78bfa" />
            <KpiCard label="Satisfação estimada" value={String(display.satisfacao)} unit="/5" color="#06b6d4" />
          </div>
        )}

        {/* Regras ativas */}
        <div className={`card-soft p-6 ${hasData ? "mt-6" : ""}`}>
          <div className="flex items-center justify-between mb-4">
            <div className="font-bold text-[#0b1220]">Regras ativas</div>
            <a href="/regras" className="text-xs text-cyan-700 hover:underline">
              Gerenciar →
            </a>
          </div>

          {regras.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-black/10 p-6 text-center">
              <p className="text-sm text-black/55">Nenhuma regra cadastrada</p>
              <p className="text-xs text-black/40 mt-1">
                Crie sua primeira regra de avaliação
              </p>
              <a
                href="/regras"
                className="inline-flex mt-3 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-300 to-blue-400 text-sm font-semibold text-[#0b1220]"
              >
                + Nova regra
              </a>
            </div>
          ) : (
            <div className="space-y-3">
              {regras.slice(0, 5).map((r) => (
                <div key={r.id} className="flex items-center justify-between gap-3 py-2 border-b border-black/5 last:border-0">
                  <div className="min-w-0 flex-1">
                    <div className="text-sm text-[#0b1220] font-medium truncate">
                      {r.descricao}
                    </div>
                  </div>
                  <div className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-100 text-cyan-700 font-semibold flex-shrink-0">
                    {r.modo}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Conversas recentes */}
        <div className="mt-6 card-soft p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="font-bold text-[#0b1220] text-lg">Conversas recentes</div>
              <div className="text-sm text-black/50 mt-0.5">
                {hasData
                  ? `${display.totalConversas} conversa${display.totalConversas !== 1 ? "s" : ""}, ${display.totalAvaliacoes} avaliações`
                  : "Nenhuma conversa avaliada ainda"}
              </div>
            </div>
            {hasData && (
              <div className="px-3 py-1.5 rounded-lg bg-cyan-100 text-cyan-700 text-xs font-semibold">
                API conectada
              </div>
            )}
          </div>

          {loading ? (
            <div className="py-12 text-center text-black/40 text-sm">
              Carregando…
            </div>
          ) : hasData && resultados ? (
            <div className="space-y-4">
              {resultados.resultados.slice(0, 5).map((c) => {
                const falhou = c.avaliacoes.some((a) => a.correspondeu === false);
                return (
                  <div key={c.id_conversa} className="border border-black/5 rounded-2xl p-5">
                    <div className="flex items-center justify-between gap-4 mb-3">
                      <div>
                        <div className="font-bold text-[#0b1220]">
                          Conversa <span className="font-mono text-cyan-700">#{c.id_conversa}</span>
                        </div>
                        <div className="text-xs text-black/40 mt-0.5">
                          {c.avaliacoes.length} avaliação{c.avaliacoes.length !== 1 ? "ões" : ""}
                        </div>
                      </div>
                      {falhou ? (
                        <span className="inline-flex items-center gap-1 text-xs text-red-600 font-semibold bg-red-50 px-2.5 py-1 rounded-full">
                          ● Falha detectada
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-full">
                          ● OK
                        </span>
                      )}
                    </div>

                    <div className="space-y-2">
                      {c.avaliacoes.map((a, i) => (
                        <div key={i} className="bg-black/[0.02] rounded-xl p-3 text-sm">
                          <div className="flex items-start justify-between gap-3 mb-1">
                            <div className="flex-1 font-medium text-[#0b1220]">{a.regra}</div>
                            <div className="flex items-center gap-1.5 flex-shrink-0">
                              <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-white border border-black/5 font-semibold text-black/55">
                                {a.modo}
                              </span>
                              {a.modo === "nota" && a.nota != null && (
                                <span className="text-[11px] px-2 py-0.5 rounded-full bg-cyan-100 text-cyan-700 font-semibold">
                                  Nota: {a.nota}
                                </span>
                              )}
                              {a.modo === "correspondeu" && a.correspondeu === true && (
                                <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-semibold">
                                  Sim
                                </span>
                              )}
                              {a.modo === "correspondeu" && a.correspondeu === false && (
                                <span className="text-[11px] px-2 py-0.5 rounded-full bg-red-100 text-red-600 font-semibold">
                                  Não
                                </span>
                              )}
                              {a.modo === "contagem" && a.quantidade != null && (
                                <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-semibold">
                                  {a.quantidade}×
                                </span>
                              )}
                            </div>
                          </div>
                          <p className="text-black/55 text-[13px] leading-relaxed">
                            {a.justificativa}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-2xl border-2 border-dashed border-black/10 p-12 text-center">
      <div className="mx-auto h-12 w-12 rounded-full bg-cyan-50 grid place-items-center text-cyan-600">
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="8 12 11 15 16 9" />
        </svg>
      </div>
      <h3 className="mt-4 font-bold text-[#0b1220]">Tudo pronto para começar</h3>
      <p className="mt-2 text-sm text-black/55 max-w-md mx-auto">
        Cadastre regras de avaliação e envie sua primeira conversa para o endpoint{" "}
        <code className="bg-black/5 rounded px-1.5 py-0.5 text-xs">/rawevents</code>{" "}
        para ver os resultados aqui.
      </p>
      <div className="mt-5 flex justify-center gap-2">
        <a href="/regras" className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-300 to-blue-400 text-sm font-semibold text-[#0b1220]">
          + Criar regra
        </a>
      </div>
    </div>
  );
}
