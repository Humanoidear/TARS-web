# Repository Guidelines

## Project Structure & Module Organization
- `src/pages/` holds route files; dynamic posts live in `src/pages/work/[slug].astro`, plus `team/` and `404.astro`.
- Shared UI lives in `src/components/` (buttons, header/footer, team, threejs), layouts in `src/layouts/Layout.astro`.
- Integrations and helpers reside in `src/lib/` (`contentful.ts` sets the Contentful client).
- Static assets are served from `public/`. Build/runtime config sits in `astro.config.mjs`, `tailwind.config.mjs`, and `tsconfig.json`.

## Build, Test, and Development Commands
- `npm install` — install dependencies.
- `npm run dev` (alias: `npm start`) — run Astro dev server with live reload.
- `npm run build` — run `astro check` then produce the production build in `dist/`.
- `npm run preview` — serve the built site locally to verify the production bundle.

## Coding Style & Naming Conventions
- Use Astro with TypeScript; prefer 2-space indentation and trailing commas where sensible (match existing files).
- Components/layouts use PascalCase filenames (`Button.astro`, `Layout.astro`); route files mirror their URL (`work/[slug].astro`).
- Favor Tailwind utility classes; keep custom CSS co-located in the same `.astro` file when minimal.
- Keep props small and typed; reuse helpers from `src/lib/` rather than duplicating client setup.

## Testing Guidelines
- No automated test suite exists yet; rely on `npm run build` (includes `astro check`) for static analysis.
- Before merging, run `npm run preview` and click critical flows (home, work detail, team) to catch rendering or data issues.
- If adding tests, align names to the route/component under test (e.g., `work-slug.spec.ts`).

## Commit & Pull Request Guidelines
- Write concise, present-tense commits (e.g., `Add hero CTA animation`, `Fix Contentful slug lookup`); include scope if helpful.
- PRs should describe user-facing changes, note configs/env vars touched, and list local checks run.
- Link related issues and add screenshots/GIFs for visible UI changes (home, work pages, navigation).

## Configuration & Secrets
- Contentful requires `CONTENTFUL_SPACE_ID`, `CONTENTFUL_PREVIEW_TOKEN`, and `CONTENTFUL_DELIVERY_TOKEN`; preview token is used in dev, delivery in prod.
- Keep secrets out of commits; rely on `.env` files not tracked by Git and environment settings in deployment.
