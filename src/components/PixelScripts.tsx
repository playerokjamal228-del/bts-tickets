"use client";

import Script from "next/script";
import { getPixelConfig } from "@/lib/pixel-tracking";
import { useEffect, useState } from "react";

// Component to inject Facebook Pixel and Google Ads scripts
export function PixelScripts() {
    const [config, setConfig] = useState({ facebookPixelId: "", googleAdsId: "" });

    useEffect(() => {
        const cfg = getPixelConfig();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        setConfig({ facebookPixelId: cfg.facebookPixelId, googleAdsId: cfg.googleAdsId });
    }, []);

    const hasFB = config.facebookPixelId && config.facebookPixelId !== "YOUR_FB_PIXEL_ID";
    const hasGoogle = config.googleAdsId && config.googleAdsId !== "YOUR_GOOGLE_ADS_ID";

    return (
        <>
            {/* Facebook Pixel */}
            {hasFB && (
                <Script id="facebook-pixel" strategy="afterInteractive">
                    {`
                        !function(f,b,e,v,n,t,s)
                        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                        n.queue=[];t=b.createElement(e);t.async=!0;
                        t.src=v;s=b.getElementsByTagName(e)[0];
                        s.parentNode.insertBefore(t,s)}(window, document,'script',
                        'https://connect.facebook.net/en_US/fbevents.js');
                        fbq('init', '${config.facebookPixelId}');
                        fbq('track', 'PageView');
                    `}
                </Script>
            )}

            {/* Google Ads / GA4 gtag */}
            {hasGoogle && (
                <>
                    <Script
                        src={`https://www.googletagmanager.com/gtag/js?id=${config.googleAdsId}`}
                        strategy="afterInteractive"
                    />
                    <Script id="google-gtag" strategy="afterInteractive">
                        {`
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', '${config.googleAdsId}');
                        `}
                    </Script>
                </>
            )}
        </>
    );
}
