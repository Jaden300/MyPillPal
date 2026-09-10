/*
  Regional resistance data.

  Read docs/data-sources.md before changing any number in this file. Nothing
  here is cited from memory.

  Honesty rules baked into the shape of this data:

    - Every region carries `source`, `year`, and `isEstimate`.
    - `isEstimate: true` means the figures are CDC national averages standing in
      for state data we could not source directly. The UI must say so. We never
      present a synthesized figure as a local antibiogram.
    - Antibiograms aggregate hospital isolates, which skew toward sicker
      patients, so they can overstate resistance in the community. That caveat
      travels with the data through `SOURCE_CAVEAT`.
    - Rates are proportions from 0 to 1, and represent the share of tested
      isolates that were NOT susceptible.

  US national baselines below come from the CDC AR and Patient Safety Portal
  (NHSN). WHO regional figures come from the WHO Global Antibiotic Resistance
  Surveillance Report 2025, which reports broader trend bands rather than
  facility level precision, so those entries are marked as estimates too.
*/

export const SOURCE_CAVEAT =
  'Antibiograms are built from samples tested in hospitals, and hospital patients tend to be sicker than people treated at a clinic. Real resistance in your community may be lower than these numbers suggest. Your own hospital or clinic may also differ from the regional average.'

export const ESTIMATE_CAVEAT =
  'This region does not publish a public antibiogram we could use, so these figures are US national averages shown as a stand in. They are not local measurements.'

// US national baseline, reused as the estimate basis for states without a
// published public antibiogram.
const US_NATIONAL_RATES = {
  uti: {
    'E. coli': {
      'TMP-SMX': 0.3,
      ciprofloxacin: 0.22,
      nitrofurantoin: 0.03,
      'amoxicillin-clavulanate': 0.14,
    },
  },
  urti: {
    'S. pneumoniae': {
      azithromycin: 0.32,
      penicillin: 0.15,
      amoxicillin: 0.08,
    },
  },
  cap: {
    'S. pneumoniae': {
      azithromycin: 0.32,
      penicillin: 0.15,
      amoxicillin: 0.08,
      doxycycline: 0.11,
    },
  },
  ssti: {
    'S. aureus': {
      // The MRSA share of S. aureus isolates.
      methicillin: 0.4,
      'TMP-SMX': 0.05,
      doxycycline: 0.05,
      cephalexin: 0.4,
    },
  },
  'otitis-sinusitis': {
    'S. pneumoniae': {
      amoxicillin: 0.08,
      'amoxicillin-clavulanate': 0.04,
      azithromycin: 0.32,
    },
  },
}

/**
 * Clone the national baseline for a state we could not source directly.
 * Marked as an estimate so the UI can say so plainly.
 */
function nationalEstimate(id, name) {
  return {
    id,
    name,
    scope: 'state',
    source: 'CDC AR and Patient Safety Portal, national NHSN data',
    year: 2023,
    isEstimate: true,
    resistanceRates: US_NATIONAL_RATES,
  }
}

export const REGIONS = {
  'US-NATIONAL': {
    id: 'US-NATIONAL',
    name: 'United States, national average',
    scope: 'national',
    source: 'CDC AR and Patient Safety Portal, national NHSN data',
    year: 2023,
    isEstimate: false,
    resistanceRates: US_NATIONAL_RATES,
  },

  // States with public antibiogram programs, per docs/data-sources.md.
  'US-WA': {
    id: 'US-WA',
    name: 'Washington',
    scope: 'state',
    source: 'Washington State Department of Health antibiogram program',
    year: 2024,
    isEstimate: false,
    resistanceRates: {
      uti: {
        'E. coli': {
          'TMP-SMX': 0.28,
          ciprofloxacin: 0.24,
          nitrofurantoin: 0.03,
          'amoxicillin-clavulanate': 0.12,
        },
      },
      urti: {
        'S. pneumoniae': { azithromycin: 0.28, penicillin: 0.12, amoxicillin: 0.07 },
      },
      cap: {
        'S. pneumoniae': {
          azithromycin: 0.28,
          penicillin: 0.12,
          amoxicillin: 0.07,
          doxycycline: 0.09,
        },
      },
      ssti: {
        'S. aureus': {
          methicillin: 0.34,
          'TMP-SMX': 0.04,
          doxycycline: 0.04,
          cephalexin: 0.34,
        },
      },
      'otitis-sinusitis': {
        'S. pneumoniae': {
          amoxicillin: 0.07,
          'amoxicillin-clavulanate': 0.03,
          azithromycin: 0.28,
        },
      },
    },
  },

  'US-MN': {
    id: 'US-MN',
    name: 'Minnesota',
    scope: 'state',
    source: 'Minnesota Department of Health antibiogram program',
    year: 2024,
    isEstimate: false,
    resistanceRates: {
      uti: {
        'E. coli': {
          'TMP-SMX': 0.26,
          ciprofloxacin: 0.19,
          nitrofurantoin: 0.02,
          'amoxicillin-clavulanate': 0.11,
        },
      },
      urti: {
        'S. pneumoniae': { azithromycin: 0.3, penicillin: 0.13, amoxicillin: 0.07 },
      },
      cap: {
        'S. pneumoniae': {
          azithromycin: 0.3,
          penicillin: 0.13,
          amoxicillin: 0.07,
          doxycycline: 0.1,
        },
      },
      ssti: {
        'S. aureus': {
          methicillin: 0.32,
          'TMP-SMX': 0.04,
          doxycycline: 0.04,
          cephalexin: 0.32,
        },
      },
      'otitis-sinusitis': {
        'S. pneumoniae': {
          amoxicillin: 0.07,
          'amoxicillin-clavulanate': 0.03,
          azithromycin: 0.3,
        },
      },
    },
  },

  'US-CO': {
    id: 'US-CO',
    name: 'Colorado',
    scope: 'state',
    source: 'Colorado Department of Public Health and Environment antibiogram program',
    year: 2024,
    isEstimate: false,
    resistanceRates: {
      uti: {
        'E. coli': {
          'TMP-SMX': 0.27,
          ciprofloxacin: 0.2,
          nitrofurantoin: 0.03,
          'amoxicillin-clavulanate': 0.12,
        },
      },
      urti: {
        'S. pneumoniae': { azithromycin: 0.29, penicillin: 0.13, amoxicillin: 0.07 },
      },
      cap: {
        'S. pneumoniae': {
          azithromycin: 0.29,
          penicillin: 0.13,
          amoxicillin: 0.07,
          doxycycline: 0.1,
        },
      },
      ssti: {
        'S. aureus': {
          methicillin: 0.35,
          'TMP-SMX': 0.04,
          doxycycline: 0.05,
          cephalexin: 0.35,
        },
      },
      'otitis-sinusitis': {
        'S. pneumoniae': {
          amoxicillin: 0.07,
          'amoxicillin-clavulanate': 0.03,
          azithromycin: 0.29,
        },
      },
    },
  },

  'US-NY': {
    id: 'US-NY',
    name: 'New York',
    scope: 'state',
    source: 'New York City Department of Health and Mental Hygiene antibiogram',
    year: 2024,
    isEstimate: false,
    resistanceRates: {
      uti: {
        'E. coli': {
          'TMP-SMX': 0.34,
          ciprofloxacin: 0.28,
          nitrofurantoin: 0.04,
          'amoxicillin-clavulanate': 0.17,
        },
      },
      urti: {
        'S. pneumoniae': { azithromycin: 0.35, penicillin: 0.17, amoxicillin: 0.09 },
      },
      cap: {
        'S. pneumoniae': {
          azithromycin: 0.35,
          penicillin: 0.17,
          amoxicillin: 0.09,
          doxycycline: 0.12,
        },
      },
      ssti: {
        'S. aureus': {
          methicillin: 0.43,
          'TMP-SMX': 0.06,
          doxycycline: 0.06,
          cephalexin: 0.43,
        },
      },
      'otitis-sinusitis': {
        'S. pneumoniae': {
          amoxicillin: 0.09,
          'amoxicillin-clavulanate': 0.05,
          azithromycin: 0.35,
        },
      },
    },
  },

  // States without a public antibiogram we could source. National stand ins,
  // clearly flagged.
  'US-CA': nationalEstimate('US-CA', 'California'),
  'US-TX': nationalEstimate('US-TX', 'Texas'),
  'US-FL': nationalEstimate('US-FL', 'Florida'),
  'US-OH': nationalEstimate('US-OH', 'Ohio'),
  'US-GA': nationalEstimate('US-GA', 'Georgia'),
  'US-IL': nationalEstimate('US-IL', 'Illinois'),

  // WHO regions. The 2025 global report gives broad trend bands rather than
  // facility level precision, so all six are marked as estimates.
  'WHO-AFR': {
    id: 'WHO-AFR',
    name: 'Africa',
    scope: 'who-region',
    source: 'WHO Global Antibiotic Resistance Surveillance Report 2025',
    year: 2025,
    isEstimate: true,
    resistanceRates: {
      uti: {
        'E. coli': {
          'TMP-SMX': 0.66,
          ciprofloxacin: 0.42,
          nitrofurantoin: 0.11,
          'amoxicillin-clavulanate': 0.4,
        },
      },
      urti: { 'S. pneumoniae': { azithromycin: 0.36, penicillin: 0.26, amoxicillin: 0.18 } },
      cap: {
        'S. pneumoniae': {
          azithromycin: 0.36,
          penicillin: 0.26,
          amoxicillin: 0.18,
          doxycycline: 0.22,
        },
      },
      ssti: {
        'S. aureus': {
          methicillin: 0.44,
          'TMP-SMX': 0.14,
          doxycycline: 0.13,
          cephalexin: 0.44,
        },
      },
      'otitis-sinusitis': {
        'S. pneumoniae': {
          amoxicillin: 0.18,
          'amoxicillin-clavulanate': 0.12,
          azithromycin: 0.36,
        },
      },
    },
  },

  'WHO-AMR': {
    id: 'WHO-AMR',
    name: 'The Americas',
    scope: 'who-region',
    source: 'WHO Global Antibiotic Resistance Surveillance Report 2025',
    year: 2025,
    isEstimate: true,
    resistanceRates: {
      uti: {
        'E. coli': {
          'TMP-SMX': 0.35,
          ciprofloxacin: 0.28,
          nitrofurantoin: 0.04,
          'amoxicillin-clavulanate': 0.19,
        },
      },
      urti: { 'S. pneumoniae': { azithromycin: 0.31, penicillin: 0.16, amoxicillin: 0.09 } },
      cap: {
        'S. pneumoniae': {
          azithromycin: 0.31,
          penicillin: 0.16,
          amoxicillin: 0.09,
          doxycycline: 0.12,
        },
      },
      ssti: {
        'S. aureus': {
          methicillin: 0.38,
          'TMP-SMX': 0.06,
          doxycycline: 0.06,
          cephalexin: 0.38,
        },
      },
      'otitis-sinusitis': {
        'S. pneumoniae': {
          amoxicillin: 0.09,
          'amoxicillin-clavulanate': 0.05,
          azithromycin: 0.31,
        },
      },
    },
  },

  'WHO-EMR': {
    id: 'WHO-EMR',
    name: 'Eastern Mediterranean and Middle East',
    scope: 'who-region',
    source: 'WHO Global Antibiotic Resistance Surveillance Report 2025',
    year: 2025,
    isEstimate: true,
    resistanceRates: {
      uti: {
        'E. coli': {
          'TMP-SMX': 0.62,
          ciprofloxacin: 0.48,
          nitrofurantoin: 0.09,
          'amoxicillin-clavulanate': 0.44,
        },
      },
      urti: { 'S. pneumoniae': { azithromycin: 0.38, penicillin: 0.28, amoxicillin: 0.19 } },
      cap: {
        'S. pneumoniae': {
          azithromycin: 0.38,
          penicillin: 0.28,
          amoxicillin: 0.19,
          doxycycline: 0.23,
        },
      },
      ssti: {
        'S. aureus': {
          methicillin: 0.42,
          'TMP-SMX': 0.13,
          doxycycline: 0.12,
          cephalexin: 0.42,
        },
      },
      'otitis-sinusitis': {
        'S. pneumoniae': {
          amoxicillin: 0.19,
          'amoxicillin-clavulanate': 0.13,
          azithromycin: 0.38,
        },
      },
    },
  },

  'WHO-EUR': {
    id: 'WHO-EUR',
    name: 'Europe',
    scope: 'who-region',
    source: 'WHO Global Antibiotic Resistance Surveillance Report 2025',
    year: 2025,
    isEstimate: true,
    resistanceRates: {
      uti: {
        'E. coli': {
          'TMP-SMX': 0.27,
          ciprofloxacin: 0.24,
          nitrofurantoin: 0.03,
          'amoxicillin-clavulanate': 0.2,
        },
      },
      urti: { 'S. pneumoniae': { azithromycin: 0.22, penicillin: 0.11, amoxicillin: 0.06 } },
      cap: {
        'S. pneumoniae': {
          azithromycin: 0.22,
          penicillin: 0.11,
          amoxicillin: 0.06,
          doxycycline: 0.09,
        },
      },
      ssti: {
        'S. aureus': {
          methicillin: 0.17,
          'TMP-SMX': 0.04,
          doxycycline: 0.04,
          cephalexin: 0.17,
        },
      },
      'otitis-sinusitis': {
        'S. pneumoniae': {
          amoxicillin: 0.06,
          'amoxicillin-clavulanate': 0.03,
          azithromycin: 0.22,
        },
      },
    },
  },

  'WHO-SEAR': {
    id: 'WHO-SEAR',
    name: 'South and South East Asia',
    scope: 'who-region',
    source: 'WHO Global Antibiotic Resistance Surveillance Report 2025',
    year: 2025,
    isEstimate: true,
    resistanceRates: {
      uti: {
        'E. coli': {
          'TMP-SMX': 0.68,
          ciprofloxacin: 0.58,
          nitrofurantoin: 0.12,
          'amoxicillin-clavulanate': 0.47,
        },
      },
      urti: { 'S. pneumoniae': { azithromycin: 0.44, penicillin: 0.3, amoxicillin: 0.2 } },
      cap: {
        'S. pneumoniae': {
          azithromycin: 0.44,
          penicillin: 0.3,
          amoxicillin: 0.2,
          doxycycline: 0.25,
        },
      },
      ssti: {
        'S. aureus': {
          methicillin: 0.47,
          'TMP-SMX': 0.15,
          doxycycline: 0.14,
          cephalexin: 0.47,
        },
      },
      'otitis-sinusitis': {
        'S. pneumoniae': {
          amoxicillin: 0.2,
          'amoxicillin-clavulanate': 0.14,
          azithromycin: 0.44,
        },
      },
    },
  },

  'WHO-WPR': {
    id: 'WHO-WPR',
    name: 'Western Pacific',
    scope: 'who-region',
    source: 'WHO Global Antibiotic Resistance Surveillance Report 2025',
    year: 2025,
    isEstimate: true,
    resistanceRates: {
      uti: {
        'E. coli': {
          'TMP-SMX': 0.55,
          ciprofloxacin: 0.5,
          nitrofurantoin: 0.08,
          'amoxicillin-clavulanate': 0.36,
        },
      },
      urti: { 'S. pneumoniae': { azithromycin: 0.72, penicillin: 0.24, amoxicillin: 0.14 } },
      cap: {
        'S. pneumoniae': {
          azithromycin: 0.72,
          penicillin: 0.24,
          amoxicillin: 0.14,
          doxycycline: 0.19,
        },
      },
      ssti: {
        'S. aureus': {
          methicillin: 0.4,
          'TMP-SMX': 0.1,
          doxycycline: 0.09,
          cephalexin: 0.4,
        },
      },
      'otitis-sinusitis': {
        'S. pneumoniae': {
          amoxicillin: 0.14,
          'amoxicillin-clavulanate': 0.09,
          azithromycin: 0.72,
        },
      },
    },
  },
}

export const DEFAULT_REGION_ID = 'US-NATIONAL'

export const US_STATE_REGIONS = Object.values(REGIONS)
  .filter((region) => region.scope === 'state')
  .sort((a, b) => a.name.localeCompare(b.name))

export const WHO_REGIONS = Object.values(REGIONS)
  .filter((region) => region.scope === 'who-region')
  .sort((a, b) => a.name.localeCompare(b.name))

export function getRegion(id) {
  return REGIONS[id] ?? REGIONS[DEFAULT_REGION_ID]
}

/**
 * Resistance rates for one infection in one region, as a sorted array ready to
 * render. Highest resistance first, since that is what a patient most needs to
 * know about.
 *
 * @returns {Array<{antibiotic: string, rate: number, pathogen: string}>}
 */
export function getResistanceRates(regionId, infectionId) {
  const region = getRegion(regionId)
  const byPathogen = region.resistanceRates?.[infectionId]
  if (!byPathogen) return []

  const rows = []
  for (const [pathogen, drugs] of Object.entries(byPathogen)) {
    for (const [antibiotic, rate] of Object.entries(drugs)) {
      rows.push({ pathogen, antibiotic, rate })
    }
  }

  return mergeEquivalentRows(rows).sort((a, b) => b.rate - a.rate)
}

/*
  Methicillin resistance and cephalexin resistance are the same measurement.
  A Staph aureus isolate that resists methicillin resists the whole beta lactam
  class, cephalexin included, which is why every entry in this file carries an
  identical figure for both. Charted as two bars of equal length under two drug
  names, that reads as a rendering bug rather than as the one fact it is.

  So they collapse into a single row carrying `alsoCovers`. If the two figures
  ever diverge, both rows are emitted unchanged, so a future data correction
  surfaces instead of being silently swallowed.
*/
const EQUIVALENT_ANTIBIOTICS = [{ keep: 'methicillin', covers: 'cephalexin' }]

function mergeEquivalentRows(rows) {
  let merged = rows

  for (const { keep, covers } of EQUIVALENT_ANTIBIOTICS) {
    const primary = merged.find((row) => row.antibiotic === keep)
    const duplicate = merged.find((row) => row.antibiotic === covers)

    if (!primary || !duplicate) continue
    if (primary.pathogen !== duplicate.pathogen) continue
    if (primary.rate !== duplicate.rate) continue

    merged = merged
      .filter((row) => row !== duplicate)
      .map((row) =>
        row === primary
          ? { ...row, alsoCovers: [...(row.alsoCovers ?? []), covers] }
          : row,
      )
  }

  return merged
}

/**
 * Turn a proportion into the "roughly X in Y" phrasing the results screen uses.
 * Rounds to a friendly denominator so the sentence stays readable.
 */
export function asOddsPhrase(rate) {
  if (rate <= 0) return null
  const denominator = Math.round(1 / rate)
  if (!Number.isFinite(denominator) || denominator < 2) return null
  return `roughly 1 in ${denominator}`
}
