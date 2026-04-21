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
  { id: "R1", title: "수십 개의 링크를 주제별로 정리한다",
    situation: "뉴스·공시·자료 링크 삼십에서 이백 개를 주제로 묶고, 같은 사건 다룬 글을 하나로 합친다",
    primary: "ChatGPT · Claude", alt: "Gemini", difficulty: "★☆☆", sensitivity: "하",
    why: "세팅 없이 긴 리스트를 한 번에 분류해낸다",
    flow: ["링크를 제목과 URL 쌍의 텍스트로 모은다","주제 다섯에서 일곱 개를 팀의 기준으로 먼저 정의한다","프롬프트를 붙여 넣고 주제별 표로 받는다","중요도와 한 줄 의견은 사람이 덧붙인다"],
    prompt: `다음은 주간 경쟁사 뉴스 링크 목록이야.
아래 주제로 분류해줘.
 - M&A · 상품 및 서비스 · 인사 및 조직 · 실적 및 투자 · 기술 및 규제
같은 사건을 다루는 기사는 하나로 묶고, 나머지는 보조 레퍼런스로 표시해.
각 주제 안에서 경쟁 관점에서 중요한 것부터 정렬해.
출력은 마크다운 표로. 주제, 헤드라인, 핵심 한 줄, 대표 링크, 보조 링크 순.

[여기에 제목과 URL을 붙여 넣기]`,
    demo: "요즘 어떤 키워드로 수집하시나요. 지난주 링크 열 개만 복사해 주시면, 몇 초 만에 표로 내어 보여드릴게요.",
    warn: "내부 전용 URL이 섞여 있다면 업로드 전에 걸러낸다." },

  { id: "R2", title: "두 문서의 차이를 표로 뽑는다",
    situation: "제안서 두세 개, 정책 개정 전후, 경쟁사 약관을 나란히 놓고 다른 점을 찾는다",
    primary: "Claude", alt: "ChatGPT · NotebookLM", difficulty: "★☆☆", sensitivity: "중",
    why: "긴 문맥을 이해하고 비교의 품질이 가장 안정적이다",
    flow: ["문서를 텍스트로 먼저 바꾼다. 스캔본이면 R5로 먼저 간다","비교 기준을 명시하고, 두 문서 전체를 붙여 넣는다","차이점 표와 함께 실무 관점의 위험 세 가지를 요청한다","핵심 항목은 원문을 다시 확인하여 오해석을 걸러낸다"],
    prompt: `아래 두 문서 A와 B는 같은 주제를 다룬다.
범위, 조건, 가격, 기간, 위험 요소, 특이사항 관점으로 비교해 마크다운 표로 정리해줘.
마지막에 SKT 실무 관점에서 가장 리스크가 큰 차이 세 가지와 그 이유를 덧붙여줘.

[문서 A]
(전문)

[문서 B]
(전문)`,
    demo: "비교 기준만 고정해 두면, AI가 표를 일정한 모양으로 꾸준히 뽑아 줍니다. 사람은 어느 차이를 먼저 볼지만 결정하시면 됩니다.",
    warn: "법적 해석은 반드시 사람이 다시 본다. 환각의 여지가 있다." },

  { id: "R3", title: "사내 문서 위에 Q&A를 얹는다",
    situation: "사내 규정과 매뉴얼에서 같은 답을 반복해서 찾고 있다",
    primary: "NotebookLM", alt: "Claude Projects · ChatGPT Custom GPT", difficulty: "★★☆", sensitivity: "하",
    why: "답마다 출처 문단이 인용되어 환각이 적다",
    flow: ["공개 가능한 문서 십에서 삼십 개를 업로드한다","용어 사전을 먼저 만들어 맥락을 잡는다","질문을 던지며 출처 문단을 함께 확인한다","반복 질문은 표준 FAQ로 정리해 팀에 공유한다"],
    demo: "사내 규정은 외부 업로드가 어려우니 공개 정책 문서로 먼저 보여드릴게요. PDF 세 개만 넣어도 출처까지 달린 답이 나옵니다.",
    warn: "사내 규정의 원문을 외부 도구에 올리지 않는다. 공개본이나 요약·마스킹본만 쓴다." },

  { id: "R4", title: "회의 녹음에서 결정과 액션을 뽑는다",
    situation: "한 시간짜리 회의에서 키워드와 합의, 액션 아이템을 매주 손으로 정리한다",
    primary: "Google AI Studio (Gemini)", alt: "Whisper STT 뒤 Claude", difficulty: "★★☆", sensitivity: "중",
    why: "영상과 음성을 네이티브로 이해하고 화자도 구분한다",
    flow: ["녹음 파일을 업로드한다","화자별 요약과 합의·미결·액션을 분리하도록 프롬프트를 건다","받은 결과를 회의록 템플릿에 붙이고 이름과 날짜를 다시 본다","액션은 캘린더와 태스크로 바로 연결한다"],
    prompt: `이 회의는 SKT 주간 전략 회의야.
다음 형식으로 정리해줘.
1. 세 줄 요약
2. 합의사항
3. 미결과 보류 그리고 그 이유
4. 액션 아이템을 담당, 마감, 성공 기준으로 표에 담아줘
5. 등장한 핵심 키워드 상위 열 개`,
    demo: "투자자 미팅 녹화 하나를 넣으면, 질문과 대답이 자동으로 정리되고 OX표까지 몇 분 안에 채워집니다.",
    warn: "개인정보나 민감 발언이 섞여 있다면 사내 정책을 먼저 확인한다." },

  { id: "R5", title: "PDF·이미지·HWP를 AI가 읽을 수 있는 형태로 바꾼다",
    situation: "스캔본 PDF나 HWP여서 AI에 그대로 넣을 수 없다",
    primary: "사이오닉 AI", alt: "Claude Vision · Adobe Acrobat", difficulty: "★☆☆", sensitivity: "하",
    why: "한글 문서와 표가 잘 살아남고 마크다운으로 바로 나온다",
    flow: ["원본을 올려 OCR을 돌리고 마크다운으로 받는다","표와 제목의 구조가 제대로 들어왔는지 눈으로 빠르게 훑는다","그 마크다운을 Claude나 ChatGPT에 넣어 본 작업을 한다","원문을 다시 봐야 할 지점을 표시해 둔다"],
    demo: "엑셀과 PDF가 분석이 안 된다는 말은, 대부분 정제 전에 분석을 맡겨서 그렇습니다. 마크다운으로 먼저 바꾸면 결과가 달라져요.",
    warn: "개인정보가 들어간 문서는 마스킹 후에 올린다." },

  { id: "R6", title: "엑셀과 CSV를 분석한다",
    situation: "매출과 지표 데이터를 매월 피벗하고 이상치를 찾고 그래프를 만든다",
    primary: "ChatGPT Data Analyst", alt: "Claude + 파이썬 · Google Sheets + Gemini", difficulty: "★★☆", sensitivity: "중",
    why: "파이썬을 자동 생성·실행·시각화까지 한번에 돌린다",
    flow: ["헤더만 깔끔한 CSV로 만든다. 제목 행과 합계 행은 뺀다","컬럼 설명과 분석 목적, 원하는 그래프 유형을 한 번에 말한다","표, 해설, 재사용 가능한 파이썬 스크립트를 함께 받는다","다음 달에는 코드만 다시 돌리면 된다"],
    prompt: `컬럼 설명
- 날짜(일), 상품코드, 채널, 매출, 수량

분석 목적
- 전주 대비 상품별 매출 증감 상위 열 건
- 채널별 기여도 변화

원하는 결과
- 표 한 장, 막대그래프 두 장, 두 줄 해설
- 재사용 가능한 파이썬 스크립트`,
    demo: "헤더만 잘 맞추면, 분석 결과와 다시 쓸 수 있는 코드까지 한 번에 받습니다. 다음 달에는 코드만 다시 돌리시면 됩니다.",
    warn: "실매출이나 고객 데이터가 섞이면 민감도 ‘상’으로 올라간다. 그때는 R9로 경로를 바꾼다." },

  { id: "R7", title: "보고서나 메일의 초안을 만든다",
    situation: "같은 형식 문서를 매번 백지에서 다시 쓰고 있다",
    primary: "Claude", alt: "ChatGPT · Gemini", difficulty: "★☆☆", sensitivity: "하",
    why: "한국어의 어조와 논리 구조가 자연스럽고 여러 안의 차별성이 살아난다",
    flow: ["잘 쓰인 샘플 한두 편을 톤 레퍼런스로 먼저 준다","이번 차례의 팩트, 수치, 배경만 bullet로 정리한다","두세 안을 서로 다른 관점으로 요청한다","사람은 택일하고 다듬고 고유명사를 다시 확인한다"],
    prompt: `다음 톤과 구조로 주간 동향 보고의 시사점 섹션을 써줘.

[톤 레퍼런스: 지난주 채택된 버전]
(원문)

[이번 주 팩트]
- 경쟁사 A, 신상품 발표
- 규제, 요금 공시 개정안
- 내부 가정, 전략 초점은 B2B

요청: 시사점 두세 안을 공격·방어·관망으로 나누어 각각 세 문단 이내로.`,
    demo: "‘잘 써줘’는 뻔한 문장을 낳습니다. 톤 샘플, 팩트, 여러 관점 이 셋이 들어가면 결과가 달라집니다.",
    warn: "수치와 고유명사는 사람이 꼭 다시 본다." },

  { id: "R8", title: "매주 반복되는 흐름을 자동화한다",
    situation: "매주 같은 순서로 수집하고 정리하고 보낸다",
    primary: "n8n", alt: "Make · Zapier · Apps Script", difficulty: "★★☆", sensitivity: "중",
    why: "노코드로 트리거·API·LLM·메일을 이어붙일 수 있다",
    flow: ["현재 수작업을 일곱 단계 이하로 종이에 그린다","API가 있는 단계와 손으로 하는 단계를 나눈다","API가 있는 곳만 자동화하고, 판단에는 사람의 승인 노드를 남긴다","MVP를 이 주 동안 돌린 뒤 개선한다"],
    demo: "오늘 당장 만들기는 어렵지만, 매주 똑같은 순서라면 한 주의 투자로 가능합니다. 판단하는 자리에 사람의 승인 노드는 꼭 남겨 두세요.",
    warn: "사내망 자동화는 별도 주제다. ‘확인 후 안내드리겠습니다’로 대답하고 담당자에게 전달한다." },

  { id: "R9", title: "데이터는 두고, AI에서 코드만 받아 사내에서 돌린다",
    situation: "데이터는 외부 AI에 올릴 수 없지만, 분석 로직 설계는 AI의 도움을 받고 싶다",
    primary: "ChatGPT · Claude (코드 생성)", alt: "Claude Code", difficulty: "★★☆", sensitivity: "상",
    why: "데이터는 밖으로 나가지 않고, 방법론과 코드만 설계를 받는다",
    flow: ["더미 또는 가상 데이터 구조(컬럼과 샘플 세 줄)만 AI에 공유한다","이 구조에서 목적을 이루는 파이썬이나 엑셀 함수를 요청한다","받은 코드를 사내망의 노트북이나 엑셀에 붙여 돌린다","에러 메시지만 공유해 다시 묻는다"],
    prompt: `다음은 사내 데이터 구조야. 실데이터가 아닌 샘플이다.
컬럼: 고객ID · 가입일 · 요금제 · 월매출 · 이탈여부
샘플 세 줄만 아래 있다.

요청
- 이탈 위험이 높은 고객을 찾는 파이썬 스크립트(pandas)
- 규칙 기반과 간단한 로지스틱 회귀 두 가지 버전
- 사내망에서 오프라인 실행 기준. 외부 API는 쓰지 말 것`,
    demo: "민감 데이터는 절대 업로드하지 않습니다. 샘플 구조만 드리고 코드를 받아, 사내에서 돌리는 것이 가장 자주 쓰는 방식입니다.",
    warn: "사내 도구 관련 질문은 담당자에게 넘긴다." },

  { id: "R10", title: "여러 단계가 엮인 작업을 에이전트에 맡긴다",
    situation: "수집에서 정제, 분석, 보고까지 도구가 여러 개 엮인 큰 작업이다",
    primary: "Claude Code", alt: "GPT Custom Actions · LangChain", difficulty: "★★★", sensitivity: "중",
    why: "에이전트 팀이 역할을 나눠 릴레이로 실행한다",
    flow: ["수집가·정제가·분석가·작성가처럼 역할로 쪼갠다","각 에이전트의 입력과 출력을 계약처럼 정의한다","파일 시스템을 공유 메모리로 쓴다","사람은 관문에서 검토와 승인만 한다"],
    demo: "오늘 직접 하기보다는 이런 구조가 있다는 것만 기억하세요. 여러 도구가 이어지는 업무에선 AI 팀을 꾸려 릴레이로 실행하는 길이 있습니다.",
    warn: "기대치 관리가 핵심이다. 오늘의 시도 과제로 권하지는 않는다." },
];

export default function RecipesPage() {
  const [openId, setOpenId] = useState<string | null>("R1");
  return (
    <PageFrame
      eyebrow="05 · 툴 레시피"
      title="한마디에 꺼낼 수 있는 열 개의 조합."
      lede="어떤 상황에서 어떤 도구를, 어떻게 말하고 어떻게 쓰는가. 표에서 팀의 한마디를 찾아 아래 레시피 번호로 점프하면 된다."
    >
      <Section n={1} title="상황에서 레시피로">
        <Card hover={false}>
          <ul className="divide-y divide-ink-200 dark:divide-ink-800">
            {[
              ["링크와 뉴스가 쌓였는데 정리가 힘들어요", "R1"],
              ["문서 여러 개를 매번 비교해야 해요", "R2"],
              ["사내 규정에서 답 찾느라 시간이 녹아요", "R3"],
              ["회의 녹음에서 액션을 뽑아야 해요", "R4"],
              ["PDF나 HWP라 AI에 그대로 못 넣어요", "R5"],
              ["엑셀 분석과 시각화가 오래 걸려요", "R6"],
              ["메일과 보고서 초안 쓰는 시간이 길어요", "R7"],
              ["매주 같은 루틴을 자동화하고 싶어요", "R8"],
              ["민감 데이터라 외부 AI에 못 올려요", "R9"],
              ["여러 단계가 얽힌 큰 작업을 다루고 싶어요", "R10"],
            ].map(([s, id]) => (
              <li key={id} className="py-3 flex items-center justify-between gap-3">
                <span className="text-[14px] text-ink-700 dark:text-ink-200">{s}</span>
                <button onClick={() => { setOpenId(id); document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); }} className="font-mono text-[12px] text-brand border border-brand-100 bg-brand-50 dark:bg-[rgba(255,107,53,0.08)] px-2 py-1 rounded-md hover:bg-brand hover:text-white transition">
                  {id}
                </button>
              </li>
            ))}
          </ul>
        </Card>
      </Section>

      <Section n={2} title="레시피">
        <div className="space-y-3">
          {RECIPES.map((r) => {
            const open = openId === r.id;
            return (
              <motion.div key={r.id} id={r.id} initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <div className="card">
                  <button onClick={() => setOpenId(open ? null : r.id)} className="w-full p-5 flex items-center justify-between gap-4 text-left">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <span className="font-mono text-[13px] text-brand font-bold">{r.id}</span>
                        <span className="text-[11px] font-mono text-ink-500">{r.difficulty}</span>
                        <span className="text-[11px] px-2 py-0.5 rounded-full border border-ink-200 dark:border-ink-800 text-ink-600 dark:text-ink-300">민감도 {r.sensitivity}</span>
                      </div>
                      <div className="serif-kr text-[19px] font-bold text-ink-900 dark:text-ink-50 leading-snug">{r.title}</div>
                      <p className="text-[13px] text-ink-500 dark:text-ink-400 mt-1 truncate">{r.situation}</p>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-ink-400 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {open && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="px-5 pb-5 border-t border-ink-200 dark:border-ink-800 pt-4">
                          <div className="grid md:grid-cols-3 gap-4 mb-5">
                            <Meta label="1순위" v={r.primary} />
                            <Meta label="대안" v={r.alt} />
                            <Meta label="이 도구를 택한 이유" v={r.why} />
                          </div>
                          <div className="mb-4">
                            <div className="text-[11px] uppercase tracking-[0.18em] text-brand font-semibold mb-2">작업 흐름</div>
                            <ol className="space-y-1.5 text-[14px] text-ink-700 dark:text-ink-200">
                              {r.flow.map((f, i) => <li key={i} className="flex gap-2"><span className="font-mono text-[12px] text-ink-400 shrink-0">{i + 1}.</span>{f}</li>)}
                            </ol>
                          </div>
                          {r.prompt && (
                            <div className="mb-4">
                              <div className="text-[11px] uppercase tracking-[0.18em] text-brand font-semibold mb-2">프롬프트</div>
                              <pre className="bg-ink-50 dark:bg-ink-800/50 border border-ink-200 dark:border-ink-800 rounded-lg p-4 text-[12.5px] text-ink-800 dark:text-ink-100 font-mono whitespace-pre-wrap overflow-x-auto leading-relaxed">{r.prompt}</pre>
                            </div>
                          )}
                          <Callout title="30초 시연">{r.demo}</Callout>
                          <Callout title="주의"><span className="text-ink-700 dark:text-ink-200">{r.warn}</span></Callout>
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

      <NextPrev prev={{ href: "/framework", label: "프레임워크" }} next={{ href: "/scenarios", label: "실전 시나리오" }} />
    </PageFrame>
  );
}

function Meta({ label, v }: { label: string; v: string }) {
  return (
    <div>
      <div className="text-[10.5px] uppercase tracking-[0.18em] text-ink-500 mb-1 font-semibold">{label}</div>
      <div className="text-[13.5px] text-ink-800 dark:text-ink-100">{v}</div>
    </div>
  );
}
