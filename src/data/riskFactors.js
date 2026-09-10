/*
  The weighted additive risk model.

  Weights and evidence come from the risk factor table in the PRD, grounded in
  the studies listed in docs/data-sources.md. The model is deliberately simple
  and transparent: a patient can read exactly why their score is what it is.

  Note on what is NOT here: race and ethnicity are not inputs. Resistance risk
  factors are behavioural and clinical, not demographic.

  Two factors are modelled as single select rather than checkbox:
    - age, so a user cannot claim to be both under 5 and 65 or over
    - antibiotic courses in the past year, which only scores at 2 or more
*/

export const FACTOR_GROUPS = [
  {
    id: 'treatment-history',
    label: 'Recent treatment history',
  },
  {
    id: 'health-background',
    label: 'Health background',
  },
  {
    id: 'exposure',
    label: 'Exposure',
  },
  {
    id: 'demographics',
    label: 'About you',
  },
]

export const RISK_FACTORS = [
  {
    id: 'recent-antibiotics',
    group: 'treatment-history',
    type: 'boolean',
    question: 'Have you taken antibiotics in the past 3 months?',
    // How this reads back in the results breakdown, as a statement rather than
    // a question. See the note on `summary` in the multiple-courses options.
    summary: 'You have taken antibiotics in the past 3 months',
    weight: 3,
    // Shown in a Disclosure at body size, never as caption text under the input.
    evidence:
      'This is the strongest single risk factor. Taking an antibiotic clears out the bacteria that respond to it and leaves behind the ones that do not, so the survivors are more likely to be resistant. Studies find people who recently took certain antibiotics are roughly 3 to 6 times more likely to carry a resistant organism.',
  },
  {
    id: 'multiple-courses',
    group: 'treatment-history',
    type: 'select',
    question: 'How many separate courses of antibiotics have you taken in the past year?',
    // Only the '2-or-more' option carries weight.
    weight: 2,
    // `summary` is how a scoring option reads in the results breakdown, where a
    // question with an answer stapled to it would read badly. Only options that
    // can score need one.
    options: [
      { value: 'none', label: 'None', scores: false },
      { value: 'one', label: '1 course', scores: false },
      {
        value: '2-or-more',
        label: '2 or more courses',
        scores: true,
        summary: 'You have taken 2 or more courses of antibiotics in the past year',
      },
    ],
    evidence:
      'Each course of antibiotics gives resistant bacteria another chance to survive and multiply. Repeated courses over a year add up, which is why two or more counts here.',
  },
  {
    id: 'recurrent-infection',
    group: 'treatment-history',
    type: 'boolean',
    question: 'Have you had this same type of infection before?',
    summary: 'You have had this same type of infection before',
    weight: 1,
    evidence:
      'Infections that keep coming back are often treated with repeated antibiotic courses, and research on repeat UTIs shows resistance tends to rise with each round.',
  },
  {
    id: 'diabetes',
    group: 'health-background',
    type: 'boolean',
    question: 'Do you have diabetes?',
    summary: 'You have diabetes',
    weight: 2,
    evidence:
      'Diabetes is linked to more frequent infections and more antibiotic exposure over time. One review found resistant organisms in about 36 percent of women with diabetes who had a UTI, compared with about 21 percent of those without.',
  },
  {
    id: 'immunosuppression',
    group: 'health-background',
    type: 'boolean',
    question: 'Are you receiving treatment that affects your immune system?',
    summary: 'You are receiving treatment that affects your immune system',
    weight: 2,
    evidence:
      'Cancer treatment, dialysis, transplant medication, and long term care all mean more contact with healthcare settings and more antibiotic use, both of which raise the chance of carrying a resistant organism.',
  },
  {
    id: 'indwelling-device',
    group: 'health-background',
    type: 'boolean',
    question: 'Do you have a urinary catheter or another indwelling medical device?',
    summary: 'You have a urinary catheter or another indwelling medical device',
    weight: 1,
    evidence:
      'Bacteria can form a film on the surface of a tube or device that sits in the body. That film is harder for antibiotics to reach, so infections linked to devices are more often resistant.',
  },
  {
    id: 'hospitalization',
    group: 'exposure',
    type: 'boolean',
    question: 'Have you been hospitalized or had surgery in the past 3 months?',
    summary: 'You have been hospitalized or had surgery in the past 3 months',
    weight: 2,
    evidence:
      'Hospitals concentrate both antibiotic use and resistant organisms, so a recent stay raises the chance of carrying one, often without any symptoms.',
  },
  {
    id: 'international-travel',
    group: 'exposure',
    type: 'boolean',
    question: 'Have you traveled internationally in the past 6 months?',
    summary: 'You have traveled internationally in the past 6 months',
    weight: 2,
    // Framed around healthcare infrastructure and resistance prevalence, never
    // around geography as a stand in for demographics.
    evidence:
      'Antibiotic resistance is more common in parts of the world where antibiotics are sold without a prescription and where surveillance is thinner. Travellers can pick up a resistant organism and carry it home without ever feeling sick. One study found roughly 3 times the odds of a resistant UTI organism after travel to such a region.',
    // A follow up question only shown when the parent is checked.
    followUp: {
      id: 'travel-region',
      type: 'select',
      question: 'Which region did you travel to?',
      options: [
        { value: 'unsure', label: 'I would rather not say' },
        { value: 'AFR', label: 'Africa' },
        { value: 'AMR', label: 'The Americas' },
        { value: 'EMR', label: 'Eastern Mediterranean and Middle East' },
        { value: 'EUR', label: 'Europe' },
        { value: 'SEAR', label: 'South and South East Asia' },
        { value: 'WPR', label: 'Western Pacific' },
      ],
    },
  },
  {
    id: 'age',
    group: 'demographics',
    type: 'select',
    question: 'What is your age range?',
    // Weight varies by option, so each option carries its own.
    options: [
      {
        value: 'under-5',
        label: 'Under 5',
        scores: true,
        weight: 1,
        summary: 'You are under 5 years old',
      },
      { value: '5-to-64', label: '5 to 64', scores: false, weight: 0 },
      {
        value: '65-plus',
        label: '65 or older',
        scores: true,
        weight: 1,
        summary: 'You are 65 or older',
      },
    ],
    evidence:
      'Resistant infections hit the very young and the older hardest. Deaths linked to resistance in people 70 and over rose more than 80 percent between 1990 and 2021, while deaths in children under 5 fell by about half as vaccination and clean water access improved.',
  },
]

export const RISK_FACTORS_BY_ID = Object.fromEntries(
  RISK_FACTORS.map((factor) => [factor.id, factor]),
)

export function getFactorsForGroup(groupId) {
  return RISK_FACTORS.filter((factor) => factor.group === groupId)
}
