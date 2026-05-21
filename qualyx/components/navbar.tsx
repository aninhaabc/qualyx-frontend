import Image from "next/image";

export default function Navbar() {
  return (
    <header className="w-full">
      <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center">
          <Image
            src="/img/Logo_Typo_Colored 1.png"
            alt="Qualyx"
            width={190}
            height={60}
            priority
          />
        </div>

        {/* Menu */}
        <nav className="hidden md:flex items-center gap-10 text-sm font-medium">
          <a href="#">Produto</a>
          <a href="#">Recursos</a>
          <a href="#">Preços</a>
          <a href="#">Sobre nós</a>
          <a href="#">Contato</a>
        </nav>

        {/* Buttons */}
        <div className="flex items-center gap-4">
          <button className="px-5 py-2 rounded-2xl border border-black/10 hover:bg-white transition">
            Entrar
          </button>

          <button className="px-5 py-2 rounded-2xl bg-gradient-to-r from-cyan-300 to-blue-400 font-medium hover:opacity-90 transition">
            Teste grátis
          </button>
        </div>
      </div>
    </header>
  );
}