import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, BookOpen, User, Search, Menu, X } from "lucide-react";
import { homePath } from "../auth";

const links = [
  { to: "/catalogue", label: "Catalogue" },
  { to: "/cart", label: "Cart" },
  { to: "/orders", label: "Orders" },
  { to: "/checkout", label: "Checkout" },
];

export default function Navbar({ cartCount = 0 }) {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass-dark shadow-2xl shadow-black/30"
          : "bg-[#1e3a5f]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to={homePath()} reloadDocument className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-amber-400 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <BookOpen size={18} className="text-[#1e3a5f]" />
          </div>
          <span className="text-xl font-black tracking-tight text-white">
            Book<span className="text-amber-400">Haven</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                pathname === to
                  ? "bg-white/15 text-white"
                  : "text-slate-300 hover:text-white hover:bg-white/10"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          {/* User avatar */}
          <div className="hidden sm:flex items-center gap-2 text-sm text-slate-300">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-xs font-bold text-white shadow">
              S
            </div>
            <span>Sarah</span>
          </div>

          {/* Cart */}
          {/* Wrapper is NOT overflow-hidden, so the badge is never clipped by the shine effect */}
          <div className="relative">
            <Link
              to="/cart"
              aria-label="Cart"
              className="btn-shine flex items-center justify-center gap-2 h-10 min-w-[2.5rem] px-3 sm:px-4 bg-amber-400 hover:bg-amber-300 text-[#1e3a5f] rounded-xl text-sm font-bold leading-none transition-colors shadow-lg shadow-amber-400/30"
            >
              <ShoppingCart size={18} className="shrink-0" />
              <span className="hidden sm:inline">Cart</span>
            </Link>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[1.25rem] h-5 px-1 bg-red-500 text-white text-[10px] font-black leading-none rounded-full flex items-center justify-center shadow ring-2 ring-[#1e3a5f]">
                {cartCount}
              </span>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            className="md:hidden flex items-center justify-center w-10 h-10 text-white rounded-lg hover:bg-white/10"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden glass-dark border-t border-white/10 px-4 py-3 space-y-1">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                pathname === to
                  ? "bg-white/15 text-white font-semibold"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
