"use client"

import { ArrowRight, ArrowDown, Database, Search, Layers, Map, SortAsc, FileText } from "lucide-react"

export function ConyArchitectureCompare() {
  return (
    <div className="w-full flex flex-col items-center justify-center space-y-6 py-4">
      <div className="text-[13px] font-bold text-zinc-300 mb-2 border-b border-zinc-800 pb-2 w-full text-center">
        거리순 정렬 처리 흐름 (Redis GEO)
      </div>

      <div className="flex flex-col gap-4 relative w-full max-w-[320px]">
        {/* Row 1 */}
        <div className="flex justify-between items-center relative">
          <div className="flex flex-col items-center justify-center w-[90px] h-[75px] bg-[#111111] border border-zinc-700 rounded-lg shadow-md z-10">
            <Database className="w-5 h-5 text-blue-400 mb-1" />
            <span className="text-xs text-zinc-300 font-medium text-center leading-tight">Payment DB<br/>판매글 페이지<br/>조회</span>
          </div>

          <ArrowRight className="w-5 h-5 text-zinc-500" />

          <div className="flex flex-col items-center justify-center w-[90px] h-[75px] bg-blue-950/20 border border-blue-900/50 rounded-lg shadow-md z-10">
            <Search className="w-5 h-5 text-blue-400 mb-1" />
            <span className="text-xs text-zinc-300 font-medium text-center leading-tight">Redis GEO<br/>반경 5km</span>
          </div>

          <ArrowRight className="w-5 h-5 text-zinc-500" />

          <div className="flex flex-col items-center justify-center w-[90px] h-[75px] bg-indigo-950/20 border border-indigo-900/50 rounded-lg shadow-md z-10">
            <Layers className="w-5 h-5 text-indigo-400 mb-1" />
            <span className="text-xs text-zinc-300 font-medium text-center leading-tight">Pipeline<br/>브랜드명 조회</span>
          </div>
        </div>

        {/* Down Arrow on the right side */}
        <div className="flex justify-end pr-[35px]">
          <ArrowDown className="w-5 h-5 text-zinc-500" />
        </div>

        {/* Row 2 (Reversed arrow flow) */}
        <div className="flex justify-between items-center relative">
          <div className="flex flex-col items-center justify-center w-[90px] h-[75px] bg-green-950/20 border border-green-900/50 rounded-lg shadow-md z-10">
            <FileText className="w-5 h-5 text-green-400 mb-1" />
            <span className="text-xs text-zinc-300 font-medium text-center leading-tight">현재 페이지<br/>판매글 반환</span>
          </div>

          <div className="rotate-180">
            <ArrowRight className="w-5 h-5 text-zinc-500" />
          </div>

          <div className="flex flex-col items-center justify-center w-[90px] h-[75px] bg-teal-950/20 border border-teal-900/50 rounded-lg shadow-md z-10">
            <SortAsc className="w-5 h-5 text-teal-400 mb-1" />
            <span className="text-xs text-zinc-300 font-medium text-center leading-tight">페이지 내<br/>거리순 정렬</span>
          </div>

          <div className="rotate-180">
            <ArrowRight className="w-5 h-5 text-zinc-500" />
          </div>

          <div className="flex flex-col items-center justify-center w-[90px] h-[75px] bg-purple-950/20 border border-purple-900/50 rounded-lg shadow-md z-10">
            <Map className="w-5 h-5 text-purple-400 mb-1" />
            <span className="text-xs text-zinc-300 font-medium text-center leading-tight">브랜드별<br/>최소거리 Map</span>
          </div>
        </div>
      </div>
      <p className="text-xs leading-relaxed break-keep text-zinc-400 mt-4 text-center">
        DB에서 판매글 페이지를 조회한 뒤, Redis 거리 정보로 현재 페이지를 정렬합니다.
      </p>
    </div>
  )
}
