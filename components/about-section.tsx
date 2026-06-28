"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, MapPin, GraduationCap, Mail, Github, Search, MessageCircle, FileEdit, Star } from "lucide-react"
import Image from "next/image"
import profileImg from "@/public/profile.jpg"

export default function AboutSection() {
  return (
    <section id="about" className="py-24 px-4 bg-background dot-pattern">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">

          {/* Left Column: Profile Image & Quick Info */}
          <div className="md:col-span-5 lg:col-span-4 flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700 view-trigger">
            <div className="relative aspect-square overflow-hidden rounded-2xl border-2 border-emerald-500/20 shadow-2xl shadow-emerald-500/10 rotate-3 hover:rotate-0 transition-all duration-500">
              {/* Replace with your actual image path */}
              <Image
                src={profileImg}
                alt="Profile"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                placeholder="blur"
              />
            </div>

            <Card className="p-6 glass border-slate-200 dark:border-emerald-900/30 card-glow rounded-2xl">
              <h3 className="text-2xl font-bold mb-1 text-center">류병선</h3>
              <p className="text-primary text-center font-medium mb-6">Backend Engineer</p>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                  <div className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <span className="text-sm">Gwangju, South Korea</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                  <div className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                    <Mail className="h-4 w-4" />
                  </div>
                  <a href="mailto:abcfg89@naver.com" className="text-sm hover:text-primary transition-colors">
                    abcfg89@naver.com
                  </a>
                </div>
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                  <div className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                    <Github className="h-4 w-4" />
                  </div>
                  <a href="https://github.com/ryubyeongsun" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-primary transition-colors">
                    github.com/ryubyeongsun
                  </a>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column: Bio & Education */}
          <div className="md:col-span-7 lg:col-span-8 space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 view-trigger">

            <div>
              <div className="flex items-center gap-3 mb-6">
                <h2 className="text-3xl font-bold text-foreground">Why me?</h2>
                <div className="h-1.5 flex-1 bg-gradient-to-r from-emerald-500/50 to-transparent rounded-full" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
                <Card className="p-6 border-slate-200 dark:border-zinc-800 bg-card hover:border-emerald-500/50 transition-all shadow-sm group">
                  <div className="flex flex-col h-full relative">
                    <Search className="absolute top-0 right-0 w-8 h-8 text-emerald-500/10 group-hover:text-emerald-500/20 transition-colors" />
                    <div className="flex flex-col gap-4 mb-4">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold text-sm shrink-0 border border-emerald-500/20">1</div>
                      <h4 className="font-bold text-base leading-tight break-keep">"왜?"를 먼저 묻는 습관</h4>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 break-keep leading-relaxed flex-grow">
                      기술을 선택할 때 "왜 이것이어야 하는지, 대안은 없는지"를 항상 먼저 비교하고 결정합니다.
                    </p>
                  </div>
                </Card>

                <Card className="p-6 border-slate-200 dark:border-zinc-800 bg-card hover:border-emerald-500/50 transition-all shadow-sm group">
                  <div className="flex flex-col h-full relative">
                    <MessageCircle className="absolute top-0 right-0 w-8 h-8 text-emerald-500/10 group-hover:text-emerald-500/20 transition-colors" />
                    <div className="flex flex-col gap-4 mb-4">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold text-sm shrink-0 border border-emerald-500/20">2</div>
                      <h4 className="font-bold text-base leading-tight break-keep">모르는 것을 모른다고 말할 수 있습니다.</h4>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 break-keep leading-relaxed flex-grow">
                      아는 척하며 넘기지 않고, 빠르게 공유하고 함께 해결하는 것이 팀에 가장 도움이 된다고 생각합니다.
                    </p>
                  </div>
                </Card>

                <Card className="p-6 border-slate-200 dark:border-zinc-800 bg-card hover:border-emerald-500/50 transition-all shadow-sm group">
                  <div className="flex flex-col h-full relative">
                    <FileEdit className="absolute top-0 right-0 w-8 h-8 text-emerald-500/10 group-hover:text-emerald-500/20 transition-colors" />
                    <div className="flex flex-col gap-4 mb-4">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold text-sm shrink-0 border border-emerald-500/20">3</div>
                      <h4 className="font-bold text-base leading-tight break-keep">부족한 점을 기록하고 개선 방향을 찾습니다.</h4>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 break-keep leading-relaxed flex-grow">
                      프로젝트가 끝나면 잘한 점뿐 아니라 못한 점과 다음에 어떻게 개선할지까지 반드시 함께 정리합니다.
                    </p>
                  </div>
                </Card>
              </div>

              <div className="bg-emerald-950/10 border border-emerald-500/20 rounded-xl p-5 flex items-start gap-4 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0 border border-emerald-500/20">
                  <Star className="w-4 h-4" />
                </div>
                <p className="text-[15px] font-medium text-slate-700 dark:text-slate-300 leading-relaxed break-keep pt-1">
                  기술을 <span className="text-emerald-600 dark:text-emerald-400 font-bold">선택한 이유</span>를 설명할 수 있고, 모르는 것을 <span className="text-emerald-600 dark:text-emerald-400 font-bold">숨기지 않으며</span>, 부족한 점에서 <span className="text-emerald-600 dark:text-emerald-400 font-bold">다음 성장 방향</span>을 스스로 찾는 신입 개발자입니다.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-primary" />
                Education
              </h3>

              <div className="space-y-4">
                {/* Education Item 1 - SSAFY */}
                <div className="group relative pl-8 border-l-2 border-slate-200 dark:border-slate-800 hover:border-primary transition-colors">
                  <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-background border-2 border-slate-400 group-hover:border-primary transition-colors" />
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <h4 className="font-bold text-lg">Samsung SW Academy For Youth (SSAFY)</h4>
                    <Badge variant="secondary" className="text-xs">14기 Java 전공</Badge>
                  </div>
                  <p className="text-sm text-slate-500 mb-2 flex items-center gap-1">
                    <CalendarDays className="h-3 w-3" /> 2025.07 ~ 진행 중
                  </p>
                  <p className="text-slate-600 dark:text-slate-400">
                    Java 전공 트랙으로 알고리즘, 웹 개발, 프로젝트 기반 학습을 진행하고 있습니다.
                  </p>
                </div>

                {/* Education Item 2 - 조선대학교 */}
                <div className="group relative pl-8 border-l-2 border-slate-200 dark:border-slate-800 hover:border-primary transition-colors">
                  <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-background border-2 border-slate-400 group-hover:border-primary transition-colors" />
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <h4 className="font-bold text-lg">조선대학교</h4>
                    <Badge variant="secondary" className="text-xs">컴퓨터공학과</Badge>
                  </div>
                  <p className="text-sm text-slate-500 mb-2 flex items-center gap-1">
                    <CalendarDays className="h-3 w-3" /> 2019.03 ~ 2025.08 졸업
                  </p>
                  <p className="text-slate-600 dark:text-slate-400">
                    컴퓨터공학 전공으로 소프트웨어 개발 역량을 쌓았습니다.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
