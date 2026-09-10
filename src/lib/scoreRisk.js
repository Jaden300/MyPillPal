/*
  The risk scoring model. Pure function, no side effects, no React.

  Kept separate from the UI so the model can be read, checked, and argued with
  on its own. Anyone reviewing whether this tool is medically responsible should
  be able to read this one file and the risk factor table.
*/

import { RISK_FACTORS } from '../data/riskFactors.js'

export const RISK_TIERS = {
  low: {
    id: 'low',
    label: 'Lower risk',
    colorToken: 'risk-low',
    range: '0 to 2 points',
  },
  moderate: {
    id: 'moderate',
    label: 'Moderate risk',
    colorToken: 'risk-moderate',
    range: '3 to 5 points',
  },
  elevated: {
    id: 'elevated',
    label: 'Elevated risk',
    colorToken: 'risk-elevated',
    range: '6 or more points',
  },
}

/**
 * Turn a set of answers into a score, a tier, and the reasons behind them.
 *
 * @param {Object} answers Keyed by risk factor id. Booleans for checkbox
 *   factors, option value strings for select factors.
 * @returns {{
 *   score: number,
 *   tier: 'low' | 'moderate' | 'elevated',
 *   contributingFactors: Array<{id: string, label: string, weight: number, evidence: string}>,
 *   factorCount: number
 * }}
 */
export function scoreRisk(answers = {}) {
  const contributingFactors = []

  for (const factor of RISK_FACTORS) {
    const answer = answers[factor.id]

    if (factor.type === 'boolean') {
      if (answer === true) {
        contributingFactors.push({
          id: factor.id,
          label: factor.summary ?? factor.question,
          weight: factor.weight,
          evidence: factor.evidence,
        })
      }
      continue
    }

    if (factor.type === 'select') {
      const option = factor.options.find((candidate) => candidate.value === answer)
      if (!option || !option.scores) continue

      // Options may carry their own weight (age does). Otherwise the factor
      // level weight applies.
      const weight = option.weight ?? factor.weight
      contributingFactors.push({
        id: factor.id,
        // Scoring options carry a `summary` written as a plain statement, since
        // the question with its answer stapled on the end reads badly in the
        // results breakdown. Fall back to that older shape if one is missing.
        label: option.summary ?? `${factor.question} ${option.label}`,
        weight,
        evidence: factor.evidence,
      })
    }
  }

  const score = contributingFactors.reduce((total, factor) => total + factor.weight, 0)

  return {
    score,
    tier: tierForScore(score),
    // Heaviest first, so the breakdown leads with what matters most.
    contributingFactors: contributingFactors.sort((a, b) => b.weight - a.weight),
    factorCount: contributingFactors.length,
  }
}

/*
  The highest score the model can produce, derived rather than written down.

  Age is single select, so only one of its two scoring options can ever fire,
  and the same holds for course count. Deriving it means the gauge stays honest
  if a weight in the factor table is ever changed.
*/
export const MAX_RISK_SCORE = RISK_FACTORS.reduce((total, factor) => {
  if (factor.type === 'boolean') return total + factor.weight

  const scoring = factor.options.filter((option) => option.scores)
  if (scoring.length === 0) return total

  return total + Math.max(...scoring.map((option) => option.weight ?? factor.weight))
}, 0)

/**
 * Thresholds come straight from the PRD risk model.
 */
export function tierForScore(score) {
  if (score >= 6) return 'elevated'
  if (score >= 3) return 'moderate'
  return 'low'
}

/**
 * True when the user answered a given factor affirmatively. Used by the
 * conversation guide so it does not have to know how each factor is shaped.
 */
export function hasFactor(answers, factorId) {
  const factor = RISK_FACTORS.find((candidate) => candidate.id === factorId)
  if (!factor) return false

  const answer = answers?.[factorId]
  if (factor.type === 'boolean') return answer === true

  const option = factor.options?.find((candidate) => candidate.value === answer)
  return Boolean(option?.scores)
}
