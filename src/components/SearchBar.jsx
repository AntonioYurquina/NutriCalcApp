import React, { useState, useEffect } from 'react'
import { Search, X } from 'lucide-react'
import { searchFoods } from '../services/foodService'

/**
 * Componente de búsqueda de alimentos con autocompletado
 */
export const SearchBar = ({ onSelect }) => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) {
        setIsLoading(true)
        searchFoods(query).then(foods => {
          setResults(foods)
          setIsLoading(false)
          setIsOpen(true)
        })
      } else {
        setResults([])
        setIsOpen(false)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [query])

  const handleSelect = (food) => {
    onSelect(food)
    setQuery('')
    setResults([])
    setIsOpen(false)
  }

  return (
    <div className="relative w-full z-40">
      <div className="relative">
        <Search
          size={18}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Busca un alimento (ej: pollo, arroz, brócoli)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim() && setIsOpen(true)}
          className="w-full pl-10 pr-10 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-health-500 dark:text-white transition-colors"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('')
              setResults([])
              setIsOpen(false)
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-xl max-h-96 overflow-y-auto z-50">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              Buscando alimentos...
            </div>
          ) : results.length > 0 ? (
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {results.map((food) => (
                <li key={food.id}>
                  <button
                    onClick={() => handleSelect(food)}
                    className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex justify-between items-center"
                  >
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {food.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {food.calories} cal | Proteína: {food.proteins}g | Carbs: {food.carbs}g | Grasa: {food.fats}g
                      </div>
                    </div>
                    <div className="text-xs bg-health-100 dark:bg-health-900 text-health-700 dark:text-health-300 px-2 py-1 rounded whitespace-nowrap ml-2">
                      {food.portion}{food.unit}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              No se encontraron alimentos
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default SearchBar
