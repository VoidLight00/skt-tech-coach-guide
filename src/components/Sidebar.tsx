"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV } from "@/lib/nav";
import { Menu, X, Sun, Moon } from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = typeof window !== "undefined" && localStorage.getItem("theme");
    const prefers = typeof window !== "undefined" && window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    const initial = stored ? stored === "dark" : prefers;
    setDark(initial);
    document.documentElement.classList.toggle("dark", initial);
  }, []);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    if (typeof window !== "undefined") localStorage.setItem("theme", next ? "dark" : "light");
  }

  return (
    <>
      {/* Mobile bar */}
      <header className="lg:hidden sticky top-0 z-40 bg-paper/90 backdrop-blur border-b border-ink-200 dark:border-ink-800">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2">
            <LogoMark />
            <span className="font-semibold tracking-tight">AX Design Camp · 테크코치</span>
          </Link>
          <div className="flex items-center gap-1">
            <button aria-label="Theme" onClick={toggleTheme} className="p-2 rounded-md border border-ink-200 dark:border-ink-800 text-ink-600 dark:text-ink-300">
              {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button aria-label="Menu" onClick={() => setOpen((v) => !v)} className="p-2 rounded-md border border-ink-200 dark:border-ink-800 text-ink-700 dark:text-ink-200">
              {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
        {open && (
          <nav className="border-t border-ink-200 dark:border-ink-800 bg-paper dark:bg-night">
            <NavList pathname={pathname} onClickItem={() => setOpen(false)} />
          </nav>
        )}
      </header>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-[280px] shrink-0 flex-col sticky top-0 h-screen border-r border-ink-200 dark:border-ink-800">
        <div className="px-6 pt-7 pb-4">
          <Link href="/" className="flex items-center gap-3">
            <LogoMark />
            <div>
              <div className="text-[13px] font-semibold tracking-tight">AX Design Camp</div>
              <div className="text-[11px] text-ink-500 dark:text-ink-400 uppercase tracking-[0.18em]">테크코치 · 2026</div>
            </div>
          </Link>
        </div>
        <div className="h-px bg-ink-200 dark:bg-ink-800 mx-6 my-2" />
        <nav className="flex-1 overflow-y-auto px-3 pt-2 pb-6">
          <NavList pathname={pathname} />
        </nav>
        <footer className="px-6 py-4 border-t border-ink-200 dark:border-ink-800 flex items-center justify-between text-[11px] text-ink-500 dark:text-ink-400">
          <div>손상현 · VOIDLIGHT</div>
          <button onClick={toggleTheme} className="inline-flex items-center gap-1.5 hover:text-ink-700 dark:hover:text-ink-200">
            {dark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            <span>{dark ? "Light" : "Dark"}</span>
          </button>
        </footer>
      </aside>
    </>
  );
}

function LogoMark() {
  return (
    <span className="relative inline-flex w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-600 text-white items-center justify-center font-serif font-bold text-sm shadow-brand">
      V
    </span>
  );
}

function NavList({ pathname, onClickItem }: { pathname: string; onClickItem?: () => void }) {
  return (
    <ul className="flex flex-col gap-0.5 px-1 py-1">
      {NAV.map((item) => {
        const active = pathname === item.href;
        const Icon = item.icon;
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onClickItem}
              className={`group flex items-start gap-3 rounded-lg px-3 py-2.5 border ${
                active
                  ? "border-brand-100 bg-brand-50 dark:bg-[rgba(255,107,53,0.08)] dark:border-[rgba(255,107,53,0.3)]"
                  : "border-transparent hover:bg-ink-50 dark:hover:bg-ink-800/50"
              }`}
            >
              <span className={`mt-0.5 font-mono text-[11px] ${active ? "text-brand" : "text-ink-400"}`}>{item.number}</span>
              <span className="flex-1 min-w-0">
                <span className={`block text-[13.5px] ${active ? "text-ink-900 dark:text-ink-50 font-semibold" : "text-ink-700 dark:text-ink-200"}`}>{item.label}</span>
                <span className="block text-[11.5px] text-ink-500 dark:text-ink-400 truncate">{item.summary}</span>
              </span>
              <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${active ? "text-brand" : "text-ink-400 group-hover:text-ink-600"}`} />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
