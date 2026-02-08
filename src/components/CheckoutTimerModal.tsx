"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Lock, X } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

interface CheckoutTimerModalProps {
    onStart: () => void;
    isOpen: boolean;
}

export function CheckoutTimerModal({ onStart, isOpen }: CheckoutTimerModalProps) {
    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px'
        }}>
            <div style={{
                backgroundColor: 'white',
                color: 'black',
                padding: '32px',
                borderRadius: '16px',
                width: '100%',
                maxWidth: '420px',
                position: 'relative',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            }}>

                {/* Close Button (Fallback) */}
                <button
                    onClick={onStart}
                    style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '4px'
                    }}
                >
                    <X className="w-6 h-6 text-gray-400 hover:text-gray-600" />
                </button>

                <div className="flex flex-col items-center text-center space-y-6">
                    {/* Icon */}
                    <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-2">
                        <Lock className="w-8 h-8 text-purple-600" />
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 leading-tight">
                        You have <span className="text-purple-600">10 minutes</span> to complete your purchase
                    </h2>

                    {/* Description */}
                    <p className="text-gray-600 text-sm max-w-xs">
                        The price of your tickets will be locked during this time.
                    </p>

                    {/* Button */}
                    <Button
                        onClick={onStart}
                        className="w-full h-12 text-lg font-bold bg-[#6832BC] hover:bg-[#5a2b9e] text-white rounded-xl shadow-lg shadow-purple-900/10"
                    >
                        Start
                    </Button>
                </div>
            </div>
        </div>
    );
}
