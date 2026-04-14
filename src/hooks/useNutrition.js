import { useContext } from 'react'
import { NutritionContext } from '../context/NutritionContext'

/**
 * Hook personalizado para acceder al contexto de nutrición
 * @returns {Object} Estado y funciones del contexto de nutrición
 */
export const useNutrition = () => {
  const context = useContext(NutritionContext)
  
  if (!context) {
    throw new Error('useNutrition debe usarse dentro de NutritionProvider')
  }
  
  return context
}

export default useNutrition
