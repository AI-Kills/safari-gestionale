import { InputInterface } from "./input-interface";
import './inputs-style.css';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function InputDate({
  label,
  name,
  state,
  value,
  onChange
}: InputInterface) {

  return (
    <div className="flex flex-col min-w-64 date">
      <Label className="mt-0" htmlFor={label}>{label}</Label>
      <div className="relative">
        <Input
          className="date"
          id="date"
          type="date"
          name={name}
          placeholder="yyyy-mm-dd"
          value={value}
          onChange={onChange}
        />
      </div>
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
