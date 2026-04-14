/**
 * Formatear números a 2 decimales
 */
export const formatNumber = (num) => {
  return Math.round(num * 100) / 100
}

/**
 * Obtener porcentaje de macronutrientes
 */
export const getMacroPercentages = (calories, protein, carbs, fats) => {
  if (calories === 0) {
    return { protein: 0, carbs: 0, fats: 0 }
  }

  return {
    protein: formatNumber((protein * 4 / calories) * 100),
    carbs: formatNumber((carbs * 4 / calories) * 100),
    fats: formatNumber((fats * 9 / calories) * 100)
  }
}

/**
 * Obtener color basado en valor
 */
export const getColorByValue = (value, max) => {
  const percentage = (value / max) * 100
  
  if (percentage >= 100) return 'bg-red-500'
  if (percentage >= 90) return 'bg-orange-500'
  if (percentage >= 75) return 'bg-yellow-500'
  if (percentage >= 50) return 'bg-health-500'
  return 'bg-blue-500'
}

export default {
  formatNumber,
  getMacroPercentages,
  getColorByValue
}
