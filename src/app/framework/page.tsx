"use client";

import { PageFrame, Section, Card, CardGrid, Callout, NextPrev } from "@/components/ui";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function FrameworkPage() {
  return (
    <PageFrame
      eyebrow="04 · 프레임워크"
      title="개념은 짧게 깔고, 말은 늘 같은 자리에 둔다."
      lede="미니 강의가 빠진 자리를 채우기 위해 코치가 입에 들고 다녀야 할 것들이다. 외우는 것이 아니라, 리듬처럼 몸에 붙는 편이 좋다."
    >
      <Section n={1} title="업무는 네 단계로 본다">
        <Card hover={false}>
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 py-6">
            {["입력", "처리", "판단", "출력"].map((w, i) => (
              <motion.div key={w} initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="flex items-center gap-2 md:gap-3">
                <div className="px-5 md:px-7 py-3 md:py-4 rounded-xl border border-ink-200 dark:border-ink-800 bg-paper dark:bg-ink-800/30 serif-kr text-xl md:text-2xl font-bold text-ink-900 dark:text-ink-50">
                  {w}
                </div>
                {i < 3 && <ArrowRight className="w-4 h-4 text-ink-400" />}
              </motion.div>
            ))}
          </div>
          <p className="text-center text-[14px] text-ink-600 dark:text-ink-300">
            AI가 잘하는 곳은 <span className="text-brand font-semibold">처리</span>, 사람이 남아야 하는 곳은 <span className="text-brand font-semibold">판단</span>.
          </p>
        </Card>
      </Section>

      <Section n={2} title="데이터를 들여다보는 다섯 가지 질문">
        <CardGrid cols={5}>
          {[
            ["접근성", "지금 이 데이터에 접근할 수 있는가."],
            ["형식", "AI가 읽을 수 있는 모양인가."],
            ["정리", "구조가 잡혀 있는가."],
            ["최신성", "오래된 것은 아닌가."],
            ["민감도", "외부 AI에 올려도 되는가."],
          ].map(([t, q], i) => (
            <motion.div key={t} initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
              <Card className="h-full">
                <div className="font-mono text-[11px] text-brand mb-1">0{i + 1}</div>
                <div className="serif-kr text-[17px] font-bold text-ink-900 dark:text-ink-50 mb-1.5">{t}</div>
                <p className="text-[12.5px] text-ink-600 dark:text-ink-300 leading-relaxed">{q}</p>
              </Card>
            </motion.div>
          ))}
        </CardGrid>
        <Callout>데이터가 읽히지 않는 형식으로 묶여 있다면, 본 분석 전에 마크다운으로 바꾸는 일이 먼저다. OCR을 포함한 변환 레시피는 <a href="/recipes">R5</a>에 따로 적어두었다.</Callout>
      </Section>

      <Section n={3} title="세 층의 난이도">
        <CardGrid cols={3}>
          {[
            { s: "★☆☆", t: "바로 시도", e: "LLM에 직접 요청한다. 특별한 준비가 없다.", n: "오늘 돌아가 한 시간이면 된다." },
            { s: "★★☆", t: "도구 학습", e: "RAG를 세팅하거나 분석 도구를 익힌다.", n: "주말 반나절 정도의 투자가 필요하다." },
            { s: "★★★", t: "개발 필요", e: "에이전트나 API 연동을 구축한다.", n: "팀의 힘이나 외부 개발자의 손이 필요하다." },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
              <Card className="h-full">
                <div className="font-mono text-brand text-lg mb-1">{s.s}</div>
                <div className="serif-kr text-[19px] font-bold text-ink-900 dark:text-ink-50 mb-1">{s.t}</div>
                <p className="text-[13px] text-ink-600 dark:text-ink-300 leading-relaxed">{s.e}</p>
                <p className="mt-3 text-[13px] text-ink-700 dark:text-ink-200 italic serif-kr">{s.n}</p>
              </Card>
            </motion.div>
          ))}
        </CardGrid>
      </Section>

      <Section n={4} title="AI가 잘하는 아홉 가지 역할">
        <p className="text-[14px] text-ink-600 dark:text-ink-300 leading-relaxed mb-4 max-w-[600px]">구현 방식을 가늠하지 못하는 팀에게는 이 카드 아홉 장을 건네는 편이 빠르다. 자기 업무가 어느 한 장에 닿는지 찾아내는 순간, 대화의 속도가 달라진다.</p>
        <CardGrid cols={3}>
          {["검색", "분류", "요약", "초안 생성", "비교 검토", "이상 감지", "계획", "작업 연결", "도구 실행"].map((r, i) => (
            <motion.div key={r} initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}>
              <Card className="text-center py-5">
                <div className="font-mono text-[11px] text-brand mb-1">0{i + 1}</div>
                <div className="serif-kr text-[17px] font-bold text-ink-900 dark:text-ink-50">{r}</div>
              </Card>
            </motion.div>
          ))}
        </CardGrid>
      </Section>

      <Section n={5} title="구현의 다섯 가지 길">
        <div className="space-y-2">
          {[
            ["LLM 직접 활용", "ChatGPT·Claude·Gemini에 프롬프트로 요청한다.", "★☆☆"],
            ["RAG", "사내 문서 위에 검색을 얹어 답을 인용과 함께 받는다.", "★★☆"],
            ["데이터 분석", "엑셀이나 CSV를 읽혀 피벗과 그래프를 받는다.", "★★☆"],
            ["규칙 기반 자동화", "n8n·Make·Zapier로 트리거와 흐름을 엮는다.", "★★☆"],
            ["에이전트 워크플로우", "여러 도구를 묶어 순서대로 실행시킨다.", "★★★"],
          ].map(([n, d, s], i) => (
            <motion.div key={n} initial={{ opacity: 0, x: -6 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="card p-4 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <div className="serif-kr text-[17px] font-bold text-ink-900 dark:text-ink-50">{n}</div>
                <div className="text-[13px] text-ink-600 dark:text-ink-300">{d}</div>
              </div>
              <div className="font-mono text-brand text-lg shrink-0">{s}</div>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section n={6} title="‘시간이 오래 걸린다’ 말고, 어디에 멈추는가">
        <p className="text-[14px] text-ink-600 dark:text-ink-300 leading-relaxed mb-4 max-w-[600px]">도요타식 여덟 가지 낭비는 팀이 Pain을 더 구체적으로 지목하도록 돕는 도구다.</p>
        <div className="flex flex-wrap gap-2">
          {["대기", "불량", "과도한 처리", "이동", "재고", "과다 생산", "역량 미활용", "그 밖"].map((p, i) => (
            <span key={p} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-ink-200 dark:border-ink-800 bg-paper dark:bg-ink-800/30 text-[12.5px] text-ink-700 dark:text-ink-200">
              <span className="font-mono text-[10.5px] text-brand">0{i + 1}</span>
              {p}
            </span>
          ))}
        </div>
      </Section>

      <NextPrev prev={{ href: "/loop", label: "코칭 루프" }} next={{ href: "/recipes", label: "툴 레시피" }} />
    </PageFrame>
  );
}
