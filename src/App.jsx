import React from 'react'
import { NutritionProvider } from './context/NutritionContext'
import { ToastProvider } from './context/ToastContext'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import DailyFoodList from './components/DailyFoodList'
import NutritionSummary from './components/NutritionSummary'
import MobileTotalsBar from './components/MobileTotalsBar'
import EmptyState from './components/EmptyState'
import { useNutrition } from './hooks/useNutrition'
import { useToast } from './hooks/useToast'
import { formatQuantity } from './utils/helpers'

/**
 * Contenido principal de la aplicación
 */
function AppContent() {
  const { foods, addFood } = useNutrition()
  const { showToast } = useToast()

  const handleSelect = (food) => {
    const added = addFood(food)
    showToast({ message: `Agregaste ${added.name} (${formatQuantity(added)})` })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-xl focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-slate-900 focus:shadow-lg dark:focus:bg-slate-900 dark:focus:text-white"
      >
        Saltar al contenido
      </a>
      <Header />

      <main id="contenido" className="mx-auto w-full max-w-6xl flex-1 px-4 pb-28 pt-6 sm:px-6 sm:pt-8 lg:pb-12">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start lg:gap-x-6">
          <section className="card relative z-20 p-5 sm:p-6 lg:col-start-1 lg:row-start-1">
            <SearchBar onSelect={handleSelect} />
          </section>

          <div className="lg:sticky lg:top-24 lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <NutritionSummary />
          </div>

          <div className="lg:col-start-1 lg:row-start-2">
            {foods.length === 0 ? <EmptyState /> : <DailyFoodList />}
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-200 py-6 dark:border-slate-800">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            <span className="font-semibold text-slate-800 dark:text-slate-200">NutriCalc</span>
            {' · '}Calculadora de calorías y macros
          </p>
          <p>Tus datos se guardan solo en este navegador. Los valores son aproximados.</p>
        </div>
      </footer>

      <MobileTotalsBar />
    </div>
  )
}

/**
 * Componente raíz de la aplicación
 */
function App() {
  return (
    <NutritionProvider>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </NutritionProvider>
  )
}

export default App
