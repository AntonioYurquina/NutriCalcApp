import React from 'react'
import { Search, SlidersHorizontal, PieChart, Sparkles } from 'lucide-react'
import { useNutrition } from '../hooks/useNutrition'
import { useToast } from '../hooks/useToast'
import { getSampleDay } from '../services/foodService'

const STEPS = [
  {
    icon: Search,
    title: 'Buscá',
    text: 'Escribí el nombre de un alimento en el buscador.',
  },
  {
    icon: SlidersHorizontal,
    title: 'Ajustá',
    text: 'Elegí cuántos gramos o unidades comiste.',
  },
  {
    icon: PieChart,
    title: 'Mirá tu día',
    text: 'Calorías y macros se actualizan al instante.',
  },
]

/**
 * Estado vacío: explica el flujo y permite probar la app con un día de ejemplo
 */
export const EmptyState = () => {
  const { addFoods, clearFoods } = useNutrition()
  const { showToast } = useToast()

  const loadSample = () => {
    addFoods(getSampleDay())
    showToast({
      message: 'Cargamos un día de ejemplo',
      actionLabel: 'Deshacer',
      onAction: clearFoods,
    })
  }

  return (
    <section
      aria-labelledby="estado-vacio"
      className="rounded-2xl border border-dashed border-slate-300 bg-white/60 px-5 py-8 text-center sm:px-8 dark:border-slate-700 dark:bg-slate-900/40"
    >
      <h2 id="estado-vacio" className="text-xl font-semibold tracking-tight">
        Todavía no cargaste nada hoy
      </h2>
      <p className="mx-auto mt-1 max-w-md text-sm text-muted">
        Sumá tu primer alimento desde el buscador y acá vas a ver cómo se arma tu día.
      </p>

      <ol className="mx-auto mt-6 grid max-w-2xl gap-4 text-left sm:grid-cols-3">
        {STEPS.map(({ icon: Icon, title, text }, index) => (
          <li key={title} className="flex gap-3 sm:flex-col sm:gap-2">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-health-100 text-health-800 dark:bg-health-900 dark:text-health-200">
              <Icon size={20} aria-hidden="true" />
            </span>
            <span>
              <span className="block text-sm font-semibold text-slate-900 dark:text-white">
                {index + 1}. {title}
              </span>
              <span className="block text-sm text-muted">{text}</span>
            </span>
          </li>
        ))}
      </ol>

      <div className="mt-7 border-t border-slate-200 pt-6 dark:border-slate-800">
        <p className="text-sm text-muted">¿Querés ver cómo funciona antes de cargar tus comidas?</p>
        <button type="button" onClick={loadSample} className="btn-secondary mt-3">
          <Sparkles size={16} aria-hidden="true" />
          Cargar un día de ejemplo
        </button>
      </div>
    </section>
  )
}

export default EmptyState
