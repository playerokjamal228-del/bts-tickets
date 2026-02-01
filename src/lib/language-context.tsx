"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, Translations, translations } from './translations';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: Translations;
}

// Always provide a default value to avoid the "must be used within provider" error
const defaultContext: LanguageContextType = {
    language: 'en',
    setLanguage: () => { },
    t: translations['en'],
};

const LanguageContext = createContext<LanguageContextType>(defaultContext);

// Map country codes to languages
const COUNTRY_TO_LANGUAGE: Record<string, Language> = {
    'DE': 'de',  // Germany
    'AT': 'de',  // Austria
    'CH': 'de',  // Switzerland (German-speaking)
    'FR': 'fr',  // France
    'BE': 'fr',  // Belgium (French-speaking)
    'ES': 'es',  // Spain
    // Everything else defaults to English
};

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguageState] = useState<Language>('en');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        // Check if user has manually selected a language
        try {
            const saved = localStorage.getItem('bts-language') as Language | null;
            if (saved && translations[saved]) {
                setLanguageState(saved);
                return; // User has a saved preference, don't auto-detect
            }
        } catch (e) {
            // localStorage not available (SSR)
        }

        // Auto-detect language by IP geolocation
        const detectLanguageByIP = async () => {
            try {
                const response = await fetch('https://ip-api.com/json/?fields=countryCode');
                const data = await response.json();

                if (data.countryCode && COUNTRY_TO_LANGUAGE[data.countryCode]) {
                    const detectedLang = COUNTRY_TO_LANGUAGE[data.countryCode];
                    setLanguageState(detectedLang);
                    // Don't save to localStorage - let user manually set preference
                } else {
                    // Fallback to browser language detection
                    const browserLang = navigator.language.split('-')[0];
                    if (browserLang === 'de' || browserLang === 'es' || browserLang === 'fr') {
                        setLanguageState(browserLang as Language);
                    }
                    // else stay on 'en'
                }
            } catch (error) {
                console.error('Language auto-detection failed:', error);
                // Fallback to browser language detection
                try {
                    const browserLang = navigator.language.split('-')[0];
                    if (browserLang === 'de' || browserLang === 'es' || browserLang === 'fr') {
                        setLanguageState(browserLang as Language);
                    }
                } catch (e) {
                    // Stay on 'en'
                }
            }
        };

        detectLanguageByIP();
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        try {
            localStorage.setItem('bts-language', lang);
        } catch (e) {
            // localStorage not available
        }
    };

    const t = translations[language];

    // Always provide context, even before mount
    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    return context;
}

// Hook that returns translations without requiring context (for server components fallback)
export function getTranslations(lang: Language = 'en'): Translations {
    return translations[lang];
}
