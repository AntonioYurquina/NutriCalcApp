import React, { useMemo, useState } from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { Pencil, TriangleAlert } from 'lucide-react'
import { useNutrition } from '../hooks/useNutrition'
import { usePrefersReducedMotion, useDebouncedValue } from '../hooks/useUi'
import { GOAL_LIMITS } from '../context/NutritionContext'
import { MACROS, formatDecimal, formatInt } from '../utils/helpers'

const SURFACE = { light: '#ffffff', dark: '#0f172a' }
const TRACK = { light: '#e2e8f0', dark: '#334155' }

const ChartTooltip = ({ active, payload }) => {
  const item = payload?.[0]?.payload
  if (!active || !item || item.empty) return null
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-lg dark:border-slate-700 dark:bg-slate-800">
      <p className="font-semibold text-slate-900 dark:text-white">{item.label}</p>
      <p className="text-muted">
        {formatInt(item.value)} kcal · {Math.round(item.share)} %
      </p>
    </div>
  )
}

const GoalEditor = ({ goal, onSave, onCancel }) => {
  const [draft, setDraft] = useState(String(goal))
  const value = Number(draft)
  const valid = Number.isFinite(value) && value >= GOAL_LIMITS.min && value <= GOAL_LIMITS.max

  const save = () => {
    if (valid && onSave(value)) onCancel()
  }

  return (
    <div>
      <label htmlFor="meta-diaria" className="text-sm font-medium">
        Meta diaria (kcal)
      </label>
      <div className="mt-1.5 flex flex-wrap items-center gap-2">
        <input
          id="meta-diaria"
          type="text"
          inputMode="numeric"
          autoFocus
          value={draft}
          onChange={(e) => setDraft(e.target.value.replace(/\D/g, '').slice(0, 4))}
          onKeyDown={(e) => {
            if (e.key === 'Enter') save()
            if (e.key === 'Escape') onCancel()
          }}
          aria-invalid={!valid}
          aria-describedby="meta-ayuda"
          className="h-10 w-28 rounded-xl border border-slate-300 bg-white px-3 text-base font-semibold tabular-nums text-slate-900 focus:border-health-700 focus:outline-none focus:ring-2 focus:ring-health-700/40 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:focus:border-health-400 dark:focus:ring-health-400/40"
        />
        <button type="button" onClick={save} disabled={!valid} className="btn-primary">
          Guardar
        </button>
        <button type="button" onClick={onCancel} className="btn-secondary">
          Cancelar
        </button>
      </div>
      <p id="meta-ayuda" className="mt-1.5 text-xs text-muted">
        Entre {GOAL_LIMITS.min} y {GOAL_LIMITS.max} kcal.
      </p>
    </div>
  )
}

/**
 * Resumen nutricional del día: calorías vs. meta y reparto de macronutrientes
 */
export const NutritionSummary = () => {
  const { foods, totals, goalCalories, setGoalCalories, darkMode } = useNutrition()
  const reducedMotion = usePrefersReducedMotion()
  const [editingGoal, setEditingGoal] = useState(false)
  const mode = darkMode ? 'dark' : 'light'

  const macros = useMemo(() => {
    const energy = MACROS.map((m) => ({ ...m, grams: totals[m.key], value: totals[m.key] * m.kcalPerGram }))
    const total = energy.reduce((sum, m) => sum + m.value, 0)
    return energy.map((m) => ({ ...m, share: total > 0 ? (m.value / total) * 100 : 0 }))
  }, [totals])

  const hasData = totals.calories > 0
  const chartData = hasData
    ? macros.map((m) => ({ ...m, color: m.colors[mode] }))
    : [{ label: 'Sin datos', value: 1, color: TRACK[mode], empty: true }]

  const progress = goalCalories > 0 ? totals.calories / goalCalories : 0
  const remaining = goalCalories - totals.calories
  const isOver = remaining < 0

  const announcement = useDebouncedValue(
    hasData
      ? `Total del día: ${formatInt(totals.calories)} de ${formatInt(goalCalories)} kilocalorías. ` +
          `Proteínas ${formatDecimal(totals.proteins)} gramos, carbohidratos ${formatDecimal(totals.carbs)} gramos, grasas ${formatDecimal(totals.fats)} gramos.`
      : 'Todavía no hay alimentos registrados.',
    700
  )

  return (
    <section
      id="resumen"
      aria-labelledby="resumen-titulo"
      className="card scroll-mt-24 p-5 sm:p-6"
    >
      <div className="flex items-baseline justify-between gap-3">
        <h2 id="resumen-titulo" className="text-lg font-semibold tracking-tight sm:text-xl">
          Resumen del día
        </h2>
        <p className="text-sm text-muted">
          {foods.length} {foods.length === 1 ? 'alimento' : 'alimentos'}
        </p>
      </div>

      <p role="status" className="sr-only">{announcement}</p>

      <div className="mt-5 grid grid-cols-[7.5rem_minmax(0,1fr)] items-center gap-x-4 gap-y-5 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-x-8 lg:grid-cols-1">
        <div className="relative h-[7.5rem] w-[7.5rem] justify-self-center sm:h-44 sm:w-44 lg:h-48 lg:w-48" aria-hidden="true">
          <ResponsiveContainer width="100%" height="100%" minWidth={0}>
            <PieChart accessibilityLayer={false}>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="label"
                innerRadius="70%"
                outerRadius="100%"
                startAngle={90}
                endAngle={-270}
                stroke={SURFACE[mode]}
                strokeWidth={hasData ? 2 : 0}
                isAnimationActive={!reducedMotion}
                animationDuration={500}
              >
                {chartData.map((entry) => (
                  <Cell key={entry.label} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<ChartTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold leading-none tracking-tight text-slate-900 sm:text-3xl dark:text-white">
              {formatInt(totals.calories)}
            </span>
            <span className="mt-1 text-xs font-medium text-muted">kcal</span>
          </div>
        </div>

        <div className="lg:order-3">
          <ul aria-label="Macronutrientes del día" className="space-y-3.5">
            {macros.map((m) => (
              <li key={m.key}>
                <div className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-2 text-sm font-medium text-slate-800 dark:text-slate-200">
                    <span
                      aria-hidden="true"
                      className="h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: m.colors[mode] }}
                    />
                    {m.label}
                  </span>
                  <span className="whitespace-nowrap text-sm font-semibold tabular-nums text-slate-900 dark:text-white">
                    {formatDecimal(m.grams)} g
                  </span>
                </div>
                <div className="mt-1.5 flex items-center gap-2">
                  <div
                    aria-hidden="true"
                    className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700"
                  >
                    <div
                      className="h-full rounded-full transition-[width] duration-500 ease-out"
                      style={{ width: `${m.share}%`, backgroundColor: m.colors[mode] }}
                    />
                  </div>
                  <span className="w-12 text-right text-xs tabular-nums text-muted">
                    {Math.round(m.share)} %
                  </span>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-muted">
            {hasData
              ? 'El porcentaje indica cuánta energía aporta cada macro.'
              : 'Agregá un alimento para ver el reparto de macros.'}
          </p>
        </div>
        <div className="col-span-2 border-t border-slate-100 pt-4 lg:order-2 lg:col-span-1 dark:border-slate-800">
          {editingGoal ? (
            <GoalEditor
              goal={goalCalories}
              onSave={setGoalCalories}
              onCancel={() => setEditingGoal(false)}
            />
          ) : (
            <>
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm text-muted">
                  Meta diaria:{' '}
                  <span className="font-semibold tabular-nums text-slate-900 dark:text-white">
                    {formatInt(goalCalories)} kcal
                  </span>
                </p>
                <button
                  type="button"
                  onClick={() => setEditingGoal(true)}
                  className="-mr-2 inline-flex h-9 items-center gap-1.5 rounded-lg px-2.5 text-sm font-medium text-health-800 transition-colors hover:bg-health-50 dark:text-health-300 dark:hover:bg-slate-800"
                >
                  <Pencil size={14} aria-hidden="true" />
                  Editar
                </button>
              </div>

              <div
                role="progressbar"
                aria-label="Calorías consumidas respecto de la meta diaria"
                aria-valuemin={0}
                aria-valuemax={goalCalories}
                aria-valuenow={Math.round(Math.min(totals.calories, goalCalories))}
                aria-valuetext={`${formatInt(totals.calories)} de ${formatInt(goalCalories)} kilocalorías`}
                className="mt-2 h-2.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700"
              >
                <div
                  className={`h-full rounded-full transition-[width] duration-500 ease-out ${
                    isOver ? 'bg-amber-600' : 'bg-health-700 dark:bg-health-500'
                  }`}
                  style={{ width: `${Math.min(100, progress * 100)}%` }}
                />
              </div>

              <div className="mt-2 flex items-center justify-between gap-2 text-sm">
                {isOver ? (
                  <p className="flex items-center gap-1.5 font-semibold text-amber-800 dark:text-amber-300">
                    <TriangleAlert size={16} aria-hidden="true" />
                    Te pasaste por {formatInt(-remaining)} kcal
                  </p>
                ) : (
                  <p className="font-semibold text-slate-900 dark:text-white">
                    Te quedan {formatInt(remaining)} kcal
                  </p>
                )}
                <p className="tabular-nums text-muted">{Math.round(progress * 100)} %</p>
              </div>
            </>
          )}
        </div>

      </div>
    </section>
  )
}

export default NutritionSummary
