"use client";

import { useState, useEffect } from "react";
import { Clock, Info } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

export function InventoryTimer() {
    const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 0) return 15 * 60; // Reset loop or stay at 0
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className="cursor-help flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-3 py-1 hover:bg-red-500/20 transition-colors group">
                        <Clock className="w-3.5 h-3.5 text-red-400 group-hover:text-red-300" />
                        <span className="text-sm font-mono font-bold text-red-400 group-hover:text-red-300 tabular-nums">
                            {formattedTime}
                        </span>
                        <Info className="w-3.5 h-3.5 text-red-400/50 group-hover:text-red-300" />
                    </div>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="max-w-xs bg-zinc-900 border-zinc-800 text-zinc-300 p-3 left-0 translate-x-0">
                    <p className="text-xs leading-relaxed">
                        We’re a live marketplace—inventory and prices can change quickly. Secure your tickets now before they’re gone.
                    </p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
