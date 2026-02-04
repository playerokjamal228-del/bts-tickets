
import fs from 'fs';
import path from 'path';

// Use dedicated config directory for Docker volume persistence
const CONFIG_DIR = process.env.NODE_ENV === 'production' ? '/app/config' : process.cwd();
const DATA_FILE = path.join(CONFIG_DIR, 'payment-data.json');

export interface PaymentConfig {
    iban: string;
    bic: string;
    bankName: string;
    holder: string;
    whatsapp: string;
    paypalUsername: string;
    updatedAt: string;
}

const DEFAULT_CONFIG: PaymentConfig = {
    iban: "DE89 3700 1000 2889 1100 22",
    bic: "COBA DE FF XXX",
    bankName: "Commerzbank AG",
    holder: "BTS Tour 2026 Admin",
    whatsapp: "+49 123 456 7890",
    paypalUsername: "BTSTickets2026",
    updatedAt: new Date().toISOString()
};

export function getPaymentConfig(): PaymentConfig {
    try {
        if (!fs.existsSync(DATA_FILE)) {
            savePaymentConfig(DEFAULT_CONFIG);
            return DEFAULT_CONFIG;
        }
        const data = fs.readFileSync(DATA_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Failed to read payment config:", error);
        return DEFAULT_CONFIG;
    }
}

export function savePaymentConfig(config: Partial<PaymentConfig>): PaymentConfig {
    const current = getPaymentConfig();
    const newConfig = {
        ...current,
        ...config,
        updatedAt: new Date().toISOString()
    };

    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(newConfig, null, 2));
    } catch (error) {
        console.error("Failed to save payment config:", error);
    }

    return newConfig;
}

export function updateIban(newIban: string): PaymentConfig {
    // Basic formatting
    const formatted = newIban.replace(/\s/g, '').match(/.{1,4}/g)?.join(' ') || newIban;
    return savePaymentConfig({ iban: formatted });
}
