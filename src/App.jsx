import React from 'react'
import { NutritionProvider } from './context/NutritionContext'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import DailyFoodList from './components/DailyFoodList'
import NutritionSummary from './components/NutritionSummary'
import EmptyState from './components/EmptyState'
import { useNutrition } from './hooks/useNutrition'
import './App.css'

/**
 * Contenido principal de la aplicación
 */
function AppContent() {
  const { foods, addFood } = useNutrition()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Sección de búsqueda */}
        <div className="glass-effect p-6 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Buscar y agregar alimentos
          </h2>
          <SearchBar onSelect={addFood} />
        </div>

        {foods.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {/* Resumen nutricional */}
            <NutritionSummary />

            {/* Lista de alimentos */}
            <DailyFoodList />
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-12 py-6 border-t border-gray-200 dark:border-gray-700 text-center text-gray-600 dark:text-gray-400">
        <p>
          NutriCalc © 2024 - Calculadora de consumo nutricional diario
        </p>
        <p className="text-sm mt-2">
          Los datos se guardan localmente en tu navegador
        </p>
      </footer>
    </div>
  )
}

/**
 * Componente raíz de la aplicación
 */
function App() {
  return (
    <NutritionProvider>
      <AppContent />
    </NutritionProvider>
  )
}

export default App
