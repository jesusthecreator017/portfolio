# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio site for Jesus Gonzalez, built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4. Deployed on Vercel.

## Commands

- `pnpm dev` — start dev server (localhost:3000)
- `pnpm build` — production build
- `pnpm lint` — ESLint (`eslint src/`)
- `pnpm lint:fix` — ESLint with auto-fix
- `pnpm format` — Prettier format all files
- `pnpm format:check` — Prettier check
- `pnpm type-check` — TypeScript check (`tsc --noEmit`)

## Pre-commit Hook

Husky runs `lint-staged` on commit, which auto-fixes ESLint and Prettier on staged `*.{js,jsx,ts,tsx,json,md,css}` files.

## Architecture

Portfolio app using Next.js App Router. All source code lives under `src/`.

- `src/app/` — App Router: `layout.tsx` (fonts, ThemeProvider, header, footer), `page.tsx` (home: hero + 5 sections), `not-found.tsx`, `globals.css`
- `src/components/` — `Header` (client: nav, mobile menu, scroll spy, theme toggle), `FlowField` (client: hero canvas), `Reveal` (client: scroll reveal), plus server components (`Section`, `SectionHead`, `PostCard`, `blocks.tsx`)
- `src/lib/delay.ts` — `--d` stagger helper
- `public/resume.pdf` — lowercase name on purpose (Vercel is case-sensitive)

The `@/*` path alias maps to `./src/*`.

## Key Patterns

- **Tailwind v4 + tokens**: palette lives as CSS vars in `globals.css` (`:root` = dark, `[data-theme='light']` overrides) and is exposed via `@theme inline` (`bg-bg`, `text-fg`, `text-muted`, `border-line`, ...). Use arbitrary rem sizes (`text-[.9375rem]`), not `text-sm`-style names, to keep the design's line-heights. Repeated composites are `@utility` blocks (`wrap`, `mono`, `label`, `hov`, `ld`). Plain CSS in `globals.css` only for what Tailwind cannot express (blueprint grid, canvas mask, scroll-timeline bar, keyframes, `.rv` reveal)
- **Theming**: `next-themes` with `attribute="data-theme"`, dark default, `enableSystem={false}`, `storageKey="jg-theme"`. Never use a `.dark` class; the Tailwind `dark:` variant is a `@custom-variant` on `[data-theme='dark']`
- **Reveal**: `.rv` elements are hidden only under `html.js` (set by an inline head script); `Reveal` adds `.in`
- **Motion**: everything must respect `prefers-reduced-motion` (FlowField draws one static frame)

## Code Style

- Prettier: single quotes, semicolons, 2-space indent, ES5 trailing commas, Tailwind class sorting plugin
- ESLint: Next.js core-web-vitals + TypeScript rules; `@typescript-eslint/no-unused-vars` set to error
- Strict TypeScript (`strict: true`)

## Deployment

- Vercel — image filenames are case-sensitive on Vercel (see commit history)
