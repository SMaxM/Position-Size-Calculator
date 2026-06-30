# BTC Position Size Calculator v2

A mobile-first Bitcoin position size calculator with Long & Short support.

## What's New in v2
- ▲ Long / ▼ Short direction toggle
- Stop loss auto-fills yesterday's LOW for long, yesterday's HIGH for short
- Trade ladder flips layout based on direction
- Validation checks correct SL placement per direction
- Button and badge colours reflect current direction

## Features
- Live BTC/USD price from Binance API
- Configurable risk % and take profit (R-multiple, default 1.5R)
- Visual trade ladder (TP → Entry → SL)
- PWA-ready: installable on iOS home screen

## Deploy on iOS (PWA — No App Store needed)

### Option 1: Netlify Drop (Free, ~1 min)
1. Go to https://app.netlify.com/drop
2. Drag & drop the entire `btc-calculator-v2` folder
3. Open the generated URL in Safari on your iPhone
4. Tap Share → "Add to Home Screen" ✅

### Option 2: Vercel (Free)
1. npm i -g vercel
2. Run `vercel` inside this folder
3. Open the URL in Safari → Add to Home Screen

### Option 3: Native iOS via Capacitor
1. npm install @capacitor/core @capacitor/ios
2. npx cap init → npx cap add ios
3. Copy files into www/ folder
4. npx cap open ios → build in Xcode

## Calculation Logic
| Field        | Formula |
|---|---|
| Money at Risk | Balance × Risk% |
| Stop Distance | abs(Entry − Stop Loss) |
| Lot Size (BTC) | Money at Risk ÷ Stop Distance |
| TP Price (Long) | Entry + (Stop Distance × R) |
| TP Price (Short) | Entry − (Stop Distance × R) |
| Potential Profit | Money at Risk × R |

## Default Values
| Field | Default |
|---|---|
| Direction | Long |
| Open Price | Live from Binance |
| Stop Loss (Long) | Yesterday's daily low |
| Stop Loss (Short) | Yesterday's daily high |
| Account Balance | $10,000 |
| Risk | 0.5% |
| Take Profit | 1.5R |
