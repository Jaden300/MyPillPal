/*
  All patient facing standing copy.

  Disclaimers live here rather than scattered through JSX so the scope guard is
  enforced in one place. If you are reviewing whether this tool stays inside its
  boundary, this file and conversationGuide.js are where to look.

  Voice rules from docs/conventions.md apply to every string here: plain
  language, second person, empowering rather than frightening, and never an
  instruction to take or avoid a drug.
*/

/*
  The scope boundary, in two placements. Rendered by BoundaryNote as a bordered
  band with an icon, at body size, never as grey fine print.

  These are deliberately one sentence each. The longer versions they replaced
  were skimmed past precisely because they looked like legal boilerplate, which
  is the opposite of what a boundary statement is for.
*/
export const BOUNDARY_NOTES = {
  // Sits in the footer of every screen, and on the printed summary.
  footer:
    'Educational information, not medical advice. This tool does not diagnose or recommend treatment.',

  // Screen 4 and the summary, above the risk output.
  results:
    'Context for a conversation, not a diagnosis. Your doctor has your full history and exam.',
}

/*
  Scale figures for the welcome screen, so the entry point opens with the size
  of the problem rather than a paragraph about it.

  The third is a restatement of the first, not an independent finding, so it
  carries the same citation. See docs/data-sources.md entries 4 and 5.
*/
export const IMPACT_STATS = [
  {
    id: 'projected-deaths',
    value: '39 million',
    label: 'deaths projected from antibiotic resistance between 2025 and 2050',
    source: 'GRAM Project, Lancet',
    year: 2024,
  },
  {
    id: 'us-infections',
    value: '2.8 million',
    label: 'resistant infections in the United States each year',
    source: 'CDC AR Threats Report',
    year: 2021,
  },
  {
    id: 'per-minute',
    value: 'Three',
    label: 'deaths every minute, worldwide, at that projected rate',
    source: 'GRAM Project, Lancet',
    year: 2024,
  },
]

export const RISK_TIER_COPY = {
  low: {
    headline: 'Your answers suggest a lower chance of resistance',
    body: 'None of the strongest risk factors for antibiotic resistant bacteria showed up in your answers. If your doctor prescribes a standard first choice antibiotic, it is likely to work. That is good news, and it is still worth asking a question or two at your appointment.',
  },
  moderate: {
    headline: 'Your answers suggest a moderate chance of resistance',
    body: 'You have some factors that raise the chance of carrying bacteria that do not respond to the usual first choice antibiotic. This is worth mentioning to your doctor, who may want to consider a test before deciding, or may have good reason not to.',
  },
  elevated: {
    headline: 'Your answers suggest an elevated chance of resistance',
    body: 'Several factors in your answers are linked to a higher chance of carrying resistant bacteria. Bring this up at your appointment. Your doctor may want to run a test to identify exactly which bacteria are involved before choosing an antibiotic, which can save time and avoid a treatment that does not work.',
  },
}

export const STEWARDSHIP_TIPS = [
  {
    id: 'finish-course',
    title: 'Take the full course as prescribed',
    body: 'Stopping early because you feel better can leave the hardiest bacteria alive. Follow the instructions your doctor gives you, including how long to take it.',
  },
  {
    id: 'no-leftovers',
    title: 'Never save or share leftover antibiotics',
    body: 'A leftover antibiotic is the wrong drug, at the wrong dose, for the wrong infection. Take unused medicine to a pharmacy take back point instead.',
  },
  {
    id: 'no-pressure',
    title: 'Do not push for antibiotics',
    body: 'Most coughs, colds, and sore throats are viral, and antibiotics do nothing for a virus. If your doctor says you do not need one, they are protecting you from side effects and protecting the drug for when you really need it.',
  },
  {
    id: 'ask-culture',
    title: 'Ask about a test if infections keep coming back',
    body: 'A culture identifies which bacteria you actually have and which antibiotics will work on them. It is not right for every situation, and it is not always easy to access, but it is a fair thing to ask about.',
  },
  {
    id: 'prevent',
    title: 'Preventing infections prevents antibiotics',
    body: 'Washing your hands, keeping up with vaccinations, and caring for wounds properly all cut down how often you need an antibiotic at all.',
  },
]
