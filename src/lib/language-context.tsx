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

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguageState] = useState<Language>('en');


    useEffect(() => {
        // Try to get language from localStorage or browser
        try {
            const saved = localStorage.getItem('bts-language') as Language | null;
            if (saved && translations[saved]) {
                setLanguageState(saved);
            } else {
                // Detect browser language
                const browserLang = navigator.language.split('-')[0];
                if (browserLang === 'de' || browserLang === 'es' || browserLang === 'fr') {
                    setLanguageState(browserLang as Language);
                }
            }
        } catch (e) {
            // localStorage not available (SSR)
        }
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
