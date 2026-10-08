import React from 'react'
import { Leaf, Moon, Sun } from 'lucide-react'
import { useNutrition } from '../hooks/useNutrition'

/**
 * Encabezado fijo con marca y alternador de modo oscuro
 */
export const Header = () => {
  const { darkMode, setDarkMode } = useNutrition()

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/85 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-health-500 to-health-700 text-white shadow-sm"
            aria-hidden="true"
          >
            <Leaf size={22} strokeWidth={2.25} />
          </div>
          <div className="leading-tight">
            <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              NutriCalc
            </h1>
            <p className="hidden text-xs text-muted sm:block">
              Calculadora de calorías y macros
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setDarkMode(!darkMode)}
          aria-pressed={darkMode}
          aria-label="Modo oscuro"
          title={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
        >
          {darkMode ? <Sun size={20} aria-hidden="true" /> : <Moon size={20} aria-hidden="true" />}
        </button>
      </div>
    </header>
  )
}

export default Header
