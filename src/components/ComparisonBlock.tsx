"use client";

import { Check, X, ShieldCheck, Zap, MessageCircle, DollarSign } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { cn } from "@/lib/utils";

export const ComparisonBlock = () => {
    const { t } = useLanguage();

    if (!t.comparison) return null;

    const features = [
        {
            key: "price",
            icon: DollarSign,
            label: t.comparison.features.price,
            comp: t.comparison.features.priceComp,
            us: t.comparison.features.priceUs,
            usHighlight: true, // For green/bold styling
        },
        {
            key: "speed",
            icon: Zap,
            label: t.comparison.features.speed,
            comp: t.comparison.features.speedComp,
            us: t.comparison.features.speedUs,
        },
        {
            key: "type",
            icon: ShieldCheck,
            label: t.comparison.features.type,
            comp: t.comparison.features.typeComp,
            us: t.comparison.features.typeUs,
        },
        {
            key: "support",
            icon: MessageCircle,
            label: t.comparison.features.support,
            comp: t.comparison.features.supportComp,
            us: t.comparison.features.supportUs,
        },
    ];

    return (
        <section className="py-24 px-4 md:px-12 lg:px-20 max-w-7xl mx-auto relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center mb-16 text-center">
                <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-6">
                    {t.comparison.title} <span className="text-purple-400">{t.comparison.titleHighlight}</span>
                </h2>
            </div>

            <div className="relative z-10 w-full max-w-5xl mx-auto">
                {/* Desktop Table Header */}
                <div className="hidden md:grid grid-cols-12 gap-4 mb-6 px-6 py-4 bg-white/5 rounded-t-xl border-b border-white/10 text-base font-semibold tracking-wider uppercase text-gray-400">
                    <div className="col-span-4">{t.comparison.feature}</div>
                    <div className="col-span-4 flex items-center gap-2 text-red-400">
                        <X className="w-5 h-5" />
                        {t.comparison.competitors}
                    </div>
                    <div className="col-span-4 flex items-center gap-2 text-green-400">
                        <Check className="w-5 h-5" />
                        {t.comparison.us}
                    </div>
                </div>

                {/* Rows */}
                <div className="space-y-4 md:space-y-0">
                    {features.map((item, index) => (
                        <div
                            key={item.key}
                            className={cn(
                                "relative group md:grid md:grid-cols-12 md:gap-4 md:px-6 md:py-6 rounded-xl md:rounded-lg transition-all duration-300",
                                // Mobile Styling
                                "flex flex-col gap-4 p-6 bg-white/5 border border-white/10 md:bg-transparent md:border-transparent md:border-b md:border-white/5",
                                // Hover effect
                                "hover:bg-white/5"
                            )}
                        >
                            {/* Feature Label */}
                            <div className="md:col-span-4 flex items-center gap-3 text-lg font-medium text-white/90">
                                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 md:hidden">
                                    <item.icon className="w-5 h-5" />
                                </div>
                                <span className="flex items-center gap-2">
                                    <item.icon className="w-5 h-5 text-purple-400 hidden md:block" />
                                    {item.label}
                                </span>
                            </div>

                            {/* Competitor Side */}
                            <div className="md:col-span-4 flex items-center text-gray-400 gap-3 md:gap-0 text-lg">
                                <span className="md:hidden text-sm uppercase tracking-wider text-red-400/80 font-semibold min-w-[80px]">Others:</span>
                                <span className="line-through decoration-red-500/50 decoration-2">{item.comp}</span>
                            </div>

                            {/* Our Side */}
                            <div className="md:col-span-4 flex items-center font-semibold text-white gap-3 md:gap-0 text-lg">
                                <span className="md:hidden text-sm uppercase tracking-wider text-green-400/80 font-semibold min-w-[80px]">Us:</span>
                                <span className={cn(
                                    "flex items-center gap-2 py-1 px-3 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.1)]",
                                    item.usHighlight ? "text-green-300 shadow-[0_0_20px_rgba(34,197,94,0.2)]" : ""
                                )}>
                                    <Check className="w-5 h-5" />
                                    {item.us}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Export To Sheets Mock (from screenshot) - Optional, maybe nice touch? */}
                {/* The user screenshot showed "Export to Sheets". I'll skip it unless it's critical, as it looks like a UI artifact from Notion or similar. The user said "Name this block... Make simple table...". The "Export to Sheets" is likely from the screenshot tool or source, not part of the requested design. */}
            </div>
        </section>
    );
};
