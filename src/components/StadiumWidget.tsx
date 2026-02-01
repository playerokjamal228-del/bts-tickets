"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { ZoomableSVG } from "./ZoomableSVG";

interface StadiumWidgetProps {
    onSectorSelect: (sector: string) => void;
    selectedSector: string | null;
    eventId: string;
    availabilityMap: Record<string, boolean>;
}

const SectorBlock = ({
    id, x, y, w, h, color, rotate = 0, fontSize = 6,
    onSectorSelect, setHoveredSector, availabilityMap, selectedSector, hoveredSector
}: {
    id: string; x: number; y: number; w: number; h: number;
    color: string; rotate?: number; fontSize?: number;
    onSectorSelect: (id: string) => void;
    setHoveredSector: (id: string | null) => void;
    availabilityMap: Record<string, boolean>;
    selectedSector: string | null;
    hoveredSector: string | null;
}) => {
    const isAvailable = availabilityMap[id] !== false;
    const isSelected = selectedSector === id;
    const isHovered = hoveredSector === id;
    const isActive = isAvailable && (isSelected || isHovered);

    // Styling for sold out
    // Removing opacity modifier from color string if present, handling opacity separately
    // Assuming color is like "fill-red-500"
    const fillColor = isAvailable ? color : "fill-gray-700";
    const strokeColor = isAvailable ? "stroke-white/30" : "stroke-gray-600";
    const cursorClass = isAvailable ? "cursor-pointer" : "cursor-not-allowed";

    return (
        <g
            onClick={() => isAvailable && onSectorSelect(id)}
            onMouseEnter={() => isAvailable && setHoveredSector(id)}
            onMouseLeave={() => setHoveredSector(null)}
            className={cursorClass}
            transform={rotate ? `rotate(${rotate} ${Math.round(x + w / 2)} ${Math.round(y + h / 2)})` : undefined}
            style={{
                filter: isActive ? 'drop-shadow(0 0 6px rgba(168,85,247,0.9))' : 'none',
                opacity: isAvailable ? 1 : 0.6
            }}
        >
            <rect
                x={x} y={y} width={w} height={h} rx={2}
                className={cn(
                    "transition-all duration-150",
                    isActive
                        ? "fill-purple-400 stroke-purple-300 stroke-2"
                        : `${fillColor} ${strokeColor} stroke-[0.5]`
                )}
            />
            <text
                x={x + w / 2} y={y + h / 2}
                textAnchor="middle" dominantBaseline="middle"
                className={cn("font-semibold pointer-events-none select-none", isActive ? "fill-white" : "fill-gray-400")}
                style={{ fontSize: `${fontSize}px` }}
            >
                {id}
            </text>
        </g>
    );
};

export function StadiumWidget({
    onSectorSelect,
    selectedSector,
    eventId,
    availabilityMap,
}: StadiumWidgetProps) {
    const [hoveredSector, setHoveredSector] = useState<string | null>(null);

    // Helper to render a block with props pre-filled
    const renderBlock = (props: any) => (
        <SectorBlock
            {...props}
            key={props.id}
            onSectorSelect={onSectorSelect}
            setHoveredSector={setHoveredSector}
            availabilityMap={availabilityMap}
            selectedSector={selectedSector}
            hoveredSector={hoveredSector}
        />
    );

    // ============ MUNICH (Allianz Arena) ============
    const renderMunich = () => {
        // Helper for generating blocks
        const blocks: React.ReactNode[] = [];

        // Premium Color Palette
        const colors = {
            upper: "fill-slate-600/80",   // Deep Cool Grey
            club: "fill-slate-500/90",    // Medium Slate
            lower: "fill-slate-400",      // Light Slate
            floor: "fill-indigo-900/40",  // Deep Blue/Purple Tint for Floor
            stage: "fill-zinc-900",       // Dark Stage
            highlight: "stroke-purple-500/50" // Subtle glow
        };

        // 1. Oval Stadium Container (Outer Shell)
        // Draw the stadium tiers as continuous oval rings or segments

        // UPPER TIER (301-348) - Outer Ring
        // Top Curve
        ['301', '302', '303', '304', '305', '306', '307', '308', '309', '310', '311', '312'].forEach((id, i) =>
            blocks.push(renderBlock({ id, x: 150 + i * 25, y: 40, w: 22, h: 22, color: colors.upper, fontSize: 5 })));
        // Bottom Curve
        ['337', '338', '339', '340', '341', '342', '343', '344', '345', '346', '347', '348'].forEach((id, i) =>
            blocks.push(renderBlock({ id, x: 150 + i * 25, y: 390, w: 22, h: 22, color: colors.upper, fontSize: 5 })));
        // Left Curve (Vertical)
        ['313', '314', '315', '316', '317', '318', '319', '320', '321', '322', '323', '324'].forEach((id, i) => {
            const angle = Math.PI + (i / 11) * Math.PI; // Semicircle left
            const x = 140 + Math.sin(angle) * 100;
            const y = 215 + Math.cos(angle) * 140;
            blocks.push(renderBlock({ id, x, y, w: 22, h: 20, color: colors.upper, fontSize: 5, rotate: -(angle * 180 / Math.PI) }));
        });
        // Right Curve (Vertical)
        ['325', '326', '327', '328', '329', '330', '331', '332', '333', '334', '335', '336'].forEach((id, i) => {
            const angle = (i / 11) * Math.PI; // Semicircle right
            const x = 460 + Math.sin(angle) * 100;
            const y = 215 - Math.cos(angle) * 140;
            blocks.push(renderBlock({ id, x, y, w: 22, h: 20, color: colors.upper, fontSize: 5, rotate: -(angle * 180 / Math.PI) }));
        });

        // CLUB TIER (201-247) - Middle Ring
        ['201', '202', '203', '204', '205', '206', '207', '208', '209', '210', '211', '212'].forEach((id, i) =>
            blocks.push(renderBlock({ id, x: 170 + i * 22, y: 70, w: 20, h: 18, color: colors.club, fontSize: 5 })));
        ['237', '238', '239', '240', '241', '242', '243', '244', '245', '246', '247'].forEach((id, i) =>
            blocks.push(renderBlock({ id, x: 180 + i * 22, y: 360, w: 20, h: 18, color: colors.club, fontSize: 5 })));
        // Left Inner
        ['213', '214', '215', '216', '217', '218', '219', '220', '221', '222', '223', '224'].forEach((id, i) => {
            const angle = Math.PI + (i / 11) * Math.PI;
            const x = 160 + Math.sin(angle) * 80;
            const y = 215 + Math.cos(angle) * 110;
            blocks.push(renderBlock({ id, x, y, w: 18, h: 16, color: colors.club, fontSize: 5, rotate: -(angle * 180 / Math.PI) }));
        });
        // Right Inner
        ['225', '226', '227', '228', '229', '230', '231', '232', '233', '234', '235', '236'].forEach((id, i) => {
            const angle = (i / 11) * Math.PI;
            const x = 440 + Math.sin(angle) * 80;
            const y = 215 - Math.cos(angle) * 110;
            blocks.push(renderBlock({ id, x, y, w: 18, h: 16, color: colors.club, fontSize: 5, rotate: -(angle * 180 / Math.PI) }));
        });

        // LOWER TIER (101-136) - Inner Ring (Red/Lower) -> now Slate
        // Top
        ['101', '102', '103', '104', '105', '106', '107', '108', '109'].forEach((id, i) =>
            blocks.push(renderBlock({ id, x: 200 + i * 22, y: 95, w: 20, h: 16, color: colors.lower, fontSize: 5 })));
        // Bottom
        ['128', '129', '130', '131', '132', '133', '134', '135', '136'].forEach((id, i) =>
            blocks.push(renderBlock({ id, x: 200 + i * 22, y: 335, w: 20, h: 16, color: colors.lower, fontSize: 5 })));
        // Left
        ['110', '111', '112', '113', '114', '115', '116', '117', '118'].forEach((id, i) => {
            const angle = Math.PI + (i / 8) * Math.PI;
            const x = 180 + Math.sin(angle) * 60;
            const y = 215 + Math.cos(angle) * 90;
            blocks.push(renderBlock({ id, x, y, w: 16, h: 14, color: colors.lower, fontSize: 5, rotate: -(angle * 180 / Math.PI) }));
        });
        // Right
        ['119', '120', '121', '122', '123', '124', '125', '126', '127'].forEach((id, i) => {
            const angle = (i / 8) * Math.PI;
            const x = 420 + Math.sin(angle) * 60;
            const y = 215 - Math.cos(angle) * 90;
            blocks.push(renderBlock({ id, x, y, w: 16, h: 14, color: colors.lower, fontSize: 5, rotate: -(angle * 180 / Math.PI) }));
        });

        // 2. OVAL STANDING FLOOR (Zones A, B, C, D)
        // Organic organic shape hugging the stage

        // Zone A (Top Left)
        blocks.push(renderBlock({
            id: "Zone A", x: 220, y: 130, w: 80, h: 80,
            color: "fill-indigo-900/60 hover:fill-indigo-800",
            fontSize: 7
        }));

        // Zone B (Top Right)
        blocks.push(renderBlock({
            id: "Zone B", x: 310, y: 130, w: 80, h: 80,
            color: "fill-indigo-900/60 hover:fill-indigo-800",
            fontSize: 7
        }));

        // Zone C (Bottom Left)
        blocks.push(renderBlock({
            id: "Zone C", x: 220, y: 220, w: 80, h: 80,
            color: "fill-indigo-900/60 hover:fill-indigo-800",
            fontSize: 7
        }));

        // Zone D (Bottom Right)
        blocks.push(renderBlock({
            id: "Zone D", x: 310, y: 220, w: 80, h: 80,
            color: "fill-indigo-900/60 hover:fill-indigo-800",
            fontSize: 7
        }));

        return (
            <g>
                {/* No background image - Pure Geometry */}

                {/* Stadium Base Shape (Outer Glow) */}
                <ellipse cx="300" cy="215" rx="280" ry="215" className="fill-none stroke-slate-800 stroke-[4]" />
                <ellipse cx="300" cy="215" rx="275" ry="210" className="fill-slate-900/50" />

                {/* Seating Blocks */}
                {blocks}

                {/* 3. PREMIUM X-SHAPE STAGE */}
                {/* Main Stage Body */}
                <path
                    d="M 280 180 L 320 180 L 330 200 L 350 190 L 360 210 L 340 220 L 350 240 L 330 250 L 320 230 L 280 230 L 270 250 L 250 240 L 260 220 L 240 210 L 250 190 L 270 200 Z"
                    className="fill-black stroke-purple-500 stroke-2 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                />

                {/* Catwalks connecting to X */}
                <path d="M 300 180 L 300 120" className="stroke-purple-500 stroke-2 fill-none" />
                <path d="M 300 230 L 300 310" className="stroke-purple-500 stroke-2 fill-none" />

                {/* Center Glow */}
                <circle cx="300" cy="215" r="5" className="fill-purple-400 animate-pulse" />

                <text x="300" y="218" textAnchor="middle" className="fill-white text-[8px] font-bold pointer-events-none">STAGE</text>
            </g>
        );
    };

    // ============ MADRID (Estadio Santiago Bernabéu) ============
    const renderMadrid = () => {
        const cx = 300, cy = 230;
        const blocks: React.ReactNode[] = [];

        // Tier 400
        for (let i = 0; i < 16; i++) {
            const angle = -0.9 + (i / 16) * 1.8;
            const x = cx + 195 * Math.cos(angle - Math.PI / 2);
            const y = cy + 195 * Math.sin(angle - Math.PI / 2);
            const id = String(420 + i);
            blocks.push(renderBlock({ id, x: x - 14, y: y - 10, w: 28, h: 20, color: "fill-green-300", rotate: (angle * 180 / Math.PI), fontSize: 5 }));
        }
        // Tier 300
        for (let i = 0; i < 24; i++) {
            const angle = (i / 24) * 2 * Math.PI - Math.PI / 2;
            const x = cx + 160 * Math.cos(angle);
            const y = cy + 160 * Math.sin(angle);
            const id = String(301 + i);
            const deg = (angle * 180 / Math.PI) + 90;
            blocks.push(renderBlock({ id, x: x - 12, y: y - 16, w: 24, h: 32, color: "fill-teal-300", rotate: deg, fontSize: 5 }));
        }
        // Tier 200
        for (let i = 0; i < 20; i++) {
            const angle = (i / 20) * 2 * Math.PI - Math.PI / 2;
            const x = cx + 125 * Math.cos(angle);
            const y = cy + 125 * Math.sin(angle);
            const id = String(201 + i);
            const deg = (angle * 180 / Math.PI) + 90;
            blocks.push(renderBlock({ id, x: x - 11, y: y - 14, w: 22, h: 28, color: "fill-blue-300", rotate: deg, fontSize: 5 }));
        }
        // Tier 100
        for (let i = 0; i < 14; i++) {
            const angle = (i / 14) * 2 * Math.PI - Math.PI / 2;
            const x = cx + 95 * Math.cos(angle);
            const y = cy + 95 * Math.sin(angle);
            const id = String(101 + i);
            const deg = (angle * 180 / Math.PI) + 90;
            blocks.push(renderBlock({ id, x: x - 10, y: y - 12, w: 20, h: 24, color: "fill-green-400", rotate: deg, fontSize: 5 }));
        }
        // Bottom stands
        for (let i = 0; i < 10; i++) {
            blocks.push(renderBlock({ id: String(501 + i), x: 140 + i * 32, y: 400, w: 30, h: 24, color: "fill-blue-300", fontSize: 5 }));
        }

        return (
            <>
                <ellipse cx={cx} cy={cy} rx={210} ry={210} className="fill-none stroke-gray-600 stroke-2" />
                <rect x={cx - 70} y={cy - 50} width={140} height={100} rx={8} className="fill-blue-300/50" />
                <ellipse cx={cx} cy={cy} rx={35} ry={25} className="fill-gray-400" />
                <text x={cx} y={cy + 3} textAnchor="middle" className="fill-gray-700 text-[7px] font-bold">ESCENARIO</text>
                {blocks}
            </>
        );
    };

    // ============ BRUSSELS (King Baudouin Stadium) ============
    const renderBrussels = () => {
        const blocks: React.ReactNode[] = [];

        // Grandstand 3 (Top)
        ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].forEach((id, i) =>
            blocks.push(renderBlock({ id, x: 140 + i * 40, y: 25, w: 38, h: 24, color: "fill-blue-300" })));
        ['I', 'J', 'K', 'L', 'M', 'N'].forEach((id, i) =>
            blocks.push(renderBlock({ id, x: 180 + i * 40, y: 52, w: 38, h: 24, color: "fill-blue-300" })));

        // Grandstand 1 (Bottom)
        ['O', 'P', 'Q', 'R', 'S', 'T', 'U'].forEach((id, i) =>
            blocks.push(renderBlock({ id, x: 170 + i * 38, y: 375, w: 36, h: 22, color: "fill-blue-300" })));
        ['V', 'W', 'X', 'Y', 'Z', 'AA'].forEach((id, i) =>
            blocks.push(renderBlock({ id, x: 180 + i * 38, y: 400, w: 36, h: 22, color: "fill-green-400" })));

        // Grandstand 4 (Left)
        ['AB', 'AC', 'AD', 'AE', 'AF'].forEach((id, i) =>
            blocks.push(renderBlock({ id, x: 10, y: 60 + i * 40, w: 28, h: 36, color: "fill-green-400", fontSize: 5 })));
        ['AG', 'AH', 'AI', 'AJ', 'AK', 'AL'].forEach((id, i) =>
            blocks.push(renderBlock({ id, x: 42, y: 120 + i * 35, w: 32, h: 32, color: "fill-blue-300", fontSize: 5 })));

        // Grandstand 2 (Right)
        ['AM', 'AN', 'AO', 'AP', 'AQ'].forEach((id, i) =>
            blocks.push(renderBlock({ id, x: 562, y: 60 + i * 40, w: 28, h: 36, color: "fill-green-400", fontSize: 5 })));
        ['AR', 'AS', 'AT', 'AU', 'AV', 'AW'].forEach((id, i) =>
            blocks.push(renderBlock({ id, x: 526, y: 120 + i * 35, w: 32, h: 32, color: "fill-blue-300", fontSize: 5 })));

        // Pitch/Standing area
        blocks.push(renderBlock({ id: "Pitch", x: 200, y: 180, w: 200, h: 80, color: "fill-cyan-400/50", fontSize: 8 }));

        return (
            <>
                <rect x={5} y={20} width={590} height={415} rx={40} className="fill-none stroke-gray-600 stroke-2" />
                <rect x={80} y={100} width={440} height={250} rx={20} className="fill-blue-300/20" />
                <ellipse cx={300} cy={200} rx={45} ry={30} className="fill-gray-400" />
                <text x={300} y={203} textAnchor="middle" className="fill-gray-700 text-[9px] font-bold">STAGE</text>
                {blocks}
            </>
        );
    };


    // ============ LONDON (Tottenham Hotspur Stadium) ============
    const renderLondon = () => {
        const blocks: React.ReactNode[] = [];

        // Tottenham Palette: Navy Blue, Dark Grey, White/Lighter accents
        const colors = {
            stand: "fill-slate-800",       // Main stand structure
            lower: "fill-indigo-950/90",   // Deep Navy
            middle: "fill-slate-700",      // Dark Grey
            upper: "fill-slate-600",       // Medium Grey
            south: "fill-indigo-900",      // Feature South Stand (Navy)
            floor: "fill-blue-900/30",     // Floor Zones
            stage: "fill-zinc-900",        // Stage
            highlight: "stroke-indigo-400/30"
        };

        // 1. Stadium Geometry: Rounded Rectangle
        // Outline
        const stadiumBase = (
            <g>
                <rect x={40} y={30} width={520} height={390} rx={60} className="fill-none stroke-slate-800 stroke-[4]" />
                <rect x={45} y={35} width={510} height={380} rx={55} className="fill-slate-900/50" />
            </g>
        );

        // 2. SEATING TIERS

        // --- SOUTH STAND (The massive single tier) ---
        // Located at the Bottom (y > 300)
        // We'll treat this as a solid wall of seats (IDs 101-115, 201-215, 501-510 mixed)
        // Visual: Dense grid without tier separation

        // Dense array for South Stand effect
        const southIds = Array.from({ length: 40 }, (_, i) => `S${i + 1}`); // mapped to real data conceptually
        // We'll map real IDs to these positions. using data.ts range 101-144, etc.
        // Let's use 126-144 for South Stand (Lower) + some others

        // Actually, let's stick to the grid layout based on existing IDs for functional selection
        // Bottom Area (South Stand) - Large Block
        ['130', '131', '132', '133', '134', '135', '136', '137', '138', '139', '140', '141', '142'].forEach((id, i) => {
            // Deep block suitable for "Wall of Sound"
            blocks.push(renderBlock({ id, x: 150 + i * 24, y: 350, w: 22, h: 40, color: colors.south, fontSize: 5 }));
        });
        // Additional South Stand rows (simulating height)
        ['240', '241', '242', '243', '244', '245', '246', '247', '248', '249', '250', '251', '252'].forEach((id, i) => {
            blocks.push(renderBlock({ id, x: 150 + i * 24, y: 315, w: 22, h: 30, color: colors.south, fontSize: 5 }));
        });


        // --- NORTH STAND (Multi-tier) ---
        // Top Area
        // Upper
        ['501', '502', '503', '504', '505', '506', '507', '508', '509', '510'].forEach((id, i) =>
            blocks.push(renderBlock({ id, x: 180 + i * 24, y: 50, w: 22, h: 20, color: colors.upper, fontSize: 5 })));
        // Middle
        ['201', '202', '203', '204', '205', '206', '207', '208', '209', '210'].forEach((id, i) =>
            blocks.push(renderBlock({ id, x: 180 + i * 24, y: 75, w: 22, h: 18, color: colors.middle, fontSize: 5 })));
        // Lower
        ['101', '102', '103', '104', '105', '106', '107', '108', '109', '110'].forEach((id, i) =>
            blocks.push(renderBlock({ id, x: 180 + i * 24, y: 98, w: 22, h: 22, color: colors.lower, fontSize: 5 })));


        // --- WEST STAND (Left) ---
        // Vertical Layout
        // Upper
        ['511', '512', '513', '514', '515', '516', '517', '518'].forEach((id, i) =>
            blocks.push(renderBlock({ id, x: 60, y: 120 + i * 26, w: 24, h: 22, color: colors.upper, fontSize: 5 })));
        // Club/Middle
        ['211', '212', '213', '214', '215', '216', '217', '218', '219'].forEach((id, i) =>
            blocks.push(renderBlock({ id, x: 90, y: 110 + i * 26, w: 20, h: 22, color: colors.middle, fontSize: 5 })));
        // Lower
        ['111', '112', '113', '114', '115', '116', '117', '118'].forEach((id, i) =>
            blocks.push(renderBlock({ id, x: 115, y: 120 + i * 26, w: 22, h: 22, color: colors.lower, fontSize: 5 })));


        // --- EAST STAND (Right) ---
        // Upper
        ['519', '520', '521', '522', '523', '524', '525', '526'].forEach((id, i) =>
            blocks.push(renderBlock({ id, x: 515, y: 120 + i * 26, w: 24, h: 22, color: colors.upper, fontSize: 5 })));
        // Club/Middle
        ['220', '221', '222', '223', '224', '225', '226', '227', '228'].forEach((id, i) =>
            blocks.push(renderBlock({ id, x: 490, y: 110 + i * 26, w: 20, h: 22, color: colors.middle, fontSize: 5 })));
        // Lower
        ['119', '120', '121', '122', '123', '124', '125', '126'].forEach((id, i) =>
            blocks.push(renderBlock({ id, x: 463, y: 120 + i * 26, w: 22, h: 22, color: colors.lower, fontSize: 5 })));


        // 3. FLOOR ZONES (Quadrants)
        // North Pitch (Top)
        blocks.push(renderBlock({
            id: "North Pitch", x: 220, y: 140, w: 160, h: 50,
            color: "fill-blue-900/40 hover:fill-blue-800", fontSize: 6
        }));
        // South Pitch (Bottom)
        blocks.push(renderBlock({
            id: "South Pitch", x: 220, y: 240, w: 160, h: 50,
            color: "fill-blue-900/40 hover:fill-blue-800", fontSize: 6
        }));
        // West Pitch (Left)
        blocks.push(renderBlock({
            id: "West Pitch", x: 160, y: 140, w: 50, h: 150,
            color: "fill-blue-900/40 hover:fill-blue-800", fontSize: 6
        }));
        // East Pitch (Right)
        blocks.push(renderBlock({
            id: "East Pitch", x: 390, y: 140, w: 50, h: 150,
            color: "fill-blue-900/40 hover:fill-blue-800", fontSize: 6
        }));


        return (
            <g>
                {stadiumBase}

                {/* Stage - X Shape (Reused) */}
                <g transform="translate(0, 0)">
                    <path
                        d="M 280 195 L 320 195 L 330 215 L 350 205 L 360 225 L 340 235 L 350 255 L 330 265 L 320 245 L 280 245 L 270 265 L 250 255 L 260 235 L 240 225 L 250 205 L 270 215 Z"
                        className="fill-zinc-950 stroke-indigo-500 stroke-2 drop-shadow-[0_0_15px_rgba(99,102,241,0.4)]"
                    />
                    {/* Center Glow */}
                    <circle cx="300" cy="230" r="6" className="fill-indigo-400 animate-pulse" />
                    <text x="300" y="233" textAnchor="middle" className="fill-white text-[8px] font-bold pointer-events-none">STAGE</text>
                </g>

                {blocks}
            </g>
        );
    };

    return (
        <ZoomableSVG className="w-full h-full bg-zinc-900/50 rounded-xl">
            <svg viewBox="0 0 600 450" width="600" height="450" xmlns="http://www.w3.org/2000/svg">
                {eventId === "germany" && renderMunich()}
                {eventId === "spain" && renderMadrid()}
                {eventId === "belgium" && renderBrussels()}
                {eventId === "uk" && renderLondon()}
                {!["germany", "spain", "belgium", "uk"].includes(eventId) && renderMunich()}
            </svg>
        </ZoomableSVG>
    );
}
