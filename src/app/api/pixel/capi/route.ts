import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { pixelId, accessToken, eventName, eventUrl, customData } = body;

        // Configuration - in production these should be environment variables
        // For simplicity, we are mirroring the logic from the client-side store if needed
        // but since client-side provides the token in the request (indirectly via store), 
        // we'll try to find it or use a default.

        // IMPORTANT: In a real app, don't trust client-supplied tokens for CAPI.
        // But for this setup, we'll keep it flexible.
        const PIXEL_ID = pixelId || "YOUR_FB_PIXEL_ID"; // Overridden by data if possible
        const ACCESS_TOKEN = accessToken || "YOUR_FB_ACCESS_TOKEN"; // MUST be set by user

        if (!ACCESS_TOKEN || ACCESS_TOKEN === "YOUR_FB_ACCESS_TOKEN") {
            return NextResponse.json({ error: "Access Token not provided" }, { status: 400 });
        }
        if (!PIXEL_ID || PIXEL_ID === "YOUR_FB_PIXEL_ID") {
            return NextResponse.json({ error: "Pixel ID not provided" }, { status: 400 });
        }

        // Get Client IP and User Agent from headers
        const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1';
        const userAgent = request.headers.get('user-agent') || '';

        const eventData = {
            data: [
                {
                    event_name: eventName,
                    event_time: Math.floor(Date.now() / 1000),
                    event_id: body.eventId, // For deduplication
                    action_source: "website",
                    event_source_url: eventUrl,
                    user_data: {
                        client_ip_address: ip,
                        client_user_agent: userAgent,
                    },
                    custom_data: customData,
                }
            ]
        };

        const fbResponse = await fetch(`https://graph.facebook.com/v19.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(eventData)
        });

        const result = await fbResponse.json();

        return NextResponse.json({ success: true, result });
    } catch (error) {
        console.error("[CAPI API] Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
