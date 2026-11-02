import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BookOpen, Eye, EyeOff, ArrowRight, Star } from "lucide-react";
import Button from "../components/Button";
import { login } from "../auth";

// Featured cover art for the left panel
const HERO_BOOKS = [
  { url: "https://covers.openlibrary.org/b/isbn/9780756404741-M.jpg", rotate: "-rotate-6", top: "top-8", left: "left-8", z: "z-10" },
  { url: "https://covers.openlibrary.org/b/isbn/9780765326355-M.jpg", rotate: "rotate-3",  top: "top-24", left: "left-36", z: "z-20" },
  { url: "https://covers.openlibrary.org/b/isbn/9780385534635-M.jpg", rotate: "-rotate-3", top: "top-48", left: "left-16", z: "z-10" },
];

const STATS = [
  { value: "50K+", label: "Books" },
  { value: "2M+",  label: "Readers" },
  { value: "4.9★", label: "Rating" },
];

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", remember: false });

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
    navigate("/catalogue");
  };

  return (
    <div className="min-h-screen flex">
      {/* ── LEFT HERO PANEL ── */}
      <div className="hidden lg:flex flex-col justify-between w-[52%] hero-gradient px-12 py-10 relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-[-80px] right-[-80px] w-72 h-72 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-60px] left-[-60px] w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Logo */}
        <div className="flex items-center gap-2.5 relative z-10">
          <div className="w-9 h-9 bg-amber-400 rounded-xl flex items-center justify-center shadow-lg">
            <BookOpen size={20} className="text-[#1e3a5f]" />
          </div>
          <span className="text-2xl font-black text-white tracking-tight">
            Book<span className="text-amber-400">Haven</span>
          </span>
        </div>

        {/* Floating book covers */}
        <div className="flex-1 relative my-8">
          {HERO_BOOKS.map((b, i) => (
            <div
              key={i}
              className={`absolute ${b.rotate} ${b.top} ${b.left} ${b.z} shadow-2xl rounded-lg overflow-hidden w-32 h-44 border-2 border-white/20`}
              style={{ transition: "transform 0.3s ease" }}
            >
              <img src={b.url} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
          {/* Floating tag */}
          <div className="absolute bottom-4 right-0 glass rounded-2xl px-5 py-3 z-30">
            <div className="flex items-center gap-2 text-white">
              <div className="w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center text-sm">📚</div>
              <div>
                <p className="text-xs font-bold">New Arrivals</p>
                <p className="text-[10px] text-white/70">Updated daily</p>
              </div>
            </div>
          </div>
        </div>

        {/* Headline */}
        <div className="relative z-10">
          <h1 className="text-4xl font-black text-white leading-tight mb-3">
            Discover your<br />
            <span className="text-gradient">next great read.</span>
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed mb-6">
            50,000+ titles across every genre. Fast delivery,<br />curated recommendations, and exclusive deals.
          </p>

          {/* Stats */}
          <div className="flex items-center gap-6">
            {STATS.map(({ value, label }) => (
              <div key={label} className="glass rounded-xl px-4 py-2.5 text-center">
                <div className="text-lg font-black text-amber-400">{value}</div>
                <div className="text-[11px] text-white/70">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── RIGHT FORM PANEL ── */}
      <div className="flex-1 flex flex-col justify-center bg-white px-6 sm:px-12 py-10 overflow-y-auto">
        {/* Mobile logo */}
        <div className="flex items-center gap-2 mb-8 lg:hidden">
          <div className="w-8 h-8 bg-amber-400 rounded-lg flex items-center justify-center">
            <BookOpen size={18} className="text-[#1e3a5f]" />
          </div>
          <span className="text-xl font-black text-[#1e3a5f]">
            Book<span className="text-amber-400">Haven</span>
          </span>
        </div>

        <div className="max-w-sm w-full mx-auto fade-up">
          <h2 className="text-2xl font-black text-gray-900 mb-1">Welcome back 👋</h2>
          <p className="text-sm text-gray-500 mb-8">Sign in to continue to BookHaven</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                Email address
              </label>
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1e3a5f] focus:bg-white transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1e3a5f] focus:bg-white transition-colors pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={form.remember}
                  onChange={(e) => setForm({ ...form, remember: e.target.checked })}
                  className="rounded border-gray-300 accent-[#1e3a5f]"
                />
                Remember me
              </label>
              <button
                type="button"
                onClick={() => alert("Password reset coming soon!")}
                className="text-sm text-[#1e3a5f] font-semibold hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="btn-shine w-full flex items-center justify-center gap-2 py-3 bg-[#1e3a5f] hover:bg-[#152d4a] text-white font-bold rounded-xl shadow-lg shadow-[#1e3a5f]/30 transition-colors text-sm"
            >
              Sign In <ArrowRight size={16} />
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-xs text-gray-400 font-medium">or sign in with</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          {/* Social */}
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-4 h-4" alt="" />
              Google
            </button>
            <button className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all">
              <img src="https://www.svgrepo.com/show/512317/github-142.svg" className="w-4 h-4" alt="" />
              GitHub
            </button>
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            New to BookHaven?{" "}
            <Link to="/catalogue" onClick={login} className="text-[#1e3a5f] font-bold hover:underline">
              Create account →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
