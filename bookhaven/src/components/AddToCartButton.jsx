import { Minus, Plus, ShoppingCart } from "lucide-react";

/**
 * Add-to-cart control that reflects the real cart quantity:
 *  - quantity 0  -> a button (label e.g. "Add" / "Buy Again")
 *  - quantity >0 -> a  − qty +  stepper that stays until the item is removed
 *
 * variant: "solid" (amber) | "outline" (navy outline pill)
 */
export default function AddToCartButton({
  label = "Add",
  variant = "solid",
  quantity = 0,
  onAdd,
  onUpdateQty,
  title = "",
  fullWidth = false,
}) {
  if (quantity > 0) {
    return (
      <div
        className={`flex items-center h-8 rounded-xl bg-[#1e3a5f] text-white shadow-sm ${
          fullWidth ? "w-full justify-between" : "shrink-0"
        }`}
        role="group"
        aria-label={`Quantity of ${title} in cart`}
      >
        <button
          onClick={() => onUpdateQty?.(-1)}
          aria-label={quantity === 1 ? "Remove from cart" : "Decrease quantity"}
          className="w-8 h-8 flex items-center justify-center rounded-l-xl hover:bg-white/15 transition-colors"
        >
          <Minus size={13} />
        </button>
        <span className="min-w-[1.5rem] text-center text-xs font-black leading-none tabular-nums">
          {quantity}
        </span>
        <button
          onClick={() => onUpdateQty?.(1)}
          aria-label="Increase quantity"
          className="w-8 h-8 flex items-center justify-center rounded-r-xl hover:bg-white/15 transition-colors"
        >
          <Plus size={13} />
        </button>
      </div>
    );
  }

  const styles =
    variant === "outline"
      ? "border-2 border-[#1e3a5f]/30 text-[#1e3a5f] hover:bg-[#1e3a5f] hover:text-white hover:border-[#1e3a5f]"
      : "bg-amber-400 hover:bg-amber-300 text-[#1e3a5f] shadow-sm";

  return (
    <button
      onClick={onAdd}
      className={`btn-shine whitespace-nowrap flex items-center justify-center gap-1.5 h-8 min-w-[4.5rem] px-3 text-xs font-bold leading-none rounded-xl transition-colors ${styles} ${
        fullWidth ? "w-full" : "shrink-0"
      }`}
    >
      <ShoppingCart size={13} className="shrink-0" /> {label}
    </button>
  );
}
