import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function SuccessPage() {
    return (
        <div className="min-h-screen bg-secondary text-white flex flex-col items-center justify-center p-4 text-center">
            <div className="animate-in zoom-in duration-500 mb-8">
                <div className="relative">
                    <div className="absolute inset-0 bg-primary blur-3xl opacity-50 rounded-full" />
                    <CheckCircle className="w-32 h-32 text-primary relative z-10" />
                </div>
            </div>

            <h1 className="text-5xl font-bold mb-4">Thank You!</h1>
            <p className="text-xl text-gray-300 max-w-lg mb-8">
                Your order has been placed successfully.
                <br />
                A confirmation email has been sent to you.
            </p>

            <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-8 max-w-md w-full">
                <h3 className="text-lg font-bold mb-2 text-accent">Next Steps</h3>
                <p className="text-sm text-gray-400">
                    If you chose Bank Transfer, please complete the payment within 24 hours to secure your tickets.
                </p>
            </div>

            <Link href="/">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg">
                    Back to Home
                </Button>
            </Link>
        </div>
    );
}
