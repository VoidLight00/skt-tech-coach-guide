"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { NAV, PRINCIPLES } from "@/lib/nav";
import { Sparkles, Clock, MapPin, Users, ArrowRight } from "lucide-react";
import { Card, CardGrid, Section } from "@/components/ui";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <div className="void-mesh absolute inset-0 pointer-events-none" />

      {/* Hero */}
      <section className="relative z-10 px-5 lg:px-14 pt-12 pb-10 max-w-[1200px]">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div className="inline-flex items-center gap-2 chip neon mb-5">
            <Sparkles className="w-3 h-3" />
            <span>SKT AX Design Camp · 테크코치 현장 교과서</span>
          </div>
          <h1 className="textbook-h1 text-[40px] md:text-[64px] leading-[1.05] text-void-ink">
            <span className="shine-text">팀 업무를 구조화하고</span>
            <br />
            <span className="text-void-ink">AI 협업 지점을 찾는</span>
            <br />
            <span className="shine-text">25분의 밀착 코칭.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-void-muted text-[15px] leading-relaxed">
            이 교과서는 손상현 테크코치가 <strong className="text-void-ink">4월 21일 화</strong>, <strong className="text-void-ink">4월 23일 목</strong> 15:00~17:30 SKT 현장에 투입되기 위한
            모든 지식·스크립트·시뮬레이션을 한 곳에 모은 것. 모바일에서 지하철·택시·현장에서 즉시 펼쳐 쓰도록 설계되었다.
          </p>
        </motion.div>

        {/* Today card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-10 grid md:grid-cols-3 gap-3"
        >
          <Card className="md:col-span-2 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full bg-neon-cyan/10 blur-3xl animate-pulse-ring" />
            <div className="relative">
              <div className="text-[11px] uppercase tracking-[0.25em] text-neon-cyan mb-2">Today</div>
              <div className="textbook-h2 text-3xl text-void-ink">2026-04-21 · 화요일</div>
              <div className="mt-4 flex flex-wrap gap-2 text-[13px] text-void-muted">
                <span className="chip"><Clock className="w-3 h-3" /> 15:00~17:30</span>
                <span className="chip"><MapPin className="w-3 h-3" /> SKT 교육장</span>
                <span className="chip"><Users className="w-3 h-3" /> 2~3팀 순회</span>
                <span className="chip magenta">미니특강 생략 → 즉시 코칭</span>
              </div>
              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3 text-[12px]">
                <Step n="1" t="14:30 도착" s="장비·계정 점검" />
                <Step n="2" t="14:50 3인 싱크" s="담당팀·순서 합의" />
                <Step n="3" t="15:00 첫 팀" s="1분 압축 스크립트" />
                <Step n="4" t="17:00~17:30" s="To-Be 마무리" />
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                <Link href="/today" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-neon-cyan text-void-bg font-semibold text-sm hover:shadow-neon transition">
                  당일 실행플랜 열기 <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/script" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-neon-gold/40 text-neon-gold text-sm hover:bg-neon-gold/10 transition">
                  1분 압축 스크립트
                </Link>
              </div>
            </div>
          </Card>

          <Card>
            <div className="text-[11px] uppercase tracking-[0.25em] text-neon-magenta mb-2">Golden 3 스크립트</div>
            <ul className="flex flex-col gap-2 text-[13px] text-void-text">
              <li>① <em className="text-void-ink not-italic">"녹음은 학습 자료로만 쓰고 이후 삭제"</em></li>
              <li>② <em className="text-void-ink not-italic">"잘 모르겠습니다, 확인 후 안내드리겠습니다"</em></li>
              <li>③ <em className="text-void-ink not-italic">"가장 먼저 시도해 볼 수 있는 것 하나만 오늘 정해요"</em></li>
            </ul>
            <div className="mt-4 text-[12px] text-void-muted">현장에서 파일 열지 말고 이 3문장만 떠올릴 것.</div>
          </Card>
        </motion.div>
      </section>

      {/* 목차 */}
      <Section n={1} title="목차 — Quick Jump" desc="현장에서 탭을 누르면 즉시 필요한 챕터로 이동. 모바일 최적화.">
        <CardGrid cols={3}>
          {NAV.filter((n) => n.href !== "/").map((n, i) => {
            const Icon = n.icon;
            const c = n.accent === "cyan" ? "text-neon-cyan" : n.accent === "magenta" ? "text-neon-magenta" : n.accent === "gold" ? "text-neon-gold" : n.accent === "lime" ? "text-neon-lime" : "text-red-400";
            return (
              <motion.div key={n.href} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}>
                <Link href={n.href}>
                  <Card className="h-full hover:scale-[1.01] transition-transform">
                    <div className="flex items-start gap-3">
                      <Icon className={`w-5 h-5 ${c} mt-1`} />
                      <div>
                        <div className="text-void-ink textbook-h2 text-lg">{n.kr}</div>
                        <div className="text-[11px] uppercase tracking-[0.2em] text-void-muted mb-2">{n.label}</div>
                        <p className="text-[13px] text-void-text/90 leading-relaxed">{n.summary}</p>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </CardGrid>
      </Section>

      {/* 6 원칙 */}
      <Section n={2} title="6대 원칙" desc="이 원칙들에서 벗어나는 순간 코칭은 일반 AI 도구 소개로 전락한다.">
        <CardGrid cols={3}>
          {PRINCIPLES.map((p, i) => {
            const c = p.accent === "cyan" ? "text-neon-cyan" : p.accent === "magenta" ? "text-neon-magenta" : p.accent === "gold" ? "text-neon-gold" : p.accent === "lime" ? "text-neon-lime" : "text-red-400";
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <Card className="h-full">
                  <div className={`text-[10px] uppercase tracking-[0.25em] mb-2 ${c}`}>원칙 {i + 1}</div>
                  <div className="textbook-h2 text-void-ink text-lg mb-2">{p.t}</div>
                  <p className="text-[13px] text-void-text/90 leading-relaxed">{p.d}</p>
                </Card>
              </motion.div>
            );
          })}
        </CardGrid>
      </Section>

      {/* 하단 CTA */}
      <Section n={3} title="다음 단계" desc="지금 하시면 좋은 순서.">
        <CardGrid cols={3}>
          <Link href="/script"><Card className="h-full"><div className="text-[11px] uppercase text-neon-gold tracking-[0.25em] mb-1">1st</div><div className="textbook-h2 text-void-ink text-lg mb-2">1분 스크립트 암기</div><p className="text-[13px] text-void-text/90">입에 붙을 때까지 소리내어 3회.</p></Card></Link>
          <Link href="/recipes"><Card className="h-full"><div className="text-[11px] uppercase text-neon-magenta tracking-[0.25em] mb-1">2nd</div><div className="textbook-h2 text-void-ink text-lg mb-2">R1·R6·R9 시연 연습</div><p className="text-[13px] text-void-text/90">실제 계정으로 1회씩 돌려 성공 스크린샷.</p></Card></Link>
          <Link href="/simulation"><Card className="h-full"><div className="text-[11px] uppercase text-neon-cyan tracking-[0.25em] mb-1">3rd</div><div className="textbook-h2 text-void-ink text-lg mb-2">Scene 2·4 재독</div><p className="text-[13px] text-void-text/90">어려운 상황 2개 머릿속으로 재생.</p></Card></Link>
        </CardGrid>
      </Section>
    </div>
  );
}

function Step({ n, t, s }: { n: string; t: string; s: string }) {
  return (
    <div className="void-card p-3">
      <div className="text-[10px] text-neon-cyan font-mono mb-1">STEP {n}</div>
      <div className="text-void-ink text-[13px]">{t}</div>
      <div className="text-[11px] text-void-muted">{s}</div>
    </div>
  );
}
