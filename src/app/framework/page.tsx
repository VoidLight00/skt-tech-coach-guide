"use client";

import { PageFrame, Section, Card, CardGrid, Callout, NextPrev } from "@/components/ui";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function FrameworkPage() {
  return (
    <PageFrame kicker="Cheatsheet" title="프레임워크 치트시트" accent="lime"
      subtitle="미니 강의가 생략되었으므로 코치가 이 프레임워크를 입에 담고 다녀야 한다. 암기가 아니라 &lsquo;리듬&rsquo;으로.">
      <Section n={1} title="Part 1 · 업무 구조화 — 4단계">
        <Card>
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 py-6">
            {["입력", "처리", "판단", "출력"].map((w, i) => (
              <motion.div key={w} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.12 }} className="flex items-center gap-2 md:gap-3">
                <div className={`px-5 md:px-7 py-3 md:py-4 rounded-xl border ${["cyan","cyan","magenta","gold"][i] === "cyan" ? "border-neon-cyan/40 text-neon-cyan" : ["cyan","cyan","magenta","gold"][i] === "magenta" ? "border-neon-magenta/40 text-neon-magenta" : "border-neon-gold/40 text-neon-gold"} font-serif text-xl md:text-2xl`}>
                  {w}
                </div>
                {i < 3 && <ArrowRight className="w-4 h-4 text-void-muted" />}
              </motion.div>
            ))}
          </div>
          <div className="text-center text-void-muted text-[13px]">
            AI는 <strong className="text-neon-magenta">처리</strong>에 특화 · 사람은 <strong className="text-neon-gold">판단/승인</strong> 담당
          </div>
        </Card>
      </Section>

      <Section n={2} title="Part 2 · 데이터 점검 5가지">
        <CardGrid cols={5}>
          {[
            ["접근성", "데이터에 접근할 수 있는가?"],
            ["형식", "AI가 읽을 수 있는 형식인가?"],
            ["정리 상태", "구조화되어 있는가?"],
            ["최신성", "최신이고 정확한가?"],
            ["민감도", "외부 AI에 넣어도 되는가?"],
          ].map(([t, q], i) => (
            <motion.div key={t} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <Card className="h-full">
                <div className="text-[10px] font-mono text-neon-cyan mb-1">0{i + 1}</div>
                <div className="textbook-h2 text-void-ink text-base">{t}</div>
                <p className="text-[12px] text-void-muted mt-2 leading-relaxed">{q}</p>
              </Card>
            </motion.div>
          ))}
        </CardGrid>
        <Callout tone="info">
          데이터가 &lsquo;AI-readable&rsquo;하지 않으면 → 마크다운 변환/OCR(사이오닉 AI 등) 선행.
        </Callout>
      </Section>

      <Section n={3} title="Part 3 · 구현 난이도 3단계">
        <CardGrid cols={3}>
          {[
            { s: "★☆☆", t: "바로 시도", e: "LLM에 직접 질문/요청", n: "오늘부터 바로", c: "lime" },
            { s: "★★☆", t: "도구 학습 필요", e: "RAG 세팅, 데이터 분석 도구", n: "일주일만 투자", c: "gold" },
            { s: "★★★", t: "개발 필요", e: "에이전트 워크플로우, API 연동", n: "팀 협업/외부 지원", c: "magenta" },
          ].map((s, i) => {
            const col = s.c === "lime" ? "text-neon-lime border-neon-lime/40" : s.c === "gold" ? "text-neon-gold border-neon-gold/40" : "text-neon-magenta border-neon-magenta/40";
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Card className={`h-full border-l-4 ${col.split(" ")[1]}`}>
                  <div className={`text-2xl ${col.split(" ")[0]}`}>{s.s}</div>
                  <div className="textbook-h2 text-void-ink text-lg mt-2">{s.t}</div>
                  <div className="text-[12px] text-void-muted mt-1">{s.e}</div>
                  <div className="text-[12px] text-void-text mt-3 italic">&ldquo;{s.n}&rdquo;</div>
                </Card>
              </motion.div>
            );
          })}
        </CardGrid>
      </Section>

      <Section n={4} title="Part 4 · AI가 잘하는 9가지 역할" desc="실무자가 &lsquo;구현을 모르겠다&rsquo;고 하면 이 카드 매칭부터.">
        <CardGrid cols={3}>
          {["검색", "분류", "요약", "초안 생성", "비교검토", "이상감지", "계획", "작업연결", "도구실행"].map((r, i) => (
            <motion.div key={r} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}>
              <Card className="text-center py-6">
                <div className="font-mono text-[10px] text-neon-cyan mb-1">0{i + 1}</div>
                <div className="textbook-h2 text-void-ink text-lg">{r}</div>
              </Card>
            </motion.div>
          ))}
        </CardGrid>
      </Section>

      <Section n={5} title="Part 5 · 5가지 구현 방식">
        <div className="space-y-2">
          {[
            ["LLM 직접 활용", "ChatGPT·Claude·Gemini에 프롬프트로 요청", "★☆☆"],
            ["RAG", "사내 문서 기반 검색 + AI 답변 (NotebookLM 등)", "★★☆"],
            ["데이터 분석/시각화", "엑셀/CSV 데이터를 AI로 분석", "★★☆"],
            ["규칙 기반 자동화", "n8n·Make·Zapier 등 워크플로우", "★★☆"],
            ["에이전트 워크플로우", "AI가 여러 도구 조합 자율 실행 (Claude Code 등)", "★★★"],
          ].map(([n, d, s], i) => (
            <motion.div key={n} initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }} className="void-card p-4 flex items-center justify-between gap-4">
              <div>
                <div className="textbook-h2 text-void-ink text-base">{n}</div>
                <div className="text-[12px] text-void-muted">{d}</div>
              </div>
              <div className="font-serif text-neon-gold text-lg shrink-0">{s}</div>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section n={6} title="Part 6 · Pain Point 8유형 (도요타 식)">
        <div className="flex flex-wrap gap-2">
          {["Waiting", "Defects", "Overprocessing", "Motion", "Inventory", "Overproduction", "Unused Talent", "기타"].map((p, i) => (
            <motion.span key={p} initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} className="chip">
              <span className="font-mono text-neon-cyan">0{i + 1}</span>
              {p}
            </motion.span>
          ))}
        </div>
        <Callout tone="warn">
          실무자가 Pain을 &ldquo;시간 오래 걸림&rdquo; 한 줄로 적었다면 부족. 위 8유형 중 어느 것인지 매칭하도록 질문.
        </Callout>
      </Section>

      <NextPrev prev={{ href: "/loop", label: "코칭 루프" }} next={{ href: "/recipes", label: "상황별 툴 레시피" }} />
    </PageFrame>
  );
}
