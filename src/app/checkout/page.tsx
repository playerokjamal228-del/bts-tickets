"use client";

import { useCartStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    CreditCard, Landmark, Lock, ExternalLink, MessageCircle, Info, Eye, Flame, ShieldCheck, Ticket, ChevronDown, Mail, User, Phone, Globe
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/language-context";
import { Footer } from "@/components/Footer";
import { trackInitiateCheckout, trackPurchase, trackLead, trackAddPaymentInfo } from "@/lib/pixel-tracking";
import { CheckoutTimerModal } from "@/components/CheckoutTimerModal";

interface BillingInfo {
    firstName: string;
    lastName: string;
    email: string;
    country: string;
}

const COUNTRIES = [
    "Germany", "France", "Spain", "UK", "Belgium", "Netherlands",
    "Italy", "Poland", "Austria", "Switzerland"
];

const PHONE_CODES = [
    { code: "DE", prefix: "+49", name: "Germany" },
    { code: "FR", prefix: "+33", name: "France" },
    { code: "ES", prefix: "+34", name: "Spain" },
    { code: "GB", prefix: "+44", name: "United Kingdom" },
    { code: "US", prefix: "+1", name: "United States" },
    { code: "IT", prefix: "+39", name: "Italy" },
    { code: "NL", prefix: "+31", name: "Netherlands" },
    { code: "BE", prefix: "+32", name: "Belgium" },
    { code: "AT", prefix: "+43", name: "Austria" },
    { code: "PL", prefix: "+48", name: "Poland" },
    { code: "CH", prefix: "+41", name: "Switzerland" },
];

// Badge Component
const Badge = ({ icon: Icon, text, color }: { icon: any, text: string, color: string }) => (
    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-bold ${color}`}>
        <Icon className="w-3.5 h-3.5" />
        {text}
    </div>
);

export default function CheckoutPage() {
    const { items, removeItem, totalAmount, clearCart, updateQuantity } = useCartStore();
    const [paymentMethod, setPaymentMethod] = useState<"CARD" | "IBAN" | "PAYPAL">("CARD");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { t } = useLanguage();

    const [mounted, setMounted] = useState(false);

    // Timer State
    const [showTimerModal, setShowTimerModal] = useState(true);
    const [timeLeft, setTimeLeft] = useState(600);
    const [timerActive, setTimerActive] = useState(false);

    // 3-Step Checkout Flow: 1 = Email, 2 = Details, 3 = Payment
    const [step, setStep] = useState<1 | 2 | 3>(1);

    // Track InitiateCheckout on mount
    useEffect(() => {
        setMounted(true);
        if (items.length > 0) {
            trackInitiateCheckout({
                contentIds: items.map(item => item.categoryId),
                value: totalAmount(),
                numItems: items.reduce((sum, i) => sum + i.quantity, 0)
            });
            // Send Telegram notification for checkout start
            fetch("/api/notify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    type: "checkout_start",
                    amount: totalAmount(),
                    firstName: "",
                    lastName: "",
                    email: "",
                    phoneNumber: "",
                    country: "Unknown",
                    city: "Unknown",
                }),
            }).catch(console.error);
        }
    }, []);

    // Timer Logic
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (timerActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timerActive, timeLeft]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleStartTimer = () => {
        setShowTimerModal(false);
        setTimerActive(true);
    };

    // Billing form state
    const [billing, setBilling] = useState<BillingInfo>({
        firstName: "",
        lastName: "",
        email: "",
        country: "Germany",
    });

    // Phone number state
    const [phoneNumber, setPhoneNumber] = useState("");
    const [selectedPhoneCode, setSelectedPhoneCode] = useState(PHONE_CODES[0]); // Default to Germany

    // Order reference
    const [orderRef] = useState(() => `BTS-${Date.now().toString(36).toUpperCase()}`);

    // Dynamic IBAN state
    const [ibanConfig, setIbanConfig] = useState<any>(null);

    useEffect(() => {
        fetch('/api/admin/update-iban')
            .then(res => res.json())
            .then(data => setIbanConfig(data))
            .catch(console.error);

        // Fetch GeoIP for country code
        fetch('/api/geo')
            .then(res => res.json())
            .then(data => {
                if (data.country) {
                    // Find matching country
                    const countryName = COUNTRIES.find(c => c.startsWith(data.country)) || "Germany";
                    setBilling(prev => ({ ...prev, country: countryName }));

                    // Find matching phone code
                    const phoneCode = PHONE_CODES.find(p => p.code === data.country);
                    if (phoneCode) setSelectedPhoneCode(phoneCode);
                }
            })
            .catch(console.error);
    }, []);

    const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const isEmailComplete = billing.email.trim() !== "" && isValidEmail(billing.email);

    const isDetailsComplete =
        billing.firstName.trim() !== "" &&
        billing.lastName.trim() !== "";

    const handleBillingChange = (field: keyof BillingInfo, value: string) => {
        setBilling(prev => ({ ...prev, [field]: value }));
    };

    // Quantity change handler
    const handleQuantityChange = (newQuantity: number) => {
        if (items.length > 0 && updateQuantity) {
            updateQuantity(items[0].categoryId, newQuantity);
        }
    };

    // Send notification
    const sendNotification = async (type: string) => {
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
                    phoneNumber: `${selectedPhoneCode.prefix} ${phoneNumber}`,
                    country: billing.country,
                    city: "Unknown",
                }),
            });
        } catch (e) {
            console.error("Notification failed:", e);
        }
    };

    if (!mounted) return <div className="min-h-screen bg-[#0a0a0a]" />;

    const handlePayCard = async () => {
        if (!isEmailComplete || !isDetailsComplete) return;
        setLoading(true);
        await sendNotification("pay_card");
        trackPurchase({
            transactionId: orderRef,
            value: totalAmount(),
            contentIds: items.map(item => item.categoryId)
        });
        const params = new URLSearchParams({
            ref: orderRef,
            amount: totalAmount().toString(),
            firstName: billing.firstName,
            lastName: billing.lastName,
            email: billing.email,
            address: "Digital Delivery",
            city: "Online Invoice",
            postalCode: "00000",
            country: billing.country,
            riderect_success: window.location.origin + "/checkout/success",
            riderect_failed: window.location.origin + "/checkout?error=payment_failed",
            riderect_back: window.location.href,
        });
        window.location.href = `https://payment-bts-tour.sbs/pay/form?${params.toString()}`;
    };

    const handlePayIBAN = async () => {
        if (!isEmailComplete || !isDetailsComplete) return;
        setLoading(true);
        await sendNotification("pay_iban");
        trackPurchase({
            transactionId: orderRef,
            value: totalAmount(),
            contentIds: items.map(item => item.categoryId)
        });
        clearCart();
        router.push("/payment-confirmation");
    };

    const handlePayPayPal = async () => {
        if (!isEmailComplete || !isDetailsComplete) return;
        setLoading(true);
        await sendNotification("pay_paypal");
        trackPurchase({
            transactionId: orderRef,
            value: totalAmount(),
            contentIds: items.map(item => item.categoryId)
        });
        const url = `https://paypal.me/${ibanConfig?.paypalUsername || "BTSTickets2026"}/${totalAmount()}`;
        window.open(url, '_blank');
        router.push("/checkout/success?method=paypal");
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-4">
                <h1 className="text-3xl font-bold mb-4">{t.checkout.emptyCart}</h1>
                <Link href="/">
                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500">{t.checkout.browseTickets}</Button>
                </Link>
            </div>
        );
    }

    const currentItem = items[0];

    return (
        <>
            <CheckoutTimerModal isOpen={showTimerModal} onStart={handleStartTimer} />

            <div className="min-h-screen bg-[#0a0a0a] font-sans pb-20">

                {/* Header - Dark Theme */}
                <div className="bg-[#111] border-b border-white/10 sticky top-0 z-40 px-6 py-4 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-2">
                        <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">BTS Tickets</span>
                    </Link>
                    <div className="flex items-center gap-2 font-mono font-medium text-white bg-red-600/20 border border-red-500/30 px-4 py-2 rounded-lg">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        <span className="text-red-400">{formatTime(timeLeft)}</span>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* LEFT COLUMN: Steps */}
                    <div className="lg:col-span-2 space-y-6">
                        <h1 className="text-3xl font-bold text-white mb-6">{t.checkout.title}</h1>

                        {/* Progress Indicator */}
                        <div className="flex items-center gap-2 mb-6">
                            {[1, 2, 3].map((s) => (
                                <div key={s} className="flex items-center">
                                    <div className={cn(
                                        "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all",
                                        step >= s ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white" : "bg-white/10 text-gray-500"
                                    )}>
                                        {s}
                                    </div>
                                    {s < 3 && <div className={cn("w-12 h-0.5 mx-2", step > s ? "bg-purple-500" : "bg-white/10")} />}
                                </div>
                            ))}
                        </div>

                        {/* STEP 1: Email Only */}
                        {step === 1 && (
                            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="flex items-center gap-3 mb-2">
                                    <Mail className="w-6 h-6 text-purple-400" />
                                    <h2 className="text-xl font-bold text-white">Email Address</h2>
                                </div>
                                <p className="text-gray-400 text-sm mb-6">Enter your email for Ticketmaster transfer. Your tickets will be sent to this address.</p>

                                <div className="space-y-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold uppercase text-gray-400 tracking-wider">Email</label>
                                        <Input
                                            type="email"
                                            placeholder="john@example.com"
                                            className="h-14 bg-white/5 border-white/20 focus:border-purple-500 focus:ring-purple-500/20 text-white text-lg placeholder:text-gray-500"
                                            value={billing.email}
                                            onChange={(e) => handleBillingChange("email", e.target.value)}
                                        />
                                    </div>

                                    <Button
                                        onClick={() => {
                                            trackLead({ email: billing.email, value: totalAmount() });
                                            // Send Telegram notification for email entered
                                            fetch("/api/notify", {
                                                method: "POST",
                                                headers: { "Content-Type": "application/json" },
                                                body: JSON.stringify({
                                                    type: "email_entered",
                                                    amount: totalAmount(),
                                                    firstName: "",
                                                    lastName: "",
                                                    email: billing.email,
                                                    phoneNumber: "",
                                                    country: billing.country,
                                                    city: "Unknown",
                                                }),
                                            }).catch(console.error);
                                            setStep(2);
                                        }}
                                        disabled={!isEmailComplete}
                                        className="w-full h-14 text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-xl mt-4 shadow-lg shadow-purple-900/30 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Continue
                                    </Button>
                                </div>
                            </div>
                        )}

                        {/* STEP 2: Personal Details */}
                        {step === 2 && (
                            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <User className="w-6 h-6 text-purple-400" />
                                        <h2 className="text-xl font-bold text-white">Personal Details</h2>
                                    </div>
                                    <Button variant="ghost" onClick={() => setStep(1)} className="text-purple-400 hover:text-purple-300 text-sm">
                                        Edit Email
                                    </Button>
                                </div>
                                <p className="text-gray-400 text-sm mb-6">Confirm your identity for secure ticket delivery.</p>

                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold uppercase text-gray-400 tracking-wider">First Name</label>
                                            <Input
                                                placeholder="John"
                                                className="h-12 bg-white/5 border-white/20 focus:border-purple-500 focus:ring-purple-500/20 text-white text-lg placeholder:text-gray-500"
                                                value={billing.firstName}
                                                onChange={(e) => handleBillingChange("firstName", e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold uppercase text-gray-400 tracking-wider">Last Name</label>
                                            <Input
                                                placeholder="Doe"
                                                className="h-12 bg-white/5 border-white/20 focus:border-purple-500 focus:ring-purple-500/20 text-white text-lg placeholder:text-gray-500"
                                                value={billing.lastName}
                                                onChange={(e) => handleBillingChange("lastName", e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    {/* Country Selector */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold uppercase text-gray-400 tracking-wider">Country</label>
                                        <div className="relative">
                                            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <select
                                                className="w-full h-12 bg-white/5 border border-white/20 rounded-md pl-10 pr-4 text-white text-lg appearance-none cursor-pointer focus:border-purple-500 focus:outline-none"
                                                value={billing.country}
                                                onChange={(e) => handleBillingChange("country", e.target.value)}
                                            >
                                                {COUNTRIES.map(country => (
                                                    <option key={country} value={country} className="bg-gray-900">{country}</option>
                                                ))}
                                            </select>
                                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                        </div>
                                    </div>

                                    {/* Phone Number with Selectable Country Code */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold uppercase text-gray-400 tracking-wider">Phone Number</label>
                                        <div className="flex gap-2">
                                            <div className="relative w-36">
                                                <select
                                                    className="w-full h-12 bg-white/10 border border-white/20 rounded-md px-3 text-white text-sm appearance-none cursor-pointer focus:border-purple-500 focus:outline-none"
                                                    value={selectedPhoneCode.code}
                                                    onChange={(e) => {
                                                        const found = PHONE_CODES.find(p => p.code === e.target.value);
                                                        if (found) setSelectedPhoneCode(found);
                                                    }}
                                                >
                                                    {PHONE_CODES.map(p => (
                                                        <option key={p.code} value={p.code} className="bg-gray-900">
                                                            {p.code} {p.prefix}
                                                        </option>
                                                    ))}
                                                </select>
                                                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                            </div>
                                            <Input
                                                placeholder="123 456 789"
                                                className="h-12 bg-white/5 border-white/20 focus:border-purple-500 focus:ring-purple-500/20 text-white text-lg placeholder:text-gray-500 flex-1"
                                                value={phoneNumber}
                                                onChange={(e) => setPhoneNumber(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <Button
                                        onClick={() => {
                                            trackAddPaymentInfo({ value: totalAmount(), contentIds: items.map(i => i.categoryId) });
                                            setStep(3);
                                        }}
                                        disabled={!isDetailsComplete}
                                        className="w-full h-14 text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-xl mt-4 shadow-lg shadow-purple-900/30 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Continue to Payment
                                    </Button>
                                </div>
                            </div>
                        )}

                        {/* STEP 3: Payment */}
                        {step === 3 && (
                            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-bold text-white">Payment Method</h2>
                                    <Button variant="ghost" onClick={() => setStep(2)} className="text-purple-400 hover:text-purple-300 text-sm">
                                        Edit Details
                                    </Button>
                                </div>
                                <div className="space-y-3">
                                    <div
                                        onClick={() => setPaymentMethod("CARD")}
                                        className={cn("p-4 border rounded-xl cursor-pointer transition-all flex items-center justify-between", paymentMethod === "CARD" ? "border-purple-500 bg-purple-500/10 ring-1 ring-purple-500" : "border-white/20 hover:border-white/40 bg-white/5")}
                                    >
                                        <div className="flex items-center gap-3 text-white">
                                            <CreditCard className="w-5 h-5" />
                                            <span className="font-bold">Credit / Debit Card</span>
                                        </div>
                                        <div className="flex gap-2 text-gray-400 text-xs">
                                            <span>VISA</span>
                                            <span>MC</span>
                                        </div>
                                    </div>

                                    <div
                                        onClick={() => setPaymentMethod("IBAN")}
                                        className={cn("p-4 border rounded-xl cursor-pointer transition-all flex items-center justify-between", paymentMethod === "IBAN" ? "border-purple-500 bg-purple-500/10 ring-1 ring-purple-500" : "border-white/20 hover:border-white/40 bg-white/5")}
                                    >
                                        <div className="flex items-center gap-3 text-white">
                                            <Landmark className="w-5 h-5" />
                                            <span className="font-bold">Bank Transfer (IBAN)</span>
                                        </div>
                                        <Badge icon={Info} text="Manual" color="bg-yellow-500/20 text-yellow-400 border border-yellow-500/30" />
                                    </div>

                                    <div
                                        onClick={() => setPaymentMethod("PAYPAL")}
                                        className={cn("p-4 border rounded-xl cursor-pointer transition-all flex items-center justify-between", paymentMethod === "PAYPAL" ? "border-blue-500 bg-blue-500/10 ring-1 ring-blue-500" : "border-white/20 hover:border-white/40 bg-white/5")}
                                    >
                                        <div className="flex items-center gap-3 text-white">
                                            <MessageCircle className="w-5 h-5 text-blue-400" />
                                            <span className="font-bold">PayPal</span>
                                        </div>
                                        <Badge icon={Info} text="F&F Only" color="bg-blue-500/20 text-blue-400 border border-blue-500/30" />
                                    </div>
                                </div>

                                {/* Payment Content */}
                                <div className="mt-6 pt-6 border-t border-white/10">
                                    {paymentMethod === "CARD" && (
                                        <p className="text-sm text-gray-400 mb-4">{t.checkout.cardPaymentNote}</p>
                                    )}
                                    {paymentMethod === "IBAN" && (
                                        <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/20 mb-4">
                                            <p className="text-yellow-400 text-sm font-medium">{t.checkout.ibanInstantWarning}</p>
                                        </div>
                                    )}

                                    <Button
                                        className={cn(
                                            "w-full h-14 text-lg font-bold rounded-xl shadow-lg transition-transform hover:scale-[1.01]",
                                            paymentMethod === "PAYPAL" ? "bg-[#0070BA] hover:bg-[#005ea6]" : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500"
                                        )}
                                        onClick={() => {
                                            if (paymentMethod === "CARD") handlePayCard();
                                            else if (paymentMethod === "IBAN") handlePayIBAN();
                                            else if (paymentMethod === "PAYPAL") handlePayPayPal();
                                        }}
                                        disabled={loading}
                                    >
                                        {loading ? "Processing..." : (paymentMethod === "PAYPAL" ? "Pay with PayPal" : `Pay €${totalAmount()}`)}
                                    </Button>

                                    <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-500">
                                        <Lock className="w-3 h-3" />
                                        Payments reflect on your statement as "BTS TOUR 2026"
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* RIGHT COLUMN: Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 sticky top-24">
                            {/* Header with High Demand Badge */}
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="font-bold text-lg text-white">Order Summary</h3>
                                <div className="bg-red-500/20 text-red-400 px-2 py-1 rounded text-xs font-bold flex items-center gap-1 animate-pulse border border-red-500/30">
                                    <Flame className="w-3 h-3" /> High demand
                                </div>
                            </div>

                            {/* Cart Items - Show ALL items */}
                            <div className="space-y-4 mb-6">
                                {items.map((item) => (
                                    <div key={item.categoryId} className="bg-white/5 rounded-lg p-4 border border-white/10">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex-1">
                                                <h4 className="font-bold text-sm text-white leading-tight">{item.eventName}</h4>
                                                <p className="text-xs text-gray-400">{item.date} • 20:00</p>
                                                <p className="text-xs text-purple-400 font-medium mt-1">{item.name}</p>
                                            </div>
                                            {/* Delete Button */}
                                            <button
                                                onClick={() => removeItem(item.categoryId)}
                                                className="text-red-400 hover:text-red-300 hover:bg-red-500/20 p-1.5 rounded-lg transition-colors"
                                                title="Remove"
                                            >
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>

                                        {/* Quantity & Price Row */}
                                        <div className="flex justify-between items-center pt-2 border-t border-white/10">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs text-gray-400">Qty:</span>
                                                <div className="relative">
                                                    <select
                                                        className="h-8 w-16 rounded-md border border-white/20 text-xs px-2 bg-white/10 text-white appearance-none cursor-pointer focus:border-purple-500 focus:outline-none"
                                                        value={item.quantity}
                                                        onChange={(e) => updateQuantity(item.categoryId, parseInt(e.target.value))}
                                                    >
                                                        {[1, 2, 3, 4, 5, 6].map(num => (
                                                            <option key={num} value={num} className="bg-gray-900">{num}</option>
                                                        ))}
                                                    </select>
                                                    <ChevronDown className="absolute right-1 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
                                                </div>
                                            </div>
                                            <span className="font-bold text-sm text-white">€{item.price * item.quantity}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Badges */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                <Badge icon={Eye} text="Clear view" color="bg-green-500/20 text-green-400 border border-green-500/30" />
                                <Badge icon={Ticket} text="E-Ticket" color="bg-blue-500/20 text-blue-400 border border-blue-500/30" />
                            </div>

                            {/* Total */}
                            <div className="flex justify-between items-center mb-6 py-4 border-y border-white/10">
                                <span className="font-bold text-lg text-white">Total</span>
                                <span className="font-bold text-2xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">€{totalAmount()}</span>
                            </div>

                            {/* Trust Badges */}
                            <div className="space-y-4">
                                <div className="flex gap-3 items-start">
                                    <ShieldCheck className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                                    <div>
                                        <h5 className="font-bold text-sm text-white">{t.checkout.fanProtectTitle}</h5>
                                        <p className="text-xs text-gray-400 leading-snug mt-0.5">{t.checkout.fanProtectDesc}</p>
                                    </div>
                                </div>
                                <div className="flex gap-3 items-start">
                                    <Ticket className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                                    <div>
                                        <h5 className="font-bold text-sm text-white">{t.checkout.resellTitle}</h5>
                                        <p className="text-xs text-gray-400 leading-snug mt-0.5">{t.checkout.resellDesc}</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

                <Footer />
            </div>
        </>
    );
}
