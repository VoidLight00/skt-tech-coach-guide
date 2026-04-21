"use client";

import { PageFrame, Section, Card, Callout, Quote, NextPrev } from "@/components/ui";
import { motion } from "framer-motion";
import { Clock, Eye, Headphones, Lightbulb, AlertTriangle } from "lucide-react";

type Scene = {
  n: number;
  time: string;
  title: string;
  badge?: string;
  see: string[];
  hear?: string[];
  moves: string[];
  best: string;
  trap?: string;
  persona?: { name: string; desc: string }[];
  workText?: string;
};

const SCENES: Scene[] = [
  {
    n: 0, time: "14:30", title: "입장, 세팅 (당신이 도착)",
    see: [
      "SKT 교육장. 테이블 5~6개, 각 4~5명.",
      "실무자들은 오전 CEO 타운홀 + 13시부터 Step 1~3 달려온 상태. 에너지 낮음.",
      "일부 팀은 Step 3 덜 채움. 카페인 들이붓는 중.",
      "박준·재엽·박한규 매니저가 세팅 중.",
    ],
    moves: [
      "박준과 30초 싱크 — 담당 테이블·순서·Step 3 미완 팀",
      "노트북 세팅 — 시연 탭 4개 (ChatGPT/Claude/Gemini/NotebookLM)",
      "클라우드 노트핀 ON + 음성 인식 시험",
      "치트시트·펜·타이머 손 닿는 자리",
    ],
    best: "도착하자마자 실무자에게 말 걸지 않기. 미니특강 생략 고지 전에 기대치 먼저 올라가면 안 됨. 눈인사만.",
  },
  {
    n: 1, time: "14:50~15:00", title: "코치 3인 싱크 & 전체 인사 (미니특강 생략)",
    badge: "미니특강 없음",
    see: [
      "미니특강 없음. 박준·재엽·상현이 뒤쪽에서 10분 스탠드업.",
      "박준: &ldquo;타운홀 때문에 오후 압축. 미니특강 생략, 바로 들어갑니다.&rdquo;",
      "운영팀이 15:00 정각 &ldquo;이제 코치님들이 돌아가며 코칭해주실 거예요&rdquo; 1분 안내.",
      "각 코치가 담당 테이블로 걸어간다.",
    ],
    moves: [
      "담당 테이블 확정 (상현 A·B·C / 재엽 D·E / 박준 F·스윙바이)",
      "미니특강 생략분 전달 방식 합의 — &lsquo;1분 압축 프레임워크&rsquo;",
      "Step 3 미완 팀 대응 — 코칭 초반 3~5분 보완",
      "사내 tool 질문 에스컬레이션 방식",
    ],
    best: "15:00 정각에 가장 먼저 배정된 테이블로 자연스럽게 걸어가기. 망설이면 팀도 망설인다.",
    trap: "미니특강 생략됐다고 프레임워크도 생략하지 말 것. 팀은 프레임워크를 전혀 모르는 상태로 Step 4 앞에 앉아 있음.",
  },
  {
    n: 2, time: "15:00~15:27", title: "팀 A · 마케팅팀 진입 (27분)",
    badge: "자동화 욕심 vs 보안 우려",
    persona: [
      { name: "김대리 (36, 마케팅 기획)", desc: "적극적, AI 기대 큼, 자동화 욕심" },
      { name: "이주임 (28, 데이터)", desc: "조용, 엑셀·GA 잘 다룸" },
      { name: "박과장 (42, 브랜드)", desc: "회의적, 팔짱" },
      { name: "정대리 (33, 디지털)", desc: "중립" },
    ],
    workText: "월간 캠페인 성과 리포트. 채널 5개, 엑셀 탭 12개, 월말 72시간 야근.",
    see: [
      "김대리 기대 찬 눈. 박과장 팔짱 그대로.",
      "워크시트 Step 1~3 채워진 상태. Pain: '수치 모으기 이틀 + PPT 만들기 이틀'",
    ],
    hear: [
      "김대리: &ldquo;채널 다섯 개라 엑셀 탭 12개. AI로 한 번에 자동화 가능할까요?&rdquo;",
      "박과장 (회의적): &ldquo;근데 저희 성과 수치 대외비인데… 밖에 AI 올리면 안 되는 거 아닌가요?&rdquo;",
    ],
    moves: [
      "① 자기소개 + 시간 공지 + 1분 압축 프레임워크",
      "② 민감도 질문 먼저 → 박과장 안심",
      "③ Workflow 7단계 쪼개기 — 공동 언어 만들기",
      "④ 암묵지 드릴 — &lsquo;감&rsquo; 3개를 말로 풀어 옆 사람이 받아적게",
      "⑤ R6 시연 — 익명화 샘플 3x10 → ChatGPT 파이썬 스크립트",
      "⑥ 정리 — &lsquo;가장 먼저 시도&rsquo; 칸 직접 가리키며 적게",
    ],
    best: "화이트보드(또는 워크시트 여백)에 세 칸 그리기: [민감도 하/중/상] 대응 전략. &ldquo;오늘 중요한 첫 번째 질문은 어디를 자동화할지가 아니라 어디까지 외부를 쓸지예요.&rdquo;",
    trap: "n8n 바로 제안 금지 · 박과장 질문을 &lsquo;괜찮아요&rsquo;로 넘기지 말 것 · 20분 초과 시 17분 시점 마무리 고지",
  },
  {
    n: 3, time: "15:27~15:55", title: "팀 B · 재무팀 진입 (28분)",
    badge: "의심 많은 과장 · 정석 R9",
    persona: [
      { name: "최과장 (45, 재무)", desc: "차분·의심·보안 민감, 팔짱" },
      { name: "윤대리 (34, 회계)", desc: "수치에 강함" },
      { name: "한주임 (29, 재무기획)", desc: "조용" },
    ],
    workText: "분기별 재무 데이터 이상치 탐지 → IR 자료 초안. &lsquo;튀는 숫자&rsquo;를 감으로 찾음.",
    see: ["최과장 팔짱. 윤대리가 노트북 준비.", "Step 3 촘촘하게 채워짐. 근거 기준은 공란."],
    hear: ["최과장: &ldquo;AI에 재무 데이터 올리면 바로 학습에 쓰이는 거 아닌가요? 저희는 그래서 안 쓰고 있어요.&rdquo;"],
    moves: [
      "① 프레임워크 압축 스크립트",
      "② 보안 의심을 정확히 인정 + 2가지 방법 제시 (기업용/더미)",
      "③ 암묵지 드릴 — &ldquo;어떤 숫자가 튄다고 판단하세요?&rdquo; → 한주임이 받아적기",
      "④ 병렬 운영 — ChatGPT에 R9 프롬프트 던지고 옆 팀 스윙바이 30초",
      "⑤ 사내 파이썬 환경 질문 → 고정 스크립트 + 메모",
    ],
    best: "최과장 첫 질문을 &ldquo;맞아요&rdquo;로 시작하기. 그리고 R9 전략을 다이어그램으로 즉석 그리기.",
    trap: "&ldquo;괜찮습니다 학습 안 돼요&rdquo; 같은 반쯤 맞는 답으로 얼버무리지 말 것",
  },
  {
    n: 4, time: "15:55~16:25", title: "팀 C · 상품전략팀 진입 (30분 · 어려운 팀)",
    badge: "자신감 낮음 · 성공 경험 만들기",
    persona: [
      { name: "이주임 (30, 상품전략)", desc: "머뭇거림·자신감 낮음" },
      { name: "다른 3명", desc: "조용, 서로 눈치" },
    ],
    workText: "경쟁사 상품 스펙 비교표 업데이트. 매주 반복. Step 3가 3줄뿐.",
    see: ["워크시트 비어있음 · 이주임이 눈 마주치지 못함"],
    hear: ["이주임: &ldquo;저희는 AI로 뭘 해야 할지 잘 모르겠어요. 업무가 그냥 계속 비교표 만드는 건데…&rdquo;"],
    moves: [
      "① 프레임워크 압축 + 시간 여유 있음을 어필",
      "② &ldquo;지난주에 실제로 하신 한 건만 풀어주실 수 있어요?&rdquo;",
      "③ 코치가 5단계로 대신 쪼개주기 — 구조화 대행",
      "④ R2 비교 시연 — Claude로 경쟁사 A·B 요금제 변경점 표 (30초)",
      "⑤ 핵심 숙제 주기 — &ldquo;중요한 변화가 뭔가&rdquo; 본인 기준 3개 적기",
    ],
    best: "이주임 혼자 말하게 두지 말 것. 중간에 &ldquo;XX님은 이 단계 뭐가 제일 힘드세요?&rdquo; 질문 돌리기.",
    trap: "&ldquo;간단하네요 바로 해보세요&rdquo; → 자신감 낮은 팀엔 부담. &lsquo;오늘 15분 안에 하나 성공&rsquo;으로 설계.",
  },
  {
    n: 5, time: "16:25~17:00", title: "순회 2차 · Step 5 시작",
    see: ["박한규 매니저: &lsquo;16:45부터 Step 5 마무리 들어갈게요&rsquo; 안내", "세 팀 다 1회씩 돌았음"],
    moves: [
      "담당 세 팀 빠르게 한 번씩 스윙바이",
      "&ldquo;&lsquo;가장 먼저 시도&rsquo; 칸 적으셨어요?&rdquo; 확인",
      "안 적힌 팀은 즉석 1분 함께 적기",
      "★☆☆ 난이도인지 확인 (★★☆ 이상이면 '2번째로')",
    ],
    best: "각 팀에 3~4줄 피드백 카드: 팀 A는 엑셀 통합 스크립트 / 팀 B는 이상탐지 규칙 3개 명문화 / 팀 C는 본인 중요도 기준 추가",
  },
  {
    n: 6, time: "17:00~17:30", title: "전체 공유 · 마무리",
    see: [
      "각 테이블 대표에게 1분 공유 돌림",
      "실무자들 처음보다 눈빛 또렷. &lsquo;할 수 있겠다&rsquo;는 느낌",
      "박준 마무리 멘트",
    ],
    moves: [
      "녹음 정지, 파일명에 팀명+날짜",
      "박준·재엽과 5분 스탠드업 — A·B·C 특이사항, 사내 환경 질문 1건",
      "운영팀 다솜님께 인사",
      "60-코칭-로그/20260421-화.md 열어 팀명·대표 업무·핵심 3줄만 빠르게 입력",
    ],
    best: "끝나면 스스로에게: &lsquo;오늘 한 팀이라도 &apos;할 수 있겠다&apos; 느끼게 했으면 성공&rsquo;",
  },
];

export default function SimulationPage() {
  return (
    <PageFrame kicker="Simulation" title="현장 시뮬레이션 · Scene 0~6" accent="cyan"
      subtitle="시간대별로 영상처럼 재생. 각 Scene마다 보이는 것·들리는 것·선택지·베스트 무브·함정.">
      <Callout tone="warn" title="4/20 최신 변경 반영">
        CEO 전사 타운홀로 오전 의무 참여 → 과정 시작 <strong>13:00</strong> → 13:00~15:00 Step 1~3 압축(2h) → 15:00~17:30 테크코치 2.5h · <strong>미니특강 생략</strong>
      </Callout>

      <div className="my-10 space-y-10">
        {SCENES.map((s, idx) => <SceneBlock key={s.n} s={s} idx={idx} />)}
      </div>

      <Section n={99} title="🧠 한 장 요약 — 당신이 기억할 리듬">
        <Card>
          <pre className="text-[12px] md:text-sm text-void-ink font-mono leading-[1.8] whitespace-pre-wrap">
{`도착 14:30
  → 코치 3인 스탠드업 · 도구 로그인 · 녹음 테스트
14:50~15:00 코치 싱크 (10분)
  → 담당 팀 · 미니특강 생략 대응 · Step 3 미완 팀 공유
팀1 15:00~15:27 (27분)
  → [1분 프레임워크 압축] → 민감도 → 구조화 → 데모 → 가장 먼저 시도
팀2 15:27~15:55 (28분)
  → 병렬 운영 (데모 대기 중 다른 팀 스윙바이)
팀3 15:55~16:25 (30분)
  → 어려운 팀: 구조화 대행 · 성공 경험 만들기
순회 2차 16:25~17:00 (35분)
  → 각 팀 돌아가며 Step 4 후반·Step 5 시작 점검
Step 5 마무리 17:00~17:30 (30분)
  → '가장 먼저 시도' 칸 확정 · 전체 공유 · 로그 입력`}
          </pre>
        </Card>
      </Section>

      <Section n={100} title="🎭 감정 곡선 체크포인트">
        <div className="space-y-2 text-[14px]">
          <Quote by="15:30 — 긴장">심호흡 1회, 고정멘트 신뢰.</Quote>
          <Quote by="15:40 — &lsquo;자동화!&rsquo; 외침 들림">속도 늦추기, 민감도 먼저.</Quote>
          <Quote by="16:00 — 반응 시원찮음">당황 말고 &lsquo;시간 많이 쓰는 한 단계만&rsquo; 포커스.</Quote>
          <Quote by="16:30 — 시간 모자람">&lsquo;가장 먼저 시도&rsquo; 칸 1개라도 확정하고 마무리.</Quote>
          <Quote by="17:30 — 종료">&ldquo;오늘 한 팀이라도 &lsquo;할 수 있겠다&rsquo; 느끼게 했으면 성공&rdquo;</Quote>
        </div>
      </Section>

      <Section n={101} title="현장에서 파일 열지 않고 기억할 고정 스크립트 3개">
        <Card className="border-neon-gold/40">
          <ol className="space-y-4 text-void-ink text-lg font-serif leading-[1.8]">
            <li>① &ldquo;<mark>녹음은 학습 자료로만 쓰고 이후 삭제</mark>&rdquo;</li>
            <li>② &ldquo;<mark>잘 모르겠습니다, 확인 후 안내드리겠습니다</mark>&rdquo;</li>
            <li>③ &ldquo;<mark>가장 먼저 시도해 볼 수 있는 것 하나만 오늘 정해요</mark>&rdquo;</li>
          </ol>
        </Card>
      </Section>

      <NextPrev prev={{ href: "/do-dont", label: "DO / DON'T" }} next={{ href: "/log", label: "코칭 로그" }} />
    </PageFrame>
  );
}

function SceneBlock({ s, idx }: { s: Scene; idx: number }) {
  return (
    <motion.section
      id={`scene-${s.n}`}
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: Math.min(idx * 0.05, 0.3) }}
      className="relative"
    >
      {/* Timeline rail */}
      <div className="absolute left-5 md:left-7 top-0 bottom-0 w-[2px] bg-gradient-to-b from-neon-cyan via-neon-magenta to-transparent opacity-30 hidden md:block" />
      <div className="flex gap-5 md:gap-10">
        <div className="relative shrink-0 hidden md:block">
          <div className="relative w-14 h-14 rounded-full bg-void-bg border-2 border-neon-cyan/60 flex items-center justify-center shadow-neon z-10">
            <span className="textbook-h1 text-neon-cyan text-xl">{s.n}</span>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="chip neon"><Clock className="w-3 h-3" /> {s.time}</span>
            {s.badge && <span className="chip magenta">{s.badge}</span>}
          </div>
          <h2 className="textbook-h2 text-2xl md:text-3xl text-void-ink mb-5">Scene {s.n} · {s.title}</h2>

          {s.persona && (
            <div className="void-card p-4 mb-4">
              <div className="text-[11px] uppercase tracking-[0.2em] text-neon-cyan mb-2">👥 팀 구성</div>
              <ul className="grid md:grid-cols-2 gap-x-6 gap-y-1 text-[13px] text-void-text">
                {s.persona.map((p) => (<li key={p.name}><strong className="text-void-ink">{p.name}</strong> · {p.desc}</li>))}
              </ul>
              {s.workText && <div className="mt-3 text-[13px] text-void-muted">📝 워크시트: {s.workText}</div>}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-3">
            <Card>
              <div className="flex items-center gap-2 mb-2"><Eye className="w-4 h-4 text-neon-cyan" /><div className="text-[11px] uppercase tracking-[0.2em] text-neon-cyan">보이는 것</div></div>
              <ul className="space-y-1.5 text-[13px] text-void-text list-disc pl-5">
                {s.see.map((x, i) => (<li key={i} dangerouslySetInnerHTML={{ __html: x }} />))}
              </ul>
            </Card>
            {s.hear && (
              <Card>
                <div className="flex items-center gap-2 mb-2"><Headphones className="w-4 h-4 text-neon-magenta" /><div className="text-[11px] uppercase tracking-[0.2em] text-neon-magenta">들리는 것</div></div>
                <ul className="space-y-1.5 text-[13px] text-void-text list-disc pl-5">
                  {s.hear.map((x, i) => (<li key={i} dangerouslySetInnerHTML={{ __html: x }} />))}
                </ul>
              </Card>
            )}
          </div>

          <Card className="mt-3">
            <div className="flex items-center gap-2 mb-2"><Lightbulb className="w-4 h-4 text-neon-gold" /><div className="text-[11px] uppercase tracking-[0.2em] text-neon-gold">내 무브</div></div>
            <ol className="space-y-1.5 text-[13px] text-void-text list-decimal pl-5">
              {s.moves.map((m, i) => (<li key={i} dangerouslySetInnerHTML={{ __html: m }} />))}
            </ol>
          </Card>

          <Callout tone="ok" title="✅ 베스트 무브"><span dangerouslySetInnerHTML={{ __html: s.best }} /></Callout>
          {s.trap && (
            <Callout tone="danger" title="⚠️ 함정"><span dangerouslySetInnerHTML={{ __html: s.trap }} /></Callout>
          )}
        </div>
      </div>
    </motion.section>
  );
}
