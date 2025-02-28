import { InputInterface } from "./input-interface";

export default function InputTell({
    state,
    label,
    name,
    value,
    onChange
}: InputInterface) {

    return (
        <div>
            {label && (
                <label
                    className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                    htmlFor={label}
                >
                    {label}
                </label>
            )}
            {!label && (
                <div className="mt-5"></div>
            )
            }
            <div className="relative">
                <input
                    className="peer h-input-height block w-full rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500"
                    id={label}
                    type="text"
                    name={name}
                    placeholder="phone"
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