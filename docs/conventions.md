# Conventions

Single source of truth for how MyPillPal looks and sounds. If a colour or a
type size is not in this file, it does not go in the app.

## Palette: deep teal and warm coral

Clinical but warm. A well designed patient portal, not a hospital corridor and
not a toy. Teal carries trust and calm, coral gives PillPal warmth and marks
the one thing on screen that matters most.

| Token | Light | Dark | Use |
|---|---|---|---|
| `ink` | `#0B1F1C` | `#E8F1EE` | Body text and headings |
| `ink-muted` | `#455957` | `#A3B8B4` | Secondary text, rationale lines |
| `ground` | `#FAF7F2` | `#0B1614` | Page background, warm paper |
| `surface` | `#FFFFFF` | `#132320` | Cards, panels |
| `surface-sunken` | `#F3EFE8` | `#1A2E2A` | Chart tracks, inset wells |
| `border` | `#E2DBD0` | `#28403B` | Decorative hairlines only |
| `border-strong` | `#8E8271` | `#658078` | Control bounds, unselected card edges |
| `primary` | `#0A5F5A` | `#4FC7BA` | Buttons, links, active states, chart bars |
| `primary-hover` | `#084E4A` | `#6BD6CA` | Button hover |
| `primary-mid` | `#0E7A72` | `#2E9E93` | Lowest chart ramp step, non-text |
| `primary-soft` | `#D6EDE9` | `#12403B` | Selected cards, tinted fills |
| `primary-tint` | `#EAF6F4` | `#0F332F` | Section wash, disclosure panels |
| `on-primary` | `#FFFFFF` | `#0B1614` | Text on a primary fill |
| `accent` | `#A8371F` | `#FF9B7A` | Coral text and icons, emphasis |
| `accent-fill` | `#E4633F` | `#FF9B7A` | Mascot, decorative fills only, never text |
| `accent-soft` | `#FBE3DA` | `#3A2119` | Accent tinted panel |
| `risk-low` | `#1A5C42` | `#5FCB9C` | Low risk tier |
| `risk-moderate` | `#7A4200` | `#E7B15C` | Moderate risk tier |
| `risk-elevated` | `#9B2B22` | `#F58174` | Elevated risk tier, top chart band |

### Contrast, measured

Every value was computed with the WCAG relative luminance formula, not
estimated. Ratios against `surface` in each mode:

| Pair | Light | Dark |
|---|---|---|
| `ink` | 17.12 | 14.16 |
| `ink-muted` | 7.45 | 7.81 |
| `border-strong` | 3.76 | 3.81 |
| `primary` | 7.51 | 7.92 |
| `primary-hover` | 9.55 | n/a |
| `primary-mid` | 5.19 | 4.99 |
| `accent` | 6.50 | 7.93 |
| `risk-low` | 7.91 | 8.15 |
| `risk-moderate` | 8.06 | 8.41 |
| `risk-elevated` | 7.60 | 6.42 |
| `on-primary` on `primary` | 7.51 | 8.96 |

Text on the warm `ground` runs slightly lower and still clears AA
comfortably: `ink` 16.02, `ink-muted` 6.97, `primary` 7.02, `accent` 6.08.
Chart fills against the `surface-sunken` track, where the 3:1 non-text
threshold applies: `primary-mid` 4.53 light and 4.38 dark, `primary` 6.55 and
6.95, `risk-elevated` 6.63 and 5.64.

Every text colour clears WCAG AA (4.5:1) and nearly all clear AAA (7:1).
`accent-fill` at 3.41 on white is a fill only. Never set text or a meaningful
icon in it. Use `accent` for those.

`border` at 1.37 is deliberately below 3:1. It is a decorative hairline
between two surfaces, which WCAG does not regulate. Anything communicating the
**bounds of a control** uses `border-strong` at 3.76 instead. Keep this
distinction: it is what makes the custom form controls pass an audit.

### Colour rules

- Risk tiers always pair colour with a text label and an icon. Never encode a
  risk tier in colour alone.
- Coral is an accent, not a second primary. At most one coral element per
  screen, plus the mascot.
- Chart bars use a three step ramp keyed to magnitude at full opacity, not a
  rainbow and not varying opacity: `primary-mid` below 20 percent, `primary`
  from 20 to 39, `risk-elevated` at 40 and above. Risk colours are reserved for
  risk tiers and for that top resistance band, which carries the same meaning.
- Never encode anything in a gradient or a shadow alone. Both are dropped in
  print, so each must be backed by a border, a stroke, or text.
- Do not introduce a new colour without adding it to this table first.

## Typography

Two families, both from Google Fonts, both with a real fallback stack:

```css
--font-display: Fraunces, Georgia, "Times New Roman", serif;
--font-sans: "Public Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
```

Fraunces is the display face: warm, editorial, and distinctly branded, with an
optical size axis so it holds up from 21px to 52px. Public Sans is the text
face, built for public service reading with strong tabular figures. The
fallback for Fraunces is a serif, so a font loading failure still degrades to
serif headings over a sans body rather than to a broken page.

| Role | Size / line height | Weight | Family |
|---|---|---|---|
| Hero, screen 1 title | clamp(34px, 6.4vw + 8px, 52px) / 1.06 | 700 | display |
| Display, screen title | clamp(28px, 4.4vw + 12px, 38px) / 1.12 | 700 | display |
| H2, section | clamp(21px, 1.2vw + 17px, 25px) / 1.25 | 600 | display |
| H3, card title | 18px / 1.35 | 600 | sans |
| Body large, lead | 18px / 1.55 | 400 | sans |
| Body | 16px / 1.6 | 400 | sans |
| Label, buttons and form | 16px / 1.2 | 500 | sans |
| Eyebrow, kickers and chips | 15px / 1.2, 0.08em tracking, uppercase | 600 | sans |
| Stat, big numbers | clamp(30px, 3.6vw + 16px, 44px) / 1.0 | 700 | display |

- **No micro caption text, and no caption tier at all.** There is deliberately
  no size below 15px in this scale. Explanatory copy either matters at body
  size or does not belong on the screen. Do not reintroduce a small size to fit
  more words in: cut the words instead.
- 15px is reserved for the uppercase eyebrow, which is two or three words long
  and legible at that size because of the weight and the tracking. It is a
  designed metadata treatment, never a paragraph.
- Body text never drops below 16px. Our readers include people managing
  medications for elderly relatives.
- Percentages and any number in the resistance charts use
  `font-variant-numeric: tabular-nums` so columns line up.
- Measure caps at roughly 62 characters for long form copy, held with
  `max-w-[62ch]` inside the wider container.

## Spacing, radius, shadow

- Spacing scale in 4px steps: 4, 8, 12, 16, 24, 32, 48, 64.
- Page container is `max-w-5xl` with `px-5 sm:px-8`. Prose keeps its own
  narrower measure inside that, so the wider shell buys grid room for cards and
  charts without producing 1024px wide paragraphs.
- Panel radius 22px. Card radius 16px. Button radius 12px. Control radius 10px.
  Pill and badge radius full.
- Three shadow tokens: `card` for resting cards, `raised` for a lifted or
  hovered card, `popover` for the dropdown only. All three deepen in dark mode,
  where a soft shadow does nothing, and all three are `none` in print.
- Focus ring: 2px `primary` with a 2px offset. Visible on every interactive
  element. Never remove the outline without replacing it.

## Motion

One easing curve, `cubic-bezier(0.22, 1, 0.36, 1)`, and three durations: 120ms
for controls, 220ms for screen and panel transitions, 420ms for data drawing
itself in. No animation library.

- Nothing uses `animation: infinite`. No pulsing, no shimmer, no bouncing
  mascot. A health tool that fidgets reads as unserious, and it is a vestibular
  hazard.
- A global `prefers-reduced-motion` rule collapses every CSS transition and
  animation. Anything driven by JS instead of CSS must check the query itself
  through `usePrefersReducedMotion`, which is why the gauge arc is a CSS
  transition rather than an interpolation loop.
- Motion never gates content. A reader who never sees the animation gets the
  same information in the same place.

## Voice

- Plain language. Aim below average health literacy. Any medical term gets an
  inline gloss the first time it appears.
- Empowering, not frightening. The reader should finish feeling more capable of
  handling their appointment, not more scared of superbugs.
- Second person. "Your risk", "questions you can ask".
- Never phrase output as an instruction to take or avoid a drug. Everything is
  framed as context for a conversation with a doctor.
- **No em dashes or en dashes.** Use a comma, a colon, a full stop, or rewrite.
  Write ranges as "3 to 5". This applies to UI copy, docs, and commit messages.
