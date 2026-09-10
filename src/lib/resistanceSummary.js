/*
  The plain language reading of a resistance figure.

  Section B of the results screen and the printable summary both need the same
  sentence, so it is built here once rather than written twice and allowed to
  drift. Pure function, no React.

  Voice rules from docs/conventions.md apply: this describes what the data says
  and what it might mean for a conversation. It never tells anyone to take or
  avoid a drug, and it never implies a charted row is a recommendation.
*/

import { asOddsPhrase } from '../data/regions.js'

/*
  Some charted rows are laboratory markers rather than prescriptions. Methicillin
  is the clear case: a doctor does not prescribe it, and the figure is really the
  share of samples that are MRSA. The bar still belongs on the chart, since it is
  the most informative number for a skin infection, but the sentence underneath
  must not describe it as a drug someone might be given.
*/
const LAB_MARKERS = {
  methicillin:
    'Methicillin is a laboratory marker rather than a medicine you would be prescribed. A sample resistant to it is what doctors call MRSA, which narrows the antibiotics that will work.',
}

/**
 * How a region reads after the word "in". The national entry is named "United
 * States, national average" so it labels itself in a dropdown, but that reads
 * badly mid sentence, so it loses its trailing clause here.
 */
export function regionInPhrase(region) {
  return region.scope === 'national' ? 'the United States as a whole' : region.name
}

/**
 * Turn the highest resistance row into the sentence the PRD specifies.
 *
 * @param {{pathogen: string, antibiotic: string, rate: number}} topRow The
 *   first entry from getResistanceRates, which is already sorted highest first.
 * @param {Object} region The selected region record.
 * @param {string} infectionShortName Mid sentence name of the infection, for
 *   example "a skin infection".
 * @returns {string|null} Null when there is nothing meaningful to say.
 */
export function buildInterpretation(topRow, region, infectionShortName) {
  if (!topRow) return null

  const percent = Math.round(topRow.rate * 100)
  const odds = asOddsPhrase(topRow.rate)

  const opening = `In ${regionInPhrase(region)}, about ${percent} percent of the ${topRow.pathogen} samples behind ${infectionShortName} were resistant to ${topRow.antibiotic}.`

  const marker = LAB_MARKERS[topRow.antibiotic]
  if (marker) return `${opening} ${marker}`

  // asOddsPhrase already returns the words "roughly 1 in N", so the sentence
  // must not prepend "roughly a" on top of it.
  if (!odds) return opening

  return `${opening} Put another way, if that antibiotic were used without a test first, there is ${odds} chance it would not work.`
}

/**
 * Source line for any figure on screen. Every statistic shows where it came
 * from, which year the samples are from, and how wide it reaches. That honesty
 * is a PRD requirement, not polish.
 *
 * Note the three way split. A national estimate standing in for a state is not
 * the same thing as the national average a user deliberately chose, and neither
 * is a real state antibiogram.
 */
export function buildSourceLine(region) {
  return `Source: ${region.source}, ${region.year}. This is ${
    {
      estimate: 'a national estimate, not local data',
      national: 'a national average',
      local: 'a local antibiogram',
    }[sourceScope(region)]
  }.`
}

/**
 * The same three way split as a token, for the SourceChip on screen. The chip
 * and the printed sentence must never disagree about how strong a figure is,
 * so both read this.
 */
export function sourceScope(region) {
  if (region.isEstimate) return 'estimate'
  if (region.scope === 'national') return 'national'
  return 'local'
}
