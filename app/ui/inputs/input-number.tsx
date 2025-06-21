import { InputInterface } from "./input-interface";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function InputNumber(
  {
    label,
    name,
    state,
    value,
    onChange,
    disabled,
    className,
  }: InputInterface) {

  return (
    <div className="number">
      {label && (
        <Label htmlFor={label}>{label}</Label>
      )}
      {!label && (
        <div className="mt-5"></div>
      )
      }
      <Input
        id={label}
        name={name}
        type="number"
        className={cn(className, "text-right max-w-[60px]")}
        value={value ?? 0}
        placeholder={``}
        onChange={onChange}
        disabled={disabled}
      />
      <div id={`${name}-error`} aria-live="polite" aria-atomic="true">
        {state?.errors?.[name] &&
          state?.errors[name].map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
    </div>
  );
}
