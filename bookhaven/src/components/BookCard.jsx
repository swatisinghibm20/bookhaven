import { useState } from "react";
import { ShoppingCart, Star, Heart, Minus, Plus } from "lucide-react";

// Open Library covers by ISBN — free, no API key needed
const COVER_URLS = {
  1: "https://covers.openlibrary.org/b/isbn/9780756404741-M.jpg",   // Name of the Wind
  2: "https://covers.openlibrary.org/b/isbn/9780756407124-M.jpg",   // Wise Man's Fear
  3: "https://covers.openlibrary.org/b/isbn/9780553262506-M.jpg",   // Wizard of Earthsea
  4: "https://covers.openlibrary.org/b/isbn/9780765326355-M.jpg",   // Way of Kings
  5: "https://covers.openlibrary.org/b/isbn/9780575079793-M.jpg",   // Blade Itself
  6: "https://covers.openlibrary.org/b/isbn/9780765350374-M.jpg",   // Elantris
  7: "https://covers.openlibrary.org/b/isbn/9780385534635-M.jpg",   // Night Circus
  8: "https://covers.openlibrary.org/b/isbn/9780765311788-M.jpg",   // Mistborn
};

const GRADIENT_FALLBACKS = {
  blue:   "from-blue-400 to-indigo-600",
  pink:   "from-pink-400 to-rose-600",
  green:  "from-emerald-400 to-teal-600",
  yellow: "from-amber-400 to-orange-500",
  purple: "from-violet-400 to-purple-700",
  red:    "from-red-400 to-rose-700",
  cyan:   "from-cyan-400 to-blue-500",
  lime:   "from-lime-400 to-green-600",
};

export default function BookCard({
  id,
  title,
  author,
  price,
  oldPrice,
  tag,
  emoji = "📖",
  color = "blue",
  rating = 5,
  delivery,
  ribbon,
  quantity = 0,        // how many of this book are in the cart
  onAddToCart,         // () => void  – first add
  onUpdateQty,         // (delta: number) => void – +1 / -1 once in cart
}) {
  const [imgError, setImgError] = useState(false);
  const [wished, setWished] = useState(false);
  const coverUrl = COVER_URLS[id];
  const fallbackGradient = GRADIENT_FALLBACKS[color] ?? "from-blue-400 to-indigo-600";

  const discount = oldPrice
    ? Math.round((1 - parseFloat(price.replace("£","")) / parseFloat(oldPrice.replace("£",""))) * 100)
    : null;

  return (
    <div className="card-hover relative bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col group">
      {/* Ribbon */}
      {ribbon && (
        <div className={`ribbon text-white ${ribbon === "Bestseller" ? "bg-amber-500" : "bg-emerald-500"}`}>
          {ribbon}
        </div>
      )}

      {/* Wishlist */}
      <button
        onClick={() => setWished(!wished)}
        className="absolute top-2.5 right-2.5 z-10 w-7 h-7 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
      >
        <Heart
          size={14}
          className={wished ? "fill-red-500 text-red-500" : "text-gray-400"}
        />
      </button>

      {/* Cover image */}
      <div className="relative overflow-hidden h-48">
        {coverUrl && !imgError ? (
          <img
            src={coverUrl}
            alt={title}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${fallbackGradient} flex items-center justify-center`}>
            <span className="text-5xl drop-shadow-lg">{emoji}</span>
          </div>
        )}
        {/* Discount badge */}
        {discount && (
          <div className="absolute bottom-2 left-2 bg-red-500 text-white text-[11px] font-black px-2 py-0.5 rounded-full shadow">
            -{discount}%
          </div>
        )}
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Body */}
      <div className="p-3.5 flex flex-col flex-1">
        {tag && (
          <span className="text-[10px] font-bold text-violet-600 uppercase tracking-wider mb-1">
            {tag}
          </span>
        )}
        <h4 className="text-sm font-bold text-gray-900 leading-snug mb-0.5 line-clamp-2">
          {title}
        </h4>
        <p className="text-[11px] text-gray-500 mb-2">{author}</p>

        {/* Stars */}
        <div className="flex items-center gap-0.5 mb-1.5">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={11}
              className={i < rating ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"}
            />
          ))}
          <span className="text-[10px] text-gray-400 ml-1">({rating * 23})</span>
        </div>

        {delivery && (
          <p className="text-[11px] text-emerald-600 font-medium">📦 {delivery}</p>
        )}

        {/* Price + CTA */}
        <div className="flex items-center justify-between gap-2 mt-auto pt-3 border-t border-gray-100">
          {/* Price block wraps (old price drops below) instead of squeezing the button */}
          <div className="flex flex-col justify-center min-w-0 leading-tight">
            <span className="text-base font-black text-[#1e3a5f]">{price}</span>
            {oldPrice && (
              <span className="text-xs text-gray-400 line-through">{oldPrice}</span>
            )}
          </div>
          {quantity > 0 ? (
            /* Quantity stepper – persists for as long as the book is in the cart */
            <div
              className="shrink-0 flex items-center h-8 rounded-xl bg-[#1e3a5f] text-white shadow-sm"
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
          ) : (
            <button
              onClick={onAddToCart}
              className="btn-shine shrink-0 whitespace-nowrap flex items-center justify-center gap-1.5 h-8 min-w-[4.5rem] px-3 text-xs font-bold leading-none rounded-xl bg-amber-400 hover:bg-amber-300 text-[#1e3a5f] transition-colors shadow-sm"
            >
              <ShoppingCart size={13} className="shrink-0" /> Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
