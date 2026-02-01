"use client";

import { useCartStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Plus, Minus, ShoppingCart, Ticket, Sparkles } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { TicketOffer } from "@/lib/data";
import { useLanguage } from "@/lib/language-context";
import { trackAddToCart } from "@/lib/pixel-tracking";

interface TicketListProps {
    offers: TicketOffer[];
    selectedSector: string | null;
    eventId: string;
    eventName: string;
    eventDate: string;
}

export function TicketList({
    offers,
    selectedSector,
    eventId,
    eventName,
    eventDate,
}: TicketListProps) {
    const { addItem, items: cartItems } = useCartStore();
    const { t } = useLanguage();
    const [quantities, setQuantities] = useState<Record<string, number>>({});

    const filteredOffers = selectedSector
        ? offers.filter((o) => o.block === selectedSector)
        : offers;

    // Helper to get quantity already in cart
    const getCartQuantity = (id: string) => {
        return cartItems.find(i => i.categoryId === id)?.quantity || 0;
    };

    const handleQuantityChange = (id: string, delta: number) => {
        const item = offers.find(o => o.id === id);
        if (!item) return;

        const currentQty = quantities[id] || 0;
        const cartQty = getCartQuantity(id);

        // Calculate remaining slots available
        const remaining = Math.max(0, item.available - cartQty);

        // Allowed new quantity is limited by remaining
        const newQty = Math.max(0, Math.min(remaining, currentQty + delta));

        setQuantities((prev) => ({
            ...prev,
            [id]: newQty,
        }));
    };

    const handleAddToCart = (offer: TicketOffer) => {
        const qty = quantities[offer.id] || 0;
        const cartQty = getCartQuantity(offer.id);

        if (qty > 0 && (qty + cartQty <= offer.available)) {
            addItem({
                sectorId: offer.block,
                categoryId: offer.id,
                name: `${offer.sectorName} | ${offer.row}`,
                price: offer.price,
                quantity: qty,
                eventName,
                date: eventDate,
            });

            // Track Pixel Event
            trackAddToCart({
                contentId: offer.id,
                contentName: `${eventName} - ${offer.sectorName} (${offer.row})`,
                value: offer.price * qty
            });

            setQuantities((prev) => ({ ...prev, [offer.id]: 0 }));
        }
    };

    // Color based on type
    const getTypeColor = (type: string) => {
        switch (type) {
            case "Upper": case "PK1": return "from-orange-500 to-orange-600";
            case "Club": case "PK2": return "from-emerald-500 to-emerald-600";
            case "Lower": case "PK3": return "from-red-500 to-red-600";
            case "Interior": return "from-cyan-500 to-cyan-600";
            default: return "from-purple-500 to-purple-600";
        }
    };

    return (
        <div className="space-y-3 sm:space-y-4 h-full overflow-y-auto pr-2 custom-scrollbar p-3 sm:p-4">
            <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-white flex items-center">
                <Ticket className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-purple-400" />
                Available Tickets
                <span className="ml-auto text-xs sm:text-sm font-normal text-gray-400">{filteredOffers.length} offers</span>
            </h2>

            {selectedSector && (
                <div className="bg-purple-500/20 backdrop-blur-sm p-2.5 sm:p-3 rounded-lg mb-3 sm:mb-4 text-xs sm:text-sm text-purple-200 border border-purple-500/30">
                    <Sparkles className="inline w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1" />
                    Showing tickets for Block <span className="text-purple-300 font-bold">{selectedSector}</span>
                </div>
            )}

            {filteredOffers.length === 0 ? (
                <div className="text-gray-400 text-center py-8 sm:py-12 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 border-dashed">
                    <Ticket className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 opacity-30" />
                    <p className="text-sm sm:text-base">Select a block on the stadium map</p>
                    <p className="text-xs sm:text-sm opacity-60">to view available seats</p>
                </div>
            ) : (
                <div className="space-y-2 sm:space-y-3">
                    {filteredOffers.map((offer) => {
                        const cartQty = getCartQuantity(offer.id);
                        const isFullyInCart = cartQty >= offer.available;

                        return (
                            <div
                                key={offer.id}
                                className={cn(
                                    "group relative rounded-lg sm:rounded-xl overflow-hidden",
                                    "bg-white/5 backdrop-blur-md",
                                    "border border-white/10",
                                    "hover:bg-white/10 hover:border-purple-500/50",
                                    "hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]",
                                    "transition-all duration-300",
                                    "active:scale-[0.99]"
                                )}
                            >
                                {/* Gradient accent bar */}
                                <div className={cn(
                                    "absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b",
                                    getTypeColor(offer.type)
                                )} />

                                <div className="p-3 sm:p-4 pl-4 sm:pl-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-3">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-bold text-sm sm:text-base text-white group-hover:text-purple-300 transition-colors truncate">
                                                {offer.sectorName}
                                            </h3>
                                            {/* In Cart Badge */}
                                            {cartQty > 0 && (
                                                <span className="bg-purple-500 text-white text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded shadow-sm ml-2 shrink-0">
                                                    In Cart: {cartQty}
                                                </span>
                                            )}
                                        </div>
                                        <div className="text-xs sm:text-sm text-gray-400 flex flex-col mt-0.5 sm:mt-1 gap-0.5 sm:gap-1">
                                            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                                                <span className="font-medium text-gray-300">{offer.row}</span>
                                                <span className="text-gray-600">•</span>
                                                <span className={cn(
                                                    "text-xs px-2 py-0.5 rounded-full",
                                                    offer.available <= 2
                                                        ? "bg-red-500/20 text-red-300"
                                                        : "bg-green-500/20 text-green-300"
                                                )}>
                                                    {offer.available} {t.tickets.left}
                                                </span>
                                            </div>
                                            {offer.available > 1 && (
                                                <div className="flex items-center text-xs text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded-full w-fit">
                                                    <Sparkles className="w-3 h-3 mr-1" />
                                                    {t.tickets.seatsTogether}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex flex-row sm:flex-col items-center sm:items-end gap-2 w-full sm:w-auto justify-between sm:justify-start">
                                        {/* Glowing price */}
                                        <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                            €{offer.price}
                                        </div>

                                        <div className="flex items-center space-x-1.5 sm:space-x-2">
                                            {quantities[offer.id] ? (
                                                <>
                                                    <div className="flex items-center bg-white/10 rounded-lg p-0.5 border border-white/20">
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="h-7 w-7 sm:h-8 sm:w-8 text-white hover:bg-white/20"
                                                            onClick={() => handleQuantityChange(offer.id, -1)}
                                                        >
                                                            <Minus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                                        </Button>
                                                        <span className="w-5 sm:w-6 text-center text-xs sm:text-sm font-bold text-white">
                                                            {quantities[offer.id]}
                                                        </span>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="h-7 w-7 sm:h-8 sm:w-8 text-white hover:bg-white/20"
                                                            onClick={() => handleQuantityChange(offer.id, 1)}
                                                            disabled={quantities[offer.id] + cartQty >= offer.available}
                                                        >
                                                            <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                                        </Button>
                                                    </div>
                                                    <Button
                                                        onClick={() => handleAddToCart(offer)}
                                                        size="sm"
                                                        className="h-7 sm:h-8 px-2 sm:px-3 text-xs sm:text-sm bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg shadow-purple-500/25"
                                                    >
                                                        <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1" />
                                                        Add
                                                    </Button>
                                                </>
                                            ) : (
                                                <Button
                                                    size="sm"
                                                    disabled={isFullyInCart}
                                                    className={cn(
                                                        "h-7 sm:h-8 px-3 sm:px-4 text-xs sm:text-sm shadow-md transition-all",
                                                        isFullyInCart
                                                            ? "bg-white/10 text-gray-400 cursor-not-allowed border border-white/5"
                                                            : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-purple-500/25"
                                                    )}
                                                    onClick={() => handleQuantityChange(offer.id, 1)}
                                                >
                                                    {isFullyInCart ? "Max Added" : "Select"}
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
