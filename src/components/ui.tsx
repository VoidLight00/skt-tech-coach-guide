"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { Check, ChevronRight } from "lucide-react";

export function PageFrame({ title, subtitle, kicker, accent = "cyan", children }: {
  title: string; subtitle?: string; kicker?: string; accent?: "cyan" | "magenta" | "gold" | "lime" | "red"; children: ReactNode;
}) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 20 });
  const kickerColor =
    accent === "cyan" ? "text-neon-cyan"
    : accent === "magenta" ? "text-neon-magenta"
    : accent === "gold" ? "text-neon-gold"
    : accent === "lime" ? "text-neon-lime" : "text-red-400";
  return (
    <div className="relative min-h-screen">
      <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-neon-cyan via-neon-magenta to-neon-gold origin-left z-50" />
      <div className="void-mesh absolute inset-0 pointer-events-none" />
      <div className="relative z-10 px-5 lg:px-14 pt-8 pb-24 max-w-[1100px]">
        {kicker && (
          <div className={`uppercase tracking-[0.25em] text-[11px] ${kickerColor} mb-3`}>{kicker}</div>
        )}
        <h1 className="textbook-h1 text-4xl md:text-5xl text-void-ink leading-tight">
          <span className="shine-text">{title}</span>
        </h1>
        {subtitle && <p className="mt-4 text-void-muted max-w-2xl text-[15px] leading-relaxed">{subtitle}</p>}
        <div className="neon-divider my-8" />
        <div className="prose-void">{children}</div>
      </div>
    </div>
  );
}

export function Section({ n, title, desc, children }: { n?: string | number; title: string; desc?: string; children: ReactNode }) {
  return (
    <section className="mb-14 scroll-mt-20 animate-fade-up">
      <div className="flex items-baseline gap-3 mb-4">
        {n && <span className="font-mono text-neon-cyan text-sm">{String(n).padStart(2, "0")}</span>}
        <h2 className="textbook-h2 text-2xl md:text-3xl text-void-ink">{title}</h2>
      </div>
      {desc && <p className="text-void-muted mb-5 max-w-2xl leading-relaxed">{desc}</p>}
      {children}
    </section>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`void-card p-5 md:p-6 ${className}`}>{children}</div>;
}

export function CardGrid({ cols = 2, children }: { cols?: 1 | 2 | 3 | 4 | 5; children: ReactNode }) {
  const cls =
    cols === 5 ? "lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2"
    : cols === 4 ? "lg:grid-cols-4 md:grid-cols-2"
    : cols === 3 ? "lg:grid-cols-3 md:grid-cols-2"
    : cols === 2 ? "md:grid-cols-2" : "";
  return <div className={`grid grid-cols-1 ${cls} gap-4`}>{children}</div>;
}

export function Quote({ children, by }: { children: ReactNode; by?: string }) {
  return (
    <blockquote className="relative pl-5 md:pl-6 py-2 my-5 border-l-2 border-neon-cyan/60 text-void-ink italic">
      {children}
      {by && <div className="mt-2 text-[11px] text-void-muted uppercase tracking-[0.25em] not-italic">— {by}</div>}
    </blockquote>
  );
}

export function Callout({ tone = "info", title, children }: { tone?: "info" | "warn" | "ok" | "danger"; title?: string; children: ReactNode }) {
  const map = {
    info: "border-neon-cyan/40 bg-[rgba(92,241,255,0.05)]",
    warn: "border-neon-gold/40 bg-[rgba(255,209,102,0.05)]",
    ok: "border-neon-lime/40 bg-[rgba(182,243,106,0.05)]",
    danger: "border-red-400/40 bg-[rgba(255,107,107,0.05)]",
  }[tone];
  return (
    <div className={`border-l-4 ${map} p-4 rounded-r-lg my-5 text-[14px]`}>
      {title && <div className="font-semibold text-void-ink mb-1">{title}</div>}
      <div className="text-void-text leading-relaxed">{children}</div>
    </div>
  );
}

export function Checklist({ items, storageKey }: { items: string[]; storageKey?: string }) {
  const [checked, setChecked] = useState<boolean[]>([]);
  useEffect(() => {
    if (storageKey && typeof window !== "undefined") {
      try {
        const raw = localStorage.getItem(storageKey);
        if (raw) setChecked(JSON.parse(raw));
        else setChecked(new Array(items.length).fill(false));
      } catch { setChecked(new Array(items.length).fill(false)); }
    } else setChecked(new Array(items.length).fill(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  function toggle(i: number) {
    const next = [...checked]; next[i] = !next[i]; setChecked(next);
    if (storageKey && typeof window !== "undefined") localStorage.setItem(storageKey, JSON.stringify(next));
  }
  return (
    <ul className="flex flex-col gap-2">
      {items.map((t, i) => (
        <li key={i}>
          <button
            onClick={() => toggle(i)}
            className={`w-full text-left flex items-start gap-3 p-3 rounded-lg border transition-all ${
              checked[i] ? "border-neon-lime/40 bg-[rgba(182,243,106,0.05)]" : "border-void-line hover:border-neon-cyan/40"
            }`}
          >
            <span
              className={`mt-0.5 w-5 h-5 shrink-0 rounded-md border flex items-center justify-center transition-all ${
                checked[i] ? "bg-neon-lime/20 border-neon-lime/60" : "border-void-line"
              }`}
            >
              {checked[i] && <Check className="w-3.5 h-3.5 text-neon-lime" />}
            </span>
            <span className={`text-[14px] leading-relaxed ${checked[i] ? "text-void-muted line-through" : "text-void-text"}`}>{t}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}

export function ScriptBox({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <div className="relative p-5 md:p-7 my-6 rounded-2xl border border-neon-gold/30 bg-gradient-to-br from-[rgba(255,209,102,0.06)] to-[rgba(255,79,216,0.04)]">
      <div className="absolute -top-3 left-5 px-2.5 py-0.5 text-[10px] uppercase tracking-[0.25em] text-neon-gold bg-void-bg border border-neon-gold/30 rounded-full">
        {title ?? "Script"}
      </div>
      <div className="text-void-ink text-[16px] md:text-lg font-serif leading-[1.9]">{children}</div>
    </div>
  );
}

export function Pair({ left, right, leftTitle = "❌ 금지", rightTitle = "✅ 권장" }: { left: ReactNode; right: ReactNode; leftTitle?: string; rightTitle?: string }) {
  return (
    <div className="grid md:grid-cols-2 gap-3 my-4">
      <div className="void-card p-4 border-red-400/30">
        <div className="text-[11px] uppercase tracking-[0.25em] text-red-400 mb-1.5">{leftTitle}</div>
        <div className="text-void-text text-[14px]">{left}</div>
      </div>
      <div className="void-card p-4 border-neon-lime/30">
        <div className="text-[11px] uppercase tracking-[0.25em] text-neon-lime mb-1.5">{rightTitle}</div>
        <div className="text-void-text text-[14px]">{right}</div>
      </div>
    </div>
  );
}

export function StepPill({ n, label }: { n: number; label: string }) {
  return (
    <div className="inline-flex items-center gap-2 chip neon">
      <span className="font-mono text-neon-cyan">{n.toString().padStart(2, "0")}</span>
      <span className="text-void-ink text-[12px]">{label}</span>
    </div>
  );
}

export function Tabs({ tabs }: { tabs: { label: string; content: ReactNode }[] }) {
  const [i, setI] = useState(0);
  return (
    <div className="my-5">
      <div className="flex flex-wrap gap-2 border-b border-void-line mb-4">
        {tabs.map((t, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            className={`px-4 py-2 text-[13px] border-b-2 transition-all ${i === idx ? "text-neon-cyan border-neon-cyan" : "text-void-muted border-transparent hover:text-void-ink"}`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        {tabs[i].content}
      </motion.div>
    </div>
  );
}

export function NextPrev({ prev, next }: { prev?: { href: string; label: string }; next?: { href: string; label: string } }) {
  return (
    <div className="mt-12 flex flex-col md:flex-row gap-3 justify-between">
      {prev ? (
        <Link href={prev.href} className="void-card p-4 flex items-center gap-2 text-void-muted hover:text-void-ink transition">
          <ChevronRight className="w-4 h-4 rotate-180" />
          <div>
            <div className="text-[10px] uppercase tracking-[0.25em]">Prev</div>
            <div className="text-void-ink text-sm">{prev.label}</div>
          </div>
        </Link>
      ) : <div />}
      {next ? (
        <Link href={next.href} className="void-card p-4 flex items-center gap-2 text-void-muted hover:text-void-ink transition md:text-right">
          <div>
            <div className="text-[10px] uppercase tracking-[0.25em]">Next</div>
            <div className="text-void-ink text-sm">{next.label}</div>
          </div>
          <ChevronRight className="w-4 h-4" />
        </Link>
      ) : <div />}
    </div>
  );
}
