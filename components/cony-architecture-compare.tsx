"use client"

import { ArrowRight, ArrowDown, MapPin, Search, Layers, Map, SortAsc, FileText } from "lucide-react"

export function ConyArchitectureCompare() {
  return (
    <div className="w-full flex flex-col items-center justify-center space-y-6 py-4">
      <div className="text-[13px] font-bold text-zinc-300 mb-2 border-b border-zinc-800 pb-2 w-full text-center">
        성능이 최적화된 새로운 처리 흐름 (Redis GEO)
      </div>

      <div className="flex flex-col gap-4 relative w-full max-w-[320px]">
        {/* Row 1 */}
        <div className="flex justify-between items-center relative">
          <div className="flex flex-col items-center justify-center w-[90px] h-[75px] bg-[#111111] border border-zinc-700 rounded-lg shadow-md z-10">
            <MapPin className="w-5 h-5 text-blue-400 mb-1" />
            <span className="text-[10px] text-zinc-300 font-medium text-center">사용자 위치</span>
          </div>

          <ArrowRight className="w-5 h-5 text-zinc-500" />

          <div className="flex flex-col items-center justify-center w-[90px] h-[75px] bg-blue-950/20 border border-blue-900/50 rounded-lg shadow-md z-10">
            <Search className="w-5 h-5 text-blue-400 mb-1" />
            <span className="text-[10px] text-zinc-300 font-medium text-center leading-tight">Redis GEO<br/>반경 5km</span>
          </div>

          <ArrowRight className="w-5 h-5 text-zinc-500" />

          <div className="flex flex-col items-center justify-center w-[90px] h-[75px] bg-indigo-950/20 border border-indigo-900/50 rounded-lg shadow-md z-10">
            <Layers className="w-5 h-5 text-indigo-400 mb-1" />
            <span className="text-[10px] text-zinc-300 font-medium text-center leading-tight">Pipeline<br/>일괄 조회</span>
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
            <span className="text-[10px] text-zinc-300 font-medium text-center leading-tight">판매글<br/>반환</span>
          </div>

          <div className="rotate-180">
            <ArrowRight className="w-5 h-5 text-zinc-500" />
          </div>

          <div className="flex flex-col items-center justify-center w-[90px] h-[75px] bg-teal-950/20 border border-teal-900/50 rounded-lg shadow-md z-10">
            <SortAsc className="w-5 h-5 text-teal-400 mb-1" />
            <span className="text-[10px] text-zinc-300 font-medium text-center leading-tight">인메모리<br/>정렬</span>
          </div>

          <div className="rotate-180">
            <ArrowRight className="w-5 h-5 text-zinc-500" />
          </div>

          <div className="flex flex-col items-center justify-center w-[90px] h-[75px] bg-purple-950/20 border border-purple-900/50 rounded-lg shadow-md z-10">
            <Map className="w-5 h-5 text-purple-400 mb-1" />
            <span className="text-[10px] text-zinc-300 font-medium text-center leading-tight">브랜드별<br/>최소거리 Map</span>
          </div>
        </div>
      </div>
      <p className="text-[11px] text-zinc-500 mt-4 text-center">
        데이터베이스 접근 없이 캐시 계층과 인메모리 연산만으로 처리 완료
      </p>
    </div>
  )
}
