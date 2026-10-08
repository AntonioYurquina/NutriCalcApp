import React from 'react'
import { CircleCheck, X } from 'lucide-react'

/**
 * Aviso breve de feedback (agregado, quitado, deshacer). La región es aria-live.
 */
export const Toaster = ({ toast, onDismiss }) => {
  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-24 z-50 flex justify-center px-4 lg:bottom-6"
    >
      {toast && (
        <div
          key={toast.id}
          className="toast-enter pointer-events-auto flex max-w-md items-center gap-3 rounded-xl bg-slate-900 py-2.5 pl-4 pr-2 text-sm text-white shadow-lg ring-1 ring-black/10 dark:bg-slate-100 dark:text-slate-900"
        >
          <CircleCheck size={18} className="shrink-0 text-health-400 dark:text-health-700" aria-hidden="true" />
          <span className="min-w-0">{toast.message}</span>
          {toast.actionLabel && (
            <button
              type="button"
              onClick={() => {
                toast.onAction?.()
                onDismiss()
              }}
              className="shrink-0 rounded-lg px-2.5 py-1.5 font-semibold text-health-300 hover:bg-white/10 dark:text-health-700 dark:hover:bg-slate-900/10"
            >
              {toast.actionLabel}
            </button>
          )}
          <button
            type="button"
            onClick={onDismiss}
            aria-label="Cerrar aviso"
            className="shrink-0 rounded-lg p-1.5 text-slate-300 hover:bg-white/10 dark:text-slate-600 dark:hover:bg-slate-900/10"
          >
            <X size={16} aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  )
}

export default Toaster
