"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV } from "@/lib/nav";
import { motion } from "framer-motion";
import { useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile top bar */}
      <header className="lg:hidden sticky top-0 z-40 flex items-center justify-between px-4 py-3 border-b border-void-line bg-void-bg/85 backdrop-blur">
        <Link href="/" className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-neon-cyan" />
          <span className="textbook-h2 text-sm text-void-ink">SKT · 테크코치 가이드</span>
        </Link>
        <button aria-label="Toggle menu" onClick={() => setOpen((v) => !v)} className="p-2 rounded-md border border-void-line text-void-muted hover:text-void-ink">
          {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </header>

      {/* Overlay nav mobile */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-30 bg-void-bg/90 backdrop-blur-md pt-14 overflow-y-auto">
          <NavList pathname={pathname} onClickItem={() => setOpen(false)} />
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-[280px] shrink-0 flex-col sticky top-0 h-screen border-r border-void-line bg-void-surface/60 backdrop-blur">
        <div className="p-5 pb-3">
          <Link href="/" className="flex items-center gap-2">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 rounded-full bg-gradient-to-br from-neon-cyan via-neon-magenta to-neon-gold"
              style={{ maskImage: "radial-gradient(circle, transparent 40%, black 42%)", WebkitMaskImage: "radial-gradient(circle, transparent 40%, black 42%)" }}
            />
            <div>
              <div className="textbook-h2 text-[15px] text-void-ink leading-tight">SKT AX Design Camp</div>
              <div className="text-[11px] text-void-muted">테크코치 현장 교과서</div>
            </div>
          </Link>
        </div>
        <div className="neon-divider mx-5 my-2" />
        <nav className="px-3 pb-6 overflow-y-auto flex-1">
          <NavList pathname={pathname} />
        </nav>
        <footer className="px-5 py-4 border-t border-void-line text-[11px] text-void-muted">
          <div>손상현 · VOIDLIGHT</div>
          <div>v1 · 2026-04-21</div>
        </footer>
      </aside>
    </>
  );
}

function NavList({ pathname, onClickItem }: { pathname: string; onClickItem?: () => void }) {
  return (
    <ul className="flex flex-col gap-1 px-2">
      {NAV.map((item) => {
        const active = pathname === item.href;
        const Icon = item.icon;
        const accentColor =
          item.accent === "cyan" ? "text-neon-cyan"
          : item.accent === "magenta" ? "text-neon-magenta"
          : item.accent === "gold" ? "text-neon-gold"
          : item.accent === "lime" ? "text-neon-lime"
          : "text-red-400";
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onClickItem}
              className={`group flex items-start gap-3 rounded-xl px-3 py-2.5 border transition-all ${
                active
                  ? "border-neon-cyan/40 bg-void-elev shadow-neon"
                  : "border-transparent hover:border-void-line hover:bg-void-elev/50"
              }`}
            >
              <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${accentColor}`} />
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`text-[13px] font-medium ${active ? "text-void-ink" : "text-void-text"}`}>{item.kr}</span>
                </div>
                <div className="text-[11px] text-void-muted truncate">{item.label}</div>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
