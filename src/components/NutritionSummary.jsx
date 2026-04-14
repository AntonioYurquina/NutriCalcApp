import React from 'react'
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts'
import { useNutrition } from '../hooks/useNutrition'
import { formatNumber, getMacroPercentages } from '../utils/helpers'
import { Trash2 } from 'lucide-react'

/**
 * Componente que muestra el resumen nutricional del día
 */
export const NutritionSummary = () => {
  const { foods, calculateTotals, clearFoods } = useNutrition()
  const totals = calculateTotals()

  const macroPercentages = getMacroPercentages(
    totals.calories,
    totals.proteins,
    totals.carbs,
    totals.fats
  )

  const chartData = [
    {
      name: 'Proteína',
      value: formatNumber(totals.proteins * 4),
      percentage: macroPercentages.protein,
      color: '#3b82f6'
    },
    {
      name: 'Carbohidratos',
      value: formatNumber(totals.carbs * 4),
      percentage: macroPercentages.carbs,
      color: '#f97316'
    },
    {
      name: 'Grasas',
      value: formatNumber(totals.fats * 9),
      percentage: macroPercentages.fats,
      color: '#eab308'
    }
  ]

  const goalCalories = 2000
  const caloriePercentage = formatNumber((totals.calories / goalCalories) * 100)
  const remainingCalories = Math.max(0, goalCalories - totals.calories)

  return (
    <div className="space-y-6">
      {/* Resumen Principal */}
      <div className="glass-effect p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Resumen Nutricional del Día
        </h2>

        {foods.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Aún no has agregado alimentos
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500">
              Busca y agrega alimentos para comenzar a rastrear tu nutrición
            </p>
          </div>
        ) : (
          <>
            {/* Calorías totales */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gradient-to-br from-health-50 to-health-100 dark:from-health-900 dark:to-health-800 p-4 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Calorías consumidas</p>
                <p className="text-3xl font-bold text-health-600 dark:text-health-400">
                  {Math.round(totals.calories)}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                  Meta diaria: {goalCalories} kcal
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 p-4 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Calorías restantes</p>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {Math.round(remainingCalories)}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                  {caloriePercentage.toFixed(1)}% de tu meta
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 p-4 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Alimentos</p>
                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  {foods.length}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                  Total registrado hoy
                </p>
              </div>
            </div>

            {/* Gráfico de macronutrientes */}
            {totals.calories > 0 && (
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg mb-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                  Distribución de Macronutrientes
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percentage }) => `${name}: ${percentage.toFixed(1)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => `${value.toFixed(1)} kcal`}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Detalles nutricionales */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold mb-1">
                  PROTEÍNA
                </p>
                <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                  {formatNumber(totals.proteins)}g
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  {macroPercentages.protein.toFixed(1)}% de kcal
                </p>
              </div>

              <div className="bg-orange-50 dark:bg-orange-900/30 p-4 rounded-lg">
                <p className="text-xs text-orange-600 dark:text-orange-400 font-semibold mb-1">
                  CARBOHIDRATOS
                </p>
                <p className="text-2xl font-bold text-orange-700 dark:text-orange-300">
                  {formatNumber(totals.carbs)}g
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  {macroPercentages.carbs.toFixed(1)}% de kcal
                </p>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg">
                <p className="text-xs text-yellow-600 dark:text-yellow-400 font-semibold mb-1">
                  GRASAS
                </p>
                <p className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">
                  {formatNumber(totals.fats)}g
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  {macroPercentages.fats.toFixed(1)}% de kcal
                </p>
              </div>

              <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
                <p className="text-xs text-green-600 dark:text-green-400 font-semibold mb-1">
                  CALORÍAS
                </p>
                <p className="text-2xl font-bold text-green-700 dark:text-green-300">
                  {Math.round(totals.calories)}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  kcal totales
                </p>
              </div>
            </div>

            {/* Botón para limpiar */}
            <button
              onClick={() => {
                if (confirm('¿Estás seguro de que quieres eliminar todos los alimentos?')) {
                  clearFoods()
                }
              }}
              className="mt-6 w-full py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 rounded-lg transition-colors font-medium flex items-center justify-center space-x-2"
            >
              <Trash2 size={18} />
              <span>Limpiar todo</span>
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default NutritionSummary
