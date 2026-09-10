# Tasks

Update as work completes. `[ ]` open, `[x]` done.

## Phase 0: Setup

- [x] Rebrand to MyPillPal, mascot PillPal
- [x] Docs structure and workflow doc
- [x] Colour palette and typography conventions
- [x] GitHub repo created and pushed
- [x] Scaffold React + Vite + Tailwind
- [x] Wire palette and type tokens into Tailwind config

## Phase 1: Data layer

- [x] Infection type reference JSON, 5 types with pathogens and empiric drugs
- [x] Risk factor scoring model as a pure function
- [x] Regional resistance dataset, 10 US states plus 6 WHO regions
- [x] Conversation guide generator, rule based on infection, tier, and region
- [x] Plain language educational content written

## Phase 2: Core UI

- [x] Screen 1: welcome and infection selector
- [x] Screen 2: risk factor checklist with "why this matters" tooltips
- [x] Screen 3: region selector with "not sure" fallback
- [x] Screen 4: results, all four sections
- [x] Flow state wiring, infection to risk factors to region to results
- [x] Responsive layout, mobile first

## Phase 3: Visualization and polish

- [x] Resistance rate bar chart, lightweight SVG
- [x] Risk tier visual treatment, colour plus label plus icon
- [x] Print and export view for the doctor conversation guide
- [x] Accessibility pass: contrast, focus states, screen reader labels
- [x] Copy pass: plain language, empowering tone, no dashes

## Phase 4: Visual overhaul

- [x] New type system: Fraunces display, Public Sans text, 9 role scale
- [x] Deeper palette, every value contrast measured for light, dark, and print
- [x] Caption tier removed entirely, no size below 15px in the scale
- [x] Grey note paragraphs deleted, boundary kept as a designed BoundaryNote band
- [x] Source attribution moved to a SourceChip, estimates flagged loudest
- [x] Custom Select replaces both native dropdowns, full ARIA listbox keyboard contract
- [x] ChoiceCard replaces native checkboxes and radios, native semantics kept
- [x] RiskGauge, StatTile, FactorWeightBar, Card, Section, Eyebrow primitives
- [x] Resistance chart rebuilt: shared axis, three step ramp, national baseline markers
- [x] Methicillin and cephalexin merged into one row, guide extended to match
- [x] Live risk meter on screen 2, region comparison on screen 3, impact stats on screen 1
- [x] Motion pass, all CSS driven so reduced motion is handled globally

## Phase 5: Documentation and presentation

- [x] README complete
- [ ] Devpost writeup, all required sections
- [ ] Pitch deck, 5 to 8 slides
- [ ] Demo walkthrough prepared

## Definition of done

- [x] Full flow completes in under 2 minutes
- [x] Different inputs produce meaningfully different outputs
- [x] Every resistance figure shown has a cited source
- [x] Conversation guide gives 3 to 5 specific questions, not boilerplate
- [x] Disclaimers present and visible without being obstructive
- [x] Works on mobile
- [ ] README and Devpost writeup complete
- [ ] Pitch deck tells a clear story
- [x] No em or en dashes anywhere in the repo
- [x] No Claude attribution anywhere in the repo
