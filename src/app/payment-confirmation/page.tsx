"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Clock, MessageCircle, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/lib/language-context";
import { Footer } from "@/components/Footer";
import { useSearchParams } from "next/navigation";
import { trackPurchase } from "@/lib/pixel-tracking";

function PaymentConfirmationContent() {
    const { t } = useLanguage();
    const searchParams = useSearchParams();
    const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds
    const [purchaseTracked, setPurchaseTracked] = useState(false);

    // Track Purchase on mount
    useEffect(() => {
        if (purchaseTracked) return;

        const amount = searchParams.get("amount");
        const ref = searchParams.get("ref");
        const ids = searchParams.get("ids");

        if (amount && ref) {
            trackPurchase({
                transactionId: ref,
                value: parseFloat(amount),
                contentIds: ids ? ids.split(",") : undefined
            });
            setPurchaseTracked(true);
        }
    }, [searchParams, purchaseTracked]);

    // Timer logic
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Format time as MM:SS
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    return (
        <div className="flex-grow p-4 md:p-12 flex flex-col items-center">

            {/* Header */}
            <div className="w-full max-w-2xl mb-8">
                <Link href="/" className="flex items-center text-gray-400 hover:text-white transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    {t.nav.backToEvents}
                </Link>
            </div>

            <Card className="w-full max-w-2xl bg-white/5 border-white/10 backdrop-blur-md overflow-hidden relative">
                {/* Top Accent Gradient */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500" />

                <CardHeader className="text-center pb-2">
                    <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-green-400" />
                    </div>
                    <CardTitle className="text-3xl font-bold">{t.confirmation.title}</CardTitle>
                    <p className="text-gray-400 mt-2 max-w-md mx-auto">
                        {t.confirmation.subtitle}
                    </p>
                </CardHeader>

                <CardContent className="space-y-8 pt-6">
                    {/* Timer Section */}
                    <div className="flex flex-col items-center justify-center py-6 bg-black/20 rounded-xl border border-white/5">
                        <span className="text-gray-400 text-sm mb-2 uppercase tracking-wider font-semibold">
                            {t.confirmation.timerLabel}
                        </span>
                        <div className="text-5xl md:text-6xl font-mono font-bold text-yellow-400 flex items-center gap-3">
                            <Clock className="w-8 h-8 md:w-10 md:h-10 text-yellow-400/80 animate-pulse" />
                            {formatTime(timeLeft)}
                        </div>
                    </div>

                    {/* Steps */}
                    <div className="space-y-4">
                        <div className="flex gap-4 p-4 bg-purple-500/10 rounded-lg border border-purple-500/20 items-start">
                            <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-xs font-bold text-white">1</span>
                            </div>
                            <div>
                                <p className="font-medium text-purple-100">{t.confirmation.step1}</p>
                            </div>
                        </div>

                        <div className="flex gap-4 p-4 bg-green-500/10 rounded-lg border border-green-500/20 items-start">
                            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-xs font-bold text-white">2</span>
                            </div>
                            <div>
                                <p className="font-medium text-green-100">{t.confirmation.step2}</p>
                            </div>
                        </div>
                    </div>

                    {/* PayPal Button (Conditional) */}
                    {searchParams.get("method") === "PAYPAL" && (
                        <Button
                            className="w-full h-14 text-lg bg-[#0070BA] hover:bg-[#003087] text-white shadow-lg shadow-blue-500/20 transition-all transform hover:scale-[1.02] mb-3"
                            onClick={() => {
                                const user = searchParams.get("paypalUser") || "BTSTickets2026";
                                const amount = searchParams.get("amount");
                                window.open(`https://paypal.me/${user}/${amount}`, "_blank");
                            }}
                        >
                            <MessageCircle className="w-6 h-6 mr-2" />
                            Pay with PayPal
                        </Button>
                    )}

                    {/* WhatsApp Button */}
                    <Button
                        className="w-full h-14 text-lg bg-[#25D366] hover:bg-[#128C7E] text-white shadow-lg shadow-green-500/20 transition-all transform hover:scale-[1.02]"
                        onClick={() => window.open("https://wa.me/4915222479268", "_blank")}
                    >
                        <MessageCircle className="w-6 h-6 mr-2" />
                        {t.confirmation.whatsappButton}
                    </Button>

                </CardContent>
            </Card>
        </div>
    );
}

export default function PaymentConfirmationPage() {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen bg-secondary text-white font-sans flex flex-col">
            <Suspense fallback={<div className="flex-grow flex items-center justify-center">{t.general.loading}</div>}>
                <PaymentConfirmationContent />
            </Suspense>
            <Footer />
        </div>
    );
}

