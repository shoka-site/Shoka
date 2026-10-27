# Sehle Design System

Status: Phase 1 foundation, pending visual sign-off.

Source of truth: `frontend/app/globals.css`. Component usage is demonstrated in
`frontend/components/ui/` and `frontend/components/layout/Section.tsx`.

## 1. Principles

1. Preserve the gold, ivory, and obsidian identity. The redesign changes the
   system, not the brand.
2. Use semantic tokens, not raw colors. A component should describe intent
   (`bg-surface`, `text-muted-foreground`) rather than a hex value.
3. Design light and dark together. Both themes are first-class.
4. Arabic is a connected script. Never add letter-spacing to Arabic text.
5. Motion must be purposeful and must respect `prefers-reduced-motion`.
6. Accessibility is a release condition, not a later pass.

## 2. Color Tokens

The light theme uses a darker Ur gold so normal text clears WCAG AA. `--gold`
remains the brighter decorative accent and must not be used for normal text on
light backgrounds.

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `background` | `#faf9f7` | `#000000` | Page canvas |
| `foreground` | `#1e1c1a` | `#ffffff` | Primary text |
| `card` | `#ffffff` | `#0d0d0d` | Cards and raised content |
| `surface` | `#f6f4f1` | `#0a0a0a` | Alternate page bands |
| `surface-raised` | `#ffffff` | `#0f0f0f` | Raised panels |
| `surface-strong` | `#ece9e4` | `#1a1a1a` | Strong secondary fills |
| `primary` | `#8b6a1d` | `#bfa25f` | Primary actions and accents |
| `primary-foreground` | `#ffffff` | `#000000` | Text/icons on primary |
| `primary-hover` | `#745816` | `#c8af74` | Hover state |
| `primary-active` | `#674e14` | `#ceb783` | Pressed state |
| `primary-subtle` | `#faf4e5` | `#282215` | Tinted surfaces |
| `primary-subtle-foreground` | `#654d15` | `#d3c092` | Text on tinted surfaces |
| `primary-border` | gold 28% | gold 30% | Tinted borders |
| `secondary` | `#ece9e4` | `#1a1a1a` | Secondary buttons/fills |
| `secondary-foreground` | `#322e29` | `#cccccc` | Text on secondary |
| `accent` | `#f1ede4` | `#2b271d` | Hover fills and active rows |
| `accent-foreground` | `#654d15` | `#d3c092` | Text on accent |
| `gold` | `#bfa25f` | `#bfa25f` | Decorative gold only |
| `gold-soft` | `#f0e7d1` | `#3c3320` | Decorative gold surface |
| `muted` | `#f1efec` | `#141414` | Muted fills |
| `muted-foreground` | `#5e5750` | `#858585` | Secondary text |
| `content-secondary` | `#4d4742` | `#adadad` | Important secondary text |
| `destructive` | `#a51d1d` | `#da2b2b` | Destructive actions/errors |
| `success` | `#206f4a` | `#6bc79c` | Success |
| `warning` | `#814b0e` | `#edb75a` | Warning |
| `info` | `#1b557e` | `#70b2e1` | Information |
| `border` | gold 20% | gold 15% | Default borders |
| `border-strong` | gold 38% | gold 28% | Strong borders |
| `input` | `#938976` | `#7e7767` | Form field borders |
| `ring` | `#7e601b` | `#bfa25f` | Focus ring |

Core verified contrast ratios:

| Pair | Light | Dark |
| --- | --- | --- |
| `foreground` / `background` | 16.14:1 | 21.00:1 |
| `primary` / `background` | 4.78:1 | 8.55:1 |
| `primary` / `card` | 5.03:1 | 7.91:1 |
| `muted-foreground` / `background` | 6.75:1 | 5.69:1 |
| `muted-foreground` / `card` | 7.11:1 | 5.27:1 |

All normal-text token pairs in `frontend/tests/design-tokens.test.ts` meet WCAG
AA (4.5:1), and the focus ring meets 3:1 against the page background.

## 3. Typography

Cairo remains the only family, loaded from `next/font/google` as a variable
font (`wght` 200-1000). This covers the existing `font-medium` and
`font-black` usage without synthetic weights or multiple static files.

Use the type classes rather than assembling font sizes manually:

| Class | Size | Weight | Use |
| --- | --- | --- | --- |
| `type-hero` | `clamp(2.6rem, 1.8rem + 3.4vw, 4.75rem)` | 700 | Homepage-only hero |
| `type-page-title` | `clamp(2.1rem, 1.5rem + 2.4vw, 3.5rem)` | 700 | One `h1` per page |
| `type-section-title` | `clamp(1.75rem, 1.4rem + 1.4vw, 2.625rem)` | 700 | Section `h2` |
| `type-card-title` | `clamp(1.125rem, 1rem + 0.3vw, 1.375rem)` | 600 | Card headings |
| `type-body` | `1rem` / 1.75 | 400 | Body copy |
| `type-support` | `0.9375rem` / 1.7 | 400 | Supporting copy |
| `type-nav` | `0.875rem` / 1.4 | 600 | Navigation, buttons, form labels |
| `type-label` | `0.75rem` / 1.4 | 600 | Uppercase eyebrow labels |
| `type-meta` | `0.75rem` / 1.5 | 400 | Dates, counts, metadata |

Heading rules:

- One `h1` per page. Use `type-page-title`.
- Do not skip heading levels.
- Arabic headings use a global `line-height: 1.35` and no letter-spacing.
- `.type-label` drops uppercase and letter-spacing in RTL.
- Body line length is capped with `--measure-prose` (68ch).

## 4. Layout and Spacing

- `.container-page`: max width `80rem`, fluid gutter `clamp(1rem, 4vw, 3rem)`.
- `.section-space`: vertical rhythm `clamp(3.5rem, 6vw, 7rem)`.
- `.section-space-compact`: `clamp(2.5rem, 4.5vw, 4.5rem)`.
- `--measure-prose`: 68ch.
- `--measure-heading`: 28ch.

`Section` now owns the container, so page code should not add another
`container mx-auto px-*`.

## 5. Radii, Elevation, and Motion

Radii: `rounded-xs` (4px), `rounded-sm` (6px), `rounded-md` (8px),
`rounded-lg` (12px), `rounded-xl` (16px), `rounded-2xl` (24px),
`rounded-3xl` (32px), `rounded-card` (16px), `rounded-panel` (24px),
`rounded-pill` (9999px).

Elevation: `shadow-xs`, `shadow-sm`, `shadow-md`, `shadow-lg`, `shadow-xl`,
and `shadow-focus`. Prefer one elevation level per surface; do not stack
multiple arbitrary shadows.

Motion:

- Durations: `--motion-duration-fast` (150ms), `--motion-duration-base`
  (240ms), `--motion-duration-slow` (400ms).
- Easing: `--motion-ease-standard`, `--motion-ease-emphasized`,
  `--motion-ease-exit`.
- `.transition-ui` is the default transition utility.
- Framer Motion is globally wrapped in `MotionConfig reducedMotion="user"`.
- CSS animations and transitions are disabled under
  `prefers-reduced-motion: reduce`.
- Never rely on motion alone to communicate state.

## 6. Shared Components

| Component | Location | Notes |
| --- | --- | --- |
| `Container` | `components/ui/container.tsx` | Applies `.container-page` |
| `Section` | `components/layout/Section.tsx` | Background, spacing, container |
| `SectionHeading` | `components/ui/section-heading.tsx` | Eyebrow, heading, description |
| `Eyebrow` | `components/ui/eyebrow.tsx` | `type-label`, primary color |
| `Button` | `components/ui/button.tsx` | Default, destructive, outline, secondary, ghost, link |
| `Badge` | `components/ui/badge.tsx` | Default, secondary, outline, destructive, success, warning, info |
| `Card` | `components/ui/card.tsx` | Default, raised, subtle, outline |
| `Input` | `components/ui/input.tsx` | 44px mobile height, 2px focus ring |
| `Textarea` | `components/ui/textarea.tsx` | 2px focus ring |
| `Label` | `components/ui/label.tsx` | `type-nav` |

Component rules:

- Buttons use `type-nav`, `focus-ring`, and `transition-ui`.
- Icon-only buttons need an `aria-label` and at least a 44px target.
- Form controls must be associated with a `<Label>` and expose validation
  through `aria-invalid`.
- Cards use tokenized radii, borders, and elevation. Avoid one-off shadows.
- Badges are static labels. Do not attach hover styles to a non-interactive
  badge.

## 7. Migration Map

Use this map when touching existing components:

| Legacy | Replace with |
| --- | --- |
| `bg-[#c2a45c]`, `text-[#c2a45c]` | `bg-primary`, `text-primary`; `gold` only for decoration |
| `text-white/60`, `text-white/50` | `text-muted-foreground` or `text-content-secondary` |
| `bg-white/5`, `bg-white/10` | `bg-surface`, `bg-surface-strong` |
| `rounded-[32px]`, `rounded-3xl` on cards | `rounded-card` / `rounded-panel` |
| Arbitrary `shadow-[...]` | `shadow-xs` through `shadow-xl` |
| `container mx-auto px-4 sm:px-6 md:px-12` | `container-page` |
| `focus:outline-none` without replacement | `focus-ring` |
| `transition-all` | `transition-ui` |
| `bg-black`, `text-white` in sections | `bg-background`, `text-foreground` |

This is an incremental migration. Legacy hardcoded values remain in untouched
pages until their phase; do not copy them into new work.

## 8. Accessibility and RTL

- WCAG 2.1 AA is the minimum for text and interactive controls.
- Every focusable element must have a visible focus indicator.
- Use semantic HTML: `button`, `a`, `nav`, `main`, `section`, headings.
- Do not remove focus outlines without a tokenized replacement.
- A global fallback gives legacy links, buttons, summaries, and form controls a
  2px `--ring` outline at 3px offset, so controls that still carry
  `focus-visible:outline-none` cannot become keyboard-invisible. Opt into
  `.focus-ring` for the tokenized box-shadow treatment.
- Focus indicators must appear immediately. Avoid `transition-all` on
  interactive elements; use `transition-ui`, which does not animate
  `outline-width` or `outline-offset`.
- Keep touch targets at least 44px for primary mobile actions.
- Use logical properties (`ms-*`, `me-*`, `ps-*`, `pe-*`, `start`, `end`) where
  possible.
- Arabic letter-spacing is forced to zero globally; do not re-enable it.
- Test both themes and both directions at 360px, 768px, and 1440px.

## 9. Known Exceptions

- Mesopotamian SVG background patterns encode gold as `#c2a45c` because
  data-URI SVG cannot read CSS custom properties. This value must stay in sync
  with `--gold-rgb` (`194, 164, 92`).
- `--gold` is intentionally brighter than `--primary` in light mode and is
  not AA-safe for normal text on ivory.
- Legacy pages still contain hardcoded colors and arbitrary spacing. They are
  migration targets, not precedent.

## 10. Governance

- Add new tokens to `globals.css` and document them here before use.
- A component may not introduce a new color, radius, shadow, or duration
  without a token.
- Run `npm run lint`, `npx tsc --noEmit`, `npm test`, and `npm run build` from
  `frontend/` before marking a phase complete.
- Update the contrast test when adding a text/background token pair.
