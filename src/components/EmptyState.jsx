import React from 'react'

/**
 * Página vacía para mostrar cuando aún no hay alimentos
 */
export const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="text-6xl mb-4">🍎</div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        ¡Comienza tu día nutritivo!
      </h2>
      <p className="text-gray-600 dark:text-gray-400 text-center max-w-md mb-6">
        Busca alimentos en la barra de búsqueda para registrar tu consumo nutricional diario.
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-500 text-center">
        💡 Tip: Puedes buscar alimentos como "pollo", "arroz", "brócoli" y muchos más.
      </p>
    </div>
  )
}

export default EmptyState
