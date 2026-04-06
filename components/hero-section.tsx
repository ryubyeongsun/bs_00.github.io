"use client"

import { Button } from "@/components/ui/button"
import { Github, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden bg-[#060f0b]">
      {/* Ambient Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[150px] animate-pulse-glow -z-10" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-teal-400/8 rounded-full blur-[120px] animate-pulse-glow -z-10" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-cyan-500/6 rounded-full blur-[100px] animate-pulse-glow -z-10" style={{ animationDelay: '4s' }} />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98108_1px,transparent_1px),linear-gradient(to_bottom,#10b98108_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,#000_50%,transparent_100%)] -z-10" />
      
      {/* Decorative floating elements */}
      <div className="absolute top-20 left-[15%] w-2 h-2 bg-emerald-400/30 rounded-full animate-float" />
      <div className="absolute top-40 right-[20%] w-1.5 h-1.5 bg-teal-400/25 rounded-full animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-32 left-[25%] w-1 h-1 bg-cyan-400/20 rounded-full animate-float" style={{ animationDelay: '3s' }} />

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <Badge variant="secondary" className="px-4 py-1.5 text-sm font-medium rounded-full border-emerald-500/20 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-colors backdrop-blur-sm">
            Backend Engineer
          </Badge>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold mb-8 text-white tracking-tight leading-tight [word-break:keep-all] animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
          신뢰를 설계하는 <br className="hidden md:block" />
          백엔드 엔지니어,{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
            류병선
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-slate-400 mb-10 leading-relaxed max-w-2xl mx-auto [word-break:keep-all] animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
          Java 웹 개발의 기본기부터 대용량 분산 시스템 설계까지.
          <br className="hidden md:block" />
          견고하고 확장 가능한 솔루션을 구축합니다.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500">
          <Button
            size="lg"
            className="h-12 px-8 text-base font-semibold bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg shadow-emerald-500/25 transition-all hover:scale-105"
            onClick={() => {
              document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            View Projects <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="h-12 px-8 text-base border-emerald-400/30 text-emerald-400 hover:bg-emerald-400/10 hover:text-emerald-300 hover:border-emerald-300 transition-all hover:scale-105 backdrop-blur-sm"
            onClick={() => {
              document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            About Me
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="h-12 px-8 text-base border-emerald-800/50 text-emerald-200 bg-emerald-950/30 hover:bg-emerald-900/40 hover:text-white hover:border-emerald-500/50 transition-all hover:scale-105 backdrop-blur-sm"
            asChild
          >
            <a href="https://github.com/ryubyeongsun" target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-5 w-5" />
              GitHub Profile
            </a>
          </Button>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
