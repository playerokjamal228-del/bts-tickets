"use client";

import { useState } from "react";
import { X, Calendar, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/language-context";

interface DateSelectModalProps {
    isOpen: boolean;
    onClose: () => void;
    city: string;
    eventId: string;
    dates: string[];
}

export function DateSelectModal({ isOpen, onClose, city, eventId, dates }: DateSelectModalProps) {
    const router = useRouter();
    const [hoveredDate, setHoveredDate] = useState<string | null>(null);
    const { t } = useLanguage();

    if (!isOpen) return null;

    const handleDateSelect = (date: string) => {
        // Convert "July 17" to "2026-07-17" format
        const monthMap: Record<string, string> = {
            "January": "01", "February": "02", "March": "03", "April": "04",
            "May": "05", "June": "06", "July": "07", "August": "08",
            "September": "09", "October": "10", "November": "11", "December": "12"
        };

        const parts = date.split(" ");
        const month = monthMap[parts[0]] || "07";
        const day = parts[1].padStart(2, "0");
        const formattedDate = `2026-${month}-${day}`;

        router.push(`/event/${eventId}?date=${formattedDate}`);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl shadow-purple-500/20">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-500/20 mb-4">
                        <Calendar className="w-8 h-8 text-purple-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                        {t.dateModal.selectDate} {city}
                    </h2>
                    <p className="text-gray-400 text-sm">
                        {t.dateModal.choosePreferred}
                    </p>
                </div>

                {/* Date buttons */}
                <div className="space-y-4">
                    {dates.map((date) => (
                        <button
                            key={date}
                            onClick={() => handleDateSelect(date)}
                            onMouseEnter={() => setHoveredDate(date)}
                            onMouseLeave={() => setHoveredDate(null)}
                            className={cn(
                                "w-full p-5 rounded-2xl border transition-all duration-300",
                                "flex items-center justify-between",
                                hoveredDate === date
                                    ? "bg-purple-600 border-purple-400 shadow-[0_0_30px_rgba(168,85,247,0.5)]"
                                    : "bg-white/5 border-white/10 hover:bg-white/10"
                            )}
                        >
                            <div className="flex items-center gap-4">
                                <div className={cn(
                                    "w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg",
                                    hoveredDate === date ? "bg-white/20" : "bg-purple-500/20"
                                )}>
                                    {date.split(" ")[1]}
                                </div>
                                <div className="text-left">
                                    <div className="text-white font-semibold text-lg">{date}, 2026</div>
                                    <div className="text-gray-400 text-sm">19:00 CET</div>
                                </div>
                            </div>
                            <ArrowRight className={cn(
                                "w-5 h-5 transition-transform",
                                hoveredDate === date ? "text-white translate-x-1" : "text-gray-500"
                            )} />
                        </button>
                    ))}
                </div>

                {/* Footer text */}
                <p className="text-center text-gray-500 text-xs mt-6">
                    {t.dateModal.sellingFast}
                </p>
            </div>
        </div>
    );
}
