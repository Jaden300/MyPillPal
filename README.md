<img src="public/pillpal-mark.svg" alt="PillPal, the MyPillPal mascot" width="88" align="right" />

# MyPillPal

**Antibiotic resistance, explained for the person taking the antibiotics.**

MyPillPal turns public antibiotic resistance surveillance data into personalized,
plain language context, so patients can walk into a doctor's appointment ready to
have a better conversation about the drug they are about to be prescribed.

Built for the CSH Social Impact Ideathon 2026, Bio + Tech track.

---

## The problem

Antibiotic resistance is projected to directly cause 39 million deaths between
2025 and 2050, roughly three deaths every minute. A major driver is
inappropriate prescribing, and part of that is a communication gap: patients
pressure doctors for antibiotics that will not help them, and when they do need
one, they have no context for why a particular drug was chosen.

The data that would give them that context already exists. Antibiograms and
surveillance reports are published by the CDC, the WHO, and state health
departments every year. But all of it is written for clinicians, buried in dense
PDF tables and paid clinical reference tools. Nothing translates it for the
public that funded its collection.

## How it works

Four screens, under two minutes, no account:

1. **Pick your infection type.** Five common ones: UTI, cold or sore throat,
   pneumonia, skin infection, ear or sinus infection.
2. **Check your risk factors.** Recent antibiotic use, diabetes, recent
   hospitalization, international travel, age, and more. Each one explains why it
   matters.
3. **Pick your region.** Resistance patterns vary a lot by geography.
4. **Get your profile.** A risk tier with a plain language explanation, the
   resistance rates for your infection in your area with sources, a personalized
   list of questions to ask your doctor, and what you can do.

The risk model is a transparent weighted additive score, not a black box. Every
weight traces to a published study, and the app shows you which of your answers
contributed to your score.

## What this is not

- **Not a diagnostic tool.** It never tells you what infection you have.
- **Not a prescribing tool.** It never tells you to take or avoid any drug.
- **Not a replacement for your doctor.** Every output is framed as context for a
  conversation, never as an instruction.
- **Not a real time feed.** Data comes from published annual surveillance
  reports, shown with their source and year.

> MyPillPal provides educational health information, not medical advice. It does
> not diagnose conditions, recommend treatments, or replace professional medical
> judgment. Always follow your doctor's recommendations.

## Privacy

There is no backend. No accounts, no tracking, no analytics on health
information. Every answer you give is processed in your browser and discarded
when you close the tab.

## Stack

React, Vite, and Tailwind CSS. Static JSON data, static build, no server.

## Running locally

```
npm install
npm run dev
```

The dev server prints a local URL. To check the production build:

```
npm run build
npm run preview
```

## Deploying

The build output in `dist/` is a static bundle that any static host can serve.
The live version is deployed on Vercel: push to `main` and Vercel builds and
publishes automatically.

## Data sources

Resistance figures come from the CDC AR and Patient Safety Portal, the WHO
Global Antibiotic Resistance Surveillance Report 2025, state antibiogram
programs, and the GRAM Project's 2024 Lancet analysis. Risk factor weights come
from published studies. The full list with citation rules is in
[docs/data-sources.md](docs/data-sources.md).

## Repo docs

- [docs/workflow.md](docs/workflow.md) how this repo is worked on
- [docs/conventions.md](docs/conventions.md) palette, typography, and voice
- [docs/data-sources.md](docs/data-sources.md) citations
- [docs/tasks.md](docs/tasks.md) build progress

---

<p align="center">
  <img src="public/pillpal-mark.svg" alt="PillPal, the MyPillPal mascot" width="72" />
  <br />
  <em>PillPal is here for the conversation, not the diagnosis.</em>
</p>
