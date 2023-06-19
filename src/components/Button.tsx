import type { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react";

type ButtonProps = {
  small?: boolean;
  gray?: boolean;
  className?: string;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const Button: FC<ButtonProps> = ({
  small = false,
  gray = false,
  className = "",
  ...props
}) => {
  const sizeClasses = small ? "px-2 py-1" : "px-4 py-2 font-bold ";
  const colorClasses = gray
    ? "bg-gray-400 hover:bg-gray-300 focus-visible:bg-gray-300"
    : "bg-sky-500 hover:bg-sky-400 focus-visible:bg-sky-400";

  return (
    <button
      className={`rounded-full text-white transition-colors duration-100 disabled:cursor-not-allowed disabled:opacity-50 ${sizeClasses} ${colorClasses} ${className}`}
      {...props}
    ></button>
  );
};

export default Button;
