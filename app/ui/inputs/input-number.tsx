import { InputInterface } from "./input-interface";
import './inputs-style.css';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function InputNumber(
    { 
        label, 
        name, 
        state, 
        value, 
        onChange,
        disabled
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
                className="number h-input-height block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
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