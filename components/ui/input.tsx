import * as React from "react";
import { cn } from "@/lib/utils";

// Definisci la costante con le classi comuni per i controlli
export const commonFormControlClasses =
  "h-8 rounded-md border border-brown-500 px-2 py-1 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-0 focus:bg-brown-400 disabled:cursor-not-allowed disabled:opacity-100";

interface InputProps extends React.ComponentProps<"input"> {
  textarea?: boolean;
}

const Input = React.forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  ({ className, type, textarea, ...props }, ref) => {
    if (textarea) {
      return (
        <textarea
          ref={ref as React.Ref<HTMLTextAreaElement>}
          className={cn(commonFormControlClasses, className)}
          {...props}
        />
      );
    }
    return (
      <input
        type={type}
        ref={ref as React.Ref<HTMLInputElement>}
        className={cn(commonFormControlClasses, className)}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };