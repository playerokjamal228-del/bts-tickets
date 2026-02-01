
import { NextResponse } from 'next/server';
import { updateIban, getPaymentConfig } from '@/lib/payment-store';

export async function GET() {
    return NextResponse.json(getPaymentConfig());
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { iban } = body;

        if (!iban || typeof iban !== 'string') {
            return NextResponse.json({ error: "Invalid IBAN provided" }, { status: 400 });
        }

        const config = updateIban(iban);

        return NextResponse.json({ success: true, config });
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
