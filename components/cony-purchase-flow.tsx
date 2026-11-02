import { ArrowDown, LockKeyhole, CheckCircle2, Database } from "lucide-react"

export function ConyPurchaseFlow() {
  return (
    <div className="w-full flex flex-col items-center space-y-4 py-4">
      <div className="text-[13px] font-bold text-zinc-300 border-b border-zinc-800 pb-3 w-full text-center">
        동일 판매글 구매 요청 처리
      </div>
      <div className="grid grid-cols-2 gap-3 w-full text-xs text-center">
        <div className="rounded-lg border border-blue-900/50 bg-blue-950/20 p-3 text-blue-300">구매 요청 A</div>
        <div className="rounded-lg border border-amber-900/50 bg-amber-950/20 p-3 text-amber-300">구매 요청 B</div>
      </div>
      <ArrowDown className="w-5 h-5 text-zinc-500" />
      <div className="w-full rounded-lg border border-blue-900/50 bg-blue-950/20 p-4 text-center space-y-2">
        <LockKeyhole className="w-5 h-5 text-blue-400 mx-auto" />
        <p className="text-[13px] font-semibold text-zinc-200">같은 Sale 행 잠금</p>
        <p className="text-xs leading-relaxed text-zinc-400">PESSIMISTIC_WRITE<br />먼저 잠근 요청 A 처리 · 요청 B 대기</p>
      </div>
      <ArrowDown className="w-5 h-5 text-zinc-500" />
      <div className="w-full rounded-lg border border-indigo-900/50 bg-indigo-950/20 p-4 text-center space-y-2">
        <CheckCircle2 className="w-5 h-5 text-indigo-400 mx-auto" />
        <p className="text-[13px] font-semibold text-zinc-200">구매 조건 검증</p>
        <p className="text-xs leading-relaxed text-zinc-400">판매 상태 · 본인 구매 여부 · 잔액</p>
      </div>
      <ArrowDown className="w-5 h-5 text-zinc-500" />
      <div className="w-full rounded-lg border border-green-900/50 bg-green-950/20 p-4 text-center space-y-2">
        <Database className="w-5 h-5 text-green-400 mx-auto" />
        <p className="text-[13px] font-semibold text-zinc-200">구매 성공 시 Payment DB 반영</p>
        <p className="text-xs leading-relaxed text-zinc-400">포인트 이동 · SOLD_OUT · 거래 기록<br />트랜잭션 종료 후 잠금 해제</p>
      </div>
      <ArrowDown className="w-5 h-5 text-zinc-500" />
      <div className="w-full rounded-lg border border-amber-900/50 bg-amber-950/20 p-4 text-center space-y-2">
        <p className="text-[13px] font-semibold text-amber-300">대기하던 요청 B가 상태 재확인</p>
        <p className="text-xs leading-relaxed text-zinc-400">A가 구매를 완료했다면 SOLD_OUT으로 구매 거절</p>
      </div>
    </div>
  )
}
