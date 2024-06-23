import React, { ComponentProps, forwardRef } from "react";

type TextFieldProps = ComponentProps<"input"> & {
  label?: string;
  error?: string;
};

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, error, ...inputProps }, ref) => {
    return (
      <div>
        <label className="mb-1 text-tm-black-100">{label}</label>
        <input
          className="outline-none block w-full mb-2 py-2 border-b-4 text-lg"
          ref={ref}
          {...inputProps}
        />
        <p className="text-sm text-red-600">{error}</p>
      </div>
    );
  }
);

export default TextField;
