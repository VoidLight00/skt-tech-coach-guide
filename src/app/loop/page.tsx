"use client";

import { PageFrame, Section, Card, CardGrid, Checklist, Callout, NextPrev } from "@/components/ui";
import { motion } from "framer-motion";

const steps = [
  { i: 1, t: "경청", time: "3–5분", d: "실무자가 자기 업무와 워크시트를 풀어낸다. 끊지 않고 받아적는다. 표정을 본다." },
  { i: 2, t: "구조화", time: "5–10분", d: "단계가 뭉쳐 있으면 더 쪼갠다. Pain Point가 '시간이 오래 걸림'에서 끝났다면 그 뒤를 묻는다." },
  { i: 3, t: "설계", time: "10–15분", d: "AI가 낄 수 있는 자리를 함께 찾는다. 오늘은 ‘바로 시도’ 층에 머문다. 필요하면 30초만 시연한다." },
  { i: 4, t: "정리", time: "2–3분", d: "세 줄짜리 피드백을 남기고, ‘가장 먼저 시도해 볼 수 있는 것’ 한 가지를 실무자 손으로 적게 한다." },
];

const patterns: [string, string][] = [
  ["단계가 셋 이하로 뭉쳐 있다", "이 단계를 더 세분화해 볼까요. 실제로 어떤 순서로 하시나요."],
  ["AI가 다 해주는 것으로 적혀 있다", "사람이 반드시 확인해야 할 지점은 어디일까요. 판단 기준은 무엇인가요."],
  ["Pain Point가 ‘시간이 오래 걸림’에서 멈춘다", "구체적으로 어디서 시간이 걸리나요. 수동 취합인지, 대기인지, 반복인지."],
  ["민감도가 전부 ‘하’로 표시돼 있다", "개인정보나 매출 수치가 섞여 있지는 않나요."],
  ["구현 방식을 모르겠다고 한다", "AI가 잘하는 아홉 역할 카드를 함께 보며, 어디에 가까운지 같이 고르자고 제안한다."],
  ["To-Be가 지나치게 야심 차다", "‘가장 먼저 시도’ 칸에 가장 작은 단위로 다시 한 번 적어 주시겠어요."],
  ["‘AI가 할 수 있는 게 없는 것 같다’고 말한다", "가장 쉬운 일을 먼저 골라 성공을 만든다. 요약, 분류, 중복 제거부터 시작한다."],
  ["프롬프트 쓰는 것 자체를 어려워한다", "화면을 보며 말로 설명하게 하고, 그 녹화를 AI에 넣어 프롬프트를 받아낸다."],
];

export default function LoopPage() {
  return (
    <PageFrame
      eyebrow="03 · 코칭 루프"
      title="경청·구조화·설계·정리, 그 네 박자."
      lede="25분이라는 시간은 짧지 않다. 다만 한 박자만 흔들려도 전부 어긋난다. 이 장은 네 박자의 질감과 각 박자에서 놓치기 쉬운 것을 적어둔 것이다."
    >
      <Section n={1} title="네 박자">
        <div className="grid md:grid-cols-2 gap-4">
          {steps.map((s, i) => (
            <motion.div key={s.i} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <Card className="h-full">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="font-mono text-[12px] text-brand">0{s.i}</span>
                  <span className="serif-kr text-[22px] font-bold text-ink-900 dark:text-ink-50">{s.t}</span>
                  <span className="text-[12px] text-ink-500 dark:text-ink-400">{s.time}</span>
                </div>
                <p className="text-[14.5px] text-ink-700 dark:text-ink-200 leading-relaxed">{s.d}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section n={2} title="팀 앞에 앉으며 확인할 일곱 가지">
        <Callout>민감도 확인은 대화의 첫 번째 항목이다. 이 질문을 빠뜨리면 뒤의 여섯 가지는 모두 불확실한 지반 위에서 굴러간다.</Callout>
        <Checklist storageKey="team-check" items={[
          "선정한 대표 업무가 무엇인지 한 문장으로 되돌려준다",
          "단계가 충분히 쪼개져 있는지 본다. 셋 이하면 다시 쪼개자고 한다",
          "이 업무의 데이터, 외부 AI에 넣어도 되는가를 확인한다",
          "AI에게 기대하는 역할이 현실적인가를 점검한다",
          "제안하는 구현 방식이 팀의 맥락에 어울리는가를 살핀다",
          "사람이 판단을 남기는 지점이 명시되어 있는가를 확인한다",
          "감으로 하던 판단이 있다면, 말로 옮겨 문서로 남기게 한다",
        ]} />
      </Section>

      <Section n={3} title="자주 마주치는 여덟 장면과 대응">
        <Card hover={false}>
          <table className="w-full table-brand">
            <thead>
              <tr><th className="text-left w-[44%]">장면</th><th className="text-left">건네는 말</th></tr>
            </thead>
            <tbody>
              {patterns.map(([k, v]) => (
                <tr key={k}>
                  <td className="text-ink-800 dark:text-ink-100 text-[13.5px]">{k}</td>
                  <td className="text-ink-700 dark:text-ink-200 text-[14px]">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </Section>

      <Section n={4} title="시간을 버는 세 가지 습관">
        <CardGrid cols={3}>
          <Card>
            <div className="text-[11px] uppercase tracking-[0.18em] text-brand font-semibold mb-2">병렬</div>
            <p className="text-[14px] text-ink-700 dark:text-ink-200 leading-relaxed">시연 대기는 빈 시간이 아니다. 다른 팀을 30초만 보고 돌아와 결과를 함께 읽는다.</p>
          </Card>
          <Card>
            <div className="text-[11px] uppercase tracking-[0.18em] text-brand font-semibold mb-2">끊기</div>
            <p className="text-[14px] text-ink-700 dark:text-ink-200 leading-relaxed">경청이 5분을 넘어가면 미안해하지 말고 멈춘다. 구조화로 넘기지 않으면 설계는 시작되지도 못한다.</p>
          </Card>
          <Card>
            <div className="text-[11px] uppercase tracking-[0.18em] text-brand font-semibold mb-2">예산</div>
            <p className="text-[14px] text-ink-700 dark:text-ink-200 leading-relaxed">세 팀이라면 팀당 25분이 예산이다. 들어가기 전에 소리 내어 숫자를 말해둔다.</p>
          </Card>
        </CardGrid>
      </Section>

      <NextPrev prev={{ href: "/script", label: "진입 스크립트" }} next={{ href: "/framework", label: "프레임워크" }} />
    </PageFrame>
  );
}
