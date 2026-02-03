"use client";

import { Flame } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export function ScarcityBanner() {
    const { t } = useLanguage();

    return (
        <div className="w-full bg-orange-500/10 border-y border-orange-500/20 backdrop-blur-md py-2 px-4 flex items-center justify-center gap-2 text-orange-200 animate-in fade-in slide-in-from-top-4 duration-700">
            <div className="relative">
                <Flame className="w-4 h-4 text-orange-500 animate-pulse" />
                <div className="absolute inset-0 bg-orange-500/20 blur-lg rounded-full animate-pulse" />
            </div>
            <span className="text-sm font-medium tracking-wide">
                {t.dateModal.sellingFast}
            </span>
        </div>
    );
}
