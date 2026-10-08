import React from 'react'
import { Trash2 } from 'lucide-react'
import { useNutrition } from '../hooks/useNutrition'
import { useToast } from '../hooks/useToast'
import QuantityStepper from './QuantityStepper'
import {
  MACROS,
  formatDecimal,
  formatInt,
  formatQuantity,
  getBasisLabel,
  getFoodNutrients,
} from '../utils/helpers'

/**
 * Fila de un alimento registrado: cantidad editable, aporte y botón para quitar
 */
export const FoodCard = ({ food, isNew = false }) => {
  const { removeFood, restoreFoods, updateFood, darkMode } = useNutrition()
  const { showToast } = useToast()
  const nutrients = getFoodNutrients(food)

  const handleRemove = () => {
    const removed = removeFood(food.id)
    if (!removed) return
    showToast({
      message: `Quitaste ${food.name}`,
      actionLabel: 'Deshacer',
      onAction: () => restoreFoods([removed]),
    })
  }

  return (
    <li
      className={`card row-enter grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-3 p-4 sm:p-5 md:grid-cols-[minmax(0,1fr)_auto_5.5rem_auto] ${
        isNew ? 'row-flash border-health-600 dark:border-health-500' : ''
      }`}
    >
      <div className="min-w-0">
        <h3 className="truncate font-semibold text-slate-900 dark:text-white">{food.name}</h3>
        <p className="text-sm text-muted">
          {formatInt(food.calories)} kcal {getBasisLabel(food)}
        </p>
      </div>

      <div className="col-start-1 row-start-2 md:col-start-2 md:row-start-1">
        <QuantityStepper
          name={food.name}
          unit={food.unit}
          value={food.quantity}
          onChange={(quantity) => updateFood(food.id, { quantity })}
        />
      </div>

      <p
        className="col-start-2 row-start-2 text-right md:col-start-3 md:row-start-1"
        aria-label={`${formatInt(nutrients.calories)} kilocalorías por ${formatQuantity(food)}`}
      >
        <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          {formatInt(nutrients.calories)}
        </span>{' '}
        <span className="text-sm text-muted">kcal</span>
      </p>

      <button
        type="button"
        onClick={handleRemove}
        aria-label={`Quitar ${food.name}`}
        title="Quitar"
        className="col-start-2 row-start-1 -mr-1.5 flex h-11 w-11 justify-self-end items-center justify-center rounded-xl text-slate-500 transition-colors hover:bg-red-50 hover:text-red-700 md:col-start-4 md:mr-0 md:h-10 md:w-10 dark:text-slate-400 dark:hover:bg-red-950/50 dark:hover:text-red-300"
      >
        <Trash2 size={18} aria-hidden="true" />
      </button>

      <dl className="col-span-2 grid grid-cols-3 gap-2 border-t border-slate-100 pt-3 md:row-start-2 md:col-span-4 dark:border-slate-800">
        {MACROS.map((macro) => (
          <div key={macro.key} className="min-w-0">
            <dt className="flex items-center gap-1.5 text-xs text-muted">
              <span
                aria-hidden="true"
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ backgroundColor: macro.colors[darkMode ? 'dark' : 'light'] }}
              />
              <span className="truncate">{macro.label}</span>
            </dt>
            <dd className="mt-0.5 text-sm font-semibold tabular-nums text-slate-800 dark:text-slate-200">
              {formatDecimal(nutrients[macro.key])} g
            </dd>
          </div>
        ))}
      </dl>
    </li>
  )
}

export default FoodCard
