"use client";

import { PageFrame, Section, Card, CardGrid, Callout, Pair, Quote, NextPrev } from "@/components/ui";
import { motion } from "framer-motion";

export default function DoDontPage() {
  return (
    <PageFrame
      eyebrow="07 · 원칙과 금지"
      title="무엇을 말하고, 무엇을 말하지 않는가."
      lede="무겁지 않지만 지켜야 하는 것들. 이 장의 문장은 현장에서 파일을 열지 않아도 기억나야 한다."
    >
      <Section n={1} title="말하지 않기">
        <CardGrid cols={1}>
          <Card hover={false}>
            <div className="serif-kr text-[20px] font-bold text-ink-900 dark:text-ink-50 mb-2">사내 도구를 먼저 언급하지 않는다</div>
            <p className="text-[14px] text-ink-600 dark:text-ink-300 mb-4 leading-relaxed">담당자의 안내 사항이다. 사내 도구는 담당자 외에는 아는 이가 드물다. 추측으로 말하는 순간 잘못된 정보가 공기처럼 퍼진다.</p>
            <Pair
              left={<div className="space-y-1"><div>유사한 사내 도구가 있나요?</div><div>사내망에서도 n8n이 열리는 경우가 있어서요.</div></div>}
              right={<div>잘 모르겠습니다. 확인 후 안내드리겠습니다. 메모하고 담당자에게 전달합니다.</div>}
            />
          </Card>

          <Card hover={false}>
            <div className="serif-kr text-[20px] font-bold text-ink-900 dark:text-ink-50 mb-2">도구가 주인공이 되지 않는다</div>
            <p className="text-[14px] text-ink-600 dark:text-ink-300 mb-4 leading-relaxed">일반 AI 교육과 이 자리의 차이. 도구의 이름은 대화의 각주로 붙여야 한다.</p>
            <Pair
              left={<div className="space-y-1"><div>ChatGPT를 이용해 보세요.</div><div>n8n을 쓰시면 됩니다.</div><div>Claude Code가 제일 좋아요.</div></div>}
              right={<div className="space-y-1"><div>이 단계에서는 AI가 초안을 잘 만들어줍니다. 실무자님은 검토에 집중하실 수 있어요.</div><div>반복되는 순서를 한 번 정의해 두면, 이후엔 자동으로 이어지는 흐름을 만들 수 있습니다.</div></div>}
            />
            <Callout>도구 언급 자체가 금지는 아니다. 다만 대화의 중심이 되지 않는 것이 원칙이다.</Callout>
          </Card>

          <Card hover={false}>
            <div className="serif-kr text-[20px] font-bold text-ink-900 dark:text-ink-50 mb-2">보안 확인 없이 시연으로 넘어가지 않는다</div>
            <p className="text-[14px] text-ink-700 dark:text-ink-200 leading-relaxed">모든 팀의 첫 번째 질문은 같다. 이 업무의 데이터, 외부 AI에 넣어도 되는가. 민감도가 상이면 실데이터 대신 더미 구조나 방법론만으로 대화한다.</p>
          </Card>
        </CardGrid>
      </Section>

      <Section n={2} title="지킬 다섯 가지">
        <CardGrid cols={1}>
          {[
            ["보안 확인은 언제나 첫 번째다", "매 팀의 첫 질문으로 예외 없이 둔다."],
            ["사내 도구 질문은 담당자에게 넘긴다", "추측으로 메우지 않는다."],
            ["시연 데이터는 끝나는 즉시 지운다", "NDA 이후에도 예외를 두지 않는다."],
            ["완성보다 가능성의 흐름을 보여준다", "‘이렇게도 된다’의 한 장면이 오래 남는다."],
            ["암묵지를 말로 끌어내 문서로 남긴다", "감으로 하던 판단이 AI에게 줄 수 있는 가장 귀한 재료다."],
          ].map(([t, d], i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -6 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <Card className="flex items-start gap-4">
                <div className="font-mono text-[13px] text-brand shrink-0 mt-1">{String(i + 1).padStart(2, "0")}</div>
                <div>
                  <div className="serif-kr text-[17px] font-bold text-ink-900 dark:text-ink-50 mb-1">{t}</div>
                  <p className="text-[13.5px] text-ink-600 dark:text-ink-300 leading-relaxed">{d}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </CardGrid>
      </Section>

      <Section n={3} title="민감도에 따라 길이 갈린다">
        <Card hover={false}>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="card p-5 border-brand-100 bg-brand-50 dark:bg-[rgba(255,107,53,0.06)] dark:border-[rgba(255,107,53,0.25)]">
              <div className="text-[11px] uppercase tracking-[0.18em] text-brand font-semibold mb-2">공개해도 되는 데이터</div>
              <div className="serif-kr text-[18px] font-bold text-ink-900 dark:text-ink-50 mb-2">상용 LLM에 바로 올린다</div>
              <p className="text-[13.5px] text-ink-700 dark:text-ink-200 leading-relaxed">분석, 요약, 비교를 직접 맡긴다. 시연의 속도가 가장 빠르다.</p>
            </div>
            <div className="card p-5">
              <div className="text-[11px] uppercase tracking-[0.18em] text-ink-500 mb-2 font-semibold">민감한 데이터</div>
              <div className="serif-kr text-[18px] font-bold text-ink-900 dark:text-ink-50 mb-2">방법론과 코드만 받아 사내에서 돌린다</div>
              <ol className="space-y-1 text-[13.5px] text-ink-700 dark:text-ink-200 list-decimal pl-5">
                <li>더미 구조(컬럼과 샘플 세 줄)만 AI에 공유한다.</li>
                <li>AI가 파이썬이나 엑셀 함수를 만들어 준다.</li>
                <li>사내망에서 실행한다.</li>
                <li>사내 도구 관련 질문은 담당자에게 넘긴다.</li>
              </ol>
            </div>
          </div>
        </Card>
      </Section>

      <Section n={4} title="자주 쓰는 다섯 문장">
        <div className="space-y-1">
          {[
            ["사내 도구 관련 질문을 받을 때", "잘 모르겠습니다. 확인 후 안내드리겠습니다."],
            ["첫 민감도 확인", "이 업무의 데이터, 외부 AI에 넣어도 되는 데이터인가요."],
            ["암묵지를 끌어낼 때", "지금 감으로 판단하시는 그 지점을 문서로 남기면, 그 문서가 AI에게 가장 좋은 재료가 됩니다."],
            ["기획 단계를 강조할 때", "80에서 90퍼센트를 기획에 쓰는 것 같지만, 중장기적으로 시간을 크게 아껴 줍니다."],
            ["To-Be 설계를 도울 때", "가장 먼저 시도해 볼 수 있는 가장 작은 한 가지를 적어 볼까요."],
          ].map(([c, t], i) => (
            <Quote key={i} by={c}>{t}</Quote>
          ))}
        </div>
      </Section>

      <Section n={5} title="자주 발생하는 네 가지 상황">
        <Card hover={false}>
          <table className="w-full table-brand">
            <thead><tr><th className="text-left w-[42%]">상황</th><th className="text-left">대응</th></tr></thead>
            <tbody>
              {[
                ["사내 보안이 걸려 파일이 열리지 않는다", "보안이 해제된 샘플 파일을 미리 준비하거나, 실무자에게 해제를 요청한다."],
                ["실무자가 프롬프트 쓰기 자체를 어려워한다", "화면을 보며 말로 설명을 녹화하고, 그 영상을 AI에 넣어 프롬프트를 대신 뽑게 한다."],
                ["‘AI가 할 수 있는 게 없다’고 느끼는 팀", "요약과 분류 같은 가장 작은 일부터 성공을 만들고, 성공을 딛고 확장한다."],
                ["지나치게 야심찬 To-Be", "‘가장 먼저 시도’ 칸에 가장 작은 단위로 다시 한 번 적는다."],
              ].map(([i, d]) => (
                <tr key={i}><td className="text-ink-800 dark:text-ink-100">{i}</td><td className="text-ink-700 dark:text-ink-200">{d}</td></tr>
              ))}
            </tbody>
          </table>
        </Card>
      </Section>

      <NextPrev prev={{ href: "/scenarios", label: "실전 시나리오" }} next={{ href: "/simulation", label: "현장 시뮬레이션" }} />
    </PageFrame>
  );
}
