"use client";

import { useEffect, useState } from "react";
import { getRecentResults } from "@/lib/api";

import Sidebar from "./sidebar";

export default function DashboardPreview() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const result = await getRecentResults(1);

        console.log(result);

        setData(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-[#e1e6e7]">
        <p className="text-black/50 text-lg">
          Carregando dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#e1e6e7] min-h-screen">
      
      {/* Layout */}
      <div className="grid grid-cols-[240px_1fr]">

        {/* Sidebar */}
        <Sidebar />

        {/* Main */}
        <div className="p-10">

          {/* Header */}
          <div className="flex items-center justify-between mb-10">
            
            <div>
              <h1 className="text-5xl font-bold tracking-tight">
                Dashboard
              </h1>

              <p className="text-black/50 mt-3 text-lg">
                Avaliações processadas automaticamente pela IA
              </p>
            </div>

            <div className="flex items-center gap-3">
              
              <div className="px-4 py-2 rounded-xl bg-white border border-black/5 text-sm font-medium">
                Tempo real
              </div>

              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-300 to-blue-400" />
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

            {/* Conversas */}
            <div className="bg-white rounded-[32px] border border-black/5 p-8 shadow-sm">
              
              <p className="text-sm text-black/50 mb-4">
                Conversas Processadas
              </p>

              <h2 className="text-7xl font-bold tracking-tight mb-4">
                {data?.conversas_retornadas || 0}
              </h2>

              <div className="flex items-center gap-2">
                
                <div className="w-2 h-2 rounded-full bg-cyan-400" />

                <span className="text-cyan-700 text-sm font-medium">
                  Dados reais do backend
                </span>
              </div>
            </div>

            {/* Regras */}
            <div className="bg-white rounded-[32px] border border-black/5 p-8 shadow-sm">
              
              <p className="text-sm text-black/50 mb-4">
                Total de Regras
              </p>

              <h2 className="text-7xl font-bold tracking-tight mb-4">
                {data?.total_regras || 0}
              </h2>

              <div className="flex items-center gap-2">
                
                <div className="w-2 h-2 rounded-full bg-cyan-400" />

                <span className="text-cyan-700 text-sm font-medium">
                  Regras sincronizadas
                </span>
              </div>
            </div>
          </div>

          {/* Conversations */}
          <div className="bg-white rounded-[32px] border border-black/5 p-8 shadow-sm">

            {/* Top */}
            <div className="flex items-center justify-between mb-10">
              
              <div>
                <h3 className="text-4xl font-bold tracking-tight">
                  Conversas Avaliadas
                </h3>

                <p className="text-black/50 mt-2 text-lg">
                  Resultados processados automaticamente
                </p>
              </div>

              <div className="px-4 py-2 rounded-xl bg-cyan-100 text-cyan-700 text-sm font-medium">
                API conectada
              </div>
            </div>

            {/* Conversations List */}
            <div className="space-y-8">

              {data?.resultados?.map(
                (resultado: any, index: number) => (
                  <div
                    key={index}
                    className="border border-black/5 rounded-[28px] p-7"
                  >
                    
                    {/* Conversation Header */}
                    <div className="flex items-center justify-between mb-8">

                      <div>
                        <h4 className="text-4xl font-bold tracking-tight">
                          Conversa #{resultado.id_conversa}
                        </h4>

                        <p className="text-black/40 mt-2 text-lg">
                          {resultado.avaliacoes.length} avaliações processadas
                        </p>
                      </div>

                      <div className="px-4 py-2 rounded-full bg-cyan-100 text-cyan-700 text-sm font-medium">
                        Processado
                      </div>
                    </div>

                    {/* Avaliações */}
                    <div className="space-y-5">

                      {resultado.avaliacoes.map(
                        (avaliacao: any, idx: number) => {

                          const isCorrespondeu =
                            avaliacao.correspondeu === true;

                          const isNaoCorrespondeu =
                            avaliacao.correspondeu === false;

                          return (
                            <div
                              key={idx}
                              className="bg-black/[0.03] rounded-[24px] p-6"
                            >
                              
                              {/* Top */}
                              <div className="flex items-start justify-between gap-6 mb-5">

                                {/* Rule */}
                                <div className="flex-1">
                                  <h5 className="text-3xl font-semibold leading-10 tracking-tight">
                                    {avaliacao.regra}
                                  </h5>
                                </div>

                                {/* Badges */}
                                <div className="flex items-center gap-2 flex-wrap justify-end">

                                  {/* Tipo */}
                                  <div className="px-3 py-1 rounded-full bg-white border border-black/5 text-sm">
                                    {avaliacao.modo}
                                  </div>

                                  {/* NOTA */}
                                  {avaliacao.modo === "nota" &&
                                    avaliacao.nota !== null &&
                                    avaliacao.nota !== undefined && (
                                      <div className="px-3 py-1 rounded-full bg-cyan-100 text-cyan-700 text-sm font-medium">
                                        Nota: {avaliacao.nota}
                                      </div>
                                    )}

                                  {/* CORRESPONDEU */}
                                  {avaliacao.modo === "correspondeu" &&
                                    isCorrespondeu && (
                                      <div className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                                        Sim
                                      </div>
                                    )}

                                  {/* NÃO CORRESPONDEU */}
                                  {avaliacao.modo === "correspondeu" &&
                                    isNaoCorrespondeu && (
                                      <div className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm font-medium">
                                        Não
                                      </div>
                                    )}

                                  {/* CONTAGEM */}
                                  {avaliacao.modo === "contagem" &&
                                    avaliacao.quantidade !== null &&
                                    avaliacao.quantidade !== undefined && (
                                      <div className="px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-sm font-medium">
                                        {avaliacao.quantidade} ocorrências
                                      </div>
                                    )}
                                </div>
                              </div>

                              {/* Justificativa */}
                              <p className="text-black/60 text-xl leading-9">
                                {avaliacao.justificativa}
                              </p>
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}