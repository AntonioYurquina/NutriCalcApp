import React from 'react'
import FoodCard from './FoodCard'
import { useNutrition } from '../hooks/useNutrition'

/**
 * Lista de alimentos consumidos durante el día
 */
export const DailyFoodList = () => {
  const { foods } = useNutrition()

  if (foods.length === 0) {
    return null
  }

  return (
    <div className="glass-effect p-6 rounded-lg">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        Alimentos registrados ({foods.length})
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {foods.map((food) => (
          <FoodCard key={food.id} food={food} />
        ))}
      </div>
    </div>
  )
}

export default DailyFoodList
