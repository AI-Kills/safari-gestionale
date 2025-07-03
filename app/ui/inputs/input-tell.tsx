import { InputInterface } from "./input-interface";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function InputTell({
    state,
    label,
    name,
    value,
    onChange
}: InputInterface) {

    return (
        <div>
            <Label className="mt-0" htmlFor={label}>{label}</Label>
            <div className="relative">
                <Input
                    className="w-[140px]"
                    id={label}
                    type="text"
                    name={name}
                    placeholder=""
                    pattern="^\+[1-9]\d{1,14}$"
                    value={value ?? ''}
                    onChange={onChange}
                />
                <p className="mt-2 text-sm text-red-600 hidden peer-invalid:block">
                    Inserisci un numero di telefono con formato internazionale valido.
                </p>
            </div>
            <div id="tel-error" aria-live="polite" aria-atomic="true">
                {state?.errors?.tel &&
                    state?.errors.tel.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                            {error}
                        </p>
                    ))}
            </div>
        </div>
    );
}