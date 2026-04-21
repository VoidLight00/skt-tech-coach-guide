"use client";

import { PageFrame, Section, Card, CardGrid, Checklist, Callout, NextPrev } from "@/components/ui";
import { motion } from "framer-motion";
import { Ear, Wrench, Sparkles, Flag } from "lucide-react";

const steps = [
  { i: 1, t: "경청", en: "Listen", time: "3~5m", d: "실무자가 자기 업무/워크시트를 설명. 끊지 말고 받아적으며.", icon: Ear, c: "cyan" },
  { i: 2, t: "구조화 피드백", en: "Structure", time: "5~10m", d: "업무 분해 적절성, 빠진 단계, Pain Point 구체성 점검.", icon: Wrench, c: "magenta" },
  { i: 3, t: "AI 협업 지점 설계", en: "Design", time: "10~15m", d: "난이도 3단계·9역할·5방식으로 매핑. 필요 시 시연.", icon: Sparkles, c: "gold" },
  { i: 4, t: "정리", en: "Wrap", time: "2~3m", d: "핵심 피드백 3줄 + 다음 스텝 방향 + '가장 먼저 시도' 1개.", icon: Flag, c: "lime" },
];

export default function LoopPage() {
  return (
    <PageFrame kicker="Coaching Loop" title="25분 코칭 루프" accent="cyan"
      subtitle="경청 → 구조화 → 설계 → 정리. 이 네 박자가 흔들리면 코칭은 도구 소개로 전락한다.">
      <Section n={1} title="루프 4단계">
        <div className="grid md:grid-cols-4 gap-3 relative">
          {steps.map((s, i) => {
            const Icon = s.icon;
            const col = s.c === "cyan" ? "text-neon-cyan" : s.c === "magenta" ? "text-neon-magenta" : s.c === "gold" ? "text-neon-gold" : "text-neon-lime";
            const bord = s.c === "cyan" ? "border-neon-cyan/40" : s.c === "magenta" ? "border-neon-magenta/40" : s.c === "gold" ? "border-neon-gold/40" : "border-neon-lime/40";
            return (
              <motion.div key={s.i} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className={`void-card p-5 border-l-4 ${bord}`}>
                <div className="flex items-center gap-2 mb-2">
                  <Icon className={`w-5 h-5 ${col}`} />
                  <span className={`font-mono text-sm ${col}`}>{String(s.i).padStart(2, "0")}</span>
                </div>
                <div className="textbook-h2 text-lg text-void-ink">{s.t}</div>
                <div className="text-[11px] text-void-muted uppercase tracking-[0.2em] mb-2">{s.en} · {s.time}</div>
                <p className="text-[13px] text-void-text/90 leading-relaxed">{s.d}</p>
              </motion.div>
            );
          })}
        </div>
      </Section>

      <Section n={2} title="팀 방문 체크리스트">
        <Callout tone="info">매 팀마다 체크해야 할 7가지. 민감도 확인은 반드시 첫 질문.</Callout>
        <Checklist storageKey="team-check" items={[
          "Step 1 확인 — 선정한 대표 업무가 무엇인지 파악",
          "업무 분해 수준 — Task가 3개 이하면 너무 뭉뚱그려짐. 더 쪼개기 유도",
          "데이터 민감도 — 매 팀마다 &lsquo;외부 AI에 넣어도 되나요?&rsquo; 확인",
          "AI 역할의 현실성 — 과대 기대 점검",
          "구현 방식 타당성 — 맥락에 맞는 기술 접근인가",
          "사람 역할 명시 — 판단/승인 지점이 있는가",
          "암묵지 확인 — &lsquo;감&rsquo;으로 하던 판단을 문서화하도록 유도",
        ]} />
      </Section>

      <Section n={3} title="자주 나오는 패턴별 대응">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="text-left text-void-muted text-[11px] uppercase tracking-[0.15em]"><th className="py-2">패턴</th><th className="py-2">대응 멘트</th></tr></thead>
            <tbody className="divide-y divide-void-line">
              {[
                ["Task가 3개 이하로 뭉뚱그려짐", "&ldquo;이 단계를 더 세분화해볼까요? 실제로 어떤 순서로 하시나요?&rdquo;"],
                ["&lsquo;AI가 다 해줌&rsquo;으로 적음", "&ldquo;사람이 반드시 확인해야 할 부분은요? 판단 기준은?&rdquo;"],
                ["Pain Point가 &lsquo;시간 오래 걸림&rsquo;만", "&ldquo;구체적으로 어디서 시간이 걸리나요? 수동 취합? 대기? 반복?&rdquo;"],
                ["민감도를 전부 &lsquo;하&rsquo;로 표시", "&ldquo;개인정보나 매출 데이터가 포함되어 있진 않나요?&rdquo;"],
                ["구현 방식 모르겠다고 함", "9가지 AI 역할 카드 참조 + 난이도별 접근 제안"],
                ["너무 야심찬 To-Be", "&ldquo;가장 먼저 시도해 볼 수 있는 것 영역에 최소 실행 적도록&rdquo;"],
                ["&lsquo;AI가 할 수 있는 게 없다&rsquo;", "가장 단순한 Task(요약/분류)부터 → 성공 경험 후 확장"],
                ["프롬프트 작성 어려워함", "화면 보며 말로 설명 → 그 영상을 AI에 넣어 프롬프트 자동 생성"],
              ].map(([p, r], i) => (
                <tr key={i}>
                  <td className="py-3 pr-4 text-void-ink text-[13px] w-[36%]" dangerouslySetInnerHTML={{ __html: p }} />
                  <td className="py-3 text-void-text text-[14px]" dangerouslySetInnerHTML={{ __html: r }} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section n={4} title="시간 관리 팁">
        <CardGrid cols={3}>
          <Card><div className="text-[11px] uppercase tracking-[0.25em] text-neon-cyan mb-2">병렬</div><p className="text-[13px] text-void-text">시연 대기 시 다른 팀 스윙바이. 25분 중 10분 절약.</p></Card>
          <Card><div className="text-[11px] uppercase tracking-[0.25em] text-neon-magenta mb-2">타이머</div><p className="text-[13px] text-void-text">경청 5분 초과 시 타이머로 끊고 구조화 진입.</p></Card>
          <Card><div className="text-[11px] uppercase tracking-[0.25em] text-neon-gold mb-2">순회 리듬</div><p className="text-[13px] text-void-text">팀당 예상 시간 미리 계산 (예: 3팀 × 25분 = 75분).</p></Card>
        </CardGrid>
      </Section>

      <NextPrev prev={{ href: "/script", label: "1분 스크립트" }} next={{ href: "/framework", label: "프레임워크 치트시트" }} />
    </PageFrame>
  );
}
