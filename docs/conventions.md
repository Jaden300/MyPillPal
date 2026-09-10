# Conventions

Single source of truth for how MyPillPal looks and sounds. If a colour or a
type size is not in this file, it does not go in the app.

## Brand colours

The five named colours from the PillPal brand sheet. These are the identity.
They appear literally in the mascot art, the mark, and the favicon.

| Name | Hex | Role in the brand |
|---|---|---|
| Teal | `#4A9FB5` | Primary, the capsule's top half |
| Sky | `#D6EEF4` | Secondary, the capsule's bottom half |
| Amber | `#C47A3A` | Accent, cheeks and highlights |
| Navy | `#1C3D4A` | Text, the eyes |
| Frost | `#F3F8FA` | Background |

Brand Teal is **not** the app's `primary`. At 3.04:1 on white it fails WCAG AA
for text and for button labels. It is used in the mascot art, where it is a
character rather than a UI surface, and as `primary-mid`, where the 3:1 non
text threshold applies. Anything carrying text uses a darkened member of the
same teal family. Sky, Amber, Navy and Frost are used at their exact values.

## Palette: teal and warm amber

Clinical but warm. A well designed patient portal, not a hospital corridor and
not a toy. Teal carries trust and calm, amber gives PillPal warmth and marks
the one thing on screen that matters most.

| Token | Light | Dark | Use |
|---|---|---|---|
| `ink` | `#1C3D4A` | `#E4F1F6` | Body text and headings |
| `ink-muted` | `#4A6570` | `#A6C0CB` | Secondary text, rationale lines |
| `ground` | `#F3F8FA` | `#0D1A20` | Page background |
| `surface` | `#FFFFFF` | `#14262E` | Cards, panels |
| `surface-sunken` | `#E4EFF4` | `#1B303A` | Chart tracks, inset wells |
| `border` | `#DCE8EE` | `#2A424E` | Decorative hairlines only |
| `border-strong` | `#7C8F98` | `#5E7C88` | Control bounds, unselected card edges |
| `primary` | `#17607A` | `#6FC5DC` | Buttons, links, active states, chart bars |
| `primary-hover` | `#15566B` | `#93D7E8` | Button hover |
| `primary-mid` | `#2E7F94` | `#4A9FB5` | Lowest chart ramp step, non-text |
| `primary-soft` | `#D6EEF4` | `#123845` | Selected cards, tinted fills |
| `primary-tint` | `#EAF5F9` | `#0F2A34` | Section wash, disclosure panels |
| `on-primary` | `#FFFFFF` | `#0D1A20` | Text on a primary fill |
| `accent` | `#8F4E1C` | `#E9A45E` | Amber text and icons, emphasis |
| `accent-fill` | `#C47A3A` | `#E9A45E` | Decorative fills only, never text |
| `accent-soft` | `#F7E7D6` | `#33230F` | Accent tinted panel |
| `risk-low` | `#1A5C42` | `#5FCB9C` | Low risk tier |
| `risk-moderate` | `#7A4200` | `#E7B15C` | Moderate risk tier |
| `risk-elevated` | `#9B2B22` | `#F58174` | Elevated risk tier, top chart band |

### Contrast, measured

Every value was computed with the WCAG relative luminance formula, not
estimated. Ratios against `surface` in each mode:

| Pair | Light | Dark |
|---|---|---|
| `ink` | 11.57 | 13.53 |
| `ink-muted` | 6.20 | 8.19 |
| `border-strong` | 3.37 | 3.50 |
| `primary` | 7.02 | 7.94 |
| `primary-hover` | 8.15 | 9.75 |
| `primary-mid` | 4.59 | 5.14 |
| `accent` | 6.41 | 7.38 |
| `risk-low` | 7.91 | 7.81 |
| `risk-moderate` | 8.06 | 8.05 |
| `risk-elevated` | 7.60 | 6.15 |
| `on-primary` on `primary` | 7.02 | 9.02 |

Text on the Frost `ground` runs slightly lower and still clears AA
comfortably: `ink` 10.80, `ink-muted` 5.79, `primary` 6.56, `accent` 5.99,
`risk-low` 7.39, `risk-moderate` 7.53, `risk-elevated` 7.10. Chart fills
against the `surface-sunken` track, where the 3:1 non-text threshold applies:
`primary-mid` 3.92, `primary` 6.00, `risk-elevated` 6.50.

Every text colour clears WCAG AA (4.5:1) and most clear AAA (7:1).
`accent-fill` at 3.39 on white is a fill only. Never set text or a meaningful
icon in it. Use `accent` for those. Brand Teal `#4A9FB5` at 3.04 on white is
likewise never used for text: see the brand colours note above.

`border` at 1.37 is deliberately below 3:1. It is a decorative hairline
between two surfaces, which WCAG does not regulate. Anything communicating the
**bounds of a control** uses `border-strong` at 3.76 instead. Keep this
distinction: it is what makes the custom form controls pass an audit.

### Colour rules

- Risk tiers always pair colour with a text label and an icon. Never encode a
  risk tier in colour alone.
- Amber is an accent, not a second primary. At most one amber element per
  screen, plus the mascot.
- Chart bars use a three step ramp keyed to magnitude at full opacity, not a
  rainbow and not varying opacity: `primary-mid` below 20 percent, `primary`
  from 20 to 39, `risk-elevated` at 40 and above. Risk colours are reserved for
  risk tiers and for that top resistance band, which carries the same meaning.
- Never encode anything in a gradient or a shadow alone. Both are dropped in
  print, so each must be backed by a border, a stroke, or text.
- Do not introduce a new colour without adding it to this table first.

## PillPal, the mascot

Lives in `src/components/PillPal.jsx`. One capsule character drawn on a 200 by
240 viewBox, with 15 poses that share the same body so he stays recognisably
himself from screen to screen.

`waving`, `thumbsUp`, `holdingClipboard`, `pointing`, `thinking`, `reading`,
`talking`, `reassuring`, `celebrating`, `shrugging`, `sitting`, `magnifying`,
`presentingChart`, `sleeping`, `walking`.

Standalone assets: `public/pillpal-mark.svg` for the mark at large sizes,
`public/favicon.svg` for the app icon, `public/pillpal-tile.svg` for the
background watermark.

### Mascot rules

- **PillPal never appears beside a disclaimer.** The mascot carries warmth, and
  warmth next to a boundary note reads as medical reassurance. He belongs at
  entry points and beside neutral framing, never beside `BoundaryNote`.
- He never gives advice. Nothing he is placed next to may be phrased as an
  instruction to take or avoid a drug.
- Prefer a neutral pose over a celebratory one anywhere near results. A
  cheering mascot beside a risk profile reads as a verdict on it.
- The art uses the literal brand hexes, not theme tokens. PillPal is the same
  character in light and dark, the way a logo is. Only the eyes adapt, since
  brand Navy sinks into the dark surface.
- He does not animate. See the motion rules below.

### Scale

Fine detail turns to mud when the mark is small, so it is dropped rather than
shrunk. The component handles this from its `size` prop:

| Size | What is drawn |
|---|---|
| 24px and up | Everything: cheeks, shine, eye highlights, mouth |
| 16px to 23px | No cheeks, no shine, no eye highlights |
| 16px and below | Mouth also dropped, leaving the capsule and two eyes |

Pass `decorative` when the mark sits next to the word MyPillPal, so a screen
reader does not announce the name twice.

### Poses as card decoration

Cards that would otherwise be an icon and two lines of text carry a large pose
bleeding off the bottom right corner, at 11 to 12 percent opacity behind the
content. The card needs `relative isolate overflow-hidden` and the mascot needs
`-z-10`, so it sits behind the copy rather than over it. Always `decorative`,
always `print:hidden`.

`Section` takes an optional `pose`, which puts a 44px mascot at the right end
of the heading row. Hidden below `sm`, where the heading needs the width.

Twelve of the fifteen poses are in use. `celebrating` is deliberately unused:
it breaks the rule against a celebratory pose near results. `shrugging` and
`sleeping` are unused because they read as the tool being unsure or
disengaged, which is not what a health tool should project.

## Background watermark

A tiled PillPal pattern sits behind the page at 5.5 percent opacity, 7.5
percent in dark mode. It is `position: fixed` at `z-index: 0` with pointer events off,
so it stays clear of the sticky header, the `Select` popover, and every focus
ring.

The index is 0, not -1. A negative index puts the pseudo element behind
`body`'s own opaque `background-color`, which paints the watermark out
completely. Instead `#root` is given `position: relative` and `z-index: 1`, so
the app content sits above the watermark and the watermark sits above the
ground. If either value is changed, both must move together.

No full height element inside `#root` may carry an opaque background. The
`Layout` wrapper is `min-h-screen` and deliberately has no `bg-ground`, since
`body` already paints the ground. Adding one back covers the watermark across
the whole viewport, which is a silent failure: the page still looks correct,
the pattern simply never appears. The footer is the one intended exception, at
`bg-ground`, because it holds `BoundaryNote` and PillPal never appears beside
a disclaimer.

Cards and panels keep an opaque `surface` background, which is what keeps every
ratio in the contrast table above true: no body copy is ever read against the
watermark. It is hidden entirely in print.

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
