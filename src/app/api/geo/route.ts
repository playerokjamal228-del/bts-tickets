
import { NextResponse } from 'next/server';
import geoip from 'geoip-lite';

export async function GET(request: Request) {
    // 1. Get IP from headers - try multiple common headers
    const headers = request.headers;

    // Priority order: CF-Connecting-IP (Cloudflare), X-Real-IP (Nginx), X-Forwarded-For, then fallback
    const cfIP = headers.get('cf-connecting-ip');
    const realIP = headers.get('x-real-ip');
    const forwardedFor = headers.get('x-forwarded-for');

    let ip = cfIP || realIP || (forwardedFor ? forwardedFor.split(',')[0].trim() : null);

    // Debug: log all headers to see what's available
    console.log('[GeoIP API] Headers:', {
        'cf-connecting-ip': cfIP,
        'x-real-ip': realIP,
        'x-forwarded-for': forwardedFor,
        'detected-ip': ip
    });

    // 2. Handle localhost/internal IPs for testing
    if (!ip || ip === '::1' || ip === '127.0.0.1') {
        // On production this should NOT happen if proxy is configured correctly!
        console.warn('[GeoIP API] WARNING: Could not detect real IP! Check Nginx/proxy config.');
        // Return US (restricted) instead of DE to be safe
        return NextResponse.json({ country: 'US', ip: ip || 'unknown', warning: 'Could not detect real IP' });
    }

    // 3. Lookup Country
    const geo = geoip.lookup(ip);
    const country = geo ? geo.country : null; // Return null if unknown, don't default to US here

    console.log(`[GeoIP API] IP: ${ip}, Country: ${country}`);

    return NextResponse.json({ country: country || 'US', ip });
}
