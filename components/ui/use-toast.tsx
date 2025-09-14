"use client";

import * as React from "react";
import { SuccessToast, SuccessToastProps } from "./success-toast";

interface Toast extends Omit<SuccessToastProps, 'onClose'> {
  id: string;
}

interface ToastContextType {
  toasts: Toast[];
  showToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  const showToast = React.useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { ...toast, id }]);
  }, []);

  const removeToast = React.useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
      {/* Render toasts */}
      <div className="fixed bottom-0 right-0 z-50 p-6 space-y-4">
        {toasts.map((toast) => (
          <SuccessToast
            key={toast.id}
            {...toast}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

// Convenience functions
export const toast = {
  success: (message: string, options?: Partial<Omit<Toast, 'id' | 'message' | 'variant'>>) => {
    const context = React.useContext(ToastContext);
    if (context) {
      context.showToast({ message, variant: 'success', ...options });
    }
  },
  error: (message: string, options?: Partial<Omit<Toast, 'id' | 'message' | 'variant'>>) => {
    const context = React.useContext(ToastContext);
    if (context) {
      context.showToast({ message, variant: 'error', ...options });
    }
  },
  info: (message: string, options?: Partial<Omit<Toast, 'id' | 'message' | 'variant'>>) => {
    const context = React.useContext(ToastContext);
    if (context) {
      context.showToast({ message, variant: 'info', ...options });
    }
  },
  warning: (message: string, options?: Partial<Omit<Toast, 'id' | 'message' | 'variant'>>) => {
    const context = React.useContext(ToastContext);
    if (context) {
      context.showToast({ message, variant: 'warning', ...options });
    }
  },
};
