"use client";

import { PageFrame, Section, Card, CardGrid, Checklist, Callout, Tabs, NextPrev } from "@/components/ui";
import { motion } from "framer-motion";

export default function TodayPage() {
  return (
    <PageFrame kicker="Run Book" title="당일 실행플랜" accent="magenta"
      subtitle="4/21 화·4/23 목 15:00~17:30. CEO 타운홀 긴급 편성으로 미니특강 생략됨. 15:00 즉시 코칭 진입.">
      <Section n={1} title="타임라인">
        <Card>
          <div className="grid md:grid-cols-5 gap-3">
            {[
              { t: "~14:50", l: "입장·세팅", s: "장비·계정·녹음 테스트", c: "cyan" },
              { t: "14:50~15:00", l: "코치 3인 싱크", s: "담당팀·순서·Step3 미완 팀 공유", c: "gold" },
              { t: "15:00~17:00", l: "테크코칭 120분", s: "팀당 25~40분, 2~3팀 순회", c: "magenta" },
              { t: "17:00~17:30", l: "To-Be 마무리", s: "&lsquo;가장 먼저 시도&rsquo; 1개 확정", c: "lime" },
              { t: "17:30~", l: "스탠드업·로그", s: "3인 공유 + 4/23 개선점", c: "cyan" },
            ].map((s, i) => {
              const color = s.c === "cyan" ? "text-neon-cyan" : s.c === "magenta" ? "text-neon-magenta" : s.c === "gold" ? "text-neon-gold" : "text-neon-lime";
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="void-card p-4">
                  <div className={`text-[10px] uppercase tracking-[0.25em] mb-1 ${color}`}>{s.t}</div>
                  <div className="text-void-ink text-[15px] textbook-h2">{s.l}</div>
                  <div className="text-[12px] text-void-muted mt-1" dangerouslySetInnerHTML={{ __html: s.s }} />
                </motion.div>
              );
            })}
          </div>
          <Callout tone="warn" title="미니특강 생략 주의" >
            실무자들은 박준 강의를 <strong>못 들은 상태</strong>로 Step 4 앞에 앉아 있음. 각 팀 진입 시 코치가 <strong>1분 압축 프레임워크</strong>를 반드시 깔아야 함. → <a href="/script" className="link-neon">/script</a>
          </Callout>
        </Card>
      </Section>

      <Section n={2} title="팀 수별 시간 배분">
        <Tabs tabs={[
          { label: "2팀 담당", content: <TeamTable rows={[["15:00~15:55", "팀 1"], ["15:55~16:50", "팀 2"], ["16:50~17:00", "스윙바이"], ["17:00~17:30", "마무리"]]} min="55" /> },
          { label: "3팀 담당 (기본)", content: <TeamTable rows={[["15:00~15:38", "팀 1"], ["15:38~16:15", "팀 2"], ["16:15~16:55", "팀 3"], ["16:55~17:00", "스윙바이"], ["17:00~17:30", "마무리"]]} min="38" /> },
          { label: "4팀 담당", content: <TeamTable rows={[["15:00~15:28", "팀 1"], ["15:28~15:55", "팀 2"], ["15:55~16:22", "팀 3"], ["16:22~16:50", "팀 4"], ["16:50~17:30", "To-Be 순회"]]} min="28" /> },
        ]} />
      </Section>

      <Section n={3} title="Pre · 오늘 밤 / 출근 전">
        <Checklist storageKey="pre-check" items={[
          "도구 4개 로그인: ChatGPT · Claude · Gemini(Google AI Studio) · NotebookLM",
          "시연용 브라우저 프로필 분리 (확장 끄기, 탭 4개 고정)",
          "R1·R6·R9 각 1회 실제 시연 → 성공 스크린샷 저장 (백업)",
          "1분 압축 프레임워크 스크립트 소리 내어 3번",
          "클라우드 노트핀 충전 + 5분 테스트 녹음 + 파일 추출 경로 확인",
          "담당 팀 수·강의실 배치 박준님께 확인",
          "박준님께 CEO 타운홀 일정 변경 회신 완료",
          "Scene 2·4 전철에서 재독",
          "고정 스크립트 3개 암기 확인",
        ]} />
      </Section>

      <Section n={4} title="During · 현장 운영 팁">
        <CardGrid cols={2}>
          <Card>
            <div className="text-[11px] uppercase tracking-[0.25em] text-neon-cyan mb-2">팀 진입 첫 60초</div>
            <ol className="space-y-2 text-[14px] text-void-text">
              <li>① 자기소개 + 시간 공지 (25분)</li>
              <li>② 뼈대 3개 압축 (30초)</li>
              <li>③ 민감도 질문 + 녹음 동의</li>
            </ol>
          </Card>
          <Card>
            <div className="text-[11px] uppercase tracking-[0.25em] text-neon-magenta mb-2">시연 병렬 운영</div>
            <p className="text-[14px] text-void-text">인풋 세팅 → 결과 대기 시 <strong>다른 팀 스윙바이</strong> → 복귀 후 결과 설명. 25분 중 10분 절약.</p>
          </Card>
          <Card>
            <div className="text-[11px] uppercase tracking-[0.25em] text-neon-gold mb-2">떠나기 전 마지막 2분</div>
            <ol className="space-y-2 text-[14px] text-void-text">
              <li>⋅ 핵심 피드백 3줄 요약</li>
              <li>⋅ &ldquo;가장 먼저 시도&rdquo; 칸 1개 확정</li>
              <li>⋅ 녹음 파일명·팀명 메모</li>
            </ol>
          </Card>
          <Card>
            <div className="text-[11px] uppercase tracking-[0.25em] text-red-400 mb-2">피로도 감안</div>
            <p className="text-[14px] text-void-text">오전 타운홀 + 13시부터 Step1~3 압축 → 실무자 <strong>에너지 저하</strong>. 더 짧은 문장·더 많은 공감.</p>
          </Card>
        </CardGrid>
      </Section>

      <Section n={5} title="Post · 당일 이후">
        <Checklist storageKey="post-check" items={[
          "녹음 파일 → STT → 팀별 요약 작성",
          "코칭 로그 템플릿에 팀별 핵심 3줄 기록",
          "팀 채팅에 코칭 요약 공유 (선순환)",
          "박준님께 사내 tool 질문 목록 전달",
          "4/23 목 개선할 포인트 1줄 메모",
        ]} />
      </Section>

      <NextPrev prev={{ href: "/", label: "Home" }} next={{ href: "/script", label: "1분 프레임워크 압축 스크립트" }} />
    </PageFrame>
  );
}

function TeamTable({ rows, min }: { rows: [string, string][]; min: string }) {
  return (
    <Card>
      <div className="text-[11px] uppercase tracking-[0.25em] text-neon-cyan mb-3">팀당 약 {min}분 기준</div>
      <table className="w-full text-sm">
        <thead><tr className="text-left text-void-muted text-[11px] uppercase tracking-[0.15em]"><th className="pb-2">시간</th><th className="pb-2">담당</th></tr></thead>
        <tbody>
          {rows.map(([t, l], i) => (
            <tr key={i} className="border-t border-void-line">
              <td className="py-2.5 font-mono text-neon-cyan text-[13px]">{t}</td>
              <td className="py-2.5 text-void-text">{l}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
