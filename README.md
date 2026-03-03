# Karin & Jan — Wedding Website

A modern, animated wedding website for Karin & Jan. Guests can browse event details, view the seating arrangement, explore the photo gallery, and upload their own photos.

[wedding.janblazej.dev](https://wedding.janblazej.dev)

## Tech Stack

- **Framework** — Next.js 16 (App Router)
- **Language** — TypeScript
- **Styling** — Tailwind CSS 4
- **Animations** — GSAP
- **Backend** — Supabase
- **Linting** — Biome

## Getting Started

```bash
yarn
yarn dev
```

The app will run at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/                  # Next.js App Router
│   ├── (home)/           # Homepage route group
│   ├── photos/           # Photos page
│   ├── layout.tsx        # Root layout
│   └── app.css           # Global styles
├── components/           # React components
│   └── ui/               # Reusable UI primitives
├── hooks/                # Custom React hooks
├── lib/                  # Libraries & configs
└── utils/                # Utility functions
public/
├── jpg/                  # Image assets
├── png/                  # PNG assets (OG image, etc.)
└── svg/                  # SVG icons
```
