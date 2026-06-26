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
    team: "2명 (FE 1, BE 1)",
    role: "백엔드 전체 담당",
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
        result: "[예산오차] 무제한 초과 → 예산 ±15% 이내로 제어\n[상품 정확도] 엉뚱한 상품 노출 → 키워드 정규화로 매핑 정확도 개선\n[API 안정성] 실패 시 MOCK Fallback으로 서비스 중단 없이 기본 응답 제공"
      },
      {
        title: "AI API 응답 지연 및 타임아웃 해결",
        problem: "외부 AI API가 식단 생성에 8~10초 소요\n→ 동기 처리 시 브라우저 타임아웃(30초) 임박\n→ 사용자 응답 없음으로 인식\n→ 서비스 이탈 발생",
        cause: "식단 생성 요청이 동기적으로 처리되어\nAI API 응답이 올 때까지 스레드 블로킹\n클라이언트는 응답 대기 중 아무것도 할 수 없는 상태",
        solution: "@Async + CompletableFuture 비동기 전환\n① 요청 즉시 200 응답 반환\n② 백그라운드에서 AI API 처리\n③ 프론트 폴링으로 완료 확인 (1초 간격 GET 요청)",
        result: "[응답 시간] 8~10초 → 즉시(3초 이하) (80% 개선)\n[타임아웃 에러율] 발생 → 비동기전환으로 해결 (구조적 해소)\n[사용자 경험] 대기 화면 → 진행률 표시로 자연스러운 UX"
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
