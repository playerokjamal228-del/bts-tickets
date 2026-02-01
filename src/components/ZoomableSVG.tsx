"use client";

import React, { useRef, useState, useEffect } from "react";
import { Plus, Minus, RotateCcw } from "lucide-react";
import { Button } from "./ui/button";

interface ZoomableSVGProps {
    children: React.ReactNode;
    width?: number;
    height?: number;
    initialScale?: number;
    minScale?: number;
    maxScale?: number;
    className?: string;
}

export const ZoomableSVG = ({
    children,
    width = 500,
    height = 500,
    initialScale = 1,
    minScale = 0.5,
    maxScale = 4,
    className = "",
}: ZoomableSVGProps) => {
    const [scale, setScale] = useState(initialScale);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    // Native non-passive wheel listener to prevent page scroll
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const onWheel = (e: WheelEvent) => {
            e.preventDefault();
            e.stopPropagation();

            const scaleAdjustment = -e.deltaY * 0.001;
            setScale(prev => Math.min(Math.max(prev + scaleAdjustment, minScale), maxScale));
        };

        container.addEventListener('wheel', onWheel, { passive: false });

        return () => {
            container.removeEventListener('wheel', onWheel);
        };
    }, [minScale, maxScale]);

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isDragging) {
            setPosition({
                x: e.clientX - dragStart.x,
                y: e.clientY - dragStart.y,
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleZoomIn = () => setScale(prev => Math.min(prev * 1.2, maxScale));
    const handleZoomOut = () => setScale(prev => Math.max(prev / 1.2, minScale));
    const handleReset = () => {
        setScale(initialScale);
        setPosition({ x: 0, y: 0 });
    };

    return (
        <div
            className={`relative overflow-hidden bg-black/20 rounded-xl border border-white/10 ${className}`}
            ref={containerRef}
            style={{ cursor: isDragging ? "grabbing" : "grab" }}
        >
            <div
                className="absolute top-4 right-4 flex flex-col gap-2 z-10"
                onMouseDown={e => e.stopPropagation()}
            >
                <Button variant="secondary" size="icon" onClick={handleZoomIn} className="h-8 w-8 bg-white/10 hover:bg-white/20 text-white">
                    <Plus className="h-4 w-4" />
                </Button>
                <Button variant="secondary" size="icon" onClick={handleZoomOut} className="h-8 w-8 bg-white/10 hover:bg-white/20 text-white">
                    <Minus className="h-4 w-4" />
                </Button>
                <Button variant="secondary" size="icon" onClick={handleReset} className="h-8 w-8 bg-white/10 hover:bg-white/20 text-white">
                    <RotateCcw className="h-4 w-4" />
                </Button>
            </div>

            <div
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                className="w-full h-full flex items-center justify-center origin-center"
            >
                <div
                    style={{
                        transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                        transition: isDragging ? "none" : "transform 0.1s ease-out",
                        width: width,
                        height: height,
                    }}
                >
                    {children}
                </div>
            </div>

            <div className="absolute bottom-4 left-4 text-xs text-white/50 pointer-events-none">
                Scroll to zoom • Drag to pan
            </div>
        </div>
    );
};
