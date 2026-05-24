"use client";

const sidebarItems = [
  { label: "Dashboard", active: true, icon: "grid" },
  { label: "Regras", icon: "list" },
  { label: "Configurações", icon: "settings" },
];

const regras = [
  { descricao: "Qual a nota de satisfação geral do texto?", modo: "NOTA" },
  { descricao: "O texto contém alguma solicitação de cancelamento?", modo: "CORRESPONDEU" },
  { descricao: "O texto contém algum jargão jurídico?", modo: "CORRESPONDEU" },
];

const avaliacoes = [
  { regra: "Qual a nota de satisfação geral do texto?", modo: "nota", nota: 8, ok: true },
  { regra: "O texto contém alguma solicitação de cancelamento?", modo: "correspondeu", correspondeu: false, ok: false },
  { regra: "O texto contém algum jargão jurídico?", modo: "correspondeu", correspondeu: false, ok: false },
];

function KpiCard({ label, value, unit, color }: { label: string; value: string; unit?: string; color: string }) {
  return (
    <div className="rounded-xl border border-black/5 bg-white p-3">
      <div className="w-1.5 h-1.5 rounded-full mb-2" style={{ background: color }} />
      <div className="text-[9px] uppercase tracking-[0.14em] text-black/45 font-semibold">{label}</div>
      <div className="mt-1.5 flex items-baseline gap-0.5">
        <span className="text-xl font-bold text-[#0b1220] tracking-tight">{value}</span>
        {unit && <span className="text-[10px] text-black/40">{unit}</span>}
      </div>
    </div>
  );
}

export default function HeroDashboardPreview() {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -inset-x-6 -bottom-6 h-24 bg-gradient-to-b from-cyan-300/30 to-transparent blur-2xl rounded-full"
      />

      <div className="relative rounded-2xl bg-white border border-black/5 overflow-hidden shadow-[0_24px_60px_-24px_rgba(0,0,0,0.18),0_8px_24px_-12px_rgba(0,0,0,0.08)]">
        <div className="grid grid-cols-[150px_1fr]">

          {/* Sidebar */}
          <aside className="border-r border-black/5 bg-black/[0.015] p-3 flex flex-col min-h-[420px]">
            <div className="px-1 py-1 text-[13px] font-bold text-cyan-700">Qualyx</div>
            <nav className="mt-4 flex flex-col gap-0.5">
              {sidebarItems.map((it) => (
                <div
                  key={it.label}
                  className={
                    "flex items-center gap-2 px-2 py-1.5 rounded-md text-[11px] " +
                    (it.active
                      ? "bg-white text-[#0b1220] font-semibold shadow-sm border border-black/5"
                      : "text-black/55")
                  }
                >
                  <span className="flex-1 truncate">{it.label}</span>
                </div>
              ))}
            </nav>

            {/* User footer */}
            <div className="mt-auto pt-3">
              <div className="rounded-lg border border-black/5 bg-white p-2 flex items-center gap-1.5">
                <div className="h-5 w-5 rounded-full bg-gradient-to-br from-cyan-300 to-blue-400 grid place-items-center text-white text-[9px] font-bold flex-shrink-0">
                  A
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold text-[#0b1220] truncate">Ana Beatriz</p>
                  <p className="text-[9px] text-black/40 truncate">Gratuito</p>
                </div>
              </div>
            </div>
          </aside>

          {/* Main */}
          <div className="p-3 min-w-0">
            {/* Header */}
            <div className="flex items-start justify-between gap-2 mb-2.5">
              <div>
                <h3 className="text-[13px] font-bold text-[#0b1220]">Dashboard</h3>
                <p className="text-[10px] text-black/45">Visão geral da qualidade dos seus agentes de IA</p>
              </div>
              <div className="rounded-lg border border-black/10 px-2 py-1 text-[9px] text-black/55 bg-white flex-shrink-0">
                ID #1
              </div>
            </div>

            {/* KPI grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-1.5 mb-2.5">
              <KpiCard label="AI Health Score" value="40" unit="/100" color="#14b8a6" />
              <KpiCard label="Taxa de resolução" value="61%" color="#0ea5e9" />
              <KpiCard label="Índice de risco" value="39%" color="#a78bfa" />
              <KpiCard label="Satisfação est." value="2" unit="/5" color="#06b6d4" />
            </div>

            {/* Regras ativas */}
            <div className="rounded-xl border border-black/5 bg-white p-2.5 mb-2.5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-[#0b1220]">Regras ativas</span>
                <span className="text-[10px] text-cyan-700">Gerenciar →</span>
              </div>
              <div className="space-y-1.5">
                {regras.map((r, i) => (
                  <div key={i} className="flex items-center justify-between gap-2 py-1 border-b border-black/5 last:border-0">
                    <span className="text-[10px] text-[#0b1220] truncate flex-1">{r.descricao}</span>
                    <span className="text-[8px] uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-cyan-100 text-cyan-700 font-semibold flex-shrink-0">
                      {r.modo}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Conversas recentes */}
            <div className="rounded-xl border border-black/5 bg-white p-2.5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-[#0b1220]">Conversas recentes</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-cyan-100 text-cyan-700 font-semibold">API conectada</span>
              </div>
              <div className="rounded-xl border border-black/5 p-2">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold text-[#0b1220]">
                    Conversa <span className="text-cyan-700 font-mono">#42</span>
                  </span>
                  <span className="text-[9px] text-red-600 font-semibold bg-red-50 px-1.5 py-0.5 rounded-full">● Falha detectada</span>
                </div>
                <div className="space-y-1">
                  {avaliacoes.map((a, i) => (
                    <div key={i} className="bg-black/[0.02] rounded-lg p-1.5 flex items-center justify-between gap-2">
                      <span className="text-[9px] text-[#0b1220] truncate flex-1">{a.regra}</span>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        {a.modo === "nota" && (
                          <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-cyan-100 text-cyan-700 font-semibold">
                            Nota: {a.nota}
                          </span>
                        )}
                        {a.modo === "correspondeu" && a.correspondeu === true && (
                          <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-semibold">Sim</span>
                        )}
                        {a.modo === "correspondeu" && a.correspondeu === false && (
                          <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-red-100 text-red-600 font-semibold">Não</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
