import { Link } from "react-router-dom";
import { PackageOpen } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AddToCartButton from "../components/AddToCartButton";
import { ORDER_HISTORY } from "../data/books";
import { addItem, changeQty, qtyOf } from "../cart";
import { homePath } from "../auth";

export default function OrderHistoryPage({ cart, setCart }) {
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar cartCount={cartCount} />

      <div className="bg-white border-b border-gray-100 px-4 sm:px-6 py-2.5">
        <div className="max-w-4xl mx-auto text-xs text-gray-400">
          <Link to={homePath()} className="hover:text-[#1e3a5f] hover:underline">Home</Link>
          <span className="mx-1.5">›</span>
          <Link to="/catalogue" className="hover:text-[#1e3a5f] hover:underline">Catalogue</Link>
          <span className="mx-1.5">›</span>
          <span className="text-[#1e3a5f] font-semibold">Order History</span>
        </div>
      </div>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="text-xl font-black text-gray-900">Order History</h1>
            <p className="text-xs text-gray-500 mt-0.5">{ORDER_HISTORY.length} past purchases</p>
          </div>
          <Link to="/cart" className="text-xs text-[#1e3a5f] font-semibold hover:underline">
            Go to cart ({cartCount}) →
          </Link>
        </div>

        {ORDER_HISTORY.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-16 text-center">
            <PackageOpen size={48} className="text-gray-200 mx-auto mb-4" />
            <p className="text-sm text-gray-500">You haven't placed any orders yet.</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-50">
            {ORDER_HISTORY.map((o) => (
              <div key={o.id} className="flex items-center gap-4 p-4">
                <div className="w-12 h-16 rounded-lg overflow-hidden shadow shrink-0 bg-gray-100">
                  <img
                    src={o.cover}
                    alt={o.title}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.style.display = "none"; }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900 truncate">{o.title}</p>
                  <p className="text-xs text-gray-500 truncate">{o.author}</p>
                  <p className="text-[11px] text-gray-400 mt-1">
                    Ordered {o.date} · #{o.orderId}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <span className="text-sm font-black text-[#1e3a5f]">{o.price}</span>
                  <AddToCartButton
                    label="Buy Again"
                    variant="outline"
                    title={o.title}
                    quantity={qtyOf(cart, o.id)}
                    onAdd={() => setCart((prev) => addItem(prev, o))}
                    onUpdateQty={(d) => setCart((prev) => changeQty(prev, o.id, d))}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
