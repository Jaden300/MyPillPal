import { FACTOR_GROUPS, getFactorsForGroup } from '../data/riskFactors.js'
import Button from '../components/Button.jsx'
import ChoiceCard from '../components/ChoiceCard.jsx'
import Disclosure from '../components/Disclosure.jsx'
import RiskGauge from '../components/RiskGauge.jsx'
import Select from '../components/Select.jsx'
import { Card, Eyebrow } from '../components/Card.jsx'
import { ArrowRightIcon, LockIcon } from '../components/Icons.jsx'
import { RISK_TIERS, MAX_RISK_SCORE } from '../lib/scoreRisk.js'

/*
  Screen 2: risk factor checklist.

  Nothing is required. An untouched form scores 0, which is a valid lower risk
  result. The tool should not feel like an interrogation, and a patient who does
  not want to disclose something should still get an answer.

  Every "why this matters" note goes in a Disclosure at body size. Per
  docs/conventions.md there is no small explanatory text under any control here.

  The running score is the reason this screen no longer reads as a form. It is
  computed in App from the same answers, passed down rather than duplicated, so
  it cannot drift. Each card shows what it is worth, which turns the score from
  something the app asserts at the end into something the reader watches happen.
*/
export default function RiskFactors({ answers, risk, onChange, onBack, onContinue }) {
  function setAnswer(id, value) {
    onChange({ ...answers, [id]: value })
  }

  const tierMeta = RISK_TIERS[risk.tier]

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Eyebrow>About you</Eyebrow>
          <h1 tabIndex={-1} className="mt-3 text-display text-ink">
            A few things about you
          </h1>
        </div>

        {/*
          The privacy promise was a sentence nobody read. As a chip it is
          visible at a glance and does not sit under a control as fine print.
        */}
        <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-eyebrow uppercase text-ink-muted">
          <LockIcon width={16} height={16} className="shrink-0" />
          Nothing leaves this device
        </p>
      </div>

      <p className="mt-4 max-w-[62ch] text-body-lg text-ink">
        These are the factors doctors weigh when they think about whether an
        infection might resist the usual antibiotic. Skip anything you would
        rather not answer.
      </p>

      <div className="mt-10 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,17rem)]">
        <div className="space-y-10">
          {FACTOR_GROUPS.map((group) => (
            <section key={group.id}>
              <h2 className="text-h2 text-ink">{group.label}</h2>

              <div className="mt-4 space-y-3">
                {getFactorsForGroup(group.id).map((factor) => {
                  if (factor.type === 'boolean') {
                    return (
                      <ChoiceCard
                        key={factor.id}
                        type="checkbox"
                        name={factor.id}
                        value={factor.id}
                        label={factor.question}
                        weight={factor.weight}
                        checked={answers[factor.id] === true}
                        onChange={(checked) => setAnswer(factor.id, checked)}
                      >
                        <Disclosure>{factor.evidence}</Disclosure>

                        {/*
                          The travel follow up only appears once travel is
                          checked, so the form stays short for everyone else.
                        */}
                        {factor.followUp && answers[factor.id] === true ? (
                          <div className="mt-4 border-t border-border pt-4">
                            <Select
                              label={factor.followUp.question}
                              value={answers[factor.followUp.id] ?? 'unsure'}
                              onChange={(value) => setAnswer(factor.followUp.id, value)}
                              options={factor.followUp.options.map((option) => ({
                                value: option.value,
                                label: option.label,
                              }))}
                              className="max-w-sm"
                            />
                          </div>
                        ) : null}
                      </ChoiceCard>
                    )
                  }

                  return (
                    <fieldset
                      key={factor.id}
                      className="rounded-card border border-border bg-surface-sunken p-4"
                    >
                      <legend className="px-1 text-body text-ink">{factor.question}</legend>

                      <div className="mt-3 space-y-2.5">
                        {factor.options.map((option) => (
                          <ChoiceCard
                            key={option.value}
                            type="radio"
                            name={factor.id}
                            value={option.value}
                            label={option.label}
                            weight={option.scores ? (option.weight ?? factor.weight) : undefined}
                            checked={answers[factor.id] === option.value}
                            onChange={(value) => setAnswer(factor.id, value)}
                          />
                        ))}
                      </div>

                      <div className="mt-3 px-1">
                        <Disclosure>{factor.evidence}</Disclosure>
                      </div>
                    </fieldset>
                  )
                })}
              </div>
            </section>
          ))}
        </div>

        {/* Desktop: the meter rides alongside the form. */}
        <Card tone="surface" pad="lg" className="sticky top-32 hidden lg:block">
          <Eyebrow>Running score</Eyebrow>
          <div className="mt-5">
            <RiskGauge
              score={risk.score}
              tier={risk.tier}
              size="sm"
              factorCount={risk.factorCount}
              announce
            />
          </div>
        </Card>
      </div>

      {/*
        Below lg the gauge would push the form off the screen, so the same
        information becomes a compact bar. It sits above the buttons in the
        flow, not over them, so it can never cover the control you are
        reaching for.
      */}
      <div className="sticky bottom-0 z-20 mt-8 border-t border-border bg-surface/95 py-3 backdrop-blur-md lg:hidden">
        <div className="flex items-center gap-4">
          <p className="shrink-0">
            <span className="tabular display text-h2 text-ink">{risk.score}</span>
            <span className="tabular text-body text-ink-muted">{` of ${MAX_RISK_SCORE}`}</span>
          </p>
          <div className="h-2.5 min-w-0 flex-1 overflow-hidden rounded-full bg-surface-sunken">
            <div
              className={`h-full rounded-full transition-[width] duration-[var(--duration-base)] ease-[var(--ease-out-soft)] ${
                {
                  low: 'bg-risk-low',
                  moderate: 'bg-risk-moderate',
                  elevated: 'bg-risk-elevated',
                }[risk.tier]
              }`}
              style={{ width: `${Math.max((risk.score / MAX_RISK_SCORE) * 100, 2)}%` }}
            />
          </div>
          <p
            className={`shrink-0 text-eyebrow uppercase ${
              {
                low: 'text-risk-low',
                moderate: 'text-risk-moderate',
                elevated: 'text-risk-elevated',
              }[risk.tier]
            }`}
          >
            {tierMeta.label}
          </p>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Button variant="primary" size="lg" onClick={onContinue}>
          Continue
          <ArrowRightIcon width={20} height={20} />
        </Button>
        <Button variant="secondary" onClick={onBack}>
          Back
        </Button>
      </div>
    </div>
  )
}
