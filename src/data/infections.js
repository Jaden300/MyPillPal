/*
  Infection type reference data.

  Pathogen lists and first line empiric antibiotics follow IDSA guidance and the
  published resistance literature listed in docs/data-sources.md. The patient
  facing label and description are the plain language strings a user sees, so
  they carry no medical jargon.

  This file describes what doctors commonly consider. It never recommends a
  drug to a user.
*/

export const INFECTIONS = [
  {
    id: 'uti',
    label: 'Urinary tract infection (UTI)',
    // How the infection reads inside a sentence. Lowercasing the label at
    // runtime would turn the acronym into "(uti)", so the mid sentence form is
    // written out here instead.
    shortName: 'a urinary tract infection',
    description: 'Burning or frequent urination',
    icon: 'droplet',
    isOftenViral: false,
    // The pathogen key must match the keys used in regions.js resistanceRates.
    primaryPathogen: 'E. coli',
    keyPathogens: [
      'E. coli, which causes about 70 percent of cases',
      'Klebsiella pneumoniae',
      'Proteus mirabilis',
    ],
    empiricAntibiotics: [
      'trimethoprim-sulfamethoxazole (TMP-SMX)',
      'nitrofurantoin',
      'ciprofloxacin',
      'amoxicillin-clavulanate',
    ],
    resistanceConcern:
      'Resistance to TMP-SMX and to the fluoroquinolone group, including ciprofloxacin, is common enough that many doctors weigh it when choosing a first antibiotic.',
    cultureName: 'urine culture',
  },
  {
    id: 'urti',
    label: 'Cold, flu, or sore throat',
    shortName: 'a cold, flu, or sore throat',
    description: 'Cough, congestion, sore throat',
    icon: 'nose',
    // The single most important flag in this file. It drives the viral gate
    // question in the conversation guide.
    isOftenViral: true,
    primaryPathogen: 'S. pneumoniae',
    keyPathogens: [
      'Most of these infections are caused by viruses, which antibiotics cannot treat',
      'When bacterial, Streptococcus pyogenes, the cause of strep throat',
    ],
    empiricAntibiotics: ['amoxicillin', 'penicillin', 'azithromycin'],
    resistanceConcern:
      'Most colds, flu, and sore throats are viral, so an antibiotic gives no benefit while still adding to resistance. Where antibiotics are needed, resistance to the macrolide group, including azithromycin, is rising.',
    cultureName: 'throat swab',
  },
  {
    id: 'cap',
    label: 'Pneumonia',
    shortName: 'pneumonia',
    description: 'Chest infection with cough and fever',
    icon: 'lungs',
    isOftenViral: false,
    primaryPathogen: 'S. pneumoniae',
    keyPathogens: [
      'Streptococcus pneumoniae',
      'Haemophilus influenzae',
      'Atypical organisms such as Mycoplasma',
    ],
    empiricAntibiotics: [
      'amoxicillin',
      'doxycycline',
      'azithromycin',
      'amoxicillin-clavulanate',
    ],
    resistanceConcern:
      'Some S. pneumoniae no longer respond fully to penicillin, and resistance to the macrolide group, including azithromycin, is a growing concern.',
    cultureName: 'sputum culture',
  },
  {
    id: 'ssti',
    label: 'Skin infection',
    shortName: 'a skin infection',
    description: 'Redness, swelling, warmth, or pus on skin',
    icon: 'bandage',
    isOftenViral: false,
    primaryPathogen: 'S. aureus',
    keyPathogens: [
      'Staphylococcus aureus, including MRSA, a form that resists several common antibiotics',
      'Streptococcus pyogenes',
    ],
    empiricAntibiotics: [
      'cephalexin',
      'dicloxacillin',
      'trimethoprim-sulfamethoxazole (TMP-SMX)',
      'doxycycline',
    ],
    resistanceConcern:
      'MRSA, a form of Staph that resists several common antibiotics, now spreads in the community and not only in hospitals. It changes which antibiotic a doctor picks.',
    cultureName: 'wound culture',
  },
  {
    id: 'otitis-sinusitis',
    label: 'Ear or sinus infection',
    shortName: 'an ear or sinus infection',
    description: 'Ear pain, facial pressure, congestion',
    icon: 'ear',
    isOftenViral: false,
    primaryPathogen: 'S. pneumoniae',
    keyPathogens: [
      'Streptococcus pneumoniae',
      'Haemophilus influenzae',
      'Moraxella catarrhalis',
    ],
    empiricAntibiotics: ['amoxicillin', 'amoxicillin-clavulanate'],
    resistanceConcern:
      'Some H. influenzae make an enzyme that breaks down plain amoxicillin, and some S. pneumoniae no longer respond fully to penicillin.',
    cultureName: 'culture',
  },
]

export const INFECTIONS_BY_ID = Object.fromEntries(
  INFECTIONS.map((infection) => [infection.id, infection]),
)

export function getInfection(id) {
  return INFECTIONS_BY_ID[id] ?? null
}
