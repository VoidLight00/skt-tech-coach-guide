"use client";

import { PageFrame, Section, ScriptBox, Card, CardGrid, Callout, Pair, NextPrev } from "@/components/ui";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

export default function ScriptPage() {
  return (
    <PageFrame
      eyebrow="02 · 진입 스크립트"
      title="30초를 깔지 않으면, 남은 25분이 뭉개진다."
      lede="미니 강의가 사라진 자리를 메우는 것은 장황한 설명이 아니다. 입에 붙은 짧은 뼈대 세 마디와 정확히 한 가지 질문이다. 이 장의 모든 문장은 낭독을 전제로 쓰였다."
    >
      <Section n={1} title="자리에 앉으며 건네는 문장">
        <ScriptBox>
          <p>&ldquo;안녕하세요, 테크코치 손상현입니다. 25분 정도 같이할게요.</p>
          <p className="mt-4">시작 전에 30초만, 오늘 쓸 뼈대 세 가지만 공유드릴게요.</p>
          <p className="mt-4 pl-4 border-l-2 border-brand">
            첫째, 업무는 네 단계로 봅니다. 입력에서 처리, 그다음 판단, 마지막이 출력이에요. AI가 잘하는 건 처리고, 사람이 남겨야 하는 건 판단이에요.<br /><br />
            둘째, AI를 쓰는 난이도는 세 층이에요. 바로 시도, 도구 학습, 개발. 오늘은 바로 시도에만 집중해요.<br /><br />
            셋째, 시작 전에 딱 하나 확인할게요. 이 업무의 데이터, 외부 AI에 넣어도 되는 것인가요.
          </p>
          <p className="mt-4">녹음은 학습 자료로만 쓰고 이후 삭제하는데, 괜찮으실까요.&rdquo;</p>
        </ScriptBox>
      </Section>

      <Section n={2} title="세 마디의 뼈대">
        <CardGrid cols={3}>
          <Card>
            <div className="text-[11px] uppercase tracking-[0.18em] text-brand font-semibold mb-2">첫째</div>
            <div className="serif-kr text-[19px] font-bold text-ink-900 dark:text-ink-50 mb-2">입력 → 처리 → 판단 → 출력</div>
            <p className="text-[13.5px] text-ink-600 dark:text-ink-300 leading-relaxed">AI는 처리, 사람은 판단. 이 한 문장이 뒤에 오는 모든 설계의 기준이다.</p>
          </Card>
          <Card>
            <div className="text-[11px] uppercase tracking-[0.18em] text-brand font-semibold mb-2">둘째</div>
            <div className="serif-kr text-[19px] font-bold text-ink-900 dark:text-ink-50 mb-2">바로 시도 · 도구 학습 · 개발</div>
            <p className="text-[13.5px] text-ink-600 dark:text-ink-300 leading-relaxed">세 층이 있다는 걸 알려주되, 오늘의 과제는 맨 아래 층이라는 약속을 남긴다.</p>
          </Card>
          <Card>
            <div className="text-[11px] uppercase tracking-[0.18em] text-brand font-semibold mb-2">셋째</div>
            <div className="serif-kr text-[19px] font-bold text-ink-900 dark:text-ink-50 mb-2">외부 AI에 넣어도 되나요</div>
            <p className="text-[13.5px] text-ink-600 dark:text-ink-300 leading-relaxed">이 질문에 대한 답에 따라 같은 업무가 완전히 다른 경로로 흘러간다.</p>
          </Card>
        </CardGrid>
      </Section>

      <Section n={3} title="리허설 타이머">
        <RehearsalTimer />
      </Section>

      <Section n={4} title="피할 문장, 대신할 문장">
        <Pair
          leftTitle="피할 오프닝"
          rightTitle="대신 이렇게"
          left={<div><p>&ldquo;ChatGPT 써보셨죠? 오늘은 이걸로 자동화하는 법 알려드릴게요.&rdquo;</p><p className="mt-2 text-ink-500 text-[12.5px]">도구가 먼저 오면 대화의 중심이 기기로 옮겨간다.</p></div>}
          right={<div><p>&ldquo;오늘 쓸 뼈대 세 가지만 30초로 깔고 들어갈게요. 첫 질문 하나 드리겠습니다.&rdquo;</p><p className="mt-2 text-ink-500 text-[12.5px]">구조가 먼저 서면 팀의 리듬이 따라붙는다.</p></div>}
        />
      </Section>

      <Section n={5} title="A 테이블에서 실제로 말한다면">
        <Card hover={false}>
          <ol className="divide-y divide-ink-200 dark:divide-ink-800 text-[14.5px]">
            {[
              "안녕하세요, 테크코치 손상현입니다.",
              "25분 정도 같이할게요.",
              "시작 전에 30초만 뼈대 세 가지를 공유드려요. 입력·처리·판단·출력, 난이도 세 층, 오늘은 바로 시도만.",
              "딱 하나만 여쭙겠습니다. 이 업무의 데이터, 외부 AI에 넣어도 되는 건가요.",
              "녹음은 학습 자료로만 쓰고 이후 삭제합니다. 괜찮으시겠어요?",
            ].map((l, i) => (
              <li key={i} className="py-3.5 flex gap-4">
                <span className="font-mono text-[12px] text-brand shrink-0 w-6 pt-1">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-ink-800 dark:text-ink-100 leading-relaxed">{l}</span>
              </li>
            ))}
          </ol>
        </Card>
        <Callout title="한 가지만 기억해도 된다면">
          &lsquo;오늘 쓸 뼈대만 30초&rsquo;이라는 표현. 이 말이 설교의 공기를 지우고, 팀을 잠깐의 도입으로 이끈다.
        </Callout>
      </Section>

      <NextPrev prev={{ href: "/today", label: "당일 실행플랜" }} next={{ href: "/loop", label: "코칭 루프" }} />
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
    { until: 30, label: "자기소개와 시간 공지" },
    { until: 90, label: "뼈대 세 가지를 건네는 구간" },
    { until: 120, label: "민감도 질문과 녹음 동의" },
  ];
  const cur = phases.find((p) => t < p.until) ?? phases[phases.length - 1];
  const mm = String(Math.floor(t / 60)).padStart(2, "0");
  const ss = String(t % 60).padStart(2, "0");
  return (
    <Card hover={false} className="!p-8">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <motion.div
          animate={{ scale: running ? [1, 1.025, 1] : 1 }}
          transition={{ repeat: Infinity, duration: 1.6 }}
          className="relative w-40 h-40 rounded-full border-2 border-ink-200 dark:border-ink-700 flex items-center justify-center shadow-card"
        >
          <span className="font-mono text-5xl text-ink-900 dark:text-ink-50 tabular-nums">{mm}:{ss}</span>
          {running && <div className="absolute inset-0 rounded-full border-2 border-brand/40 animate-pulse" />}
        </motion.div>
        <div className="flex-1">
          <div className="text-[11px] uppercase tracking-[0.18em] text-brand font-semibold mb-1">현재 구간</div>
          <div className="serif-kr text-xl font-bold text-ink-900 dark:text-ink-50 mb-4">{cur.label}</div>
          <div className="flex gap-2">
            <button onClick={() => setRunning((v) => !v)} className="btn-brand">
              {running ? <><Pause className="w-4 h-4" /> 일시정지</> : <><Play className="w-4 h-4" /> 시작</>}
            </button>
            <button onClick={() => { setRunning(false); setT(0); }} className="btn-ghost">
              <RotateCcw className="w-4 h-4" /> 초기화
            </button>
          </div>
          <p className="mt-4 text-[13px] text-ink-500 dark:text-ink-400">30초, 90초, 120초 경계에서 구간이 전환된다. 타이머를 켜고 스크립트를 따라 읽으며 호흡을 재본다.</p>
        </div>
      </div>
    </Card>
  );
}
