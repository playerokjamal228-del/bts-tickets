"use client";

import { useLanguage } from "@/lib/language-context";
import { Language } from "@/lib/translations";
import { Globe } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const LANGUAGES: { code: Language; name: string; flag: string }[] = [
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
];

export function LanguageSelector() {
    const { language, setLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    const currentLang = LANGUAGES.find(l => l.code === language) || LANGUAGES[0];

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-sm"
            >
                <Globe className="w-4 h-4 text-purple-400" />
                <span className="hidden sm:inline">{currentLang.flag} {currentLang.name}</span>
                <span className="sm:hidden">{currentLang.flag}</span>
            </button>

            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Dropdown */}
                    <div className="absolute right-0 top-full mt-2 z-50 bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-xl min-w-[160px]">
                        {LANGUAGES.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => {
                                    setLanguage(lang.code);
                                    setIsOpen(false);
                                }}
                                className={cn(
                                    "w-full flex items-center gap-3 px-4 py-3 text-left text-sm transition-colors",
                                    language === lang.code
                                        ? "bg-purple-600/30 text-white"
                                        : "text-gray-300 hover:bg-white/10"
                                )}
                            >
                                <span className="text-lg">{lang.flag}</span>
                                <span>{lang.name}</span>
                                {language === lang.code && (
                                    <span className="ml-auto text-purple-400">✓</span>
                                )}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
