"use client";

import { useState, useMemo } from "react";
import { StadiumWidget } from "@/components/StadiumWidget";
import { TicketList } from "@/components/TicketList";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { ChevronDown, Star, Euro } from "lucide-react";

import { EventData, TicketOffer } from "@/lib/data";
import { cn } from "@/lib/utils";

interface EventBookingProps {
    event: EventData;
}

type SortOption = "price_asc" | "price_desc" | "views";
type CategoryOption = "all" | "vip" | "standing" | "seated" | "aisle";

export function EventBooking({ event }: EventBookingProps) {
    const [selectedSector, setSelectedSector] = useState<string | null>(null);
    const [qty, setQty] = useState<number>(1);
    const [sort, setSort] = useState<SortOption>("price_asc");
    const [category, setCategory] = useState<CategoryOption>("all");
    const [minPrice, setMinPrice] = useState<string>("");
    const [maxPrice, setMaxPrice] = useState<string>("");

    const { t } = useLanguage();

    // Availability Map
    const availabilityMap = useMemo(() => {
        const map: Record<string, boolean> = {};
        event.offers.forEach(offer => {
            if (offer.available > 0) {
                map[offer.block] = true;
            } else if (map[offer.block] === undefined) {
                map[offer.block] = false;
            }
        });
        return map;
    }, [event.offers]);

    const handleSectorSelect = (sector: string) => {
        if (availabilityMap[sector] === false) return;
        setSelectedSector((prev) => (prev === sector ? null : sector));
    };

    // Filter Logic
    const filteredOffers = useMemo(() => {
        let result = [...event.offers];

        // 1. Sector Filter (from Map click)
        if (selectedSector) {
            result = result.filter(o => o.block === selectedSector);
        }

        // 2. Quantity Filter
        result = result.filter(o => o.available >= qty);

        // 3. Category Filter
        if (category !== "all") {
            if (category === "vip") {
                // Heuristic for VIP: Club, Premium, price > 250
                result = result.filter(o =>
                    o.type === "Club" || o.type === "Premium" || o.price >= 250
                );
            } else if (category === "standing") {
                result = result.filter(o => o.type === "Interior" || o.type.includes("Zone"));
            } else if (category === "seated") {
                result = result.filter(o => !["Interior", "Zone"].includes(o.type));
            } else if (category === "aisle") {
                // Mock logic for aisle
                result = result.filter((_, i) => i % 5 === 0);
            }
        }

        // 4. Price Range Filter
        const min = parseFloat(minPrice) || 0;
        const max = parseFloat(maxPrice) || Infinity;
        if (min > 0 || max < Infinity) {
            result = result.filter(o => o.price >= min && o.price <= max);
        }

        // 5. Sort
        result.sort((a, b) => {
            if (sort === "price_asc") return a.price - b.price;
            if (sort === "price_desc") return b.price - a.price;
            if (sort === "views") {
                const score = (type: string) => {
                    if (["Club", "Premium"].includes(type)) return 4;
                    if (["Lower", "Grandstand"].includes(type)) return 3;
                    if (type === "Interior") return 2;
                    return 1;
                };
                return score(b.type) - score(a.type);
            }
            return 0;
        });

        return result;
    }, [event.offers, selectedSector, qty, category, sort, minPrice, maxPrice]);


    return (
        <div className="flex flex-col lg:flex-row min-h-[calc(100vh-64px)] bg-secondary text-white overflow-hidden">
            {/* Left: Interactive Map */}
            <div className="w-full h-[35vh] sm:h-[40vh] lg:h-auto lg:flex-1 bg-zinc-900/50 relative border-b lg:border-b-0 lg:border-r border-white/10 shrink-0">
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 pointer-events-none">
                    <h1 className="text-xl sm:text-2xl font-bold">{event.city}</h1>
                    <p className="text-xs sm:text-sm text-gray-400">{event.stadium}</p>
                </div>

                <div className="w-full h-full">
                    <StadiumWidget
                        onSectorSelect={handleSectorSelect}
                        selectedSector={selectedSector}
                        eventId={event.id}
                        availabilityMap={availabilityMap}
                    />
                </div>

                {/* Legend */}
                <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 z-10 flex gap-3 sm:gap-4 bg-black/40 p-1.5 sm:p-2 rounded-lg backdrop-blur-sm pointer-events-none">
                    <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-gray-300">
                        <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-purple-500 rounded-sm"></span>
                        Available
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-gray-300">
                        <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-gray-600 rounded-sm"></span>
                        Sold Out
                    </div>
                </div>
            </div>

            {/* Right: Ticket Sidebar */}
            <div className="w-full lg:w-[420px] xl:w-[450px] flex flex-col flex-1 lg:flex-none lg:h-[calc(100vh-64px)] bg-secondary shadow-2xl z-20 overflow-hidden">
                <div className="border-b border-white/10 bg-white/5 backdrop-blur-md shrink-0">
                    {/* Header */}
                    <div className="p-3 sm:p-4 pb-2 flex justify-between items-center">
                        <h2 className="font-bold flex items-center text-sm">
                            <span className="w-2 h-2 rounded-full bg-primary mr-2 animate-pulse" />
                            {t.tickets.title} ({filteredOffers.length})
                        </h2>
                        <Link href="/checkout">
                            <Button size="sm" variant="default" className="text-xs h-7">
                                {t.nav.cart}
                            </Button>
                        </Link>
                    </div>

                    {/* Advanced Filter Block */}
                    <div className="flex flex-col gap-2 sm:gap-3 p-3 sm:p-4 pt-0">
                        {/* Level 1: Controls */}
                        <div className="flex justify-between items-center">
                            {/* Quantity */}
                            <div className="flex items-center">
                                <span className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider mr-1.5 sm:mr-2 font-semibold">Qty</span>
                                <div className="relative group">
                                    <select
                                        className="appearance-none bg-transparent text-white text-xs sm:text-sm font-medium focus:outline-none cursor-pointer pr-5 sm:pr-6 py-1"
                                        value={qty}
                                        onChange={(e) => setQty(Number(e.target.value))}
                                    >
                                        <option value="1" className="bg-zinc-800">1 Ticket</option>
                                        <option value="2" className="bg-zinc-800">2 Tickets</option>
                                        <option value="3" className="bg-zinc-800">3 Tickets</option>
                                        <option value="4" className="bg-zinc-800">4 Tickets</option>
                                        <option value="5" className="bg-zinc-800">5+ Tickets</option>
                                    </select>
                                    <ChevronDown className="w-3 h-3 absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-white" />
                                </div>
                            </div>

                            {/* Sort */}
                            <div className="flex items-center">
                                <span className="text-gray-500 text-xs sm:text-sm mr-1.5 sm:mr-2">Sort:</span>
                                <div className="relative group">
                                    <select
                                        className="appearance-none bg-transparent text-white text-xs sm:text-sm font-medium focus:outline-none cursor-pointer pr-4 py-1 text-right w-[90px] sm:w-[110px]"
                                        value={sort}
                                        onChange={(e) => setSort(e.target.value as SortOption)}
                                    >
                                        <option value="price_asc" className="bg-zinc-800">Lowest Price</option>
                                        <option value="price_desc" className="bg-zinc-800">Highest Price</option>
                                        <option value="views" className="bg-zinc-800">Best Views</option>
                                    </select>
                                    <ChevronDown className="w-3 h-3 absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-white" />
                                </div>
                            </div>
                        </div>

                        {/* Level 2: Pills - wrap instead of scroll */}
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                            <CategoryPill id="all" label="All" selected={category === "all"} onClick={() => setCategory("all")} />
                            <CategoryPill id="vip" label="VIP" selected={category === "vip"} onClick={() => setCategory("vip")} icon={<Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />} />
                            <CategoryPill id="standing" label="Standing" selected={category === "standing"} onClick={() => setCategory("standing")} />
                            <CategoryPill id="seated" label="Seated" selected={category === "seated"} onClick={() => setCategory("seated")} />
                            <CategoryPill id="aisle" label="Aisle" selected={category === "aisle"} onClick={() => setCategory("aisle")} />
                        </div>

                        {/* Level 3: Price Range Filter */}
                        <div className="flex items-center gap-2 pt-1 border-t border-white/5">
                            <Euro className="w-4 h-4 text-gray-500" />
                            <input
                                type="number"
                                placeholder="Min"
                                value={minPrice}
                                onChange={(e) => setMinPrice(e.target.value)}
                                className="w-20 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50"
                            />
                            <span className="text-gray-500 text-xs">—</span>
                            <input
                                type="number"
                                placeholder="Max"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)}
                                className="w-20 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50"
                            />
                            {(minPrice || maxPrice) && (
                                <button
                                    onClick={() => { setMinPrice(""); setMaxPrice(""); }}
                                    className="text-xs text-gray-400 hover:text-white ml-auto"
                                >
                                    Clear
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-hidden relative">
                    <TicketList
                        offers={filteredOffers}
                        selectedSector={selectedSector}
                        eventId={event.id}
                        eventName={`BTS Live in ${event.city}`}
                        eventDate={event.date}
                    />
                </div>
            </div>
        </div>
    );
}

interface CategoryPillProps {
    id: CategoryOption;
    label: string;
    icon?: React.ReactNode;
    selected: boolean;
    onClick: () => void;
}

function CategoryPill({ id, label, icon, selected, onClick }: CategoryPillProps) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1",
                selected
                    ? "bg-white text-black"
                    : "bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/30"
            )}
        >
            {icon}
            {label}
        </button>
    );
}

// 1. Sector Filter (from Map click)
if (selectedSector) {
    result = result.filter(o => o.block === selectedSector);
}

// 2. Quantity Filter
result = result.filter(o => o.available >= qty);

// 3. Category Filter
if (category !== "all") {
    if (category === "vip") {
        // Heuristic for VIP: Club, Premium, price > 250
        result = result.filter(o =>
            o.type === "Club" || o.type === "Premium" || o.price >= 250
        );
    } else if (category === "standing") {
        result = result.filter(o => o.type === "Interior" || o.type.includes("Zone"));
    } else if (category === "seated") {
        result = result.filter(o => !["Interior", "Zone"].includes(o.type));
    } else if (category === "aisle") {
        // Mock logic for aisle
        result = result.filter((_, i) => i % 5 === 0);
    }
}

// 4. Price Range Filter
const min = parseFloat(minPrice) || 0;
const max = parseFloat(maxPrice) || Infinity;
if (min > 0 || max < Infinity) {
    result = result.filter(o => o.price >= min && o.price <= max);
}

// 5. Sort
result.sort((a, b) => {
    if (sort === "price_asc") return a.price - b.price;
    if (sort === "price_desc") return b.price - a.price;
    if (sort === "views") {
        const score = (type: string) => {
            if (["Club", "Premium"].includes(type)) return 4;
            if (["Lower", "Grandstand"].includes(type)) return 3;
            if (type === "Interior") return 2;
            return 1;
        };
        return score(b.type) - score(a.type);
    }
    return 0;
});

return result;
    }, [event.offers, selectedSector, qty, category, sort, minPrice, maxPrice]);


return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-64px)] bg-secondary text-white overflow-hidden">
        {/* Left: Interactive Map */}
        <div className="w-full h-[35vh] sm:h-[40vh] lg:h-auto lg:flex-1 bg-zinc-900/50 relative border-b lg:border-b-0 lg:border-r border-white/10 shrink-0">
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 pointer-events-none">
                <h1 className="text-xl sm:text-2xl font-bold">{event.city}</h1>
                <p className="text-xs sm:text-sm text-gray-400">{event.stadium}</p>
            </div>

            <div className="w-full h-full">
                <StadiumWidget
                    onSectorSelect={handleSectorSelect}
                    selectedSector={selectedSector}
                    eventId={event.id}
                    availabilityMap={availabilityMap}
                />
            </div>

            {/* Legend */}
            <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 z-10 flex gap-3 sm:gap-4 bg-black/40 p-1.5 sm:p-2 rounded-lg backdrop-blur-sm pointer-events-none">
                <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-gray-300">
                    <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-purple-500 rounded-sm"></span>
                    Available
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-gray-300">
                    <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-gray-600 rounded-sm"></span>
                    Sold Out
                </div>
            </div>
        </div>

        {/* Right: Ticket Sidebar */}
        <div className="w-full lg:w-[420px] xl:w-[450px] flex flex-col flex-1 lg:flex-none lg:h-[calc(100vh-64px)] bg-secondary shadow-2xl z-20 overflow-hidden">
            <div className="border-b border-white/10 bg-white/5 backdrop-blur-md shrink-0">
                {/* Header */}
                <div className="p-3 sm:p-4 pb-2 flex justify-between items-center">
                    <h2 className="font-bold flex items-center text-sm">
                        <span className="w-2 h-2 rounded-full bg-primary mr-2 animate-pulse" />
                        {t.tickets.title} ({filteredOffers.length})
                    </h2>
                    <Link href="/checkout">
                        <Button size="sm" variant="default" className="text-xs h-7">
                            {t.nav.cart}
                        </Button>
                    </Link>
                </div>

                {/* Advanced Filter Block */}
                <div className="flex flex-col gap-2 sm:gap-3 p-3 sm:p-4 pt-0">
                    {/* Level 1: Controls */}
                    <div className="flex justify-between items-center">
                        {/* Quantity */}
                        <div className="flex items-center">
                            <span className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider mr-1.5 sm:mr-2 font-semibold">Qty</span>
                            <div className="relative group">
                                <select
                                    className="appearance-none bg-transparent text-white text-xs sm:text-sm font-medium focus:outline-none cursor-pointer pr-5 sm:pr-6 py-1"
                                    value={qty}
                                    onChange={(e) => setQty(Number(e.target.value))}
                                >
                                    <option value="1" className="bg-zinc-800">1 Ticket</option>
                                    <option value="2" className="bg-zinc-800">2 Tickets</option>
                                    <option value="3" className="bg-zinc-800">3 Tickets</option>
                                    <option value="4" className="bg-zinc-800">4 Tickets</option>
                                    <option value="5" className="bg-zinc-800">5+ Tickets</option>
                                </select>
                                <ChevronDown className="w-3 h-3 absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-white" />
                            </div>
                        </div>

                        {/* Sort */}
                        <div className="flex items-center">
                            <span className="text-gray-500 text-xs sm:text-sm mr-1.5 sm:mr-2">Sort:</span>
                            <div className="relative group">
                                <select
                                    className="appearance-none bg-transparent text-white text-xs sm:text-sm font-medium focus:outline-none cursor-pointer pr-4 py-1 text-right w-[90px] sm:w-[110px]"
                                    value={sort}
                                    onChange={(e) => setSort(e.target.value as SortOption)}
                                >
                                    <option value="price_asc" className="bg-zinc-800">Lowest Price</option>
                                    <option value="price_desc" className="bg-zinc-800">Highest Price</option>
                                    <option value="views" className="bg-zinc-800">Best Views</option>
                                </select>
                                <ChevronDown className="w-3 h-3 absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-white" />
                            </div>
                        </div>
                    </div>

                    {/* Level 2: Pills - wrap instead of scroll */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        <CategoryPill id="all" label="All" selected={category === "all"} onClick={() => setCategory("all")} />
                        <CategoryPill id="vip" label="VIP" selected={category === "vip"} onClick={() => setCategory("vip")} icon={<Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />} />
                        <CategoryPill id="standing" label="Standing" selected={category === "standing"} onClick={() => setCategory("standing")} />
                        <CategoryPill id="seated" label="Seated" selected={category === "seated"} onClick={() => setCategory("seated")} />
                        <CategoryPill id="aisle" label="Aisle" selected={category === "aisle"} onClick={() => setCategory("aisle")} />
                    </div>

                    {/* Level 3: Price Range Filter */}
                    <div className="flex items-center gap-2 pt-1 border-t border-white/5">
                        <Euro className="w-4 h-4 text-gray-500" />
                        <input
                            type="number"
                            placeholder="Min"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                            className="w-20 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50"
                        />
                        <span className="text-gray-500 text-xs">—</span>
                        <input
                            type="number"
                            placeholder="Max"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            className="w-20 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50"
                        />
                        {(minPrice || maxPrice) && (
                            <button
                                onClick={() => { setMinPrice(""); setMaxPrice(""); }}
                                className="text-xs text-gray-400 hover:text-white ml-auto"
                            >
                                Clear
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-hidden relative">
                <TicketList
                    offers={filteredOffers}
                    selectedSector={selectedSector}
                    eventId={event.id}
                    eventName={`BTS Live in ${event.city}`}
                    eventDate={event.date}
                />
            </div>
        </div>
    </div>
);
}

interface CategoryPillProps {
    id: CategoryOption;
    label: string;
    icon?: React.ReactNode;
    selected: boolean;
    onClick: () => void;
}

function CategoryPill({ id, label, icon, selected, onClick }: CategoryPillProps) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1",
                selected
                    ? "bg-white text-black"
                    : "bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/30"
            )}
        >
            {icon}
            {label}
        </button>
    );
}