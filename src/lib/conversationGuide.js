/*
  The Doctor Conversation Guide generator.

  Rule based, not a model. Every question is a question the patient asks their
  doctor. Nothing here tells a user to take, avoid, request, or refuse a drug.
  If you add a rule, keep it in the interrogative and keep the decision with the
  clinician.

  Rules are evaluated in priority order and the first 5 matches win, with a
  floor of 3 filled from general questions. That ordering is the design: the
  viral gate outranks everything, because for a cold the most useful thing a
  patient can do is ask whether an antibiotic is needed at all.
*/

import { getInfection } from '../data/infections.js'
import { getRegion, getResistanceRates, asOddsPhrase } from '../data/regions.js'
import { hasFactor } from './scoreRisk.js'
import { regionInPhrase } from './resistanceSummary.js'
import { RISK_FACTORS_BY_ID } from '../data/riskFactors.js'

const MAX_QUESTIONS = 5
const MIN_QUESTIONS = 3

// A drug is worth naming in a question once this much of the common bacteria
// no longer respond to it.
const NOTABLE_RESISTANCE_THRESHOLD = 0.2

/**
 * Build the personalized question list.
 *
 * @param {{infectionId: string, tier: string, answers: Object, regionId: string}} input
 * @returns {Array<{id: string, question: string, rationale: string}>}
 */
export function buildConversationGuide({ infectionId, tier, answers = {}, regionId }) {
  const infection = getInfection(infectionId)
  if (!infection) return []

  const region = getRegion(regionId)
  const questions = []

  // Rule 1, highest priority. For a likely viral infection, the single most
  // valuable question is whether an antibiotic is warranted at all.
  if (infection.isOftenViral) {
    questions.push({
      id: 'viral-gate',
      question:
        'Could this be viral? Is there a way to tell whether I actually need an antibiotic?',
      rationale:
        'Most colds, sore throats, and chest coughs are caused by viruses, and an antibiotic cannot touch a virus. Asking this makes it easier for your doctor to say no when no is the right answer.',
    })
  }

  // Rule 2. Recent antibiotic use is the strongest single risk factor, so it
  // deserves its own question naming the specific exposure.
  if (hasFactor(answers, 'recent-antibiotics')) {
    questions.push({
      id: 'recent-antibiotics',
      question: `I took antibiotics within the past 3 months. Does that change which one you would choose, or would a ${infection.cultureName} be useful first?`,
      rationale:
        'Recent antibiotic use is the strongest single predictor of a resistant infection. Your doctor may not know about a course prescribed elsewhere unless you mention it.',
    })
  }

  // Rule 3. Culture testing, for anyone above low tier. Framed to acknowledge
  // that a culture is not always the right call and not always accessible.
  if (tier === 'moderate' || tier === 'elevated') {
    questions.push({
      id: 'culture',
      question: `Would a ${infection.cultureName} be worth doing before we settle on an antibiotic, or would you rather start treatment now?`,
      rationale:
        'A culture shows which bacteria you have and what will work on them. It is not right in every situation, and results take time, so this is a genuine question rather than a request.',
    })
  }

  // Rule 4. Regional resistance, but only when there is a figure worth raising.
  const notableDrug = findNotableResistance(regionId, infectionId, infection)
  if (notableDrug) {
    const odds = asOddsPhrase(notableDrug.rate)
    questions.push({
      id: 'regional-resistance',
      question: `I read that about ${Math.round(notableDrug.rate * 100)} percent of the bacteria that usually cause this are resistant to ${notableDrug.antibiotic} in our area. Is that something you weigh when prescribing?`,
      rationale: `In ${regionInPhrase(region)}, ${odds ? `${odds} samples of ${notableDrug.pathogen} tested` : 'a notable share of samples tested'} did not respond to ${notableDrug.antibiotic}, according to ${region.source} for ${region.year}.${region.isEstimate ? ' This figure is a national estimate rather than a local measurement.' : ''}`,
    })
  }

  // Rule 5. Recent travel, framed around healthcare systems and not geography
  // as a proxy for anything else.
  if (hasFactor(answers, 'international-travel')) {
    const travelRegionLabel = travelRegionName(answers)
    questions.push({
      id: 'travel',
      question: travelRegionLabel
        ? `I traveled to ${travelRegionLabel} in the past 6 months. Should that affect which antibiotic you would pick?`
        : 'I traveled internationally in the past 6 months. Should that affect which antibiotic you would pick?',
      rationale:
        'Travellers can pick up resistant bacteria and carry them home without ever feeling ill. Where antibiotics are available without a prescription, resistance tends to be more common.',
    })
  }

  // Rule 6. Hospitalization or surgery.
  if (hasFactor(answers, 'hospitalization')) {
    questions.push({
      id: 'healthcare-exposure',
      question:
        'I was in hospital or had surgery in the past 3 months. Does that change what you would prescribe?',
      rationale:
        'Hospitals concentrate both antibiotic use and resistant organisms, so a recent stay can leave you carrying one without symptoms.',
    })
  }

  // Rule 7. Recurrent infection.
  if (hasFactor(answers, 'recurrent-infection')) {
    questions.push({
      id: 'recurrence',
      question:
        'This keeps coming back. Is it worth looking into why, rather than treating each episode on its own?',
      rationale:
        'Repeat infections often mean repeat antibiotic courses, and resistance tends to climb with each round. The underlying cause may be treatable.',
    })
  }

  // Rule 8. Chronic conditions that raise risk.
  if (hasFactor(answers, 'immunosuppression') || hasFactor(answers, 'diabetes')) {
    questions.push({
      id: 'chronic-condition',
      question:
        'Given my health background, is there anything you would watch for if this does not improve?',
      rationale:
        'Knowing what "not improving" looks like, and when to come back, helps you catch a treatment that is not working sooner.',
    })
  }

  // Fill to the floor with questions that are useful to anyone.
  for (const general of GENERAL_QUESTIONS) {
    if (questions.length >= MIN_QUESTIONS) break
    if (questions.some((existing) => existing.id === general.id)) continue
    questions.push(general)
  }

  return questions.slice(0, MAX_QUESTIONS)
}

/**
 * The single most resistant first line drug for this infection in this region,
 * if any clears the threshold worth raising in conversation.
 */
function findNotableResistance(regionId, infectionId, infection) {
  const rates = getResistanceRates(regionId, infectionId)

  const match = rates.find((row) => {
    if (row.rate < NOTABLE_RESISTANCE_THRESHOLD) return false

    /*
      Only name a drug the patient might actually be prescribed. 'methicillin'
      is a laboratory marker for MRSA, not something anyone is handed.

      alsoCovers is checked alongside the row's own name because equivalent
      measurements are merged in getResistanceRates. For a skin infection the
      surviving row is named methicillin, which is correctly excluded here,
      while the cephalexin it now covers is a first line drug and is exactly
      what makes this question worth asking.
    */
    return [row.antibiotic, ...(row.alsoCovers ?? [])].some((name) =>
      infection.empiricAntibiotics.some((drug) =>
        drug.toLowerCase().includes(name.toLowerCase()),
      ),
    )
  })

  if (!match) return null

  // Ask about the drug the patient could be given, not the lab marker.
  const prescribable = [match.antibiotic, ...(match.alsoCovers ?? [])].find((name) =>
    infection.empiricAntibiotics.some((drug) =>
      drug.toLowerCase().includes(name.toLowerCase()),
    ),
  )

  return { ...match, antibiotic: prescribable ?? match.antibiotic }
}

function travelRegionName(answers) {
  const value = answers['travel-region']
  if (!value || value === 'unsure') return null
  const followUp = RISK_FACTORS_BY_ID['international-travel']?.followUp
  return followUp?.options.find((option) => option.value === value)?.label ?? null
}

const GENERAL_QUESTIONS = [
  {
    id: 'why-this-one',
    question: 'Why this particular antibiotic for my infection?',
    rationale:
      'Doctors pick a first antibiotic based on which bacteria usually cause your type of infection and what those bacteria typically respond to locally. Asking makes that reasoning visible.',
  },
  {
    id: 'not-working',
    question: 'How will I know if it is not working, and when should I come back?',
    rationale:
      'If the bacteria causing your infection are resistant, you will usually not improve on schedule. Knowing the timeline means you catch that early instead of waiting it out.',
  },
  {
    id: 'narrow-spectrum',
    question:
      'Is this the most targeted option, or is it a broad one? Does that matter in my case?',
    rationale:
      'A narrower antibiotic hits the likely culprit while disturbing less of the rest of your body’s bacteria. Sometimes broad is genuinely the right choice, and your doctor can explain which this is.',
  },
  {
    id: 'side-effects',
    question: 'What side effects should I expect, and which ones mean I should call you?',
    rationale:
      'Every antibiotic carries a trade off. Knowing what is normal and what is not helps you avoid stopping early over something harmless.',
  },
]
