"use client";

import { useRouter } from "next/navigation";
import Sidebar from "./sidebar";

type Props = {
  clienteId: number;
  userName: string;
  userEmail: string;
  plan: string;
};

export default function ConfiguracoesView({
  clienteId,
  userName,
  userEmail,
  plan,
}: Props) {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  const planLabel =
    plan === "free" ? "Gratuito" : plan === "pro" ? "Pro" : "Enterprise";

  return (
    <main className="min-h-screen bg-[#e1e6e7]">
      <div className="grid grid-cols-[260px_1fr]">
        <Sidebar userName={userName} userEmail={userEmail} onLogout={handleLogout} />

        <div className="p-8 md:p-10 max-w-4xl">
          <div className="mb-10">
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-[#0b1220] mb-3">
              Configurações
            </h1>
            <p className="text-black/55 text-lg">
              Gerencie sua conta e workspace.
            </p>
          </div>

          {/* Conta */}
          <section className="card-soft p-7 mb-6">
            <h2 className="text-xl font-bold text-[#0b1220] mb-5">Conta</h2>

            <dl className="grid sm:grid-cols-[180px_1fr] gap-y-4 gap-x-6 text-sm">
              <dt className="text-black/55">Nome</dt>
              <dd className="text-[#0b1220] font-medium">{userName}</dd>

              <dt className="text-black/55">Email</dt>
              <dd className="text-[#0b1220] font-medium">{userEmail}</dd>

              <dt className="text-black/55">Plano atual</dt>
              <dd>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 text-cyan-700 font-semibold text-xs">
                  {planLabel}
                </span>
              </dd>

              <dt className="text-black/55">ID do cliente (API)</dt>
              <dd>
                <code className="bg-black/5 rounded px-2 py-0.5 text-xs">
                  {clienteId}
                </code>
              </dd>
            </dl>
          </section>

          {/* Integração API */}
          <section className="card-soft p-7 mb-6">
            <h2 className="text-xl font-bold text-[#0b1220] mb-2">
              Integração com a API
            </h2>
            <p className="text-sm text-black/55 mb-5">
              Envie eventos de conversa do seu agente para a Qualyx usando o
              endpoint abaixo.
            </p>

            <div className="rounded-xl bg-[#0b1220] text-white/90 p-4 font-mono text-xs leading-relaxed overflow-x-auto">
              <span className="text-cyan-300">POST</span> /rawevents
              <br />
              {"{"}<br />
              {"  "}<span className="text-cyan-300">&quot;cliente_id&quot;</span>:{" "}
              <span className="text-amber-200">{clienteId}</span>,<br />
              {"  "}<span className="text-cyan-300">&quot;conversa_id&quot;</span>:{" "}
              <span className="text-amber-200">123</span>,<br />
              {"  "}<span className="text-cyan-300">&quot;mensagem&quot;</span>:{" "}
              <span className="text-emerald-300">&quot;Olá, como posso ajudar?&quot;</span>
              <br />
              {"}"}
            </div>
          </section>

          {/* Zona de perigo */}
          <section className="card-soft p-7 border-red-200/50">
            <h2 className="text-xl font-bold text-[#0b1220] mb-2">
              Zona de perigo
            </h2>
            <p className="text-sm text-black/55 mb-5">
              Operações que não podem ser desfeitas.
            </p>
            <button
              onClick={handleLogout}
              className="px-5 py-2.5 rounded-xl border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 transition text-sm font-semibold"
            >
              Sair desta conta
            </button>
          </section>
        </div>
      </div>
    </main>
  );
}
