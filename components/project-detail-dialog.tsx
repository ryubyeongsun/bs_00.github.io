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
import { ExternalLink, Calendar, User } from "lucide-react"
import Image, { StaticImageData } from "next/image"
import { TroubleshootingDialog, TroubleshootingLog } from "./troubleshooting-dialog"

export interface Project {
  id: number
  title: string
  description: string
  period: string
  role: string
  techStack: string[]
  situation: string
  task: string
  action: string
  result: string
  image?: string | StaticImageData
  architecture?: string | StaticImageData
  troubleshooting?: TroubleshootingLog
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
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
