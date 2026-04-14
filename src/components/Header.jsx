import React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useNutrition } from '../hooks/useNutrition'

/**
 * Componente de encabezado con toggle de modo oscuro
 */
export const Header = () => {
  const { darkMode, setDarkMode } = useNutrition()

  return (
    <header className="glass-effect sticky top-0 z-50 shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-health-400 to-health-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">🥗</span>
          </div>
          <h1 className="text-2xl font-bold text-health-600 dark:text-health-400">
            NutriCalc
          </h1>
        </div>
        
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          aria-label="Toggle dark mode"
        >
          {darkMode ? (
            <Sun size={20} className="text-yellow-400" />
          ) : (
            <Moon size={20} className="text-gray-600" />
          )}
        </button>
      </div>
    </header>
  )
}

export default Header
