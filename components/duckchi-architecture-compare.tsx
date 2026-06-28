"use client"

import { ArrowRight, Server, Smartphone, AlertTriangle, CheckCircle2 } from "lucide-react"

export function DuckchiArchitectureCompare() {
  return (
    <div className="w-full flex flex-col items-center justify-center space-y-6 py-4">
      <div className="text-[13px] font-bold text-zinc-300 mb-2 border-b border-zinc-800 pb-2 w-full text-center">
        Nginx 리다이렉트 스펙 충돌 해결 흐름
      </div>

      <div className="flex flex-col gap-6 relative w-full max-w-[380px]">
        
        {/* Before (301) */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-red-950 text-red-400 border border-red-900/50">
              개선 전 (301 Redirect)
            </span>
          </div>
          <div className="flex justify-between items-center bg-red-950/10 border border-red-900/30 rounded-xl p-4 shadow-sm relative">
            <div className="flex flex-col items-center gap-1.5 z-10">
              <Smartphone className="w-6 h-6 text-zinc-400" />
              <span className="text-[10px] font-medium text-zinc-400">클라이언트</span>
              <span className="text-[9px] px-1.5 py-0.5 bg-blue-900/50 text-blue-300 rounded">POST (Body O)</span>
            </div>
            
            <ArrowRight className="w-4 h-4 text-zinc-600" />
            
            <div className="flex flex-col items-center gap-1.5 z-10">
              <div className="w-8 h-8 rounded bg-zinc-800 flex items-center justify-center text-zinc-300 font-bold text-xs">N</div>
              <span className="text-[10px] font-medium text-zinc-400">Nginx</span>
              <span className="text-[9px] px-1.5 py-0.5 bg-red-900/50 text-red-300 rounded">301 변환</span>
            </div>

            <ArrowRight className="w-4 h-4 text-red-500/50" />

            <div className="flex flex-col items-center gap-1.5 z-10">
              <Server className="w-6 h-6 text-zinc-400" />
              <span className="text-[10px] font-medium text-zinc-400">백엔드</span>
              <span className="text-[9px] px-1.5 py-0.5 bg-orange-900/50 text-orange-300 rounded line-through">GET (Body X)</span>
            </div>

            <ArrowRight className="w-4 h-4 text-red-500" />

            <div className="flex flex-col items-center gap-1.5 z-10">
              <AlertTriangle className="w-6 h-6 text-red-500" />
              <span className="text-[10px] font-bold text-red-500">405 Error</span>
            </div>
          </div>
        </div>

        {/* After (308) */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-green-950 text-green-400 border border-green-900/50">
              개선 후 (308 Redirect)
            </span>
          </div>
          <div className="flex justify-between items-center bg-green-950/10 border border-green-900/30 rounded-xl p-4 shadow-sm relative">
            <div className="flex flex-col items-center gap-1.5 z-10">
              <Smartphone className="w-6 h-6 text-zinc-400" />
              <span className="text-[10px] font-medium text-zinc-400">클라이언트</span>
              <span className="text-[9px] px-1.5 py-0.5 bg-blue-900/50 text-blue-300 rounded">POST (Body O)</span>
            </div>
            
            <ArrowRight className="w-4 h-4 text-zinc-600" />
            
            <div className="flex flex-col items-center gap-1.5 z-10">
              <div className="w-8 h-8 rounded bg-zinc-800 flex items-center justify-center text-zinc-300 font-bold text-xs">N</div>
              <span className="text-[10px] font-medium text-zinc-400">Nginx</span>
              <span className="text-[9px] px-1.5 py-0.5 bg-green-900/50 text-green-300 rounded">308 유지</span>
            </div>

            <ArrowRight className="w-4 h-4 text-green-500/50" />

            <div className="flex flex-col items-center gap-1.5 z-10">
              <Server className="w-6 h-6 text-zinc-400" />
              <span className="text-[10px] font-medium text-zinc-400">백엔드</span>
              <span className="text-[9px] px-1.5 py-0.5 bg-blue-900/50 text-blue-300 rounded">POST (Body O)</span>
            </div>

            <ArrowRight className="w-4 h-4 text-green-500" />

            <div className="flex flex-col items-center gap-1.5 z-10">
              <CheckCircle2 className="w-6 h-6 text-green-500" />
              <span className="text-[10px] font-bold text-green-500">200 OK</span>
            </div>
          </div>
        </div>

      </div>
      <p className="text-[11px] text-zinc-500 mt-2 text-center">
        308 상태 코드를 통해 HTTP 메서드와 Payload(Body)를 원본 그대로 보존
      </p>
    </div>
  )
}
