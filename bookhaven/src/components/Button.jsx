export default function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  onClick,
  type = "button",
  disabled = false,
}) {
  const base =
    "inline-flex items-center justify-center font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-[#1e3a5f] text-white hover:bg-[#152d4a] focus:ring-[#1e3a5f]",
    amber:
      "bg-amber-400 text-[#1e3a5f] hover:bg-amber-300 focus:ring-amber-400",
    outline:
      "border-2 border-[#1e3a5f] text-[#1e3a5f] hover:bg-[#1e3a5f] hover:text-white focus:ring-[#1e3a5f]",
    danger:
      "border-2 border-orange-500 text-orange-600 hover:bg-orange-50 focus:ring-orange-400",
    ghost: "text-gray-500 hover:bg-gray-100 border border-gray-200 focus:ring-gray-300",
  };

  const sizes = {
    sm: "text-xs px-3 py-1.5",
    md: "text-sm px-4 py-2.5",
    lg: "text-base px-5 py-3",
    xl: "text-lg px-6 py-3.5",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? "w-full" : ""}`}
    >
      {children}
    </button>
  );
}
