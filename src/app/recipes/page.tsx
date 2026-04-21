"use client";

import { PageFrame, Section, Card, Callout, NextPrev } from "@/components/ui";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

type Recipe = {
  id: string;
  title: string;
  situation: string;
  primary: string;
  alt: string;
  why: string;
  difficulty: "★☆☆" | "★★☆" | "★★★";
  sensitivity: "하" | "중" | "상";
  flow: string[];
  prompt?: string;
  demo: string;
  warn: string;
};

const RECIPES: Recipe[] = [
  { id: "R1", title: "대량 링크·텍스트 분류·중복 정리",
    situation: "뉴스·공시·자료 링크 30~200개를 주제별로 분류하고 중복 묶기",
    primary: "ChatGPT / Claude", alt: "Gemini", difficulty: "★☆☆", sensitivity: "하",
    why: "세팅 0분 · 긴 리스트 한 번에 분류",
    flow: ["링크를 &lsquo;제목\\tURL&rsquo; 텍스트로 모으기","분류 기준 5~7개 본인 기준으로 정의","프롬프트 붙여넣기 → 주제별 표","중요도·의견 1줄 사람이 추가"],
    prompt: `다음은 [주간 경쟁사 뉴스] 링크 목록이야.
아래 주제로 분류해: M&A / 상품·서비스 / 인사·조직 / 실적·투자 / 기술·규제
같은 사건 다루는 기사는 하나로 묶고 나머지는 보조 레퍼런스로 표시.
각 주제 안에서 "경쟁 관점에서 중요한 것부터" 정렬.
출력: 마크다운 표 (주제 / 헤드라인 / 핵심 1줄 / 대표 링크 / 보조 링크)

---
[여기에 제목+URL 붙여넣기]`,
    demo: "&ldquo;요즘 어떤 키워드로 수집하세요? 지난주 링크 10개만 복사해주시면 AI가 몇 초 만에 표로 만들어 드릴게요.&rdquo;",
    warn: "내부 전용 URL 섞이면 제거하고 넣기." },

  { id: "R2", title: "여러 문서 비교·차이 추출",
    situation: "제안서 2~3개 비교, 정책안 변경 전후, 경쟁사 약관 차이",
    primary: "Claude (웹)", alt: "ChatGPT · NotebookLM", difficulty: "★☆☆", sensitivity: "중",
    why: "긴 컨텍스트 · 비교 품질 우수",
    flow: ["문서를 텍스트로 변환 (PDF면 R5 선행)","Claude에 문서 A·B 붙여넣기 + 비교 기준","차이점 표 + 실무 리스크 Top 3 요청","중요 항목은 원문 재확인 (환각 방지)"],
    prompt: `아래 두 문서(A, B)는 [같은 주제의 제안서]야.
다음 관점으로 비교해서 마크다운 표로:
 - 범위 / 조건 / 가격 / 기간 / 위험 요소 / 특이사항
끝에 "[SKT 실무 관점에서 가장 리스크 큰 차이 3개 + 이유]"

[문서 A] (전체)
[문서 B] (전체)`,
    demo: "&ldquo;비교 기준만 고정하면 AI가 표로 일정하게 뽑아줍니다. 사람은 &lsquo;어느 리스크 먼저 볼지&rsquo; 판단만.&rdquo;",
    warn: "법적 해석은 반드시 사람 검토. 환각 가능." },

  { id: "R3", title: "사내문서 기반 Q&A (RAG)",
    situation: "사내 규정·매뉴얼·과거 리포트에서 답 찾기 반복",
    primary: "NotebookLM", alt: "Claude Projects · ChatGPT Custom GPT", difficulty: "★★☆", sensitivity: "하",
    why: "출처 인용과 함께 답 → 환각 낮음",
    flow: ["공개 가능한 문서 10~30개 NotebookLM에 업로드","&lsquo;용어 사전 만들어줘&rsquo; → 맥락 학습","질문 + 출처 문단 인용 확인","표준 FAQ로 정리 → 팀 공유"],
    demo: "&ldquo;사내 규정은 외부 업로드 불가니 공개 정책 문서로 먼저. 3개 PDF 넣으면 출처까지 달아 답변합니다.&rdquo;",
    warn: "사내 규정 원문 외부 업로드 금지. 공개 문서/마스킹본만." },

  { id: "R4", title: "회의 녹음·영상 → 요약·액션아이템",
    situation: "1시간 회의에서 키워드·결정·액션 뽑기 매주 반복",
    primary: "Google AI Studio (Gemini)", alt: "Whisper STT → Claude", difficulty: "★★☆", sensitivity: "중",
    why: "영상/오디오 네이티브 이해 · 화자 구분",
    flow: ["녹음 파일을 Google AI Studio에 업로드","프롬프트: 화자별 요약+합의/미결/액션 분리","회의록 템플릿에 붙여넣고 사람 검증","액션은 캘린더/태스크로 연결"],
    prompt: `이 회의는 [SKT 주간 전략 회의]야.
1. 3줄 요약
2. 합의사항
3. 미결·보류 (이유)
4. 액션 아이템 (담당/마감/성공기준)
5. 키워드 Top 10`,
    demo: "&ldquo;투자자 미팅 녹화 하나 넣으면 수 분 만에 OX표가 자동으로 채워집니다.&rdquo;",
    warn: "개인정보·민감 발언 포함 시 사내 정책 확인." },

  { id: "R5", title: "PDF·이미지·HWP → 구조화 텍스트",
    situation: "스캔 PDF·HWP 때문에 AI에 못 넣음",
    primary: "사이오닉 AI", alt: "Claude Vision · Adobe Acrobat", difficulty: "★☆☆", sensitivity: "하",
    why: "한글·표·도면 강함, 마크다운 출력",
    flow: ["원본 업로드 → OCR → 마크다운","표·제목 구조 훑어 확인","Claude/ChatGPT에 넣어 본 작업","원문 재확인 지점 표시"],
    demo: "&ldquo;엑셀/PDF가 분석 안 된다는 건 &lsquo;정제 전에 분석&rsquo;해서. 먼저 마크다운으로 바꾸고 분석하면 결과가 달라집니다.&rdquo;",
    warn: "개인정보 포함 문서는 마스킹 후 업로드." },

  { id: "R6", title: "엑셀/CSV 데이터 분석",
    situation: "매출·지표 데이터 피벗·이상치·그래프",
    primary: "ChatGPT Data Analyst", alt: "Claude · Google Sheets+Gemini", difficulty: "★★☆", sensitivity: "중",
    why: "pandas 자동 생성·실행·시각화 한 큐",
    flow: ["헤더 정리된 CSV로 만들기","컬럼 설명 + 분석 목적 + 원하는 그래프","결과+해설+재사용 파이썬 코드 받기","다음 주엔 코드만 재실행"],
    prompt: `[컬럼 설명]
- 날짜(일), 상품코드, 채널, 매출, 수량
[분석 목적]
- 전주 대비 상품별 매출 증감 Top 10
- 채널별 기여도 변화
[원하는 결과]
- 표 1 + 막대그래프 2 + 2줄 해설
- 재사용 가능한 Python 스크립트`,
    demo: "&ldquo;헤더만 깔끔하게 맞추면, 분석 결과+재사용 코드까지. 다음 주엔 코드만 돌리시면 돼요.&rdquo;",
    warn: "실매출·고객 데이터는 민감도 상 → R9로 전환." },

  { id: "R7", title: "문서 초안(메일·보고서) 생성",
    situation: "같은 형식 문서를 매번 처음부터 쓰는 중",
    primary: "Claude", alt: "ChatGPT · Gemini", difficulty: "★☆☆", sensitivity: "하",
    why: "한국어 어조·논리 구조 · 여러 안 품질 우수",
    flow: ["잘 쓴 샘플 1~2건을 톤 레퍼런스로","핵심 팩트·수치·배경만 bullet","&lsquo;안 2~3개&rsquo; 요청 → 사람은 택1·수정","패턴을 프롬프트 템플릿으로 저장"],
    prompt: `다음 톤/구조로 [주간 동향 보고 시사점 섹션]을 써줘.

[톤 레퍼런스 — 지난주 채택된 버전]
(원문 붙여넣기)

[이번 주 팩트]
- 경쟁사 A: 신상품 발표
- 규제: 요금 공시 개정안
- 내부 가정: 전략 초점은 B2B

요청: 시사점 2~3안 서로 다른 관점(공격/방어/관망), 각 3문단 이내`,
    demo: "&ldquo;&lsquo;잘 써줘&rsquo;하면 뻔한 글. 톤 샘플 + 팩트 + 여러 관점 요청 이 세 가지가 핵심입니다.&rdquo;",
    warn: "수치·고유명사는 반드시 사람 재확인. 환각 지점." },

  { id: "R8", title: "반복 워크플로우 자동화",
    situation: "매주 같은 순서 수집·정리·발송 반복",
    primary: "n8n", alt: "Make · Zapier · Apps Script", difficulty: "★★☆", sensitivity: "중",
    why: "노코드 트리거→API→LLM→메일 연결",
    flow: ["현재 수작업을 7단계 이하로 그리기","각 단계 API 있는지/수동인지 표시","API 있는 것만 자동화, 판단은 사람 승인 노드","n8n MVP → 2주 운영 → 개선"],
    demo: "&ldquo;오늘 만들기는 어렵지만, 매주 똑같으면 일주일 투자로 가능. 판단 구간엔 사람 승인 노드 필수.&rdquo;",
    warn: "사내망 자동화는 별도 주제 → &lsquo;확인 후 안내&rsquo;." },

  { id: "R9", title: "민감 데이터 → AI로 코드만",
    situation: "데이터는 외부 AI 금지, 로직은 AI 도움",
    primary: "ChatGPT/Claude (코드 생성)", alt: "Claude Code", difficulty: "★★☆", sensitivity: "상",
    why: "데이터 밖으로 안 나감 · 방법론·코드만 AI",
    flow: ["더미/가상 데이터(컬럼명+샘플 3줄)만 AI에 공유","&lsquo;이 구조에서 [목적] 하는 파이썬/엑셀 함수&rsquo;","사내망 노트북/엑셀에 코드 붙여 실행","에러 메시지만 공유하며 재질문"],
    prompt: `다음은 사내 데이터 구조야 (실데이터 아님, 샘플):
컬럼: 고객ID / 가입일 / 요금제 / 월매출 / 이탈여부

요청:
- 이탈 위험 고객 찾는 파이썬 스크립트 (pandas)
- 규칙 기반 + 간단한 로지스틱 회귀 2가지
- 사내망에서 오프라인 실행 가정 (외부 API 금지)`,
    demo: "&ldquo;민감 데이터는 절대 업로드 X. 샘플 구조만 주고 코드를 받아 사내에서 돌리는 거예요. 가장 많이 쓰시는 패턴.&rdquo;",
    warn: "사내 tool 관련 질문은 박준에게 에스컬레이션." },

  { id: "R10", title: "복잡한 다단계 작업 → 에이전트",
    situation: "수집→정제→분석→보고까지 여러 도구가 엮인 큰 작업",
    primary: "Claude Code", alt: "GPT Custom Actions · LangChain", difficulty: "★★★", sensitivity: "중",
    why: "에이전트 팀이 역할 분담 · 이어서 자율 실행",
    flow: ["에이전트 역할로 분해 (수집가/정제가/분석가/작성가)","각 에이전트 입·출력 계약처럼 정의","파일시스템을 공유 메모리","사람은 관문에서 검토·승인만"],
    demo: "&ldquo;오늘 직접 하기보단 &lsquo;이런 구조가 가능하다&rsquo;만 기억. 업무가 이어지면 AI 팀을 꾸려 릴레이 실행하는 방식이 있습니다.&rdquo;",
    warn: "기대치 관리. &lsquo;가능성 예고&rsquo; 정도로." },
];

export default function RecipesPage() {
  const [openId, setOpenId] = useState<string | null>("R1");
  return (
    <PageFrame kicker="Recipes" title="상황별 AI 툴 레시피 · R1~R10" accent="magenta"
      subtitle="현장에서 실무자 한마디에 꺼낼 수 있는 10개 조합. 카드를 클릭해 펼치면 흐름·프롬프트·30초 대본·주의점이 보인다.">
      <Section n={1} title="상황 → 레시피 매칭표">
        <Card>
          <ul className="space-y-2 text-[14px]">
            {[
              [`"URL·뉴스·링크 잔뜩 분류 힘들어요"`, "R1"],
              [`"문서 여러 개 비교 반복이에요"`, "R2"],
              [`"사내 규정·매뉴얼 답 찾기 오래"`, "R3"],
              [`"회의 녹음·영상에서 키워드 뽑기"`, "R4"],
              [`"PDF·이미지·HWP라 못 넣어요"`, "R5"],
              [`"엑셀 분석·피벗·시각화 오래"`, "R6"],
              [`"보고서·메일 초안 쓰는 시간 길어요"`, "R7"],
              [`"매주 반복 루틴 자동화"`, "R8"],
              [`"민감 데이터라 외부 AI 못 올려요"`, "R9"],
              [`"단계 많은 복잡한 작업"`, "R10"],
            ].map(([s, id]) => (
              <li key={id} className="flex items-center justify-between gap-3 py-2 border-b border-void-line last:border-0">
                <span className="text-void-text">{s}</span>
                <button onClick={() => { setOpenId(id); document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); }} className="chip neon hover:shadow-neon">{id}</button>
              </li>
            ))}
          </ul>
        </Card>
      </Section>

      <Section n={2} title="레시피 상세">
        <div className="space-y-3">
          {RECIPES.map((r) => {
            const open = openId === r.id;
            return (
              <motion.div key={r.id} id={r.id} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <div className="void-card">
                  <button onClick={() => setOpenId(open ? null : r.id)} className="w-full p-5 flex items-center justify-between gap-3 text-left">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-sm text-neon-magenta">{r.id}</span>
                        <span className="chip gold">{r.difficulty}</span>
                        <span className={`chip ${r.sensitivity === "하" ? "lime" : r.sensitivity === "중" ? "gold" : "red"}`}>민감도 {r.sensitivity}</span>
                      </div>
                      <div className="textbook-h2 text-void-ink text-lg">{r.title}</div>
                      <p className="text-[12px] text-void-muted truncate">{r.situation}</p>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-void-muted shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {open && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="px-5 pb-5 border-t border-void-line">
                          <div className="grid md:grid-cols-3 gap-3 mt-4">
                            <div><div className="text-[10px] uppercase tracking-[0.25em] text-neon-cyan mb-1">1순위</div><div className="text-void-ink text-sm">{r.primary}</div></div>
                            <div><div className="text-[10px] uppercase tracking-[0.25em] text-neon-gold mb-1">대안</div><div className="text-void-text text-sm">{r.alt}</div></div>
                            <div><div className="text-[10px] uppercase tracking-[0.25em] text-neon-magenta mb-1">왜 이거</div><div className="text-void-text text-sm">{r.why}</div></div>
                          </div>
                          <div className="mt-5">
                            <div className="text-[11px] uppercase tracking-[0.2em] text-neon-cyan mb-2">작업 흐름</div>
                            <ol className="space-y-1.5 text-[13px] text-void-text">
                              {r.flow.map((f, i) => <li key={i}>{i + 1}. <span dangerouslySetInnerHTML={{ __html: f }} /></li>)}
                            </ol>
                          </div>
                          {r.prompt && (
                            <div className="mt-5">
                              <div className="text-[11px] uppercase tracking-[0.2em] text-neon-lime mb-2">프롬프트 템플릿</div>
                              <pre className="bg-[#0a0c12] border border-void-line rounded-lg p-3 text-[12px] text-void-ink overflow-x-auto font-mono whitespace-pre-wrap">{r.prompt}</pre>
                            </div>
                          )}
                          <Callout tone="info" title="30초 시연 대본">
                            <span dangerouslySetInnerHTML={{ __html: r.demo }} />
                          </Callout>
                          <Callout tone="warn" title="주의">{r.warn}</Callout>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Section>

      <NextPrev prev={{ href: "/framework", label: "프레임워크" }} next={{ href: "/scenarios", label: "실전 시연 A/B/C" }} />
    </PageFrame>
  );
}
