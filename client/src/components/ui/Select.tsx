import React, { ComponentProps, forwardRef } from "react";

type SelectProps<T> = ComponentProps<"select"> & {
  options: T[];
  label?: string;
  error?: string;
};

const Select = forwardRef<HTMLSelectElement, SelectProps<any>>(
  ({ options, label, error, ...selectProps }, ref) => {
    return (
      <div>
        <label className="mb-1 text-tm-black-100">{label}</label>
        <select
          {...selectProps}
          ref={ref}
          className="form-select block w-full mb-2 py-2 border-2 border-gray-300 rounded-md text-lg focus:ring-0"
        >
          {options?.map((c) => (
            <option value={c.id}>{c.title}</option>
          ))}
        </select>
        <p className="text-sm text-red-600">{error}</p>
      </div>
    );
  }
);

export default Select;
