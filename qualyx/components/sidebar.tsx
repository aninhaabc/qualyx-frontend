"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

type Props = {
  userName?: string;
  userEmail?: string;
  onLogout?: () => void | Promise<void>;
};

const links = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="9" />
        <rect x="14" y="3" width="7" height="5" />
        <rect x="14" y="12" width="7" height="9" />
        <rect x="3" y="16" width="7" height="5" />
      </svg>
    ),
  },
  {
    name: "Regras",
    href: "/regras",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="8" y1="6" x2="21" y2="6" />
        <line x1="8" y1="12" x2="21" y2="12" />
        <line x1="8" y1="18" x2="21" y2="18" />
        <polyline points="3 6 4 7 6 5" />
        <polyline points="3 12 4 13 6 11" />
        <polyline points="3 18 4 19 6 17" />
      </svg>
    ),
  },
  {
    name: "Configurações",
    href: "/configurações",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
  },
];

export default function Sidebar({ userName, userEmail, onLogout }: Props) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const initials = (userName || "U")
    .split(/\s+/)
    .slice(0, 2)
    .map((s) => s[0])
    .join("")
    .toUpperCase();

  return (
    <div className="border-r border-black/5 bg-white/40 backdrop-blur-sm p-6 flex flex-col justify-between min-h-screen">
      <div>
        <div className="mb-10">
          <Image
            src="/img/Logo_Typo_Colored 1.png"
            alt="Qualyx"
            width={150}
            height={48}
            priority
          />
        </div>

        <div className="space-y-1.5">
          {links.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/dashboard" && pathname?.startsWith(link.href));

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`
                  flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all
                  ${
                    isActive
                      ? "bg-cyan-100 text-cyan-800"
                      : "text-black/60 hover:bg-black/5 hover:text-black"
                  }
                `}
              >
                <span className="h-4 w-4 block">{link.icon}</span>
                {link.name}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Footer do sidebar */}
      <div className="space-y-2">
        {userName ? (
          <div className="relative">
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="w-full bg-white rounded-2xl p-3 border border-black/5 flex items-center gap-3 hover:bg-white/80 transition"
            >
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-cyan-300 to-blue-400 grid place-items-center text-white text-xs font-bold flex-shrink-0">
                {initials}
              </div>
              <div className="flex-1 min-w-0 text-left">
                <p className="font-semibold text-sm text-[#0b1220] truncate">
                  {userName}
                </p>
                <p className="text-xs text-black/45 truncate">
                  {userEmail}
                </p>
              </div>
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-black/40 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {menuOpen && (
              <div
                className="absolute bottom-16 left-0 right-0 rounded-xl border border-black/10 bg-white shadow-lg py-1 z-10"
                onMouseLeave={() => setMenuOpen(false)}
              >
                <button
                  onClick={onLogout}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-black/70 hover:bg-black/[0.04] hover:text-black"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  Sair
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-3 border border-black/5 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
              <Image src="/img/icon.png" alt="Qualyx" width={36} height={36} />
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-sm">Qualyx</p>
              <p className="text-xs text-black/45">Dashboard conectado</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
