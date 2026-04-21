"use client";

import { PageFrame, Section, Card, Checklist, NextPrev } from "@/components/ui";
import { useEffect, useState } from "react";
import { Download, Copy } from "lucide-react";

type TeamLog = {
  team: string;
  task: string;
  sens: string;
  asIs: string;
  aiSpot: string;
  tacit: string;
  tobe: string;
  next: string;
  enter: string;
  leave: string;
};

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
    } else {
      setTeams([EMPTY, EMPTY, EMPTY]); setRetro({ good: "", bad: "", next: "", esc: "" });
    }
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
    <PageFrame kicker="Coaching Log" title="코칭 로그" accent="lime"
      subtitle="현장에서 팀별로 채우는 라이브 로그. 로컬 저장되므로 모바일/데스크탑 어느 쪽에서 열어도 이어 쓰기 가능.">
      <Section n={1} title="날짜 선택">
        <div className="flex gap-2">
          <button onClick={() => setDay("0421")} className={`px-4 py-2 rounded-lg border text-sm ${day === "0421" ? "bg-neon-cyan text-void-bg border-neon-cyan" : "border-void-line text-void-muted hover:text-void-ink"}`}>2026-04-21 화</button>
          <button onClick={() => setDay("0423")} className={`px-4 py-2 rounded-lg border text-sm ${day === "0423" ? "bg-neon-cyan text-void-bg border-neon-cyan" : "border-void-line text-void-muted hover:text-void-ink"}`}>2026-04-23 목</button>
        </div>
      </Section>

      <Section n={2} title="팀별 기록">
        <div className="space-y-4">
          {teams.map((t, i) => (
            <Card key={i}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full border border-neon-lime/40 flex items-center justify-center text-neon-lime text-sm">{i + 1}</div>
                <input value={t.team} onChange={(e) => update(i, "team", e.target.value)} placeholder="팀명 / 모듈명" className="flex-1 bg-transparent text-void-ink text-lg font-serif border-b border-void-line focus:border-neon-cyan outline-none py-1" />
              </div>
              <div className="grid md:grid-cols-2 gap-3 text-[13px]">
                <Field label="대표 업무" value={t.task} onChange={(v) => update(i, "task", v)} />
                <Field label="데이터 민감도 (하/중/상)" value={t.sens} onChange={(v) => update(i, "sens", v)} />
                <Field label="As-Is 요약" value={t.asIs} onChange={(v) => update(i, "asIs", v)} area />
                <Field label="AI 협업 지점 제안" value={t.aiSpot} onChange={(v) => update(i, "aiSpot", v)} area />
                <Field label="암묵지 발견" value={t.tacit} onChange={(v) => update(i, "tacit", v)} area />
                <Field label="To-Be / 최소 실행" value={t.tobe} onChange={(v) => update(i, "tobe", v)} area />
                <Field label="후속 액션" value={t.next} onChange={(v) => update(i, "next", v)} area />
                <div className="grid grid-cols-2 gap-2">
                  <Field label="진입 HH:MM" value={t.enter} onChange={(v) => update(i, "enter", v)} />
                  <Field label="퇴장 HH:MM" value={t.leave} onChange={(v) => update(i, "leave", v)} />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section n={3} title="당일 회고">
        <Card>
          <div className="grid md:grid-cols-2 gap-3">
            <Field label="잘된 점" value={retro.good} onChange={(v) => setRetro({ ...retro, good: v })} area />
            <Field label="아쉬운 점" value={retro.bad} onChange={(v) => setRetro({ ...retro, bad: v })} area />
            <Field label="다음에 반영할 것" value={retro.next} onChange={(v) => setRetro({ ...retro, next: v })} area />
            <Field label="박준에게 전달할 사내 tool 질문" value={retro.esc} onChange={(v) => setRetro({ ...retro, esc: v })} area />
          </div>
        </Card>
      </Section>

      <Section n={4} title="내보내기">
        <div className="flex gap-2">
          <button onClick={() => { navigator.clipboard.writeText(markdown); }} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-void-line text-void-text hover:border-neon-cyan text-sm">
            <Copy className="w-4 h-4" /> 마크다운 복사
          </button>
          <button onClick={() => download(markdown, `coaching-log-${day}.md`)} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-neon-lime text-void-bg font-semibold text-sm">
            <Download className="w-4 h-4" /> .md 다운로드
          </button>
        </div>
        <pre className="mt-4 bg-[#0a0c12] border border-void-line rounded-lg p-4 text-[12px] text-void-text overflow-x-auto whitespace-pre-wrap font-mono max-h-72 overflow-y-auto">{markdown}</pre>
      </Section>

      <Section n={5} title="현장 고정 체크리스트">
        <Checklist storageKey={`coach-runtime-${day}`} items={[
          "첫 팀 진입 — 1분 압축 프레임워크 + 민감도 질문",
          "각 팀 녹음 시작·종료 파일명 정리",
          "시연 병렬 운영 — 대기 시 다른 팀 스윙바이",
          "떠나기 전 2분 — 핵심 피드백 3줄 + '가장 먼저 시도' 1개",
          "Step 5 마무리 순회 — 모든 팀 '최소 실행' 확정",
          "녹음 정지 · 파일명 팀명+날짜 · 박준과 5분 스탠드업",
        ]} />
      </Section>

      <NextPrev prev={{ href: "/simulation", label: "시뮬레이션" }} next={{ href: "/", label: "Home" }} />
    </PageFrame>
  );
}

function Field({ label, value, onChange, area }: { label: string; value: string; onChange: (v: string) => void; area?: boolean }) {
  return (
    <label className="block">
      <div className="text-[10px] uppercase tracking-[0.2em] text-void-muted mb-1">{label}</div>
      {area
        ? <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={2} className="w-full bg-void-elev/50 border border-void-line rounded-lg p-2.5 text-void-ink focus:border-neon-cyan outline-none text-[13px]" />
        : <input value={value} onChange={(e) => onChange(e.target.value)} className="w-full bg-void-elev/50 border border-void-line rounded-lg p-2.5 text-void-ink focus:border-neon-cyan outline-none text-[13px]" />
      }
    </label>
  );
}

function buildMarkdown(day: string, teams: TeamLog[], retro: { good: string; bad: string; next: string; esc: string }) {
  const head = day === "0421" ? "2026-04-21 화" : "2026-04-23 목";
  return `---\ntype: coaching-log\ndate: ${day === "0421" ? "2026-04-21" : "2026-04-23"}\nweekday: ${day === "0421" ? "화" : "목"}\ntime: "15:00~17:30"\nlocation: SKT\n---\n\n# 📋 ${head} · 코칭 로그\n\n## 팀별 기록\n\n${teams.map((t, i) => `### 팀 ${i + 1} — ${t.team || "(팀명 미입력)"}\n- 대표 업무: ${t.task}\n- 민감도: ${t.sens}\n- As-Is 요약: ${t.asIs}\n- AI 협업 지점: ${t.aiSpot}\n- 암묵지 발견: ${t.tacit}\n- To-Be / 최소 실행: ${t.tobe}\n- 후속 액션: ${t.next}\n- 시간: ${t.enter} → ${t.leave}\n`).join("\n")}\n\n## 당일 회고\n- 잘된 점: ${retro.good}\n- 아쉬운 점: ${retro.bad}\n- 다음에 반영할 것: ${retro.next}\n- 박준에게 전달할 사내 tool 질문: ${retro.esc}\n`;
}

function download(text: string, filename: string) {
  const blob = new Blob([text], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
