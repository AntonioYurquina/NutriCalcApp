import React, { useState } from 'react'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { useNutrition } from '../hooks/useNutrition'

/**
 * Tarjeta de comida consumida
 */
export const FoodCard = ({ food }) => {
  const { removeFood, updateFood } = useNutrition()
  const [quantity, setQuantity] = useState(food.quantity || 1)

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity > 0) {
      setQuantity(newQuantity)
      updateFood(food.id, { quantity: newQuantity })
    }
  }

  const multiplier = food.unit === 'g' ? quantity / 100 : quantity

  return (
    <div className="glass-effect p-4 rounded-lg hover:shadow-lg transition-all">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white truncate">
            {food.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {quantity}{food.unit}
          </p>
        </div>
        <button
          onClick={() => removeFood(food.id)}
          className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg transition-colors"
          aria-label="Eliminar alimento"
        >
          <Trash2 size={18} />
        </button>
      </div>

      {/* Controles de cantidad */}
      <div className="flex items-center space-x-2 mb-4 bg-gray-100 dark:bg-gray-700 rounded-lg p-2">
        <button
          onClick={() => handleQuantityChange(quantity - 1)}
          className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
          aria-label="Disminuir cantidad"
        >
          <Minus size={16} />
        </button>
        <input
          type="number"
          value={quantity}
          onChange={(e) => {
            const val = parseFloat(e.target.value)
            if (!isNaN(val)) handleQuantityChange(val)
          }}
          className="flex-1 text-center bg-transparent font-semibold dark:text-white"
          min="0.1"
          step="0.1"
        />
        <button
          onClick={() => handleQuantityChange(quantity + 1)}
          className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
          aria-label="Aumentar cantidad"
        >
          <Plus size={16} />
        </button>
      </div>

      {/* Información nutricional */}
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="bg-white dark:bg-gray-800 p-2 rounded">
          <p className="text-gray-600 dark:text-gray-400 text-xs">Calorías</p>
          <p className="font-bold text-health-600">{Math.round(food.calories * multiplier)}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-2 rounded">
          <p className="text-gray-600 dark:text-gray-400 text-xs">Proteína</p>
          <p className="font-bold text-blue-600">{(food.proteins * multiplier).toFixed(1)}g</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-2 rounded">
          <p className="text-gray-600 dark:text-gray-400 text-xs">Carbs</p>
          <p className="font-bold text-orange-600">{(food.carbs * multiplier).toFixed(1)}g</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-2 rounded">
          <p className="text-gray-600 dark:text-gray-400 text-xs">Grasas</p>
          <p className="font-bold text-yellow-600">{(food.fats * multiplier).toFixed(1)}g</p>
        </div>
      </div>
    </div>
  )
}

export default FoodCard
