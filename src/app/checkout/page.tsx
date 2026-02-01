"use client";

import { useCartStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CreditCard, Landmark, Trash2, ArrowLeft, User, Mail, MapPin, Lock, ExternalLink, MessageCircle } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/language-context";
import { Footer } from "@/components/Footer";
import { trackInitiateCheckout, trackPurchase } from "@/lib/pixel-tracking";


interface BillingInfo {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
}

const COUNTRIES = [
    "Germany", "France", "Spain", "UK", "Belgium", "Netherlands",
    "Italy", "Poland", "Austria", "Switzerland"
];

export default function CheckoutPage() {
    const { items, removeItem, totalAmount, clearCart } = useCartStore();
    const [paymentMethod, setPaymentMethod] = useState<"CARD" | "IBAN" | "PAYPAL">("CARD");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { t } = useLanguage();

    const [mounted, setMounted] = useState(false);

    // Track InitiateCheckout on mount
    useEffect(() => {
        setMounted(true);
        // Fire InitiateCheckout pixel event
        if (items.length > 0) {
            trackInitiateCheckout({
                contentIds: items.map(item => item.categoryId),
                value: totalAmount(),
                numItems: items.reduce((sum, i) => sum + i.quantity, 0)
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Billing form state
    const [billing, setBilling] = useState<BillingInfo>({
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        city: "",
        postalCode: "",
        country: "Germany",
    });

    // Order reference for IBAN
    const [orderRef] = useState(() => `BTS-${Date.now().toString(36).toUpperCase()}`);

    // Dynamic IBAN state
    const [ibanConfig, setIbanConfig] = useState<any>(null);
    const [ibanLoading, setIbanLoading] = useState(true);

    useEffect(() => {
        fetch('/api/admin/update-iban')
            .then(res => res.json())
            .then(data => {
                setIbanConfig(data);
                setIbanLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch IBAN:", err);
                setIbanLoading(false);
            });
    }, []);

    // Check if billing is complete
    const isBillingComplete =
        billing.firstName.trim() !== "" &&
        billing.lastName.trim() !== "" &&
        billing.email.trim() !== "" &&
        billing.address.trim() !== "" &&
        billing.city.trim() !== "" &&
        billing.postalCode.trim() !== "";

    const handleBillingChange = (field: keyof BillingInfo, value: string) => {
        setBilling(prev => ({ ...prev, [field]: value }));
    };

    // Send notification to Telegram
    const sendNotification = async (type: "checkout_start" | "pay_card" | "pay_iban") => {
        try {
            await fetch("/api/notify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    type,
                    amount: totalAmount(),
                    firstName: billing.firstName,
                    lastName: billing.lastName,
                    email: billing.email,
                    country: billing.country,
                    city: billing.city,
                }),
            });
        } catch (e) {
            console.error("Notification failed:", e);
        }
    };

    if (!mounted) return <div className="min-h-screen bg-secondary" />;

    const handlePayCard = async () => {
        if (!isBillingComplete) return;

        setLoading(true);
        await sendNotification("pay_card");

        // Track Purchase event
        trackPurchase({
            transactionId: orderRef,
            value: totalAmount(),
            contentIds: items.map(item => item.categoryId)
        });

        // Redirect to external payment (placeholder URL)
        const params = new URLSearchParams({
            ref: orderRef,
            amount: totalAmount().toString(),
            firstName: billing.firstName,
            lastName: billing.lastName,
            email: billing.email,
            address: billing.address,
            city: billing.city,
            postalCode: billing.postalCode,
            country: billing.country
        });

        window.location.href = `https://pay.example.com/checkout?${params.toString()}`;
    };

    const handlePayIBAN = async () => {
        if (!isBillingComplete) return;

        setLoading(true);
        await sendNotification("pay_iban");

        // Track Purchase event
        trackPurchase({
            transactionId: orderRef,
            value: totalAmount(),
            contentIds: items.map(item => item.categoryId)
        });

        // Show confirmation and clear cart
        clearCart();
        router.push("/checkout/success?method=iban");
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-secondary text-white flex flex-col items-center justify-center p-4">
                <h1 className="text-3xl font-bold mb-4">{t.checkout.emptyCart}</h1>
                <Link href="/">
                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600">{t.checkout.browseTickets}</Button>
                </Link>
            </div>
        );
    }

    // Glassmorphism input class
    const inputClass = "bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500/20";

    return (
        <>
            <div className="min-h-screen bg-secondary text-white p-4 md:p-12 font-sans">
                {/* Header with language selector - Removed, now global */}
                <div className="flex justify-between items-center mb-8">
                    <Link href="/" className="flex items-center text-gray-400 hover:text-white transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        {t.nav.backToEvents}
                    </Link>
                </div>

                <h1 className="text-4xl font-bold mb-2">{t.checkout.title}</h1>
                <p className="text-gray-400 mb-8">{t.checkout.subtitle}</p>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left: Order Summary + Billing */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Order Summary */}
                        <Card className="bg-white/5 border-white/10 backdrop-blur-md">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <span className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 text-sm font-bold">1</span>
                                    {t.checkout.orderSummary}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {items.map((item) => (
                                    <div
                                        key={`${item.categoryId}-${item.date}`}
                                        className="flex justify-between items-center border-b border-white/10 pb-4 last:border-0 last:pb-0"
                                    >
                                        <div>
                                            <h3 className="font-bold text-lg">{item.eventName}</h3>
                                            <p className="text-sm text-gray-400">
                                                {item.name} • {item.quantity}x
                                            </p>
                                            <p className="text-xs text-gray-500">{item.date}</p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="font-bold text-lg bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                                €{item.price * item.quantity}
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                                                onClick={() => removeItem(item.categoryId)}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                                <div className="pt-4 flex justify-between items-center text-xl font-bold border-t border-white/20 mt-4">
                                    <span>{t.checkout.total}</span>
                                    <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">€{totalAmount()}</span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Billing Information */}
                        <Card className="bg-white/5 border-white/10 backdrop-blur-md">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <span className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 text-sm font-bold">2</span>
                                    {t.checkout.billingInfo}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                            <User className="w-4 h-4 text-purple-400" />
                                            {t.checkout.firstName} *
                                        </label>
                                        <Input
                                            placeholder="John"
                                            className={inputClass}
                                            value={billing.firstName}
                                            onChange={(e) => handleBillingChange("firstName", e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300">{t.checkout.lastName} *</label>
                                        <Input
                                            placeholder="Doe"
                                            className={inputClass}
                                            value={billing.lastName}
                                            onChange={(e) => handleBillingChange("lastName", e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                        <Mail className="w-4 h-4 text-purple-400" />
                                        {t.checkout.email} * <span className="text-xs text-gray-500">({t.checkout.emailNote})</span>
                                    </label>
                                    <Input
                                        type="email"
                                        placeholder="john.doe@email.com"
                                        className={inputClass}
                                        value={billing.email}
                                        onChange={(e) => handleBillingChange("email", e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-purple-400" />
                                        {t.checkout.address} *
                                    </label>
                                    <Input
                                        placeholder="123 Main Street, Apt 4"
                                        className={inputClass}
                                        value={billing.address}
                                        onChange={(e) => handleBillingChange("address", e.target.value)}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300">{t.checkout.city} *</label>
                                        <Input
                                            placeholder="Berlin"
                                            className={inputClass}
                                            value={billing.city}
                                            onChange={(e) => handleBillingChange("city", e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300">{t.checkout.postalCode} *</label>
                                        <Input
                                            placeholder="10115"
                                            className={inputClass}
                                            value={billing.postalCode}
                                            onChange={(e) => handleBillingChange("postalCode", e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300">{t.checkout.country}</label>
                                        <select
                                            className={cn(inputClass, "w-full h-10 rounded-md px-3")}
                                            value={billing.country}
                                            onChange={(e) => handleBillingChange("country", e.target.value)}
                                        >
                                            {COUNTRIES.map(country => (
                                                <option key={country} value={country} className="bg-gray-900">
                                                    {country}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {!isBillingComplete && (
                                    <p className="text-yellow-400/80 text-sm flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
                                        {t.checkout.fillRequired}
                                    </p>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right: Payment Method */}
                    <div className="lg:col-span-1">
                        <Card className="bg-white/5 border-white/10 backdrop-blur-md sticky top-8">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <span className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 text-sm font-bold">3</span>
                                    {t.checkout.paymentDetails}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Tabs */}
                                <div className="grid grid-cols-3 gap-1 bg-black/20 p-1 rounded-lg">
                                    <button
                                        onClick={() => setPaymentMethod("CARD")}
                                        className={cn(
                                            "flex items-center justify-center py-2 rounded-md text-xs font-medium transition-all",
                                            paymentMethod === "CARD"
                                                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow"
                                                : "text-gray-400 hover:text-white"
                                        )}
                                    >
                                        <CreditCard className="w-3 h-3 mr-1" />
                                        Card
                                    </button>
                                    <button
                                        onClick={() => setPaymentMethod("IBAN")}
                                        className={cn(
                                            "flex items-center justify-center py-2 rounded-md text-xs font-medium transition-all",
                                            paymentMethod === "IBAN"
                                                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow"
                                                : "text-gray-400 hover:text-white"
                                        )}
                                    >
                                        <Landmark className="w-3 h-3 mr-1" />
                                        IBAN
                                    </button>
                                    <button
                                        onClick={() => setPaymentMethod("PAYPAL")}
                                        className={cn(
                                            "flex items-center justify-center py-2 rounded-md text-xs font-medium transition-all",
                                            paymentMethod === "PAYPAL"
                                                ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow"
                                                : "text-gray-400 hover:text-white"
                                        )}
                                    >
                                        <MessageCircle className="w-3 h-3 mr-1" />
                                        PayPal
                                    </button>
                                </div>

                                {/* Payment Content */}
                                <div className="min-h-[180px]">
                                    {paymentMethod === "CARD" && (
                                        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                                            <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <ExternalLink className="w-5 h-5 text-purple-400" />
                                                    <span className="text-white font-medium">Secure Payment</span>
                                                </div>
                                                <p className="text-gray-400 text-sm">
                                                    {t.checkout.cardPaymentNote}
                                                </p>
                                            </div>

                                            {/* Payment logos */}
                                            <div className="flex gap-3 justify-center">
                                                <div className="px-3 py-1 bg-white/5 rounded text-gray-400 text-xs font-bold border border-white/10">VISA</div>
                                                <div className="px-3 py-1 bg-white/5 rounded text-gray-400 text-xs font-bold border border-white/10">Mastercard</div>
                                                <div className="px-3 py-1 bg-white/5 rounded text-gray-400 text-xs font-bold border border-white/10">Apple Pay</div>
                                            </div>
                                        </div>
                                    )}

                                    {paymentMethod === "IBAN" && (
                                        <div className="space-y-4 animate-in fade-in slide-in-from-left-4 duration-300 bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/20">
                                            <p className="text-yellow-200 text-sm">
                                                {t.checkout.ibanNote}
                                            </p>
                                            <div className="font-mono text-sm bg-black/30 p-3 rounded text-gray-300 relative group">
                                                <div className="text-xs text-gray-500 mb-1">IBAN</div>
                                                {ibanLoading ? (
                                                    <div className="h-5 w-3/4 bg-white/10 animate-pulse rounded" />
                                                ) : (
                                                    <>
                                                        {ibanConfig?.iban || "DE89 3700 1000 2889 1100 22"}
                                                        <button
                                                            onClick={() => navigator.clipboard.writeText(ibanConfig?.iban || "")}
                                                            className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-white/10 rounded"
                                                            title="Copy IBAN"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                            <div className="font-mono text-sm bg-black/30 p-3 rounded text-gray-300">
                                                <div className="text-xs text-gray-500 mb-1">{t.checkout.reference}</div>
                                                {orderRef}
                                            </div>
                                            <div className="text-xs text-gray-400 mt-2 flex flex-col gap-1">
                                                <div className="flex justify-between">
                                                    <span>Bank:</span>
                                                    <span className="text-gray-300">{ibanConfig?.bankName || (ibanConfig?.bic ? "Bank Transfer" : "Commerzbank AG")}</span>
                                                </div>
                                                {ibanConfig?.bic && (
                                                    <div className="flex justify-between">
                                                        <span>BIC:</span>
                                                        <span className="text-gray-300 font-mono tracking-wider">{ibanConfig.bic}</span>
                                                    </div>
                                                )}
                                                <div className="flex justify-between">
                                                    <span>Holder:</span>
                                                    <span className="text-gray-300">{ibanConfig?.holder || "BTS Tour 2026 Admin"}</span>
                                                </div>
                                            </div>
                                            <p className="text-xs text-gray-400 mt-2 pt-2 border-t border-white/5">
                                                {t.checkout.ibanReserved}
                                            </p>
                                        </div>
                                    )}

                                    {paymentMethod === "PAYPAL" && (
                                        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
                                            <div className="bg-gradient-to-br from-blue-500/20 to-green-500/20 p-5 rounded-xl border border-blue-500/30">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                                                        <MessageCircle className="w-5 h-5 text-white" />
                                                    </div>
                                                    <div>
                                                        <span className="text-white font-semibold block">PayPal / Alternative Payment</span>
                                                        <span className="text-gray-400 text-xs">Contact our manager via WhatsApp</span>
                                                    </div>
                                                </div>
                                                <p className="text-gray-300 text-sm mb-4">
                                                    To pay via PayPal or other alternative methods, please contact our payment manager on WhatsApp. We'll process your order manually.
                                                </p>
                                                <div className="bg-black/30 p-4 rounded-lg">
                                                    <div className="text-xs text-gray-500 mb-2">WhatsApp Number</div>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-xl font-bold text-green-400 font-mono">
                                                            {ibanLoading ? (
                                                                <span className="h-6 w-32 bg-white/10 animate-pulse rounded inline-block" />
                                                            ) : (
                                                                ibanConfig?.whatsapp || "+49 123 456 7890"
                                                            )}
                                                        </span>
                                                        <a
                                                            href={`https://wa.me/${(ibanConfig?.whatsapp || "+49 123 456 7890").replace(/[^0-9+]/g, '')}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="px-4 py-2 bg-green-500 hover:bg-green-400 text-white text-sm font-medium rounded-lg transition-all flex items-center gap-2"
                                                        >
                                                            <MessageCircle className="w-4 h-4" />
                                                            Open Chat
                                                        </a>
                                                    </div>
                                                </div>
                                                <p className="text-xs text-gray-500 mt-3">
                                                    Please include your order reference: <span className="text-blue-400 font-mono">{orderRef}</span>
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Security note */}
                                <div className="flex items-center gap-2 text-gray-500 text-xs">
                                    <Lock className="w-4 h-4" />
                                    {t.checkout.securePayment}
                                </div>

                                <Button
                                    className={cn(
                                        "w-full text-lg h-12 transition-all",
                                        isBillingComplete
                                            ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-lg shadow-purple-500/25"
                                            : "bg-gray-700 cursor-not-allowed opacity-50"
                                    )}
                                    onClick={paymentMethod === "CARD" ? handlePayCard : handlePayIBAN}
                                    disabled={loading || !isBillingComplete}
                                >
                                    {loading ? t.checkout.processing : `${t.checkout.payNow} €${totalAmount()}`}
                                    {paymentMethod === "CARD" && !loading && <ExternalLink className="w-4 h-4 ml-2" />}
                                </Button>

                                {!isBillingComplete && (
                                    <p className="text-center text-gray-500 text-xs">
                                        {t.checkout.fillRequired}
                                    </p>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
            {/* Footer - outside padding container */}
            <Footer />
        </>
    );
}
