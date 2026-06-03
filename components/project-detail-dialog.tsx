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
import { ExternalLink, Calendar, User, Users, Github, CheckCircle2, AlertTriangle, Lightbulb, Quote, Network } from "lucide-react"
import Image, { StaticImageData } from "next/image"
import { TroubleshootingDialog, TroubleshootingLog } from "./troubleshooting-dialog"

export interface ProjectContribution {
  percentage: string
  summary: string
  details: string[]
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
  role: string
  techStack: string[]
  contribution?: ProjectContribution
  situation: string
  task: string
  action: string
  result: string
  retrospective?: ProjectRetrospective
  image?: string | StaticImageData
  architecture?: string | StaticImageData
  architectureImage?: string
  troubleshooting?: TroubleshootingLog
  githubLink?: string
  link?: string
}

const STAR_COLORS = {
  situation: "bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800",
  task: "bg-purple-50 dark:bg-purple-950/50 border-purple-200 dark:border-purple-800",
  action: "bg-green-50 dark:bg-green-950/50 border-green-200 dark:border-green-800",
  result: "bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-800",
}

const STAR_TEXT_COLORS = {
  situation: "text-blue-700 dark:text-blue-300",
  task: "text-purple-700 dark:text-purple-300",
  action: "text-green-700 dark:text-green-300",
  result: "text-amber-700 dark:text-amber-300",
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

        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-8 pb-8">

            {/* 개인 기여도 영역 */}
            {project.contribution && (
              <div className="p-5 rounded-xl border border-cyan-200 dark:border-cyan-800 bg-cyan-50/50 dark:bg-cyan-950/30">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-cyan-700 dark:text-cyan-300">
                  <CheckCircle2 className="h-5 w-5" />
                  개인 기여도 및 역할
                  <Badge variant="outline" className="ml-2 text-xs border-cyan-300 dark:border-cyan-700 text-cyan-700 dark:text-cyan-300">
                    기여도 {project.contribution.percentage}
                  </Badge>
                </h3>
                <p className="text-sm font-medium text-foreground/80 mb-3">
                  {project.contribution.summary}
                </p>
                <ul className="space-y-1.5">
                  {project.contribution.details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan-500 shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-col xl:flex-row gap-8">
              {(project.architecture || project.image) && (
                <div className="xl:w-[360px] shrink-0 space-y-3">
                  <h3 className="text-lg font-semibold">
                    {project.architecture ? "시스템 아키텍처" : "프로젝트 미리보기"}
                  </h3>
                  <div className="rounded-lg border bg-muted/50 overflow-hidden">
                    <Image
                      src={project.architecture || project.image!}
                      alt={project.title}
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="w-full h-auto object-contain"
                    />
                  </div>
                </div>
              )}

              <div className="flex-1 space-y-4">
                <h3 className="text-lg font-semibold">프로젝트 상세 (Engineering STAR)</h3>

                <div className="grid gap-4">
                  <div className={`p-5 rounded-xl border ${STAR_COLORS.situation}`}>
                    <h4 className={`font-bold mb-2 flex items-center gap-2 ${STAR_TEXT_COLORS.situation}`}>
                      <span className="bg-blue-200 dark:bg-blue-900 px-2 py-0.5 rounded text-xs">Situation</span>
                      배경 및 문제
                    </h4>
                    <p className="text-base leading-relaxed whitespace-pre-line text-foreground/90">
                      {project.situation}
                    </p>
                  </div>

                  <div className={`p-5 rounded-xl border ${STAR_COLORS.task}`}>
                    <h4 className={`font-bold mb-2 flex items-center gap-2 ${STAR_TEXT_COLORS.task}`}>
                      <span className="bg-purple-200 dark:bg-purple-900 px-2 py-0.5 rounded text-xs">Task</span>
                      기술적 과제
                    </h4>
                    <p className="text-base leading-relaxed whitespace-pre-line text-foreground/90">
                      {project.task}
                    </p>
                  </div>

                  <div className={`p-5 rounded-xl border ${STAR_COLORS.action}`}>
                    <h4 className={`font-bold mb-2 flex items-center gap-2 ${STAR_TEXT_COLORS.action}`}>
                      <span className="bg-green-200 dark:bg-green-900 px-2 py-0.5 rounded text-xs">Action</span>
                      해결책 및 아키텍처
                    </h4>
                    <p className="text-base leading-relaxed whitespace-pre-line text-foreground/90">
                      {project.action}
                    </p>
                  </div>

                  <div className={`p-5 rounded-xl border ${STAR_COLORS.result}`}>
                    <h4 className={`font-bold mb-2 flex items-center gap-2 ${STAR_TEXT_COLORS.result}`}>
                      <span className="bg-amber-200 dark:bg-amber-900 px-2 py-0.5 rounded text-xs">Result</span>
                      성과 및 임팩트
                    </h4>
                    <p className="text-base leading-relaxed whitespace-pre-line text-foreground/90">
                      {project.result}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* System Architecture */}
            {project.architectureImage && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200 fill-mode-both">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Network className="w-5 h-5 text-indigo-500" />
                  시스템 아키텍처 (System Architecture)
                </h3>
                <div className="bg-muted/50 rounded-xl p-4 border flex justify-center">
                  <img
                    src={typeof project.architectureImage === "string" ? project.architectureImage : project.architectureImage.src}
                    alt={`${project.title} Architecture`}
                    className="max-w-full rounded-lg shadow-sm"
                  />
                </div>
              </div>
            )}

            {project.troubleshooting && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  트러블슈팅 로그
                  <Badge variant="outline" className="text-xs font-normal">Technical Deep Dive</Badge>
                </h3>
                <div className="border rounded-xl p-1 bg-muted/30">
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{project.troubleshooting.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {project.troubleshooting.date} • {project.troubleshooting.environment}
                      </p>
                    </div>
                    <TroubleshootingDialog log={project.troubleshooting} />
                  </div>
                </div>
              </div>
            )}

            {/* 회고 영역 */}
            {project.retrospective && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">성과 회고</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="p-4 rounded-xl border border-orange-200 dark:border-orange-800 bg-orange-50/50 dark:bg-orange-950/30">
                    <h4 className="font-semibold text-sm mb-3 flex items-center gap-2 text-orange-700 dark:text-orange-300">
                      <AlertTriangle className="h-4 w-4" />
                      아쉬운 점 / 기술적 한계
                    </h4>
                    <ul className="space-y-1.5">
                      {project.retrospective.regrets.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-orange-400 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/30">
                    <h4 className="font-semibold text-sm mb-3 flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
                      <Lightbulb className="h-4 w-4" />
                      개선 방안
                    </h4>
                    <ul className="space-y-1.5">
                      {project.retrospective.improvements.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50">
                  <h4 className="font-semibold text-sm mb-2 flex items-center gap-2 text-slate-600 dark:text-slate-300">
                    <Quote className="h-4 w-4" />
                    기술적 깨달음
                  </h4>
                  <p className="text-sm text-foreground/80 leading-relaxed italic">
                    {project.retrospective.lesson}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
