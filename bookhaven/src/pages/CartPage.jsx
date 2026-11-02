import { useNavigate, Link } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag, Sparkles } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";
import AddToCartButton from "../components/AddToCartButton";
import { RECOMMENDATIONS, ORDER_HISTORY } from "../data/books";
import { addItem, changeQty, qtyOf } from "../cart";
import { homePath } from "../auth";

const COVER_URLS = {
  1: "https://covers.openlibrary.org/b/isbn/9780756404741-M.jpg",
  2: "https://covers.openlibrary.org/b/isbn/9780756407124-M.jpg",
  3: "https://covers.openlibrary.org/b/isbn/9780553262506-M.jpg",
  4: "https://covers.openlibrary.org/b/isbn/9780765326355-M.jpg",
  5: "https://covers.openlibrary.org/b/isbn/9780575079793-M.jpg",
  6: "https://covers.openlibrary.org/b/isbn/9780765350374-M.jpg",
  7: "https://covers.openlibrary.org/b/isbn/9780385534635-M.jpg",
  8: "https://covers.openlibrary.org/b/isbn/9780765311788-M.jpg",
};

const GRADIENT_FALLBACKS = {
  blue: "from-blue-400 to-indigo-600", pink: "from-pink-400 to-rose-600",
  green: "from-emerald-400 to-teal-600", yellow: "from-amber-400 to-orange-500",
  purple: "from-violet-400 to-purple-700", red: "from-red-400 to-rose-700",
  cyan: "from-cyan-400 to-blue-500", lime: "from-lime-400 to-green-600",
};

export default function CartPage({ cart, setCart }) {
  const navigate = useNavigate();

  const updateQty = (id, delta) =>
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i)).filter((i) => i.qty > 0)
    );

  const removeItem = (id) => setCart((prev) => prev.filter((i) => i.id !== id));

  const subtotal = cart.reduce((sum, i) => sum + parseFloat(i.price.replace("£", "")) * i.qty, 0);
  const delivery = 2.99;
  const discount = 3.0;
  const total = (subtotal + delivery - discount).toFixed(2);
  const itemCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar cartCount={cart.reduce((s, i) => s + i.qty, 0)} />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100 px-4 sm:px-6 py-2.5">
        <div className="max-w-7xl mx-auto text-xs text-gray-400">
          <Link to={homePath()} className="hover:text-[#1e3a5f] hover:underline">Home</Link>
          <span className="mx-1.5">›</span>
          <Link to="/catalogue" className="hover:text-[#1e3a5f] hover:underline">Catalogue</Link>
          <span className="mx-1.5">›</span>
          <span className="text-[#1e3a5f] font-semibold">Shopping Cart</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 flex gap-6 flex-1 flex-col lg:flex-row">
        {/* ── CART ITEMS ── */}
        <div className="flex-1 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-gray-900">
              Your Cart
              <span className="ml-2 text-sm font-semibold text-gray-400">({itemCount} {itemCount === 1 ? "item" : "items"})</span>
            </h2>
            <button onClick={() => navigate("/catalogue")} className="text-xs text-[#1e3a5f] font-semibold hover:underline">
              ← Continue shopping
            </button>
          </div>

          {cart.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-16 text-center fade-up">
              <ShoppingBag size={48} className="text-gray-200 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-500 mb-2">Your cart is empty</h3>
              <p className="text-sm text-gray-400 mb-6">Add some books to get started</p>
              <Button onClick={() => navigate("/catalogue")} variant="primary">Browse Catalogue</Button>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map((item, idx) => {
                const coverUrl = item.cover ?? COVER_URLS[item.id];
                const fallback = GRADIENT_FALLBACKS[item.color] ?? "from-blue-400 to-indigo-600";
                return (
                  <div
                    key={item.id}
                    className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex gap-4 fade-up fade-up-delay-${Math.min(idx + 1, 3)}`}
                  >
                    {/* Cover */}
                    <div className="w-16 h-22 rounded-xl overflow-hidden shadow-md shrink-0 bg-gray-100">
                      {coverUrl ? (
                        <img src={coverUrl} alt={item.title} className="w-full h-full object-cover" onError={(e) => e.target.style.display='none'} />
                      ) : (
                        <div className={`w-full h-full bg-gradient-to-br ${fallback} flex items-center justify-center text-2xl`}>{item.emoji}</div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold text-violet-600 uppercase tracking-wider">{item.tag}</span>
                      <h4 className="text-sm font-bold text-gray-900 leading-snug mt-0.5 truncate">{item.title}</h4>
                      <p className="text-xs text-gray-500 mb-1.5">{item.author}</p>
                      <span className="text-[11px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">Paperback</span>
                      {item.delivery && <p className="text-[11px] text-emerald-600 font-medium mt-1.5">📦 {item.delivery}</p>}
                    </div>

                    <div className="flex flex-col items-end justify-between shrink-0">
                      <p className="text-base font-black text-[#1e3a5f]">{item.price}</p>
                      <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-1 border border-gray-200">
                        <button onClick={() => updateQty(item.id, -1)} className="w-6 h-6 rounded-lg flex items-center justify-center hover:bg-white hover:shadow text-gray-600 transition-all">
                          <Minus size={11} />
                        </button>
                        <span className="text-sm font-bold w-5 text-center">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, 1)} className="w-6 h-6 rounded-lg flex items-center justify-center hover:bg-white hover:shadow text-gray-600 transition-all">
                          <Plus size={11} />
                        </button>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="text-[11px] text-red-400 hover:text-red-600 flex items-center gap-1 transition-colors">
                        <Trash2 size={11} /> Remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* AI Recommendations */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 bg-violet-100 rounded-lg flex items-center justify-center">
                <Sparkles size={13} className="text-violet-600" />
              </div>
              <h3 className="text-sm font-black text-gray-900">Recommended for You</h3>
            </div>
            <p className="text-xs text-gray-500 mb-4 ml-8">Based on your browsing and order history</p>
            <div className="grid grid-cols-3 gap-3">
              {RECOMMENDATIONS.map((r) => {
                const rCover = COVER_URLS[r.id];
                const rFallback = GRADIENT_FALLBACKS[r.color] ?? "from-blue-400 to-indigo-600";
                return (
                  <div key={r.id} className="card-hover border border-gray-100 rounded-xl overflow-hidden shadow-sm flex flex-col">
                    <div className="h-20 bg-gray-100 overflow-hidden">
                      {rCover ? (
                        <img src={rCover} alt={r.title} className="w-full h-full object-cover" onError={(e) => e.target.style.display='none'} />
                      ) : (
                        <div className={`w-full h-full bg-gradient-to-br ${rFallback} flex items-center justify-center text-2xl`}>{r.emoji}</div>
                      )}
                    </div>
                    <div className="p-2.5 flex flex-col flex-1">
                      <p className="text-xs font-bold text-gray-800 leading-snug line-clamp-2">{r.title}</p>
                      <p className="text-xs font-black text-[#1e3a5f] mt-1 mb-2">{r.price}</p>
                      <div className="mt-auto">
                        <AddToCartButton
                          fullWidth
                          title={r.title}
                          quantity={qtyOf(cart, r.id)}
                          onAdd={() => setCart((prev) => addItem(prev, r))}
                          onUpdateQty={(d) => setCart((prev) => changeQty(prev, r.id, d))}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Order History */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-black text-gray-900">🕐 Order History – Buy Again</h3>
              <Link to="/orders" className="text-xs text-[#1e3a5f] font-semibold hover:underline">View all →</Link>
            </div>
            <div className="divide-y divide-gray-50">
              {ORDER_HISTORY.slice(0, 3).map((o) => (
                <div key={o.id} className="flex items-center gap-3 py-2.5">
                  <div className="w-9 h-12 rounded-lg overflow-hidden shadow shrink-0 bg-gray-100">
                    <img src={o.cover} alt="" className="w-full h-full object-cover" onError={(e) => e.target.style.display='none'} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-800 truncate">{o.title}</p>
                    <p className="text-xs text-gray-500">{o.author} · {o.date}</p>
                  </div>
                  <AddToCartButton
                    label="Buy Again"
                    variant="outline"
                    title={o.title}
                    quantity={qtyOf(cart, o.id)}
                    onAdd={() => setCart((prev) => addItem(prev, o))}
                    onUpdateQty={(d) => setCart((prev) => changeQty(prev, o.id, d))}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── ORDER SUMMARY ── */}
        <div className="lg:w-80 shrink-0">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sticky top-20">
            <h3 className="text-base font-black text-gray-900 mb-4">Order Summary</h3>

            <div className="space-y-2.5 text-sm text-gray-600 mb-3">
              <div className="flex justify-between"><span>Subtotal ({itemCount} items)</span><span className="font-semibold text-gray-900">£{subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Delivery</span><span className="font-semibold text-gray-900">£{delivery.toFixed(2)}</span></div>
              <div className="flex justify-between text-emerald-600"><span>Discount</span><span className="font-semibold">−£{discount.toFixed(2)}</span></div>
            </div>

            <div className="flex justify-between font-black text-lg border-t border-gray-100 pt-3 mb-4">
              <span>Total</span><span className="text-[#1e3a5f]">£{total}</span>
            </div>

            {/* Promo */}
            <div className="flex gap-2 mb-3">
              <input type="text" placeholder="Promo / gift code" className="flex-1 px-3 py-2 border border-gray-200 rounded-xl text-xs bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]" />
              <button className="px-3 py-2 bg-amber-400 hover:bg-amber-300 text-[#1e3a5f] rounded-xl text-xs font-bold transition-colors">Apply</button>
            </div>

            {/* Gift Points */}
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 rounded-xl p-3 flex justify-between items-center mb-5">
              <div>
                <p className="text-xs font-bold text-emerald-800">🎁 250 gift points available</p>
                <p className="text-[11px] text-emerald-600 mt-0.5">= £2.50 off your order</p>
              </div>
              <button className="text-xs font-bold text-emerald-700 bg-emerald-100 hover:bg-emerald-200 px-2.5 py-1.5 rounded-lg transition-colors">Redeem</button>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              disabled={cart.length === 0}
              className="btn-shine w-full py-3.5 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-[#1e3a5f] font-black rounded-xl text-sm shadow-lg shadow-amber-400/30 transition-all"
            >
              Proceed to Checkout →
            </button>
            <p className="text-center text-[10px] text-gray-400 mt-2">🔒 Secure checkout · SSL encrypted</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
