import React, { useState, useEffect, useRef, useId } from 'react'
import { Search, X, Plus, LoaderCircle, SearchX } from 'lucide-react'
import { searchFoods } from '../services/foodService'
import {
  formatInt,
  formatDecimal,
  formatQuantity,
  getBasisLabel,
  getDefaultQuantity,
} from '../utils/helpers'

const SUGGESTIONS = ['Pollo', 'Arroz', 'Brócoli', 'Huevo', 'Manzana', 'Avena']

const normalize = (text) =>
  text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

const Highlight = ({ text, term }) => {
  const clean = term.trim()
  const start = clean ? normalize(text).indexOf(normalize(clean)) : -1
  if (start === -1) return text
  const end = start + clean.length
  return (
    <>
      {text.slice(0, start)}
      <mark className="rounded-sm bg-health-100 px-0.5 text-inherit dark:bg-health-800/60">
        {text.slice(start, end)}
      </mark>
      {text.slice(end)}
    </>
  )
}

/**
 * Buscador de alimentos con resultados navegables por teclado
 */
export const SearchBar = ({ onSelect }) => {
  const inputId = useId()
  const hintId = useId()
  const listId = useId()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [status, setStatus] = useState('idle')
  const [isOpen, setIsOpen] = useState(false)
  const wrapperRef = useRef(null)
  const inputRef = useRef(null)
  const listRef = useRef(null)

  useEffect(() => {
    const term = query.trim()
    if (!term) {
      setResults([])
      setStatus('idle')
      setIsOpen(false)
      return undefined
    }

    let cancelled = false
    const timer = setTimeout(() => {
      setStatus('loading')
      setIsOpen(true)
      searchFoods(term).then((foods) => {
        if (cancelled) return
        setResults(foods)
        setStatus('ready')
      })
    }, 150)

    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [query])

  useEffect(() => {
    const onPointerDown = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) setIsOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [])

  const closeAndFocusInput = () => {
    setIsOpen(false)
    inputRef.current?.focus()
  }

  const clear = () => {
    setQuery('')
    setResults([])
    setIsOpen(false)
    inputRef.current?.focus()
  }

  const handleSelect = (food) => {
    onSelect(food)
    setQuery('')
    setResults([])
    setIsOpen(false)
    inputRef.current?.focus()
  }

  const resultButtons = () => Array.from(listRef.current?.querySelectorAll('[data-result]') ?? [])

  const handleInputKeyDown = (e) => {
    if (e.key === 'ArrowDown' && results.length > 0) {
      e.preventDefault()
      setIsOpen(true)
      resultButtons()[0]?.focus()
    } else if (e.key === 'Enter' && isOpen && status === 'ready' && results.length > 0) {
      e.preventDefault()
      handleSelect(results[0])
    } else if (e.key === 'Escape') {
      if (isOpen) {
        setIsOpen(false)
      } else if (query) {
        clear()
      }
    }
  }

  const handleListKeyDown = (e) => {
    const buttons = resultButtons()
    const index = buttons.indexOf(document.activeElement)
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      buttons[Math.min(index + 1, buttons.length - 1)]?.focus()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (index <= 0) inputRef.current?.focus()
      else buttons[index - 1]?.focus()
    } else if (e.key === 'Home') {
      e.preventDefault()
      buttons[0]?.focus()
    } else if (e.key === 'End') {
      e.preventDefault()
      buttons[buttons.length - 1]?.focus()
    } else if (e.key === 'Escape') {
      e.preventDefault()
      closeAndFocusInput()
    }
  }

  const handleBlur = (e) => {
    if (e.relatedTarget && wrapperRef.current && !wrapperRef.current.contains(e.relatedTarget)) {
      setIsOpen(false)
    }
  }

  const liveMessage =
    isOpen && status === 'ready'
      ? results.length > 0
        ? `${results.length} ${results.length === 1 ? 'resultado' : 'resultados'}`
        : 'Sin resultados'
      : ''

  return (
    <div>
      <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
        <label htmlFor={inputId}>¿Qué comiste hoy?</label>
      </h2>
      <p id={hintId} className="mt-1 text-sm text-muted">
        Buscá un alimento y sumalo con un clic. Después ajustás la cantidad.
      </p>

      <div ref={wrapperRef} onBlur={handleBlur} className="relative mt-4">
        {status === 'loading' ? (
          <LoaderCircle
            size={20}
            aria-hidden="true"
            className="absolute left-3.5 top-1/2 -translate-y-1/2 animate-spin text-health-700 dark:text-health-400"
          />
        ) : (
          <Search
            size={20}
            aria-hidden="true"
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400"
          />
        )}
        <input
          id={inputId}
          ref={inputRef}
          type="search"
          autoComplete="off"
          spellCheck={false}
          enterKeyHint="search"
          placeholder="Buscar alimento: pollo, arroz…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim() && status === 'ready' && setIsOpen(true)}
          onKeyDown={handleInputKeyDown}
          aria-describedby={hintId}
          aria-controls={isOpen ? listId : undefined}
          className="h-12 w-full rounded-xl border border-slate-300 bg-white pl-11 pr-12 text-base text-slate-900 shadow-sm placeholder:text-slate-500 hover:border-slate-400 focus:border-health-700 focus:outline-none focus:ring-2 focus:ring-health-700/40 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-400 dark:hover:border-slate-500 dark:focus:border-health-400 dark:focus:ring-health-400/40"
        />
        {query && (
          <button
            type="button"
            onClick={clear}
            aria-label="Borrar búsqueda"
            className="absolute right-1.5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white"
          >
            <X size={18} aria-hidden="true" />
          </button>
        )}

        <p role="status" className="sr-only">{liveMessage}</p>

        {isOpen && (
          <div
            id={listId}
            className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl ring-1 ring-black/5 dark:border-slate-700 dark:bg-slate-900"
          >
            {status === 'loading' && results.length === 0 ? (
              <div className="flex items-center justify-center gap-2 px-4 py-6 text-sm text-muted">
                <LoaderCircle size={18} className="animate-spin" aria-hidden="true" />
                Buscando alimentos…
              </div>
            ) : results.length > 0 ? (
              <>
                <div className="flex items-center justify-between border-b border-slate-100 px-4 py-2 text-xs text-muted dark:border-slate-800">
                  <span>
                    {results.length} {results.length === 1 ? 'resultado' : 'resultados'}
                  </span>
                  <span className="hidden sm:inline">↑ ↓ para recorrer · Enter para agregar</span>
                </div>
                <ul
                  ref={listRef}
                  onKeyDown={handleListKeyDown}
                  className="max-h-[min(22rem,55vh)] divide-y divide-slate-100 overflow-y-auto dark:divide-slate-800"
                >
                  {results.map((food) => (
                    <li key={food.id}>
                      <button
                        type="button"
                        data-result
                        onClick={() => handleSelect(food)}
                        className="group flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-slate-50 focus-visible:bg-slate-50 focus-visible:outline-offset-[-2px] dark:hover:bg-slate-800 dark:focus-visible:bg-slate-800"
                      >
                        <span className="min-w-0 flex-1">
                          <span className="block font-medium text-slate-900 dark:text-white">
                            <Highlight text={food.name} term={query} />
                          </span>
                          <span className="mt-0.5 flex flex-wrap items-baseline gap-x-3 gap-y-0.5 text-sm text-muted">
                            <span className="whitespace-nowrap">
                              <span className="font-semibold text-slate-800 dark:text-slate-200">
                                {formatInt(food.calories)} kcal
                              </span>{' '}
                              {getBasisLabel(food)}
                            </span>
                            <span className="flex flex-wrap gap-x-2 whitespace-nowrap">
                              <span>Prot. {formatDecimal(food.proteins)} g</span>
                              <span>Carb. {formatDecimal(food.carbs)} g</span>
                              <span>Gras. {formatDecimal(food.fats)} g</span>
                            </span>
                          </span>
                        </span>
                        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-health-100 py-1 pl-2 pr-2.5 text-xs font-semibold text-health-800 transition-colors group-hover:bg-health-700 group-hover:text-white group-focus-visible:bg-health-700 group-focus-visible:text-white dark:bg-health-900 dark:text-health-200 dark:group-hover:bg-health-600 dark:group-hover:text-slate-950">
                          <Plus size={14} aria-hidden="true" />
                          {formatQuantity(food, getDefaultQuantity(food))}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <div className="flex flex-col items-center gap-1 px-4 py-8 text-center">
                <SearchX size={28} className="text-slate-400" aria-hidden="true" />
                <p className="mt-1 font-medium text-slate-900 dark:text-white">
                  No encontramos “{query.trim()}”
                </p>
                <p className="text-sm text-muted">
                  Probá con otro nombre, por ejemplo pollo, arroz o manzana.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="text-sm text-muted">Probá con:</span>
        {SUGGESTIONS.map((term) => (
          <button
            key={term}
            type="button"
            onClick={() => {
              setQuery(term)
              inputRef.current?.focus()
            }}
            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:border-health-600 hover:bg-health-50 hover:text-health-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-health-500 dark:hover:bg-slate-700"
          >
            {term}
          </button>
        ))}
      </div>
    </div>
  )
}

export default SearchBar
