"use client";

import { useEffect, useState } from "react";
import Sidebar from "../sidebar";

const API_URL = "http://localhost:8000";

export default function RulesPage() {
  const [rules, setRules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [newRule, setNewRule] = useState("");
  const [mode, setMode] = useState("correspondeu");

  async function fetchRules() {
    try {
      const response = await fetch(
        `${API_URL}/clientes/1/regras`
      );

      const data = await response.json();

      setRules(data.regras || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRules();
  }, []);

  async function createRule() {
    if (!newRule.trim()) return;

    try {
      await fetch(`${API_URL}/rules`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          cliente_id: 1,
          regras: [
            {
              descricao: newRule,
              modo: mode,
            },
          ],
        }),
      });

      setNewRule("");

      fetchRules();
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteRule(id: number) {
    try {
      await fetch(`${API_URL}/rules/${id}`, {
        method: "DELETE",
      });

      fetchRules();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className="min-h-screen bg-[#e1e6e7]">
      
      <div className="grid grid-cols-[240px_1fr]">

        {/* Sidebar */}
        <Sidebar />

        {/* Content */}
        <div className="p-10">

          {/* Header */}
          <div className="mb-10">
            
            <h1 className="text-5xl font-bold tracking-tight mb-3">
              Regras de Avaliação
            </h1>

            <p className="text-black/50 text-lg">
              Defina os critérios utilizados para avaliar conversas.
            </p>
          </div>

          {/* Create Rule */}
          <div className="bg-white rounded-[32px] border border-black/5 p-8 mb-8 shadow-sm">
            
            <h2 className="text-3xl font-bold mb-8">
              Nova Regra
            </h2>

            <div className="space-y-6">

              {/* Descrição */}
              <div>
                <label className="block text-sm font-medium mb-3">
                  Descrição
                </label>

                <input
                  value={newRule}
                  onChange={(e) => setNewRule(e.target.value)}
                  placeholder="Ex: O atendente cumpriu o script?"
                  className="w-full h-14 rounded-2xl border border-black/10 px-5 outline-none focus:ring-2 focus:ring-cyan-300 bg-white"
                />
              </div>

              {/* Select */}
              <div>
                <label className="block text-sm font-medium mb-3">
                  Modo de avaliação
                </label>

                <select
                  value={mode}
                  onChange={(e) => setMode(e.target.value)}
                  className="w-full h-14 rounded-2xl border border-black/10 px-5 outline-none focus:ring-2 focus:ring-cyan-300 bg-white"
                >
                  <option value="correspondeu">
                    Sim/Não
                  </option>

                  <option value="nota">
                    Nota de Qualidade
                  </option>

                  <option value="contagem">
                    Contagem
                  </option>
                </select>
              </div>

              {/* Button */}
              <button
                onClick={createRule}
                className="h-14 px-8 rounded-2xl bg-gradient-to-r from-cyan-300 to-blue-400 font-semibold hover:opacity-90 transition-all shadow-lg shadow-cyan-200/40"
              >
                Salvar Regra
              </button>
            </div>
          </div>

          {/* Rules */}
          <div className="bg-white rounded-[32px] border border-black/5 p-8 shadow-sm">

            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              
              <div>
                <h2 className="text-3xl font-bold">
                  Regras Ativas
                </h2>

                <p className="text-black/50 mt-2">
                  Regras sincronizadas com o backend
                </p>
              </div>

              <div className="px-4 py-2 rounded-xl bg-cyan-100 text-cyan-700 text-sm font-medium">
                {rules.length} regras
              </div>
            </div>

            {/* Loading */}
            {loading ? (
              <div className="py-20 text-center">
                <p className="text-black/40 text-lg">
                  Carregando regras...
                </p>
              </div>
            ) : rules.length === 0 ? (

              /* Empty */
              <div className="border-2 border-dashed border-black/10 rounded-[28px] p-20 text-center">
                
                <p className="text-black/40 text-lg">
                  Nenhuma regra cadastrada ainda.
                </p>
              </div>

            ) : (

              /* Rules List */
              <div className="space-y-5">

                {rules.map((rule) => (
                  <div
                    key={rule.id}
                    className="border border-black/5 rounded-[28px] p-6 hover:bg-black/[0.02] transition-all"
                  >
                    
                    <div className="flex items-start justify-between gap-8">

                      {/* Left */}
                      <div className="flex-1">

                        <div className="flex items-center gap-3 mb-3">

                          <h3 className="text-2xl font-semibold tracking-tight">
                            {rule.descricao}
                          </h3>

                          <div className="px-3 py-1 rounded-full bg-cyan-100 text-cyan-700 text-sm font-medium whitespace-nowrap">
                            {rule.modo}
                          </div>
                        </div>

                        <p className="text-black/50 leading-7">
                          Regra utilizada pela IA para avaliar conversas automaticamente.
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-3">

                        <button
                          className="px-4 py-2 rounded-xl bg-black/[0.04] hover:bg-black/[0.08] transition text-sm font-medium"
                        >
                          Editar
                        </button>

                        <button
                          onClick={() => deleteRule(rule.id)}
                          className="px-4 py-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition text-sm font-medium"
                        >
                          Deletar
                        </button>
                      </div>
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