import Image from "next/image"
import project1Before from "@/public/projects/project1-before.png"
import project1After from "@/public/projects/project1-after.png"
import project1Arch from "@/public/projects/project1-architecture-corrected.png"
import project1 from "@/public/projects/project1-thumbnail.png"
import project2 from "@/public/projects/project2-thumbnail.png"
import project3 from "@/public/projects/project3-thumbnail.png"
import project2Arch from "@/public/projects/project2-architecture.png"
import project3Arch from "@/public/projects/project3-architecture.png"
import { ConyPurchaseFlow } from "@/components/cony-purchase-flow"
import { ConyArchitectureCompare } from "@/components/cony-architecture-compare"
import { DuckchiAuthFlow } from "@/components/duckchi-auth-flow"
import { DuckchiArchitectureCompare } from "@/components/duckchi-architecture-compare"

export const PROJECTS = [
  {
    id: 1,
    title: "AvoFit (Diet Coach) — AI 식단·장보기 관리 서비스",
    description:
      "AI 식단을 실제 장보기 상품과 연결하고, BMI 단계별 3D 아바타를 보여주는 식단 관리 서비스",
    period: "2025.11 ~ 2025.12 (4주)",
    team: "2명 (풀스택 2명)",
    role: "Full-Stack Developer (장보기·3D 웹 연동)",
    techStack: [
      "Java 17",
      "Spring Boot 3.5",
      "MyBatis",
      "MySQL",
      "Vue.js 3",
      "Three.js",
      "CompletableFuture (후속 개선)",
    ],
    contribution: {
      summary:
        "풀스택 개발자로서 장보기 상품 추천 백엔드와 Three.js 3D 아바타 초기 웹 연동을 담당했습니다. 검색어 정규화·상품 후보 평가·예산 검증을 적용하고, 상품의 포장 용량을 바탕으로 권장 구매 개수를 계산했습니다. 프로젝트 종료 후에는 기존 비동기 생성에 전용 Executor를 도입하고, 나머지 구간을 하나의 작업에서 순차 처리하도록 개선했습니다.",
      details: [
        {
          title: "장보기 상품 추천",
          description:
            "식재료를 11번가 상품과 연결하고, 검색어 정규화·필터링·예산·용량·재료명 적합도 평가로 추천 흐름 개선",
        },
        {
          title: "구매 수량 계산",
          description:
            "상품명에서 포장 용량을 파싱하고, 식재료 총 필요량과 비교해 권장 구매 개수 계산",
        },
        {
          title: "3D 웹 연동 · 후속 개선",
          description:
            "BMI 단계별 GLB 모델을 Three.js로 초기 웹 연동. 프로젝트 종료 후인 2026.08.15에는 식단 생성의 백그라운드 처리 구조 개선",
        },
      ],
    },
    teamComposition: [
      {
        role: "풀스택 (팀원)",
        count: 1,
        isMe: false,
        tasks:
          "식단·대시보드 등 서비스 기능과 Vue.js 화면 개발, 3D 관련 코드의 후속 수정",
      },
      {
        role: "풀스택 (본인)",
        count: 1,
        isMe: true,
        tasks:
          "장보기 상품 추천·구매 수량 계산, Three.js 3D 아바타 초기 웹 연동, 프로젝트 종료 후 식단 비동기 개선",
      },
    ],
    problemSolving: [
      {
        title: "예산 오차 및 엉뚱한 상품 매핑 문제 해결",
        problem: "① 상품 불일치\n재료명에 수량·단위가 섞여 관련 없는 상품이나 대용량 묶음이 검색됐습니다.\n\n② 구매비용 차이\n같은 재료라도 포장 용량과 구매 개수에 따라 실제 예상 비용이 달라졌습니다.",
        cause: "① 검색 형식 차이\n식단의 재료명과 쇼핑몰 상품명의 표현 방식이 달랐습니다.\n\n② 실제 상품 정보 부재\nAI 식단 생성에는 쇼핑몰의 가격·포장 용량이 반영되지 않아 별도 검증이 필요했습니다.",
        solution: "① 검색어 정규화\n수량·단위 표현을 제거하고 식품 카테고리로 검색합니다.\n예: “닭가슴살 100g” → “닭가슴살”\n\n② 부적합 상품 제거·후보 평가\n재료명·용량·예산 적합도로 후보를 좁히고, 상위 후보가 3개 이상이면 AI로 상품명의 의미적 적합성을 보완합니다.\n\n③ 권장 구매 개수·비용 검증\n상품명에서 포장 용량을 읽고, 유효한 용량이면 필요량 ÷ 포장 용량을 올림해 구매 개수를 계산합니다. 구매 개수를 반영한 비용도 다시 검증합니다.\n\n④ 전체 예산 검증\n총 예상 구매비용이 예산의 115%를 넘으면 비용이 큰 항목부터 제외합니다.",
        result: "[상품 연결] 단순 키워드 검색 → 재료 적합성을 검토한 후보 선택\n[구매 단위] 상품 1개 가격 → 포장 용량·구매 개수를 반영한 비용 확인\n[예산 검증] 추천 결과 연결 → 전체 예상 비용을 확인한 뒤 고비용 항목 제외",
        hasImage: true,
        beforeImage: project1Before,
        afterImage: project1After,
      },
      {
        title: "식단 비동기 실행 구조 개선 · 프로젝트 종료 후 (2026.08.15)",
        problem: "첫 7일을 반환한 뒤 나머지를 백그라운드에서 생성하는 구조는 이미 있었습니다.\n→ 공용 풀에서 구간별 작업을 추가로 병렬 실행하고 있어, 실행 자원을 명시적으로 관리할 필요가 있었습니다.",
        cause: "전용 Executor 없이 CompletableFuture.runAsync를 중첩 호출하고, 내부 구간 작업 전체가 끝나기를 기다리는 구조였습니다.\n→ 외부 AI 호출을 포함한 긴 작업의 실행 자원과 처리 순서를 명확히 할 필요가 있었습니다.",
        solution: "① 기존 응답 흐름 유지\n첫 7일 식단을 생성해 먼저 반환하는 흐름을 유지합니다.\n\n② 나머지 8~30일 백그라운드 생성\nCompletableFuture에 전용 Executor를 연결합니다. 중첩된 병렬 작업을 제거하고 하나의 백그라운드 작업 안에서 구간별로 순차 생성합니다.\n\n③ 생성 결과 확인\n별도 jobId·상태 API 없이 기존 식단 조회 API를 다시 호출합니다.",
        result: "[응답 흐름] 첫 7일 우선 반환 유지\n[처리 구조] 중첩 병렬 작업 → 단일 백그라운드 작업 내 순차 처리\n[실행 자원] Core 5 / Max 10 / Queue 50의 전용 Executor로 작업 자원 제한\n[작업 시점] 4주 프로젝트 이후인 2026.08.15 후속 리팩토링",
        hasImage: false,
      },
    ],
    situation:
      "사용자의 신체정보와 목표에 맞춘 AI 식단·장보기 관리 서비스입니다. 목표 칼로리에 따라 식단을 생성하고 필요한 식재료를 실제 쇼핑 상품에 연결하며, BMI 단계별 3D 아바타로 체형을 시각화합니다.",
    task: "주요 기능: Mifflin–St Jeor BMR·활동계수 기반 목표 칼로리 계산, AI 맞춤 식단, 11번가 상품 추천·구매 수량 계산, BMI 연동 3D 아바타, Access/Refresh Token 분리 및 Refresh Token Rotation 인증",
    action:
      "프로젝트 기간: 검색어 정규화, 부적합 상품 필터링, 예산·용량·재료명 적합도 기반 후보 평가, AI 의미 판단 보완과 최종 구매비용 재검증을 통해 장보기 상품 추천을 개선했습니다. 상품명 용량 파싱과 권장 구매 개수 계산을 구현했습니다.\n3D 초기 연동: 외부 도움으로 전달받은 avoLV1~avoLV5 GLB 자산을 프로젝트에 추가하고, Three.js GLTFLoader 렌더링과 BMI Level에 따른 모델 선택을 연결했습니다. 3D 모델링 자체와 이후 팀원의 코드 수정은 본인 단독 구현 범위에 포함하지 않습니다.\n프로젝트 종료 후(2026.08.15): 첫 7일 응답 이후 나머지 기간을 전용 Executor의 단일 백그라운드 작업에서 순차 생성하도록 개선했습니다.",
    result:
      "장보기 추천에 재료명·예산·용량 검증과 권장 구매 개수 계산을 반영하고, BMI 단계별 3D 아바타의 초기 웹 연동을 담당했습니다. 팀 프로젝트로 SSAFY 14기 최종 페어(관통) 프로젝트 우수상을 수상했습니다.\n프로젝트 종료 후인 2026.08.15에는 기존 비동기 생성에 전용 Executor를 도입하고 구간별 순차 처리로 정리하는 후속 리팩토링을 진행했습니다.",
    retrospective: {
      regrets: [
        "상품명의 수량·단위·묶음 표현에 대한 파싱과 추천 예외 케이스가 남아 있음",
        "핵심 상품 추천·비동기 흐름의 회귀 테스트 부족",
        "Frontend와 Backend에 BMI Level 계산이 중복되고 일부 경계 기준과 반올림 방식이 다름",
      ],
      improvements: [
        "상품 추천·용량 파싱·예산 검증의 경계 사례와 비동기 실패 흐름에 대한 회귀 테스트 보강",
        "Backend에서 BMI/Level 정책을 단일화하고 Frontend는 전달받은 Level에 따른 렌더링을 담당하도록 개선",
        "현재 ConcurrentHashMap 기반 로컬 캐시는 다중 인스턴스 환경에서 Redis 같은 공유 캐시로 전환 검토",
        "작업별 진행 상태 API와 실패·재시도 정책을 추가해 생성 중인 식단의 상태를 명확히 제공",
      ],
      lesson:
        "상품 추천은 재료명뿐 아니라 포장 용량·구매 개수·예상 비용까지 검증해야 합니다. AI의 의미 판단도 규칙 기반 검증과 함께 사용해야 한다는 점을 배웠습니다.",
    },
    image: project1,
    architectureImage: project1Arch,
    architectureCaption: "서비스 전체 아키텍처 · 비동기 처리는 프로젝트 종료 후 개선한 구조입니다.",
    githubLink: "https://github.com/ryubyeongsun/diet_coach_PJ",
    techReasons: [
      { label: "MyBatis", desc: "SQL 매퍼를 통해 식단·식재료 데이터를 조회·저장하고, 조회 결과를 Java 객체로 매핑하는 데 사용했습니다." },
      { label: "11번가 API", desc: "식단의 식재료를 실제 구매 가능한 상품과 연결하기 위해 사용했습니다. 재료명·용량·예산으로 후보를 평가하고, AI로 의미적 적합성을 보완한 뒤 구매비용을 검증했습니다." },
      { label: "Three.js · GLTFLoader", desc: "BMI Level에 맞는 GLB 모델을 브라우저에서 보여주기 위해 사용했습니다. 외부 도움으로 받은 모델링 자산의 초기 웹 연동을 담당했으며, 이후 팀원의 코드 수정도 반영됐습니다." },
      { label: "CompletableFuture + 전용 Executor", desc: "프로젝트 종료 후(2026.08.15), 기존 CompletableFuture에 전용 Executor를 연결해 실행 자원을 관리했습니다. 첫 7일 우선 반환은 유지하고, 나머지는 중첩 병렬 실행 대신 한 작업 안에서 순차 생성하도록 바꿨습니다." },
    ],
  },
  {
    id: 2,
    title: "CONY — 기프티콘 관리 및 판매 서비스",
    description:
      "AI(OCR) 기프티콘 자동 등록, 위치 기반 스마트 알림, 사용자 설정 자동판매와 유효기간 임박 판매 제안, 공유방 기능을 제공하는 기프티콘 관리·거래 앱",
    period: "2026.01 ~ 2026.02 (6주)",
    team: "6명 (FE 2명, BE 1명, BE/본인 1명, INFRA 1명, AI 1명)",
    role: "Backend Developer (결제/거래 도메인)",
    techStack: [
      "Java 17",
      "Spring Boot 3.5.9",
      "JPA",
      "Spring Security",
      "React Native",
      "TypeScript",
      "MySQL 8.0",
      "Redis",
      "Docker",
      "Jenkins",
      "AWS S3",
    ],
    contribution: {
      title: "담당 역할 및 주요 기여",
      summary: "결제·거래 백엔드를 담당해 판매글 잠금 조회, 구매 검증, 포인트 이동과 거래 기록 저장을 구현했습니다.\nRedis GEO·Pipeline을 활용한 거리순 검색과 자동판매 스케줄러를 개발하고, Manage 서버의 기프티콘 소유권 이전 API를 연동했습니다.",
      details: [
        { title: "PESSIMISTIC_WRITE 비관적 락", description: "동시 구매 시 동일 판매글 경합을 순차 처리하도록 설계" },
        { title: "거래 프로세스 트랜잭션", description: "판매 상태·본인 구매·잔액 검증과 포인트 이동, 판매 상태 변경을 한 흐름으로 처리" },
        { title: "Redis GEO 반경 검색 API", description: "반경 내 매장 조회와 Pipeline 기반 브랜드명 일괄 조회 구현" }
      ],
    },
    teamComposition: [
      { role: "프론트엔드", count: 2, isMe: false, tasks: "React Native 모바일 UI/UX 설계 및 화면 구현" },
      { role: "백엔드", count: 1, isMe: false, tasks: "기프티콘 관리 핵심 API, 공유방, 알림" },
      { role: "백엔드 (본인)", count: 1, isMe: true, tasks: "거래 시스템 검증, 배치 스케줄러, 위치 검색 최적화" },
      { role: "인프라", count: 1, isMe: false, tasks: "CI/CD 배포 파이프라인, AWS EC2 구성" },
      { role: "AI", count: 1, isMe: false, tasks: "OCR 이미지 텍스트 추출 자동화 모델" }
    ],
    problemSolving: [
      {
        title: "동일 판매글의 동시 구매 경합 제어",
        problem: "동일한 기프티콘에 구매 요청이 동시에 들어오면 여러 요청이 판매 가능 상태를 읽고 구매를 진행할 위험이 있었습니다.",
        cause: "상태를 조회한 뒤 변경하는 사이에 다른 요청이 끼어들 수 있습니다. 구매 로직을 트랜잭션으로 묶는 것과 동일 판매글에 대한 접근을 직렬화하는 것은 별도의 문제입니다.",
        solution: "① 판매글 잠금 조회\nSale 행에 PESSIMISTIC_WRITE 잠금을 걸어 동일 판매글의 구매 요청을 순차 처리합니다.\n\n② 잠금 획득 후 구매 조건 검증\n판매 완료·판매 대기 상태, 본인 상품 구매 여부, 포인트 잔액을 확인합니다.\n\n③ Payment DB 변경을 한 트랜잭션으로 처리\n포인트 차감·지급, SOLD_OUT 전환, 구매 내역과 거래 로그를 함께 저장합니다.\n\n④ Manage 서버 소유권 이전 연동\n구매 메서드 안에서 Manage 서버의 기프티콘 소유권 이전 API를 호출합니다. 다른 서버의 변경까지 Payment DB의 로컬 트랜잭션으로 원자성을 보장하지는 않습니다.",
        result: "[동시성 제어] 동일 판매글에 대한 구매 처리를 순차 진행하도록 구성\n[구매 검증] 잠금 조회 후 판매 상태와 구매 조건 확인\n[거래 기록] Payment DB의 포인트·판매 상태·구매 내역을 함께 반영",
        hasImage: true,
        customVisual: <ConyPurchaseFlow />,
      },
      {
        title: "Redis GEO·Pipeline 기반 위치 정보 처리 및 페이지 내 거리순 정렬",
        problem: "가까운 매장순으로 판매글을 보여주려면 사용자 위치와 각 브랜드 매장 사이의 거리가 필요했습니다.\n한 브랜드에 여러 매장이 있어 가장 가까운 매장을 기준으로 정렬해야 했습니다.",
        cause: "① 매장과 판매글의 기준 차이\n위치 데이터는 매장 단위지만 판매글은 브랜드 단위여서 거리 정보를 연결해야 합니다.\n\n② 매장별 추가 조회\nGEO 검색 결과의 매장 ID마다 브랜드명을 개별 조회하면 Redis 요청의 네트워크 왕복이 반복됩니다.",
        solution: "① 반경 5km 내 매장 조회\nRedis GEOSEARCH로 사용자 위치 기준 반경 5km 내 매장 ID와 거리를 조회합니다.\n\n② Pipeline으로 브랜드명 일괄 조회\n조회된 여러 매장의 브랜드명을 Pipeline으로 가져와 Redis와의 네트워크 왕복을 줄입니다.\n\n③ 브랜드별 최소 거리 계산\n같은 브랜드의 매장이 여러 개라면 가장 가까운 매장의 거리를 Map에 저장합니다.\n\n④ 현재 DB 조회 페이지 안에서 거리순 정렬\nDB에서 이미 조회한 판매글 페이지에 브랜드별 최소 거리를 적용해 현재 페이지 안에서 거리순으로 재정렬합니다.",
        result: "[위치 조회] 반경 5km 내 매장의 거리 정보를 Redis에서 조회\n[요청 묶음] 브랜드명 다건 조회에 Pipeline 적용\n[정렬 기준] 조회된 판매글 페이지에 브랜드별 최소 거리 반영",
        hasImage: true,
        customVisual: <ConyArchitectureCompare />,
      },
    ],
    situation:
      "기프티콘의 등록·보관·공유부터 포인트 거래까지 연결하는 모바일 서비스입니다. OCR 자동 등록과 유효기간 알림으로 관리 부담을 줄이고, 가까운 매장을 기준으로 사용할 상품을 탐색할 수 있도록 구성했습니다.",
    task: "주요 기능: OCR 기프티콘 등록, 공유방, 위치·유효기간 알림, 카카오페이 포인트 충전, 기프티콘 거래, 사용자 설정 자동판매 및 유효기간 임박 판매 제안",
    action: `1. 비관적 락 기반 동시성 제어: 판매글 조회 시 JPA PESSIMISTIC_WRITE 락을 적용해 동일 판매글에 대한 동시 구매 경합을 순차 처리하도록 설계.
2. 거래 프로세스 검증: ① 판매 상태 확인 ② 본인 상품 구매 차단 ③ 포인트 잔액 검증 후, 포인트 차감/지급·SOLD_OUT 변경·구매 기록 저장을 하나의 @Transactional 흐름으로 처리하고 Manage 서버에 소유권 이전을 요청.
3. 배치 자동화: 매일 09:00에 Spring Scheduler가 만료 판매글 삭제, 사용자 설정 자동판매 등록, PENDING → ON_SALE 전환을 처리. 유효기간 임박 기프티콘은 시스템 제안 후 사용자 승인 시 판매 등록.
4. Redis GEO 기반 위치 검색: Spring Data Redis GEO Search로 반경 5km 내 매장을 조회하고, Pipeline으로 브랜드명 조회의 네트워크 왕복을 줄이고, 브랜드별 최소 거리로 현재 DB 조회 페이지 내 판매글을 재정렬.`,
    result:
      "🏆 SSAFY 14기 공통 프로젝트 우수상 수상. 비관적 락으로 동일 판매글의 동시 구매 경합을 순차 처리하도록 설계하고, Redis GEO로 매장 거리를 조회하고 Pipeline으로 브랜드명 조회를 묶었습니다. Spring Scheduler로 만료 판매글 삭제와 예약 판매 전환 등 반복 작업을 자동화했습니다.",
    retrospective: {
      regrets: [
        "거리순 정렬과 일부 검색 조건이 DB 페이징 이후 애플리케이션에서 적용되어, 전체 검색 결과 기준의 거리순 정렬과 정확한 결과 건수를 보장하지 못합니다.",
        "판매글 잠금과 별개로 User 포인트 행에는 별도의 동시성 제어가 없어, 동일 사용자의 포인트가 여러 거래에서 동시에 갱신될 경우 추가적인 동시성 제어가 필요합니다.",
        "Manage 서버의 소유권 이전과 Payment DB 커밋이 하나의 원자적 트랜잭션으로 묶이지 않아 실패 시 정합성 복구가 필요합니다.",
      ],
      improvements: [
        "향후 가까운 브랜드 후보와 검색 조건을 페이지 조회 이전에 반영하도록 조회 구조를 재설계하고, 필요하다면 검색 전용 인덱스 도입을 검토합니다.",
        "향후 User 포인트 갱신에 비관적 락·낙관적 락·조건부 UPDATE 중 적절한 동시성 제어 방식을 검토하고 동시 구매 통합 테스트를 추가합니다.",
        "향후 Manage 서버 소유권 이전 요청의 멱등성·재처리·보상 트랜잭션 정책을 설계합니다.",
        "향후 락 대기 시간과 TPS를 부하 테스트로 측정해 비관적 락의 실제 비용을 검증합니다.",
      ],
      lesson:
        "판매글 하나의 잠금만으로 거래 전체의 정합성이 완성되지는 않습니다.\n사용자 잔액과 서버 간 소유권 이전까지 일관성의 범위를 나누어 설계해야 합니다.\n검색에서도 정렬과 페이징의 적용 순서가 실제 결과에 영향을 준다는 점을 배웠습니다.",
    },
    image: project2,
    architectureImage: project2Arch,
    githubLink: "https://github.com/ryubyeongsun/cony-gifticon-platform",
    techReasons: [
      { label: "JPA 비관적 락 (PESSIMISTIC_WRITE)", desc: "동일 판매글을 잠금 조회해 동시 구매 경합을 순차 처리하고, 구매 검증과 포인트 이동·판매 상태 변경을 하나의 트랜잭션 흐름으로 묶었습니다." },
      { label: "Redis GEO & Pipeline", desc: "매장 거리 조회와 브랜드명 다건 조회를 처리하기 위해 도입했습니다. Pipeline으로 브랜드명 다건 조회의 네트워크 왕복을 줄이고, 브랜드별 최소 거리로 현재 DB 조회 페이지 안의 판매글을 정렬합니다." },
      { label: "Spring Scheduler", desc: "매일 오전 9시에 만료 판매글 삭제, 사용자 설정 자동판매, 판매 예정일 도래 건의 상태 전환 작업이 실행되도록 구성했습니다." }
    ],
    troubleshooting: {
      title: "동일 판매글 구매 경합 제어 및 페이지 내 거리순 정렬",
      date: "2026-02",
      environment: "Spring Boot 3.5.9, Java 17, JPA, MySQL 8.0, Redis, React Native 0.83.1",
      sections: [
        {
          title: "1. 동일 판매글의 동시 구매 경합 제어",
          content: (
            <div className="space-y-4">
              <div>
                <strong>문제 상황</strong>
                <p className="mt-2 whitespace-pre-line leading-relaxed">{"동일 판매글에 여러 구매 요청이 동시에 들어올 경우 중복 구매 위험이 있었습니다."}</p>
              </div>
              <div>
                <strong>원인 분석</strong>
                <p className="mt-2 whitespace-pre-line leading-relaxed">{"상태를 조회한 뒤 변경하는 사이에 다른 요청이 끼어들 수 있습니다. 구매 로직을 트랜잭션으로 묶는 것과 동일 판매글에 대한 접근을 직렬화하는 것은 별도의 문제입니다."}</p>
              </div>
              <div>
                <strong>해결 방법</strong>
                <p className="mt-2 whitespace-pre-line leading-relaxed">{"① 판매글 잠금 조회\nSale 행에 PESSIMISTIC_WRITE 잠금을 걸어 동일 판매글의 구매 요청을 순차 처리합니다.\n\n② 잠금 획득 후 구매 조건 검증\n판매 완료·판매 대기 상태, 본인 상품 구매 여부, 포인트 잔액을 확인합니다.\n\n③ Payment DB 변경을 한 트랜잭션으로 처리\n포인트 차감·지급, SOLD_OUT 전환, 구매 내역과 거래 로그를 함께 저장합니다.\n\n④ Manage 서버 소유권 이전 연동\n구매 메서드 안에서 Manage 서버의 기프티콘 소유권 이전 API를 호출합니다. 다른 서버의 변경까지 Payment DB의 로컬 트랜잭션으로 원자성을 보장하지는 않습니다."}</p>
              </div>
              <div>
                <strong>결과 및 성과</strong>
                <p className="mt-2 whitespace-pre-line leading-relaxed">{"[동시성 제어] 동일 판매글에 대한 구매 처리를 순차 진행하도록 구성\n[구매 검증] 잠금 조회 후 판매 상태와 구매 조건 확인\n[거래 기록] Payment DB의 포인트·판매 상태·구매 내역을 함께 반영"}</p>
              </div>
            </div>
          ),
        },
        {
          title: "2. Redis GEO·Pipeline 기반 위치 정보 처리 및 페이지 내 거리순 정렬",
          content: (
            <div className="space-y-4">
              <div>
                <strong>문제 상황</strong>
                <p className="mt-2 whitespace-pre-line leading-relaxed">{"가까운 매장순으로 판매글을 보여주려면 사용자 위치와 각 브랜드 매장 사이의 거리가 필요했습니다.\n한 브랜드에 여러 매장이 있어 가장 가까운 매장을 기준으로 정렬해야 했습니다."}</p>
              </div>
              <div>
                <strong>원인 분석</strong>
                <p className="mt-2 whitespace-pre-line leading-relaxed">{"① 매장과 판매글의 기준 차이\n위치 데이터는 매장 단위지만 판매글은 브랜드 단위여서 거리 정보를 연결해야 합니다.\n\n② 매장별 추가 조회\nGEO 검색 결과의 매장 ID마다 브랜드명을 개별 조회하면 Redis 요청의 네트워크 왕복이 반복됩니다."}</p>
              </div>
              <div>
                <strong>해결 방법</strong>
                <p className="mt-2 whitespace-pre-line leading-relaxed">{"① 반경 5km 내 매장 조회\nRedis GEOSEARCH로 사용자 위치 기준 반경 5km 내 매장 ID와 거리를 조회합니다.\n\n② Pipeline으로 브랜드명 일괄 조회\n조회된 여러 매장의 브랜드명을 Pipeline으로 가져와 Redis와의 네트워크 왕복을 줄입니다.\n\n③ 브랜드별 최소 거리 계산\n같은 브랜드의 매장이 여러 개라면 가장 가까운 매장의 거리를 Map에 저장합니다.\n\n④ 현재 DB 조회 페이지 안에서 거리순 정렬\nDB에서 이미 조회한 판매글 페이지에 브랜드별 최소 거리를 적용해 현재 페이지 안에서 거리순으로 재정렬합니다."}</p>
              </div>
              <div>
                <strong>결과 및 성과</strong>
                <p className="mt-2 whitespace-pre-line leading-relaxed">{"[위치 조회] 반경 5km 내 매장의 거리 정보를 Redis에서 조회\n[요청 묶음] 브랜드명 다건 조회에 Pipeline 적용\n[정렬 기준] 조회된 판매글 페이지에 브랜드별 최소 거리 반영"}</p>
              </div>
            </div>
          ),
        },
      ],
    },
  },
  {
    id: 3,
    title: "덕치 (Duckchi) — 모임 기반 더치페이/정산 서비스",
    description:
      "모임방 생성부터 결제 등록, 정산 요청/송금, 소비 리포트까지 한 흐름으로 사용하는 모바일 더치페이 서비스",
    period: "2026.02 ~ 2026.03 (5주)",
    team: "6명 (FE 1명, 풀스택 4명, INFRA/본인 1명)",
    role: "INFRA / Backend Developer (인증/프록시 담당)",
    techStack: [
      "Java 17",
      "Spring Boot 3.5",
      "Spring Security",
      "JWT",
      "Redis",
      "Kafka",
      "Docker Compose",
      "Jenkins",
      "Nginx",
      "AWS EC2",
      "RDS",
      "Prometheus",
    ],
    contribution: {
      title: "담당 역할 및 주요 기여",
      detailsTitle: "주요 기여 내용",
      summary: "Gateway·Core·Pay·Insight·Discovery와 Redis의 Docker Compose 운영 구성을 만들고, Jenkins 빌드·이미지 생성·EC2 배포 절차를 자동화했습니다.\n카카오 OAuth 로그인과 JWT·Redis 토큰 관리를 구현하고, Gateway 인증 필터와 운영 HTTPS 리다이렉트 문제를 담당했습니다.",
      details: [
        { title: "Docker Compose MSA 배포", description: "5개 백엔드 서비스와 Redis를 포함한 운영 Compose 구성" },
        { title: "Spring Cloud Gateway JWT", description: "외부 사용자 ID 헤더 제거, JWT·블랙리스트 검증 후 인증된 사용자 ID 전달" },
        { title: "Jenkins CI/CD", description: "CI·release job별 빌드와 이미지 생성·EC2 배포 흐름 구성" }
      ],
    },
    teamComposition: [
      { role: "프론트엔드", count: 1, isMe: false, tasks: "React Native 클라이언트 화면 구성 및 상태 관리" },
      { role: "풀스택", count: 4, isMe: false, tasks: "모임 정산, 결제 내역 등록, 소비 리포트 로직 개발" },
      { role: "인프라 / 백엔드 (본인)", count: 1, isMe: true, tasks: "Docker Compose 기반 MSA 운영 배포 구성, Gateway 인증 통합, CI/CD" }
    ],
    problemSolving: [
      {
        title: "HTTPS 리다이렉트 이후 모임방 생성 요청 실패 해결",
        problem: "로컬에서는 정상 동작하던 모임방 생성 POST 요청이 운영 환경에서 405 Method Not Allowed로 실패했습니다.",
        cause: "① HTTP → HTTPS 리다이렉트\n운영 Nginx가 301 응답으로 HTTPS 주소를 안내했습니다.\n\n② 클라이언트의 재요청 방식\n일부 클라이언트가 리다이렉트를 따라갈 때 POST를 GET으로 바꾸고 Body를 전달하지 않아, POST를 기대하는 API와 요청이 맞지 않았습니다.",
        solution: "① 리다이렉트 응답 변경\n운영 Nginx의 HTTPS 리다이렉트를 301에서 308 Permanent Redirect로 변경했습니다.\n\n② 메서드·Body 보존\n클라이언트가 HTTPS 주소로 재요청할 때 POST 메서드와 Body를 유지하도록 조정했습니다.",
        result: "[요청 방식] HTTPS 전환 후에도 POST 메서드 유지\n[요청 데이터] 재요청 시 Body 전달 유지\n[문제 범위] 애플리케이션 코드뿐 아니라 리다이렉트 응답과 클라이언트 재요청을 함께 점검",
        hasImage: true,
        customVisual: <DuckchiArchitectureCompare />,
      },
      {
        title: "Gateway JWT 검증과 사용자 식별 헤더 통합",
        problem: "여러 서비스로 요청을 전달하는 환경에서 인증된 사용자 ID를 일관되게 전달해야 했습니다. 클라이언트가 보낸 사용자 ID 헤더를 그대로 신뢰하지 않도록 요청 입구에서 검증이 필요했습니다.",
        cause: "① 사용자 식별 정보의 신뢰 경계\n외부 요청의 X-User-Id는 클라이언트가 임의로 지정할 수 있습니다.\n\n② 로그아웃 토큰의 사용 제한\nJWT 서명과 만료 검증만으로는 로그아웃 처리된 Access Token을 구분할 수 없어 Redis blacklist 확인이 필요했습니다.",
        solution: "① 외부 사용자 ID 제거\nGateway GlobalFilter에서 클라이언트가 보낸 X-User-Id 헤더를 가장 먼저 제거합니다.\n\n② 인증 예외와 보호 경로 구분\n인증 API·Swagger·Actuator 등 공개 경로는 인증 검증을 생략하고, 보호 경로는 Bearer Token을 확인합니다.\n\n③ Access Token 검증\nRedis blacklist를 확인하고 JWT 서명·만료를 검증합니다.\n\n④ 검증된 사용자 ID 전달\nJWT subject에서 추출한 사용자 ID를 X-User-Id 헤더로 새로 설정해 하위 서비스로 전달합니다. 검증 실패 시 401 응답을 반환합니다.\n\n⑤ 로그아웃 연동\nCore 서비스에서 Refresh Token을 Redis에서 삭제하고 Access Token은 남은 유효기간 동안 blacklist에 저장합니다.",
        result: "[사용자 식별] 외부 입력 헤더 대신 검증된 JWT의 사용자 ID 전달\n[인증 실패] 보호 경로의 유효하지 않은 요청에 401 응답\n[로그아웃] 블랙리스트에 등록된 Access Token을 Gateway에서 차단",
        hasImage: true,
        customVisual: <DuckchiAuthFlow />,
      },
    ],
    situation:
      "친구·동료와의 공동 결제를 관리하는 모바일 더치페이 서비스입니다. 모임방에서 결제 내역을 등록하고, 정산 요청·송금과 소비 리포트를 한 흐름으로 제공합니다.",
    task: "주요 기능: 카카오 로그인, 모임방 생성, 결제 내역 등록, 정산 요청·송금, 소비 리포트",
    action: `1. Docker Compose 기반 운영 환경 구성: EC2에서 Gateway, Core, Pay, Insight, Discovery 서비스와 Redis를 컨테이너로 구성. Kafka 이벤트 코드와 Prometheus 수집 설정은 별도 인프라 연동을 전제로 함.
2. Jenkins CI/CD 분리: Jenkinsfile에서 CI job은 서비스 빌드, release job은 Docker Hub 이미지 푸시와 EC2 Docker Compose 재배포 흐름을 수행하도록 구성.
3. Nginx + HTTPS 운영 이슈 대응: 운영 Nginx의 301→308 리다이렉트 변경으로 POST 메서드 유지 문제를 해결. 공개 레포에 Nginx 설정 파일은 없으며, API/SSE/정적 리소스별 프록시 정책은 향후 운영 설정 보강 과제.
4. 인증 흐름 구현: 카카오 OAuth 로그인 → JWT Access Token(30분) + Refresh Token(7일) 발급. Redis에 RTK 저장(TTL 기반 자동 만료), 로그아웃 시 삭제.
5. 운영 이슈 대응: Kafka 누락으로 insight-service 기동 실패, RDS 스키마 부재로 서비스 다운, 금융 API 시간대(KST/UTC) 차이 문제를 로그 추적으로 해결.
6. 모니터링 구성: Spring Boot Actuator와 Prometheus scrape 설정을 포함. Grafana 대시보드·알림과 장애 대응 자동화는 추가 보강 과제.`,
    result:
      "Docker Compose로 MSA 5개 서비스와 Redis를 재현 가능한 운영 구성으로 정리했습니다. Jenkins 파이프라인으로 반복적인 빌드·이미지 생성·EC2 배포 절차를 자동화했고, 운영 Nginx의 308 리다이렉트로 POST 메서드 유지 문제를 해결했습니다. Actuator와 Prometheus 수집 설정을 구성했으며 Grafana 대시보드·알림은 추가 보강 과제입니다.",
    retrospective: {
      regrets: [
        "CI·release job의 백엔드 빌드에 -x test가 적용돼 테스트 통과를 배포 조건으로 검증하지 못함",
        "현재 배포는 Compose down → pull → up 방식이며, 배포 후 상태 확인과 자동 롤백 단계가 없음",
        "운영 Nginx 설정이 공개 저장소에 없고, Kafka·Prometheus 등 일부 운영 인프라는 Compose 외부 구성이 필요함",
      ],
      improvements: [
        "향후 변경된 인증 필터와 테스트를 맞추고 CI에서 백엔드 테스트 실행을 복구",
        "향후 배포 후 헬스체크와 핵심 API smoke test 추가",
        "향후 배포 실패 시 이전 Docker 이미지 태그로 복구하는 롤백 절차 마련",
        "향후 민감정보를 제외한 운영 설정을 버전 관리하고 외부 인프라 연결 조건 문서화",
        "향후 Prometheus 수집 설정의 운영 연결을 검증하고 Grafana 대시보드·알림 정책 보강",
      ],
      lesson:
        "운영 장애에서는 요청이 어느 구간에서 달라지는지 추적해야 한다는 점을 배웠습니다.\n인증은 토큰 검증과 사용자 정보 전달의 신뢰 경계를 함께 설계해야 합니다.\n배포 자동화도 빌드·실행을 넘어 테스트와 배포 후 상태 확인·복구까지 이어져야 합니다.",
    },
    image: project3,
    architectureImage: project3Arch,
    githubLink: "https://github.com/ryubyeongsun/duckchi_pj",
    techReasons: [
      { label: "Docker Compose & Jenkins", desc: "5개 백엔드 서비스와 Redis의 실행 구성을 정의하고, CI 빌드와 release 이미지 생성·Docker Hub 푸시·EC2 배포 흐름을 분리했습니다." },
      { label: "Spring Cloud Gateway", desc: "서비스 진입점에서 JWT를 검증하고 외부 X-User-Id를 제거한 뒤, 검증된 사용자 ID를 하위 서비스에 전달하기 위해 사용했습니다." },
      { label: "JWT & Redis", desc: "Access/Refresh Token을 분리하고 Redis에 Refresh Token을 저장합니다.\n로그아웃 시 Refresh Token을 삭제하고 Access Token은 남은 유효기간 동안 블랙리스트로 관리합니다." },
    ],
    troubleshooting: {
      title: "운영 리다이렉트 대응 및 Gateway 인증 흐름",
      date: "2026-03",
      environment: "AWS EC2, Docker Compose, Nginx, Spring Cloud Gateway, JWT, Redis",
      sections: [
        {
          title: "1. HTTPS 리다이렉트 이후 모임방 생성 요청 실패 해결",
          content: (
            <div className="space-y-4">
              <div><strong>문제 상황</strong><p className="mt-2 whitespace-pre-line leading-relaxed">{"로컬에서는 정상 동작하던 모임방 생성 POST 요청이 운영 환경에서 405 Method Not Allowed로 실패했습니다."}</p></div>
              <div><strong>원인 분석</strong><p className="mt-2 whitespace-pre-line leading-relaxed">{"① HTTP → HTTPS 리다이렉트\n운영 Nginx가 301 응답으로 HTTPS 주소를 안내했습니다.\n\n② 클라이언트의 재요청 방식\n일부 클라이언트가 리다이렉트를 따라갈 때 POST를 GET으로 바꾸고 Body를 전달하지 않아, POST를 기대하는 API와 요청이 맞지 않았습니다."}</p></div>
              <div><strong>해결 방법</strong><p className="mt-2 whitespace-pre-line leading-relaxed">{"① 리다이렉트 응답 변경\n운영 Nginx의 HTTPS 리다이렉트를 301에서 308 Permanent Redirect로 변경했습니다.\n\n② 메서드·Body 보존\n클라이언트가 HTTPS 주소로 재요청할 때 POST 메서드와 Body를 유지하도록 조정했습니다."}</p></div>
              <div><strong>결과 및 성과</strong><p className="mt-2 whitespace-pre-line leading-relaxed">{"[요청 방식] HTTPS 전환 후에도 POST 메서드 유지\n[요청 데이터] 재요청 시 Body 전달 유지\n[문제 범위] 애플리케이션 코드뿐 아니라 리다이렉트 응답과 클라이언트 재요청을 함께 점검"}</p></div>
            </div>
          ),
        },
        {
          title: "2. Gateway JWT 검증과 사용자 식별 헤더 통합",
          content: (
            <div className="space-y-4">
              <div><strong>문제 상황</strong><p className="mt-2 whitespace-pre-line leading-relaxed">{"여러 서비스로 요청을 전달하는 환경에서 인증된 사용자 ID를 일관되게 전달해야 했습니다. 클라이언트가 보낸 사용자 ID 헤더를 그대로 신뢰하지 않도록 요청 입구에서 검증이 필요했습니다."}</p></div>
              <div><strong>원인 분석</strong><p className="mt-2 whitespace-pre-line leading-relaxed">{"① 사용자 식별 정보의 신뢰 경계\n외부 요청의 X-User-Id는 클라이언트가 임의로 지정할 수 있습니다.\n\n② 로그아웃 토큰의 사용 제한\nJWT 서명과 만료 검증만으로는 로그아웃 처리된 Access Token을 구분할 수 없어 Redis blacklist 확인이 필요했습니다."}</p></div>
              <div><strong>해결 방법</strong><p className="mt-2 whitespace-pre-line leading-relaxed">{"① 외부 사용자 ID 제거\nGateway GlobalFilter에서 클라이언트가 보낸 X-User-Id 헤더를 가장 먼저 제거합니다.\n\n② 인증 예외와 보호 경로 구분\n인증 API·Swagger·Actuator 등 공개 경로는 인증 검증을 생략하고, 보호 경로는 Bearer Token을 확인합니다.\n\n③ Access Token 검증\nRedis blacklist를 확인하고 JWT 서명·만료를 검증합니다.\n\n④ 검증된 사용자 ID 전달\nJWT subject에서 추출한 사용자 ID를 X-User-Id 헤더로 새로 설정해 하위 서비스로 전달합니다. 검증 실패 시 401 응답을 반환합니다.\n\n⑤ 로그아웃 연동\nCore 서비스에서 Refresh Token을 Redis에서 삭제하고 Access Token은 남은 유효기간 동안 blacklist에 저장합니다."}</p></div>
              <div><strong>결과 및 성과</strong><p className="mt-2 whitespace-pre-line leading-relaxed">{"[사용자 식별] 외부 입력 헤더 대신 검증된 JWT의 사용자 ID 전달\n[인증 실패] 보호 경로의 유효하지 않은 요청에 401 응답\n[로그아웃] 블랙리스트에 등록된 Access Token을 Gateway에서 차단"}</p></div>
            </div>
          ),
        },
      ],
    },
  },
]
