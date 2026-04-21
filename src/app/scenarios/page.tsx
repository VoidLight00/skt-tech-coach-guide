"use client";

import { PageFrame, Section, Card, Callout, Quote, NextPrev } from "@/components/ui";
import { motion } from "framer-motion";

export default function ScenariosPage() {
  return (
    <PageFrame
      eyebrow="06 · 실전 시나리오"
      title="팀이 막혔을 때 꺼낼 수 있는 세 가지 정석."
      lede="세 장면은 실제로 자주 반복되는 상황이다. 업무의 결이 달라도 코칭의 뼈대는 비슷하게 움직인다."
    >
      <ScenarioBlock letter="A" title="재무 데이터의 ‘튀는 숫자’를 찾는다" team="기획팀" stress="데이터 민감도는 상에 가깝다"
        description="분기별 재무 데이터에서 이상치를 찾아 공시 자료의 초안을 만든다."
      >
        <Flow steps={[
          "업무를 일곱 단계로 쪼갠다. 데이터 수집, 기준치 설정, 이상치 탐지, 질문지 생성, IR 자료 작성, 검증, 회계팀 대조.",
          "단계별로 AI가 얼마만큼 기여할 수 있는지를 판단한다. 3번에서 5번은 거의 온전히 AI가 맡을 수 있다. 6번의 검증만 사람 손이 10퍼센트 정도 필요하다.",
          "암묵지를 말로 옮긴다. 어떤 숫자가 왜 ‘튄다’고 판단했는지 근거를 문서로 남겨야, 그 기준을 AI에 가르칠 수 있다.",
          "외부 AI에 원본을 직접 올리지는 않는다. 방법론과 파이썬 스크립트만 AI로 받아, 사내망에서 실행한다.",
        ]} />
        <Quote by="코치의 말">
          기존에 어떤 데이터가 왜 튄다고 판단했는지 근거가 먼저 문서화되어야 합니다. 그 문서가 AI에 줄 수 있는 가장 귀한 재료입니다.
        </Quote>
      </ScenarioBlock>

      <ScenarioBlock letter="B" title="투자자 미팅의 키워드를 추적한다" team="IR 담당" stress="질문 데이터는 대외 공개가 가능하다"
        description="투자자 미팅 기록에서 키워드를 뽑아 OX표로 관심사를 쌓아 나간다."
      >
        <Flow steps={[
          "이 데이터는 외부 AI에 올려도 되는지를 먼저 확인한다. 이 팀의 경우 공개 가능.",
          "미팅 녹화를 Gemini에 올려 키워드를 자동으로 뽑게 한다.",
          "엑셀 OX표를 AI가 채우고, 판단의 근거를 코멘트로 남기게 한다.",
          "수작업으로 한 시간 걸리던 작업이 몇 분 안에 초안으로 돌아온다.",
        ]} />
        <Quote by="코치의 말">
          완성도보다, 이런 흐름으로 작업이 되어 돌아온다는 장면을 보여 드리는 일이 먼저입니다.
        </Quote>
      </ScenarioBlock>

      <ScenarioBlock letter="C" title='"ChatGPT가 엑셀을 분석하지 못한다"' team="공통 질문" stress="도구 문제가 아니라 입력 설계의 문제다"
        description="엑셀을 업로드하면 ChatGPT가 제대로 분석하지 못한다는 호소가 자주 들어온다."
      >
        <Flow steps={[
          "‘분석해 달라’가 아니라 두 단계로 접근한다.",
          "1단계에서는 데이터의 맥락을 설명하고, 정제와 변환을 먼저 요청한다.",
          "2단계에서 정제된 데이터로 본 분석을 수행한다.",
          "마크다운 변환이 핵심이고, PDF·이미지·HWP는 R5로 먼저 가 형식을 바꾼다.",
        ]} />
        <Quote by="코치의 말">
          정제하기 전에 분석을 맡기지 않습니다. ‘이런 데이터를 이렇게 분석하고 싶은데, 먼저 형태를 맞춰 줄 수 있을까요’가 먼저입니다.
        </Quote>
      </ScenarioBlock>

      <Section n={4} title="도구의 짝">
        <Card hover={false}>
          <table className="w-full table-brand">
            <thead><tr><th className="text-left">과제의 성격</th><th className="text-left">1순위</th><th className="text-left">대안</th></tr></thead>
            <tbody>
              {[
                ["영상·이미지 분석", "Google AI Studio (Gemini)", "ChatGPT Vision"],
                ["사내 문서 Q&A", "NotebookLM", "Claude 업로드"],
                ["엑셀·CSV 분석", "ChatGPT Data Analyst", "Claude + 파이썬"],
                ["여러 도구가 엮인 워크플로우", "Claude Code", "n8n"],
                ["PDF·HWP·이미지의 구조화", "사이오닉 AI", "Claude Vision"],
              ].map(([t, p, a]) => (
                <tr key={t}><td className="text-ink-800 dark:text-ink-100">{t}</td><td className="text-brand font-semibold">{p}</td><td className="text-ink-700 dark:text-ink-200">{a}</td></tr>
              ))}
            </tbody>
          </table>
        </Card>
      </Section>

      <Section n={5} title="시연의 원칙">
        <Callout title="세 가지만 지킨다">
          시연에 쓸 데이터는 공개 가능한 것으로만. 실데이터를 어쩔 수 없이 쓴다면 NDA 이후에도 시연이 끝나는 즉시 지운다. 민감한 데이터는 더미 버전을 따로 만들어 보여 준다.
        </Callout>
      </Section>

      <NextPrev prev={{ href: "/recipes", label: "툴 레시피" }} next={{ href: "/do-dont", label: "원칙과 금지" }} />
    </PageFrame>
  );
}

function ScenarioBlock({ letter, title, team, stress, description, children }: {
  letter: string; title: string; team: string; stress: string; description: string; children: React.ReactNode;
}) {
  return (
    <section className="mb-14 scroll-mt-24 animate-fade-up">
      <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <div className="flex items-start gap-5 mb-5">
          <div className="shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 text-white flex items-center justify-center text-2xl md:text-3xl serif-kr font-bold shadow-brand">
            {letter}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[11px] uppercase tracking-[0.18em] text-brand font-semibold mb-1.5">{team}</div>
            <h2 className="serif-kr text-[26px] md:text-[30px] font-bold tracking-tight text-ink-900 dark:text-ink-50">{title}</h2>
            <p className="text-ink-600 dark:text-ink-300 text-[14.5px] mt-1.5 leading-relaxed">{description}</p>
            <div className="mt-2 text-[12.5px] text-ink-500 dark:text-ink-400 italic">{stress}</div>
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
        <motion.li key={i} initial={{ opacity: 0, x: -6 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="card p-4 flex items-start gap-4">
          <span className="font-mono text-[12px] text-brand shrink-0 mt-0.5 w-6">{String(i + 1).padStart(2, "0")}</span>
          <span className="text-ink-800 dark:text-ink-100 text-[14.5px] leading-relaxed">{s}</span>
        </motion.li>
      ))}
    </ol>
  );
}
