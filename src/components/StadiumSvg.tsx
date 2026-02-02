"use client";

import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

// Map event IDs to their corresponding stadium SVG files
const STADIUM_SVG_MAP: Record<string, string> = {
    belgium: "/belgium.svg",
    uk: "/london.svg",
    germany: "/munich.svg",
    france: "/paris.svg",
    spain: "/madrid.svg",
};

interface StadiumSvgProps {
    eventId: string;
    onSectorSelect: (sector: string) => void;
    selectedSector: string | null;
    availabilityMap: Record<string, boolean>;
    hoveredSector: string | null;
    setHoveredSector: (sector: string | null) => void;
}

export function StadiumSvg({
    eventId,
    onSectorSelect,
    selectedSector,
    availabilityMap,
    hoveredSector,
    setHoveredSector
}: StadiumSvgProps) {
    const [svgContent, setSvgContent] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Determine the SVG file path based on eventId
    const svgPath = STADIUM_SVG_MAP[eventId] || "/belgium.svg";

    // Fetch the SVG file from public directory
    useEffect(() => {
        fetch(svgPath)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to load SVG");
                return res.text();
            })
            .then((text) => {
                setSvgContent(text);
            })
            .catch((err) => {
                console.error("Error loading stadium map:", err);
            });
    }, [svgPath]);

    // Handle interactions (Click & Hover) via Event Delegation
    useEffect(() => {
        const container = containerRef.current;
        if (!container || !svgContent) return;

        // Helper to find the interactive group
        const getGroup = (target: EventTarget | null) => {
            if (!(target instanceof Element)) return null;
            return target.closest('g.interactive-section');
        };

        const handleClick = (e: MouseEvent) => {
            const group = getGroup(e.target);
            if (group) {
                const id = group.id.replace("-group", "");
                if (availabilityMap[id] !== false) {
                    onSectorSelect(id);
                }
            }
        };

        const handleMouseOver = (e: MouseEvent) => {
            const group = getGroup(e.target);
            if (group) {
                const id = group.id.replace("-group", "");
                setHoveredSector(id);
            } else {
                setHoveredSector(null);
            }
        };

        const handleMouseOut = (e: MouseEvent) => {
            // Check if relatedTarget is still within the container
            if (!container.contains(e.relatedTarget as Node)) {
                setHoveredSector(null);
            }
        };

        // Attach listeners
        container.addEventListener("click", handleClick);
        container.addEventListener("mouseover", handleMouseOver);
        container.addEventListener("mouseout", handleMouseOut);

        return () => {
            container.removeEventListener("click", handleClick);
            container.removeEventListener("mouseover", handleMouseOver);
            container.removeEventListener("mouseout", handleMouseOut);
        };
    }, [svgContent, onSectorSelect, setHoveredSector, availabilityMap]);

    // Apply Dynamic Styles for Availability & Selection
    useEffect(() => {
        if (!svgContent) return;

        const styleId = "stadium-dynamic-styles";
        let styleEl = document.getElementById(styleId) as HTMLStyleElement;

        if (!styleEl) {
            styleEl = document.createElement("style");
            styleEl.id = styleId;
            document.head.appendChild(styleEl);
        }

        const cssRules = [];

        // Base interactive style - target .interactive-section class
        cssRules.push(`
            g.interactive-section { cursor: default; pointer-events: none; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important; }
            g.interactive-section path { fill: #374151 !important; transition: fill 0.3s ease, stroke 0.3s ease, filter 0.3s ease !important; stroke: transparent; }
            g.interactive-section text { pointer-events: none; fill: white !important; font-weight: bold; text-shadow: 0 1px 2px rgba(0,0,0,0.8); }
            
            /* Hover State */
            g.interactive-section:hover path { 
                fill: rgba(168, 85, 247, 0.6) !important; /* purple-500 with opacity */
                filter: drop-shadow(0 0 10px rgba(168, 85, 247, 0.8)); 
                stroke: #fff !important;
                stroke-width: 2px !important;
            }

            /* Hide VIP Label if present */
            #VIP, #vip, .vip, g[id="VIP"], g[id="vip"], g[label="VIP"] { display: none !important; opacity: 0 !important; visibility: hidden !important; }

            /* Fix for white border/frame in some SVGs */
            /* Target specific static background elements */
            #static-elements path, #static-elements rect, 
            g[id*="background"] path, g[id*="Background"] path,
            svg .fil0 /* specific class from belgium.svg background */
            { fill: #1f2937 !important; stroke: none !important; opacity: 0.1 !important; }

            /* Force stroke transparent for white strokes to hide frame */
            svg path[stroke="#fff"], svg path[stroke="#ffffff"], svg path[stroke="white"],
            svg .str0, svg .str1, svg .str2 /* specific classes from belgium.svg */
            { stroke: transparent !important; stroke-width: 0 !important; }
            
            svg path[fill="none"] { stroke: none !important; }
            
            /* Hide white backgrounds or make them match theme */
            .bg-white, svg [fill="#fff"], svg [fill="#ffffff"], svg [fill="white"] { fill: #1f2937 !important; opacity: 0 !important; } 
            
            /* Exception for text - restore white fill for labels if they were hit */
            text { fill: white !important; opacity: 1 !important; }
        `);

        // Selected Sector
        if (selectedSector) {
            cssRules.push(`
                g[data-section-id="${selectedSector}"] path { 
                    fill: #7e22ce !important; /* purple-700 */
                    stroke: white !important; 
                    stroke-width: 3px !important; 
                    filter: drop-shadow(0 0 15px rgba(168, 85, 247, 1));
                }
                g[data-section-id="${selectedSector}"] text { fill: white !important; }
            `);
        }

        // Hovered Sector (programmatic highlight if needed)
        if (hoveredSector && hoveredSector !== selectedSector) {
            cssRules.push(`
                g[data-section-id="${hoveredSector}"] path { 
                    fill: rgba(192, 132, 252, 0.8) !important; /* purple-400 */
                }
            `);
        }

        // Availability Coloring - Style ALL sectors based on availability
        Object.entries(availabilityMap).forEach(([seatId, isAvailable]) => {
            if (isAvailable) {
                // Available sectors - teal/cyan color to indicate clickable
                cssRules.push(`
                    g[data-section-id="${seatId}"] { cursor: pointer !important; pointer-events: auto !important; }
                    /* Changed from green-500 to purple-600 to match site theme */
                    g[data-section-id="${seatId}"] path { fill: rgba(147, 51, 234, 0.7) !important; } 
                    g[data-section-id="${seatId}"]:hover path { 
                        fill: rgba(168, 85, 247, 0.9) !important; /* purple-500 brighter */
                        filter: drop-shadow(0 0 10px rgba(168, 85, 247, 0.8));
                        stroke: #fff !important;
                        stroke-width: 2px !important;
                    }
                `);
            } else {
                // Unavailable sectors - gray and non-interactive
                cssRules.push(`
                    g[data-section-id="${seatId}"] { cursor: not-allowed !important; opacity: 0.4; pointer-events: none !important; }
                    g[data-section-id="${seatId}"] path { fill: #374151 !important; } /* gray-700 */
                `);
            }
        });

        styleEl.innerHTML = cssRules.join("\n");

        return () => {
            // Cleanup styles when unmounting or updating
            // Note: We might want to keep them if we are just updating selection to avoid flash
            // But removing is safer to avoid pollution
            // styleEl.remove(); // Actually, don't remove, just update. 
        };
    }, [selectedSector, hoveredSector, availabilityMap, svgContent]);


    if (!svgContent) {
        return (
            <div className="flex items-center justify-center w-full h-full text-white/50 text-sm animate-pulse">
                Loading Stadium Map...
            </div>
        );
    }

    const isWhiteBackgroundMap = ["belgium", "uk", "france"].includes(eventId);

    return (
        <div
            ref={containerRef}
            className={cn(
                "w-full h-full relative",
                // Force dark background for maps that are inherently white/transparent
                isWhiteBackgroundMap && "bg-[#1f2937] rounded-xl"
            )}
            dangerouslySetInnerHTML={{ __html: svgContent }}
        />
    );
}
