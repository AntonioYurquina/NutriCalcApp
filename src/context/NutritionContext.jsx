import React, { createContext, useState, useEffect } from 'react'

export const NutritionContext = createContext()

export const NutritionProvider = ({ children }) => {
  const [foods, setFoods] = useState([])
  const [darkMode, setDarkMode] = useState(false)

  // Cargar datos del localStorage
  useEffect(() => {
    const savedFoods = localStorage.getItem('nutriCalcFoods')
    const savedDarkMode = localStorage.getItem('darkMode')
    
    if (savedFoods) {
      setFoods(JSON.parse(savedFoods))
    }
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode))
    }
  }, [])

  // Guardar datos en localStorage
  useEffect(() => {
    localStorage.setItem('nutriCalcFoods', JSON.stringify(foods))
  }, [foods])

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const addFood = (food) => {
    const newFood = {
      id: Date.now(),
      ...food,
      timestamp: new Date().toISOString()
    }
    setFoods([...foods, newFood])
  }

  const removeFood = (id) => {
    setFoods(foods.filter(food => food.id !== id))
  }

  const updateFood = (id, updatedFood) => {
    setFoods(foods.map(food => 
      food.id === id ? { ...food, ...updatedFood } : food
    ))
  }

  const clearFoods = () => {
    setFoods([])
  }

  // Calcular totales nutricionales
  const calculateTotals = () => {
    return foods.reduce(
      (totals, food) => {
        const quantity = food.quantity || 1
        const multiplier = food.unit === 'g' ? quantity / 100 : quantity
        
        return {
          calories: totals.calories + (food.calories * multiplier),
          proteins: totals.proteins + (food.proteins * multiplier),
          carbs: totals.carbs + (food.carbs * multiplier),
          fats: totals.fats + (food.fats * multiplier),
        }
      },
      { calories: 0, proteins: 0, carbs: 0, fats: 0 }
    )
  }

  const value = {
    foods,
    addFood,
    removeFood,
    updateFood,
    clearFoods,
    calculateTotals,
    darkMode,
    setDarkMode
  }

  return (
    <NutritionContext.Provider value={value}>
      {children}
    </NutritionContext.Provider>
  )
}
