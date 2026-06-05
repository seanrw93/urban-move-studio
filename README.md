# Urban Move Studio — Website

A multi-page marketing website for Sofia Marchand, a hip-hop and urban dance instructor based in Puteaux, France. Visitors can browse courses, view detailed class descriptions, and register online through an embedded Jotform form.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build tool | Vite 8 |
| Routing | React Router v7 |
| Styling | SCSS (Sass) |
| Registration embed | Jotform (iframe) |
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
│   └── organisms/      # Navbar, Hero, Pricing, Footer, JotformModal, Layout…
├── hooks/
│   └── useRevealAnimation.ts   # Intersection Observer scroll animations
├── pages/
│   ├── HomePage/       # All homepage sections
│   ├── PrestationsPage/# Per-course editorial page
│   └── InscriptionPage/# Registration catalog + Jotform modal
├── styles/
│   ├── _reset.scss
│   ├── _typography.scss
│   ├── _variables.scss
│   ├── _pages.scss
│   └── main.scss
├── App.tsx             # BrowserRouter + route definitions
└── main.tsx

public/
├── favicon.svg
└── gallery images (WebP/GIF)
```

Components follow the atomic design pattern: atoms → molecules → organisms. Pages compose organisms; shared chrome (Navbar + Footer) lives in the `Layout` organism rendered by the parent route.

---

## Pages & Routes

| Route | Component | Description |
|---|---|---|
| `/` | `HomePage` | Hero, How It Works, About, Pricing, Testimonials, Gallery, Contact |
| `/prestations` | `PrestationsPage` | Full editorial detail for all 5 courses with alternating image/text layout |
| `/inscription` | `InscriptionPage` | Filterable course catalog, Jotform registration modal, pricing reminder |

---

## Courses

| Course | Schedule | Level | Public |
|---|---|---|---|
| Hip-Hop Débutants | Lundi 18h00 – 18h45 | Débutant | Adultes 18+ |
| Hip-Hop Intermédiaire | Lundi 19h00 – 19h45 | Intermédiaire | Adultes 18+ |
| Hip-Hop Avancé | Samedi 11h00 – 11h45 | Avancé | Adultes 18+ |
| Urban Dance Adultes | Samedi 10h00 – 10h45 | Débutant | Adultes 18+ |
| Urban Dance Ados | Mercredi 17h00 – 17h45 | Débutant | Ados 12–17 ans |

---

## Pricing

| Package | Price |
|---|---|
| Cours Découverte | €25 la séance |
| Forfait Mensuel | €80 / mois (4 cours) |
| Forfait Semestriel | €280 / semestre (20 cours) |

Règlement par virement bancaire, chèque ou espèces. Paiement en 3 fois par chèque possible pour le forfait semestriel. Cotisation annuelle : 20€. Certificat médical de moins de 3 mois requis à l'inscription.

---

## Jotform Integration

Registration is handled through a `JotformModal` component that embeds a Jotform form in an iframe. The form ID is read from the `VITE_JOTFORM_FORM_ID` environment variable.

URL parameters are used to pre-fill the form:

| Param | Jotform field | Example value |
|---|---|---|
| `q14_dropdown12` | Cours choisi | `Hip-Hop Débutants — Lundi 18h00` |
| `q15_dropdown13` | Forfait souhaité | `Forfait Mensuel — 4 cours/mois — 80€/mois` |

The modal supports:
- Course and forfait pre-selection from any CTA across the site
- `key={src}` on the iframe so it remounts cleanly when the selection changes
- Escape key and backdrop click to close
- Body scroll lock while open
- Focus trapping (close button focused on open)
- ARIA roles (`role="dialog"`, `aria-modal`)

The `/inscription` page reads `?cours=` from the URL on mount, scrolls to and highlights the matching course card, then opens the modal after a 300 ms delay.

---

## Design System

- **Primary background:** `#1e1b18` (dark warm brown)
- **Accent:** `#f5e642` (yellow) — CTAs, highlights, active nav links
- **Typefaces:** Barlow Condensed (headings), Inter (body)
- **Breakpoints:** 375px / 768px / 1280px / 1440px
- **Transitions:** 0.15s (fast) / 0.25s (base) / 0.4s (slow)

---

## Environment Variables

```bash
# .env
VITE_JOTFORM_FORM_ID=261552457384059
```

Copy `.env.example` to `.env` and replace the placeholder with your Jotform form ID.

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

## Limitations

- **Test project.** This site was built as a demo/prototype and is not in production.
- **Jotform form is a placeholder.** The form ID in `.env` points to a development Jotform form. Stripe payment is handled inside the Jotform form itself (test mode); no separate payment step has been built outside of it.
- **Contact form is simulated.** The form in the Contact section manages a sent/error UI state locally but does not submit to any backend or email service.
- **No backend.** The site is entirely static. There is no server, database, or authentication layer.
