# VYRA — React + Vite + Tailwind

A component-based premium fitness and booking frontend.

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Structure

- `src/components/` — one file per visual section
- `src/data/siteData.js` — editable services, pricing, reviews, and FAQs
- `src/config/business.js` — WhatsApp number and business contact details
- `src/hooks/useReveal.js` — reusable GSAP scroll reveal
- `src/App.jsx` — state and section assembly only
- `src/index.css` — only Tailwind's required import; no custom styling

Every visual style is expressed with Tailwind utility classes directly inside its component.

## Before using it for a real business

1. Replace `whatsappNumber` in `src/config/business.js`. Enter country code + number using digits only. Example: `+91 98765 43210` becomes `919876543210`.
2. Replace the sample address, map, Instagram link, statistics, and testimonials.
3. The booking button opens WhatsApp with a prefilled message. A real booking system would still need availability checking, duplicate-slot protection, a database, confirmations, and an admin view.
4. Replace external Unsplash images with licensed, optimized local WebP/AVIF files.
5. Add the deployed canonical URL and absolute social-card URL to `index.html`.
6. Add accurate `HealthClub`/`LocalBusiness` structured data only after real business details are known.

The footer intentionally labels this version as a portfolio concept so sample claims are not presented as real business claims.
