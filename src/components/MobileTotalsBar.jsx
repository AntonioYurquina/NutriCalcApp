import React from 'react'
import { ChevronUp } from 'lucide-react'
import { useNutrition } from '../hooks/useNutrition'
import { useElementInView } from '../hooks/useUi'
import { MACROS, formatDecimal, formatInt } from '../utils/helpers'

/**
 * Barra fija en móvil con los totales del día cuando el resumen no está a la vista
 */
export const MobileTotalsBar = () => {
  const { foods, totals, goalCalories, darkMode } = useNutrition()
  const summaryInView = useElementInView('resumen')

  if (foods.length === 0 || summaryInView) return null

  const progress = Math.min(100, (totals.calories / goalCalories) * 100)
  const isOver = totals.calories > goalCalories

  return (
    <a
      href="#resumen"
      aria-label={`Ver resumen del día: ${formatInt(totals.calories)} de ${formatInt(goalCalories)} kilocalorías`}
      className="row-enter fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_16px_rgba(15,23,42,0.08)] backdrop-blur lg:hidden dark:border-slate-800 dark:bg-slate-900/95"
    >
      <div className="h-1 bg-slate-200 dark:bg-slate-700" aria-hidden="true">
        <div
          className={`h-full transition-[width] duration-500 ${isOver ? 'bg-amber-600' : 'bg-health-700 dark:bg-health-500'}`}
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex items-center justify-between gap-3 px-4 py-2.5" aria-hidden="true">
        <p className="whitespace-nowrap text-lg font-bold tabular-nums leading-tight text-slate-900 dark:text-white">
          {formatInt(totals.calories)}
          <span className="ml-1 text-xs font-medium text-muted">/ {formatInt(goalCalories)} kcal</span>
        </p>
        <ul className="flex items-center gap-3 text-xs font-semibold tabular-nums text-slate-800 dark:text-slate-200">
          {MACROS.map((m) => (
            <li key={m.key} className="flex items-center gap-1">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: m.colors[darkMode ? 'dark' : 'light'] }}
              />
              {m.label[0]} {formatDecimal(totals[m.key])} g
            </li>
          ))}
        </ul>
        <ChevronUp size={18} className="shrink-0 text-slate-500" />
      </div>
    </a>
  )
}

export default MobileTotalsBar
