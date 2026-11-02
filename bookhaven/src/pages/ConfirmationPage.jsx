import { Link, useNavigate } from "react-router-dom";
import { CheckCircle, XCircle } from "lucide-react";
import Footer from "../components/Footer";
import Button from "../components/Button";
import CheckoutSteps from "../components/CheckoutSteps";
import { homePath } from "../auth";

const STEPS = [{ label: "Cart", to: "/cart" }, { label: "Delivery & Address", to: "/checkout" }, { label: "Payment" }, { label: "Confirmed!" }];

const TRACKER = [
  { label: "Order\nPlaced", done: true },
  { label: "Payment\nConfirmed", done: true },
  { label: "Processing\nOrder", active: true },
  { label: "Dispatched", done: false },
  { label: "Delivered", done: false },
];

const BG_MAP = { blue: "bg-blue-100", pink: "bg-pink-100", green: "bg-green-100", yellow: "bg-yellow-100", purple: "bg-purple-100", red: "bg-red-100", cyan: "bg-cyan-100", lime: "bg-lime-100" };

export default function ConfirmationPage({ cart }) {
  const navigate = useNavigate();

  const subtotal = cart.reduce((sum, i) => sum + parseFloat(i.price.replace("£", "")) * i.qty, 0);
  const total = (subtotal + 2.99 - 3.0).toFixed(2);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-[#1e3a5f] text-white py-3 px-6 flex items-center justify-between">
        <Link to={homePath()} reloadDocument className="text-lg font-extrabold tracking-tight hover:opacity-90 transition-opacity">
          Book<span className="text-amber-400">Haven</span>
        </Link>
        <span className="text-sm text-slate-300">Hi, Sarah</span>
      </header>

      <CheckoutSteps steps={STEPS} currentStep={3} />

      <main className="flex-1 px-4 sm:px-6 py-8">
        <div className="max-w-2xl mx-auto space-y-5">

          {/* Hero */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={36} className="text-emerald-500" />
            </div>
            <h1 className="text-2xl font-extrabold text-emerald-700 mb-2">Order Confirmed! 🎉</h1>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              Thank you, Sarah! Your books are on their way.<br />
              We'll send you a tracking update once dispatched.
            </p>
            <div className="inline-block bg-green-50 border border-green-200 rounded-lg px-5 py-2 text-sm font-bold text-emerald-800 tracking-wider mb-4">
              Order #BH-2025-084712
            </div>
            <p className="text-xs text-gray-500">
              Confirmation sent to <strong>sarah.johnson@example.com</strong>
            </p>
          </div>

          {/* Meta Grid */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Delivery Address", content: "Sarah Johnson\n42 Reading Lane\nLondon, EC1A 1BB\nUnited Kingdom" },
              { label: "Payment", content: `VISA ending in 4242\nAmount charged:\n£${total}` },
              { label: "Estimated Delivery", content: "Thu 17 – Fri 18 July 2025\nStandard Delivery" },
              { label: "Gift Points Earned", content: "+60 points\nTotal balance: 310 pts" },
            ].map(({ label, content }) => (
              <div key={label} className="bg-white border border-gray-200 rounded-xl p-4">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-2">{label}</p>
                <p className="text-sm text-gray-800 whitespace-pre-line leading-relaxed">{content}</p>
              </div>
            ))}
          </div>

          {/* Items */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="text-sm font-bold text-[#1e3a5f] mb-4">Items Ordered</h3>
            <div className="divide-y divide-gray-100">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-3 py-2.5">
                  <div className={`${BG_MAP[item.color] ?? "bg-blue-100"} w-10 h-13 rounded flex items-center justify-center text-xl shrink-0`}>
                    {item.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">{item.title}</p>
                    <p className="text-xs text-gray-500">{item.author} · Paperback · Qty: {item.qty}</p>
                  </div>
                  <span className="text-sm font-bold text-[#1e3a5f]">
                    £{(parseFloat(item.price.replace("£", "")) * item.qty).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-4 font-bold text-base border-t border-gray-200 pt-3 mt-1">
              <span>Total Paid:</span><span>£{total}</span>
            </div>
          </div>

          {/* Delivery Tracker */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="text-sm font-bold text-[#1e3a5f] mb-5">📦 Delivery Tracker</h3>
            <div className="flex items-start justify-between">
              {TRACKER.map((step, i) => (
                <div key={i} className="flex items-center flex-1">
                  <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors ${
                        step.done
                          ? "bg-emerald-500 border-emerald-500 text-white"
                          : step.active
                          ? "bg-amber-400 border-amber-400 text-[#1e3a5f]"
                          : "border-gray-200 text-gray-400 bg-white"
                      }`}
                    >
                      {step.done ? "✓" : step.active ? "⏳" : ["🚚", "🏠"][i - 3] ?? i + 1}
                    </div>
                    <span
                      className={`text-[10px] text-center whitespace-pre-line leading-tight ${
                        step.done ? "text-emerald-600 font-semibold" : step.active ? "text-amber-600 font-semibold" : "text-gray-400"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                  {i < TRACKER.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-1 mb-5 ${step.done ? "bg-emerald-400" : "bg-gray-200"}`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Cancel Warning */}
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <p className="text-sm font-bold text-orange-800">⏰ Cancel within 48 hours</p>
              <p className="text-xs text-orange-600 mt-0.5">
                You can cancel before Wed 16 Jul at 10:34 AM. After this, cancellations are not guaranteed.
              </p>
            </div>
            <button className="shrink-0 text-xs font-bold border-2 border-orange-500 text-orange-600 px-4 py-2 rounded-lg hover:bg-orange-100 transition-colors">
              Cancel Order
            </button>
          </div>

          {/* CTAs */}
          <div className="grid grid-cols-2 gap-3">
            <Button onClick={() => navigate("/catalogue")} variant="primary" size="lg" fullWidth>
              Continue Shopping
            </Button>
            <Button onClick={() => navigate("/catalogue")} variant="outline" size="lg" fullWidth>
              View Order History
            </Button>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
