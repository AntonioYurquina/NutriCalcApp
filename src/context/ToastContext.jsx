import React, { createContext, useState, useCallback, useRef, useEffect, useMemo } from 'react'
import Toaster from '../components/Toaster'

export const ToastContext = createContext()

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null)
  const timer = useRef(null)
  const counter = useRef(0)

  const dismissToast = useCallback(() => {
    clearTimeout(timer.current)
    setToast(null)
  }, [])

  const showToast = useCallback(({ message, actionLabel, onAction, duration }) => {
    clearTimeout(timer.current)
    counter.current += 1
    setToast({ id: counter.current, message, actionLabel, onAction })
    timer.current = setTimeout(() => setToast(null), duration ?? (actionLabel ? 6000 : 2600))
  }, [])

  useEffect(() => () => clearTimeout(timer.current), [])

  const value = useMemo(() => ({ showToast, dismissToast }), [showToast, dismissToast])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Toaster toast={toast} onDismiss={dismissToast} />
    </ToastContext.Provider>
  )
}
