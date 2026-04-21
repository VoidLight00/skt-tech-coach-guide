"use client";

import { PageFrame, Section, Card, Callout, NextPrev } from "@/components/ui";
import { motion } from "framer-motion";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

type Member = { name: string; team: number; lead?: boolean };
type Table = {
  id: string;
  topic: string;
  subtopic?: string;
  teams: string[];
  members: Member[];
  sensitivity: "하" | "중" | "상" | "혼합";
  asIs: string;
  recipes: { id: string; why: string }[];
  prep: string[];
  questions: string[];
  pitfall: string;
};

const TEAMS = [
  { n: 1, name: "SV추진팀" },
  { n: 2, name: "CX운영팀" },
  { n: 3, name: "Billing팀" },
  { n: 4, name: "고객Care팀" },
  { n: 5, name: "고객Insight팀" },
];

const TABLES: Table[] = [
  {
    id: "T1",
    topic: "앱 디지털 접근성 진단",
    subtopic: "사회공헌 / 자원봉사 트렌드 조사",
    teams: ["SV추진팀"],
    members: [
      { name: "송석근", team: 1 }, { name: "민혜진", team: 1, lead: true },
      { name: "김동우", team: 1 }, { name: "김홍규", team: 1 },
      { name: "정해금", team: 1 }, { name: "조원배", team: 1 },
    ],
    sensitivity: "하",
    asIs: "SKT 앱과 디지털 서비스의 접근성(고령자·장애인 포함)을 점검하고, 사회공헌·자원봉사 영역의 외부 트렌드를 수집해 내부 전략에 반영한다. 웹·앱 UI, 정책 가이드라인, 해외 사례까지 수집 대상이 넓다.",
    recipes: [
      { id: "R1", why: "해외·국내 접근성 기사, WCAG 가이드라인, 자원봉사 트렌드 링크를 주제로 묶는다" },
      { id: "R3", why: "접근성 가이드라인(WCAG, KWCAG) 원문을 NotebookLM에 올려 사내 용어로 질의한다" },
      { id: "R2", why: "국내 통신3사·해외 사례의 접근성 정책을 비교 표로 뽑는다" },
    ],
    prep: [
      "공개 레퍼런스: WCAG 2.2 (w3.org), KWCAG 2.2, 과기정통부 장애인 정보접근성 실태조사 보고서",
      "NotebookLM에 위 문서 3–5개만 미리 업로드해 시연 준비",
      "자원봉사 트렌드 예시 기사 10건 북마크 → R1 시연용",
    ],
    questions: [
      "현재 접근성 진단을 주기적으로 하시나요? 주기는?",
      "진단 체크리스트가 문서화되어 있나요, 아니면 담당자 감으로 하시나요?",
      "사회공헌 트렌드는 어떤 경로로 수집하시는지 (보고서·뉴스·SNS)?",
    ],
    pitfall: "여섯 명이라 목소리가 엇갈리기 쉽다. 대표자(민혜진 님) 중심으로 말의 흐름을 정리하고, 나머지 분들께도 한 번씩 질문을 돌린다.",
  },
  {
    id: "T2",
    topic: "VOC (Voice of Customer)",
    teams: ["고객Care팀"],
    members: [
      { name: "곽승표", team: 4 }, { name: "변동희", team: 4 },
      { name: "안남무", team: 4 }, { name: "이상민", team: 4, lead: true },
    ],
    sensitivity: "중",
    asIs: "고객이 남긴 VOC(콜, 챗, 앱 리뷰, 커뮤니티 등)를 수집·분류·정량화해 주간·월간 리포트로 만든다. 불만 유형, 긴급도, 처리 결과를 기준으로 본다.",
    recipes: [
      { id: "R1", why: "다양한 채널의 VOC 원문을 유형으로 자동 분류" },
      { id: "R6", why: "VOC 수치 데이터를 AI가 피벗·추이 분석" },
      { id: "R9", why: "고객 발화 실데이터는 민감 → 구조만 공유하고 코드 받아 사내 실행" },
      { id: "R4", why: "콜 녹취가 있다면 Gemini로 요약·액션 추출" },
    ],
    prep: [
      "가상의 VOC 20건(공개 가능한 예시) 만들어두기 — R1 즉석 분류 시연",
      "VOC 분류 8유형을 본인 기준으로 한 번 정의 → 프롬프트에 박을 수 있게",
      "R9 더미 데이터 구조(컬럼: 일자·채널·키워드·감정·처리결과) 준비",
    ],
    questions: [
      "VOC 수치 중 개인정보·내부 상담원ID 등이 포함되어 있나요?",
      "현재 분류는 규칙 기반인가요, 담당자 판단인가요?",
      "주간 리포트에 매번 같은 구조로 시사점을 쓰시나요?",
    ],
    pitfall: "이상민 대표님(Bold) 중심으로 대화가 흘러가지만, 데이터는 곽승표·변동희 님이 더 잘 알 수 있다. 실무 현황을 물을 땐 시선을 옆으로 돌린다.",
  },
  {
    id: "T3",
    topic: "인사이트 기획조사 및 대외보고 자료 작성",
    teams: ["고객Insight팀"],
    members: [
      { name: "최고은", team: 5 }, { name: "강영하", team: 5 },
      { name: "박정우", team: 5 }, { name: "최금아", team: 5 },
    ],
    sensitivity: "중",
    asIs: "시장·고객 인사이트를 조사해 사내·대외(보도자료·컨퍼런스·IR 참고자료 등) 보고자료로 가공한다. 조사 설계, 데이터 수집, 해석, 문서화까지 담당.",
    recipes: [
      { id: "R7", why: "보고서 섹션별 초안(여러 안)을 톤 맞춰 생성" },
      { id: "R2", why: "기존 보고서와 새 버전을 비교해 누락·변동 추출" },
      { id: "R3", why: "과거 보고서 아카이브를 NotebookLM 프로젝트로 — 자기 팀의 표현을 AI가 학습" },
      { id: "R1", why: "외부 시장 기사를 주제별 클러스터링" },
    ],
    prep: [
      "지난 분기 대외보고 자료 1건을 '톤 레퍼런스'로 미리 마스킹",
      "내부 발표용 vs 대외용 톤의 차이를 한 줄로 정리 — 프롬프트에 넣기 위함",
      "Claude Projects에 샘플 톤 레퍼런스 넣어 시연 준비",
    ],
    questions: [
      "대외보고와 사내보고에서 톤이 얼마나 달라지나요?",
      "조사 데이터 중 대외 공개 가능 범위가 정해져 있나요?",
      "지금 초안 쓰는 시간이 가장 오래 걸리는 단계는 어디인가요?",
    ],
    pitfall: "'AI가 글 써주면 퀄리티 낮아요' 반응이 나오기 쉽다. 톤 레퍼런스 + 팩트 + 여러 안 요청의 세 가지가 핵심임을 보여준다.",
  },
  {
    id: "T4",
    topic: "현장 / 고객 Voice 분석과 활용",
    subtopic: "수납실적 보고",
    teams: ["CX운영팀", "Billing팀"],
    members: [
      { name: "김창현", team: 2 }, { name: "김태훈", team: 2, lead: true },
      { name: "신일우", team: 3 }, { name: "김일영", team: 3, lead: true },
    ],
    sensitivity: "상",
    asIs: "현장 상담·고객 Voice의 정성 데이터를 분석하고, Billing 측면에서는 수납실적을 주기적으로 집계·보고한다. 실매출·납부 데이터가 섞여 있어 보안 등급이 높다.",
    recipes: [
      { id: "R9", why: "수납·매출 실데이터는 외부 AI 금지 → 구조만 공유, 파이썬 스크립트 받아 사내 실행" },
      { id: "R6", why: "공개 가능한 더미로 이상치·추이 분석 시연" },
      { id: "R4", why: "현장 Voice 녹음·영상이 있다면 Gemini로 요약" },
      { id: "R8", why: "주간 수납실적 보고 루틴을 n8n으로 반복화 (사내 환경 확인 전제)" },
    ],
    prep: [
      "R9 더미 컬럼 구조 2세트: (A) 수납실적 — 고객ID·요금제·청구액·납부일·연체일수 / (B) 현장 Voice — 날짜·상담원·고객유형·주제·이슈",
      "더미 데이터로 ChatGPT Data Analyst 이상치 탐지 스크립트 1회 실행 → 성공 스크린샷",
      "CX운영팀·Billing팀 두 도메인이 섞인 팀이라 주제 구분을 먼저 묻는 도입 준비",
    ],
    questions: [
      "두 팀이 같은 주제를 공유하시는 건가요, 각자 다른 업무를 가져오셨나요?",
      "수납 데이터는 어디까지 공개 가능한 수준인가요?",
      "현장 상담 음성은 녹취 보관 기간·사용 정책이 정해져 있나요?",
    ],
    pitfall: "두 팀이 섞여 있어 '우리 업무가 뭐냐'로 시작할 수 있다. 대표 두 명(김태훈·김일영)께 각자 한 줄 정의를 먼저 받아 공동 업무의 접점을 찾는다.",
  },
  {
    id: "T5",
    topic: "AICC (AI Contact Center)",
    teams: ["고객Care팀"],
    members: [
      { name: "김진수", team: 4 }, { name: "박용준", team: 4 },
      { name: "이희경", team: 4 }, { name: "오승민", team: 4 },
    ],
    sensitivity: "상",
    asIs: "AI 상담(음성봇·챗봇) 운영. 인입 로그, 상담 품질, 이탈·실패 케이스, 엔진 튜닝이 업무 영역. 상담 음성·챗 원문은 민감도 최상.",
    recipes: [
      { id: "R9", why: "상담 원문·음성은 외부 AI 금지. 방법론·품질지표 계산 코드만 받아 사내 실행" },
      { id: "R4", why: "공개 가능한 FAQ 기반 음성 샘플로 Gemini STT·요약 흐름 시연" },
      { id: "R10", why: "인입→분류→답변→품질점검까지 에이전트 릴레이 구조 소개 (가능성만)" },
      { id: "R2", why: "프롬프트 A/B 비교 — 답변 톤·정확도 차이를 표로" },
    ],
    prep: [
      "AICC 공개 지표 예시(FCR, AHT, CSAT) 정의 1페이지로 정리",
      "R9 더미 로그 구조: 일자·문의유형·봇응답·핸드오프여부·CSAT",
      "Claude Code 에이전트 구조 다이어그램 스크린샷 1장 — R10 예고용",
    ],
    questions: [
      "현재 봇 답변 품질은 어떤 지표로 평가하시나요?",
      "핸드오프(상담원 연결) 판단은 규칙 기반인가요, 모델 기반인가요?",
      "상담 음성 로그는 외부 환경에 접근할 수 있는 형태가 있나요?",
    ],
    pitfall: "AICC 팀은 이미 AI 깊게 다룬다. '기본 LLM 쓰세요'는 실례. 대신 그들이 덜 파본 영역(프롬프트 A/B 실험, 에이전트 구조, 평가 자동화)으로 대화를 끈다.",
  },
  {
    id: "T6",
    topic: "미디어 / 트렌드 모니터링 및 고객 인싸그랜 컨텐츠 운영",
    subtopic: "고객조사 기획 및 데이터 분석",
    teams: ["고객Insight팀"],
    members: [
      { name: "이승훈", team: 5 }, { name: "윤영란", team: 5, lead: true },
      { name: "홍종혁", team: 5 }, { name: "서성실", team: 5 },
      { name: "김강", team: 5 },   { name: "이지윤", team: 5 },
    ],
    sensitivity: "하",
    asIs: "미디어·소셜 트렌드를 모니터링하고, 인스타그램·그랜드 컨텐츠 운영을 담당한다. 고객조사의 기획과 분석도 이 팀. 다뤄야 하는 채널이 많고, 정량·정성 혼재.",
    recipes: [
      { id: "R1", why: "여러 채널에서 수집한 트렌드 링크를 주제·감정·규모로 클러스터링" },
      { id: "R4", why: "경쟁 브랜드 인스타·유튜브 캠페인 영상 → Gemini 요약·카피 요소 추출" },
      { id: "R6", why: "고객조사 응답 CSV → AI 분석·시각화" },
      { id: "R7", why: "컨텐츠 카피 여러 안 생성 (브랜드 톤 레퍼런스 포함)" },
    ],
    prep: [
      "SNS 공개 영상 1개 미리 준비 → Gemini에 넣어 카피·훅 추출 시연",
      "고객조사 샘플 CSV 20행 (컬럼: 연령·성별·응답·만족도) — ChatGPT Data Analyst 투입용",
      "브랜드 카피 톤 예시 3건을 Claude Projects로 저장",
    ],
    questions: [
      "트렌드 모니터링의 최종 산출물은 무엇인가요 (리포트·피드·슬랙)?",
      "'고객 인싸그랜' 콘텐츠의 성과는 어떤 지표로 보시나요?",
      "고객조사 응답 중 원문이 민감한 건 어떤 카테고리인가요?",
    ],
    pitfall: "여섯 명 팀이고 업무 스펙트럼이 넓다. 첫 3분에 '오늘 어느 주제를 다룰지' 한 개를 고르게 하고 들어간다. 안 그러면 다 얕게 훑고 끝난다.",
  },
];

export default function TeamsPage() {
  return (
    <PageFrame
      eyebrow="01a · Room 2 팀 배치"
      title="7개 테이블, 다섯 팀, 서른 명."
      lede="참석 팀과 주제, 대표자, 그리고 각 테이블에 들어가기 전에 손에 쥐고 있으면 좋을 준비물을 정리했다. 앉기 전에 이 페이지만 열어도 첫 1분이 달라진다."
    >
      <Section n={1} title="참석 팀">
        <div className="flex flex-wrap gap-2">
          {TEAMS.map((t) => (
            <span key={t.n} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-ink-200 dark:border-ink-800 bg-paper dark:bg-ink-800/30 text-[13px] text-ink-700 dark:text-ink-200">
              <span className="font-mono text-[11px] text-brand">{t.n}</span>
              {t.name}
            </span>
          ))}
        </div>
      </Section>

      <Section n={2} title="테이블 한눈에">
        <Card hover={false}>
          <table className="w-full table-brand">
            <thead>
              <tr><th className="text-left">#</th><th className="text-left">주제</th><th className="text-left">팀</th><th className="text-left">인원</th><th className="text-left">민감도</th></tr>
            </thead>
            <tbody>
              {TABLES.map((t, i) => (
                <tr key={t.id}>
                  <td className="font-mono text-brand text-[13px]">{String(i + 1).padStart(2, "0")}</td>
                  <td>
                    <a href={`#${t.id}`} className="text-ink-900 dark:text-ink-50 hover:text-brand font-semibold">{t.topic}</a>
                    {t.subtopic && <div className="text-[12px] text-ink-500 italic">+ {t.subtopic}</div>}
                  </td>
                  <td className="text-[13px] text-ink-700 dark:text-ink-200">{t.teams.join(" · ")}</td>
                  <td className="text-[13px] text-ink-700 dark:text-ink-200">{t.members.length}명</td>
                  <td className="text-[13px]">{t.sensitivity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
        <Callout>
          담당 테이블이 박준 코치로부터 확정되면, 해당 블록으로 바로 내려가 사전 준비 체크리스트만 재확인하면 됩니다.
        </Callout>
      </Section>

      <Section n={3} title="테이블별 상세">
        <div className="space-y-10">
          {TABLES.map((t, i) => (
            <motion.div key={t.id} id={t.id}
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.4 }}
              className="scroll-mt-24"
            >
              <TableBlock t={t} n={i + 1} />
            </motion.div>
          ))}
        </div>
      </Section>

      <Section n={4} title="담당 테이블을 아직 모를 때 하는 일">
        <Card>
          <p className="text-[14px] text-ink-700 dark:text-ink-200 leading-relaxed mb-3">
            7개 테이블 전부를 준비하긴 어렵다. 대신 이렇게 나눈다.
          </p>
          <ol className="space-y-2 text-[14px] text-ink-700 dark:text-ink-200 list-decimal pl-5 leading-relaxed">
            <li>민감도 ‘상’ 테이블 두 개(T4 현장 Voice·수납실적, T5 AICC)는 <Link href="/recipes#R9" className="text-brand hover:underline">R9 더미 데이터 구조</Link>를 반드시 손에 쥔다.</li>
            <li>민감도 ‘하’ 테이블 두 개(T1 접근성, T6 트렌드 모니터링)는 <Link href="/recipes#R1" className="text-brand hover:underline">R1 링크 클러스터링</Link>과 <Link href="/recipes#R4" className="text-brand hover:underline">R4 영상 요약</Link> 데모를 준비한다.</li>
            <li>민감도 ‘중’ 테이블 두 개(T2 VOC, T3 인사이트 기획조사)는 <Link href="/recipes#R7" className="text-brand hover:underline">R7 초안 생성</Link>과 <Link href="/recipes#R2" className="text-brand hover:underline">R2 비교</Link>가 중심.</li>
            <li>어느 테이블로 가더라도 공통으로 쓰이는 것은 <Link href="/script" className="text-brand hover:underline">진입 스크립트</Link>와 <Link href="/framework" className="text-brand hover:underline">프레임워크</Link>다. 이 둘은 언제든 입에 붙어 있어야 한다.</li>
          </ol>
        </Card>
      </Section>

      <NextPrev prev={{ href: "/today", label: "당일 실행플랜" }} next={{ href: "/script", label: "진입 스크립트" }} />
    </PageFrame>
  );
}

function TableBlock({ t, n }: { t: Table; n: number }) {
  const sensColor = t.sensitivity === "상" ? "text-red-500" : t.sensitivity === "중" ? "text-brand" : t.sensitivity === "혼합" ? "text-ink-500" : "text-emerald-500";
  return (
    <div className="border-t border-ink-200 dark:border-ink-800 pt-6">
      <div className="flex items-baseline gap-3 mb-2 flex-wrap">
        <span className="font-mono text-[12px] text-brand">테이블 {String(n).padStart(2, "0")}</span>
        <span className={`text-[12px] font-semibold ${sensColor}`}>민감도 {t.sensitivity}</span>
      </div>
      <h3 className="serif-kr text-[24px] md:text-[28px] font-bold tracking-tight text-ink-900 dark:text-ink-50 mb-1">{t.topic}</h3>
      {t.subtopic && <p className="text-[13px] text-ink-500 italic mb-3">+ {t.subtopic}</p>}
      <p className="text-[13.5px] text-ink-600 dark:text-ink-300 mb-5">{t.teams.join(" · ")}</p>

      <Card hover={false} className="mb-4">
        <div className="text-[11px] uppercase tracking-[0.18em] text-brand font-semibold mb-3">참석자</div>
        <div className="flex flex-wrap gap-2">
          {t.members.map((m) => (
            <span key={m.name} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[13px] ${m.lead ? "border-brand bg-brand-50 text-brand dark:bg-[rgba(255,107,53,0.1)] font-semibold" : "border-ink-200 dark:border-ink-800 text-ink-700 dark:text-ink-200"}`}>
              <span className="font-mono text-[10.5px] opacity-70">{m.team}</span>
              {m.name}
              {m.lead && <span className="text-[10px]">대표</span>}
            </span>
          ))}
        </div>
      </Card>

      <Card hover={false} className="mb-4">
        <div className="text-[11px] uppercase tracking-[0.18em] text-brand font-semibold mb-2">업무 추정 (As-Is)</div>
        <p className="text-[14px] text-ink-700 dark:text-ink-200 leading-relaxed">{t.asIs}</p>
      </Card>

      <Card hover={false} className="mb-4">
        <div className="text-[11px] uppercase tracking-[0.18em] text-brand font-semibold mb-3">어떤 레시피가 맞는가</div>
        <ul className="space-y-2">
          {t.recipes.map((r) => (
            <li key={r.id} className="flex items-start gap-3 text-[13.5px]">
              <Link href={`/recipes#${r.id}`} className="font-mono text-brand font-bold shrink-0 w-10 hover:underline inline-flex items-center gap-1">
                {r.id}<ExternalLink className="w-3 h-3" />
              </Link>
              <span className="text-ink-700 dark:text-ink-200 leading-relaxed">{r.why}</span>
            </li>
          ))}
        </ul>
      </Card>

      <div className="grid md:grid-cols-2 gap-3">
        <Card hover={false}>
          <div className="text-[11px] uppercase tracking-[0.18em] text-brand font-semibold mb-2">사전 준비</div>
          <ul className="space-y-1.5 text-[13.5px] text-ink-700 dark:text-ink-200 list-disc pl-5 leading-relaxed">
            {t.prep.map((p, i) => <li key={i}>{p}</li>)}
          </ul>
        </Card>
        <Card hover={false}>
          <div className="text-[11px] uppercase tracking-[0.18em] text-brand font-semibold mb-2">앉자마자 던질 질문</div>
          <ol className="space-y-1.5 text-[13.5px] text-ink-700 dark:text-ink-200 list-decimal pl-5 leading-relaxed">
            {t.questions.map((q, i) => <li key={i}>{q}</li>)}
          </ol>
        </Card>
      </div>

      <Callout title="놓치기 쉬운 곳">{t.pitfall}</Callout>
    </div>
  );
}
