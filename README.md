# 🥗 NutriCalc - Calculadora de Consumo Nutricional

Una aplicación web moderna y responsiva para nutricionistas y personas que deseen registrar y monitorear su consumo nutricional diario de manera simple y visual.

## ✨ Características principales

### 🔍 Buscador de alimentos
- Input de búsqueda con autocompletado avanzado
- Base de datos de alimentos comunes con información nutricional
- Búsqueda rápida y resultados dinámicos en tiempo real

### 📝 Registro de comidas
- Agregar alimentos con cantidades personalizables (gramos/unidades)
- Modificar cantidades sobre la marcha
- Eliminar alimentos de forma sencilla
- Visualización clara de cada alimento registrado

### 📊 Cálculo nutricional automático
- **Calorías**: Total de energía consumida
- **Proteínas**: Cantidad en gramos con porcentaje de calorías
- **Carbohidratos**: Información completa de carbos
- **Grasas**: Desglose detallado de grasas consumidas

### 📈 Resumen diario interactivo
- Gráfico de pizza con distribución de macronutrientes
- Vista clara del total consumido vs. meta diaria
- Calorías restantes para alcanzar tu objetivo
- Tarjetas con información de cada macronutriente

### 💾 Persistencia con LocalStorage
- Los datos se guardan automáticamente en tu navegador
- Los alimentos registrados persisten entre sesiones
- Configuraciones guardadas localmente

### 🌙 Modo oscuro
- Toggle para cambiar entre modo claro y oscuro
- Interfaz adaptada para cada modo
- Preferencias guardadas automáticamente

### 📱 Diseño responsive
- Interfaz optimizada para móvil, tablet y escritorio
- Navegación intuitiva en todos los dispositivos
- Experiencia de usuario consistente

### 🎨 Interfaz moderna y minimalista
- Diseño limpio y fácil de usar
- Colores inspirados en salud (verde/blanco)
- Animaciones suaves y transiciones
- Glass morphism para efectos visuales modernos

## 🚀 Tecnologías utilizadas

- **React 18** - Framework de UI con Virtual DOM
- **Vite** - Herramienta de construcción rápida
- **Tailwind CSS** - Framework de estilos utilitarios
- **Recharts** - Biblioteca de gráficos
- **Lucide React** - Iconos modernos y ligeros
- **Axios** - Cliente HTTP para peticiones
- **JavaScript ES6+** - Lenguaje moderno

## 📋 Requisitos previos

- Node.js (versión 14 o superior)
- npm o yarn

## 🛠️ Instalación y configuración

### 1. Clonar el repositorio
```bash
git clone https://github.com/AntonioYurquina/NutriCalcApp.git
cd NutriCalcApp
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Ejecutar en desarrollo
```bash
npm run dev
```

La aplicación se abrirá automáticamente en `http://localhost:5173`

### 4. Compilar para producción
```bash
npm run build
```

Los archivos compilados estarán en la carpeta `dist/`

### 5. Vista previa de producción
```bash
npm run preview
```

## 📁 Estructura del proyecto

```
NutriCalcApp/
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── Header.jsx       # Encabezado con toggle dark mode
│   │   ├── SearchBar.jsx    # Buscador con autocompletado
│   │   ├── FoodCard.jsx     # Tarjeta de alimento individual
│   │   ├── DailyFoodList.jsx # Lista de alimentos del día
│   │   ├── NutritionSummary.jsx # Resumen nutricional
│   │   ├── EmptyState.jsx   # Estado vacío
│   │   └── index.js         # Exportaciones
│   ├── pages/               # Páginas de la app
│   ├── services/            # Servicios de API
│   │   └── foodService.js   # Servicio de búsqueda de alimentos
│   ├── hooks/               # Hooks personalizados
│   │   └── useNutrition.js  # Hook para contexto de nutrición
│   ├── context/             # Context API
│   │   └── NutritionContext.jsx # Contexto global
│   ├── utils/               # Funciones utilitarias
│   │   └── helpers.js       # Funciones auxiliares
│   ├── App.jsx              # Componente principal
│   ├── App.css              # Estilos globales
│   ├── index.css            # Estilos de Tailwind
│   └── main.jsx             # Punto de entrada
├── public/                  # Archivos públicos
├── index.html               # HTML principal
├── vite.config.js           # Configuración de Vite
├── tailwind.config.js       # Configuración de Tailwind
├── postcss.config.js        # Configuración de PostCSS
├── package.json             # Dependencias del proyecto
├── .gitignore               # Archivos ignorados por git
└── README.md                # Este archivo
```

## 🎯 Cómo usar la aplicación

### Agregar un alimento
1. Busca el alimento en la barra de búsqueda (ej: "pollo", "arroz", "brócoli")
2. Haz clic en el resultado para agregarlo
3. La aplicación sumará automáticamente los nutrientes

### Modificar cantidad
1. Usa los botones + y - en la tarjeta del alimento
2. O edita directamente el número de unidades
3. Los nutrientes se actualizarán automáticamente

### Ver tu progreso
- El resumen nutricional muestra tus totales del día
- El gráfico visualiza la distribución de macronutrientes
- Puedes ver cuántas calorías quedan para tu meta diaria

### Limpiar registro
- Haz clic en el botón "Limpiar todo" para borrar todos los alimentos
- Se te pedirá confirmación antes de eliminar

## 🔧 Configuración avanzada

### Cambiar la meta calórica diaria
Abre `src/components/NutritionSummary.jsx` y modifica:
```javascript
const goalCalories = 2000 // Cambiar este valor
```

### Agregar más alimentos a la base de datos
Edita los `MOCK_FOODS` en `src/services/foodService.js`:
```javascript
{
  id: 11,
  name: 'Tu alimento',
  calories: 100,
  proteins: 10,
  carbs: 15,
  fats: 5,
  fiber: 2,
  unit: 'g',
  portion: 100
}
```

### Conectar API real (USDA FoodData Central)
1. Obtén tu clave API en: https://fdc.nal.usda.gov/api-key-signup.html
2. Reemplaza `DEMO_KEY` en `src/services/foodService.js`
3. Descomenta el código de la API real

## 🎨 Personalizar colores

Los colores se definen en `tailwind.config.js`. Puedes modificarlos en la sección `colors`:

```javascript
health: {
  50: '#f0fdf4',
  // ... más colores
  600: '#16a34a',
}
```

## 📦 Dependencias principales

- `react` ^18.2.0 - Framework
- `vite` ^5.0.0 - Build tool
- `tailwindcss` ^3.3.0 - Estilos
- `recharts` ^2.10.0 - Gráficos
- `lucide-react` ^1.8.0 - Iconos
- `axios` ^1.15.0 - HTTP client

## 🚀 Mejoras futuras

- [ ] Sistema de perfil de usuario
- [ ] Histórico de consumo semanal/mensual
- [ ] Exportar datos a PDF
- [ ] Sincronización en la nube
- [ ] Más alimentos en la base de datos
- [ ] Integración con API real de nutrición
- [ ] Recetas sugeridas
- [ ] Notificaciones de recordatorios
- [ ] Análisis de tendencias nutricionales

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para cambios importantes:

1. Fork el repositorio
2. Crea una rama para tu mejora (`git checkout -b feature/MiMejora`)
3. Commit tus cambios (`git commit -am 'Agrega MiMejora'`)
4. Push a la rama (`git push origin feature/MiMejora`)
5. Abre un Pull Request

## 📝 Notas técnicas

### Manejo de estado
La aplicación usa React Context API para gestionar el estado global:
- Alimentos registrados
- Modo oscuro
- Persistencia automática en localStorage

### Render condicional
Los componentes usan render condicional para mostrar diferentes UI según el estado:
- Estado vacío cuando no hay alimentos
- Resumen cuando hay alimentos
- Gráficos interactivos

### Performance
- Uso optimizado de hooks (useState, useEffect)
- Debouncing en búsqueda para reducir peticiones
- Componentes memorizados donde es necesario
- Virtual scrolling para listas grandes

## 🐛 Reportar problemas

Si encuentras un bug, abre un issue en GitHub describiendo:
1. El problema
2. Pasos para reproducirlo
3. Comportamiento esperado vs actual
4. Tu navegador y versión

## 📄 Licencia

Este proyecto está bajo la licencia ISC

## 👨‍💻 Autor

Desarrollado con ❤️ por Antonio Yurquina

---

**¡Esperamos que disfrutes usando NutriCalc para monitorear tu nutrición diaria!** 🥗✨
