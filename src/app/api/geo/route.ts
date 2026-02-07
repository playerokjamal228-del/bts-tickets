
import { NextResponse } from 'next/server';
import geoip from 'geoip-lite';

export async function GET(request: Request) {
    // 1. Get IP from headers (x-forwarded-for is standard for proxies/load balancers)
    const forwardedFor = request.headers.get('x-forwarded-for');
    let ip = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1';

    // 2. Handle localhost/internal IPs for testing
    if (ip === '::1' || ip === '127.0.0.1') {
        // Default to Germany for local testing, or change to test other countries
        // ip = '46.114.35.120'; // Example German IP
        // ip = '8.8.8.8'; // Example US IP
        return NextResponse.json({ country: 'DE', ip: '127.0.0.1' });
    }

    // 3. Lookup Country
    const geo = geoip.lookup(ip);
    const country = geo ? geo.country : 'US'; // Default to US/International if unknown

    return NextResponse.json({ country, ip });
}
