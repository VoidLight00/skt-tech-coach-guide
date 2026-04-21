import { Home, CalendarClock, RefreshCw, Layers, Hammer, Clapperboard, Siren, Film, Mic, NotebookPen } from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  kr: string;
  icon: any;
  accent: "cyan" | "magenta" | "gold" | "lime" | "red";
  summary: string;
};

export const NAV: NavItem[] = [
  { href: "/", label: "Home", kr: "교과서 서문", icon: Home, accent: "cyan",
    summary: "오늘의 러닝 카드 · 빠른 점프 · 6대 원칙" },
  { href: "/today", label: "Today", kr: "당일 실행플랜", icon: CalendarClock, accent: "magenta",
    summary: "4/21·4/23 타임라인 · 준비물 · Pre/During/Post" },
  { href: "/script", label: "1-min Script", kr: "1분 프레임 압축", icon: Mic, accent: "gold",
    summary: "팀 진입 첫 30~60초 고정 스크립트" },
  { href: "/loop", label: "Coaching Loop", kr: "코칭 루프", icon: RefreshCw, accent: "cyan",
    summary: "4단계 루프 · 체크리스트 · 패턴 대응" },
  { href: "/framework", label: "Frameworks", kr: "프레임워크 치트시트", icon: Layers, accent: "lime",
    summary: "입력→처리→판단→출력 · 9역할 · 5방식 · 난이도" },
  { href: "/recipes", label: "Recipes R1~R10", kr: "상황별 툴 레시피", icon: Hammer, accent: "magenta",
    summary: "상황→도구→프롬프트→30초 시연 대본" },
  { href: "/scenarios", label: "Scenarios", kr: "실전 시연 A/B/C", icon: Clapperboard, accent: "gold",
    summary: "재무 · 투자자 키워드 · 엑셀 Q&A" },
  { href: "/do-dont", label: "DO / DON'T", kr: "금지와 권장", icon: Siren, accent: "red",
    summary: "금지 발화 · 고정 문구 · 보안 전략" },
  { href: "/simulation", label: "Simulation", kr: "현장 시뮬레이션", icon: Film, accent: "cyan",
    summary: "Scene 0~6 시네마틱 리허설" },
  { href: "/log", label: "Coaching Log", kr: "코칭 로그", icon: NotebookPen, accent: "lime",
    summary: "팀별 기록 템플릿 + 회고" },
];

export const PRINCIPLES = [
  { t: "도구 소개가 메인이 되면 안 된다", d: "가능성·업무 설계 먼저, 도구는 부연.", accent: "cyan" },
  { t: "사내 tool/사내망 먼저 언급 금지", d: "받으면 '잘 모르겠습니다, 확인 후 안내드리겠습니다'.", accent: "red" },
  { t: "보안 확인은 매 팀마다", d: "민감도 상이면 'AI로 코드만 생성 → 사내망 실행'.", accent: "magenta" },
  { t: "암묵지 명시화 유도", d: "'감'으로 판단하시는 부분을 문서화하면 AI에게 시킬 수 있다.", accent: "gold" },
  { t: "완벽한 결과보다 가능성 보여주기", d: "'이런 흐름으로 작업될 수 있다'를 보여주는 것.", accent: "lime" },
  { t: "팀 진입 시 프레임워크 1분 압축", d: "미니특강 생략됐으므로 코치가 첫 30~60초에 깔아줌.", accent: "cyan" },
] as const;
