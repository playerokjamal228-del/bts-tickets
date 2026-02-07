"use client";

// ============================================
// PIXEL TRACKING UTILITY
// Supports: Facebook Pixel, Google Ads (gtag)
// ============================================

// Type definitions
export interface PixelConfig {
    facebookPixelId: string;
    facebookAccessToken: string; // For CAPI
    googleAdsId: string;       // e.g. "AW-123456789"
    googleAdsConversionLabel: string; // for purchase events
}

// Default config - UPDATE THESE VALUES
const DEFAULT_CONFIG: PixelConfig = {
    facebookPixelId: "1649014073201879",
    facebookAccessToken: "EAASez8zSC2MBQhA8bxeDty2AOQyMn0Dn7iMyOWmeKIFVpaVRucsaCNz3fOZArCh2BCrZCd8Bej4ZCdntxipRZAWut0JzSNZCCwZCZBoxCU5CTuz2HY0HQlBbZB7hqnmZBtNBbJvIkn0Hb3MaaSGDWUmurJcHXfD5cZCB0FTYAL1uu141FVcVek1R9m5YMlkGlJmR5ZCdwZDZD",
    googleAdsId: "YOUR_GOOGLE_ADS_ID",
    googleAdsConversionLabel: "YOUR_CONVERSION_LABEL"
};

// Get config (could be from localStorage or env in future)
export const getPixelConfig = (): PixelConfig => {
    if (typeof window === "undefined") return DEFAULT_CONFIG;

    try {
        const stored = localStorage.getItem("pixel_config");
        if (stored) {
            const parsed = JSON.parse(stored);
            // If the stored value is a placeholder but DEFAULT_CONFIG has a real value, ignore stored
            if (parsed.facebookPixelId === "YOUR_FB_PIXEL_ID" && DEFAULT_CONFIG.facebookPixelId !== "YOUR_FB_PIXEL_ID") {
                return DEFAULT_CONFIG;
            }
            return { ...DEFAULT_CONFIG, ...parsed };
        }
    } catch { }

    return DEFAULT_CONFIG;
};

// Save config to localStorage
export const savePixelConfig = (config: Partial<PixelConfig>) => {
    if (typeof window === "undefined") return;
    const current = getPixelConfig();
    localStorage.setItem("pixel_config", JSON.stringify({ ...current, ...config }));
};

// ============================================
// FACEBOOK PIXEL EVENTS
// ============================================

declare global {
    interface Window {
        fbq?: (...args: unknown[]) => void;
        gtag?: (...args: unknown[]) => void;
        dataLayer?: unknown[];
    }
}

// Function to send event to CAPI
const sendToCapi = async (eventName: string, customData: any = {}, eventId?: string) => {
    const config = getPixelConfig();
    if (!config.facebookAccessToken || config.facebookAccessToken === "YOUR_FB_ACCESS_TOKEN") return;
    if (!config.facebookPixelId || config.facebookPixelId === "YOUR_FB_PIXEL_ID") return;

    try {
        await fetch('/api/pixel/capi', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                pixelId: config.facebookPixelId,
                accessToken: config.facebookAccessToken,
                eventName,
                eventUrl: window.location.href,
                eventId,
                customData,
            })
        });
    } catch (error) {
        console.error("[CAPI] Failed to send event:", error);
    }
};

// Track Page View
export const trackPageView = () => {
    if (typeof window === "undefined") return;

    const eventId = "evt_" + Math.random().toString(36).substring(2, 15);

    // Facebook
    if (window.fbq) {
        window.fbq("track", "PageView", {}, { eventID: eventId });
    }

    // CAPI
    sendToCapi("PageView", {}, eventId);

    // Google (handled automatically by gtag)
};

// Track Add to Cart
export const trackAddToCart = (params: {
    contentId: string;
    contentName: string;
    value: number;
    currency?: string;
}) => {
    if (typeof window === "undefined") return;

    const { contentId, contentName, value, currency = "EUR" } = params;

    const eventId = "evt_" + Math.random().toString(36).substring(2, 15);

    // Facebook Pixel
    if (window.fbq) {
        window.fbq("track", "AddToCart", {
            content_ids: [contentId],
            content_name: contentName,
            value: value,
            currency: currency,
            content_type: "product"
        }, { eventID: eventId });
    }

    // CAPI
    sendToCapi("AddToCart", {
        content_ids: [contentId],
        content_name: contentName,
        value: value,
        currency: currency,
        content_type: "product"
    }, eventId);

    // Google Analytics 4 / gtag
    if (window.gtag) {
        window.gtag("event", "add_to_cart", {
            currency: currency,
            value: value,
            items: [{
                item_id: contentId,
                item_name: contentName,
                price: value,
                quantity: 1
            }]
        });
    }

    console.log("[Pixel] AddToCart:", contentName, value);
};

// Track Initiate Checkout
export const trackInitiateCheckout = (params: {
    contentIds: string[];
    value: number;
    numItems: number;
    currency?: string;
}) => {
    if (typeof window === "undefined") return;

    const { contentIds, value, numItems, currency = "EUR" } = params;

    const eventId = "evt_" + Math.random().toString(36).substring(2, 15);

    // Facebook Pixel
    if (window.fbq) {
        window.fbq("track", "InitiateCheckout", {
            content_ids: contentIds,
            value: value,
            currency: currency,
            num_items: numItems
        }, { eventID: eventId });
    }

    // CAPI
    sendToCapi("InitiateCheckout", {
        content_ids: contentIds,
        value: value,
        currency: currency,
        num_items: numItems
    }, eventId);

    // Google
    if (window.gtag) {
        window.gtag("event", "begin_checkout", {
            currency: currency,
            value: value,
            items: contentIds.map(id => ({ item_id: id }))
        });
    }

    console.log("[Pixel] InitiateCheckout:", value, numItems);
};

// Track Purchase / Payment Click
export const trackPurchase = (params: {
    transactionId: string;
    value: number;
    currency?: string;
    contentIds?: string[];
}) => {
    if (typeof window === "undefined") return;

    const { transactionId, value, currency = "EUR", contentIds = [] } = params;
    const config = getPixelConfig();

    const eventId = "evt_" + Math.random().toString(36).substring(2, 15);

    // Facebook Pixel
    if (window.fbq) {
        window.fbq("track", "Purchase", {
            content_ids: contentIds,
            value: value,
            currency: currency,
            content_type: "product"
        }, { eventID: eventId });
    }

    // CAPI
    sendToCapi("Purchase", {
        content_ids: contentIds,
        value: value,
        currency: currency,
        content_type: "product"
    }, eventId);

    // Google Ads Conversion
    if (window.gtag && config.googleAdsId !== "YOUR_GOOGLE_ADS_ID") {
        window.gtag("event", "conversion", {
            send_to: `${config.googleAdsId}/${config.googleAdsConversionLabel}`,
            value: value,
            currency: currency,
            transaction_id: transactionId
        });
    }

    // GA4 Purchase
    if (window.gtag) {
        window.gtag("event", "purchase", {
            transaction_id: transactionId,
            value: value,
            currency: currency,
            items: contentIds.map(id => ({ item_id: id }))
        });
    }

    console.log("[Pixel] Purchase:", transactionId, value);
};

// Track View Content (product page)
export const trackViewContent = (params: {
    contentId: string;
    contentName: string;
    value?: number;
    currency?: string;
}) => {
    if (typeof window === "undefined") return;

    const { contentId, contentName, value = 0, currency = "EUR" } = params;

    const eventId = "evt_" + Math.random().toString(36).substring(2, 15);

    // Facebook Pixel
    if (window.fbq) {
        window.fbq("track", "ViewContent", {
            content_ids: [contentId],
            content_name: contentName,
            value: value,
            currency: currency,
            content_type: "product"
        }, { eventID: eventId });
    }

    // CAPI
    sendToCapi("ViewContent", {
        content_ids: [contentId],
        content_name: contentName,
        value: value,
        currency: currency,
        content_type: "product"
    }, eventId);

    // Google
    if (window.gtag) {
        window.gtag("event", "view_item", {
            currency: currency,
            value: value,
            items: [{
                item_id: contentId,
                item_name: contentName,
                price: value
            }]
        });
    }
};

// Track Lead (after email submission - Step 1)
export const trackLead = (params: {
    email?: string;
    value?: number;
    currency?: string;
}) => {
    if (typeof window === "undefined") return;

    const { email, value = 0, currency = "EUR" } = params;

    const eventId = "evt_" + Math.random().toString(36).substring(2, 15);

    // Facebook Pixel
    if (window.fbq) {
        window.fbq("track", "Lead", {
            value: value,
            currency: currency,
            content_category: "ticket_purchase"
        }, { eventID: eventId });
    }

    // CAPI
    sendToCapi("Lead", {
        value: value,
        currency: currency,
        content_category: "ticket_purchase",
        em: email
    }, eventId);

    // Google
    if (window.gtag) {
        window.gtag("event", "generate_lead", {
            currency: currency,
            value: value
        });
    }

    console.log("[Pixel] Lead captured:", email ? email.substring(0, 3) + "***" : "no email");
};

// Track Add Payment Info (after details submission - Step 2)
export const trackAddPaymentInfo = (params: {
    value?: number;
    currency?: string;
    contentIds?: string[];
}) => {
    if (typeof window === "undefined") return;

    const { value = 0, currency = "EUR", contentIds = [] } = params;

    const eventId = "evt_" + Math.random().toString(36).substring(2, 15);

    // Facebook Pixel
    if (window.fbq) {
        window.fbq("track", "AddPaymentInfo", {
            value: value,
            currency: currency,
            content_ids: contentIds,
            content_type: "product"
        }, { eventID: eventId });
    }

    // CAPI
    sendToCapi("AddPaymentInfo", {
        value: value,
        currency: currency,
        content_ids: contentIds,
        content_type: "product"
    }, eventId);

    // Google
    if (window.gtag) {
        window.gtag("event", "add_payment_info", {
            currency: currency,
            value: value,
            items: contentIds.map((id: string) => ({ item_id: id }))
        });
    }

    console.log("[Pixel] AddPaymentInfo:", value, currency);
};
