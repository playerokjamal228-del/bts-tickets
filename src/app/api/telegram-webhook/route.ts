
import { NextResponse } from 'next/server';
import { getPaymentConfig, savePaymentConfig } from '@/lib/payment-store';

// Helper to identify payment details in text
function parsePaymentDetails(text: string) {
    const lines = text.replace('/iban', '').split('\n').map(l => l.trim()).filter(l => l.length > 0);
    const updates: any = {};

    // Regex Patterns
    // IBAN: Starts with 2 letters, followed by 2 digits, then alphanumeric. Length > 15.
    const ibanRegex = /^[A-Z]{2}\d{2}[A-Z0-9\s]{10,32}$/i;
    // BIC: 8 or 11 alphanumeric characters, usually uppercase.
    const bicRegex = /^[A-Z]{4}[A-Z]{2}[A-Z0-9]{2}([A-Z0-9]{3})?$/i;

    let foundIban = false;
    let foundBic = false;

    for (const line of lines) {
        const cleanLine = line.replace(/\s/g, '').toUpperCase();

        // Check IBAN first (most distinct)
        if (!foundIban && cleanLine.length >= 15 && ibanRegex.test(cleanLine)) {
            // Store formatted IBAN (groups of 4)
            updates.iban = cleanLine.match(/.{1,4}/g)?.join(' ') || cleanLine;
            foundIban = true;
            continue;
        }

        // Check BIC
        // Strict check: must be 8 or 11 chars.
        if (!foundBic && (cleanLine.length === 8 || cleanLine.length === 11) && bicRegex.test(cleanLine)) {
            updates.bic = cleanLine;
            foundBic = true;
            continue;
        }

        // Assume Holder Name if not IBAN/BIC and has sufficient length
        // Usually holder name has spaces (First Last), but strict formatting isn't guaranteed.
        // We take the first "unknown" line as Holder.
        if (!updates.holder && line.length > 3) {
            updates.holder = line;
        }
    }

    return updates;
}

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

async function sendTelegramMessage(chatId: number, text: string) {
    if (!TELEGRAM_BOT_TOKEN) return;

    try {
        await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: text,
                parse_mode: 'Markdown'
            })
        });
    } catch (e) {
        console.error("Failed to send Telegram message", e);
    }
}

export async function POST(request: Request) {
    try {
        const update = await request.json();

        // Log for debugging
        console.log("Telegram Update:", JSON.stringify(update));

        if (!update.message || !update.message.text) {
            return NextResponse.json({ ok: true });
        }

        const chatId = update.message.chat.id;
        const text = update.message.text.trim();

        // Command: /iban [multiline text] OR just raw text containing IBAN
        // We check if it starts with /iban OR if it looks like it contains payment info
        const isIbanCommand = text.startsWith('/iban');
        const isWhatsAppCommand = text.startsWith('/whatsapp');

        if (isIbanCommand) {
            const updates = parsePaymentDetails(text);

            if (!updates.iban && !updates.bic && !updates.holder) {
                await sendTelegramMessage(chatId, `⚠️ **Usage:**\n\`/iban [Holder]\n[IBAN]\n[BIC]\`\n\nYou can paste the details in any order.`);
                return NextResponse.json({ ok: true });
            }

            // If BIC is present but Bank Name isn't explicitly known, we can clear it or set generic
            // For now we just update what we found.
            // If parsed data contains BIC, we might want to reset 'bankName' to 'Bank Transfer' 
            // to avoid mismatch with old "Commerzbank" value.
            if (updates.iban || updates.bic) {
                updates.bankName = updates.bic ? "Bank Transfer" : "Bank Transfer";
            }

            const config = savePaymentConfig(updates);

            let msg = `✅ **Payment Details Updated!**\n`;
            if (updates.holder) msg += `\n👤 Holder: \`${config.holder}\``;
            if (updates.iban) msg += `\n💳 IBAN: \`${config.iban}\``;
            if (updates.bic) msg += `\n🏦 BIC: \`${config.bic}\``;

            await sendTelegramMessage(chatId, msg);
        }
        else if (isWhatsAppCommand) {
            const newNumber = text.replace('/whatsapp', '').trim();

            if (!newNumber || newNumber.length < 5) {
                const current = getPaymentConfig();
                await sendTelegramMessage(chatId, `📱 **Current WhatsApp:** ${current.whatsapp}\n\n**Usage:**\n\`/whatsapp +49 123 456 7890\``);
                return NextResponse.json({ ok: true });
            }

            const config = savePaymentConfig({ whatsapp: newNumber });
            await sendTelegramMessage(chatId, `✅ **WhatsApp Updated!**\n\n📱 New Number: \`${config.whatsapp}\``);
        }
        else if (text === '/status') {
            const current = getPaymentConfig();
            await sendTelegramMessage(chatId, `📊 **Current Settings**\n\n👤 Holder: ${current.holder}\n💳 IBAN: \`${current.iban}\`\n🏦 BIC: \`${current.bic || "N/A"}\`\n📱 WhatsApp: ${current.whatsapp || "Not set"}\n💰 PayPal: ${current.paypalUsername || "Not set"}\n\nLast Updated: ${new Date(current.updatedAt).toLocaleString()}`);
        }
        else if (text.startsWith('/paypal')) {
            const newUsername = text.replace('/paypal', '').trim();

            if (!newUsername || newUsername.length < 3) {
                const current = getPaymentConfig();
                await sendTelegramMessage(chatId, `💰 **Current PayPal:** ${current.paypalUsername}\n\n**Usage:**\n\`/paypal YourPayPalUsername\`\n\nThis will create link: paypal.me/YourPayPalUsername`);
                return NextResponse.json({ ok: true });
            }

            const config = savePaymentConfig({ paypalUsername: newUsername });
            await sendTelegramMessage(chatId, `✅ **PayPal Updated!**\n\n💰 Username: \`${config.paypalUsername}\`\n🔗 Link: paypal.me/${config.paypalUsername}`);
        }
        else if (text === '/start') {
            await sendTelegramMessage(chatId, `👋 **BTS Admin Bot**\n\n**Commands:**\n• \`/iban\` - Update payment details\n• \`/whatsapp +XX XXX XXX\` - Update WhatsApp\n• \`/paypal Username\` - Update PayPal.me link\n• \`/status\` - View current settings`);
        }

        return NextResponse.json({ ok: true });
    } catch (error) {
        console.error("Webhook error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

