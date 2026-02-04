"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function WhatsAppWidget() {
    const [whatsappNumber, setWhatsappNumber] = useState("+49 123 456 7890");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        setMounted(true);
        // Fetch dynamic number if available
        fetch('/api/admin/update-iban')
            .then(res => res.json())
            .then(data => {
                if (data.whatsapp) {
                    setWhatsappNumber(data.whatsapp);
                }
            })
            .catch(console.error);
    }, []);

    if (!mounted) return null;

    const cleanNumber = whatsappNumber.replace(/[^0-9+]/g, '');
    const whatsappUrl = `https://wa.me/${cleanNumber}`;

    return (
        <AnimatePresence>
            <motion.a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.3)] hover:shadow-[0_6px_16px_rgba(37,211,102,0.4)] transition-shadow cursor-pointer group"
                aria-label="Contact us on WhatsApp"
            >
                {/* Ping animation effect */}
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75 animate-ping group-hover:animate-none" />

                <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-9 h-9 relative z-10"
                >
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.696c1.001.574 2.141.876 3.294.876 3.181 0 5.768-2.587 5.768-5.766.001-3.187-2.575-5.759-5.766-5.759h.51z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.555 4.167 1.602 5.975L0 24l6.195-1.625C7.942 23.475 9.92 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.821c-1.794 0-3.551-.497-5.093-1.44l-3.66 1.026.977-3.564C3.336 16.223 2.76 14.167 2.76 12c.001-5.093 4.143-9.236 9.24-9.236 5.097 0 9.239 4.143 9.239 9.236-.001 5.098-4.146 9.221-9.239 9.221z" />
                </svg>
            </motion.a>
        </AnimatePresence>
    );
}
