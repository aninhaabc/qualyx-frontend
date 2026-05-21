"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const links = [
  {
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    name: "Regras",
    href: "/regras",
  },
  {
    name: "Configurações",
    href: "/configuracoes",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="border-r border-black/5 p-8 flex flex-col justify-between">
      
      {/* TOP */}
      <div>

        {/* Logo */}
        <div className="mb-14">
          
          <Image
            src="/img/Logo_Typo_Colored 1.png"
            alt="Qualyx"
            width={170}
            height={50}
            priority
          />
        </div>

        {/* Nav */}
        <div className="space-y-3">
          
          {links.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`
                  flex items-center rounded-2xl px-5 py-4 font-medium transition-all
                  ${
                    isActive
                      ? "bg-cyan-100 text-cyan-700"
                      : "text-black/60 hover:bg-black/5 hover:text-black"
                  }
                `}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Bottom */}
      <div className="bg-white rounded-2xl p-4 border border-black/5 flex items-center gap-3">
        
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <Image
            src="/img/logo-icon.png"
            alt="Qualyx"
            width={40}
            height={40}
          />
        </div>

        <div>
          <p className="font-medium text-sm">
            Qualyx
          </p>

          <p className="text-xs text-black/40">
            Dashboard conectado
          </p>
        </div>
      </div>
    </div>
  );
}