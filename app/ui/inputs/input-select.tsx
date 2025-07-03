"use client";

import { InputInterface } from "./input-interface";
import './inputs-style.css';
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { commonFormControlClasses } from "@/components/ui/input";

export default function InputSelect({
        label,
        options,
        name,
        state,
        value,
        onChange,
        className, // Aggiunto per consentire className extra
    }: InputInterface & { options: string[] | { name: string, value: string }[]; className?: string }) {
        return (
            <div className="select">
                <Label className="mt-0" htmlFor={label}>{label}</Label>
                <div className="relative">
                    <select
                        id={label}
                        name={name}
                        className={cn(commonFormControlClasses, "select", className)}
                        value={value ?? ''}
                        onChange={onChange}
                    >
                        <option value="" disabled className="text-gray-500"></option>
                        {options.map((option, index) => (
                            <option key={index} value={option.value ?? option}>
                                {option.name ?? option}
                            </option>
                        ))}
                    </select>
                </div>
                <div id={`${label}-error`} aria-live="polite" aria-atomic="true">
                    {state?.errors?.[label] &&
                        state?.errors[label].map((error: string) => (
                            <p className="mt-2 text-sm text-red-500" key={error}>
                                {error}
                            </p>
                        ))
                    }
                </div>
            </div>
        );
}
