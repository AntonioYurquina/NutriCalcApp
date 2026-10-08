import React from 'react'
import { Trash2 } from 'lucide-react'
import FoodCard from './FoodCard'
import { useNutrition } from '../hooks/useNutrition'
import { useToast } from '../hooks/useToast'

/**
 * Lista de alimentos consumidos durante el día
 */
export const DailyFoodList = () => {
  const { foods, clearFoods, restoreFoods, recentId } = useNutrition()
  const { showToast } = useToast()

  if (foods.length === 0) {
    return null
  }

  const handleClear = () => {
    const removed = clearFoods()
    showToast({
      message: `Quitaste ${removed.length} ${removed.length === 1 ? 'alimento' : 'alimentos'}`,
      actionLabel: 'Deshacer',
      onAction: () => restoreFoods(removed),
    })
  }

  return (
    <section aria-labelledby="alimentos-registrados">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2
          id="alimentos-registrados"
          className="flex items-center gap-2 text-lg font-semibold tracking-tight sm:text-xl"
        >
          Alimentos de hoy
          <span className="rounded-full bg-slate-200 px-2.5 py-0.5 text-sm font-semibold tabular-nums text-slate-700 dark:bg-slate-800 dark:text-slate-200">
            {foods.length}
          </span>
        </h2>
        <button type="button" onClick={handleClear} className="btn btn-ghost-danger -mr-2 whitespace-nowrap">
          <Trash2 size={16} aria-hidden="true" />
          Limpiar todo
        </button>
      </div>

      <ul className="space-y-3">
        {foods.map((food) => (
          <FoodCard key={food.id} food={food} isNew={food.id === recentId} />
        ))}
      </ul>
    </section>
  )
}

export default DailyFoodList
