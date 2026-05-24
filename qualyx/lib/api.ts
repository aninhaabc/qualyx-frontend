/**
 * Cliente do backend Qualyx (FastAPI).
 * Mapeia os endpoints de judge/main.py.
 *
 * Em server components / route handlers, use QUALYX_API_URL.
 * Em client components, use NEXT_PUBLIC_QUALYX_API_URL.
 */

const API_URL =
  (typeof window === "undefined"
    ? process.env.QUALYX_API_URL
    : process.env.NEXT_PUBLIC_QUALYX_API_URL) || "http://localhost:8000";

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Qualyx API ${res.status}: ${body}`);
  }
  return res.json() as Promise<T>;
}

// ---------- Tipos ----------

export type Regra = {
  id: number;
  descricao: string;
  modo: "correspondeu" | "nota" | "contagem";
};

export type Avaliacao = {
  regra: string;
  modo: "correspondeu" | "nota" | "contagem";
  justificativa: string;
  correspondeu?: boolean | null;
  nota?: number | null;
  quantidade?: number | null;
  criado_em?: string | null;
};

export type ConversaResultado = {
  id_conversa: number;
  avaliacoes: Avaliacao[];
};

export type ResultadosRecentes = {
  cliente_id: number;
  total_regras: number;
  conversas_retornadas: number;
  resultados: ConversaResultado[];
};

// ---------- Funções ----------

export function getRegras(clienteId: number) {
  return request<{ cliente_id: number; regras: Regra[] }>(
    `/clientes/${clienteId}/regras`
  );
}

export function criarRegras(
  clienteId: number,
  regras: { descricao: string; modo: string }[]
) {
  return request<{
    status: string;
    cliente_id: number;
    regras_processadas: number;
  }>("/rules", {
    method: "POST",
    body: JSON.stringify({ cliente_id: clienteId, regras }),
  });
}

export function apagarRegra(id: number) {
  return request<{ status: string; id_regra_deletada: number }>(
    `/rules/${id}`,
    { method: "DELETE" }
  );
}

export function getRecentResults(clienteId: number) {
  return request<ResultadosRecentes>(
    `/clientes/${clienteId}/results/recent`
  );
}

// Mantém o nome legado para retrocompatibilidade com código existente.
export const getResultadosRecentes = getRecentResults;

export function healthCheck() {
  return request<{ status: string; timestamp: string }>("/health");
}
