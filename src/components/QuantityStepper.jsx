import React, { useState, useEffect, useId } from 'react'
import { Minus, Plus } from 'lucide-react'
import { getQuantityRules, getUnitLabel } from '../utils/helpers'

const round = (n) => Math.round(n * 100) / 100

const unitName = (unit) => (unit === 'g' ? 'gramos' : unit === 'ml' ? 'mililitros' : 'unidades')

/**
 * Control de cantidad: botones -/+, campo numérico editable y unidad visible
 */
export const QuantityStepper = ({ name, unit, value, onChange }) => {
  const inputId = useId()
  const { min, max, step } = getQuantityRules(unit)
  const [draft, setDraft] = useState(String(value))

  useEffect(() => {
    setDraft((current) => (parseFloat(current) === value ? current : String(value)))
  }, [value])

  const commit = (next) => {
    const clamped = Math.min(max, Math.max(min, round(next)))
    onChange(clamped)
    return clamped
  }

  const nudge = (direction) => {
    const next =
      direction > 0
        ? (Math.floor(value / step + 1e-9) + 1) * step
        : (Math.ceil(value / step - 1e-9) - 1) * step
    setDraft(String(commit(next)))
  }

  const handleChange = (e) => {
    const raw = e.target.value
    setDraft(raw)
    const parsed = parseFloat(raw)
    if (Number.isFinite(parsed) && parsed > 0) {
      const clamped = Math.min(max, round(parsed))
      if (clamped !== parsed) setDraft(String(clamped))
      if (clamped >= min) onChange(clamped)
    }
  }

  const invalid = draft !== '' && !(parseFloat(draft) >= min)

  return (
    <div
      className={`inline-flex items-center rounded-xl border bg-white shadow-sm focus-within:ring-2 dark:bg-slate-800 ${
        invalid
          ? 'border-red-500 focus-within:ring-red-500/40'
          : 'border-slate-300 focus-within:border-health-700 focus-within:ring-health-700/40 dark:border-slate-600 dark:focus-within:border-health-400 dark:focus-within:ring-health-400/40'
      }`}
    >
      <button
        type="button"
        onClick={() => nudge(-1)}
        disabled={value <= min}
        aria-label={`Disminuir cantidad de ${name}`}
        className="flex h-11 w-11 items-center justify-center rounded-l-xl text-slate-700 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent sm:h-10 sm:w-10 dark:text-slate-200 dark:hover:bg-slate-700"
      >
        <Minus size={16} aria-hidden="true" />
      </button>

      <label htmlFor={inputId} className="sr-only">
        Cantidad de {name} en {unitName(unit)}
      </label>
      <input
        id={inputId}
        type="number"
        inputMode="decimal"
        value={draft}
        min={min}
        max={max}
        step={unit === 'unidad' ? 0.5 : step}
        onChange={handleChange}
        onBlur={() => setDraft(String(value))}
        aria-invalid={invalid || undefined}
        className="h-11 w-14 bg-transparent text-right text-base font-semibold tabular-nums text-slate-900 focus:outline-none sm:h-10 dark:text-white"
      />
      <span
        aria-hidden="true"
        className={`ml-1.5 mr-1 select-none text-left text-sm text-muted ${unit === 'unidad' ? 'w-[3.75rem]' : 'w-6'}`}
      >
        {getUnitLabel(unit, value)}
      </span>

      <button
        type="button"
        onClick={() => nudge(1)}
        disabled={value >= max}
        aria-label={`Aumentar cantidad de ${name}`}
        className="flex h-11 w-11 items-center justify-center rounded-r-xl text-slate-700 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent sm:h-10 sm:w-10 dark:text-slate-200 dark:hover:bg-slate-700"
      >
        <Plus size={16} aria-hidden="true" />
      </button>
    </div>
  )
}

export default QuantityStepper
