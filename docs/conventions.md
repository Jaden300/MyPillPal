# Conventions

Single source of truth for how MyPillPal looks and sounds. If a colour or a
type size is not in this file, it does not go in the app.

## Palette: warm teal and soft coral

Clinical but warm. A well designed patient portal, not a hospital corridor and
not a toy. Teal carries trust and calm, coral gives PillPal warmth and marks
the one thing on screen that matters most.

| Token | Light | Dark | Use |
|---|---|---|---|
| `ink` | `#12211F` | `#EAF2F0` | Body text |
| `ink-muted` | `#4B5F5C` | `#9CB3AF` | Secondary text, captions, sources |
| `ground` | `#FBF8F4` | `#0E1918` | Page background, warm off white |
| `surface` | `#FFFFFF` | `#162422` | Cards, panels |
| `border` | `#E3DDD3` | `#263633` | Hairlines, dividers |
| `primary` | `#0F7A73` | `#3FB0A6` | Buttons, links, active states |
| `primary-soft` | `#D8EDEB` | `#1C3A37` | Selected cards, tinted fills |
| `accent` | `#C4472F` | `#F08C78` | Coral text and icons, emphasis |
| `accent-fill` | `#E8735E` | `#F08C78` | Mascot, decorative fills only, never text |
| `risk-low` | `#2E7D5B` | `#5CB88E` | Low risk tier |
| `risk-moderate` | `#9A5D0B` | `#E0A34E` | Moderate risk tier |
| `risk-elevated` | `#C0453A` | `#E27065` | Elevated risk tier |

### Contrast, measured

Every value above was checked against its background. Ratios in light mode
against `surface`, dark mode against `surface`:

| Pair | Light | Dark |
|---|---|---|
| `ink` | 16.6 | 14.1 |
| `ink-muted` | 6.8 | 7.2 |
| `primary` | 5.2 | 6.1 |
| `accent` | 4.9 | 6.7 |
| `risk-low` | 5.0 | 6.6 |
| `risk-moderate` | 5.3 | 7.3 |
| `risk-elevated` | 5.1 | 5.2 |
| white on `primary` | 5.2 | n/a |

All clear WCAG AA (4.5:1) for normal text. `accent-fill` at `#E8735E` is
2.98:1 on white, so it is a fill only. Never set text or a meaningful icon in
it. Use `accent` for those.

### Colour rules

- Risk tiers always pair colour with a text label and an icon. Never encode a
  risk tier in colour alone.
- Coral is an accent, not a second primary. At most one coral element per
  screen, plus the mascot.
- Chart bars use `primary` at varying opacity for magnitude, not a rainbow.
  Reserve the risk colours for risk tiers so they keep their meaning.
- Do not introduce a new colour without adding it to this table first.

## Typography

Inter, loaded from Google Fonts, with a real fallback stack:

```css
font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
```

| Role | Size / line height | Weight |
|---|---|---|
| Display, screen title | 32px / 1.15 | 700 |
| H2, section | 22px / 1.3 | 600 |
| H3, subsection | 17px / 1.4 | 600 |
| Body | 16px / 1.6 | 400 |
| Small, captions and sources | 13.5px / 1.5 | 400 |
| Label, buttons and form | 15px / 1.2 | 500 |

- Body text never drops below 16px. Our readers include people managing
  medications for elderly relatives.
- Percentages and any number in the resistance charts use
  `font-variant-numeric: tabular-nums` so columns line up.
- Measure caps at roughly 68 characters for long form copy.

## Spacing, radius, shadow

- Spacing scale in 4px steps: 4, 8, 12, 16, 24, 32, 48, 64.
- Card radius 10px. Button radius 8px. Pill and badge radius full.
- One shadow token only: `0 1px 2px rgba(18,33,31,0.06), 0 4px 12px rgba(18,33,31,0.05)`.
  Cards get it, nothing else does.
- Focus ring: 2px `primary` with a 2px offset. Visible on every interactive
  element. Never remove the outline without replacing it.

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
