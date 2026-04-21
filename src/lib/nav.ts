import { BookOpen, CalendarDays, Repeat, LayoutGrid, Wrench, Film, ShieldAlert, Mic, Clapperboard, NotebookPen, Users } from "lucide-react";

export type NavItem = {
  href: string;
  number: string;
  label: string;
  summary: string;
  icon: any;
};

export const NAV: NavItem[] = [
  { href: "/",            number: "00", label: "서문",             summary: "교과서 읽는 법과 오늘의 러닝 카드", icon: BookOpen },
  { href: "/today",       number: "01", label: "당일 실행플랜",     summary: "4월 21일과 23일, 현장 타임라인", icon: CalendarDays },
  { href: "/teams",       number: "01a",label: "Room 2 팀 배치",     summary: "7개 테이블 · 참석 팀과 사전 준비", icon: Users },
  { href: "/script",      number: "02", label: "진입 스크립트",     summary: "팀 앞에 앉은 첫 1분", icon: Mic },
  { href: "/loop",        number: "03", label: "코칭 루프",        summary: "경청에서 정리까지 25분의 박자", icon: Repeat },
  { href: "/framework",   number: "04", label: "프레임워크",       summary: "업무 구조화·데이터 점검·난이도·구현 방식", icon: LayoutGrid },
  { href: "/recipes",     number: "05", label: "툴 레시피",        summary: "상황·도구·프롬프트 10가지 조합", icon: Wrench },
  { href: "/scenarios",   number: "06", label: "실전 시나리오",    summary: "재무, 투자자 미팅, 엑셀 Q&A", icon: Clapperboard },
  { href: "/do-dont",     number: "07", label: "원칙과 금지",      summary: "말해야 할 것과 말하지 말아야 할 것", icon: ShieldAlert },
  { href: "/simulation",  number: "08", label: "현장 시뮬레이션",  summary: "장면 0부터 6까지, 상황과 반응", icon: Film },
  { href: "/log",         number: "09", label: "코칭 로그",        summary: "팀별 기록을 남기고 내보내기", icon: NotebookPen },
];

export const PRINCIPLES = [
  {
    t: "도구가 주인공이 되지 않는다",
    d: "ChatGPT, Claude, Gemini의 이름을 먼저 꺼내지 않는다. 실무자의 업무를 먼저 듣고, 어디에 AI가 들어갈 수 있는지를 함께 찾은 뒤 도구는 각주로 붙인다.",
  },
  {
    t: "사내 도구는 추측하지 않는다",
    d: '"잘 모르겠습니다. 확인 후 안내드리겠습니다." 이 한 문장이 25분을 살린다. 사내망 질문을 받으면 메모하고 담당자에게 넘긴다.',
  },
  {
    t: "보안은 대화의 첫 번째 질문이다",
    d: "매 팀에 들어가면 첫 질문은 동일하다. 이 업무의 데이터, 외부 AI에 넣어도 되나요. 답에 따라 이어지는 대화의 방식이 완전히 달라진다.",
  },
  {
    t: "암묵지를 언어로 끌어낸다",
    d: "실무자가 감으로 판단하는 부분을 말로 풀어내게 하고, 옆 사람이 받아적게 한다. 그 문서가 AI에게 줄 수 있는 가장 귀한 재료다.",
  },
  {
    t: "완벽한 결과보다 가능성의 흐름을 보여준다",
    d: "30분 안에 해결되는 문제는 없다. 그래도 사람들이 기억하는 것은 '이렇게도 되는구나'라는 한 번의 체험이다. 그걸 만들어주는 것이 오늘의 역할이다.",
  },
  {
    t: "팀 앞에서 1분만 프레임을 깔고 시작한다",
    d: "미니 강의가 생략되었으므로, 코치가 짧게 뼈대를 깔지 않으면 팀은 Step 4를 맨 공기 위에 짓게 된다. 30초에서 60초, 그 이상은 설교다.",
  },
] as const;
