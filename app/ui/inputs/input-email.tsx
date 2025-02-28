import { InputInterface } from "./input-interface";

export default function InputEmail(
    {
        label,
        name,
        state,
        value,
        onChange,
        minWidth,
        maxWidth
    }: InputInterface & { minWidth?: string, maxWidth?: string }) {

    return (
        <div style={{ minWidth: minWidth ?? '50px', maxWidth: maxWidth ?? '100%' }}>
            <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor={label}
            >
                {label}
            </label>
            <input
                id={label}
                name={name}
                type="email"
                className="peer h-input-height block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
                placeholder={`email`}
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