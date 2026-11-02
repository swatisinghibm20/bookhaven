import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Truck, CreditCard, Gift } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";
import CheckoutSteps from "../components/CheckoutSteps";

const STEPS = [{ label: "Cart", to: "/cart" }, { label: "Delivery & Payment" }, { label: "Confirmation" }];

const SAVED_ADDRESSES = [
  { id: 1, name: "Sarah Johnson", line1: "42 Reading Lane", line2: "London, EC1A 1BB", country: "United Kingdom", isDefault: true },
  { id: 2, name: "Work Address", line1: "1 Canary Wharf", line2: "London, E14 5AB", country: "United Kingdom", isDefault: false },
];

const DELIVERY_OPTIONS = [
  { id: "standard", label: "Standard Delivery", date: "Thu 17 – Fri 18 Jul", price: "£2.99" },
  { id: "express", label: "Express Delivery", date: "Wed 16 Jul (tomorrow)", price: "£5.99" },
  { id: "nextday", label: "Next Day (before noon)", date: "Wed 16 Jul by 12:00", price: "£9.99" },
];

const PAYMENT_METHODS = [
  { id: "card", icon: "💳", label: "Credit / Debit Card" },
  { id: "paypal", icon: "🅿️", label: "PayPal" },
  { id: "digital", icon: "📱", label: "Apple / Google Pay" },
];

const BG_MAP = { blue: "bg-blue-100", pink: "bg-pink-100", green: "bg-green-100", yellow: "bg-yellow-100", purple: "bg-purple-100", red: "bg-red-100", cyan: "bg-cyan-100", lime: "bg-lime-100" };

export default function CheckoutPage({ cart }) {
  const navigate = useNavigate();
  const [selectedAddress, setSelectedAddress] = useState(1);
  const [selectedDelivery, setSelectedDelivery] = useState("standard");
  const [selectedPayment, setSelectedPayment] = useState("card");
  const [redeemPoints, setRedeemPoints] = useState(false);

  const subtotal = cart.reduce((sum, i) => sum + parseFloat(i.price.replace("£", "")) * i.qty, 0);
  const delivery = DELIVERY_OPTIONS.find((d) => d.id === selectedDelivery);
  const deliveryCost = parseFloat(delivery?.price.replace("£", "") ?? 2.99);
  const discount = 3.0;
  const points = redeemPoints ? 2.5 : 0;
  const total = (subtotal + deliveryCost - discount - points).toFixed(2);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar cartCount={cart.reduce((s, i) => s + i.qty, 0)} />
      <CheckoutSteps steps={STEPS} currentStep={1} />

      <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 py-6 flex gap-6 flex-col lg:flex-row flex-1">
        {/* Form */}
        <div className="flex-1 space-y-4">
          {/* Delivery Address */}
          <section className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="text-sm font-bold text-[#1e3a5f] pb-3 border-b border-gray-100 mb-4 flex items-center gap-2">
              <MapPin size={16} /> Delivery Address
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              {SAVED_ADDRESSES.map((addr) => (
                <div
                  key={addr.id}
                  onClick={() => setSelectedAddress(addr.id)}
                  className={`border-2 rounded-xl p-3 cursor-pointer relative transition-colors ${
                    selectedAddress === addr.id ? "border-[#1e3a5f] bg-blue-50" : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {addr.isDefault && (
                    <span className="absolute top-2 right-2 text-[10px] bg-[#1e3a5f] text-white px-2 py-0.5 rounded-full">
                      Default
                    </span>
                  )}
                  <p className="text-sm font-bold text-gray-900 mb-1">{addr.name}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {addr.line1}<br />{addr.line2}<br />{addr.country}
                  </p>
                </div>
              ))}
            </div>
            <button className="text-xs text-blue-600 font-semibold hover:underline">+ Add a new address</button>
          </section>

          {/* Delivery Options */}
          <section className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="text-sm font-bold text-[#1e3a5f] pb-3 border-b border-gray-100 mb-4 flex items-center gap-2">
              <Truck size={16} /> Delivery Options
            </h3>
            <div className="space-y-2">
              {DELIVERY_OPTIONS.map((opt) => (
                <label
                  key={opt.id}
                  className={`flex items-center gap-3 border-2 rounded-xl p-3 cursor-pointer transition-colors ${
                    selectedDelivery === opt.id ? "border-[#1e3a5f] bg-blue-50" : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="delivery"
                    value={opt.id}
                    checked={selectedDelivery === opt.id}
                    onChange={() => setSelectedDelivery(opt.id)}
                    className="accent-[#1e3a5f]"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">{opt.label}</p>
                    <p className="text-xs text-gray-500">{opt.date}</p>
                  </div>
                  <span className="text-sm font-bold text-[#1e3a5f]">{opt.price}</span>
                </label>
              ))}
            </div>
          </section>

          {/* Payment Method */}
          <section className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="text-sm font-bold text-[#1e3a5f] pb-3 border-b border-gray-100 mb-4 flex items-center gap-2">
              <CreditCard size={16} /> Payment Method
            </h3>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {PAYMENT_METHODS.map((pm) => (
                <button
                  key={pm.id}
                  onClick={() => setSelectedPayment(pm.id)}
                  className={`border-2 rounded-xl py-3 flex flex-col items-center gap-1.5 transition-colors ${
                    selectedPayment === pm.id ? "border-amber-400 bg-amber-50" : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <span className="text-2xl">{pm.icon}</span>
                  <span className="text-xs font-semibold text-gray-700">{pm.label}</span>
                </button>
              ))}
            </div>
            {selectedPayment === "card" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Cardholder Name</label>
                  <input type="text" placeholder="Sarah Johnson" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Card Number</label>
                  <input type="text" placeholder="•••• •••• •••• ••••" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Expiry Date</label>
                  <input type="text" placeholder="MM / YY" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">CVV</label>
                  <input type="text" placeholder="•••" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]" />
                </div>
              </div>
            )}
          </section>

          {/* Gift Points */}
          <section className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="text-sm font-bold text-[#1e3a5f] pb-3 border-b border-gray-100 mb-4 flex items-center gap-2">
              <Gift size={16} /> Gift Points
            </h3>
            <div className="bg-green-50 border border-green-200 rounded-xl p-3 flex justify-between items-center">
              <div>
                <p className="text-sm text-emerald-800 font-semibold">Available: 250 pts = £2.50</p>
                <p className="text-xs text-emerald-600 mt-0.5">Redeem to save on this order</p>
              </div>
              <button
                onClick={() => setRedeemPoints(!redeemPoints)}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-colors ${
                  redeemPoints ? "bg-emerald-600 text-white" : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                }`}
              >
                {redeemPoints ? "✓ Redeemed" : "Redeem"}
              </button>
            </div>
          </section>
        </div>

        {/* Sidebar Summary */}
        <div className="lg:w-72 shrink-0">
          <div className="bg-white border border-gray-200 rounded-xl p-5 sticky top-20">
            <h3 className="text-base font-bold text-[#1e3a5f] mb-4">Order Summary</h3>
            <div className="space-y-2 mb-3">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className={`${BG_MAP[item.color] ?? "bg-blue-100"} w-9 h-12 rounded flex items-center justify-center text-lg shrink-0`}>
                    {item.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-800 truncate">{item.title}</p>
                    <p className="text-[10px] text-gray-400">Qty: {item.qty}</p>
                  </div>
                  <span className="text-xs font-bold text-[#1e3a5f]">
                    £{(parseFloat(item.price.replace("£", "")) * item.qty).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <hr className="border-gray-100 my-3" />
            <div className="space-y-2 text-sm text-gray-700 mb-3">
              <div className="flex justify-between"><span>Subtotal</span><span>£{subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Delivery</span><span>£{deliveryCost.toFixed(2)}</span></div>
              <div className="flex justify-between text-emerald-600"><span>Discount</span><span>−£{discount.toFixed(2)}</span></div>
              {redeemPoints && <div className="flex justify-between text-emerald-600"><span>Gift Points</span><span>−£2.50</span></div>}
            </div>
            <div className="flex justify-between font-bold text-base border-t border-gray-200 pt-3 mb-4">
              <span>Total</span><span>£{total}</span>
            </div>
            <Button onClick={() => navigate("/payment")} variant="amber" size="lg" fullWidth>
              Place Order →
            </Button>
            <p className="text-center text-[10px] text-gray-400 mt-2">🔒 SSL secured · 256-bit encryption</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
