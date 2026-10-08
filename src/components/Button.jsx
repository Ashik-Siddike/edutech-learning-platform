export default function Button({
  children,
  type = "button",
  variant = "primary",
  onClick,
  className = "",
  ...props
}) {
  const baseStyles = "transition cursor-pointer";

  const variants = {
    primary: "w-full py-2.5 px-6 bg-[#6e3333] hover:bg-[#7e3b3b] text-white rounded-xl text-base font-serif shadow-md",
    secondary: "px-4 py-2 border border-gray-600 rounded-xl text-xs font-serif text-gray-300 hover:bg-gray-800",
    danger: "text-xs text-red-400 hover:text-red-300 font-medium",
    link: "text-xs font-serif text-orange-400 hover:text-orange-300 hover:underline",
  };

  const selectedVariant = variants[variant] || variants.primary;

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${selectedVariant} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
