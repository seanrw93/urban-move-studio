# Sofia Marchand Dance Studio — Website

A single-page marketing website for Sofia Marchand, a hip-hop and urban dance instructor based in Puteaux, France. The site lets visitors learn about the instructor, browse pricing packages, and book classes directly through an embedded Cal.com calendar.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build tool | Vite 8 |
| Styling | SCSS (Sass) |
| Booking embed | @calcom/embed-react |
| Icons | lucide-react, react-icons |
| Testing | Playwright |
| Image processing (scripts) | sharp, fluent-ffmpeg |

---

## Project Structure

```
src/
├── components/
│   ├── atoms/          # Button, StarRating, StepNumber, Tag
│   ├── molecules/      # NavLink, PricingCard, StepItem, TestimonialCard
│   └── organisms/      # Full page sections (Hero, Navbar, Pricing, etc.)
├── hooks/
│   └── useRevealAnimation.ts   # Intersection Observer scroll animations
├── styles/
│   ├── _reset.scss
│   ├── _typography.scss
│   ├── _variables.scss
│   └── main.scss
├── App.tsx
└── main.tsx

public/
├── favicon.svg
├── icons.svg
└── gallery images (WebP/GIF)
```

Components follow the atomic design pattern: atoms → molecules → organisms.

---

## Sections

| Section | Description |
|---|---|
| Navbar | Sticky header, smooth-scroll anchor links, mobile hamburger menu |
| Hero | Auto-rotating image carousel, main CTA |
| How It Works | 3-step process walkthrough |
| About | Instructor bio and career stats |
| Pricing | Three package tiers with feature lists |
| Booking Modal | Cal.com embed triggered from Pricing or Navbar |
| Testimonials | Student quotes with star ratings |
| Gallery | Masonry-style image grid with Instagram link |
| Contact | Contact details and message form |
| Footer | Site map, address, copyright |

---

## Pricing Packages

| Package | Price | Booking Slug |
|---|---|---|
| Cours Découverte | €25 | `sean-9j3ps6/cours-decouverte` |
| Forfait Mensuel | €80/month | `sean-9j3ps6/forfait-mensuel` |
| Forfait Semestriel | €280/6 months | `sean-9j3ps6/forfait-semestriel` |

Clicking a pricing card pre-selects the corresponding Cal.com booking link in the modal.

---

## Design System

- **Primary background:** `#1e1b18` (dark warm brown)
- **Accent:** `#f5e642` (yellow) — used for CTAs and highlights
- **Typefaces:** Barlow Condensed (headings), Inter (body)
- **Breakpoints:** 375px / 768px / 1280px / 1440px
- **Transitions:** 0.15s (fast) / 0.25s (base) / 0.4s (slow)

---

## Getting Started

```bash
npm install
npm run dev       # start dev server with HMR
npm run build     # TypeScript compile + Vite bundle
npm run preview   # preview production build
npm run lint      # ESLint
```

---

## Cal.com Integration

Booking is handled entirely through an embedded Cal.com iframe. The `BookingModal` component calls `getCalApi()` to configure the embed (dark theme, yellow brand color) and appends `?locale=fr` to the booking URL to force the French locale.

The modal supports:
- Package pre-selection passed from pricing cards
- Escape key and backdrop click to close
- Focus trapping and body scroll lock while open
- Proper ARIA roles (`role="dialog"`, `aria-modal`)

---

## Limitations

- **Test project.** This site was built as a demo/prototype and is not in production.
- **Stripe payments not implemented.** The intended user flow includes a Stripe checkout step after the Cal.com booking (to collect payment for the selected package). This flow is implied by the pricing structure but has not been built out, as doing so requires a legitimate live Stripe account and associated business verification. The Cal.com booking step currently stands alone without a payment gate.
- **Contact form is simulated.** The form in the Contact section manages a sent/error UI state locally but does not submit to any backend or email service.
- **No backend.** The site is entirely static. There is no server, database, or authentication layer.
- **Cal.com account is a test account.** The booking slugs (`sean-9j3ps6/...`) point to a development Cal.com account and are not connected to a real schedule.
