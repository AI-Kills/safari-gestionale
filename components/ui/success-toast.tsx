"use client";

import * as React from "react";
import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const toastVariants = cva(
  "fixed bottom-6 right-6 z-50 flex items-center gap-3 p-4 rounded-lg shadow-lg border transition-all duration-300 ease-in-out max-w-sm",
  {
    variants: {
      variant: {
        success: "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 text-green-800",
        error: "bg-gradient-to-r from-red-50 to-rose-50 border-red-200 text-red-800",
        info: "bg-gradient-to-r from-blue-50 to-sky-50 border-blue-200 text-blue-800",
        warning: "bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200 text-yellow-800",
      },
      state: {
        entering: "animate-in slide-in-from-right-full",
        visible: "animate-none",
        exiting: "animate-out slide-out-to-right-full",
      },
    },
    defaultVariants: {
      variant: "success",
      state: "visible",
    },
  }
);

export interface SuccessToastProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof toastVariants> {
  title?: string;
  message: string;
  duration?: number;
  onClose?: () => void;
  showCloseButton?: boolean;
}

const SuccessToast = React.forwardRef<HTMLDivElement, SuccessToastProps>(
  ({ 
    className, 
    variant = "success", 
    title, 
    message, 
    duration = 4000, 
    onClose, 
    showCloseButton = true,
    ...props 
  }, ref) => {
    const [state, setState] = React.useState<"entering" | "visible" | "exiting">("entering");
    const [isVisible, setIsVisible] = React.useState(true);

    React.useEffect(() => {
      // Start with entering animation
      const enterTimer = setTimeout(() => {
        setState("visible");
      }, 100);

      // Auto-hide after duration
      const hideTimer = setTimeout(() => {
        setState("exiting");
        setTimeout(() => {
          setIsVisible(false);
          onClose?.();
        }, 300); // Match animation duration
      }, duration);

      return () => {
        clearTimeout(enterTimer);
        clearTimeout(hideTimer);
      };
    }, [duration, onClose]);

    const handleClose = () => {
      setState("exiting");
      setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, 300);
    };

    if (!isVisible) return null;

    const getIcon = () => {
      switch (variant) {
        case "success":
          return <CheckCircleIcon className="w-6 h-6 text-green-600 flex-shrink-0" />;
        case "error":
          return <XMarkIcon className="w-6 h-6 text-red-600 flex-shrink-0" />;
        case "info":
          return <CheckCircleIcon className="w-6 h-6 text-blue-600 flex-shrink-0" />;
        case "warning":
          return <CheckCircleIcon className="w-6 h-6 text-yellow-600 flex-shrink-0" />;
        default:
          return <CheckCircleIcon className="w-6 h-6 text-green-600 flex-shrink-0" />;
      }
    };

    return (
      <div
        ref={ref}
        className={cn(toastVariants({ variant, state }), className)}
        {...props}
      >
        {getIcon()}
        
        <div className="flex-1 min-w-0">
          {title && (
            <p className="font-medium text-sm leading-tight mb-1">
              {title}
            </p>
          )}
          <p className="text-sm leading-relaxed">
            {message}
          </p>
        </div>

        {showCloseButton && (
          <button
            onClick={handleClose}
            className="flex-shrink-0 p-1 rounded-full hover:bg-black/5 transition-colors"
            aria-label="Chiudi notifica"
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
        )}

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/5 rounded-b-lg overflow-hidden">
          <div 
            className={cn(
              "h-full rounded-b-lg transition-all ease-linear",
              variant === "success" && "bg-green-600",
              variant === "error" && "bg-red-600",
              variant === "info" && "bg-blue-600",
              variant === "warning" && "bg-yellow-600"
            )}
            style={{
              animation: `shrink ${duration}ms linear`,
            }}
          />
        </div>
      </div>
    );
  }
);

SuccessToast.displayName = "SuccessToast";

// CSS for progress bar animation (add to global CSS)
const progressBarStyles = `
@keyframes shrink {
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
}
`;

export { SuccessToast, toastVariants, progressBarStyles };
