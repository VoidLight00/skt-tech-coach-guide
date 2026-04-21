"use client";

import { PageFrame, Section, ScriptBox, Card, CardGrid, Callout, Pair, StepPill } from "@/components/ui";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Play, Pause, RefreshCcw } from "lucide-react";

export default function ScriptPage() {
  return (
    <PageFrame
      kicker="Golden Script"
      title="1분 프레임워크 압축"
      subtitle="미니특강이 생략되었으므로, 팀 진입 첫 30~60초에 코치가 직접 깔아주어야 할 최소 뼈대. 입에 완전히 붙을 때까지 소리 내어 읽기."
      accent="gold"
    >
      <Section n={1} title="첫 발화 · 고정 스크립트 (25분 버전)">
        <ScriptBox title="Full Script">
          <p>&ldquo;안녕하세요, 테크코치 <strong className="text-neon-gold">손상현</strong>입니다. <strong>25분</strong> 정도 같이할게요.</p>
          <p>시작 전에 <strong className="text-neon-cyan">30초만</strong>, 오늘 쓸 뼈대 3개만 공유드릴게요.</p>
          <p className="mt-4 pl-4 border-l-2 border-neon-cyan/40">
            ① 업무는 늘 <mark><strong>&lsquo;입력 → 처리 → 판단 → 출력&rsquo;</strong></mark> 4단계로 봐요. AI가 잘하는 건 &lsquo;처리&rsquo;, 사람이 해야 하는 건 &lsquo;판단&rsquo;이에요.<br />
            ② AI 투입은 난이도 3단계 — <strong>바로 시도 / 도구 학습 / 개발</strong>. 오늘은 &lsquo;<mark>바로 시도</mark>&rsquo;에 초점 둘게요.<br />
            ③ 시작 전에 딱 하나 확인 — <strong className="text-neon-magenta">이 업무 데이터, 외부 AI에 넣어도 되는 건가요?</strong>
          </p>
          <p className="mt-4">녹음은 학습 자료로만 쓰고 이후 삭제하는데 괜찮으실까요?&rdquo;</p>
        </ScriptBox>
      </Section>

      <Section n={2} title="암기용 3블록">
        <CardGrid cols={3}>
          <Card><div className="text-[11px] uppercase text-neon-cyan tracking-[0.25em] mb-2">Block 1 · 4단계</div><div className="textbook-h2 text-lg text-void-ink mb-2">입력 → 처리 → 판단 → 출력</div><p className="text-[13px] text-void-text/90">AI = 처리, 사람 = 판단.</p></Card>
          <Card><div className="text-[11px] uppercase text-neon-magenta tracking-[0.25em] mb-2">Block 2 · 난이도</div><div className="textbook-h2 text-lg text-void-ink mb-2">★☆☆ · ★★☆ · ★★★</div><p className="text-[13px] text-void-text/90">오늘은 ★☆☆ 바로 시도에만 집중.</p></Card>
          <Card><div className="text-[11px] uppercase text-neon-gold tracking-[0.25em] mb-2">Block 3 · 민감도</div><div className="textbook-h2 text-lg text-void-ink mb-2">&ldquo;외부 AI 가능?&rdquo;</div><p className="text-[13px] text-void-text/90">매 팀 첫 질문으로 반드시.</p></Card>
        </CardGrid>
      </Section>

      <Section n={3} title="타이머 · 리허설 모드">
        <RehearsalTimer />
      </Section>

      <Section n={4} title="변형 스크립트">
        <Pair
          leftTitle="❌ 피할 오프닝"
          rightTitle="✅ 권장 오프닝"
          left={<div><p>&ldquo;ChatGPT 써보셨죠? 오늘은 이걸로 자동화하는 법 알려드릴게요.&rdquo;</p><p className="text-[12px] mt-1 text-void-muted">→ 도구 소개 메인. 프레임워크 없이 시작.</p></div>}
          right={<div><p>&ldquo;오늘 쓸 뼈대 3개만 30초로 깔고 들어갈게요. 첫 질문 하나 드리고요.&rdquo;</p><p className="text-[12px] mt-1 text-void-muted">→ 구조 먼저, 팀 리듬 잡힘.</p></div>}
        />
      </Section>

      <Section n={5} title="Scene 2 풀 오프닝 예시" desc="마케팅팀 테이블 A 진입 시 실제 사용.">
        <Card>
          <div className="flex flex-wrap gap-2 mb-4">
            <StepPill n={1} label="자기소개" />
            <StepPill n={2} label="시간 공지" />
            <StepPill n={3} label="프레임 30초" />
            <StepPill n={4} label="민감도 질문" />
            <StepPill n={5} label="녹음 동의" />
          </div>
          <ol className="space-y-3 text-[14px] text-void-text leading-relaxed">
            <li><strong className="text-void-ink">1.</strong> &ldquo;안녕하세요, 테크코치 손상현입니다.&rdquo;</li>
            <li><strong className="text-void-ink">2.</strong> &ldquo;25분 정도 같이할게요.&rdquo;</li>
            <li><strong className="text-void-ink">3.</strong> &ldquo;시작 전에 30초만 뼈대 3개 공유드려요 — 입력·처리·판단·출력 / 난이도 3단계 / 오늘은 바로 시도에 포커스.&rdquo;</li>
            <li><strong className="text-void-ink">4.</strong> &ldquo;딱 하나 확인할게요 — 이 업무 데이터, 외부 AI에 넣어도 되는 건가요?&rdquo;</li>
            <li><strong className="text-void-ink">5.</strong> &ldquo;녹음은 학습 자료로만 쓰고 이후 삭제하는데 괜찮으실까요?&rdquo;</li>
          </ol>
        </Card>
        <Callout tone="ok" title="핵심 비법">
          강의하지 말 것. <strong>&ldquo;오늘 쓸 뼈대 3개만&rdquo;</strong> 이라는 표현을 사용하면 실무자가 &lsquo;설교당한다&rsquo;는 느낌 없이 가볍게 듣는다.
        </Callout>
      </Section>
    </PageFrame>
  );
}

function RehearsalTimer() {
  const [running, setRunning] = useState(false);
  const [t, setT] = useState(0);
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setT((x) => x + 1), 1000);
    return () => clearInterval(id);
  }, [running]);
  const phases = [
    { until: 30, label: "① 자기소개 + 시간 공지", color: "text-neon-cyan" },
    { until: 90, label: "② 뼈대 3개 압축 설명", color: "text-neon-magenta" },
    { until: 120, label: "③ 민감도 질문 + 녹음 동의", color: "text-neon-gold" },
  ];
  const cur = phases.find((p) => t < p.until) ?? phases[phases.length - 1];
  const mm = String(Math.floor(t / 60)).padStart(2, "0");
  const ss = String(t % 60).padStart(2, "0");
  return (
    <Card>
      <div className="flex flex-col md:flex-row items-center gap-6">
        <motion.div
          animate={{ scale: running ? [1, 1.04, 1] : 1 }}
          transition={{ repeat: Infinity, duration: 1.4 }}
          className="relative w-40 h-40 rounded-full border-4 border-neon-cyan/40 flex items-center justify-center"
        >
          <span className="font-mono text-5xl text-void-ink">{mm}:{ss}</span>
          <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-neon-cyan/20 via-transparent to-neon-magenta/20 blur-2xl" />
        </motion.div>
        <div className="flex-1">
          <div className={`text-[11px] uppercase tracking-[0.25em] ${cur.color}`}>Current Phase</div>
          <div className="textbook-h2 text-xl text-void-ink mb-3">{cur.label}</div>
          <div className="flex gap-2">
            <button onClick={() => setRunning((v) => !v)} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-neon-cyan text-void-bg font-semibold text-sm">
              {running ? <><Pause className="w-4 h-4" /> Pause</> : <><Play className="w-4 h-4" /> Start</>}
            </button>
            <button onClick={() => { setRunning(false); setT(0); }} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-void-line text-void-muted text-sm hover:text-void-ink">
              <RefreshCcw className="w-4 h-4" /> Reset
            </button>
          </div>
          <p className="mt-3 text-[12px] text-void-muted">타이머를 켜고 스크립트를 소리내어 따라 읽어보세요. 30초/90초/120초 마커로 구간이 바뀝니다.</p>
        </div>
      </div>
    </Card>
  );
}
