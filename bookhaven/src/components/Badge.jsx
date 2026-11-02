export default function Badge({ children, variant = "default" }) {
  const styles = {
    default: "bg-gray-100 text-gray-700 border border-gray-200",
    blue: "bg-blue-50 text-blue-700",
    purple: "bg-purple-50 text-purple-700",
    green: "bg-green-50 text-green-700",
    amber: "bg-amber-50 text-amber-700",
    navy: "bg-[#1e3a5f] text-white",
  };
  return (
    <span
      className={`inline-block text-[10px] font-bold uppercase tracking-wide px-2.5 py-0.5 rounded-full ${styles[variant] ?? styles.default}`}
    >
      {children}
    </span>
  );
}
