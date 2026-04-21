"use client";

import { PageFrame, Section, Card, Callout, Quote, NextPrev } from "@/components/ui";
import { motion } from "framer-motion";

type Scene = {
  n: number; time: string; title: string; note?: string;
  see: string[]; hear?: string[]; moves: string[]; best: string; trap?: string;
  persona?: { name: string; desc: string }[]; workText?: string;
};

const SCENES: Scene[] = [
  {
    n: 0, time: "14:30 무렵", title: "도착과 세팅",
    see: [
      "교육장에는 테이블 대여섯 개가 놓여 있고, 각 테이블에 네댓 명이 앉아 있다.",
      "모두 오전 타운홀을 끝내고 오후 두 시간을 달려 온 상태다. 에너지는 낮고, 커피가 빠르게 줄어든다.",
      "몇 팀은 Step 3를 아직 다 채우지 못한 채 노트북을 붙잡고 있다.",
    ],
    moves: [
      "박준 코치와 30초 안에 담당 테이블과 순서를 정한다.",
      "시연용 탭 네 개를 모두 띄워 두고, 확장 기능은 꺼둔다.",
      "녹음기를 켜 5분간 짧은 테스트를 돌린다.",
      "치트시트와 펜, 타이머를 손이 닿는 자리에 둔다.",
    ],
    best: "도착하자마자 실무자에게 말을 걸지 않는다. 미니 강의가 없다는 소식을 전하기 전에 기대치가 올라가면 곤란하다.",
  },
  {
    n: 1, time: "14:50에서 15:00", title: "세 명의 코치가 모인다", note: "미니 강의는 생략되었다",
    see: [
      "강의실 뒤쪽에서 박준, 재엽, 상현이 10분 동안 짧게 선다.",
      "박준이 타운홀 때문에 오후가 압축되었음을 전하고, 미니 강의는 생략한다고 공지한다.",
      "15시 정각, 운영 담당자가 ‘이제부터 코치님이 테이블을 돌아다니며 코칭하시겠다’고 알린다.",
    ],
    moves: [
      "담당 테이블을 최종적으로 나눈다. 세 명 중 누가 어느 팀을 먼저 만날지 정한다.",
      "미니 강의가 빠진 자리에 각자 팀 앞에서 30초짜리 뼈대를 깔기로 합의한다.",
      "Step 3를 다 채우지 못한 팀이 어느 팀인지 서로 공유한다.",
      "사내 도구 관련 질문은 메모만 하고 박준에게 모으기로 한다.",
    ],
    best: "15시 정각에 가장 먼저 배정된 테이블로 자연스럽게 걸어간다. 잠깐의 공백을 코치가 먼저 채우는 편이 낫다.",
    trap: "미니 강의가 생략되었다고 뼈대마저 생략하지 않는다. 팀은 프레임워크 없이 Step 4 앞에 앉아 있다.",
  },
  {
    n: 2, time: "15:00에서 15:27", title: "A 테이블, 마케팅팀",
    note: "자동화를 향한 욕심과 보안에 대한 의심이 함께 있다",
    persona: [
      { name: "김대리 (36, 마케팅 기획)", desc: "적극적이고 AI에 대한 기대가 크다. 자동화 욕심이 있다." },
      { name: "이주임 (28, 데이터)", desc: "조용하지만 엑셀과 GA에 밝다." },
      { name: "박과장 (42, 브랜드)", desc: "회의적이다. 팔짱을 끼고 있다." },
      { name: "정대리 (33, 디지털)", desc: "중립적이다." },
    ],
    workText: "월간 캠페인 성과 리포트. 채널 다섯, 엑셀 탭 열두 개. 월말 야근 72시간.",
    see: ["김대리는 기대하는 눈, 박과장은 팔짱을 그대로 유지한다.", "워크시트의 Step 1~3은 채워져 있다. Pain은 ‘수치 모으기 이틀, PPT 이틀’."],
    hear: [
      "김대리: 채널이 다섯 개라 엑셀 탭이 12개예요. AI로 한 번에 자동화가 가능할까요.",
      "박과장: 그런데 저희 성과 수치는 대외비라서, 외부 AI에 올리면 안 되는 거 아닌가요.",
    ],
    moves: [
      "자기소개와 시간 공지, 뼈대 세 가지를 30초 안에 깐다.",
      "박과장의 질문을 먼저 받는다. 민감도 확인이 대화의 첫 번째다.",
      "업무를 일곱 단계로 함께 쪼갠다. 공동의 언어를 만든다.",
      "암묵지를 묻는다. 감으로 판단하는 세 가지를 풀어 보도록 하고, 옆 사람이 받아적게 한다.",
      "익명화된 샘플로 R6을 시연한다. ChatGPT에 컬럼 설명과 목적을 주고, 파이썬 스크립트를 받아 온다.",
      "‘가장 먼저 시도해 볼 수 있는 것’ 칸을 직접 가리키며, 실무자 손으로 한 줄 적게 한다.",
    ],
    best: "워크시트 여백에 민감도 세 층을 즉석에서 그린다. ‘오늘 중요한 첫 질문은 어디를 자동화할지가 아니라, 어디까지 외부를 쓸지입니다.’",
    trap: "n8n을 바로 제안하지 않는다. 박과장의 질문을 ‘괜찮아요’로 넘기지 않는다. 17분이 넘어가면 마무리를 예고한다.",
  },
  {
    n: 3, time: "15:27에서 15:55", title: "B 테이블, 재무팀",
    note: "의심이 많다. R9의 정석이 필요하다",
    persona: [
      { name: "최과장 (45, 재무)", desc: "차분하고 의심이 많다. 보안에 민감하다." },
      { name: "윤대리 (34, 회계)", desc: "수치에 밝다." },
      { name: "한주임 (29, 재무기획)", desc: "조용하다." },
    ],
    workText: "분기별 재무 데이터의 이상치를 탐지해 IR 자료의 초안을 만든다. 기준의 근거가 문서화되어 있지 않다.",
    see: ["최과장은 팔짱을 풀지 않는다. 윤대리가 노트북을 준비한다.", "Step 3는 촘촘하게 채워져 있으나, ‘튀는 이유’는 비어 있다."],
    hear: ["최과장: AI에 재무 데이터를 올리면 바로 학습에 쓰이는 거 아닌가요. 그래서 저희는 쓰지 못하고 있습니다."],
    moves: [
      "뼈대 세 가지를 30초에 깐다.",
      "최과장의 의심을 정확히 인정한 뒤, 두 갈래 길을 제시한다. 기업용 요금제 또는 더미 데이터.",
      "‘어떤 숫자를 튄다고 판단하시나요’를 묻고, 한주임이 받아적게 한다.",
      "ChatGPT에 R9 프롬프트를 넣어 두고, 그 대기 시간에 다른 팀을 30초 스윙바이한다.",
      "사내의 파이썬 환경에 대한 질문이 오면, ‘잘 모르겠습니다. 확인 후 안내드리겠습니다’로 받는다.",
    ],
    best: "최과장의 첫 문장을 ‘맞습니다’로 받는다. R9의 흐름을 즉석에서 간단한 도식으로 그린다.",
    trap: "‘괜찮습니다, 학습에는 쓰이지 않아요’처럼 반쯤 맞는 답을 던지지 않는다.",
  },
  {
    n: 4, time: "15:55에서 16:25", title: "C 테이블, 상품전략팀",
    note: "자신감이 낮은 팀이다. 작은 성공을 먼저 만든다",
    persona: [
      { name: "이주임 (30, 상품전략)", desc: "말끝이 흐리다. 자신감이 낮다." },
      { name: "다른 세 명", desc: "조용하고 서로 눈치를 본다." },
    ],
    workText: "경쟁사 상품 스펙 비교표를 매주 업데이트한다. Step 3가 세 줄에서 멈춰 있다.",
    see: ["워크시트는 비어 있고, 이주임은 눈을 잘 마주치지 못한다."],
    hear: ["이주임: 저희는 AI로 뭘 해야 할지 잘 모르겠어요. 그냥 계속 비교표 만드는 업무여서요."],
    moves: [
      "뼈대를 가볍게 깔고, 오늘의 시간이 넉넉하다는 톤을 먼저 보여 준다.",
      "‘지난주에 실제로 하신 한 건만 풀어 주실 수 있을까요’라고 묻는다.",
      "듣고 나서, 다섯 단계로 함께 정리해 주며 구조를 대신 만들어 준다.",
      "R2를 30초 시연한다. Claude에 경쟁사 A와 B의 요금제를 붙여 변경된 조건만 표로 받는다.",
      "‘중요한 변화가 무엇인가’에 대한 본인 기준 세 가지를 적는 것을 오늘의 숙제로 남긴다.",
    ],
    best: "이주임 혼자 말하게 두지 않는다. 중간에 다른 분들에게도 ‘이 단계에서 가장 힘드신 점이 무엇인가요’라고 질문을 돌린다.",
    trap: "‘간단합니다, 바로 해보세요’는 자신감 낮은 팀에게는 부담이다. 15분 안에 하나의 작은 성공을 설계한다.",
  },
  {
    n: 5, time: "16:25에서 17:00", title: "두 번째 순회",
    see: ["운영 담당자가 ‘16:45부터 Step 5 마무리로 들어가겠다’고 안내한다.", "세 팀을 모두 한 번씩 다녀온 상태다."],
    moves: [
      "담당 세 팀을 빠르게 한 번씩 다시 스윙바이한다.",
      "‘가장 먼저 시도해 볼 수 있는 것’ 칸이 채워졌는지를 확인한다.",
      "비어 있으면 1분 안에 함께 적고 자리를 뜬다.",
      "난이도가 도구 학습 이상이면 두 번째로 미루도록 조정한다.",
    ],
    best: "각 팀에게 세 줄짜리 피드백 카드를 남긴다. 엑셀 통합 스크립트, 이상 탐지 규칙의 명문화, 중요도 기준 세 가지.",
  },
  {
    n: 6, time: "17:00에서 17:30", title: "전체 공유와 마무리",
    see: [
      "각 테이블의 대표가 1분씩 공유한다.",
      "실무자들의 눈빛이 처음보다 또렷하다. ‘해볼 수 있겠다’는 표정이 돌아온다.",
      "박준이 마무리 멘트를 한다.",
    ],
    moves: [
      "녹음을 정지한다. 파일 이름에 팀명과 날짜를 붙인다.",
      "박준·재엽과 5분 스탠드업. A·B·C 팀의 특이사항과 담당자에게 전달할 사내 도구 질문 한 건.",
      "운영 담당자에게 인사를 남긴다.",
      "코칭 로그를 열어 팀명·대표 업무·핵심 세 줄만 빠르게 남긴다. 상세한 정리는 귀가 후 STT로 이어간다.",
    ],
    best: "끝나고 스스로에게 말한다. 오늘 한 팀이라도 ‘해볼 수 있겠다’고 느끼게 했다면, 그걸로 오늘은 성공이다.",
  },
];

export default function SimulationPage() {
  return (
    <PageFrame
      eyebrow="08 · 현장 시뮬레이션"
      title="시간대와 장면을 따라, 호흡을 먼저 예습한다."
      lede="실전의 25분은 준비한 만큼 보인다. 각 장면의 보이는 것, 들리는 것, 그리고 움직여야 할 순서를 미리 머릿속에서 한 번 돌려본다."
    >
      <Callout title="현재 일정 정리">
        오전 타운홀로 과정이 13시에 시작한다. Step 1에서 3을 두 시간 안에 달려 오고, 15시부터 17시 30분까지 테크코치가 합류한다. 미니 강의는 생략되었다.
      </Callout>

      <div className="my-10 space-y-10">
        {SCENES.map((s, idx) => <SceneBlock key={s.n} s={s} idx={idx} />)}
      </div>

      <Section n={9} title="한 장으로 기억하는 리듬">
        <Card hover={false}>
          <pre className="text-[13px] text-ink-800 dark:text-ink-100 font-mono leading-[1.9] whitespace-pre-wrap">
{`14:30    도착, 세팅, 녹음 테스트
14:50    코치 세 명이 선다. 담당 테이블과 순서
15:00    첫 팀. 뼈대 30초, 민감도, 구조화, 시연, 최소 실행
15:27    두 번째 팀. 시연 대기 동안 다른 팀 스윙바이
15:55    세 번째 팀. 구조화를 대신 만들어 준다
16:25    두 번째 순회. Step 4 후반과 Step 5 시작 점검
17:00    Step 5 마무리. 모든 팀 최소 실행 한 줄 확정
17:30    스탠드업, 로그 정리, 4월 23일에 반영할 한 줄`}
          </pre>
        </Card>
      </Section>

      <Section n={10} title="감정 곡선">
        <Quote by="15:30 긴장이 올라온다">숨을 한 번. 고정된 문장들을 믿는다.</Quote>
        <Quote by="15:40 ‘자동화!’라는 말이 들린다">속도를 늦추고, 민감도 질문으로 돌린다.</Quote>
        <Quote by="16:00 반응이 시원찮다">당황하지 않고, 가장 시간이 많이 드는 한 단계만 남긴다.</Quote>
        <Quote by="16:30 시간이 모자라는 느낌">‘가장 먼저 시도’ 한 줄이라도 확정하고 마무리한다.</Quote>
        <Quote by="17:30 끝난다">오늘 한 팀이라도 ‘해볼 수 있겠다’고 느꼈다면, 그걸로 충분하다.</Quote>
      </Section>

      <Section n={11} title="파일을 열지 않아도 남아야 하는 세 문장">
        <Card hover={false}>
          <ol className="space-y-4 text-ink-900 dark:text-ink-50 serif-kr text-[18px] leading-[1.9]">
            <li>녹음은 학습 자료로만 쓰고 이후 삭제합니다.</li>
            <li>잘 모르겠습니다. 확인 후 안내드리겠습니다.</li>
            <li>가장 먼저 시도해 볼 수 있는 것 하나만 오늘 정해요.</li>
          </ol>
        </Card>
      </Section>

      <NextPrev prev={{ href: "/do-dont", label: "원칙과 금지" }} next={{ href: "/log", label: "코칭 로그" }} />
    </PageFrame>
  );
}

function SceneBlock({ s, idx }: { s: Scene; idx: number }) {
  return (
    <motion.section
      id={`scene-${s.n}`}
      initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: Math.min(idx * 0.04, 0.2) }}
      className="relative"
    >
      <div className="flex gap-5 md:gap-8">
        <div className="relative shrink-0 hidden md:block">
          <div className="relative w-12 h-12 rounded-full bg-paper dark:bg-night border-2 border-brand flex items-center justify-center shadow-brand z-10">
            <span className="serif-kr text-brand text-lg font-bold">{s.n}</span>
          </div>
          {idx < 6 && <div className="absolute left-1/2 top-12 bottom-[-40px] w-[2px] bg-gradient-to-b from-brand/40 to-transparent -translate-x-1/2" />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="font-mono text-[11px] text-brand font-semibold">{s.time}</span>
            {s.note && <span className="text-[11px] text-ink-500 dark:text-ink-400 italic">· {s.note}</span>}
          </div>
          <h2 className="serif-kr text-[22px] md:text-[26px] font-bold tracking-tight text-ink-900 dark:text-ink-50 mb-4">장면 {s.n}. {s.title}</h2>

          {s.persona && (
            <Card hover={false} className="mb-4">
              <div className="text-[11px] uppercase tracking-[0.18em] text-brand font-semibold mb-2">팀 구성</div>
              <ul className="grid md:grid-cols-2 gap-x-6 gap-y-1.5 text-[13.5px] text-ink-700 dark:text-ink-200">
                {s.persona.map((p) => <li key={p.name}><span className="font-semibold text-ink-900 dark:text-ink-50">{p.name}</span> · {p.desc}</li>)}
              </ul>
              {s.workText && <div className="mt-3 text-[13px] text-ink-600 dark:text-ink-300 italic">워크시트: {s.workText}</div>}
            </Card>
          )}

          <div className="grid md:grid-cols-2 gap-3">
            <Card>
              <div className="text-[11px] uppercase tracking-[0.18em] text-brand font-semibold mb-2">보이는 것</div>
              <ul className="space-y-1.5 text-[13.5px] text-ink-700 dark:text-ink-200 list-disc pl-5">
                {s.see.map((x, i) => <li key={i}>{x}</li>)}
              </ul>
            </Card>
            {s.hear && (
              <Card>
                <div className="text-[11px] uppercase tracking-[0.18em] text-brand font-semibold mb-2">들리는 말</div>
                <ul className="space-y-1.5 text-[13.5px] text-ink-700 dark:text-ink-200 list-disc pl-5">
                  {s.hear.map((x, i) => <li key={i}>{x}</li>)}
                </ul>
              </Card>
            )}
          </div>

          <Card className="mt-3">
            <div className="text-[11px] uppercase tracking-[0.18em] text-brand font-semibold mb-2">움직임</div>
            <ol className="space-y-1.5 text-[13.5px] text-ink-700 dark:text-ink-200 list-decimal pl-5">
              {s.moves.map((m, i) => <li key={i}>{m}</li>)}
            </ol>
          </Card>

          <Callout title="좋은 한 수">{s.best}</Callout>
          {s.trap && <Callout title="놓치기 쉬운 곳"><span className="text-ink-700 dark:text-ink-200">{s.trap}</span></Callout>}
        </div>
      </div>
    </motion.section>
  );
}
