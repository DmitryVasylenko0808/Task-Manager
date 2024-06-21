import React, { ComponentProps } from "react";
import { clsx } from "clsx";

type ButtonProps = ComponentProps<"button"> & {
  size: "default" | "big";
};

const Button = ({ size, children, ...buttonProps }: ButtonProps) => {
  const btnClassName = clsx(
    "flex justify-center bg-tm-primary text-white disabled:bg-tm-primary/50",
    {
      "py-2 px-4 rounded": size === "default",
      "w-full py-3 px-6 text-lg rounded-2xl": size === "big",
    }
  );

  return (
    <button className={btnClassName} {...buttonProps}>
      {children}
    </button>
  );
};

export default Button;
