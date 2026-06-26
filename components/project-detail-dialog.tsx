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
import { ExternalLink, Calendar, User, Users, Github, Network, BookOpen, TrendingUp, CheckCircle2 } from "lucide-react"
import Image, { StaticImageData } from "next/image"
import { Progress } from "./ui/progress"

export interface TeamMember {
  role: string
  count: number
  isMe?: boolean
  tasks: string
}

export interface ContributionDetail {
  title: string
  percentage: number
  description: string
}

export interface ProblemSolving {
  title: string
  problem: string
  cause: string
  solution: string
  result: string
  imagePlaceholder?: boolean
}

export interface ProjectContribution {
  percentage: string
  summary: string
  details: ContributionDetail[]
}

export interface ProjectRetrospective {
  regrets: string[]
  improvements: string[]
  lesson: string
}

export interface Project {
  id: number
  title: string
  description: string
  period: string
  team?: string
  teamComposition?: TeamMember[]
  role: string
  techStack: string[]
  contribution?: ProjectContribution
  problemSolving?: ProblemSolving[]
  situation: string
  task: string
  action: string
  result: string
  retrospective?: ProjectRetrospective
  image?: string | StaticImageData
  architecture?: string | StaticImageData
  architectureImage?: string
  techReasons?: { label: string; desc: string }[]
  troubleshooting?: TroubleshootingLog
  githubLink?: string
  link?: string
}

interface ProjectDetailDialogProps {
  project: Project
  children: React.ReactNode
}

export function ProjectDetailDialog({ project, children }: ProjectDetailDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="!max-w-none w-[98vw] h-[96vh] p-0 flex flex-col gap-0 overflow-hidden">
        <div className="p-6 border-b bg-muted/40 shrink-0">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-3">
              {project.title}
              {project.githubLink && (
                <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                  <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" />
                  </a>
                </Button>
              )}
              {project.link && (
                <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              )}
            </DialogTitle>
            <DialogDescription className="text-base flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {project.period}
              </span>
              <span className="hidden sm:inline text-muted-foreground">|</span>
              {project.team && (
                <>
                  <span className="flex items-center gap-1.5">
                    <Users className="h-4 w-4" />
                    {project.team}
                  </span>
                  <span className="hidden sm:inline text-muted-foreground">|</span>
                </>
              )}
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4" />
                {project.role}
              </span>
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-wrap gap-2 mt-4">
            {project.techStack.map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 bg-[#0a0a0a] text-zinc-300">
          <div className="space-y-12 pb-8 max-w-[1400px] mx-auto">

            {/* Section 1: 프로젝트 미리보기 & 상세 (Top) */}
            <div className="flex flex-col xl:flex-row gap-6">
              {/* Left: 썸네일 */}
              {(project.architecture || project.image) && (
                <div className="xl:w-[450px] shrink-0 space-y-3">
                  <h3 className="text-lg font-bold text-white mb-2">프로젝트 미리보기</h3>
                  <div className="rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden shadow-xl">
                    <Image
                      src={project.architecture || project.image!}
                      alt={project.title}
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  {project.architectureImage && (
                    <div className="rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden shadow-xl mt-4">
                      <img
                        src={typeof project.architectureImage === "string" ? project.architectureImage : project.architectureImage.src}
                        alt={`${project.title} Architecture`}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Right: 3단 박스 (Overview, Role, Tech Stack) */}
              <div className="flex-1 space-y-3">
                <h3 className="text-lg font-bold text-white mb-2">프로젝트 상세</h3>

                <div className="grid gap-3">
                  {/* Overview */}
                  <div className="p-5 rounded-xl border border-zinc-800 bg-[#111111] shadow-sm">
                    <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                      <Badge className="bg-zinc-800 text-zinc-300 hover:bg-zinc-800 border-none text-xs rounded-sm px-2">Overview</Badge>
                      프로젝트 개요 및 목표
                    </h4>
                    <p className="text-[13px] leading-relaxed whitespace-pre-line text-zinc-400">
                      {project.situation}{"\n\n"}{project.task}
                    </p>
                  </div>

                  {/* Role & Contribution */}
                  {project.contribution && (
                    <div className="p-5 rounded-xl border border-zinc-800 bg-[#111111] shadow-sm">
                      <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                        <Badge className="bg-zinc-800 text-zinc-300 hover:bg-zinc-800 border-none text-xs rounded-sm px-2">Role & Contribution</Badge>
                        담당 역할 및 기여도
                      </h4>
                      <p className="text-[13px] font-medium text-zinc-300">
                        {project.contribution.summary}
                      </p>
                    </div>
                  )}

                  {/* Tech Stack */}
                  {project.techReasons && (
                    <div className="p-5 rounded-xl border border-zinc-800 bg-[#111111] shadow-sm">
                      <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                        <Badge className="bg-zinc-800 text-zinc-300 hover:bg-zinc-800 border-none text-xs rounded-sm px-2">Tech Stack</Badge>
                        사용 기술 및 도입 이유
                      </h4>
                      <ul className="space-y-2">
                        {project.techReasons.map((tech, i) => (
                          <li key={i} className="text-[13px]">
                            <span className="font-bold text-zinc-200 mr-2">{tech.label}:</span>
                            <span className="text-zinc-400 leading-relaxed">{tech.desc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Section 2: 팀 구성 & 기여도 분석 (Middle) */}
            {(project.teamComposition || project.contribution?.details) && (
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Left: 팀 구성 테이블 */}
                {project.teamComposition && (
                  <div className="flex-1 space-y-3">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      팀 구성 <Badge variant="outline" className="text-xs bg-zinc-900 border-zinc-700 text-zinc-400">총 {project.teamComposition.reduce((acc, cur) => acc + cur.count, 0)}인</Badge>
                    </h3>
                    <div className="rounded-xl border border-zinc-800 bg-[#111111] overflow-hidden">
                      <table className="w-full text-[13px] text-left">
                        <thead className="bg-zinc-900 text-zinc-400">
                          <tr>
                            <th className="px-5 py-3 font-medium w-1/4">역할</th>
                            <th className="px-5 py-3 font-medium w-[15%] text-center">인원</th>
                            <th className="px-5 py-3 font-medium">담당 업무</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800">
                          {project.teamComposition.map((member, i) => (
                            <tr key={i} className={member.isMe ? "bg-blue-950/20" : ""}>
                              <td className="px-5 py-4 font-medium text-zinc-300">
                                {member.role} {member.isMe && <Badge className="ml-1 bg-blue-600 hover:bg-blue-600 text-[10px] px-1.5 py-0 h-4">본인</Badge>}
                              </td>
                              <td className="px-5 py-4 text-center text-zinc-400">{member.count}명</td>
                              <td className="px-5 py-4 text-zinc-400">{member.tasks}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Right: 개인 기여도 프로그레스 바 */}
                {project.contribution?.details && (
                  <div className="flex-1 space-y-3">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      개인 기여도 분석
                      <Badge variant="outline" className="text-[11px] bg-blue-950/30 border-blue-900 text-blue-400 px-2 h-5">
                        전체 기여도 : {project.contribution.percentage}
                      </Badge>
                    </h3>
                    <div className="p-6 rounded-xl border border-zinc-800 bg-[#111111] space-y-6">
                      {project.contribution.details.map((detail, i) => (
                        <div key={i} className="space-y-2">
                          <div className="flex justify-between items-center text-[13px] font-medium text-zinc-200">
                            <span className="flex items-center gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
                              {detail.title}
                            </span>
                          </div>
                          <Progress value={100} className="h-1 bg-zinc-800 [&>div]:bg-blue-600/70" />
                          <p className="text-[11px] text-zinc-500 mt-1">{detail.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Section 2.5: 핵심 문제 해결 (Problem Solving) */}
            {project.problemSolving && project.problemSolving.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  핵심 문제 해결 <Badge variant="outline" className="text-[10px] bg-zinc-950 border-zinc-700 text-zinc-400 px-1.5 h-4">Problem Solving</Badge>
                </h3>
                <div className="grid gap-6">
                  {project.problemSolving.map((ps, i) => (
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

                      {/* Right: Before/After 이미지 플레이스홀더 */}
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

                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Section 4: 프로젝트 회고 3분할 (Bottom 2) */}
            {project.retrospective && (
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-indigo-400" />
                  프로젝트 회고 <Badge variant="outline" className="text-[10px] bg-zinc-950 border-zinc-700 text-zinc-400 px-1.5 h-4">Retrospective</Badge>
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {/* 아쉬웠던 부분 */}
                  <div className="p-5 rounded-xl border border-zinc-800 bg-[#111111]">
                    <h4 className="font-bold text-zinc-200 text-[13px] mb-3">아쉬웠던 부분</h4>
                    <ul className="space-y-2">
                      {project.retrospective.regrets.map((regret, i) => (
                        <li key={i} className="flex gap-2 text-[12px] text-zinc-400 leading-relaxed">
                          <span className="text-red-500 font-bold">X</span>
                          <span>{regret}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 개선 방안 */}
                  <div className="p-5 rounded-xl border border-zinc-800 bg-[#111111]">
                    <h4 className="font-bold text-zinc-200 text-[13px] mb-3">개선 방안</h4>
                    <ul className="space-y-2">
                      {project.retrospective.improvements.map((imp, i) => (
                        <li key={i} className="flex gap-2 text-[12px] text-zinc-400 leading-relaxed">
                          <span className="text-blue-400 font-bold">→</span>
                          <span>{imp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 학습 결과 */}
                  <div className="p-5 rounded-xl border border-zinc-800 bg-[#111111]">
                    <h4 className="font-bold text-zinc-200 text-[13px] mb-3">학습 결과</h4>
                    <p className="flex gap-2 text-[12px] text-zinc-400 leading-relaxed">
                      <span className="text-green-500 font-bold">✓</span>
                      <span>{project.retrospective.lesson}</span>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
