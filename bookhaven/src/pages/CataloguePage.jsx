import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Search, SlidersHorizontal, Sparkles, TrendingUp, Truck } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BookCard from "../components/BookCard";
import AddToCartButton from "../components/AddToCartButton";
import { BOOKS, ORDER_HISTORY } from "../data/books";

const CATEGORIES = ["All", "Fiction", "Non-Fiction", "Science & Tech", "Children", "Biography", "Self-Help", "History", "Fantasy"];

const PUBLISHERS = ["Penguin Books", "HarperCollins", "Macmillan", "Bloomsbury", "Random House"];
const FORMATS = ["Hardcover", "Paperback", "eBook", "Audiobook"];

const priceOf = (b) => parseFloat(b.price.replace("£", ""));

// Toggle a value in/out of an array (used by the checkbox groups)
const toggle = (arr, value) =>
  arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];

const SORTERS = {
  relevance: () => 0,
  "price-asc": (a, b) => priceOf(a) - priceOf(b),
  "price-desc": (a, b) => priceOf(b) - priceOf(a),
  bestselling: (a, b) =>
    Number(b.ribbon === "Bestseller") - Number(a.ribbon === "Bestseller") || b.rating - a.rating,
  newest: (a, b) => Number(b.ribbon === "New") - Number(a.ribbon === "New") || b.id - a.id,
};

const FEATURE_BADGES = [
  { icon: <Truck size={16} />, text: "Free delivery over £20" },
  { icon: <Sparkles size={16} />, text: "AI-powered recommendations" },
  { icon: <TrendingUp size={16} />, text: "50,000+ titles" },
];

export default function CataloguePage({ cart, setCart }) {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [publishers, setPublishers] = useState([]);
  const [formats, setFormats] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("relevance");

  const hasActiveFilters =
    publishers.length > 0 || formats.length > 0 || minPrice !== "" || maxPrice !== "";

  const clearFilters = () => {
    setPublishers([]);
    setFormats([]);
    setMinPrice("");
    setMaxPrice("");
  };

  const handleAddToCart = (book) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === book.id);
      if (existing) return prev.map((i) => i.id === book.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...book, qty: 1 }];
    });
  };

  // +1 / -1 from the card stepper; dropping to 0 removes the book from the cart
  const handleUpdateQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0)
    );
  };

  const qtyInCart = (id) => cart.find((i) => i.id === id)?.qty ?? 0;
  const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);

  // An empty checkbox group means "no restriction" for that group
  const min = minPrice === "" ? 0 : parseFloat(minPrice);
  const max = maxPrice === "" ? Infinity : parseFloat(maxPrice);

  const filtered = BOOKS.filter(
    (b) =>
      (activeCategory === "All" || b.tag.includes(activeCategory)) &&
      (b.title.toLowerCase().includes(search.toLowerCase()) ||
        b.author.toLowerCase().includes(search.toLowerCase())) &&
      (publishers.length === 0 || publishers.includes(b.publisher)) &&
      (formats.length === 0 || formats.includes(b.format)) &&
      priceOf(b) >= (Number.isNaN(min) ? 0 : min) &&
      priceOf(b) <= (Number.isNaN(max) ? Infinity : max)
  ).sort(SORTERS[sortBy]);

  const countBy = (field, value) => BOOKS.filter((b) => b[field] === value).length;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar cartCount={totalItems} />

      {/* ── HERO BANNER ── */}
      <div className="hero-gradient relative overflow-hidden">
        {/* Blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Text */}
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 glass rounded-full px-3 py-1.5 text-xs text-amber-300 font-semibold mb-4">
                <Sparkles size={12} /> Curated for you · Updated today
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-3">
                Find your next<br />
                <span className="text-gradient">favourite story</span>
              </h1>
              <p className="text-slate-300 text-sm mb-6 max-w-md leading-relaxed">
                Browse 50,000+ titles across every genre. Bestsellers, new releases, hidden gems — all with fast UK delivery.
              </p>
              {/* Feature badges */}
              <div className="flex flex-wrap gap-2">
                {FEATURE_BADGES.map(({ icon, text }) => (
                  <div key={text} className="glass flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs text-white/80">
                    <span className="text-amber-400">{icon}</span> {text}
                  </div>
                ))}
              </div>
            </div>

            {/* Floating book covers */}
            <div className="hidden lg:flex items-end gap-3 pb-2">
              {[
                { id: 4, rotate: "-rotate-6", h: "h-44" },
                { id: 7, rotate: "rotate-0",  h: "h-52" },
                { id: 8, rotate: "rotate-6",  h: "h-44" },
              ].map((b) => {
                const book = BOOKS.find(bk => bk.id === b.id);
                return (
                  <div key={b.id} className={`${b.rotate} ${b.h} w-28 rounded-xl overflow-hidden shadow-2xl border-2 border-white/20 shrink-0`}>
                    <img
                      src={`https://covers.openlibrary.org/b/isbn/${["9780765326355","9780385534635","9780765311788"][b.id - 4 > 3 ? 0 : b.id - 4]}-M.jpg`}
                      alt=""
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.style.display='none'; }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Search bar — overlapping hero bottom */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-0 relative z-10">
          <div className="bg-white rounded-t-2xl shadow-xl px-4 py-3 flex gap-3">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search books, authors, ISBN…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1e3a5f] focus:bg-white transition-colors"
              />
            </div>
            <select
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-xl text-sm bg-gray-50 hidden sm:block focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]"
            >
              <option value="All">All Categories</option>
              {CATEGORIES.slice(1).map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <button className="btn-shine shrink-0 flex items-center justify-center gap-2 h-10 px-5 bg-[#1e3a5f] hover:bg-[#152d4a] text-white rounded-xl text-sm font-bold leading-none transition-colors shadow-lg shadow-[#1e3a5f]/30">
              <Search size={14} className="shrink-0" /> Search
            </button>
          </div>
        </div>
      </div>

      {/* ── CATEGORY STRIP ── */}
      <div className="bg-white shadow-sm overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                activeCategory === cat
                  ? "bg-[#1e3a5f] text-white border-[#1e3a5f] shadow-md shadow-[#1e3a5f]/20"
                  : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="flex flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 gap-6">
        {/* Sidebar */}
        <aside className="w-52 shrink-0 hidden md:block">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sticky top-20">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-black text-gray-900">Filters</span>
              {hasActiveFilters && (
                <button onClick={clearFilters} className="text-xs font-semibold text-[#1e3a5f] hover:underline">
                  Clear all
                </button>
              )}
            </div>

            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Publisher</h3>
            {PUBLISHERS.map((pub) => {
              const count = countBy("publisher", pub);
              return (
                <label
                  key={pub}
                  className={`flex items-center gap-2 text-xs mb-2.5 transition-colors ${
                    count === 0 ? "text-gray-300 cursor-not-allowed" : "text-gray-700 cursor-pointer hover:text-[#1e3a5f]"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={publishers.includes(pub)}
                    disabled={count === 0}
                    onChange={() => setPublishers((prev) => toggle(prev, pub))}
                    className="rounded accent-[#1e3a5f]"
                  />
                  <span className="flex-1">{pub}</span>
                  <span className="text-[10px] text-gray-400">({count})</span>
                </label>
              );
            })}

            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3 mt-5">Format</h3>
            {FORMATS.map((f) => {
              const count = countBy("format", f);
              return (
                <label
                  key={f}
                  className={`flex items-center gap-2 text-xs mb-2.5 transition-colors ${
                    count === 0 ? "text-gray-300 cursor-not-allowed" : "text-gray-700 cursor-pointer hover:text-[#1e3a5f]"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formats.includes(f)}
                    disabled={count === 0}
                    onChange={() => setFormats((prev) => toggle(prev, f))}
                    className="rounded accent-[#1e3a5f]"
                  />
                  <span className="flex-1">{f}</span>
                  <span className="text-[10px] text-gray-400">({count})</span>
                </label>
              );
            })}

            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3 mt-5">Price (£)</h3>
            <div className="flex gap-2">
              <input
                type="number"
                min="0"
                inputMode="decimal"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-16 px-2 py-1.5 text-xs border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#1e3a5f]"
              />
              <span className="text-gray-400 self-center text-xs">–</span>
              <input
                type="number"
                min="0"
                inputMode="decimal"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-16 px-2 py-1.5 text-xs border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#1e3a5f]"
              />
            </div>
          </div>
        </aside>

        {/* Products */}
        <div className="flex-1 fade-up">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-black text-gray-900">
                {activeCategory === "All" ? "All Books" : activeCategory}
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">{filtered.length} results found</p>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs border border-gray-200 rounded-xl px-3 py-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]"
            >
              <option value="relevance">Sort: Relevance</option>
              <option value="price-asc">Price: Low–High</option>
              <option value="price-desc">Price: High–Low</option>
              <option value="bestselling">Bestselling</option>
              <option value="newest">Newest</option>
            </select>
          </div>

          {filtered.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
              <p className="text-base font-bold text-gray-700 mb-1">No books match your filters</p>
              <p className="text-sm text-gray-400 mb-4">Try removing a filter or changing your search.</p>
              <button
                onClick={() => { clearFilters(); setSearch(""); setActiveCategory("All"); }}
                className="text-sm font-bold text-[#1e3a5f] border-2 border-[#1e3a5f]/30 px-4 py-2 rounded-xl hover:bg-[#1e3a5f] hover:text-white transition-all"
              >
                Reset everything
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {filtered.map((book) => (
                <BookCard
                  key={book.id}
                  {...book}
                  quantity={qtyInCart(book.id)}
                  onAddToCart={() => handleAddToCart(book)}
                  onUpdateQty={(delta) => handleUpdateQty(book.id, delta)}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="flex justify-center gap-2 mt-10">
            {[1, 2, 3, "…", 6].map((p, i) => (
              <button
                key={i}
                className={`px-3.5 py-2 rounded-xl border text-xs font-bold transition-all ${
                  p === 1
                    ? "bg-[#1e3a5f] text-white border-[#1e3a5f] shadow-lg shadow-[#1e3a5f]/20"
                    : "border-gray-200 text-gray-600 hover:bg-gray-100 hover:border-gray-300 bg-white"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── ORDER HISTORY ── */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 pb-8">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-black text-[#1e3a5f]">🕐 Recently Ordered – Buy Again</h3>
            <Link to="/orders" className="text-xs text-[#1e3a5f] font-semibold hover:underline">View all orders →</Link>
          </div>
          <div className="divide-y divide-gray-50">
            {ORDER_HISTORY.slice(0, 3).map((o) => (
              <div key={o.id} className="flex items-center gap-4 py-3">
                <div className="w-10 h-14 rounded-lg overflow-hidden shadow shrink-0 bg-gray-100">
                  <img src={o.cover} alt={o.title} className="w-full h-full object-cover" onError={(e) => e.target.style.display='none'} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900 truncate">{o.title}</p>
                  <p className="text-xs text-gray-500">{o.author} · {o.date}</p>
                </div>
                <AddToCartButton
                  label="Buy Again"
                  variant="outline"
                  title={o.title}
                  quantity={qtyInCart(o.id)}
                  onAdd={() => handleAddToCart(o)}
                  onUpdateQty={(d) => handleUpdateQty(o.id, d)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
