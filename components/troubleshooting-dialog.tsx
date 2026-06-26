"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, Terminal } from "lucide-react"

import { ProblemSolving } from "./project-detail-dialog"
import Image from "next/image"

export function TroubleshootingDialog({ logs }: { logs: ProblemSolving[] }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 border-dashed shrink-0">
          <BookOpen className="w-4 h-4" />
          핵심 문제 해결 보기
        </Button>
      </DialogTrigger>
      <DialogContent className="!max-w-5xl max-h-[90vh] flex flex-col p-0 overflow-hidden bg-[#0a0a0a] border-zinc-800">
        <DialogHeader className="p-6 pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="rounded-sm bg-zinc-900 border-zinc-700 text-zinc-300">
              Problem Solving
            </Badge>
          </div>
          <DialogTitle className="text-xl sm:text-2xl font-bold text-zinc-100">
            핵심 문제 해결 내역
          </DialogTitle>
          <DialogDescription className="text-sm text-zinc-400 mt-2">
            프로젝트를 진행하며 겪었던 주요 기술적 문제와 해결 과정을 상세히 기록했습니다.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="grid gap-6">
            {logs.map((ps, i) => (
              <div key={i} className="p-6 rounded-xl border border-zinc-800 bg-[#111111] flex flex-col xl:flex-row gap-6">
                
                {/* Left: 텍스트 흐름 (문제 -> 원인 -> 해결 -> 결과) */}
                <div className="flex-1 space-y-5">
                  <h4 className="font-bold text-zinc-100 text-[15px] border-b border-zinc-800 pb-3 mb-4">{ps.title}</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h5 className="text-[12px] font-bold text-red-400 flex items-center gap-1.5">
                        <span className="bg-red-950 px-1.5 py-0.5 rounded text-red-400">🚨</span> 문제 상황
                      </h5>
                      <p className="text-[13px] text-zinc-400 leading-relaxed whitespace-pre-line break-keep">{ps.problem}</p>
                    </div>
                    <div className="space-y-2">
                      <h5 className="text-[12px] font-bold text-orange-400 flex items-center gap-1.5">
                        <span className="bg-orange-950 px-1.5 py-0.5 rounded text-orange-400">🔎</span> 원인 분석
                      </h5>
                      <p className="text-[13px] text-zinc-400 leading-relaxed whitespace-pre-line break-keep">{ps.cause}</p>
                    </div>
                  </div>

                  <div className="bg-blue-950/20 border border-blue-900/50 p-4 rounded-lg space-y-2">
                    <h5 className="text-[12px] font-bold text-blue-400 flex items-center gap-1.5">
                      <span className="bg-blue-900 px-1.5 py-0.5 rounded text-blue-300">💡</span> 해결 방법
                    </h5>
                    <p className="text-[13px] text-zinc-300 leading-relaxed font-medium whitespace-pre-line break-keep">{ps.solution}</p>
                  </div>

                  <div className="bg-green-950/20 border border-green-900/50 p-4 rounded-lg space-y-2">
                    <h5 className="text-[12px] font-bold text-green-400 flex items-center gap-1.5">
                      <span className="bg-green-900 px-1.5 py-0.5 rounded text-green-300">🏆</span> 결과 및 성과
                    </h5>
                    <p className="text-[13px] text-zinc-300 leading-relaxed font-medium whitespace-pre-line break-keep">{ps.result}</p>
                  </div>
                </div>

                {/* Right: Before/After 이미지 플레이스홀더 (조건부 렌더링) */}
                {ps.hasImage !== false && (
                  <div className="xl:w-[450px] shrink-0 border border-zinc-800 border-dashed rounded-xl bg-zinc-900/50 flex flex-col items-center justify-center min-h-[300px] p-6 text-center">
                    <Image
                      src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 24 24' fill='none' stroke='%2352525b' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect width='18' height='18' x='3' y='3' rx='2' ry='2'/%3E%3Ccircle cx='9' cy='9' r='2'/%3E%3Cpath d='m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21'/%3E%3C/svg%3E"
                      width={48}
                      height={48}
                      alt="placeholder"
                      className="mb-4 opacity-50"
                    />
                    <p className="text-zinc-500 text-[13px] font-medium mb-1">Before / After 비교 이미지 영역</p>
                    <p className="text-zinc-600 text-[11px]">이 영역에 나중에 개선 전후 이미지가 삽입됩니다.</p>
                  </div>
                )}

              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function CodeBlock({ children, label }: { children: string; label?: string }) {
  return (
    <div className="rounded-md bg-slate-950 border border-slate-800 overflow-hidden my-3">
      {label && (
        <div className="bg-slate-900 px-3 py-1.5 border-b border-slate-800 flex items-center gap-2">
          <Terminal className="w-3 h-3 text-slate-400" />
          <span className="text-xs text-slate-400 font-mono">{label}</span>
        </div>
      )}
      <div className="p-3 overflow-x-auto">
        <pre className="text-xs sm:text-sm font-mono text-slate-50 leading-relaxed">
          {children}
        </pre>
      </div>
    </div>
  )
}
