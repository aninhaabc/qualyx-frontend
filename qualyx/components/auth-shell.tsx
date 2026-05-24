import Image from "next/image";
import Link from "next/link";

export default function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen grid lg:grid-cols-2 bg-[#e1e6e7]">
      {/* LEFT — formulário */}
      <div className="flex flex-col px-6 md:px-12 lg:px-16 py-8">
        <Link href="/" className="inline-block">
          <Image
            src="/img/Logo_Typo_Colored 1.png"
            alt="Qualyx"
            width={150}
            height={45}
            priority
          />
        </Link>

        <div className="flex-1 flex items-center justify-center py-10">
          <div className="w-full max-w-md">{children}</div>
        </div>

        <p className="text-xs text-black/40">
          © {new Date().getFullYear()} Qualyx · Todos os direitos reservados.
        </p>
      </div>

      {/* RIGHT — painel brand */}
      <aside className="hidden lg:block relative overflow-hidden bg-[#0b1220] text-white">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 800px 500px at 20% 10%, rgba(117,232,229,0.25), transparent 60%), radial-gradient(ellipse 600px 400px at 80% 80%, rgba(139,218,232,0.18), transparent 60%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage:
              "radial-gradient(ellipse at top, black 30%, transparent 70%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at top, black 30%, transparent 70%)",
          }}
        />

        <div className="relative h-full flex flex-col justify-between p-12">
          <div />

          <div className="max-w-md">
            <blockquote className="text-2xl leading-snug text-white italic">
              &ldquo;A Qualyx nos deu visibilidade real do que nossos agentes
              estavam dizendo — em 3 dias detectamos 11 falhas de compliance
              que estavam passando despercebidas.&rdquo;
            </blockquote>
            <div className="mt-6 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-cyan-300 to-blue-400" />
              <div>
                <div className="text-sm font-medium">Mariana Souza</div>
                <div className="text-xs text-white/60">
                  Head of CX, Acme Corp
                </div>
              </div>
            </div>
          </div>

          <div className="text-xs text-white/50">
            QA para agentes de IA — automático, auditável, em escala.
          </div>
        </div>
      </aside>
    </main>
  );
}
