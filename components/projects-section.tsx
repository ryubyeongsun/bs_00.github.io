import ProjectCard from "./project-card"
import { CodeBlock } from "./troubleshooting-dialog"

const PROJECTS = [
  {
    id: 1,
    title: "Diet Coach (아보핏) - AI 기반 헬스케어 서비스",
    period: "2025.11 ~ 2025.12",
    role: "Backend Developer",
    techStack: ["Java 17", "Spring Boot 3.5", "MyBatis", "MySQL", "Vue.js 3", "Three.js"],
    situation: "운동과 식단 관리를 병행하려는 사용자들이 자신의 체형을 정확히 파악하고 적절한 식단을 추천받기 어려운 문제가 있었습니다. 특히 TDEE(일일 총 에너지 소비량) 기반의 과학적인 식단 추천과 BMI 연동 3D 시각화를 제공하는 서비스가 부족했습니다.",
    task: "사용자의 신체 정보를 기반으로 TDEE를 분석하고, AI가 개인 맞춤형 식단을 자동 생성하는 헬스케어 플랫폼을 개발해야 했습니다. 또한 사용자가 자신의 체형을 3D 아바타로 시각적으로 확인할 수 있는 기능과, 비동기 처리로 API 응답 속도를 개선하는 것이 필요했습니다.",
    action: "1. Spring @Async 비동기 처리: AI 식단 생성 API 호출을 비동기로 처리하여 API 타임아웃을 80% 단축했습니다. CompletableFuture를 활용해 외부 AI API와의 통신 지연을 최소화하고, 사용자 경험을 크게 개선했습니다.\\n2. JWT RTR(Refresh Token Rotation) 인증: Access Token과 Refresh Token을 모두 활용한 보안 시스템을 구축했습니다. Token 탈취 위험을 방지하기 위해 Refresh Token도 주기적으로 갱신하는 RTR 방식을 적용하여 보안성을 강화했습니다.\\n3. TDEE 기반 식단 추천 로직: 사용자의 나이, 성별, 체중, 신장, 활동량을 분석하여 Harris-Benedict 공식으로 기초대사량을 계산하고, 목표(다이어트/유지/증량)에 맞춘 칼로리와 영양소 비율을 산출하여 AI에게 전달했습니다.\\n4. BMI 연동 3D 아바타: Three.js를 활용하여 사용자의 BMI 수치에 따라 실시간으로 변화하는 3D 인체 모델을 구현했습니다. Vue.js와 연동하여 사용자가 입력한 신체 정보가 즉시 3D 아바타에 반영되도록 했습니다.",
    result: "Spring @Async 적용으로 AI 식단 생성 API의 평균 응답 시간을 5초에서 1초 이하로 단축(80% 개선)했습니다. JWT RTR 보안 강화로 토큰 탈취 위험을 최소화하고, TDEE 기반 과학적 식단 추천으로 사용자 만족도를 높였습니다. BMI 연동 3D 아바타 기능으로 시각적 피드백을 제공하여 사용자 참여도를 향상시켰습니다.",
    image: "/projects/project1-thumbnail.png",
    githubLink: "https://github.com/ryubyeongsun/diet_coach_PJ",
    troubleshooting: {
      title: "AI 식단 생성 API 타임아웃 및 응답 지연 해결",
      date: "2026-01-15",
      environment: "Spring Boot 3.5.8, Java 17, MyBatis 3.0.5, MySQL 8.0, Vue.js 3.5.24",
      sections: [
        {
          title: "1. 문제 상황 (Symptoms)",
          content: (
            <ul className="list-disc list-inside space-y-1">
              <li>
                <strong>현상:</strong> 한 달치 AI 식단 생성 요청 시 브라우저 타임아웃 발생 (응답 시간 10초 이상).
              </li>
              <li>
                <strong>영향:</strong> 사용자가 화면이 멈춘 것으로 오해하여 중복 요청을 보내거나 이탈하는 UX 저하 발생.
              </li>
              <li>
                <strong>예상:</strong> AI 연산 완료 후 즉시 결과를 반환하여 사용자가 체감하는 대기 시간을 최소화해야 함.
              </li>
            </ul>
          ),
        },
        {
          title: "2. 원인 분석 (Root Cause Analysis)",
          content: (
            <div className="space-y-4">
              <div>
                <strong>2.1 AI 연산 지연의 본질</strong>
                <p className="mt-1">
                  외부 AI API가 한 달치 식단(30일 × 3끼 = 90개 식단)에 대해 TDEE 기반 영양소 최적화 연산을 수행하는데 평균 8~10초가 소요되었습니다.
                  이는 단순 웹 요청-응답 패턴으로는 브라우저 기본 타임아웃(약 30초)을 초과할 위험이 있었습니다.
                </p>
              </div>
              <div>
                <strong>2.2 동기 처리의 한계</strong>
                <p className="mt-1">
                  기존에는 컨트롤러가 AI API를 호출하고 응답을 기다리는 동안 HTTP 커넥션을 유지했습니다.
                  이로 인해 WAS 스레드가 블로킹되고, 사용자는 흰 화면만 보며 대기해야 했습니다.
                </p>
                <CodeBlock label="MealService.java (수정 전)">
                  {`public MealPlanResponse generateMealPlan(MealRequest request) {
    // AI API 호출 (동기 방식)
    String aiResult = restTemplate.postForObject(AI_API_URL, request, String.class);
    
    // DB 저장 및 응답 반환
    return saveMealPlan(aiResult);
}`}
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
                <strong>3.1 Spring @Async 비동기 처리 도입</strong>
                <p>식단 생성 로직을 비동기로 전환하여 요청 즉시 응답을 반환하고, 백그라운드에서 AI 처리를 수행하도록 설계했습니다.</p>
                <CodeBlock label="AsyncConfig.java">
                  {`@Configuration
@EnableAsync
public class AsyncConfig {
    @Bean(name = "taskExecutor")
    public Executor taskExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(5);
        executor.setMaxPoolSize(10);
        executor.setQueueCapacity(100);
        executor.setThreadNamePrefix("async-");
        executor.initialize();
        return executor;
    }
}`}
                </CodeBlock>
              </div>
              <div>
                <strong>3.2 CompletableFuture로 비동기 API 호출</strong>
                <CodeBlock label="MealService.java (수정 후)">
                  {`@Async("taskExecutor")
public CompletableFuture<MealPlanResponse> generateMealPlanAsync(MealRequest request) {
    try {
        // AI API 호출 (백그라운드에서 실행)
        String aiResult = restTemplate.postForObject(AI_API_URL, request, String.class);
        
        // DB 저장
        MealPlanResponse response = saveMealPlan(aiResult);
        
        return CompletableFuture.completedFuture(response);
    } catch (Exception e) {
        return CompletableFuture.failedFuture(e);
    }
}`}
                </CodeBlock>
              </div>
              <div>
                <strong>3.3 Vue.js 전역 로딩 상태 관리</strong>
                <p>프론트엔드에서 Pinia 스토어를 활용해 진행 상황을 시각화하고, 사용자가 다른 작업을 할 수 있도록 개선했습니다.</p>
                <CodeBlock label="useMealStore.js">
                  {`export const useMealStore = defineStore('meal', {
  state: () => ({
    isGenerating: false,
    progress: 0
  }),
  actions: {
    async generateMeal(userData) {
      this.isGenerating = true;
      this.progress = 0;
      
      // 즉시 응답받고 로딩 표시
      await api.post('/meal/generate', userData);
      
      // 폴링으로 진행 상황 확인
      const interval = setInterval(async () => {
        const status = await api.get('/meal/status');
        this.progress = status.progress;
        
        if (status.completed) {
          clearInterval(interval);
          this.isGenerating = false;
        }
      }, 1000);
    }
  }
});`}
                </CodeBlock>
              </div>
            </div>
          ),
        },
        {
          title: "4. 결과 및 성과 (Results)",
          content: (
            <ul className="list-disc list-inside space-y-2 bg-slate-100 dark:bg-slate-900 p-4 rounded-md">
              <li>
                <strong>타임아웃 제거:</strong> API 타임아웃 에러율을 100% → 0%로 감소시켰습니다.
              </li>
              <li>
                <strong>체감 대기 시간 단축:</strong> 사용자는 요청 후 즉시 대시보드로 이동 가능하며, 백그라운드에서 식단이 생성되므로 체감 대기 시간이 80% 이상 감소했습니다.
              </li>
              <li>
                <strong>서버 리소스 효율화:</strong> WAS 스레드 블로킹을 제거하여 동시 처리 가능한 요청 수가 증가했습니다.
              </li>
            </ul>
          ),
        },
        {
          title: "5. 교훈 (Lessons Learned)",
          content: (
            <ul className="list-disc list-inside space-y-2 bg-slate-100 dark:bg-slate-900 p-4 rounded-md">
              <li>
                <strong>비동기의 필수성:</strong> 외부 API 의존도가 높은 서비스에서는 초기 설계 단계부터 비동기 처리를 고려해야 합니다.
              </li>
              <li>
                <strong>UX와 기술의 조화:</strong> 기술적으로 빠른 응답보다 사용자가 '기다린다'고 느끼지 않게 하는 것이 더 중요합니다. 로딩 표시와 진행률 피드백이 핵심입니다.
              </li>
              <li>
                <strong>폴링 vs WebSocket:</strong> 현재는 폴링 방식이지만, 실시간 업데이트가 더 중요해진다면 WebSocket으로 전환을 고려할 필요가 있습니다.
              </li>
            </ul>
          ),
        },
      ],
    },
  },
  {
    id: 2,
    title: "CONY - 기프티콘 관리 및 판매 서비스",
    period: "2026.01 ~ 2026.02",
    role: "Backend Developer (거래 도메인 담당)",
    techStack: ["Java 17", "Spring Boot 3.5.9", "JPA", "Spring Security", "React Native", "TypeScript", "MySQL 8.0", "Redis", "Docker", "Jenkins", "AWS S3"],
    situation: "기프티콘을 모바일에서 등록·관리·거래하는 서비스로, 동시 구매 경쟁과 위치 기반 목록 조회, 예약 판매 자동화가 필요했습니다. 특히 인기 상품의 경우 여러 사용자가 동시에 구매를 시도하면서 중복 거래가 발생할 위험이 있었고, 사용자의 현재 위치에서 가까운 매장의 기프티콘을 빠르게 검색할 수 있어야 했습니다.",
    task: "거래 중복 방지, 자동 판매 등록 배치, 거리순 검색 성능을 안정적으로 구현하는 것이 목표였습니다. 동시성 제어를 통해 데이터 정합성을 보장하고, 위치 기반 검색의 성능을 최적화하며, 스케줄링을 통한 자동화 시스템을 구축해야 했습니다.",
    action: "1. 비관적 락 기반 동시성 제어: 거래는 Payment 서버에서 처리되도록 설계하고, 판매글 조회 시 PESSIMISTIC_WRITE 비관적 락을 적용해 동시 구매 Race Condition을 차단했습니다.\\n2. 거래 프로세스 설계: 구매 가능 여부(판매 상태, 본인 상품, 포인트 잔액)를 검증한 뒤 포인트 차감/지급 및 판매 상태를 SOLD_OUT으로 변경하고, Manage 서버에 소유권 이전을 요청해 구매자 보관함으로 이동하도록 구현했습니다.\\n3. 배치 자동화: 매일 09:00에 Spring Scheduler 배치를 실행해 만료 판매글 삭제, 예약 판매 생성, PENDING → ON_SALE 전환을 자동화하여 운영 효율을 높였습니다.\\n4. Redis GEO 기반 위치 검색: Redis GEO + Pipeline으로 반경 검색 및 정렬을 캐시 계층에서 처리하여 위치 기반 조회 성능을 대폭 개선했습니다.",
    result: "비관적 락 적용으로 동시 구매 시 데이터 정합성을 100% 보장하고 중복 거래를 완전히 차단했습니다. Redis GEO를 활용한 위치 기반 검색으로 응답 속도를 개선하여 사용자 경험을 향상시켰으며, Spring Scheduler를 통한 배치 자동화로 수동 운영 부담을 제거했습니다.",
    image: "/projects/project2-thumbnail.png",
    githubLink: "https://github.com/ryubyeongsun/cony-gifticon-platform",
    troubleshooting: {
      title: "동시 구매 중복 거래 방지 및 위치 검색 성능 최적화",
      date: "2026-02-10",
      environment: "Spring Boot 3.5.9, Java 17, JPA, MySQL 8.0, Redis, React Native 0.83.1",
      sections: [
        {
          title: "1. 문제 상황 - 동시 구매 시 중복 거래 발생",
          content: (
            <ul className="list-disc list-inside space-y-1">
              <li>
                <strong>현상:</strong> 동일 판매글에 다수의 구매 요청이 동시에 몰리면 중복 결제가 발생할 수 있었습니다.
              </li>
              <li>
                <strong>영향:</strong> 이미 판매 완료된 상품에 대해 여러 사용자가 결제를 성공하는 데이터 정합성 문제가 발생했습니다.
              </li>
              <li>
                <strong>원인:</strong> 트랜잭션 경합으로 인해 동일 row에 대한 동시 갱신이 발생했습니다.
              </li>
            </ul>
          ),
        },
        {
          title: "2. 해결 방법 - PESSIMISTIC_WRITE 락 적용",
          content: (
            <div className="space-y-4">
              <div>
                <strong>2.1 비관적 락을 통한 순차 처리</strong>
                <p className="mt-1">
                  판매글 조회 시 JPA의 PESSIMISTIC_WRITE 락을 적용하여, 첫 번째 트랜잭션이 완료될 때까지 다른 트랜잭션은 대기하도록 강제했습니다.
                </p>
                <CodeBlock label="SaleRepository.java">
                  {`@Lock(LockModeType.PESSIMISTIC_WRITE)
@Query("SELECT s FROM Sale s WHERE s.id = :saleId")
Optional<Sale> findByIdWithLock(@Param("saleId") Long saleId);`}
                </CodeBlock>
              </div>
              <div>
                <strong>2.2 거래 프로세스 구현</strong>
                <CodeBlock label="PaymentService.java">
                  {`@Transactional
public void purchaseGifticon(Long saleId, Long userId) {
    // 1. 비관적 락으로 판매글 조회
    Sale sale = saleRepository.findByIdWithLock(saleId)
        .orElseThrow(() -> new NotFoundException("판매글 없음"));
    
    // 2. 구매 가능 여부 검증
    if (sale.getStatus() != SaleStatus.ON_SALE) {
        throw new BusinessException("판매 불가 상태");
    }
    if (sale.getSellerId().equals(userId)) {
        throw new BusinessException("본인 상품 구매 불가");
    }
    
    User buyer = userRepository.findById(userId)
        .orElseThrow(() -> new NotFoundException("사용자 없음"));
    if (buyer.getPoint() < sale.getPrice()) {
        throw new BusinessException("포인트 부족");
    }
    
    // 3. 포인트 차감/지급 및 판매 상태 변경
    buyer.decreasePoint(sale.getPrice());
    User seller = userRepository.findById(sale.getSellerId()).orElseThrow();
    seller.increasePoint(sale.getPrice());
    sale.updateStatus(SaleStatus.SOLD_OUT);
    
    // 4. Manage 서버에 소유권 이전 요청
    manageClient.transferOwnership(sale.getGifticonId(), userId);
}`}
                </CodeBlock>
              </div>
            </div>
          ),
        },
        {
          title: "3. 문제 상황 - 거리순 정렬 지연",
          content: (
            <ul className="list-disc list-inside space-y-1">
              <li>
                <strong>현상:</strong> 반경 내 다수 매장 검색 시 거리 계산과 정렬로 인해 응답 시간이 길어졌습니다.
              </li>
              <li>
                <strong>원인:</strong> MySQL에서 Haversine 공식으로 거리를 계산하고 정렬하는 비용이 높았습니다.
              </li>
            </ul>
          ),
        },
        {
          title: "4. 해결 방법 - Redis GEO 활용",
          content: (
            <div className="space-y-4">
              <div>
                <strong>4.1 Redis GEO 자료구조 사용</strong>
                <p className="mt-1">
                  매장 위치 정보를 Redis GEO에 저장하고, GEORADIUS 명령으로 반경 검색 및 거리순 정렬을 캐시 계층에서 처리했습니다.
                </p>
                <CodeBlock label="RedisGeoService.java">
                  {`public List<StoreDistance> findNearbyStores(double lat, double lon, double radius) {
    // Redis GEORADIUS로 반경 내 매장 검색 (거리순 정렬 포함)
    GeoResults<RedisGeoCommands.GeoLocation<String>> results = 
        redisTemplate.opsForGeo()
            .radius("stores", 
                   new Circle(new Point(lon, lat), new Distance(radius, Metrics.KILOMETERS)),
                   GeoRadiusCommandArgs.newGeoRadiusArgs()
                       .includeDistance()
                       .sortAscending());
    
    return results.getContent().stream()
        .map(result -> StoreDistance.builder()
            .storeId(result.getContent().getName())
            .distance(result.getDistance().getValue())
            .build())
        .collect(Collectors.toList());
}`}
                </CodeBlock>
              </div>
              <div>
                <strong>4.2 Pipeline으로 성능 최적화</strong>
                <p className="mt-1">
                  여러 위치 검색을 Pipeline으로 묶어 네트워크 왕복 횟수를 줄였습니다.
                </p>
              </div>
            </div>
          ),
        },
        {
          title: "5. 결과 및 성과",
          content: (
            <ul className="list-disc list-inside space-y-2 bg-slate-100 dark:bg-slate-900 p-4 rounded-md">
              <li>
                <strong>중복 거래 차단:</strong> 비관적 락 적용으로 동시 구매 시 데이터 정합성을 100% 보장했습니다.
              </li>
              <li>
                <strong>위치 검색 성능 개선:</strong> Redis GEO 활용으로 거리순 조회 응답 시간을 대폭 단축했습니다.
              </li>
              <li>
                <strong>트랜잭션 안정성 확보:</strong> Race Condition을 완전히 제거하고 신뢰할 수 있는 거래 시스템을 구축했습니다.
              </li>
            </ul>
          ),
        },
        {
          title: "6. 교훈",
          content: (
            <ul className="list-disc list-inside space-y-2 bg-slate-100 dark:bg-slate-900 p-4 rounded-md">
              <li>
                <strong>동시성 제어의 중요성:</strong> 금융 거래와 같은 민감한 도메인에서는 비관적 락을 통한 확실한 동시성 제어가 필수입니다.
              </li>
              <li>
                <strong>적절한 캐시 전략:</strong> 위치 기반 검색처럼 계산 비용이 높은 작업은 Redis GEO 같은 특화 자료구조를 활용해야 합니다.
              </li>
              <li>
                <strong>성능과 정합성의 균형:</strong> 비관적 락은 성능 저하를 유발할 수 있지만, 데이터 정합성이 최우선인 경우 필수적입니다.
              </li>
            </ul>
          ),
        },
      ],
    },
  },
]

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-24 px-4 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700 view-trigger">
          <h2 className="text-4xl font-bold mb-3 text-foreground">주요 프로젝트</h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg mb-4">
            각 프로젝트에서 직면한 문제, 해결 과정, 그리고 실제 성과를 정리했습니다.
          </p>
          <div className="h-1.5 w-20 bg-gradient-to-r from-primary to-primary/50 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {PROJECTS.map((project, index) => (
            <div
              key={project.id}
              className="animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both view-trigger"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
