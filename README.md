# BTC Position Size Calculator

A mobile-first Bitcoin position size calculator styled as a native iOS app.

## Features
- Live BTC/USD price from Binance API
- Auto-fills yesterday's low as stop loss
- Configurable risk % and take profit (R-multiple)
- Visual trade ladder (TP → Entry → SL)
- PWA-ready (installable on iOS home screen)

## Deploy on iOS (PWA — No App Store needed)

### Option 1: Host on Netlify (Free, ~2 min)
1. Go to [netlify.com/drop](https://app.netlify.com/drop)
2. Drag & drop the entire `btc-calculator` folder
3. Netlify gives you a live URL (e.g. `https://amazing-name-123.netlify.app`)
4. Open that URL in **Safari** on your iPhone
5. Tap the **Share** button → **"Add to Home Screen"**
6. App installs like a native app with no App Store needed ✅

### Option 2: Host on Vercel (Free)
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` inside this folder
3. Follow prompts — get a live URL
4. Add to iPhone home screen via Safari

### Option 3: Native iOS App (Xcode)
For a proper App Store submission:
1. Install [Capacitor](https://capacitorjs.com): `npm install @capacitor/core @capacitor/ios`
2. `npx cap init` → `npx cap add ios`
3. Copy files into `www/` folder
4. `npx cap open ios` — opens Xcode
5. Build & submit via Xcode

## Default Values
| Field | Default |
|-------|---------|
| Instrument | BTC/USD |
| Open Price | Live from Binance |
| Stop Loss | Yesterday's daily low |
| Account Balance | $10,000 |
| Risk | 0.5% |
| Take Profit | 1.5R |

## Calculation Logic
- **Money at Risk** = Balance × Risk%
- **BTC Lot Size** = Money at Risk ÷ (Entry − Stop Loss)
- **Take Profit Price** = Entry + (Stop Distance × R)
- **Potential Profit** = Money at Risk × R
