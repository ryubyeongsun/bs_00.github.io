import { ArrowDown, ShieldCheck } from "lucide-react"

export function DuckchiAuthFlow() {
  const steps = [
    ["외부 요청", "X-User-Id 헤더 제거"],
    ["공개 경로 여부 확인", "공개 경로는 헤더가 제거된 상태로 전달"],
    ["보호 경로 인증", "Bearer Token → Redis blacklist → JWT 서명·만료 검증"],
    ["사용자 ID 설정", "JWT subject의 userId → X-User-Id 재설정"],
    ["하위 서비스 전달", "인증된 사용자 ID와 함께 요청 전달"],
  ]
  return (
    <div className="w-full flex flex-col items-center space-y-4 py-4">
      <div className="text-[13px] font-bold text-zinc-300 border-b border-zinc-800 pb-3 w-full text-center">Gateway 인증 처리 흐름</div>
      {steps.map(([title, description], index) => (
        <div key={title} className="w-full flex flex-col items-center gap-4">
          {index > 0 && <ArrowDown className="w-5 h-5 text-zinc-500" />}
          <div className="w-full rounded-lg border border-blue-900/50 bg-blue-950/20 p-4 text-center space-y-2">
            <p className="text-[13px] font-semibold text-zinc-200">{title}</p>
            <p className="text-xs leading-relaxed break-keep text-zinc-400">{description}</p>
          </div>
        </div>
      ))}
      <p className="flex items-center gap-2 text-xs text-amber-300"><ShieldCheck className="w-4 h-4" />인증 실패 시 401 응답</p>
      <p className="text-xs leading-relaxed break-keep text-zinc-400 text-center">인증 API·Swagger·Actuator 등 공개 경로는 JWT 검증을 생략합니다.</p>
      <p className="text-xs leading-relaxed break-keep text-zinc-400 text-center">운영 Compose에서 하위 서비스는 호스트 포트를 직접 공개하지 않고 내부 네트워크에 연결합니다.</p>
    </div>
  )
}
