"use client";

import Link from "next/link";
import { LanguageSelector } from "./LanguageSelector";
import { Button } from "./ui/button";
import { useLanguage } from "@/lib/language-context";
import { usePathname } from "next/navigation";
import { ShoppingCart, HelpCircle, Menu, X } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { getAllEvents } from "@/lib/data";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function Header() {
    const { t } = useLanguage();
    const pathname = usePathname();
    const cartItems = useCartStore((state) => state.items);
    const events = getAllEvents();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Close mobile menu on route change
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [pathname]);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [mobileMenuOpen]);

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-xl border-b border-white/10 h-16 transition-all">
                <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center text-white font-bold text-sm tracking-tighter group-hover:shadow-[0_0_15px_rgba(168,85,247,0.5)] transition-shadow">
                            BTS
                        </div>
                        <span className="font-bold text-lg bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent hidden xs:inline">
                            TOUR 2026
                        </span>
                    </Link>

                    {/* Desktop City Nav Links */}
                    <nav className="hidden lg:flex items-center gap-1">
                        {events.map((event) => {
                            const isActive = pathname === `/event/${event.id}`;
                            return (
                                <Link
                                    key={event.id}
                                    href={`/event/${event.id}`}
                                    className={`text-sm font-medium px-4 py-2 rounded-full transition-all duration-300 ${isActive
                                        ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                                        : "text-gray-400 hover:text-white hover:bg-white/5"
                                        }`}
                                >
                                    {event.city.toUpperCase()}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-2 sm:gap-3">
                        <Link href="/faq" className="hidden md:block">
                            <Button
                                variant="ghost"
                                size="sm"
                                className={`flex items-center gap-1 text-gray-400 hover:text-white hover:bg-white/5 ${pathname === '/faq' ? 'text-white bg-white/10' : ''}`}
                            >
                                <HelpCircle className="w-4 h-4" />
                                <span className="hidden sm:inline">FAQ</span>
                            </Button>
                        </Link>

                        <Link href="/checkout">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="relative text-gray-400 hover:text-white hover:bg-white/5"
                            >
                                <ShoppingCart className="w-5 h-5" />
                                {cartItems.length > 0 && (
                                    <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-purple-500 rounded-full animate-pulse" />
                                )}
                            </Button>
                        </Link>

                        <div className="h-6 w-px bg-white/10 mx-1 hidden sm:block" />

                        <LanguageSelector />

                        {/* Mobile Menu Button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="lg:hidden text-gray-400 hover:text-white"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <Menu className="w-6 h-6" />
                        </Button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <div
                className={cn(
                    "fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm transition-opacity lg:hidden",
                    mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={() => setMobileMenuOpen(false)}
            />

            {/* Mobile Menu Drawer */}
            <div
                className={cn(
                    "fixed top-0 right-0 bottom-0 z-[70] w-[280px] max-w-[85vw] bg-secondary border-l border-white/10 transition-transform duration-300 lg:hidden",
                    mobileMenuOpen ? "translate-x-0" : "translate-x-full"
                )}
            >
                <div className="flex flex-col h-full">
                    {/* Menu Header */}
                    <div className="flex items-center justify-between p-4 border-b border-white/10">
                        <span className="font-bold text-lg">Menu</span>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <X className="w-6 h-6" />
                        </Button>
                    </div>

                    {/* Menu Links */}
                    <nav className="flex-1 overflow-y-auto p-4 space-y-2">
                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">Cities</p>
                        {events.map((event) => {
                            const isActive = pathname === `/event/${event.id}`;
                            return (
                                <Link
                                    key={event.id}
                                    href={`/event/${event.id}`}
                                    className={cn(
                                        "block px-4 py-3 rounded-lg transition-all font-medium",
                                        isActive
                                            ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                                            : "text-gray-300 hover:bg-white/5"
                                    )}
                                >
                                    {event.city}
                                </Link>
                            );
                        })}

                        <div className="border-t border-white/10 my-4" />

                        <Link
                            href="/faq"
                            className={cn(
                                "flex items-center gap-2 px-4 py-3 rounded-lg transition-all font-medium",
                                pathname === '/faq'
                                    ? "bg-purple-500/20 text-purple-400"
                                    : "text-gray-300 hover:bg-white/5"
                            )}
                        >
                            <HelpCircle className="w-5 h-5" />
                            FAQ
                        </Link>

                        <Link
                            href="/checkout"
                            className={cn(
                                "flex items-center gap-2 px-4 py-3 rounded-lg transition-all font-medium",
                                pathname === '/checkout'
                                    ? "bg-purple-500/20 text-purple-400"
                                    : "text-gray-300 hover:bg-white/5"
                            )}
                        >
                            <ShoppingCart className="w-5 h-5" />
                            Cart
                            {cartItems.length > 0 && (
                                <span className="ml-auto bg-purple-500 text-white text-xs px-2 py-0.5 rounded-full">
                                    {cartItems.length}
                                </span>
                            )}
                        </Link>
                    </nav>

                    {/* Menu Footer */}
                    <div className="p-4 border-t border-white/10 safe-area-bottom">
                        <p className="text-xs text-gray-500 text-center">BTS TOUR 2026 © All Rights Reserved</p>
                    </div>
                </div>
            </div>
        </>
    );
}

