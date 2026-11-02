import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Eye, EyeOff, ShieldCheck } from "lucide-react";
import Footer from "../components/Footer";
import Button from "../components/Button";
import CheckoutSteps from "../components/CheckoutSteps";
import { homePath } from "../auth";

const STEPS = [{ label: "Cart", to: "/cart" }, { label: "Delivery & Address", to: "/checkout" }, { label: "Payment" }, { label: "Confirmation" }];

const BG_MAP = { blue: "bg-blue-100", pink: "bg-pink-100", green: "bg-green-100", yellow: "bg-yellow-100", purple: "bg-purple-100", red: "bg-red-100", cyan: "bg-cyan-100", lime: "bg-lime-100" };

export default function PaymentPage({ cart }) {
  const navigate = useNavigate();
  const [showCvv, setShowCvv] = useState(false);
  const [cardNumber, setCardNumber] = useState("•••• •••• •••• 4242");

  const subtotal = cart.reduce((sum, i) => sum + parseFloat(i.price.replace("£", "")) * i.qty, 0);
  const delivery = 2.99;
  const discount = 3.0;
  const total = (subtotal + delivery - discount).toFixed(2);

  const formatCardDisplay = (val) => {
    const cleaned = val.replace(/\D/g, "").slice(0, 16);
    return cleaned.replace(/(.{4})/g, "$1 ").trim();
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Minimal header */}
      <header className="bg-[#1e3a5f] text-white py-3 px-6 flex items-center justify-between">
        <Link to={homePath()} reloadDocument className="text-lg font-extrabold tracking-tight hover:opacity-90 transition-opacity">
          Book<span className="text-amber-400">Haven</span>
        </Link>
        <span className="flex items-center gap-1.5 text-xs text-slate-300">
          <Lock size={13} /> Secure Checkout
        </span>
      </header>

      <CheckoutSteps steps={STEPS} currentStep={2} />

      <main className="flex-1 flex justify-center px-4 sm:px-6 py-8">
        <div className="max-w-4xl w-full flex gap-6 flex-col lg:flex-row">
          {/* Payment Form */}
          <div className="flex-1">
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h2 className="text-lg font-bold text-[#1e3a5f] mb-1">Complete Your Payment</h2>
              <p className="text-xs text-gray-500 mb-5">Your details are encrypted and secure.</p>

              {/* Visual Card */}
              <div
                className="rounded-2xl p-5 mb-5 min-h-[130px] relative"
                style={{ background: "linear-gradient(135deg, #1e3a5f 0%, #2d5a9e 100%)" }}
              >
                <div className="w-8 h-6 bg-amber-400 rounded mb-4" />
                <div className="text-white font-mono text-base tracking-widest mb-4">
                  •••• &nbsp;•••• &nbsp;•••• &nbsp;4242
                </div>
                <div className="flex justify-between text-xs text-blue-200">
                  <div>
                    <div className="mb-0.5 text-[10px]">VALID THRU</div>
                    <div className="text-white font-semibold">12 / 27</div>
                  </div>
                  <div className="text-white font-semibold tracking-wide self-end">SARAH JOHNSON</div>
                </div>
                <span className="absolute top-4 right-5 text-white text-xl font-bold opacity-80">VISA</span>
              </div>

              {/* Security Badges */}
              <div className="flex flex-wrap gap-2 mb-5">
                {["🔒 SSL Secured", "✅ PCI DSS", "🛡️ Fraud Protection"].map((b) => (
                  <span key={b} className="text-[11px] bg-green-50 border border-green-200 text-emerald-700 px-2.5 py-1 rounded-full">
                    {b}
                  </span>
                ))}
              </div>

              {/* Form Fields */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Cardholder Name</label>
                  <input type="text" defaultValue="Sarah Johnson" className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Card Number</label>
                  <input
                    type="text"
                    placeholder="•••• •••• •••• ••••"
                    maxLength={19}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm font-mono bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Expiry Date</label>
                    <input type="text" defaultValue="12 / 27" className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">CVV / CVC</label>
                    <div className="relative">
                      <input
                        type={showCvv ? "text" : "password"}
                        placeholder="•••"
                        maxLength={4}
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1e3a5f] pr-9"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCvv(!showCvv)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showCvv ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pay Button */}
              <div className="mt-6 space-y-2">
                <Button onClick={() => navigate("/confirmation")} variant="amber" size="xl" fullWidth>
                  🔒 Pay £{total}
                </Button>
                <Button onClick={() => navigate("/checkout")} variant="ghost" size="md" fullWidth>
                  ← Back to Delivery
                </Button>
              </div>
              <p className="text-center text-[10px] text-gray-400 mt-3 leading-relaxed">
                By clicking "Pay" you agree to BookHaven's Terms of Service.<br />
                You will not be charged until your order is confirmed.
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-72 shrink-0">
            {/* Order Summary */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-4">
              <h3 className="text-sm font-bold text-[#1e3a5f] mb-4">Order Summary</h3>
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between text-xs text-gray-700 mb-2">
                  <span className="truncate pr-2">{item.title} × {item.qty}</span>
                  <span className="font-semibold shrink-0">
                    £{(parseFloat(item.price.replace("£", "")) * item.qty).toFixed(2)}
                  </span>
                </div>
              ))}
              <hr className="border-gray-100 my-3" />
              <div className="space-y-1.5 text-xs text-gray-700">
                <div className="flex justify-between"><span>Subtotal</span><span>£{subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>Delivery</span><span>£{delivery.toFixed(2)}</span></div>
                <div className="flex justify-between text-emerald-600"><span>Discount</span><span>−£{discount.toFixed(2)}</span></div>
              </div>
              <div className="flex justify-between font-bold text-base border-t border-gray-200 pt-3 mt-2">
                <span>Total</span><span>£{total}</span>
              </div>
              <div className="mt-3 bg-blue-50 border border-blue-100 rounded-lg p-2.5 text-xs text-[#1e3a5f]">
                <strong>📦 Estimated Delivery</strong><br />
                Thu 17 – Fri 18 Jul · Standard
              </div>
            </div>

            {/* Security */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5">
              <h4 className="text-xs font-bold text-gray-700 mb-3 flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-emerald-600" /> Your Security Guarantee
              </h4>
              {[
                ["🔒", "256-bit SSL encryption on all transactions"],
                ["💳", "We never store your full card number"],
                ["↩️", "Cancel within 48 hrs for a full refund"],
                ["✅", "Verified by Visa / Mastercard SecureCode"],
              ].map(([icon, text]) => (
                <div key={text} className="flex gap-2 text-xs text-gray-500 mb-2">
                  <span>{icon}</span><span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
