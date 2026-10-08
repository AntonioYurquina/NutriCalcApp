import React, { createContext, useState, useEffect, useMemo, useCallback, useRef } from 'react'
import { getDefaultQuantity, getFoodNutrients } from '../utils/helpers'

export const NutritionContext = createContext()

export const DEFAULT_GOAL = 2000
export const GOAL_LIMITS = { min: 800, max: 6000 }

const readStorage = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key)
    return raw === null ? fallback : JSON.parse(raw)
  } catch {
    return fallback
  }
}

const writeStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // almacenamiento no disponible: la app sigue funcionando sin persistir
  }
}

const createId = () =>
  globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`

const loadFoods = () => {
  const saved = readStorage('nutriCalcFoods', [])
  if (!Array.isArray(saved)) return []
  return saved.map((food) => ({
    ...food,
    quantity: Number(food.quantity) > 0 ? Number(food.quantity) : getDefaultQuantity(food),
  }))
}

const loadDarkMode = () => {
  const saved = readStorage('darkMode', null)
  if (typeof saved === 'boolean') return saved
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false
}

export const NutritionProvider = ({ children }) => {
  const [foods, setFoods] = useState(loadFoods)
  const [darkMode, setDarkModeState] = useState(loadDarkMode)
  const [goalCalories, setGoalState] = useState(() => {
    const saved = Number(readStorage('nutriCalcGoal', DEFAULT_GOAL))
    return saved >= GOAL_LIMITS.min && saved <= GOAL_LIMITS.max ? saved : DEFAULT_GOAL
  })
  const [recentId, setRecentId] = useState(null)
  const recentTimer = useRef(null)

  useEffect(() => {
    writeStorage('nutriCalcFoods', foods)
  }, [foods])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  useEffect(() => () => clearTimeout(recentTimer.current), [])

  const setDarkMode = useCallback((value) => {
    setDarkModeState(value)
    writeStorage('darkMode', value)
  }, [])

  const setGoalCalories = useCallback((value) => {
    const next = Math.round(Number(value))
    if (!Number.isFinite(next)) return false
    const clamped = Math.min(GOAL_LIMITS.max, Math.max(GOAL_LIMITS.min, next))
    setGoalState(clamped)
    writeStorage('nutriCalcGoal', clamped)
    return true
  }, [])

  const markRecent = useCallback((id) => {
    setRecentId(id)
    clearTimeout(recentTimer.current)
    recentTimer.current = setTimeout(() => setRecentId(null), 1600)
  }, [])

  const addFood = useCallback((food, quantity) => {
    const newFood = {
      ...food,
      foodId: food.id,
      id: createId(),
      quantity: quantity > 0 ? quantity : getDefaultQuantity(food),
      timestamp: new Date().toISOString(),
    }
    setFoods((prev) => [...prev, newFood])
    markRecent(newFood.id)
    return newFood
  }, [markRecent])

  const addFoods = useCallback((items) => {
    const created = items.map(({ food, quantity }) => ({
      ...food,
      foodId: food.id,
      id: createId(),
      quantity: quantity > 0 ? quantity : getDefaultQuantity(food),
      timestamp: new Date().toISOString(),
    }))
    setFoods((prev) => [...prev, ...created])
    return created
  }, [])

  const removeFood = useCallback((id) => {
    const index = foods.findIndex((food) => food.id === id)
    if (index === -1) return null
    const removed = { food: foods[index], index }
    setFoods((prev) => prev.filter((food) => food.id !== id))
    return removed
  }, [foods])

  const restoreFoods = useCallback((items) => {
    setFoods((prev) => {
      const next = [...prev]
      ;[...items]
        .sort((a, b) => a.index - b.index)
        .forEach(({ food, index }) => next.splice(Math.min(index, next.length), 0, food))
      return next
    })
  }, [])

  const updateFood = useCallback((id, updatedFood) => {
    setFoods((prev) => prev.map((food) => (food.id === id ? { ...food, ...updatedFood } : food)))
  }, [])

  const clearFoods = useCallback(() => {
    const removed = foods.map((food, index) => ({ food, index }))
    setFoods([])
    return removed
  }, [foods])

  const totals = useMemo(
    () =>
      foods.reduce(
        (acc, food) => {
          const n = getFoodNutrients(food)
          return {
            calories: acc.calories + n.calories,
            proteins: acc.proteins + n.proteins,
            carbs: acc.carbs + n.carbs,
            fats: acc.fats + n.fats,
          }
        },
        { calories: 0, proteins: 0, carbs: 0, fats: 0 }
      ),
    [foods]
  )

  const calculateTotals = useCallback(() => totals, [totals])

  const value = {
    foods,
    addFood,
    addFoods,
    removeFood,
    restoreFoods,
    updateFood,
    clearFoods,
    totals,
    calculateTotals,
    goalCalories,
    setGoalCalories,
    recentId,
    darkMode,
    setDarkMode,
  }

  return (
    <NutritionContext.Provider value={value}>
      {children}
    </NutritionContext.Provider>
  )
}
