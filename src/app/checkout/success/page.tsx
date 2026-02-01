"use client";

import { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader2, MessageCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";

// Inner component that uses useSearchParams
function SuccessContent() {
    const searchParams = useSearchParams();
    const method = searchParams.get("method") || "card";

    const [timeLeft, setTimeLeft] = useState(180); // 3 minutes = 180 seconds
    const [isVerified, setIsVerified] = useState(false);
    const [whatsappNumber, setWhatsappNumber] = useState("+49 123 456 7890");

    // Fetch WhatsApp number from API
    useEffect(() => {
        fetch('/api/admin/update-iban')
            .then(res => res.json())
            .then(data => {
                if (data.whatsapp) {
                    setWhatsappNumber(data.whatsapp);
                }
            })
            .catch(console.error);
    }, []);

    // Countdown timer
    useEffect(() => {
        if (timeLeft <= 0) {
            setIsVerified(true);
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const progress = ((180 - timeLeft) / 180) * 100;

    // Verification pending UI
    if (!isVerified) {
        return (
            <div className="min-h-screen bg-secondary text-white flex flex-col items-center justify-center p-4 text-center">
                <div className="relative w-40 h-40 mb-8">
                    {/* Background ring */}
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        <circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke="rgba(255,255,255,0.1)"
                            strokeWidth="8"
                        />
                        {/* Progress ring */}
                        <circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke="url(#gradient)"
                            strokeWidth="8"
                            strokeLinecap="round"
                            strokeDasharray={`${2 * Math.PI * 45}`}
                            strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
                            className="transition-all duration-1000 ease-linear"
                        />
                        <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#a855f7" />
                                <stop offset="100%" stopColor="#ec4899" />
                            </linearGradient>
                        </defs>
                    </svg>

                    {/* Timer text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <Loader2 className="w-6 h-6 text-purple-400 animate-spin mb-2" />
                        <span className="text-3xl font-bold font-mono">
                            {minutes}:{seconds.toString().padStart(2, '0')}
                        </span>
                    </div>
                </div>

                <h1 className="text-3xl font-bold mb-4">Проверка платежа...</h1>
                <p className="text-gray-400 max-w-md mb-4">
                    Мы проверяем поступление вашего платежа. Это может занять до 3 минут.
                </p>
                <p className="text-sm text-gray-500">
                    Пожалуйста, не закрывайте эту страницу.
                </p>

                <div className="mt-8 bg-white/5 p-4 rounded-lg border border-white/10 max-w-sm">
                    <p className="text-xs text-gray-400">
                        Способ оплаты: <span className="text-white font-medium">{method === "iban" ? "Банковский перевод (IBAN)" : method === "paypal" ? "PayPal" : "Банковская карта"}</span>
                    </p>
                </div>
            </div>
        );
    }

    // Success UI (after timer)
    return (
        <div className="min-h-screen bg-secondary text-white flex flex-col items-center justify-center p-4 text-center">
            <div className="animate-in zoom-in duration-500 mb-8">
                <div className="relative">
                    <div className="absolute inset-0 bg-green-500 blur-3xl opacity-30 rounded-full" />
                    <CheckCircle className="w-32 h-32 text-green-500 relative z-10" />
                </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Оплата прошла успешно!
            </h1>
            <p className="text-xl text-gray-300 max-w-lg mb-8">
                Ваш заказ подтвержден. Для получения билетов свяжитесь с нами.
            </p>

            {/* WhatsApp Contact Card */}
            <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 p-6 rounded-2xl border border-green-500/30 mb-8 max-w-md w-full">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center">
                        <MessageCircle className="w-7 h-7 text-white" />
                    </div>
                    <div className="text-left">
                        <h3 className="text-lg font-bold text-white">Свяжитесь с нами</h3>
                        <p className="text-sm text-gray-400">Мы отправим вам билеты</p>
                    </div>
                </div>

                <div className="bg-black/30 p-4 rounded-xl mb-4">
                    <div className="text-xs text-gray-500 mb-1">WhatsApp</div>
                    <div className="text-2xl font-bold text-green-400 font-mono">
                        {whatsappNumber}
                    </div>
                </div>

                <a
                    href={`https://wa.me/${whatsappNumber.replace(/[^0-9+]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full px-6 py-4 bg-green-500 hover:bg-green-400 text-white text-lg font-bold rounded-xl transition-all flex items-center justify-center gap-3 shadow-lg shadow-green-500/25"
                >
                    <MessageCircle className="w-6 h-6" />
                    Открыть WhatsApp
                </a>

                <p className="text-xs text-gray-500 mt-4">
                    Напишите нам, и мы отправим ваши электронные билеты в течение 15 минут.
                </p>
            </div>

            <Link href="/">
                <Button variant="outline" size="lg" className="border-white/20 hover:bg-white/5">
                    Вернуться на главную
                </Button>
            </Link>
        </div>
    );
}

// Loading fallback
function LoadingFallback() {
    return (
        <div className="min-h-screen bg-secondary text-white flex flex-col items-center justify-center p-4">
            <Loader2 className="w-12 h-12 text-purple-400 animate-spin" />
            <p className="text-gray-400 mt-4">Загрузка...</p>
        </div>
    );
}

// Main page with Suspense boundary
export default function SuccessPage() {
    return (
        <Suspense fallback={<LoadingFallback />}>
            <SuccessContent />
        </Suspense>
    );
}
