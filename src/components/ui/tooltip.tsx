"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

const TooltipProvider = ({ children }: { children: React.ReactNode }) => <>{children}</>

const Tooltip = ({ children }: { children: React.ReactNode }) => <div className="relative group inline-block">{children}</div>

const TooltipTrigger = ({ children, asChild }: { children: React.ReactNode, asChild?: boolean }) => {
    return <>{children}</>
}

const TooltipContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & { side?: "top" | "right" | "bottom" | "left" }
>(({ className, side = "top", ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 absolute z-50 overflow-hidden rounded-md border bg-zinc-900 border-zinc-800 px-3 py-1.5 text-xs text-zinc-300 shadow-md w-max max-w-[200px]",
            side === "bottom" ? "top-full mt-2 left-1/2 -translate-x-1/2" : "",
            side === "top" ? "bottom-full mb-2 left-1/2 -translate-x-1/2" : "",
            className
        )}
        {...props}
    />
))
TooltipContent.displayName = "TooltipContent"

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
