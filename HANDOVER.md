# 포트폴리오 프로젝트 인수인계 문서 (AI Handover Document)

이 문서는 다른 PC 환경에서 새로운 AI가 작업을 매끄럽게 이어받을 수 있도록 현재까지 진행된 프로젝트의 구조, 히스토리, 주요 로직을 요약한 가이드 문서입니다. 새로운 AI 어시스턴트는 작업을 시작하기 전 이 문서를 먼저 읽고 컨텍스트를 파악해 주세요.

## 1. 프로젝트 개요 (Project Overview)
- **Repository**: `bs_00.github.io`
- **Deploy**: GitHub Pages (`npm run deploy` / `gh-pages` 브랜치)
- **Framework**: Next.js 16 (React), TailwindCSS, TypeScript
- **Goal**: 기존의 백엔드 포트폴리오를 PPT 파일(`ppt_content.md` 내용)과 100% 동일한 내용으로 웹 페이지에 포팅하고, 면접관이 보기 편하도록 UI/UX를 고도화하는 작업

## 2. 핵심 파일 및 구조 (Architecture & Key Files)
본 프로젝트는 **데이터와 UI 컴포넌트가 명확히 분리**되어 있습니다. 

- `lib/data/projects.tsx`: **(가장 중요) 단일 진실 공급원 (Single Source of Truth)**
  - 3개의 주요 프로젝트 (1. 아보핏, 2. 코니, 3. 덕치)에 대한 모든 메타데이터가 배열 형태로 관리됩니다.
  - 주요 필드: `title`, `period`, `team`, `role`, `techStack`, `contribution`, `teamComposition`, `problemSolving`, `situation`, `task`, `action`, `result`, `retrospective`, `techReasons`
  - 텍스트 내용은 PPT와 100% 일치하도록 정밀하게 매핑되어 있습니다.
- `components/projects-section.tsx`: 메인 화면에서 프로젝트 리스트를 보여주는 카드 UI 컴포넌트
- `components/project-detail-dialog.tsx`: 메인 화면의 카드를 클릭했을 때 나타나는 **프로젝트 상세 모달창**
- `components/troubleshooting-dialog.tsx`: 프로젝트 상세 모달창 내에 있는 "핵심 문제 해결 보기" 버튼을 클릭하면 열리는 **이중 모달창(트러블슈팅 전용 뷰어)**
  - PPT의 핵심 문제 해결 내용을 보여주며, 조건부 렌더링을 통해 이미지가 없는 항목(`hasImage: false`)은 이미지 영역을 숨기고 텍스트를 전체 너비로 확장합니다.

## 3. 최근 작업 내역 (Recent Updates)
1. **데이터 정합성 완벽 동기화**
   - 기존의 요약형 텍스트를 제거하고, `projects.tsx`의 모든 내용을 PPT 슬라이드 원본 텍스트로 강제 덮어쓰기 완료.
   - 프로젝트 인원 구성(예: 풀스택 1명), 백엔드 역할 명칭(예: Backend Developer (서버/인프라 전담)) 등을 정확히 반영.
2. **"핵심 문제 해결" 영역 UI 개선**
   - 과거에는 상세 모달 안에 길게 인라인으로 있었으나, 가독성을 위해 **분리된 모달창(`troubleshooting-dialog.tsx`)**으로 분리.
   - API 타임아웃, Nginx 리다이렉트 소실 이슈 등 **시각적 증명이 어려운 백엔드 이슈의 UI 처리**:
     - `problemSolving` 배열 내 객체에 `hasImage: boolean` 속성을 추가.
     - `hasImage: false`인 경우, 우측의 빈 이미지 플레이스홀더 영역 렌더링을 생략하고 텍스트를 화면 가득(full-width) 채우도록 스마트한 조건부 렌더링 적용.

## 4. 새 AI를 위한 To-Do 및 주의사항 (For Next AI)
- **배포 방식 주의**: 이 프로젝트는 Next.js 정적 내보내기(Static Export)를 통해 GitHub Pages로 호스팅됩니다. 코드를 수정한 후에는 반드시 `npm run deploy` 명령어를 실행해야 `gh-pages` 브랜치로 빌드 결과물이 푸시되어 실제 웹사이트(ryubyeongsun.github.io)에 반영됩니다.
- **Git 상태**: 모든 최신 변경 사항은 `master` 브랜치에 커밋 및 푸시되어 있습니다. 다른 PC에서 `git pull origin master`를 실행하여 최신 코드를 내려받은 후 작업을 시작하세요.
- **향후 과제 제안 (Optional)**:
  - 현재 `hasImage: false`로 처리된 이슈(아보핏 API 타임아웃, 덕치 Nginx POST 소실)에 대해 사용자가 시각적 자료(예: 가짜 모니터링 그래프, Nginx 로그 스크린샷 등)를 원할 경우, 이미지를 생성/삽입하고 `hasImage: true`로 변경하여 UI를 더욱 풍성하게 만들 수 있습니다.
  - 라이트 모드 / 다크 모드의 컬러 대비 및 모바일 반응형(Mobile Responsive) 레이아웃에 대한 세부적인 QA가 필요할 수 있습니다.

---
**[작업 시작 가이드]**
이 문서를 읽은 AI 어시스턴트는 사용자에게 *"이전 작업 내역과 프로젝트 구조를 완벽하게 파악했습니다. 추가로 수정하실 UI나 내용이 있다면 편하게 말씀해 주세요!"* 라고 답변하며 작업을 시작해 주세요.
