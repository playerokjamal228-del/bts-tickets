"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { ZoomableSVG } from "./ZoomableSVG";
import { StadiumSvg } from "./StadiumSvg";

interface StadiumWidgetProps {
    onSectorSelect: (sector: string) => void;
    selectedSector: string | null;
    eventId: string;
    availabilityMap: Record<string, boolean>;
}

export function StadiumWidget({
    onSectorSelect,
    selectedSector,
    eventId,
    availabilityMap,
}: StadiumWidgetProps) {
    const [hoveredSector, setHoveredSector] = useState<string | null>(null);

    return (
        <div className="relative w-full h-full">
            <ZoomableSVG className="w-full h-full bg-zinc-900/50 rounded-xl">
                <StadiumSvg
                    eventId={eventId}
                    onSectorSelect={onSectorSelect}
                    selectedSector={selectedSector}
                    availabilityMap={availabilityMap}
                    hoveredSector={hoveredSector}
                    setHoveredSector={setHoveredSector}
                />
            </ZoomableSVG>
        </div>
    );
}
