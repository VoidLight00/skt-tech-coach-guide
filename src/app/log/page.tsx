"use client";

import { PageFrame, Section, Card, Checklist, NextPrev } from "@/components/ui";
import { useEffect, useState } from "react";
import { Download, Copy } from "lucide-react";

type TeamLog = { team: string; task: string; sens: string; asIs: string; aiSpot: string; tacit: string; tobe: string; next: string; enter: string; leave: string };
const EMPTY: TeamLog = { team: "", task: "", sens: "", asIs: "", aiSpot: "", tacit: "", tobe: "", next: "", enter: "", leave: "" };

export default function LogPage() {
  const [day, setDay] = useState<"0421" | "0423">("0421");
  const [teams, setTeams] = useState<TeamLog[]>([EMPTY, EMPTY, EMPTY]);
  const [retro, setRetro] = useState({ good: "", bad: "", next: "", esc: "" });
  const [hydrated, setHydrated] = useState(false);
  const key = `coach-log-${day}`;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = localStorage.getItem(key);
    if (raw) {
      try { const d = JSON.parse(raw); setTeams(d.teams ?? [EMPTY, EMPTY, EMPTY]); setRetro(d.retro ?? { good: "", bad: "", next: "", esc: "" }); }
      catch { setTeams([EMPTY, EMPTY, EMPTY]); setRetro({ good: "", bad: "", next: "", esc: "" }); }
    } else { setTeams([EMPTY, EMPTY, EMPTY]); setRetro({ good: "", bad: "", next: "", esc: "" }); }
    setHydrated(true);
  }, [day]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(key, JSON.stringify({ teams, retro }));
  }, [teams, retro, hydrated, key]);

  function update(i: number, field: keyof TeamLog, val: string) {
    const n = [...teams]; n[i] = { ...n[i], [field]: val }; setTeams(n);
  }

  const markdown = buildMarkdown(day, teams, retro);

  return (
    <PageFrame
      eyebrow="09 · 코칭 로그"
      title="팀마다 한 페이지, 그날의 기록."
      lede="현장에서 실시간으로 쓸 수 있게, 그리고 나중에 돌아와 다시 읽을 수 있게. 브라우저에 저장되므로 모바일로 적고, 데스크탑에서 이어 쓸 수 있다."
    >
      <Section n={1} title="날짜">
        <div className="flex gap-2">
          <button onClick={() => setDay("0421")} className={day === "0421" ? "btn-brand" : "btn-ghost"}>2026년 4월 21일 화</button>
          <button onClick={() => setDay("0423")} className={day === "0423" ? "btn-brand" : "btn-ghost"}>2026년 4월 23일 목</button>
        </div>
      </Section>

      <Section n={2} title="팀별 기록">
        <div className="space-y-4">
          {teams.map((t, i) => (
            <Card key={i} hover={false}>
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-ink-200 dark:border-ink-800">
                <div className="w-8 h-8 rounded-full bg-brand-50 dark:bg-[rgba(255,107,53,0.1)] text-brand flex items-center justify-center text-sm font-semibold">{i + 1}</div>
                <input value={t.team} onChange={(e) => update(i, "team", e.target.value)} placeholder="팀명 또는 모듈명" className="flex-1 bg-transparent serif-kr text-xl font-bold text-ink-900 dark:text-ink-50 placeholder-ink-400 outline-none" />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <Field label="대표 업무" value={t.task} onChange={(v) => update(i, "task", v)} />
                <Field label="데이터 민감도" value={t.sens} onChange={(v) => update(i, "sens", v)} placeholder="하 · 중 · 상" />
                <Field label="As-Is 요약" value={t.asIs} onChange={(v) => update(i, "asIs", v)} area />
                <Field label="AI 협업 지점" value={t.aiSpot} onChange={(v) => update(i, "aiSpot", v)} area />
                <Field label="끌어낸 암묵지" value={t.tacit} onChange={(v) => update(i, "tacit", v)} area />
                <Field label="To-Be와 최소 실행" value={t.tobe} onChange={(v) => update(i, "tobe", v)} area />
                <Field label="후속 액션" value={t.next} onChange={(v) => update(i, "next", v)} area />
                <div className="grid grid-cols-2 gap-2">
                  <Field label="진입 (HH:MM)" value={t.enter} onChange={(v) => update(i, "enter", v)} />
                  <Field label="퇴장 (HH:MM)" value={t.leave} onChange={(v) => update(i, "leave", v)} />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section n={3} title="당일 회고">
        <Card hover={false}>
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="잘된 점" value={retro.good} onChange={(v) => setRetro({ ...retro, good: v })} area />
            <Field label="아쉬운 점" value={retro.bad} onChange={(v) => setRetro({ ...retro, bad: v })} area />
            <Field label="다음에 반영할 것" value={retro.next} onChange={(v) => setRetro({ ...retro, next: v })} area />
            <Field label="담당자에게 전달할 사내 도구 질문" value={retro.esc} onChange={(v) => setRetro({ ...retro, esc: v })} area />
          </div>
        </Card>
      </Section>

      <Section n={4} title="내보내기">
        <div className="flex gap-2 mb-4">
          <button onClick={() => navigator.clipboard.writeText(markdown)} className="btn-ghost">
            <Copy className="w-4 h-4" /> 마크다운 복사
          </button>
          <button onClick={() => download(markdown, `coaching-log-${day}.md`)} className="btn-brand">
            <Download className="w-4 h-4" /> 파일로 저장
          </button>
        </div>
        <pre className="bg-ink-50 dark:bg-ink-800/50 border border-ink-200 dark:border-ink-800 rounded-lg p-4 text-[12.5px] text-ink-800 dark:text-ink-100 overflow-auto whitespace-pre-wrap font-mono max-h-72">{markdown}</pre>
      </Section>

      <Section n={5} title="현장 체크리스트">
        <Checklist storageKey={`coach-runtime-${day}`} items={[
          "첫 팀 진입 때 30초 뼈대와 민감도 질문을 먼저 던진다",
          "팀마다 녹음 시작과 종료 시점의 파일명을 정리한다",
          "시연 대기 시간에 다른 팀을 30초 스윙바이하고 돌아온다",
          "자리를 뜨기 전 2분에 세 줄 피드백과 ‘가장 먼저 시도’ 한 줄을 남긴다",
          "Step 5 마무리에서 모든 팀의 최소 실행을 확정한다",
          "녹음을 정지하고, 박준 코치와 5분 스탠드업 후 로그를 채운다",
        ]} />
      </Section>

      <NextPrev prev={{ href: "/simulation", label: "현장 시뮬레이션" }} next={{ href: "/", label: "서문" }} />
    </PageFrame>
  );
}

function Field({ label, value, onChange, area, placeholder }: { label: string; value: string; onChange: (v: string) => void; area?: boolean; placeholder?: string }) {
  return (
    <label className="block">
      <div className="text-[10.5px] uppercase tracking-[0.18em] text-ink-500 mb-1.5 font-semibold">{label}</div>
      {area
        ? <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={2} className="w-full bg-paper dark:bg-ink-800/30 border border-ink-200 dark:border-ink-800 rounded-lg p-2.5 text-ink-900 dark:text-ink-50 focus:border-brand outline-none text-[13.5px]" />
        : <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full bg-paper dark:bg-ink-800/30 border border-ink-200 dark:border-ink-800 rounded-lg p-2.5 text-ink-900 dark:text-ink-50 focus:border-brand outline-none text-[13.5px]" />
      }
    </label>
  );
}

function buildMarkdown(day: string, teams: TeamLog[], retro: { good: string; bad: string; next: string; esc: string }) {
  const head = day === "0421" ? "2026년 4월 21일 화" : "2026년 4월 23일 목";
  return `---\ntype: coaching-log\ndate: ${day === "0421" ? "2026-04-21" : "2026-04-23"}\nweekday: ${day === "0421" ? "화" : "목"}\ntime: 15:00–17:30\nlocation: SKT\n---\n\n# ${head} · 코칭 로그\n\n## 팀별 기록\n\n${teams.map((t, i) => `### 팀 ${i + 1} — ${t.team || "(미입력)"}\n- 대표 업무: ${t.task}\n- 민감도: ${t.sens}\n- As-Is 요약: ${t.asIs}\n- AI 협업 지점: ${t.aiSpot}\n- 암묵지: ${t.tacit}\n- To-Be와 최소 실행: ${t.tobe}\n- 후속 액션: ${t.next}\n- 시간: ${t.enter} → ${t.leave}\n`).join("\n")}\n\n## 회고\n- 잘된 점: ${retro.good}\n- 아쉬운 점: ${retro.bad}\n- 다음에 반영할 것: ${retro.next}\n- 담당자에게 전달할 사내 도구 질문: ${retro.esc}\n`;
}

function download(text: string, filename: string) {
  const blob = new Blob([text], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
