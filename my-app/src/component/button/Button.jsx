import React from "react";

const Button = ({
  onClick,
  className,
  children,
  type = "button",
  bgColor = "primary",
  full = false,
}) => {
  let bgClassName = "bg-primary";
  switch (bgColor) {
    case "pimary":
      bgClassName = "bg-primary";
      break;
    case "secondary":
      bgClassName = "bg-secondary";
      break;

    default:
      break;
  }
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-6 py-3 mt-auto font-bold capitalize rounded-md ${
        full ? "w-full" : ""
      } ${bgClassName} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
