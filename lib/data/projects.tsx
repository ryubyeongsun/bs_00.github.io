import { CodeBlock } from "@/components/troubleshooting-dialog"
import Image from "next/image"
import project1Before from "@/public/projects/project1-before.png"
import project1After from "@/public/projects/project1-after.png"
import project1Arch from "@/public/projects/project1-architecture-corrected.png"
import project1 from "@/public/projects/project1-thumbnail.png"
import project2 from "@/public/projects/project2-thumbnail.png"
import project3 from "@/public/projects/project3-thumbnail.png"
import project2Arch from "@/public/projects/project2-architecture.png"
import project3Arch from "@/public/projects/project3-architecture.png"
import { ConyArchitectureCompare } from "@/components/cony-architecture-compare"
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
        imageNote: "기존 포트폴리오의 장보기 화면 예시입니다. 표시된 금액·비율은 개별 예시이며, 실측 개선율이나 모든 추천의 예산 준수를 의미하지 않습니다.",
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
      percentage: "25%",
      summary: "결제 트랜잭션 동시성 제어 및 위치 기반 성능 최적화",
      details: [
        { title: "PESSIMISTIC_WRITE 비관적 락", percentage: 10, description: "동시 구매 시 동일 판매글 경합을 순차 처리하도록 설계" },
        { title: "거래 프로세스 트랜잭션", percentage: 10, description: "판매 상태·본인 구매·잔액 검증과 포인트 이동, 판매 상태 변경을 한 흐름으로 처리" },
        { title: "Redis GEO 반경 검색 API", percentage: 5, description: "반경 내 매장 조회와 Pipeline 기반 브랜드명 일괄 조회 구현" }
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
        result: "• [검색 범위]\nRedis GEO Search로 반경 5km 내 매장만 조회\n\n• [네트워크]\nPipeline으로 조회된 매장의 브랜드명을 일괄 조회\n\n• [거리 계산]\n브랜드별 최소 거리를 애플리케이션 메모리에서 계산·정렬\n\n• [검증 과제]\n응답 시간과 TPS는 k6/JMeter 기반 부하 테스트로 추가 검증 필요",
        hasImage: true,
        customVisual: <ConyArchitectureCompare />
      }
    ],
    situation:
      "기프티콘 유효기간 만료로 인한 낙전 금액이 연간 수백억 원에 달합니다. 기존 서비스는 수동 등록이 번거롭고, 사용 가능한 매장을 찾기 어려우며, 유효기간 관리가 되지 않아 사용률이 낮았습니다. 특히 인기 상품에 여러 사용자가 동시에 구매를 시도하면 중복 거래가 발생할 위험이 있었습니다.",
    task: "거래 중복 위험을 줄이기 위한 동시성 제어, 자동판매 관련 반복 작업, 거리순 검색을 구현하는 것이 목표였습니다. 판매 상태 검증과 포인트 이동을 트랜잭션으로 묶고, 위치 검색의 거리 계산 부담을 Redis 캐시 계층으로 분리했습니다.",
    action: `1. 비관적 락 기반 동시성 제어: 판매글 조회 시 JPA PESSIMISTIC_WRITE 락을 적용해 동일 판매글에 대한 동시 구매 경합을 순차 처리하도록 설계.
2. 거래 프로세스 검증: ① 판매 상태 확인 ② 본인 상품 구매 차단 ③ 포인트 잔액 검증 후, 포인트 차감/지급·SOLD_OUT 변경·구매 기록 저장을 하나의 @Transactional 흐름으로 처리하고 Manage 서버에 소유권 이전을 요청.
3. 배치 자동화: 매일 09:00에 Spring Scheduler가 만료 판매글 삭제, 사용자 설정 자동판매 등록, PENDING → ON_SALE 전환을 처리. 유효기간 임박 기프티콘은 시스템 제안 후 사용자 승인 시 판매 등록.
4. Redis GEO 기반 위치 검색: Spring Data Redis GEO Search로 반경 5km 내 매장을 조회하고, Pipeline으로 브랜드명을 일괄 조회한 뒤 브랜드별 최소 거리를 메모리에서 정렬.`,
    result:
      "🏆 SSAFY 14기 공통 프로젝트 우수상 수상. 비관적 락으로 동일 판매글의 동시 구매 경합을 순차 처리하도록 설계하고, Redis GEO·Pipeline으로 위치 검색의 거리 계산과 네트워크 왕복 부담을 분리했습니다. Spring Scheduler로 만료 판매글 삭제와 예약 판매 전환 등 반복 작업을 자동화했습니다.",
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
        "결제 도메인에서는 빠른 응답보다 정확하고 안전한 데이터 처리가 최우선 설계 원칙임을 체감했습니다. 비관적 락은 락 대기 비용이 있으므로, 부하 테스트로 처리량과 대기 시간을 검증하며 적용 범위를 조정해야 한다고 배웠습니다.",
    },
    image: project2,
    architectureImage: project2Arch,
    githubLink: "https://github.com/ryubyeongsun/cony-gifticon-platform",
    techReasons: [
      { label: "JPA 비관적 락 (PESSIMISTIC_WRITE)", desc: "동일 판매글을 잠금 조회해 동시 구매 경합을 순차 처리하고, 구매 검증과 포인트 이동·판매 상태 변경을 하나의 트랜잭션 흐름으로 묶었습니다." },
      { label: "Redis GEO & Pipeline", desc: "반경 5km 내 매장을 Redis GEO Search로 조회하고, Pipeline으로 브랜드명을 일괄 조회해 위치 검색의 Redis 왕복을 줄였습니다." },
      { label: "Spring Scheduler", desc: "매일 오전 9시에 만료 판매글 삭제, 사용자 설정 자동판매, 판매 예정일 도래 건의 상태 전환을 처리합니다." }
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
                <strong>2.1 동일 판매글 경합을 순차 처리하도록 설계</strong>
                <p className="mt-1">
                  판매글을 비관적 락으로 조회한 뒤 같은 트랜잭션 안에서 판매 상태, 본인 구매 여부, 포인트 잔액을 검증하고 포인트 이동과 판매 상태 변경을 처리했습니다. 동시 구매 경합을 줄이기 위한 설계이며, 대규모 트래픽에서의 처리량과 락 대기 시간은 부하 테스트로 추가 검증이 필요합니다.
                </p>
                <CodeBlock label="SaleRepository.java">
                  {`@Lock(LockModeType.PESSIMISTIC_WRITE)
@Query("SELECT s FROM Sale s WHERE s.id = :id")
Optional<Sale> findByIdWithLock(@Param("id") Long id);`}
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
                  거리순 검색에서는 Spring Data Redis의 <code>opsForGeo().search(...)</code>로 반경 5km 내 매장만 조회합니다. 위치 검색의 거리 계산 범위를 Redis GEO 캐시 계층으로 분리했으며, 응답 시간의 정량 개선 수치는 별도로 측정하지 않았습니다.
                </p>
              </div>
              <div>
                <strong>4.2 Pipeline을 활용한 일괄 조회</strong>
                <p className="mt-1">
                  조회된 매장들의 브랜드명을 가져올 때 Redis Pipeline으로 다건 조회를 묶어 네트워크 왕복을 줄였습니다.
                </p>
              </div>
              <div>
                <strong>4.3 브랜드별 최소 거리 계산 및 정렬</strong>
                <p className="mt-1">
                  애플리케이션에서 브랜드별 최소 거리 Map을 생성하고 거리순으로 정렬합니다. 검색 전용 인덱스와 부하 테스트는 향후 확장 과제입니다.
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
                <strong>동시 구매 경합 제어:</strong> 비관적 락과 구매 트랜잭션으로 동일 판매글에 대한 동시 구매 경합을 순차 처리하도록 설계했습니다.
              </li>
              <li>
                <strong>위치 검색 범위 분리:</strong> Redis GEO Search로 반경 내 매장을 조회하고, 브랜드별 최소 거리를 메모리에서 계산·정렬하도록 구성했습니다.
              </li>
              <li>
                <strong>다건 조회 묶음 처리:</strong> Pipeline으로 브랜드명 다건 조회를 묶어 Redis 왕복을 줄였습니다. 정량 성능 검증은 추후 과제입니다.
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
        { title: "Docker Compose MSA 배포", percentage: 5, description: "5개 마이크로서비스와 Redis를 포함한 운영 Compose 구성" },
        { title: "Spring Cloud Gateway JWT", percentage: 5, description: "라우팅 단일 진입점에서 토큰 검증 및 인가 처리" },
        { title: "Jenkins CI/CD", percentage: 5, description: "CI·release job별 빌드와 이미지 생성·EC2 배포 흐름 구성" }
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
        problem: "• 로컬에선 정상 동작하던 '모임방 생성(POST)' API가 배포 후 지속 실패\n→ 405 Method Not Allowed 에러 발생",
        cause: "• Nginx 301 상태 코드의 스펙 한계\n보안(HTTPS) 강제 전환을 위해 301 Moved Permanently 리다이렉트 사용 중\n\n• 프록시 계층 규약 충돌\n일부 클라이언트 환경에서 301 응답을 받고 재요청 시, 기존 POST 메서드를 GET으로 강제 변환하고 Body 페이로드를 버리는 HTTP 스펙 상의 종속성 문제 확인",
        solution: "• 운영 Nginx HTTPS 리다이렉트를 308 Permanent Redirect로 변경\n공개 레포에는 Nginx 설정 파일이 없어 운영 서버 설정 기준으로 적용\n\n• HTTP 메서드 보존\n308 응답을 사용해 리다이렉트 후에도 POST 메서드와 Body가 유지되도록 조정",
        result: "• [HTTP 메서드]\n일부 클라이언트의 POST → GET 변환 문제를 308 리다이렉트로 대응\n\n• [Body 데이터]\nHTTPS 재요청에서도 Body가 유지되도록 운영 설정 조정\n\n• [운영 설정]\nNginx 설정 파일은 공개 레포에 없으며, 서버 설정 기준으로 관리",
        hasImage: true,
        customVisual: <DuckchiArchitectureCompare />
      }
    ],
    situation:
      "친구/동료 모임에서 공동 결제 후 정산이 번거로운 사용자를 위해, 모임방 생성부터 정산/송금, 소비 리포트까지 한 흐름으로 제공하는 모바일 더치페이 서비스입니다. 프로젝트 후반에는 단순히 기능 구현을 넘어 실제 운영 환경에서 안정적으로 배포되고 동작하는 구조가 필요했고, 인증 흐름과 외부 연동, 프록시, 메시징, 모니터링까지 여러 계층의 문제가 동시에 드러났습니다.",
    task: "인프라 담당으로서 EC2 기반 운영 환경에 MSA 서비스를 안정적으로 배포하고, CI/CD와 모니터링 체계를 구축해야 했습니다. 백엔드에서는 카카오 OAuth 로그인, JWT 토큰 관리, Redis 기반 세션 관리를 구현하고, 운영 환경에서 발생하는 인증/리다이렉트/시간대 이슈를 빠르게 해결하는 것이 핵심 과제였습니다.",
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
        "단일 EC2 운영으로 서비스가 늘어나면 리소스 한계. 멀티 노드(ECS, K8s) 전환을 고려해야 함",
        "서킷 브레이커 미적용: 서비스 간 장애 전파 방지를 위한 Resilience4j 도입을 검토했으나 시간 부족으로 미적용",
      ],
      improvements: [
        "Kubernetes(EKS) 전환으로 오토스케일링 및 셀프힐링 적용 검토",
        "Resilience4j 서킷 브레이커 패턴 도입으로 서비스 간 장애 격리",
        "Blue/Green 배포 전략 도입 검토 (현재 미구현)",
      ],
      lesson:
        "\"로컬에서 되는데 운영에서 안 된다\"는 문제는 대부분 애플리케이션 코드가 아니라 프록시, 인증서, 리다이렉트 정책 같은 인프라 환경 차이에서 발생한다는 것을 체감했습니다. \"요청이 어디서 변형되는가\"를 기준으로 원인을 좁히는 디버깅 습관을 만들었습니다.",
    },
    image: project3,
    architectureImage: project3Arch,
    techReasons: [
      { label: "Docker Compose & Jenkins", desc: "5개 서비스와 Redis를 Compose로 구성하고, Jenkins에서 서비스 빌드·이미지 생성·푸시·EC2 배포 절차를 반복 가능하게 만들었습니다." },
      { label: "Spring Cloud Gateway", desc: "각 마이크로서비스마다 중복되는 인증 로직을 전역 필터(JWT)로 중앙 제어하여 단일 진입점을 확보했습니다." },
      { label: "Kafka Event Broker", desc: "결제·인사이트 등 일부 도메인 이벤트를 Kafka producer/consumer로 비동기 전달해 직접 동기 호출 의존도를 줄이는 방향으로 구성했습니다." }
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
                <CodeBlock label="운영 Nginx 설정 예시 (레포 미포함)">
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
                  API, SSE, 정적 리소스처럼 요청 특성이 다른 경로는 프록시 설정을
                  분리할 필요가 있음을 확인했습니다. 공개 레포에는 해당 Nginx 경로별
                  설정이 없어, SSE 버퍼링과 timeout 설정은 향후 운영 설정 보강 과제로
                  정리했습니다.
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
                <strong>결과:</strong> 운영 Nginx의 308 리다이렉트 적용으로 HTTPS
                전환 이후에도 POST 메서드와 Body가 유지되도록 조정했습니다. 설정 파일은
                공개 레포가 아닌 운영 서버에서 관리했습니다.
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
