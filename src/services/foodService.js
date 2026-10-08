import axios from 'axios'

// API de USDA FoodData Central
// Nota: Se necesita una API key gratuita de https://fdc.nal.usda.gov/api-key-signup.html
const USDA_API_KEY = 'DEMO_KEY' // Reemplazar con clave real
const USDA_BASE_URL = 'https://api.nal.usda.gov/fdc/v1'

// Mock data para demostración sin API key - Base de datos amplia de alimentos comunes
const MOCK_FOODS = [
  // PROTEÍNAS - CARNES
  {
    id: 1,
    name: 'Pollo sin piel',
    calories: 165,
    proteins: 31,
    carbs: 0,
    fats: 3.6,
    fiber: 0,
    unit: 'g',
    portion: 100
  },
  {
    id: 2,
    name: 'Pechuga de pollo',
    calories: 165,
    proteins: 31,
    carbs: 0,
    fats: 3.6,
    fiber: 0,
    unit: 'g',
    portion: 100
  },
  {
    id: 3,
    name: 'Carne molida magra',
    calories: 250,
    proteins: 22,
    carbs: 0,
    fats: 18,
    fiber: 0,
    unit: 'g',
    portion: 100
  },
  {
    id: 4,
    name: 'Filete de res',
    calories: 271,
    proteins: 25,
    carbs: 0,
    fats: 19,
    fiber: 0,
    unit: 'g',
    portion: 100
  },
  {
    id: 5,
    name: 'Pavo molido',
    calories: 190,
    proteins: 29,
    carbs: 0,
    fats: 8,
    fiber: 0,
    unit: 'g',
    portion: 100
  },
  {
    id: 6,
    name: 'Jamón cocido',
    calories: 145,
    proteins: 21,
    carbs: 0,
    fats: 6.4,
    fiber: 0,
    unit: 'g',
    portion: 100
  },
  {
    id: 7,
    name: 'Tocino cocido',
    calories: 541,
    proteins: 38,
    carbs: 0.7,
    fats: 42,
    fiber: 0,
    unit: 'g',
    portion: 100
  },
  {
    id: 8,
    name: 'Costilla de cerdo',
    calories: 316,
    proteins: 29,
    carbs: 0,
    fats: 22,
    fiber: 0,
    unit: 'g',
    portion: 100
  },

  // PROTEÍNAS - PESCADOS Y MARISCOS
  {
    id: 9,
    name: 'Salmón cocido',
    calories: 280,
    proteins: 25,
    carbs: 0,
    fats: 20,
    fiber: 0,
    unit: 'g',
    portion: 100
  },
  {
    id: 10,
    name: 'Atún en agua',
    calories: 132,
    proteins: 29,
    carbs: 0,
    fats: 1.3,
    fiber: 0,
    unit: 'g',
    portion: 100
  },
  {
    id: 11,
    name: 'Bacalao cocido',
    calories: 105,
    proteins: 20,
    carbs: 0,
    fats: 2.3,
    fiber: 0,
    unit: 'g',
    portion: 100
  },
  {
    id: 12,
    name: 'Trucha cocida',
    calories: 148,
    proteins: 21,
    carbs: 0,
    fats: 6.9,
    fiber: 0,
    unit: 'g',
    portion: 100
  },
  {
    id: 13,
    name: 'Camarones',
    calories: 99,
    proteins: 24,
    carbs: 0,
    fats: 0.3,
    fiber: 0,
    unit: 'g',
    portion: 100
  },
  {
    id: 14,
    name: 'Mejillones cocidos',
    calories: 172,
    proteins: 24,
    carbs: 7.4,
    fats: 4.5,
    fiber: 0,
    unit: 'g',
    portion: 100
  },

  // HUEVOS Y LÁCTEOS
  {
    id: 15,
    name: 'Huevo cocido',
    calories: 78,
    proteins: 6.5,
    carbs: 0.6,
    fats: 5.5,
    fiber: 0,
    unit: 'unidad',
    portion: 1
  },
  {
    id: 16,
    name: 'Huevo frito',
    calories: 87,
    proteins: 6,
    carbs: 0.5,
    fats: 6.9,
    fiber: 0,
    unit: 'unidad',
    portion: 1
  },
  {
    id: 17,
    name: 'Yogur griego',
    calories: 100,
    proteins: 17,
    carbs: 3.7,
    fats: 2,
    fiber: 0,
    unit: 'g',
    portion: 100
  },
  {
    id: 18,
    name: 'Yogur natural',
    calories: 61,
    proteins: 10,
    carbs: 3.6,
    fats: 0.4,
    fiber: 0,
    unit: 'g',
    portion: 100
  },
  {
    id: 19,
    name: 'Leche entera',
    calories: 61,
    proteins: 3.2,
    carbs: 4.8,
    fats: 3.3,
    fiber: 0,
    unit: 'ml',
    portion: 100
  },
  {
    id: 20,
    name: 'Leche desnatada',
    calories: 35,
    proteins: 3.4,
    carbs: 5,
    fats: 0.1,
    fiber: 0,
    unit: 'ml',
    portion: 100
  },
  {
    id: 21,
    name: 'Queso cheddar',
    calories: 403,
    proteins: 25,
    carbs: 1.3,
    fats: 33,
    fiber: 0,
    unit: 'g',
    portion: 100
  },
  {
    id: 22,
    name: 'Queso mozzarella',
    calories: 280,
    proteins: 28,
    carbs: 3.1,
    fats: 17,
    fiber: 0,
    unit: 'g',
    portion: 100
  },
  {
    id: 23,
    name: 'Queso fresco',
    calories: 265,
    proteins: 17,
    carbs: 4.1,
    fats: 21,
    fiber: 0,
    unit: 'g',
    portion: 100
  },
  {
    id: 24,
    name: 'Mantequilla',
    calories: 717,
    proteins: 0.9,
    carbs: 0.1,
    fats: 81,
    fiber: 0,
    unit: 'g',
    portion: 10
  },

  // GRANOS Y CEREALES
  {
    id: 25,
    name: 'Arroz blanco cocido',
    calories: 130,
    proteins: 2.7,
    carbs: 28,
    fats: 0.3,
    fiber: 0.4,
    unit: 'g',
    portion: 100
  },
  {
    id: 26,
    name: 'Arroz integral cocido',
    calories: 111,
    proteins: 2.6,
    carbs: 23,
    fats: 0.9,
    fiber: 1.8,
    unit: 'g',
    portion: 100
  },
  {
    id: 27,
    name: 'Pasta cocida',
    calories: 131,
    proteins: 4.9,
    carbs: 25,
    fats: 1.1,
    fiber: 1.8,
    unit: 'g',
    portion: 100
  },
  {
    id: 28,
    name: 'Pan blanco',
    calories: 265,
    proteins: 9,
    carbs: 49,
    fats: 3.3,
    fiber: 2.7,
    unit: 'g',
    portion: 100
  },
  {
    id: 29,
    name: 'Pan integral',
    calories: 247,
    proteins: 8.7,
    carbs: 43,
    fats: 3.3,
    fiber: 6.8,
    unit: 'g',
    portion: 100
  },
  {
    id: 30,
    name: 'Avena cocida',
    calories: 68,
    proteins: 2.4,
    carbs: 12,
    fats: 1.4,
    fiber: 1.7,
    unit: 'g',
    portion: 100
  },
  {
    id: 31,
    name: 'Cereal de maíz',
    calories: 376,
    proteins: 7.9,
    carbs: 84,
    fats: 1.3,
    fiber: 1.5,
    unit: 'g',
    portion: 100
  },
  {
    id: 32,
    name: 'Tortilla de maíz',
    calories: 47,
    proteins: 1.3,
    carbs: 9.3,
    fats: 0.5,
    fiber: 1.1,
    unit: 'unidad',
    portion: 1
  },
  {
    id: 33,
    name: 'Pan tostado',
    calories: 313,
    proteins: 11,
    carbs: 57,
    fats: 3.4,
    fiber: 3.2,
    unit: 'g',
    portion: 100
  },

  // VERDURAS
  {
    id: 34,
    name: 'Brócoli crudo',
    calories: 34,
    proteins: 2.8,
    carbs: 7,
    fats: 0.4,
    fiber: 2.4,
    unit: 'g',
    portion: 100
  },
  {
    id: 35,
    name: 'Coliflor cruda',
    calories: 25,
    proteins: 1.9,
    carbs: 5,
    fats: 0.3,
    fiber: 2.4,
    unit: 'g',
    portion: 100
  },
  {
    id: 36,
    name: 'Espinaca cruda',
    calories: 23,
    proteins: 2.9,
    carbs: 3.6,
    fats: 0.4,
    fiber: 2.2,
    unit: 'g',
    portion: 100
  },
  {
    id: 37,
    name: 'Lechuga',
    calories: 15,
    proteins: 1.2,
    carbs: 2.9,
    fats: 0.2,
    fiber: 1.3,
    unit: 'g',
    portion: 100
  },
  {
    id: 38,
    name: 'Tomate fresco',
    calories: 22,
    proteins: 1.1,
    carbs: 4.7,
    fats: 0.2,
    fiber: 1.4,
    unit: 'unidad',
    portion: 1
  },
  {
    id: 39,
    name: 'Zanahoria cruda',
    calories: 41,
    proteins: 0.9,
    carbs: 10,
    fats: 0.2,
    fiber: 2.8,
    unit: 'g',
    portion: 100
  },
  {
    id: 40,
    name: 'Pepino',
    calories: 16,
    proteins: 0.7,
    carbs: 3.6,
    fats: 0.1,
    fiber: 0.5,
    unit: 'g',
    portion: 100
  },
  {
    id: 41,
    name: 'Pimiento rojo',
    calories: 37,
    proteins: 1.2,
    carbs: 7.2,
    fats: 0.4,
    fiber: 2.4,
    unit: 'unidad',
    portion: 1
  },
  {
    id: 42,
    name: 'Cebolla',
    calories: 40,
    proteins: 1.1,
    carbs: 9,
    fats: 0.1,
    fiber: 1.7,
    unit: 'g',
    portion: 100
  },
  {
    id: 43,
    name: 'Ajo',
    calories: 149,
    proteins: 6.4,
    carbs: 33,
    fats: 0.5,
    fiber: 2.1,
    unit: 'g',
    portion: 100
  },
  {
    id: 44,
    name: 'Champiñones',
    calories: 22,
    proteins: 3.1,
    carbs: 3.3,
    fats: 0.3,
    fiber: 1,
    unit: 'g',
    portion: 100
  },
  {
    id: 45,
    name: 'Calabacín',
    calories: 21,
    proteins: 1.5,
    carbs: 3.7,
    fats: 0.4,
    fiber: 1,
    unit: 'g',
    portion: 100
  },
  {
    id: 46,
    name: 'Berenjena',
    calories: 25,
    proteins: 0.8,
    carbs: 5.9,
    fats: 0.2,
    fiber: 3,
    unit: 'g',
    portion: 100
  },
  {
    id: 47,
    name: 'Maíz cocido',
    calories: 86,
    proteins: 3.3,
    carbs: 19,
    fats: 1.2,
    fiber: 2.4,
    unit: 'g',
    portion: 100
  },
  {
    id: 48,
    name: 'Guisantes cocidos',
    calories: 84,
    proteins: 5.4,
    carbs: 14,
    fats: 0.4,
    fiber: 5.5,
    unit: 'g',
    portion: 100
  },

  // FRUTAS
  {
    id: 49,
    name: 'Plátano mediano',
    calories: 105,
    proteins: 1.3,
    carbs: 27.1,
    fats: 0.4,
    fiber: 3.1,
    unit: 'unidad',
    portion: 1
  },
  {
    id: 50,
    name: 'Manzana mediana',
    calories: 94,
    proteins: 0.5,
    carbs: 25.2,
    fats: 0.4,
    fiber: 4.3,
    unit: 'unidad',
    portion: 1
  },
  {
    id: 51,
    name: 'Naranja mediana',
    calories: 61,
    proteins: 0.9,
    carbs: 15.6,
    fats: 0.4,
    fiber: 3.1,
    unit: 'unidad',
    portion: 1
  },
  {
    id: 52,
    name: 'Fresa',
    calories: 32,
    proteins: 0.7,
    carbs: 7.7,
    fats: 0.3,
    fiber: 2,
    unit: 'g',
    portion: 100
  },
  {
    id: 53,
    name: 'Arándano',
    calories: 57,
    proteins: 0.7,
    carbs: 14,
    fats: 0.3,
    fiber: 2.4,
    unit: 'g',
    portion: 100
  },
  {
    id: 54,
    name: 'Piña',
    calories: 50,
    proteins: 0.5,
    carbs: 13,
    fats: 0.1,
    fiber: 1.4,
    unit: 'g',
    portion: 100
  },
  {
    id: 55,
    name: 'Melocotón',
    calories: 59,
    proteins: 1.4,
    carbs: 14.3,
    fats: 0.5,
    fiber: 2.3,
    unit: 'unidad',
    portion: 1
  },
  {
    id: 56,
    name: 'Pera',
    calories: 103,
    proteins: 0.7,
    carbs: 27,
    fats: 0.2,
    fiber: 5,
    unit: 'unidad',
    portion: 1
  },
  {
    id: 57,
    name: 'Sandía',
    calories: 30,
    proteins: 0.6,
    carbs: 7.6,
    fats: 0.2,
    fiber: 0.4,
    unit: 'g',
    portion: 100
  },
  {
    id: 58,
    name: 'Melón',
    calories: 34,
    proteins: 0.8,
    carbs: 8.2,
    fats: 0.2,
    fiber: 0.9,
    unit: 'g',
    portion: 100
  },
  {
    id: 59,
    name: 'Uvas',
    calories: 67,
    proteins: 0.7,
    carbs: 17,
    fats: 0.4,
    fiber: 0.9,
    unit: 'g',
    portion: 100
  },
  {
    id: 60,
    name: 'Mango',
    calories: 120,
    proteins: 1.6,
    carbs: 30,
    fats: 0.8,
    fiber: 3.2,
    unit: 'unidad',
    portion: 1
  },
  {
    id: 61,
    name: 'Papaya',
    calories: 43,
    proteins: 0.5,
    carbs: 11,
    fats: 0.3,
    fiber: 1.7,
    unit: 'g',
    portion: 100
  },

  // FRUTOS SECOS Y SEMILLAS
  {
    id: 62,
    name: 'Almendras',
    calories: 579,
    proteins: 21,
    carbs: 22,
    fats: 50,
    fiber: 12.5,
    unit: 'g',
    portion: 100
  },
  {
    id: 63,
    name: 'Cacahuetes',
    calories: 567,
    proteins: 25,
    carbs: 20,
    fats: 49,
    fiber: 8.5,
    unit: 'g',
    portion: 100
  },
  {
    id: 64,
    name: 'Nueces',
    calories: 654,
    proteins: 15,
    carbs: 14,
    fats: 65,
    fiber: 6.7,
    unit: 'g',
    portion: 100
  },
  {
    id: 65,
    name: 'Avellanas',
    calories: 628,
    proteins: 15,
    carbs: 17,
    fats: 61,
    fiber: 10.8,
    unit: 'g',
    portion: 100
  },
  {
    id: 66,
    name: 'Semillas de girasol',
    calories: 584,
    proteins: 21,
    carbs: 20,
    fats: 51,
    fiber: 8.6,
    unit: 'g',
    portion: 100
  },
  {
    id: 67,
    name: 'Semillas de calabaza',
    calories: 559,
    proteins: 25,
    carbs: 11,
    fats: 49,
    fiber: 6.5,
    unit: 'g',
    portion: 100
  },

  // LEGUMBRES
  {
    id: 68,
    name: 'Lentejas cocidas',
    calories: 116,
    proteins: 9,
    carbs: 20,
    fats: 0.4,
    fiber: 7.6,
    unit: 'g',
    portion: 100
  },
  {
    id: 69,
    name: 'Garbanzos cocidos',
    calories: 134,
    proteins: 8.9,
    carbs: 23,
    fats: 2.1,
    fiber: 6.4,
    unit: 'g',
    portion: 100
  },
  {
    id: 70,
    name: 'Frijoles negros cocidos',
    calories: 132,
    proteins: 8.9,
    carbs: 24,
    fats: 0.5,
    fiber: 8.7,
    unit: 'g',
    portion: 100
  },
  {
    id: 71,
    name: 'Soja cocida',
    calories: 173,
    proteins: 16.6,
    carbs: 10,
    fats: 9,
    fiber: 6,
    unit: 'g',
    portion: 100
  },

  // ALIMENTOS PROCESADOS Y CONDIMENTOS
  {
    id: 72,
    name: 'Aceite de oliva',
    calories: 884,
    proteins: 0,
    carbs: 0,
    fats: 100,
    fiber: 0,
    unit: 'ml',
    portion: 10
  },
  {
    id: 73,
    name: 'Mayonesa',
    calories: 680,
    proteins: 0.3,
    carbs: 0.6,
    fats: 75,
    fiber: 0,
    unit: 'g',
    portion: 15
  },
  {
    id: 74,
    name: 'Salsa de soja',
    calories: 61,
    proteins: 10.5,
    carbs: 5.6,
    fats: 0.6,
    fiber: 0,
    unit: 'ml',
    portion: 15
  },
  {
    id: 75,
    name: 'Miel',
    calories: 304,
    proteins: 0.3,
    carbs: 82,
    fats: 0,
    fiber: 0.2,
    unit: 'g',
    portion: 20
  },
  {
    id: 76,
    name: 'Almíbar de arce',
    calories: 260,
    proteins: 0,
    carbs: 67,
    fats: 0.2,
    fiber: 0,
    unit: 'ml',
    portion: 20
  },
  {
    id: 77,
    name: 'Mermelada',
    calories: 278,
    proteins: 0.4,
    carbs: 70,
    fats: 0.1,
    fiber: 0.7,
    unit: 'g',
    portion: 20
  },
  {
    id: 78,
    name: 'Chocolate oscuro',
    calories: 605,
    proteins: 7.8,
    carbs: 47,
    fats: 43,
    fiber: 3.3,
    unit: 'g',
    portion: 100
  },
  {
    id: 79,
    name: 'Azúcar',
    calories: 387,
    proteins: 0,
    carbs: 100,
    fats: 0,
    fiber: 0,
    unit: 'g',
    portion: 10
  },
  {
    id: 80,
    name: 'Sal',
    calories: 0,
    proteins: 0,
    carbs: 0,
    fats: 0,
    fiber: 0,
    unit: 'g',
    portion: 5
  }
]

const normalizeText = (text) =>
  text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

/**
 * Buscar alimentos en la API USDA
 * @param {string} query - Término de búsqueda
 * @returns {Promise<Array>} Lista de alimentos encontrados
 */
export const searchFoods = async (query) => {
  if (!query || query.trim().length === 0) {
    return []
  }

  try {
    // Retornar resultados mock para demostración
    // En producción, usar: const response = await axios.get(...)
    const term = normalizeText(query.trim())
    const matches = MOCK_FOODS.filter(food =>
      normalizeText(food.name).includes(term)
    )
    const startsWithTerm = (food) => (normalizeText(food.name).startsWith(term) ? 0 : 1)
    const results = [...matches].sort((a, b) => startsWithTerm(a) - startsWithTerm(b))

    return results.map(food => ({
      ...food,
      label: `${food.name} (${food.portion}${food.unit})`
    }))
  } catch (error) {
    console.error('Error buscando alimentos:', error)
    return []
  }
}

/**
 * Obtener detalles nutricionales de un alimento
 * @param {number} foodId - ID del alimento
 * @returns {Promise<Object>} Detalles nutricionales
 */
export const getFoodDetails = async (foodId) => {
  try {
    const food = MOCK_FOODS.find(f => f.id === foodId)
    if (!food) {
      throw new Error('Alimento no encontrado')
    }
    return food
  } catch (error) {
    console.error('Error obteniendo detalles:', error)
    return null
  }
}

/**
 * Obtener sugerencias de alimentos basadas en búsqueda
 * @param {string} query - Término de búsqueda
 * @returns {Promise<Array>} Sugerencias de alimentos
 */
export const getAutocompleteSuggestions = async (query) => {
  if (!query || query.trim().length < 2) {
    return []
  }

  return searchFoods(query)
}

/**
 * Día de ejemplo para probar la app con un clic
 * @returns {Array<{food: Object, quantity: number}>}
 */
export const getSampleDay = () => {
  const sample = [
    ['Pollo sin piel', 150],
    ['Arroz blanco cocido', 200],
    ['Brócoli crudo', 100],
    ['Huevo cocido', 2],
    ['Manzana mediana', 1]
  ]

  return sample
    .map(([name, quantity]) => ({
      food: MOCK_FOODS.find((f) => f.name === name),
      quantity
    }))
    .filter((item) => item.food)
}

export default {
  searchFoods,
  getFoodDetails,
  getAutocompleteSuggestions,
  getSampleDay
}
