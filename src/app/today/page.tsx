"use client";

import { PageFrame, Section, Card, CardGrid, Checklist, Callout, Tabs, NextPrev } from "@/components/ui";
import { motion } from "framer-motion";

export default function TodayPage() {
  return (
    <PageFrame
      eyebrow="01 · 당일 실행플랜"
      title="현장은 15시 정각에 시작된다."
      lede="CEO 타운홀로 오전이 통으로 비면서, 실무자들은 13시부터 Step 1에서 3을 압축해 달려온다. 테크코치가 앉기 전에 이미 두 시간을 쓴 사람들이다. 그래서 15시의 첫 60초가 하루 전체를 정한다."
    >
      <Section n={1} title="오후의 흐름">
        <Card hover={false}>
          <ol className="divide-y divide-ink-200 dark:divide-ink-800">
            {[
              { t: "14:30 전후", l: "도착·세팅", d: "시연 탭 네 개를 띄워둔다. 녹음기를 켜고 5분 테스트를 돌린다." },
              { t: "14:50–15:00", l: "코치 셋의 스탠드업", d: "누가 어느 테이블을 맡는지, Step 3를 못 채운 팀이 어느 팀인지 서로 공유한다." },
              { t: "15:00–17:00", l: "테크코칭 120분", d: "팀당 25–30분, 두 바퀴를 돌 수 있다. 도구 시연은 인풋을 세팅해두고 다른 팀을 보고 돌아온다." },
              { t: "17:00–17:30", l: "To-Be 마무리", d: "모든 팀이 '가장 먼저 시도해 볼 수 있는 것' 한 가지를 확정하고 돌아가게 한다." },
            ].map((r, i) => (
              <li key={i} className="py-4 flex gap-4">
                <div className="w-28 shrink-0 font-mono text-[12px] text-brand pt-0.5">{r.t}</div>
                <div>
                  <div className="serif-kr text-[17px] font-bold text-ink-900 dark:text-ink-50">{r.l}</div>
                  <p className="text-[14px] text-ink-600 dark:text-ink-300 leading-relaxed mt-1">{r.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </Card>
        <Callout title="미니 강의가 없다는 말의 의미">
          실무자들은 프레임워크를 한 번도 듣지 못한 채 Step 4 앞에 앉아 있다. 코치가 자리에 앉자마자 30초에서 60초짜리 뼈대를 깔지 않으면, 팀은 허공에 집을 지으려 한다. 상세한 낭독 원고는 <a href="/script">진입 스크립트</a> 장에 있다.
        </Callout>
      </Section>

      <Section n={2} title="팀 수에 따른 시간 배분">
        <Tabs tabs={[
          { label: "두 팀", content: <TableRows min="55분씩" rows={[["15:00–15:55","첫 팀"],["15:55–16:50","두 번째 팀"],["16:50–17:00","스윙바이"],["17:00–17:30","To-Be 마무리"]]} /> },
          { label: "세 팀 (기본)", content: <TableRows min="35–40분씩" rows={[["15:00–15:38","첫 팀"],["15:38–16:15","두 번째 팀"],["16:15–16:55","세 번째 팀"],["16:55–17:00","스윙바이"],["17:00–17:30","To-Be 마무리"]]} /> },
          { label: "네 팀", content: <TableRows min="25–28분씩" rows={[["15:00–15:28","첫 팀"],["15:28–15:55","두 번째 팀"],["15:55–16:22","세 번째 팀"],["16:22–16:50","네 번째 팀"],["16:50–17:30","To-Be 순회"]]} /> },
        ]} />
      </Section>

      <Section n={3} title="오늘 밤 그리고 출근 전">
        <Checklist storageKey="pre-check" items={[
          "ChatGPT, Claude, Gemini(Google AI Studio), NotebookLM 네 개 모두 로그인해두기",
          "시연용 브라우저 프로필을 따로 만들고, 확장 기능은 꺼둔다",
          "R1, R6, R9를 각각 한 번씩 실제로 돌려보고 성공 화면을 저장한다",
          "진입 스크립트를 소리 내어 세 번 읽는다",
          "녹음기를 충전하고, 5분 테스트 녹음 뒤 파일을 꺼내본다",
          "담당 팀 수와 자리 배치를 담당자에게 확인한다",
          "박준 코치에게 일정 변경에 대한 회신이 끝났는지 점검한다",
          "장면 2와 4만이라도 이동 중 다시 한 번 읽는다",
        ]} />
      </Section>

      <Section n={4} title="현장에서 지킬 네 가지">
        <CardGrid cols={2}>
          <Card>
            <div className="text-[11px] uppercase tracking-[0.18em] text-brand font-semibold mb-2">첫 60초</div>
            <p className="text-[14px] text-ink-700 dark:text-ink-200 leading-relaxed">자기소개에 긴 미사여구를 붙이지 않는다. 이름과 시간을 먼저 말하고, 뼈대 세 줄, 민감도 질문, 녹음 동의 순으로 흐른다.</p>
          </Card>
          <Card>
            <div className="text-[11px] uppercase tracking-[0.18em] text-brand font-semibold mb-2">병렬 운영</div>
            <p className="text-[14px] text-ink-700 dark:text-ink-200 leading-relaxed">시연 대기 시간은 빈 시간이 아니다. 다른 팀을 30초 스윙바이하고 와서 결과를 함께 본다. 25분 안에 두 팀을 들여다볼 수 있다.</p>
          </Card>
          <Card>
            <div className="text-[11px] uppercase tracking-[0.18em] text-brand font-semibold mb-2">마지막 2분</div>
            <p className="text-[14px] text-ink-700 dark:text-ink-200 leading-relaxed">자리를 뜨기 전에 세 줄짜리 피드백을 남기고, 가장 먼저 시도할 한 가지를 실무자 손으로 적게 한다. 녹음 파일 이름에 팀명을 붙인다.</p>
          </Card>
          <Card>
            <div className="text-[11px] uppercase tracking-[0.18em] text-brand font-semibold mb-2">피로도</div>
            <p className="text-[14px] text-ink-700 dark:text-ink-200 leading-relaxed">오후 두 시간을 이미 달려온 사람들이다. 문장을 짧게, 숨을 한 박자 더 두고, 고개 끄덕임이 늦어지면 물어봐야 한다. 더 많이 말하는 쪽이 지는 싸움이다.</p>
          </Card>
        </CardGrid>
      </Section>

      <Section n={5} title="끝난 뒤 해야 할 일">
        <Checklist storageKey="post-check" items={[
          "녹음 파일을 팀별로 나눠 저장하고 Whisper로 텍스트를 뽑는다",
          "코칭 로그 템플릿에 팀마다 핵심 세 줄과 최소 실행 한 가지를 남긴다",
          "팀 채팅에 요약을 공유한다. 다음 캠프의 자산이 된다.",
          "사내 도구 관련으로 받은 질문 목록을 박준 코치에게 정리해 보낸다",
          "4월 23일에 개선할 지점 한 줄을 메모한다",
        ]} />
      </Section>

      <NextPrev prev={{ href: "/", label: "서문" }} next={{ href: "/script", label: "진입 스크립트" }} />
    </PageFrame>
  );
}

function TableRows({ rows, min }: { rows: [string, string][]; min: string }) {
  return (
    <Card hover={false}>
      <div className="text-[11px] uppercase tracking-[0.18em] text-brand font-semibold mb-3">팀당 {min}</div>
      <table className="w-full table-brand">
        <thead><tr><th className="text-left">시간</th><th className="text-left">담당</th></tr></thead>
        <tbody>
          {rows.map(([t, l], i) => (
            <tr key={i}>
              <td className="font-mono text-[13px] text-brand w-[180px]">{t}</td>
              <td className="text-ink-800 dark:text-ink-100">{l}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
