import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";

// Map footer link labels to real in-app routes where applicable
const ROUTE_MAP = {
  "Fiction":      "/catalogue",
  "Non-Fiction":  "/catalogue",
  "Children":     "/catalogue",
  "FAQ":          "/catalogue",
  "Returns":      "/catalogue",
  "Contact Us":   "/catalogue",
};

const cols = [
  {
    heading: "BookHaven",
    links: ["About Us", "Careers", "Press"],
  },
  {
    heading: "Help",
    links: ["FAQ", "Returns", "Contact Us"],
  },
  {
    heading: "Catalogue",
    links: ["Fiction", "Non-Fiction", "Children"],
  },
  {
    heading: "Connect",
    links: ["Twitter", "Instagram", "Newsletter"],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#1e3a5f] text-slate-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Brand row */}
        <div className="flex items-center gap-2 mb-8">
          <div className="w-7 h-7 bg-amber-400 rounded-lg flex items-center justify-center shadow">
            <BookOpen size={15} className="text-[#1e3a5f]" />
          </div>
          <span className="text-lg font-black text-white tracking-tight">
            Book<span className="text-amber-400">Haven</span>
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8">
          {cols.map(({ heading, links }) => (
            <div key={heading}>
              <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-3">{heading}</h4>
              {links.map((l) => {
                const route = ROUTE_MAP[l];
                return route ? (
                  <Link
                    key={l}
                    to={route}
                    className="block text-xs text-slate-400 hover:text-amber-400 mb-2 transition-colors"
                  >
                    {l}
                  </Link>
                ) : (
                  <span
                    key={l}
                    className="block text-xs text-slate-500 mb-2 cursor-not-allowed"
                    title="Coming soon"
                  >
                    {l}
                  </span>
                );
              })}
            </div>
          ))}
        </div>

        <div className="border-t border-[#2d4f78] pt-5 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} BookHaven. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <Link to="/" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/" className="hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
