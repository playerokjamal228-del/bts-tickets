# BTS Europe Tour 2026 - Ticket Website

Premium ticket booking platform for the BTS 2026 European Tour.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## ⚙️ Configuration

### Telegram Bot (Payment Management)
1. Create bot via @BotFather on Telegram
2. Add to `.env.local`:
   ```
   TELEGRAM_BOT_TOKEN=your_token_here
   ```
3. After deployment, set webhook:
   ```
   https://api.telegram.org/bot<TOKEN>/setWebhook?url=https://YOUR-DOMAIN/api/telegram-webhook
   ```

### Bot Commands
| Command | Description |
|---------|-------------|
| `/status` | View current IBAN & WhatsApp |
| `/iban` | Update bank details |
| `/whatsapp +XX XXX` | Update WhatsApp number |

### Updating IBAN
```
/iban
Holder Name
DE89370400440532013000
COBADEFFXXX
```

### Updating WhatsApp
```
/whatsapp +49 123 456 7890
```

## 💳 Payment Methods

- **Card** - External payment processor
- **IBAN** - Bank transfer (configurable)
- **PayPal** - WhatsApp contact (configurable)

## 📁 Key Files

| File | Purpose |
|------|---------|
| `src/lib/data.ts` | Events & tickets |
| `src/lib/payment-store.ts` | Payment config |
| `payment-data.json` | Stored settings |

## 🌐 Deployment

### Vercel
1. Push to GitHub
2. Import to Vercel
3. Add `TELEGRAM_BOT_TOKEN` env var
4. Deploy
5. Set webhook URL

## 📄 Legal Pages

- `/privacy` - Privacy Policy
- `/terms` - Terms of Service
- `/cookies` - Cookie Policy
- `/refund` - Refund Policy
