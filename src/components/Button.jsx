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
    primary: "w-full py-2.5 px-6 bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:brightness-110 text-white rounded-xl text-sm font-semibold shadow-lg shadow-cyan-500/25",
    secondary: "px-4 py-2 border border-white/10 rounded-xl text-xs text-slate-300 hover:bg-white/[0.08]",
    danger: "text-xs text-rose-400 hover:text-rose-300 font-medium",
    link: "text-xs text-cyan-400 hover:text-cyan-300 hover:underline font-semibold",
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
