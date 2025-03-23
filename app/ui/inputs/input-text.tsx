import { InputInterface } from "./input-interface";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function InputText(
  { 
    label, 
    name, 
    state, 
    value, 
    onChange,
    textarea,  
    className,  // Prop opzionale per classi extra
  }: InputInterface & { textarea?: boolean; className?: string }
) {
  return (
    <div>
      {/* Label personalizzata */}
      <Label htmlFor={label}>{label}</Label>

      {textarea ? (
        <Input
          textarea
          id={label}
          name={name}
          className={className || ""} // Usa le classi passate oppure stringa vuota
          placeholder=" "
          value={value ?? ''}
          onChange={onChange}
        />
      ) : (
        <Input
          id={label}
          name={name}
          type="text"
          className={className || ""}
          placeholder=" "
          value={value ?? ''}
          onChange={onChange}
        />
      )}
      <div id={`${name}-error`} aria-live="polite" aria-atomic="true">
        {state?.errors?.[name] &&
          state.errors[name].map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
    </div>
  );
}