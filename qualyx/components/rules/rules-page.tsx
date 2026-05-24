"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../sidebar";
import { getRegras, criarRegras, apagarRegra, type Regra } from "@/lib/api";

type Props = {
  clienteId: number;
  userName: string;
  userEmail: string;
};

type Modo = "correspondeu" | "nota" | "contagem";

const modoLabel: Record<Modo, string> = {
  correspondeu: "Sim/Não",
  nota: "Nota de Qualidade",
  contagem: "Contagem",
};

export default function RulesPage({ clienteId, userName, userEmail }: Props) {
  const router = useRouter();
  const [rules, setRules] = useState<Regra[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [newRule, setNewRule] = useState("");
  const [mode, setMode] = useState<Modo>("correspondeu");
  const [creating, setCreating] = useState(false);

  async function fetchRules() {
    try {
      const data = await getRegras(clienteId);
      setRules(data.regras || []);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro ao carregar regras.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRules();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clienteId]);

  async function createRule() {
    if (!newRule.trim()) return;
    setCreating(true);
    try {
      await criarRegras(clienteId, [{ descricao: newRule, modo: mode }]);
      setNewRule("");
      setMode("correspondeu");
      await fetchRules();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro ao criar regra.");
    } finally {
      setCreating(false);
    }
  }

  async function deleteRule(id: number) {
    try {
      await apagarRegra(id);
      await fetchRules();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro ao deletar regra.");
    }
  }

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-[#e1e6e7]">
      <div className="grid grid-cols-[260px_1fr]">
        <Sidebar userName={userName} userEmail={userEmail} onLogout={handleLogout} />

        <div className="p-8 md:p-10">
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-[#0b1220] mb-3">
              Regras de Avaliação
            </h1>
            <p className="text-black/55 text-lg">
              Defina os critérios utilizados pela IA para avaliar as conversas.
            </p>
          </div>

          {error && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Nova regra */}
          <div className="card-soft p-7 mb-6">
            <h2 className="text-2xl font-bold text-[#0b1220] mb-6">Nova Regra</h2>

            <div className="grid md:grid-cols-[1fr_220px] gap-4 mb-4">
              <div>
                <label className="label">Descrição</label>
                <input
                  value={newRule}
                  onChange={(e) => setNewRule(e.target.value)}
                  placeholder="Ex: O atendente cumpriu o script de boas-vindas?"
                  className="input"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      createRule();
                    }
                  }}
                />
              </div>

              <div>
                <label className="label">Modo de avaliação</label>
                <select
                  value={mode}
                  onChange={(e) => setMode(e.target.value as Modo)}
                  className="input"
                >
                  <option value="correspondeu">Sim/Não</option>
                  <option value="nota">Nota de Qualidade</option>
                  <option value="contagem">Contagem</option>
                </select>
              </div>
            </div>

            <div className="text-xs text-black/45 mb-4">
              {mode === "correspondeu" && "A IA retorna true ou false + justificativa."}
              {mode === "nota" && "A IA retorna uma nota de 0 a 10 + justificativa."}
              {mode === "contagem" && "A IA conta quantas vezes algo ocorreu + justificativa."}
            </div>

            <button
              onClick={createRule}
              disabled={creating || !newRule.trim()}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-300 to-blue-400 font-semibold text-[#0b1220] hover:opacity-95 transition shadow-lg shadow-cyan-200/40 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {creating ? "Salvando…" : "Salvar Regra"}
            </button>
          </div>

          {/* Regras ativas */}
          <div className="card-soft p-7">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-[#0b1220]">Regras Ativas</h2>
                <p className="text-black/50 mt-1">Sincronizadas com o backend</p>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-cyan-100 text-cyan-700 text-sm font-semibold">
                {rules.length} {rules.length === 1 ? "regra" : "regras"}
              </div>
            </div>

            {loading ? (
              <div className="py-16 text-center text-black/40">Carregando regras…</div>
            ) : rules.length === 0 ? (
              <div className="border-2 border-dashed border-black/10 rounded-2xl p-16 text-center">
                <p className="text-black/40 text-lg">Nenhuma regra cadastrada ainda.</p>
                <p className="text-black/30 text-sm mt-1">
                  Crie sua primeira regra acima para começar a avaliar conversas.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {rules.map((rule) => (
                  <div
                    key={rule.id}
                    className="border border-black/5 rounded-2xl p-5 hover:bg-black/[0.02] transition-all"
                  >
                    <div className="flex items-start justify-between gap-6">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <h3 className="text-lg font-bold text-[#0b1220] tracking-tight">
                            {rule.descricao}
                          </h3>
                          <div className="px-2.5 py-0.5 rounded-full bg-cyan-100 text-cyan-700 text-xs font-semibold whitespace-nowrap">
                            {modoLabel[rule.modo] || rule.modo}
                          </div>
                        </div>
                        <p className="text-sm text-black/50">
                          ID #{rule.id} · usada pela IA em todas as novas conversas
                        </p>
                      </div>

                      <button
                        onClick={() => deleteRule(rule.id)}
                        className="px-4 py-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition text-sm font-medium flex-shrink-0"
                      >
                        Deletar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
