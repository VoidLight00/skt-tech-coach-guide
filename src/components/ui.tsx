"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { Check, ChevronRight } from "lucide-react";

export function PageFrame({ eyebrow, title, lede, children }: {
  eyebrow?: string; title: string; lede?: string; children: ReactNode;
}) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 160, damping: 24 });
  return (
    <div className="relative">
      <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-[2px] bg-brand origin-left z-50" />
      <div className="px-6 lg:px-14 py-10 lg:py-14 max-w-[980px]">
        <header className="mb-10">
          {eyebrow && <div className="eyebrow mb-4">{eyebrow}</div>}
          <h1 className="serif-kr text-4xl md:text-5xl font-bold tracking-tight leading-tight text-ink-900 dark:text-ink-50">
            {title}
          </h1>
          {lede && <p className="mt-5 text-ink-600 dark:text-ink-300 text-[17px] leading-[1.75] max-w-[680px]">{lede}</p>}
        </header>
        <div className="prose-brand">{children}</div>
      </div>
    </div>
  );
}

export function Section({ n, title, desc, children }: { n?: string | number; title: string; desc?: string; children: ReactNode }) {
  return (
    <section className="mb-14 scroll-mt-24 animate-fade-up">
      <div className="mb-5 flex items-baseline gap-3">
        {n !== undefined && <span className="font-mono text-[12px] text-brand">§ {typeof n === "number" ? String(n).padStart(2, "0") : n}</span>}
        <h2 className="serif-kr text-[26px] md:text-[32px] font-bold tracking-tight text-ink-900 dark:text-ink-50">{title}</h2>
      </div>
      {desc && <p className="text-ink-600 dark:text-ink-300 max-w-[660px] leading-relaxed mb-6">{desc}</p>}
      {children}
    </section>
  );
}

export function Card({ children, className = "", hover = true }: { children: ReactNode; className?: string; hover?: boolean }) {
  return <div className={`card ${hover ? "card-hover" : ""} p-5 md:p-6 ${className}`}>{children}</div>;
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
    <figure className="my-7 pl-5 border-l-2 border-brand">
      <blockquote className="serif-kr text-[17px] md:text-[18px] leading-[1.8] text-ink-800 dark:text-ink-100">
        {children}
      </blockquote>
      {by && <figcaption className="mt-2 text-[12px] uppercase tracking-[0.16em] text-ink-500 dark:text-ink-400">— {by}</figcaption>}
    </figure>
  );
}

export function Callout({ tone = "brand", title, children }: { tone?: "brand" | "neutral"; title?: string; children: ReactNode }) {
  const cls = tone === "brand" ? "callout brand" : "callout";
  return (
    <div className={`${cls} my-6 text-[14.5px] leading-relaxed`}>
      {title && <div className="font-semibold mb-1 text-ink-900 dark:text-ink-50">{title}</div>}
      <div className="text-ink-700 dark:text-ink-200">{children}</div>
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
    <ul className="flex flex-col gap-1.5 my-2">
      {items.map((t, i) => (
        <li key={i}>
          <button
            onClick={() => toggle(i)}
            className={`w-full text-left flex items-start gap-3 p-3 rounded-lg border transition-colors ${
              checked[i]
                ? "border-brand-100 bg-brand-50 dark:bg-[rgba(255,107,53,0.08)] dark:border-[rgba(255,107,53,0.25)]"
                : "border-ink-200 dark:border-ink-800 hover:border-brand-100"
            }`}
          >
            <span className={`mt-0.5 w-[18px] h-[18px] shrink-0 rounded border flex items-center justify-center transition-colors ${
              checked[i] ? "bg-brand border-brand text-white" : "border-ink-300 dark:border-ink-600"
            }`}>
              {checked[i] && <Check className="w-3 h-3" strokeWidth={3} />}
            </span>
            <span className={`text-[14px] leading-relaxed ${checked[i] ? "text-ink-500 dark:text-ink-400 line-through" : "text-ink-800 dark:text-ink-100"}`}>{t}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}

export function ScriptBox({ children, label = "낭독" }: { children: ReactNode; label?: string }) {
  return (
    <figure className="relative my-7 rounded-2xl border border-ink-200 dark:border-ink-800 bg-paper-alt dark:bg-ink-800/30 p-6 md:p-8">
      <span className="absolute -top-3 left-6 px-2.5 py-0.5 text-[10px] uppercase tracking-[0.2em] text-brand bg-paper dark:bg-night border border-ink-200 dark:border-ink-800 rounded-full font-semibold">{label}</span>
      <div className="serif-kr text-[17px] md:text-[19px] leading-[1.9] text-ink-900 dark:text-ink-50">{children}</div>
    </figure>
  );
}

export function Pair({ left, right, leftTitle = "말하지 않기", rightTitle = "대신 이렇게" }: {
  left: ReactNode; right: ReactNode; leftTitle?: string; rightTitle?: string;
}) {
  return (
    <div className="grid md:grid-cols-2 gap-3 my-5">
      <div className="card p-4">
        <div className="text-[10.5px] uppercase tracking-[0.2em] text-ink-500 mb-1.5 font-semibold">{leftTitle}</div>
        <div className="text-ink-700 dark:text-ink-200 text-[14px] leading-relaxed">{left}</div>
      </div>
      <div className="card p-4 border-brand-100 bg-brand-50 dark:bg-[rgba(255,107,53,0.06)] dark:border-[rgba(255,107,53,0.25)]">
        <div className="text-[10.5px] uppercase tracking-[0.2em] text-brand mb-1.5 font-semibold">{rightTitle}</div>
        <div className="text-ink-800 dark:text-ink-100 text-[14px] leading-relaxed">{right}</div>
      </div>
    </div>
  );
}

export function Tabs({ tabs }: { tabs: { label: string; content: ReactNode }[] }) {
  const [i, setI] = useState(0);
  return (
    <div className="my-6">
      <div className="flex flex-wrap gap-1 border-b border-ink-200 dark:border-ink-800 mb-4">
        {tabs.map((t, idx) => (
          <button key={idx} onClick={() => setI(idx)}
            className={`px-4 py-2.5 text-[13px] font-semibold border-b-2 transition ${
              i === idx ? "text-brand border-brand" : "text-ink-500 dark:text-ink-400 border-transparent hover:text-ink-800 dark:hover:text-ink-100"
            }`}>
            {t.label}
          </button>
        ))}
      </div>
      <motion.div key={i} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
        {tabs[i].content}
      </motion.div>
    </div>
  );
}

export function NextPrev({ prev, next }: { prev?: { href: string; label: string }; next?: { href: string; label: string } }) {
  return (
    <div className="mt-14 grid md:grid-cols-2 gap-3">
      {prev ? (
        <Link href={prev.href} className="card card-hover p-4 flex items-center gap-3">
          <ChevronRight className="w-4 h-4 rotate-180 text-ink-400" />
          <div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-ink-500">이전</div>
            <div className="text-ink-900 dark:text-ink-50 text-sm font-semibold">{prev.label}</div>
          </div>
        </Link>
      ) : <div className="hidden md:block" />}
      {next ? (
        <Link href={next.href} className="card card-hover p-4 flex items-center justify-end gap-3 text-right">
          <div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-ink-500">다음</div>
            <div className="text-ink-900 dark:text-ink-50 text-sm font-semibold">{next.label}</div>
          </div>
          <ChevronRight className="w-4 h-4 text-brand" />
        </Link>
      ) : <div className="hidden md:block" />}
    </div>
  );
}

export function Metric({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="card p-5">
      <div className="text-[11px] uppercase tracking-[0.2em] text-ink-500 mb-1.5 font-semibold">{label}</div>
      <div className="serif-kr text-2xl md:text-3xl text-ink-900 dark:text-ink-50 font-bold">{value}</div>
      {sub && <div className="text-[12.5px] text-ink-500 dark:text-ink-400 mt-1.5">{sub}</div>}
    </div>
  );
}
