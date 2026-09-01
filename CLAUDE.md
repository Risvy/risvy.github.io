# Working on risvy.github.io

Personal academic site of Muhid Hassan Risvy (Ph.D. student, computer science, NJIT). Hand-written HTML, CSS, and vanilla JavaScript on GitHub Pages. No build step, no framework, no Jekyll.

## Owner preferences

These come from the owner and take priority over generic taste. If a request seems to conflict with them, ask before proceeding, because preferences can change.

- Clean, business-formal academic tone. Editorial and print-like rather than app-like.
- No emojis anywhere.
- No all-caps words. Never use `text-transform: uppercase`. Acronyms that are naturally capitalized (NJIT, ACM, SUST, CV, AI) are fine.
- Nothing that looks AI-generated or templated. Avoid: gradient text, purple-blue gradients, glassmorphism, icon-and-card feature grids, pill buttons, hover-lift shadow cards, badges and tags, skill progress bars, dotted timelines, particle or blob backgrounds, tracked uppercase eyebrows, "Hi, I'm" or "Let's connect" copy, dark-mode toggles, Inter or Roboto everywhere.
- Motion should feel like Apple's site: restrained, tied to scrolling, satisfying, never decorative for its own sake. Respect `prefers-reduced-motion`.
- Copy is plain and direct, in the owner's voice. Do not invent facts, dates, or findings. Phrase research framing as questions when the underlying result is not published.
- Photos will be added by the owner over time. Line sketches or SVG diagrams are acceptable when they carry meaning.

## Workflow

1. Make the change.
2. Review the result as a first-time visitor (desktop and mobile widths, console clean) and fix what stands out.
3. Show a quick preview (screenshots).
4. Commit and push only after the owner says yes.

## Conventions

- Fonts: EB Garamond (serif, display and body) from Google Fonts, system sans for small functional labels. The owner rejected Newsreader as a font AI tools reach for; avoid Inter, Fraunces, Instrument Serif, Playfair, and similar for the same reason.
- Body type is large (about 21 px on desktop). Do not shrink it.
- One accent color (deep green). Plain white background; the owner rejected cream or off-white as an AI cliche. Dark palette follows the system setting, no toggle.
- No intro sentence under page titles, and no colophon line in the footer. Pages open directly with content.
- News items: one event per entry, never two in one line. Position changes are phrased as appointments or elections ("Appointed as...", "Elected as...").
- Shared header and footer are duplicated in every page; when you change them, update all pages.
- Update the "Last updated" line in the footer and `sitemap.xml` `lastmod` when content changes.
- Preview locally with the `site` configuration in `.claude/launch.json` (python http.server on port 8734).
- See `MAINTENANCE.md` for how to add news items, publications, photos, and the CV.
