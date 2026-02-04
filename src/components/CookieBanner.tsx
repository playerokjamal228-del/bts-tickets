"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";
import { X } from "lucide-react";

export function CookieBanner() {
    const { t } = useLanguage();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check local storage on mount
        const consent = localStorage.getItem("cookieConsent");
        if (consent === null) {
            // Show banner if no choice has been made
            // Small delay for animation effect
            const timer = setTimeout(() => setIsVisible(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem("cookieConsent", "true");
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem("cookieConsent", "false");
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-in slide-in-from-bottom duration-500">
            <div className="max-w-7xl mx-auto bg-[#0a0a0a]/90 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">

                <div className="flex-1">
                    <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                        {t.cookie.text}
                    </p>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <Button
                        onClick={handleDecline}
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-white hover:bg-white/5 whitespace-nowrap"
                    >
                        {t.cookie.decline}
                    </Button>
                    <Button
                        onClick={handleAccept}
                        className="bg-white text-black hover:bg-gray-200 whitespace-nowrap min-w-[100px]"
                    >
                        {t.cookie.accept}
                    </Button>
                </div>

            </div>
        </div>
    );
}
