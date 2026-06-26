import { CodeBlock } from "@/components/troubleshooting-dialog"
import project1 from "@/public/projects/project1-thumbnail.png"
import project2 from "@/public/projects/project2-thumbnail.png"
import project3 from "@/public/projects/project3-thumbnail.png"
import project1Arch from "@/public/projects/project1-architecture.png"
import project2Arch from "@/public/projects/project2-architecture.png"
import project3Arch from "@/public/projects/project3-architecture.png"

export const PROJECTS = [
  {
    id: 1,
    title: "Diet Coach (아보핏) — AI 기반 헬스케어 서비스",
    description:
      "TDEE 기반 AI 맞춤 식단 자동 생성 및 BMI 연동 3D 체형 시각화 헬스케어 플랫폼",
    period: "2025.11 ~ 2025.12 (4주)",
    team: "2명 (풀스택 1명, 풀스택 1명)",
    role: "Backend Developer (서버/인프라 전담)",
    techStack: [
      "Java 17",
      "Spring Boot 3.5",
      "MyBatis",
      "MySQL",
      "Vue.js 3",
      "Three.js",
    ],
    contribution: {
      percentage: "50%",
      summary: "백엔드 전체 아키텍처 설계, AI 파이프라인 최적화, 배포 및 인프라 구축",
      details: [
        { title: "AI 식단 자동 생성 API", percentage: 30, description: "TDEE 기반 목표별 식단 데이터 계산 및 비동기 처리" },
        { title: "11번가 장보기 API 연동", percentage: 10, description: "식재료 키워드 정규화 및 Mock Fallback 적용" },
        { title: "예산 필터링 알고리즘", percentage: 10, description: "추정 단가 기반 내림차순 정렬을 통한 예산 초과 제어" }
      ],
    },
    teamComposition: [
      { role: "풀스택", count: 1, isMe: false, tasks: "Vue.js 모바일 UI/UX, Three.js 3D 체형 시각화" },
      { role: "풀스택 (백엔드 전담)", count: 1, isMe: true, tasks: "AI 식단 생성 API, 장보기 연동, 예산 필터링, 비동기 파이프라인" }
    ],
    problemSolving: [
      {
        title: "예산 오차 및 엉뚱한 상품 매핑 문제 해결",
        problem: "1. 예산 오차: AI가 30일 식단 생성 시 재료비 합계가 사용자 예산(30만원)과 크게 차이 발생\n→ 예산 기반 서비스인데 예산이 안 맞음\n\n2. 상품 매핑 오류: AI가 식단 재료명(“닭가슴살 100g x 30팩”)을 그대로 11번가에 검색\n→ 계란박스·대용량 묶음 등 엉뚱한 상품 노출",
        cause: "1. AI API는 식재료 종류만 반환\n: 시장 단가를 모르기 때문에 예산 파라미터를 전달해도 총 재료비 합계 제어 불가\n\n2. 재료명에 수량·단위·포장 정보 혼재\n: 그대로 검색어 사용 시 노이즈 발생 → 원하는 단품 상품 연결 실패",
        solution: "1. filterItemsToBudget() — Greedy Filter\n: 재료를 추정 단가 기준 내림차순 정렬, 예산 초과 시 비싼 항목부터 순차 제거 (허용 범위 : 예산 x 1.15 이내)\n\n2. IngredientQueryNormalizer\n: 수량·단위·불용어 제거 (\"닭가슴살-100g×30팩\" → \"닭가슴살\")\n카테고리 화이트리스트 필터링 → 후보 TopN 스코어링 → 3개 이상 시 AI rerank → 대표 상품 1개 선정",
        result: "[예산오차] 무제한 초과 → 예산 ±15% 이내로 제어\n[상품 정확도] 엉뚱한 상품 노출 → 키워드 정규화로 매핑 정확도 개선\n[API 안정성] 실패 시 MOCK Fallback으로 서비스 중단 없이 기본 응답 제공",
        hasImage: true
      },
      {
        title: "AI API 응답 지연 및 타임아웃 해결",
        problem: "외부 AI API가 식단 생성에 8~10초 소요\n→ 동기 처리 시 브라우저 타임아웃(30초) 임박\n→ 사용자 응답 없음으로 인식\n→ 서비스 이탈 발생",
        cause: "식단 생성 요청이 동기적으로 처리되어\nAI API 응답이 올 때까지 스레드 블로킹\n클라이언트는 응답 대기 중 아무것도 할 수 없는 상태",
        solution: "@Async + CompletableFuture 비동기 전환\n① 요청 즉시 200 응답 반환\n② 백그라운드에서 AI API 처리\n③ 프론트 폴링으로 완료 확인 (1초 간격 GET 요청)",
        result: "[응답 시간] 8~10초 → 즉시(3초 이하) (80% 개선)\n[타임아웃 에러율] 발생 → 비동기전환으로 해결 (구조적 해소)\n[사용자 경험] 대기 화면 → 진행률 표시로 자연스러운 UX",
        hasImage: false
      }
    ],
    situation:
      "운동과 식단 관리를 병행하려는 사용자들이 과학적 근거(TDEE)에 기반한 맞춤 식단을 추천받기 어려운 문제가 있었습니다. 기존 식단 앱은 단순 칼로리 계산에 그쳐, 개인별 대사량을 반영한 영양소 최적화와 체형 변화의 시각적 피드백이 부족했습니다.",
    task: "사용자의 신체 정보를 기반으로 Harris-Benedict 공식으로 TDEE를 분석하고, AI가 30일분 맞춤 식단을 자동 생성하는 백엔드 시스템을 구축해야 했습니다. 특히 외부 AI API의 응답 지연(8~10초) 문제를 해결하여 사용자 경험을 보장하는 것이 핵심 과제였습니다.",
    action: `1. Spring @Async 비동기 처리: AI 식단 생성 API 호출을 비동기로 전환. ThreadPoolTaskExecutor(Core=5, Max=10)를 구성하고 CompletableFuture로 백그라운드 처리. 사용자에게 즉시 200 응답을 반환하고, 프론트엔드가 폴링으로 진행 상태를 확인하도록 설계.
2. JWT RTR 인증: Access Token(30분) + Refresh Token(7일)을 활용하되, Refresh Token도 사용 시 새로 발급하는 Rotation 방식을 적용하여 토큰 탈취 위험을 최소화.
3. TDEE 기반 식단 추천 로직: 나이·성별·체중·신장·활동량으로 기초대사량(BMR) 계산 후 목표(다이어트/유지/증량)에 맞춘 칼로리와 탄·단·지 비율을 산출하여 AI에게 전달.
4. 11번가 API 장보기 연동: 추천 식단의 식재료를 11번가 API로 검색·링크하는 기능 구현. 외부 API 장애 시에도 서비스가 중단되지 않도록 Mock Fallback을 적용.`,
    result:
      "🏆 SSAFY 14기 최종 프로젝트 우수상 수상. @Async 적용으로 API 체감 응답 시간을 8~10초에서 1초 이하로 단축(80% 개선). 타임아웃 에러율 100% → 0%로 감소. WAS 스레드 블로킹 제거로 동시 요청 처리 능력 향상.",
    retrospective: {
      regrets: [
        "상품 파싱 실패 케이스 일부 잔존 (수량/단위 혼재 패턴 완전 미해결)",
        "단위 테스트 미작성으로 인해 리팩토링 시 회귀 검증이 불가했던 점",
      ],
      improvements: [
        "AI rerank 후보 품질 강화 (하드필터 + 스코어링 먼저 계산)",
        "파싱 정규화 화이트리스트 확장 및 개선",
        "Redis 캐싱을 도입하여 11번가 커머스 API 호출 최소화",
      ],
      lesson:
        "단순히 외부 API를 연동하는 것을 넘어, 실패·타임아웃·사용자 대기 상태까지 고려한 전체 흐름(Flow) 설계가 훨씬 중요하다는 것을 깨달았습니다. 기술적인 성능 개선만큼이나 예외 상황에서의 안정성과 UX 방어가 필수적이라는 점을 배웠습니다.",
    },
    image: project1,
    architectureImage: project1Arch,
    githubLink: "https://github.com/ryubyeongsun/diet_coach_PJ",
    techReasons: [
      { label: "MyBatis", desc: "JPA 대신 동적 SQL과 resultMap을 활용하여 실사용 흐름에 맞는 복잡한 조건 쿼리를 직접 제어하기 위해 선택했습니다." },
      { label: "JWT RTR", desc: "일반 JWT 대신 Refresh Token 사용 시마다 토큰을 즉각 폐기/무효화하여 탈취 및 악용을 구조적으로 차단했습니다." },
      { label: "@Async", desc: "전체 WebFlux 전환 비용을 피하면서도 기존 Spring MVC 구조 내에서 AI API 대기 스레드 블로킹 문제를 효율적으로 해결했습니다." }
    ],
    troubleshooting: {
      title: "AI 식단 파이프라인 지연 및 커머스 연동 정합성 문제 해결",
      date: "2025-12",
      environment:
        "Spring Boot 3.5.8, Java 17, MyBatis 3.0.5, MySQL 8.0, Vue.js 3.5.24",
      sections: [
        {
          title: "1. [Problem 1] 식재료 예산 오차 및 엉뚱한 상품 매핑",
          content: (
            <ul className="list-disc list-inside space-y-1">
              <li>
                <strong>예산 오차:</strong> AI는 식재료 종류만 반환하여 11번가 검색 시 사용자가 설정한 예산(30만 원)을 크게 초과(약 42만 원)하는 문제 발생.
              </li>
              <li>
                <strong>상품 매핑 오류:</strong> "닭가슴살-100g x 30팩" 같은 구체적인 AI 추천 문자열을 그대로 검색 시 노이즈가 발생해 '계란 박스' 등 엉뚱한 상품이 노출됨.
              </li>
            </ul>
          ),
        },
        {
          title: "2. [Resolution 1] 정규화 필터 및 예산 최적화 (Greedy Filter)",
          content: (
            <div className="space-y-4">
              <div>
                <strong>2.1 IngredientQueryNormalizer (키워드 정규화)</strong>
                <p className="mt-1">
                  수량/단위/불용어를 제거("닭가슴살-100g x 30팩" → "닭가슴살")하고 카테고리 화이트리스트 필터링을 적용해 매핑 정확도를 높였습니다.
                </p>
              </div>
              <div>
                <strong>2.2 filterItemsToBudget() - Greedy Filter</strong>
                <p className="mt-1">
                  검색된 재료들을 추정 단가 기준으로 내림차순 정렬 후, 예산 초과 시 가장 비싼 항목부터 순차적으로 제거하여 예산의 ±15% 이내로 제어했습니다.
                </p>
              </div>
              <div>
                <strong>2.3 Mock Fallback 패턴 적용</strong>
                <p className="mt-1">
                  11번가 API 장애 발생 시 서비스가 중단되지 않도록 사전에 준비된 Mock Data를 반환하는 Fallback 로직을 적용해 안정성을 보장했습니다.
                </p>
              </div>
            </div>
          ),
        },
        {
          title: "3. [Problem 2] AI 식단 생성 API 타임아웃",
          content: (
            <ul className="list-disc list-inside space-y-1">
              <li>
                <strong>현상:</strong> 30일치 식단(90끼) 생성에 8~10초가 소요되어, 동기 처리 시 브라우저 타임아웃(30초)에 임박하거나 스레드가 블로킹됨.
              </li>
              <li>
                <strong>영향:</strong> 클라이언트는 대기 상태에 빠지고, 사용자는 응답 없음으로 인식하여 이탈 발생.
              </li>
            </ul>
          ),
        },
        {
          title: "4. [Resolution 2] @Async 기반 비동기 전환",
          content: (
            <div className="space-y-4">
              <div>
                <strong>4.1 Spring MVC에서 @Async 분리 (WebFlux 대안)</strong>
                <p>
                  전체 시스템을 WebFlux로 전환하기에는 리팩토링 비용이 컸으므로, 기존 구조를 유지하며 비동기 처리만 분리하는 <code>@Async + CompletableFuture</code>를 채택했습니다.
                </p>
                <CodeBlock label="MealService.java">
                  {`@Async("taskExecutor")
public CompletableFuture<MealPlanResponse> generateMealPlanAsync(MealRequest request) {
    // 1. 프론트에 즉시 200 응답 반환 후 백그라운드 처리
    String aiResult = restTemplate.postForObject(AI_API_URL, request, String.class);
    return CompletableFuture.completedFuture(saveMealPlan(aiResult));
}`}
                </CodeBlock>
              </div>
              <div>
                <strong>4.2 프론트엔드 폴링 (진행률 표시)</strong>
                <p>
                  서버에서 백그라운드 처리가 진행되는 동안 프론트엔드(Vue.js)에서는 1초 간격으로 상태를 확인(Polling)하며 사용자에게 진행률 UI를 제공했습니다.
                </p>
              </div>
            </div>
          ),
        },
        {
          title: "5. 종합 성과 (Results)",
          content: (
            <ul className="list-disc list-inside space-y-2 bg-slate-100 dark:bg-slate-900 p-4 rounded-md">
              <li>
                <strong>예산 및 정확도 제어:</strong> 예산 오차 무제한 초과를 ±15% 이내로 제어하고, 정규화로 엉뚱한 상품 노출을 차단했습니다.
              </li>
              <li>
                <strong>타임아웃 에러 0%:</strong> 동기 처리 대기 시간(8~10초)을 즉시 반환으로 개선(80% 단축)하여 UX를 개선했습니다.
              </li>
              <li>
                <strong>안정적인 커머스 연동:</strong> API 실패 시 Mock Fallback을 통해 서비스 중단 없이 유연하게 대처했습니다.
              </li>
            </ul>
          ),
        },
      ],
    },
  },
  {
    id: 2,
    title: "CONY — 기프티콘 관리 및 판매 서비스",
    description:
      "AI(OCR) 기프티콘 자동 등록, 위치 기반 스마트 알림, 유효기간 임박 자동 판매, 공유방 기능을 제공하는 기프티콘 관리·거래 앱",
    period: "2026.01 ~ 2026.02 (6주)",
    team: "5명 (FE 2명, BE 1명, BE/본인 1명, INFRA 1명, AI 1명)",
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
      percentage: "25%",
      summary: "결제 트랜잭션 동시성 제어 및 위치 기반 성능 최적화",
      details: [
        { title: "PESSIMISTIC_WRITE 비관적 락", percentage: 10, description: "동시 구매 결제 시 데이터 정합성 보장 및 중복 거래 차단" },
        { title: "거래 프로세스 원자적 설계", percentage: 10, description: "본인 검증, 잔액 확인, 소유권 이전을 하나의 트랜잭션으로 통합" },
        { title: "Redis GEO 반경 검색 API", percentage: 5, description: "Haversine 공식 의존성 탈피, 인메모리 반경 검색 구현" }
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
        title: "위치 기반 판매글 검색 성능 개선",
        problem: "사용자 위치 기반 \"가까운 매장순\" 판매글 정렬 시\nMySQL에서 Haversine 공식으로 모든 매장과의 거리를 매 요청마다 계산\n→ 매장 수 증가 시 O(N) 풀스캔 + 수학 연산\n→ 응답 속도 저하 (매장이 많아질수록 느려짐)",
        cause: "MySQL의 한계\n① 매 요청마다 전체 매장에 대해 Haversine 삼각함수 연산 수행\n② 거리 계산 결과 정렬 시 인덱스 활용 불가\n③ 브랜드별 최소 거리 계산에 GROUP BY + 서브쿼리 필요\n→ 위치 검색 요청이 많아질수록 DB 부하 급증",
        solution: "Redis GEO로 위치 데이터를 인메모리 캐시 계층에 분리\n① GEOSEARCH로 반경 5km 내 매장만 조회\n② Pipeline으로 브랜드명 일괄 조회\n③ 브랜드별 최소 거리 맵 생성 후 메모리 정렬",
        result: "[정렬 방식] DB ORDER BY (인덱스 불가) → 인메모리 정렬\n[네트워크] 매장 N개 × N번 왕복 → Pipeline 1회\n[거리 계산] 매 요청마다 전체 매장 풀스캔 → 반경 내 매장만 조회\n[확장성] 매장 증가 시 성능 저하 → 캐시 계층 분리로 DB 부하 차단",
        hasImage: true
      }
    ],
    situation:
      "기프티콘 유효기간 만료로 인한 낙전 금액이 연간 수백억 원에 달합니다. 기존 서비스는 수동 등록이 번거롭고, 사용 가능한 매장을 찾기 어려우며, 유효기간 관리가 되지 않아 사용률이 낮았습니다. 특히 인기 상품에 여러 사용자가 동시에 구매를 시도하면 중복 거래가 발생할 위험이 있었습니다.",
    task: "거래 중복 방지를 위한 동시성 제어, 자동 판매 등록 배치, 거리순 검색 성능을 안정적으로 구현하는 것이 목표였습니다. 동시성 제어를 통해 데이터 정합성을 보장하고, 위치 기반 검색의 성능을 최적화하며, 스케줄링을 통한 운영 자동화 시스템을 구축해야 했습니다.",
    action: `1. 비관적 락 기반 동시성 제어: 판매글 조회 시 JPA PESSIMISTIC_WRITE 락을 적용해 동시 구매 Race Condition을 차단. 낙관적 락은 충돌 시 재시도 로직이 복잡해져 금융 거래 특성상 비관적 락을 선택.
2. 거래 프로세스 3단 검증 설계: ① 판매 가능 상태(ON_SALE) 확인 ② 본인 상품 구매 차단 ③ 포인트 잔액 검증 통과 후, 포인트 차감/지급 및 판매 상태를 SOLD_OUT으로 변경하고 Manage 서버에 소유권 이전을 요청. 전체를 하나의 @Transactional로 묶어 원자적 처리.
3. 배치 자동화: 매일 09:00에 Spring Scheduler 배치를 실행해 만료 판매글 삭제, 예약 판매 생성, PENDING → ON_SALE 전환을 자동화.
4. Redis GEO 기반 위치 검색: 매장 좌표를 Redis GEO에 저장하고 GEORADIUS 명령으로 반경 검색 및 거리순 정렬을 캐시 계층에서 처리. Pipeline으로 다건 조회 시 네트워크 왕복 최소화.`,
    result:
      "🏆 SSAFY 14기 공통 프로젝트 우수상 수상. 비관적 락 적용으로 동시 구매 시 데이터 정합성 100% 보장, 중복 거래 완전 차단. Redis GEO로 위치 기반 검색 응답 속도 대폭 개선. Spring Scheduler로 수동 운영 작업 100% 제거.",
    retrospective: {
      regrets: [
        "락 대기가 길어질 경우 대규모 트래픽에서 처리량(TPS) 하락 우려",
        "JMeter 등을 활용한 동시성 및 부하에 대한 정량적 수치 검증 부재",
      ],
      improvements: [
        "DB 부하 완화를 위한 Redis 분산 락(Redisson) 전환 검토",
        "k6/JMeter 기반 부하 테스트 시나리오 구축 및 병목 구간 TPS 측정",
      ],
      lesson:
        "결제 도메인에서는 빠른 응답보다 정확하고 안전한 데이터 처리가 최우선 설계 원칙임을 체감했습니다. 비관적 락은 성능 저하를 유발할 수 있지만, 돈이 오가는 시스템에서 \"단 한 건의 중복 결제도 없어야 한다\"는 요구사항에는 가장 확실한 선택이었습니다.",
    },
    image: project2,
    architectureImage: project2Arch,
    githubLink: "https://github.com/ryubyeongsun/cony-gifticon-platform",
    techReasons: [
      { label: "JPA 비관적 락 (PESSIMISTIC_WRITE)", desc: "낙관적 락의 재시도 로직 한계를 피하고 '단 한 건의 중복 결제도 허용하지 않는' 금융 거래 무결성을 위해 DB 레벨의 순차 처리를 강제했습니다." },
      { label: "Redis GEO & Pipeline", desc: "MySQL Haversine 삼각함수 풀스캔의 O(N) 연산 한계를 극복하고, 반경 조회와 일괄 조회로 네트워크 왕복을 최소화했습니다." },
      { label: "Spring Scheduler", desc: "별도의 무거운 배치 프레임워크 도입 없이, 예약 판매 및 만료 처리를 경량으로 스케줄링하여 운영을 자동화했습니다." }
    ],
    troubleshooting: {
      title: "동시 구매 중복 거래 방지 및 위치 검색 성능 최적화",
      date: "2026-02",
      environment:
        "Spring Boot 3.5.9, Java 17, JPA, MySQL 8.0, Redis, React Native 0.83.1",
      sections: [
        {
          title: "1. [Problem 1] 동시 구매 시 중복 거래 발생",
          content: (
            <ul className="list-disc list-inside space-y-1">
              <li>
                <strong>현상:</strong> 동일 판매글에 다수의 구매 요청이 동시에 몰리면 중복 결제가 발생할 수 있었습니다.
              </li>
              <li>
                <strong>영향:</strong> 이미 판매 완료된 상품에 대해 여러 사용자가 결제를 성공하는 심각한 데이터 정합성 문제가 발생했습니다.
              </li>
            </ul>
          ),
        },
        {
          title: "2. [Resolution 1] PESSIMISTIC_WRITE 비관적 락 적용",
          content: (
            <div className="space-y-4">
              <div>
                <strong>2.1 금융 거래 특성상 확실한 순차 처리 선택</strong>
                <p className="mt-1">
                  낙관적 락(Optimistic Lock)은 충돌 시 재시도 로직이 복잡해지므로, 단 한 건의 중복 결제도 허용하지 않기 위해 DB 레벨의 강력한 동시성 제어인 비관적 락을 선택했습니다.
                </p>
                <CodeBlock label="SaleRepository.java">
                  {`@Lock(LockModeType.PESSIMISTIC_WRITE)
@Query("SELECT s FROM Sale s WHERE s.id = :saleId")
Optional<Sale> findByIdWithLock(@Param("saleId") Long saleId);`}
                </CodeBlock>
              </div>
            </div>
          ),
        },
        {
          title: "3. [Problem 2] MySQL 위치 검색 성능의 한계 (O(N) 풀스캔)",
          content: (
            <ul className="list-disc list-inside space-y-1">
              <li>
                <strong>원인 1:</strong> 매 요청마다 전체 매장에 대해 Haversine 삼각함수(sin, cos, acos) 연산을 수행했습니다.
              </li>
              <li>
                <strong>원인 2:</strong> 거리 계산 결과 정렬 시 인덱스 활용이 불가능하여 DB 정렬 부하가 컸습니다.
              </li>
              <li>
                <strong>원인 3:</strong> 브랜드별 최소 거리 계산에 GROUP BY + 서브쿼리가 필요해 위치 검색 요청이 많아질수록 DB 부하가 급증했습니다.
              </li>
            </ul>
          ),
        },
        {
          title: "4. [Resolution 2] Redis GEO & Pipeline 기반 캐시 계층 분리",
          content: (
            <div className="space-y-4">
              <div>
                <strong>4.1 Redis GEOSEARCH로 반경 검색</strong>
                <p className="mt-1">
                  위치 데이터를 인메모리 기반 Redis로 분리했습니다. <code>GEOSEARCH</code>로 반경 5km 내 매장만 조회하여 원거리 매장 연산 자체를 제거했습니다.
                </p>
              </div>
              <div>
                <strong>4.2 Pipeline을 활용한 일괄 조회</strong>
                <p className="mt-1">
                  조회된 매장들의 브랜드명을 가져올 때, Redis Pipeline을 활용하여 N번 왕복 대신 1회 요청으로 네트워크 통신을 최소화했습니다.
                </p>
              </div>
              <div>
                <strong>4.3 인메모리 정렬로 DB GROUP BY 제거</strong>
                <p className="mt-1">
                  애플리케이션 단에서 브랜드별 최소 거리 Map을 생성하고 메모리에서 정렬하는 경량 처리 방식으로 개선하여 DB 부하를 차단했습니다.
                </p>
              </div>
            </div>
          ),
        },
        {
          title: "5. 종합 성과 (Results)",
          content: (
            <ul className="list-disc list-inside space-y-2 bg-slate-100 dark:bg-slate-900 p-4 rounded-md">
              <li>
                <strong>결제 무결성 확보:</strong> 비관적 락으로 트랜잭션 경합 시 발생할 수 있는 중복 결제를 원천 차단했습니다.
              </li>
              <li>
                <strong>위치 검색 병목 해소:</strong> 전체 매장 풀스캔에서 반경 내 매장만 인메모리로 조회 및 정렬하도록 개선하여 검색 응답 속도를 극대화했습니다.
              </li>
              <li>
                <strong>네트워크 최적화:</strong> Pipeline 적용으로 캐시 서버와의 통신 오버헤드를 1회로 단축시켰습니다.
              </li>
            </ul>
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
      "Grafana",
    ],
    contribution: {
      percentage: "15%",
      summary: "MSA 인프라 구축, 배포 자동화, 게이트웨이 인증 통합",
      details: [
        { title: "Docker Compose MSA 배포", percentage: 5, description: "5개 마이크로서비스 및 Kafka, Redis 통합 런타임 환경 구성" },
        { title: "Spring Cloud Gateway JWT", percentage: 5, description: "라우팅 단일 진입점에서 토큰 검증 및 인가 처리" },
        { title: "Jenkins CI/CD 자동화", percentage: 5, description: "브랜치별(develop/release) 배포 환경 분리 및 자동화" }
      ],
    },
    teamComposition: [
      { role: "프론트엔드", count: 1, isMe: false, tasks: "React Native 클라이언트 화면 구성 및 상태 관리" },
      { role: "풀스택", count: 4, isMe: false, tasks: "모임 정산, 결제 내역 등록, 소비 리포트 로직 개발" },
      { role: "인프라 / 백엔드 (본인)", count: 1, isMe: true, tasks: "MSA 인프라 전체 구성, Gateway 인증 통합, CI/CD" }
    ],
    problemSolving: [
      {
        title: "배포 후 모임방 생성 API 실패 해결",
        problem: "로컬에선 정상 동작하던 '모임방 생성(POST)' API가\n배포 후 지속 실패 (405 Method Not Allowed)",
        cause: "① Nginx 301 상태 코드의 스펙 한계: 보안(HTTPS) 강제 전환을 위해 301 Moved Permanently 리다이렉트 사용 중\n② 프록시 계층 규약 충돌: 일부 클라이언트 환경에서 301 응답을 받고 재요청 시, 기존 POST 메서드를 GET으로 변환하고 Body를 버리는 HTTP 스펙 상의 종속성 문제 확인",
        solution: "308 Permanent Redirect로 전면 교체\n① 최신 HTTP 스펙 규약 활용: Nginx nginx.conf 설정 파일 수정 (return 308 https://$host$request_uri; 적용)\n② 308 코드를 통해 리다이렉트 발생 시 기존 HTTP 메서드(POST)와 Body 데이터를 원본 그대로 유지하도록 네트워크 프록시 흐름 강제",
        result: "[HTTP 메서드] POST → GET으로 변환됨 → POST 메서드 유지\n[Body 데이터] 페이로드 소실 → Body 데이터 정상 전달\n[API 안정성] 배포 후 통신 장애 발생 → 네트워크 프록시 환경 정상 동작 보장",
        hasImage: false
      }
    ],
    situation:
      "친구/동료 모임에서 공동 결제 후 정산이 번거로운 사용자를 위해, 모임방 생성부터 정산/송금, 소비 리포트까지 한 흐름으로 제공하는 모바일 더치페이 서비스입니다. 프로젝트 후반에는 단순히 기능 구현을 넘어 실제 운영 환경에서 안정적으로 배포되고 동작하는 구조가 필요했고, 인증 흐름과 외부 연동, 프록시, 메시징, 모니터링까지 여러 계층의 문제가 동시에 드러났습니다.",
    task: "인프라 담당으로서 EC2 기반 운영 환경에 MSA 서비스를 안정적으로 배포하고, CI/CD와 모니터링 체계를 구축해야 했습니다. 백엔드에서는 카카오 OAuth 로그인, JWT 토큰 관리, Redis 기반 세션 관리를 구현하고, 운영 환경에서 발생하는 인증/리다이렉트/시간대 이슈를 빠르게 해결하는 것이 핵심 과제였습니다.",
    action: `1. Docker Compose 기반 운영 환경 구성: EC2 위에 Gateway, Core, Pay, Insight, Discovery 서비스를 컨테이너로 배포하고 Redis, Kafka를 함께 구성해 서비스 간 의존성을 정리.
2. Jenkins CI/CD 분리: develop 브랜치는 CI(빌드/테스트), release 브랜치는 CD(Docker Hub 푸시 → EC2 재배포)로 목적을 분리하여 배포 안정성 확보.
3. Nginx + HTTPS 운영 안정화: 리버스 프록시, TLS 인증서 설정, 301→308 리다이렉트 변경으로 POST 메서드 유지 문제 해결. API/SSE/정적 리소스 경로별 프록시 정책 분리.
4. 인증 흐름 구현: 카카오 OAuth 로그인 → JWT Access Token(30분) + Refresh Token(7일) 발급. Redis에 RTK 저장(TTL 기반 자동 만료), 로그아웃 시 삭제.
5. 운영 이슈 대응: Kafka 누락으로 insight-service 기동 실패, RDS 스키마 부재로 서비스 다운, 금융 API 시간대(KST/UTC) 차이 문제를 로그 추적으로 해결.
6. 모니터링 체계 구축: Spring Boot Actuator + Prometheus + Grafana를 연동해 CPU, 메모리, HTTP 요청 수를 대시보드로 시각화.`,
    result:
      "Docker Compose 하나로 MSA 5개 서비스 + 인프라를 재현 가능한 환경 구축. Jenkins CI/CD로 수동 배포 작업 100% 제거. Nginx 308 리다이렉트 적용으로 운영 환경 POST 메서드 유지 문제 해결. Prometheus + Grafana로 배포 후 서비스 상태 실시간 모니터링 체계 확립.",
    retrospective: {
      regrets: [
        "단일 EC2 운영으로 서비스가 늘어나면 리소스 한계. 멀티 노드(ECS, K8s) 전환을 고려해야 함",
        "서킷 브레이커 미적용: 서비스 간 장애 전파 방지를 위한 Resilience4j 도입을 검토했으나 시간 부족으로 미적용",
      ],
      improvements: [
        "Kubernetes(EKS) 전환으로 오토스케일링 및 셀프힐링 적용 검토",
        "Resilience4j 서킷 브레이커 패턴 도입으로 서비스 간 장애 격리",
        "Blue/Green 배포 전략으로 무중단 배포 구현",
      ],
      lesson:
        "\"로컬에서 되는데 운영에서 안 된다\"는 문제는 대부분 애플리케이션 코드가 아니라 프록시, 인증서, 리다이렉트 정책 같은 인프라 환경 차이에서 발생한다는 것을 체감했습니다. \"요청이 어디서 변형되는가\"를 기준으로 원인을 좁히는 디버깅 습관을 만들었습니다.",
    },
    image: project3,
    architectureImage: project3Arch,
    techReasons: [
      { label: "Docker Compose & Jenkins", desc: "5개의 MSA 서비스 배포 복잡도를 해결하고, CI/CD 자동화를 통해 수동 배포로 인한 휴먼 에러를 제거했습니다." },
      { label: "Spring Cloud Gateway", desc: "각 마이크로서비스마다 중복되는 인증 로직을 전역 필터(JWT)로 중앙 제어하여 단일 진입점을 확보했습니다." },
      { label: "Kafka Event Broker", desc: "결제와 리포트 도메인 간의 동기 통신으로 인한 장애 연쇄를 방지하고, 큐 분리를 통해 서비스 간 강결합을 끊어냈습니다." }
    ],
    troubleshooting: {
      title:
        "Nginx 301 리다이렉트로 POST 요청이 GET으로 바뀌며 모임방 생성이 실패한 문제 해결",
      date: "2026-03",
      environment:
        "AWS EC2, Docker Compose, Nginx, Spring Cloud Gateway, HTTPS",
      sections: [
        {
          title: "1. 문제 상황 (Symptoms)",
          content: (
            <ul className="list-disc list-inside space-y-1">
              <li>
                <strong>현상:</strong> 앱에서 모임방 생성 API를 호출하면
                클라이언트 기준으로는 정상 요청처럼 보였지만, 운영 환경에서만{" "}
                <code>POST /api/...</code> 요청이 실패했습니다.
              </li>
              <li>
                <strong>영향:</strong> 로컬과 개발 환경에서는 정상 동작했지만
                HTTPS가 적용된 운영 환경에서 핵심 생성 기능이 막혀 실제 서비스
                이용이 불가능했습니다.
              </li>
              <li>
                <strong>초기 오해:</strong> 처음에는 Gateway 라우팅이나 Spring
                Controller 문제를 의심했지만, 애플리케이션 로그에는 아예 기대한
                POST 요청이 남지 않았습니다.
              </li>
            </ul>
          ),
        },
        {
          title: "2. 원인 분석 (Root Cause Analysis)",
          content: (
            <div className="space-y-4">
              <div>
                <strong>2.1 프록시 계층에서 메서드 변경 발생</strong>
                <p className="mt-1">
                  Nginx가 HTTP 요청을 HTTPS로 넘기기 위해 사용하던{" "}
                  <code>301</code> 리다이렉트가 문제였습니다. 일부 클라이언트
                  환경에서는 리다이렉트 이후 원래의 <code>POST</code> 메서드를
                  유지하지 않고 <code>GET</code>으로 재요청했습니다.
                </p>
              </div>
              <div>
                <strong>2.2 애플리케이션보다 앞단 로그를 먼저 확인</strong>
                <p className="mt-1">
                  Spring 로그보다 Nginx access log와 redirect 동작을 먼저
                  확인하면서, 요청이 애플리케이션에 도달하기 전 프록시 계층에서
                  변형되고 있다는 점을 파악했습니다.
                </p>
                <CodeBlock label="문제 상황 요약">
                  {`Client POST /api/v1/rooms
-> Nginx 301 redirect to HTTPS
-> Client replays request as GET
-> Gateway/Backend expects POST, request mismatch 발생`}
                </CodeBlock>
              </div>
            </div>
          ),
        },
        {
          title: "3. 해결 방법 (Resolution)",
          content: (
            <div className="space-y-4">
              <div>
                <strong>3.1 301 대신 308 리다이렉트 적용</strong>
                <p className="mt-1">
                  메서드와 body를 유지하는 <code>308 Permanent Redirect</code>로
                  변경해 클라이언트가 HTTPS 재요청 시에도 POST 요청을 그대로
                  유지하도록 수정했습니다.
                </p>
                <CodeBlock label="nginx.conf">
                  {`server {
    listen 80;
    server_name duckchi.example.com;
    return 308 https://$host$request_uri;
}`}
                </CodeBlock>
              </div>
              <div>
                <strong>3.2 경로별 프록시 설정 점검</strong>
                <p className="mt-1">
                  API, SSE, 정적 리소스의 성격이 달라 동일 설정으로 처리하지 않고
                  경로별 프록시 정책을 분리했습니다. 이후 SSE 연결에는 버퍼링과
                  timeout 설정도 별도로 조정했습니다.
                </p>
              </div>
            </div>
          ),
        },
        {
          title: "4. 결과와 배운 점 (Results & Lessons)",
          content: (
            <ul className="list-disc list-inside space-y-2 bg-slate-100 dark:bg-slate-900 p-4 rounded-md">
              <li>
                <strong>결과:</strong> 운영 환경에서 모임방 생성 POST 요청이 정상
                전달되었고, HTTPS 전환 이후에도 API 메서드가 유지되었습니다.
              </li>
              <li>
                <strong>운영 관점:</strong> 로컬에서는 재현되지 않는 문제일수록
                애플리케이션 코드보다 프록시, 인증서, 리다이렉트 정책 같은 환경
                차이를 먼저 봐야 한다는 점을 배웠습니다.
              </li>
              <li>
                <strong>확장:</strong> 이후 App Link, SSE, 외부 Redirect URI 같은
                프록시 의존 기능을 점검할 때도 동일하게 &ldquo;요청이 어디서
                변형되는가&rdquo;를 기준으로 원인을 좁히는 습관을 만들었습니다.
              </li>
            </ul>
          ),
        },
      ],
    },
  },
]
