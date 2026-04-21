"use client";

import { PageFrame, Section, Card, CardGrid, Callout, Pair, Quote, NextPrev } from "@/components/ui";
import { motion } from "framer-motion";
import { ShieldAlert, ShieldCheck } from "lucide-react";

export default function DoDontPage() {
  return (
    <PageFrame kicker="Rules" title="DO / DON'T" accent="red"
      subtitle="금지 발화·권장 발화·보안 전략. 파일 열지 않아도 입에 붙을 때까지 반복.">
      <Section n={1} title="❌ 절대 금지 3가지">
        <CardGrid cols={1}>
          <Card className="border-red-400/40">
            <div className="flex items-center gap-2 mb-3"><ShieldAlert className="w-5 h-5 text-red-400" /><div className="textbook-h2 text-void-ink text-lg">1. 사내 tool·사내망 환경을 먼저 언급하지 않기</div></div>
            <div className="text-[13px] text-void-muted mb-3">교육 담당자 <strong className="text-void-ink">다솜님 지침</strong>. 사내 도구는 박준 외에는 잘 아는 사람이 없음.</div>
            <Pair
              leftTitle="❌ 금지"
              rightTitle="✅ 권장"
              left={<div className="space-y-1"><div>&ldquo;유사한 사내 tool이 있나요?&rdquo;</div><div>&ldquo;사내망에서도 n8n이 열리는 경우가 있거든요&rdquo;</div></div>}
              right={<div>&ldquo;<strong>잘 모르겠습니다. 확인 후 안내드리겠습니다.</strong>&rdquo; → 메모 후 박준 코치님께 전달</div>}
            />
          </Card>
          <Card className="border-red-400/40">
            <div className="flex items-center gap-2 mb-3"><ShieldAlert className="w-5 h-5 text-red-400" /><div className="textbook-h2 text-void-ink text-lg">2. 도구 소개가 메인이 되지 않기</div></div>
            <div className="text-[13px] text-void-muted mb-3">일반 AI 교육과의 <strong className="text-void-ink">차별점</strong>. 도구 홍보가 아니라 가능성·업무 설계가 목적.</div>
            <Pair
              leftTitle="❌ 금지"
              rightTitle="✅ 권장"
              left={<div className="space-y-1"><div>&ldquo;ChatGPT를 이용해 보세요&rdquo;</div><div>&ldquo;n8n을 쓰시면 됩니다&rdquo;</div><div>&ldquo;Claude Code가 최고예요&rdquo;</div></div>}
              right={<div className="space-y-1"><div>&ldquo;이 단계에서는 AI가 초안 생성을 잘 해주는데…&rdquo;</div><div>&ldquo;반복되는 워크플로우를 한 번 정의해두면…&rdquo;</div></div>}
            />
            <Callout tone="info">도구 언급 자체가 금지는 아님. <strong>메인이 되지 않으면 OK</strong>. 부연 수준으로.</Callout>
          </Card>
          <Card className="border-red-400/40">
            <div className="flex items-center gap-2 mb-3"><ShieldAlert className="w-5 h-5 text-red-400" /><div className="textbook-h2 text-void-ink text-lg">3. 보안 확인 없이 시연 진행 금지</div></div>
            <div className="text-[13px] text-void-text">매 팀마다 <strong>&ldquo;이 데이터 외부 AI에 넣어도 되나요?&rdquo;</strong> 반드시 확인. 민감도 상이면 → 실데이터 ❌ → 더미 or 방법론만.</div>
          </Card>
        </CardGrid>
      </Section>

      <Section n={2} title="✅ 반드시 지킬 것 5가지">
        <CardGrid cols={1}>
          {[
            ["보안 확인이 최우선", "매 팀마다 반드시"],
            ["사내 tool은 '잘 모른다'고 답하고 박준에게 넘기기", "추측 금지"],
            ["시연 데이터는 즉시 삭제", "NDA 후에도"],
            ["완벽한 결과보다 가능성 보여주기", "'이런 흐름으로 작업될 수 있다'"],
            ["암묵지 명시화 유도", "'감으로 판단하시는 부분을 문서화하면 AI에게 시킬 수 있습니다'"],
          ].map(([t, d], i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
              <Card className="border-neon-lime/40 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-neon-lime mt-1 shrink-0" />
                <div>
                  <div className="textbook-h2 text-void-ink text-base">{t}</div>
                  <div className="text-[13px] text-void-muted">{d}</div>
                </div>
              </Card>
            </motion.div>
          ))}
        </CardGrid>
      </Section>

      <Section n={3} title="🔐 보안 민감 데이터 처리 전략">
        <Card>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="void-card border-neon-lime/40 p-5">
              <div className="text-[11px] uppercase tracking-[0.25em] text-neon-lime mb-2">공개 가능 데이터</div>
              <div className="textbook-h2 text-void-ink text-lg mb-2">상용 LLM 직접 업로드</div>
              <p className="text-[13px] text-void-text">ChatGPT · Claude · Gemini에 바로 투입하여 분석·요약·비교 수행.</p>
            </div>
            <div className="void-card border-red-400/40 p-5">
              <div className="text-[11px] uppercase tracking-[0.25em] text-red-400 mb-2">보안 민감 데이터</div>
              <div className="textbook-h2 text-void-ink text-lg mb-2">AI로 코드·방법론만 → 사내 실행</div>
              <ol className="space-y-1 text-[13px] text-void-text list-decimal pl-5">
                <li>더미/가상 데이터(컬럼·샘플 3줄)만 공유</li>
                <li>AI가 파이썬/엑셀 함수 생성</li>
                <li>사내망에서 실행</li>
                <li>사내 도구 질문 → 박준에게 에스컬레이션</li>
              </ol>
            </div>
          </div>
        </Card>
      </Section>

      <Section n={4} title="🗣️ 자주 쓸 고정 문구 5개">
        <div className="space-y-3">
          {[
            ["사내 tool 질문 받을 때", "잘 모르겠습니다. 확인 후 안내드리겠습니다."],
            ["민감도 확인", "이 데이터 외부 AI에 넣어도 되는 데이터인가요?"],
            ["암묵지 유도", "지금 '감'으로 판단하시는 부분을 문서화하면 AI에게 시킬 수 있습니다."],
            ["기획 강조", "80~90%를 기획에 쓰는 게 돌아가는 것 같지만, 중장기적으로 시간을 세이브합니다."],
            ["To-Be 유도", "가장 먼저 시도해 볼 수 있는 최소 실행부터 적어볼까요?"],
          ].map(([c, t], i) => (
            <Quote key={i} by={c}>{t}</Quote>
          ))}
        </div>
      </Section>

      <Section n={5} title="⚠️ 자주 발생하는 이슈 & 대응">
        <Card>
          <table className="w-full text-sm">
            <thead><tr className="text-left text-void-muted text-[11px] uppercase tracking-[0.15em]"><th className="pb-2 w-[40%]">이슈</th><th className="pb-2">대응</th></tr></thead>
            <tbody className="divide-y divide-void-line">
              {[
                ["사내 보안 걸린 파일 열리지 않음", "미리 보안 해제된 샘플 파일 / 실무자에게 해제 요청"],
                ["실무자가 프롬프트 어려워함", "화면 보며 말로 설명 녹화 → 그 영상을 AI에 넣어 프롬프트 자동 생성"],
                ["&lsquo;AI가 할 수 있는 게 없다&rsquo; 느끼는 팀", "가장 단순한 Task(요약/분류)부터 → 성공 경험 후 확장"],
                ["너무 야심찬 To-Be", "&lsquo;가장 먼저 시도&rsquo; 영역에 최소 실행 아이디어 적기"],
              ].map(([i, d]) => (
                <tr key={i}><td className="py-2.5 text-void-ink text-[13px]" dangerouslySetInnerHTML={{ __html: i }} /><td className="py-2.5 text-void-text text-[13px]" dangerouslySetInnerHTML={{ __html: d }} /></tr>
              ))}
            </tbody>
          </table>
        </Card>
      </Section>

      <NextPrev prev={{ href: "/scenarios", label: "시나리오" }} next={{ href: "/simulation", label: "현장 시뮬레이션" }} />
    </PageFrame>
  );
}
