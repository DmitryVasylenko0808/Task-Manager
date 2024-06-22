import React, { ComponentProps } from "react";
import { clsx } from "clsx";

type ButtonProps = ComponentProps<"button"> & {
  size: "default" | "big";
  variant?: "primary" | "secondary" | "terciary";
};

const Button = ({ size, variant, children, ...buttonProps }: ButtonProps) => {
  const btnClassName = clsx("flex items-center justify-center gap-3 text-lg", {
    "bg-tm-primary text-white disabled:bg-tm-primary/50": variant === "primary",
    "bg-red-500 text-white disabled:bg-red/50": variant === "secondary",
    "text-tm-black-300": variant === "terciary",
    "py-2 px-6 rounded-xl": size === "default",
    "w-full py-3 px-6 rounded-2xl": size === "big",
  });

  return (
    <button className={btnClassName} {...buttonProps}>
      {children}
    </button>
  );
};

export default Button;
