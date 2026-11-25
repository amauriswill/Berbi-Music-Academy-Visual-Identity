import { Check } from 'lucide-react';
import type { ToastItem } from '../../hooks/useToast';

interface ToastStackProps {
  toasts: ToastItem[];
}

export function ToastStack({ toasts }: ToastStackProps) {
  if (toasts.length === 0) return null;

  return (
    <div className="no-print pointer-events-none fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-950 px-3.5 py-2 text-xs font-medium text-white shadow-lg dark:border-neutral-700 dark:bg-white dark:text-neutral-950"
        >
          <Check className="h-3.5 w-3.5 text-emerald-400 dark:text-emerald-600" />
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
}
