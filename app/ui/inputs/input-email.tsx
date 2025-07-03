import { InputInterface } from "./input-interface";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function InputEmail(
    {
        label,
        name,
        state,
        value,
        onChange,
        minWidth,
        maxWidth
    }: InputInterface) {

    return (
        <div>
            <Label className="mt-0" htmlFor={label}>{label}</Label>
            <Input
                id={label}
                name={name}
                type="email"
                className="w-[230px]"
                placeholder={``}
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                value={value ?? ''}
                onChange={onChange}
            />
            <p className="mt-2 text-sm text-red-600 hidden peer-invalid:block">
                Inserisci un indirizzo email valido.
            </p>
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