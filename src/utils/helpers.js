const intFormat = new Intl.NumberFormat('es-AR', { maximumFractionDigits: 0 })
const decimalFormat = new Intl.NumberFormat('es-AR', { maximumFractionDigits: 1 })

/**
 * Formatear números a 2 decimales
 */
export const formatNumber = (num) => {
  return Math.round(num * 100) / 100
}

/**
 * Número entero con formato es-AR (1.234)
 */
export const formatInt = (num) => intFormat.format(Math.round(num || 0))

/**
 * Número con hasta un decimal y coma decimal (46,5)
 */
export const formatDecimal = (num) => decimalFormat.format(Math.round((num || 0) * 10) / 10)

/**
 * Macronutrientes: etiqueta, aporte energético por gramo y colores.
 * Los colores pasaron la validación de paleta categórica (CVD y contraste).
 */
export const MACROS = [
  { key: 'proteins', label: 'Proteína', kcalPerGram: 4, colors: { light: '#2a78d6', dark: '#3987e5' } },
  { key: 'carbs', label: 'Carbohidratos', kcalPerGram: 4, colors: { light: '#eda100', dark: '#c98500' } },
  { key: 'fats', label: 'Grasas', kcalPerGram: 9, colors: { light: '#e87ba4', dark: '#d55181' } },
]

/**
 * Los valores de la base son por 100 g / 100 ml, o por unidad.
 */
export const getMultiplier = (food, quantity = food.quantity) => {
  const q = Number(quantity) || 0
  return food.unit === 'unidad' ? q : q / 100
}

/**
 * Aporte nutricional de un alimento según su cantidad
 */
export const getFoodNutrients = (food, quantity = food.quantity) => {
  const m = getMultiplier(food, quantity)
  return {
    calories: (food.calories || 0) * m,
    proteins: (food.proteins || 0) * m,
    carbs: (food.carbs || 0) * m,
    fats: (food.fats || 0) * m,
  }
}

export const getDefaultQuantity = (food) => {
  if (food.portion > 0) return food.portion
  return food.unit === 'unidad' ? 1 : 100
}

/**
 * Reglas de edición de cantidad según unidad
 */
export const getQuantityRules = (unit) =>
  unit === 'unidad'
    ? { min: 0.5, max: 100, step: 1 }
    : { min: 1, max: 10000, step: 10 }

export const getUnitLabel = (unit, quantity) => {
  if (unit === 'unidad') return Number(quantity) === 1 ? 'unidad' : 'unidades'
  return unit
}

export const getBasisLabel = (food) =>
  food.unit === 'unidad' ? 'por unidad' : `por 100 ${food.unit}`

export const formatQuantity = (food, quantity = food.quantity) =>
  `${formatDecimal(quantity)} ${getUnitLabel(food.unit, quantity)}`

/**
 * Obtener porcentaje de macronutrientes sobre el aporte energético total de macros
 */
export const getMacroPercentages = (calories, protein, carbs, fats) => {
  const energy = { protein: protein * 4, carbs: carbs * 4, fats: fats * 9 }
  const total = energy.protein + energy.carbs + energy.fats

  if (!calories || total === 0) {
    return { protein: 0, carbs: 0, fats: 0 }
  }

  return {
    protein: formatNumber((energy.protein / total) * 100),
    carbs: formatNumber((energy.carbs / total) * 100),
    fats: formatNumber((energy.fats / total) * 100),
  }
}

export default {
  formatNumber,
  formatInt,
  formatDecimal,
  getMultiplier,
  getFoodNutrients,
  getMacroPercentages,
}
