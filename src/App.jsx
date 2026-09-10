import { useMemo, useState } from 'react'

import Layout from './components/Layout.jsx'
import InfectionSelect from './screens/InfectionSelect.jsx'
import RiskFactors from './screens/RiskFactors.jsx'
import RegionSelect from './screens/RegionSelect.jsx'
import Results from './screens/Results.jsx'
import Summary from './screens/Summary.jsx'

import { scoreRisk } from './lib/scoreRisk.js'
import { buildConversationGuide } from './lib/conversationGuide.js'
import { DEFAULT_REGION_ID } from './data/regions.js'

/*
  Flow state for the whole app. No router, no state library, no persistence.

  Nothing is written to localStorage or sent anywhere. Closing the tab discards
  everything, which is the privacy promise in the PRD and not an oversight.

  The risk score and the conversation guide are derived on render rather than
  stored, so they can never drift out of sync with the answers behind them.
*/
export default function App() {
  const [step, setStep] = useState('infection')
  const [infectionId, setInfectionId] = useState(null)
  const [answers, setAnswers] = useState({})
  const [regionId, setRegionId] = useState(DEFAULT_REGION_ID)

  const risk = useMemo(() => scoreRisk(answers), [answers])

  const guide = useMemo(
    () =>
      infectionId
        ? buildConversationGuide({ infectionId, tier: risk.tier, answers, regionId })
        : [],
    [infectionId, risk.tier, answers, regionId],
  )

  function handleSelectInfection(id) {
    setInfectionId(id)
    setStep('riskFactors')
  }

  function handleRestart() {
    setInfectionId(null)
    setAnswers({})
    setRegionId(DEFAULT_REGION_ID)
    setStep('infection')
  }

  return (
    <Layout step={step}>
      {/*
        Keying on the step remounts the wrapper, which replays the entry
        animation. The animation is CSS, so reduced motion switches it off
        without this component knowing about it.
      */}
      <div key={step} className="screen-enter">
      {step === 'infection' && (
        <InfectionSelect selectedId={infectionId} onSelect={handleSelectInfection} />
      )}

      {step === 'riskFactors' && (
        <RiskFactors
          answers={answers}
          risk={risk}
          onChange={setAnswers}
          onBack={() => setStep('infection')}
          onContinue={() => setStep('region')}
        />
      )}

      {step === 'region' && (
        <RegionSelect
          regionId={regionId}
          infectionId={infectionId}
          onChange={setRegionId}
          onBack={() => setStep('riskFactors')}
          onContinue={() => setStep('results')}
        />
      )}

      {step === 'results' && (
        <Results
          infectionId={infectionId}
          regionId={regionId}
          risk={risk}
          guide={guide}
          onExport={() => setStep('summary')}
          onBack={() => setStep('region')}
          onRestart={handleRestart}
        />
      )}

      {step === 'summary' && (
        <Summary
          infectionId={infectionId}
          regionId={regionId}
          risk={risk}
          guide={guide}
          onBack={() => setStep('results')}
        />
      )}
      </div>
    </Layout>
  )
}
