import clsx from "clsx";
import React from "react";

type LoaderProps = {
  variant: "default" | "button";
};

const Loader = ({ variant }: LoaderProps) => {
  const loaderClassName = clsx(
    "w-7 h-7 rounded-full border-2 border-l-transparent animate-spin",
    {
      "border-tm-primary": variant === "default",
      "border-white": variant === "button",
    }
  );

  return <div className={loaderClassName} />;
};

export default Loader;
