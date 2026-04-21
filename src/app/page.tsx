"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { NAV, PRINCIPLES } from "@/lib/nav";
import { ArrowUpRight } from "lucide-react";
import { Card, CardGrid, Section, Metric } from "@/components/ui";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="px-6 lg:px-14 pt-14 pb-10 max-w-[1080px]">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="eyebrow mb-5">SKT AX Design Camp · 테크코치 교과서</div>
          <h1 className="serif-kr text-[44px] md:text-[64px] font-bold leading-[1.08] tracking-tight text-ink-900 dark:text-ink-50">
            팀의 업무를 들여다보고,<br />
            AI가 들어갈 자리를 함께 찾는다.
          </h1>
          <p className="mt-6 max-w-[640px] text-ink-600 dark:text-ink-300 text-[17px] leading-[1.8]">
            이 책은 손상현 테크코치가 2026년 4월 21일과 23일 SKT 현장에 투입되기 전,
            몇 번이고 다시 펼쳐 볼 수 있도록 정리한 한 권이다.
            개념은 짧게, 문장은 담백하게, 현장에서 필요한 말은 입에 붙을 때까지.
          </p>
          <div className="mt-7 flex flex-wrap gap-2.5">
            <Link href="/today" className="btn-brand">
              오늘의 실행 플랜 <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link href="/script" className="btn-ghost">진입 스크립트</Link>
            <Link href="/simulation" className="btn-ghost">현장 시뮬레이션</Link>
          </div>
        </motion.div>

        {/* Key metrics */}
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.6 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3"
        >
          <Metric label="현장 시간" value="15:00–17:30" sub="4월 21일 화 · 4월 23일 목" />
          <Metric label="팀당 코칭" value="25–30분" sub="2–3팀 순회, 필요 시 4팀" />
          <Metric label="미니 강의" value="생략" sub="15:00 즉시 코칭 진입" />
          <Metric label="오늘의 답" value="단 하나" sub="가장 먼저 시도해 볼 수 있는 것" />
        </motion.div>
      </section>

      <Section n={1} title="목차" desc="왼쪽 사이드바에서도 이동할 수 있습니다. 각 장은 현장에서 단독으로도 기능하도록 썼습니다.">
        <CardGrid cols={2}>
          {NAV.filter((n) => n.href !== "/").map((n, i) => {
            const Icon = n.icon;
            return (
              <motion.div key={n.href} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}>
                <Link href={n.href} className="block">
                  <Card className="h-full">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg border border-ink-200 dark:border-ink-800 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-ink-600 dark:text-ink-300" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2.5 mb-1">
                          <span className="font-mono text-[11px] text-brand">§ {n.number}</span>
                          <span className="serif-kr text-[18px] font-bold text-ink-900 dark:text-ink-50">{n.label}</span>
                        </div>
                        <p className="text-[13.5px] text-ink-600 dark:text-ink-300 leading-relaxed">{n.summary}</p>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-ink-400 shrink-0" />
                    </div>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </CardGrid>
      </Section>

      <Section n={2} title="이 책이 지키는 여섯 가지" desc="현장에서 길을 잃었을 때 돌아오는 기준점.">
        <CardGrid cols={2}>
          {PRINCIPLES.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}>
              <Card className="h-full">
                <div className="text-[11px] uppercase tracking-[0.18em] text-brand font-semibold mb-2">원칙 {String(i + 1).padStart(2, "0")}</div>
                <div className="serif-kr text-[19px] font-bold text-ink-900 dark:text-ink-50 leading-snug mb-2">{p.t}</div>
                <p className="text-[14px] text-ink-600 dark:text-ink-300 leading-relaxed">{p.d}</p>
              </Card>
            </motion.div>
          ))}
        </CardGrid>
      </Section>

      <Section n={3} title="오늘 하지 않으면 아쉬운 일" desc="현장 투입 전 세 가지만 손에 쥔다.">
        <CardGrid cols={3}>
          <Link href="/script" className="block"><Card className="h-full"><div className="text-[11px] text-brand uppercase tracking-[0.18em] font-semibold mb-1.5">첫째</div><div className="serif-kr text-[18px] font-bold text-ink-900 dark:text-ink-50 mb-2">진입 스크립트 낭독</div><p className="text-[13.5px] text-ink-600 dark:text-ink-300 leading-relaxed">입에 붙을 때까지 소리 내어 세 번.</p></Card></Link>
          <Link href="/recipes" className="block"><Card className="h-full"><div className="text-[11px] text-brand uppercase tracking-[0.18em] font-semibold mb-1.5">둘째</div><div className="serif-kr text-[18px] font-bold text-ink-900 dark:text-ink-50 mb-2">레시피 R1·R6·R9 시연</div><p className="text-[13.5px] text-ink-600 dark:text-ink-300 leading-relaxed">실제 도구로 한 번씩 돌려 결과를 손에 쥔다.</p></Card></Link>
          <Link href="/simulation" className="block"><Card className="h-full"><div className="text-[11px] text-brand uppercase tracking-[0.18em] font-semibold mb-1.5">셋째</div><div className="serif-kr text-[18px] font-bold text-ink-900 dark:text-ink-50 mb-2">장면 2와 4 재독</div><p className="text-[13.5px] text-ink-600 dark:text-ink-300 leading-relaxed">까다로운 두 팀의 반응을 머리로 예습한다.</p></Card></Link>
        </CardGrid>
      </Section>
    </div>
  );
}
