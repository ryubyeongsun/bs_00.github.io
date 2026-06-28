"use client"

import { Card } from "@/components/ui/card"
import { Mail, Phone, Github, Globe, TrendingUp } from "lucide-react"

export default function PlanSection() {
  return (
    <section id="plan" className="py-24 px-4 bg-[#060f0b] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-emerald-900/10 rounded-full blur-[120px] -z-10" />

      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left: 성장 방향 (Plan) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3 mb-8">
              <TrendingUp className="w-8 h-8 text-emerald-400" />
              <h2 className="text-3xl font-bold text-white">Plan & Mindset</h2>
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex gap-4 items-start p-6 rounded-2xl bg-[#0a1711] border border-emerald-900/30 hover:border-emerald-500/30 transition-colors">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-lg shrink-0 border border-emerald-500/30">
                  1
                </div>
                <div>
                  <h4 className="text-lg font-bold text-emerald-100 mb-2 leading-tight break-keep">
                    AI를 똑똑하게 활용하되, 맹신하지 않겠습니다.
                  </h4>
                  <p className="text-slate-400 text-sm leading-relaxed break-keep">
                    생성형 AI로 개발 생산성을 높이되, 코드의 동작 원리와 인프라 흐름은 끝까지 끈질기게 검증하겠습니다.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start p-6 rounded-2xl bg-[#0a1711] border border-emerald-900/30 hover:border-emerald-500/30 transition-colors">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-lg shrink-0 border border-emerald-500/30">
                  2
                </div>
                <div>
                  <h4 className="text-lg font-bold text-emerald-100 mb-2 leading-tight break-keep">
                    AI가 찾아주지 못하는 에러 앞에서도 포기하지 않는 집요함을 보여드리겠습니다.
                  </h4>
                  <p className="text-slate-400 text-sm leading-relaxed break-keep">
                    AI가 답하지 못하는 장애도, 직접 로그를 파헤쳐 기어코 근본 원인을 찾아내는 끈기를 증명하겠습니다.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start p-6 rounded-2xl bg-[#0a1711] border border-emerald-900/30 hover:border-emerald-500/30 transition-colors">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-lg shrink-0 border border-emerald-500/30">
                  3
                </div>
                <div>
                  <h4 className="text-lg font-bold text-emerald-100 mb-2 leading-tight break-keep">
                    스펀지처럼 흡수하는 '신입의 무기'를 적극 활용하겠습니다.
                  </h4>
                  <p className="text-slate-400 text-sm leading-relaxed break-keep">
                    빠르게 변하는 AI 트렌드와 회사의 비즈니스 도메인을 가장 먼저 배우고 적용하여, 팀의 개발 흐름에 가장 빠르게 녹아드는 팀원이 되겠습니다.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Contact / Link */}
          <div className="lg:col-span-1 pt-2 lg:pt-16">
            <Card className="p-6 bg-[#0a1711] border-emerald-900/30 rounded-3xl h-full flex flex-col shadow-xl">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center">👤</span>
                Contact / Link
              </h3>
              
              <div className="flex flex-col gap-6 flex-grow">
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center shrink-0 border border-zinc-800 group-hover:border-emerald-500/50 transition-colors">
                    <Mail className="w-4 h-4 text-zinc-400 group-hover:text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 mb-0.5">Email</p>
                    <a href="mailto:abcfg89@naver.com" className="text-sm font-medium text-zinc-200 hover:text-emerald-400 transition-colors">
                      abcfg89@naver.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center shrink-0 border border-zinc-800 group-hover:border-emerald-500/50 transition-colors">
                    <Phone className="w-4 h-4 text-zinc-400 group-hover:text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 mb-0.5">Phone</p>
                    <span className="text-sm font-medium text-zinc-200">
                      010-5564-3135
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center shrink-0 border border-zinc-800 group-hover:border-emerald-500/50 transition-colors">
                    <Github className="w-4 h-4 text-zinc-400 group-hover:text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 mb-0.5">GitHub</p>
                    <a href="https://github.com/ryubyeongsun" target="_blank" rel="noreferrer" className="text-sm font-medium text-zinc-200 hover:text-emerald-400 transition-colors">
                      github.com/ryubyeongsun
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center shrink-0 border border-zinc-800 group-hover:border-emerald-500/50 transition-colors">
                    <Globe className="w-4 h-4 text-zinc-400 group-hover:text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 mb-0.5">Portfolio</p>
                    <a href="https://bs_00.github.io" target="_blank" rel="noreferrer" className="text-sm font-medium text-zinc-200 hover:text-emerald-400 transition-colors">
                      bs_00.github.io
                    </a>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
