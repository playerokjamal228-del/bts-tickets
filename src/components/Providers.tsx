"use client";

import { ReactNode, useEffect } from 'react';
import { LanguageProvider } from '@/lib/language-context';
import { useCartStore } from '@/lib/store';

export function Providers({ children }: { children: ReactNode }) {
    // Manually rehydrate Zustand store on client to prevent SSR mismatch
    useEffect(() => {
        useCartStore.persist.rehydrate();
    }, []);

    return (
        <LanguageProvider>
            {children}
        </LanguageProvider>
    );
}
