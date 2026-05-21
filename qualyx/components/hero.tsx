import DashboardPreview from "./dashboard-preview";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-cyan-300/20 blur-3xl rounded-full" />

      <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-32 grid lg:grid-cols-2 gap-20 items-center">
        
        {/* LEFT */}
        <div className="flex flex-col gap-8">
          
          {/* Badge */}
          <div className="w-fit px-4 py-2 rounded-full border border-black/10 bg-white/60 backdrop-blur-sm">
            <span className="text-sm font-medium">
              ✨ QA para agentes de IA
            </span>
          </div>

          {/* Title */}
          <div className="space-y-6">
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight tracking-tight">
              Sua IA atende clientes.
              <br />

              A Qualyx garante
              <br />

              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                a qualidade.
              </span>
            </h1>

            <p className="max-w-xl text-lg leading-8 text-black/60">
              Monitore, avalie e detecte falhas em agentes de IA
              automaticamente com foco em negócio e compliance.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            
            <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-300 to-blue-400 font-semibold shadow-xl shadow-cyan-300/40 hover:scale-[1.02] transition-all">
              Teste grátis
            </button>

            <button className="px-8 py-4 rounded-2xl border border-black/10 bg-white/70 backdrop-blur-sm hover:bg-white transition-all">
              Agendar demo
            </button>
          </div>

          {/* Logos */}
          <div className="pt-10">
            <p className="text-sm text-black/40 mb-6">
              Empresas que confiam na Qualyx
            </p>

            <div className="flex flex-wrap gap-8 opacity-50 font-semibold">
              <span>unifique</span>
              <span>V4 Company</span>
              <span>nuvemshop</span>
              <span>bling</span>
              <span>stone</span>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <DashboardPreview />
      </div>
    </section>
  );
}