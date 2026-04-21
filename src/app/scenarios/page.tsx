"use client";

import { PageFrame, Section, Card, Callout, Quote, NextPrev } from "@/components/ui";
import { motion } from "framer-motion";

export default function ScenariosPage() {
  return (
    <PageFrame kicker="Scenarios" title="실전 코칭 시나리오 A·B·C" accent="gold"
      subtitle="현장에서 팀이 막혔을 때 꺼낼 수 있는 3가지 정석. 각 시나리오의 흐름과 핵심 코칭 포인트.">
      <ScenarioBlock
        letter="A" title="재무 데이터 분석" team="기획팀" stress="재무 데이터는 민감도 &lsquo;상&rsquo;"
        description="분기별 재무 데이터에서 &lsquo;튀는 숫자&rsquo;를 찾아 공시 자료 작성"
      >
        <Flow steps={[
          "업무를 7단계로 분해: 데이터 수집 → 기준치 설정 → 이상치 탐지 → 질문지 생성 → IR 자료 작성 → 검증 → 회계팀 대조",
          "단계별 AI 가능성 판단 — 3~5번(이상치·질문지·IR): AI 거의 100% 가능 / 6번 검증: 인간 10%",
          "핵심 코칭 포인트 — 암묵지 명시화",
          "보안 고려 — 민감도 상 → 외부 AI 직접 투입 ❌ → AI로 방법론·코드만 → Python을 사내망에서 실행",
        ]} />
        <Quote by="코치 멘트">
          기존에 어떤 데이터가 왜 &lsquo;튄다&rsquo;고 판단했는지에 대한 근거가 문서화되어 있어야 AI에게 가르칠 수 있습니다.
        </Quote>
      </ScenarioBlock>

      <ScenarioBlock
        letter="B" title="투자자 미팅 키워드 분석" team="IR/컴팀" stress="질문 데이터는 대외 공개 가능 → 외부 AI OK"
        description="투자자 미팅 기록에서 키워드를 추출해 OX표 작성, 투자자 관심사 트래킹"
      >
        <Flow steps={[
          "보안 확인 — 대외 공개 가능 확인",
          "미팅 녹화 영상 → Gemini 분석 → 키워드 자동 추출",
          "엑셀 OX표 자동 채우기 + 판단 근거 코멘트 삽입",
          "시연 결과 — 수작업 하던 작업을 수 분 만에 처리",
        ]} />
        <Quote by="코치 멘트">
          퀄리티를 떠나서 이런 식으로 작업이 될 수 있다는 흐름을 보여주는 것이 중요합니다.
        </Quote>
      </ScenarioBlock>

      <ScenarioBlock
        letter="C" title='"ChatGPT가 엑셀 분석 못해요"' team="공통 질문" stress="데이터 정제 개념 교육"
        description="엑셀 업로드하면 ChatGPT가 제대로 분석 못하는 경우가 많다는 질문"
      >
        <Flow steps={[
          '"업로드해서 분석해줘"가 아니라 2단계 접근 필요',
          "1단계: 데이터 맥락 설명 + 정제/변환 먼저 요청",
          "2단계: 정제된 데이터로 본 분석",
          "마크다운 변환 · OCR (PDF·이미지·HWP → 사이오닉 AI 등)",
        ]} />
        <Quote by="코치 멘트">
          &lsquo;분석해줘&rsquo;가 아니라, &lsquo;이런 데이터가 있고 이런 분석을 하고 싶은데, 그에 맞는 형태로 정제해줘&rsquo;가 먼저입니다.
        </Quote>
      </ScenarioBlock>

      <Section n={4} title="시연 도구 선택 매트릭스">
        <Card>
          <table className="w-full text-sm">
            <thead><tr className="text-left text-void-muted text-[11px] uppercase tracking-[0.15em]"><th className="pb-2">과제 유형</th><th className="pb-2">1순위</th><th className="pb-2">대안</th></tr></thead>
            <tbody className="divide-y divide-void-line">
              {[
                ["영상·이미지 분석", "Google AI Studio (Gemini)", "ChatGPT Vision"],
                ["사내 문서 Q&A", "NotebookLM", "Claude + 직접 업로드"],
                ["엑셀/CSV 분석", "ChatGPT Data Analyst", "Claude + Python"],
                ["복잡한 워크플로우 자동화", "Claude Code (에이전트)", "n8n"],
                ["PDF/HWP/이미지 → 구조화", "사이오닉 AI", "Claude Vision"],
              ].map(([t, p, a]) => (
                <tr key={t}><td className="py-2.5 text-void-ink text-[13px]">{t}</td><td className="py-2.5 text-neon-cyan text-[13px]">{p}</td><td className="py-2.5 text-void-text text-[13px]">{a}</td></tr>
              ))}
            </tbody>
          </table>
        </Card>
      </Section>

      <Section n={5} title="시연 시 보안 프로토콜">
        <Callout tone="danger" title="반드시 지킬 것">
          <ul className="list-disc pl-5 space-y-1">
            <li>시연 데이터는 <strong>공개 가능한 것만</strong> 사용</li>
            <li>실무자 실제 데이터 사용 시 → NDA 후에도 <strong>시연 종료 즉시 삭제</strong></li>
            <li>민감 데이터는 <strong>더미 버전</strong>을 함께 만들어 시연</li>
          </ul>
        </Callout>
      </Section>

      <NextPrev prev={{ href: "/recipes", label: "레시피" }} next={{ href: "/do-dont", label: "DO / DON'T" }} />
    </PageFrame>
  );
}

function ScenarioBlock({ letter, title, team, stress, description, children }: {
  letter: string; title: string; team: string; stress: string; description: string; children: React.ReactNode;
}) {
  return (
    <section className="mb-14 scroll-mt-20 animate-fade-up">
      <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <div className="flex items-start gap-5 mb-5">
          <div className="shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-2xl border-2 border-neon-gold/50 flex items-center justify-center text-3xl md:text-4xl textbook-h1 text-neon-gold shadow-neon">
            {letter}
          </div>
          <div>
            <div className="chip gold mb-2">{team}</div>
            <h2 className="textbook-h2 text-2xl md:text-3xl text-void-ink">{title}</h2>
            <p className="text-void-muted text-[14px] mt-1">{description}</p>
            <div className="mt-2 text-[12px] text-neon-magenta">{stress}</div>
          </div>
        </div>
        {children}
      </motion.div>
    </section>
  );
}

function Flow({ steps }: { steps: string[] }) {
  return (
    <ol className="space-y-3 my-5">
      {steps.map((s, i) => (
        <motion.li key={i} initial={{ opacity: 0, x: -6 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="void-card p-4 flex items-start gap-3">
          <span className="font-mono text-neon-cyan text-sm shrink-0 mt-0.5">{String(i + 1).padStart(2, "0")}</span>
          <span className="text-void-text text-[14px] leading-relaxed" dangerouslySetInnerHTML={{ __html: s }} />
        </motion.li>
      ))}
    </ol>
  );
}
