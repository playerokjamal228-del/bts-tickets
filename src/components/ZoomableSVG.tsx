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
    const [isDragging, setIsDragging] = useState(false); // Only for cursor styling

    // Use refs for drag logic to avoid re-renders on simple taps (which breaks clicks on Android)
    const dragStartRef = useRef({ x: 0, y: 0 });
    const isDraggingRef = useRef(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Track pinch gesture
    const lastTouchDistanceRef = useRef<number | null>(null);
    const lastTouchCenterRef = useRef<{ x: number; y: number } | null>(null);

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

    // Touch event handlers for mobile
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleTouchStart = (e: TouchEvent) => {
            if (e.touches.length === 1) {
                // Single touch - start drag logic but DON'T re-render yet
                const touch = e.touches[0];
                isDraggingRef.current = false;
                dragStartRef.current = { x: touch.clientX - position.x, y: touch.clientY - position.y };
            } else if (e.touches.length === 2) {
                // Two touches - start pinch
                e.preventDefault();
                const touch1 = e.touches[0];
                const touch2 = e.touches[1];
                const distance = Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY);
                lastTouchDistanceRef.current = distance;
                lastTouchCenterRef.current = {
                    x: (touch1.clientX + touch2.clientX) / 2,
                    y: (touch1.clientY + touch2.clientY) / 2,
                };
            }
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (e.touches.length === 1) {
                // Single touch - drag/pan
                const touch = e.touches[0];
                const startX = dragStartRef.current.x;
                const startY = dragStartRef.current.y;

                const dx = touch.clientX - startX;
                const dy = touch.clientY - startY;

                // Threshold check
                if (!isDraggingRef.current) {
                    if (Math.abs(touch.clientX - (startX + position.x)) > 5 ||
                        Math.abs(touch.clientY - (startY + position.y)) > 5) {
                        isDraggingRef.current = true;
                        setIsDragging(true); // Now we update state for cursor/style
                    }
                }

                if (isDraggingRef.current) {
                    setPosition({ x: dx, y: dy });
                }
            } else if (e.touches.length === 2) {
                // Two touches - pinch to zoom
                e.preventDefault();
                const touch1 = e.touches[0];
                const touch2 = e.touches[1];
                const distance = Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY);

                if (lastTouchDistanceRef.current !== null) {
                    const scaleDelta = (distance - lastTouchDistanceRef.current) * 0.01;
                    setScale(prev => Math.min(Math.max(prev + scaleDelta, minScale), maxScale));
                }

                lastTouchDistanceRef.current = distance;
            }
        };

        const handleTouchEnd = () => {
            // Reset drag refs and state
            isDraggingRef.current = false;
            setIsDragging(false);
            lastTouchDistanceRef.current = null;
            lastTouchCenterRef.current = null;
        };

        container.addEventListener('touchstart', handleTouchStart, { passive: false });
        container.addEventListener('touchmove', handleTouchMove, { passive: false });
        container.addEventListener('touchend', handleTouchEnd);

        return () => {
            container.removeEventListener('touchstart', handleTouchStart);
            container.removeEventListener('touchmove', handleTouchMove);
            container.removeEventListener('touchend', handleTouchEnd);
        };
    }, [position, minScale, maxScale]); // Removed isDragging/dragStart from dependency array as they are now refs/internal

    const handleMouseDown = (e: React.MouseEvent) => {
        // Same logic for mouse to be consistent
        isDraggingRef.current = false;
        dragStartRef.current = { x: e.clientX - position.x, y: e.clientY - position.y };
        // For mouse, we might want immediate feedback or standard behavior. 
        // Standard drag behavior usually waits for move too, but let's keep it simple.
        // We'll mimic the touch logic to ensure clicks work.
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        // Note: Mouse events fire differently, validation check needed
        // Assuming we track mouse button state via external or global listener if needed, 
        // but here we just rely on the fact that MouseDown happened.
        // Wait, handleMouseMove needs to know if button is down. 
        // Typically we'd use state 'isDragging' for mouse, but we moved to refs.

        // Let's rely on the ref set in MouseDown. 
        // BUT MouseUp needs to clear it.
        // And we need to check if buttons are pressed?
        if (e.buttons === 0) {
            isDraggingRef.current = false;
            if (isDragging) setIsDragging(false);
            return;
        }

        const startX = dragStartRef.current.x;
        const startY = dragStartRef.current.y;

        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        if (!isDraggingRef.current) {
            if (Math.abs(e.clientX - (startX + position.x)) > 5 ||
                Math.abs(e.clientY - (startY + position.y)) > 5) {
                isDraggingRef.current = true;
                setIsDragging(true);
            }
        }

        if (isDraggingRef.current) {
            setPosition({ x: dx, y: dy });
        }
    };

    const handleMouseUp = () => {
        isDraggingRef.current = false;
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
            style={{ cursor: isDragging ? "grabbing" : "grab", touchAction: "none" }}
        >
            <div
                className="absolute top-4 right-4 flex flex-col gap-2 z-10"
                onMouseDown={e => e.stopPropagation()}
                onTouchStart={e => e.stopPropagation()}
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

            <div className="absolute bottom-4 left-4 text-xs text-white/50 pointer-events-none hidden sm:block">
                Scroll to zoom • Drag to pan
            </div>
            <div className="absolute bottom-4 left-4 text-xs text-white/50 pointer-events-none sm:hidden">
                Pinch to zoom • Swipe to pan
            </div>
        </div>
    );
};
