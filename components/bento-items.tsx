"use client";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
    Github,
    Mail,
    MapPin,
    ArrowUpRight,
    Database,
    Server,
    Code2,
    Terminal,
    Sparkles,
    Calendar,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const ProfileItem = () => {
    return (
        <div className="flex flex-col justify-between h-full bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-900 dark:to-neutral-800 rounded-xl p-6 border border-neutral-200 dark:border-neutral-800">
            <div className="flex items-start justify-between">
                <div>
                    <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-100 mb-1">
                        류병선
                    </h2>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                        Backend Developer
                    </p>
                </div>
                <div className="relative h-12 w-12 rounded-full overflow-hidden border border-neutral-200 dark:border-neutral-700 bg-gradient-to-br from-neutral-300 to-neutral-400 dark:from-neutral-700 dark:to-neutral-800 flex items-center justify-center">
                    <span className="text-white text-lg font-bold">류</span>
                </div>
            </div>

            <div className="mt-4 space-y-2">
                <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    <span className="font-semibold text-primary">문제를 해결하는</span> 백엔드 개발자입니다.
                    안정적이고 효율적인 서버 구축을 목표로 하며,
                    사용자 경험을 최우선으로 생각합니다.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                    <Badge variant="secondary" className="text-xs">
                        <MapPin className="w-3 h-3 mr-1" /> Gwangju, KR
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                        조선대학교
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                        <Calendar className="w-3 h-3 mr-1" /> 2025.08 졸업
                    </Badge>
                </div>
            </div>
        </div>
    );
};

export const SocialItem = ({
    icon: Icon,
    label,
    href,
    username,
}: {
    icon: any;
    label: string;
    href: string;
    username: string;
}) => {
    return (
        <Link
            href={href}
            target="_blank"
            className="flex flex-col justify-center items-center h-full w-full p-4 bg-white dark:bg-black border border-neutral-200 dark:border-white/[0.2] rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors group"
        >
            <Icon className="w-8 h-8 text-neutral-700 dark:text-neutral-300 mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
                {label}
            </span>
            <span className="text-[10px] text-neutral-500 dark:text-neutral-400">
                {username}
            </span>
        </Link>
    );
};

export const SkillItem = () => {
    const skills = [
        { name: "Java", icon: Code2 },
        { name: "Spring Boot", icon: Server },
        { name: "JPA", icon: Database },
        { name: "MySQL", icon: Database },
        { name: "Docker", icon: Terminal },
        { name: "AWS", icon: Server },
    ];

    return (
        <div className="h-full p-6 bg-white dark:bg-black border border-neutral-200 dark:border-white/[0.2] rounded-xl flex flex-col">
            <h3 className="text-lg font-bold text-neutral-800 dark:text-neutral-100 mb-4 flex items-center gap-2">
                <Terminal className="w-5 h-5" /> Tech Stack
            </h3>
            <div className="grid grid-cols-3 gap-3">
                {skills.map((skill) => (
                    <div
                        key={skill.name}
                        className="flex flex-col items-center justify-center p-2 rounded-lg bg-neutral-100 dark:bg-neutral-900/50 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
                    >
                        <skill.icon className="w-5 h-5 text-neutral-600 dark:text-neutral-400 mb-1" />
                        <span className="text-[10px] font-medium text-neutral-700 dark:text-neutral-300 text-center">
                            {skill.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export const ProjectItem = ({
    title,
    description,
    tags,
    image,
    href,
    index,
}: {
    title: string;
    description: string;
    tags: string[];
    image?: string;
    href?: string;
    index: number;
}) => {
    return (
        <div className="group relative h-full min-h-[16rem] rounded-xl overflow-hidden border border-neutral-200 dark:border-white/[0.2] bg-white dark:bg-black flex flex-col">
            <div className="absolute inset-0 bg-neutral-900/10 dark:bg-neutral-100/5 group-hover:opacity-0 transition-opacity z-10" />

            {/* Content */}
            <div className="p-5 flex flex-col h-full z-20 relative">
                <div className="flex justify-between items-start mb-2">
                    <div className="flex flex-wrap gap-1 mb-2">
                        {tags.slice(0, 3).map((tag) => (
                            <Badge
                                key={tag}
                                variant="outline"
                                className="text-[10px] px-1.5 py-0 h-5 bg-white/50 dark:bg-black/50 backdrop-blur-sm"
                            >
                                {tag}
                            </Badge>
                        ))}
                    </div>
                    {href && (
                        <Link
                            href={href}
                            target="_blank"
                            className="text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors"
                        >
                            <ArrowUpRight className="w-5 h-5" />
                        </Link>
                    )}
                </div>

                <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-2 group-hover:text-primary transition-colors">
                    {title}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-3 mb-4">
                    {description}
                </p>

                {/* Image Display */}
                {image ? (
                    <div className="mt-auto w-full h-40 rounded-lg overflow-hidden relative border border-neutral-200 dark:border-neutral-800">
                        <Image
                            src={image}
                            alt={title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    </div>
                ) : (
                    <div className="mt-auto w-full h-32 rounded-lg bg-neutral-100 dark:bg-neutral-900 overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        <div className={`p-4 font-mono text-xs text-neutral-500 h-full flex items-end ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                            No Image Available
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
