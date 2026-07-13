# Juku-Cho (塾)

Landing hub for the Juku brand: practical web apps, poker knowledge, and behind-the-scenes anime industry content.

## Structure

```
.
├── index.html          # Hub / landing page
├── privacy.html        # Site-wide privacy policy (required for AdSense)
├── assets/             # Shared fonts
├── apps/
│   ├── discount/       # Discount Calculator (PWA)
│   ├── currency/       # Travel Currency Converter
│   ├── tuner/          # Guitar Tuner
│   ├── odds/           # OddsSniper
│   └── pot/            # Poker Pot Calculator
├── poker/              # Poker-Juku content
└── anime/              # Anime-Juku content
```

## Deploy

1. Push to a repository and enable **Settings → Pages** (branch `main`, folder `/(root)`).
2. Add your custom domain under **Settings → Pages → Custom domain**.
3. Drop each existing app into its folder under `apps/`.

## Enabling ads

After AdSense approval, edit `AD_CONFIG` at the bottom of `index.html` (and in each app):

```js
const AD_CONFIG = { ENABLED: true, CLIENT: "ca-pub-...", SLOT: "..." };
```
