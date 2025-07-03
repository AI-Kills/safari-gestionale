'use client';
import { InputInterface } from "./input-interface";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import React, { useState, ChangeEvent, MouseEvent } from 'react';
import { cn } from "@/lib/utils";


interface InputLookupProps {
  label: string;
  name: string;
  options: string[];
  defaultValue?: string;
  onChange?: (e: any) => void;
  state?: any;
  value?: string;
  disabled?: boolean;
  className?: string;
}

export function InputLookup({
  label,
  defaultValue,
  name,
  options,
  onChange,
  className,
}: InputLookupProps) {
  const [inputValue, setInputValue] = useState(defaultValue ?? "");
  const [showDropdown, setShowDropdown] = useState(false);

  // Filter the options based on current input value
  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setShowDropdown(true);
  };

  const handleOptionClick = (event: MouseEvent<HTMLLIElement>, selected: string) => {
    setInputValue(selected);
    setShowDropdown(false);
    onChange({ target: { value: selected } });
  };

  const handleBlur = () => {
    // Delay blur handling so onClick can fire first
    setTimeout(() => {
      setShowDropdown(false);
    }, 100);
  };

  return (
    <div className="search">
      <Label className="mt-0" htmlFor={label}>{label}</Label>
      <div className="relative inline-block w-full">
        <Input
          id={label}
          name={name}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className={cn(className, "text-right")}
          onFocus={() => setShowDropdown(true)}
          onBlur={handleBlur}
          placeholder=""
        />

        {showDropdown && filteredOptions.length > 0 && (
          <ul
            className="absolute left-0 top-full z-10 mt-1 w-full max-h-40
                       overflow-auto rounded-md border border-gray-200
                       bg-white p-0 shadow-md"
          >
            {filteredOptions.map((option) => (
              <li
                key={option}
                onMouseDown={(e) => e.preventDefault()}
                onClick={(e) => handleOptionClick(e, option)}
                className="cursor-pointer border-b border-gray-200 px-3 py-2 text-sm hover:bg-gray-50"
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
