"use client";

// ============================================
// PIXEL TRACKING UTILITY
// Supports: Facebook Pixel, Google Ads (gtag)
// ============================================

// Type definitions
export interface PixelConfig {
    facebookPixelId: string;
    googleAdsId: string;       // e.g. "AW-123456789"
    googleAdsConversionLabel: string; // for purchase events
}

// Default config - UPDATE THESE VALUES
const DEFAULT_CONFIG: PixelConfig = {
    facebookPixelId: "YOUR_FB_PIXEL_ID",
    googleAdsId: "YOUR_GOOGLE_ADS_ID",
    googleAdsConversionLabel: "YOUR_CONVERSION_LABEL"
};

// Get config (could be from localStorage or env in future)
export const getPixelConfig = (): PixelConfig => {
    if (typeof window === "undefined") return DEFAULT_CONFIG;

    try {
        const stored = localStorage.getItem("pixel_config");
        if (stored) return { ...DEFAULT_CONFIG, ...JSON.parse(stored) };
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

// Track Page View
export const trackPageView = () => {
    if (typeof window === "undefined") return;

    // Facebook
    if (window.fbq) {
        window.fbq("track", "PageView");
    }

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

    // Facebook Pixel
    if (window.fbq) {
        window.fbq("track", "AddToCart", {
            content_ids: [contentId],
            content_name: contentName,
            value: value,
            currency: currency,
            content_type: "product"
        });
    }

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

    // Facebook Pixel
    if (window.fbq) {
        window.fbq("track", "InitiateCheckout", {
            content_ids: contentIds,
            value: value,
            currency: currency,
            num_items: numItems
        });
    }

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

    // Facebook Pixel
    if (window.fbq) {
        window.fbq("track", "Purchase", {
            content_ids: contentIds,
            value: value,
            currency: currency,
            content_type: "product"
        });
    }

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

    // Facebook Pixel
    if (window.fbq) {
        window.fbq("track", "ViewContent", {
            content_ids: [contentId],
            content_name: contentName,
            value: value,
            currency: currency,
            content_type: "product"
        });
    }

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
