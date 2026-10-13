import { useState } from "react";
import { Sparkles, Send, ShieldCheck, Truck, Headphones, Check } from "lucide-react";

export default function Footer({ onNavigate }) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="w-full bg-[#0a0e1a] border-t border-white/[0.08] text-slate-300 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-12">
          {/* Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#b0401d] to-[#df5d2c] flex items-center justify-center shadow-lg shadow-orange-950/50">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="leading-tight">
                <span className="text-xl font-extrabold text-white font-['Outfit'] block">
                  Suffex <span className="text-[#df5d2c]">Store</span>
                </span>
                <span className="text-[11px] text-slate-400">Next-Gen Tech &amp; Lifestyle</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Discover authentic gadgets, flagship smartphones, laptops, luxury perfumes, and home lifestyle products with express nationwide delivery and 100% genuine warranty.
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-emerald-400 font-semibold text-[11px]">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Verified Official Store</span>
              </span>
              <span>•</span>
              <span className="text-[11px]">Dhaka, Bangladesh</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-['Outfit'] mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("home")}
                  className="hover:text-orange-400 transition cursor-pointer"
                >
                  Home Showcase
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("products")}
                  className="hover:text-orange-400 transition cursor-pointer flex items-center gap-1.5"
                >
                  <span>Shop Catalog</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-orange-500/20 text-orange-400 border border-orange-500/30 font-mono font-bold">API</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("orders")}
                  className="hover:text-orange-400 transition cursor-pointer"
                >
                  My Orders &amp; Tracking
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("contact")}
                  className="hover:text-orange-400 transition cursor-pointer"
                >
                  Customer Support &amp; FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Popular Categories */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-['Outfit'] mb-4">
              Top Departments
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("products")}
                  className="hover:text-orange-400 transition cursor-pointer"
                >
                  Smartphones &amp; Tech
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("products")}
                  className="hover:text-orange-400 transition cursor-pointer"
                >
                  Laptops &amp; Accessories
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("products")}
                  className="hover:text-orange-400 transition cursor-pointer"
                >
                  Fragrances &amp; Perfumes
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("products")}
                  className="hover:text-orange-400 transition cursor-pointer"
                >
                  Beauty &amp; Skincare
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("products")}
                  className="hover:text-orange-400 transition cursor-pointer"
                >
                  Modern Living &amp; Furniture
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter and support */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-['Outfit']">
              Shopper Deals &amp; Offers
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Subscribe to get instant alerts on flash sales, new flagship arrivals, and exclusive vouchers.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#12182a] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 transition"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#b0401d] via-[#df5d2c] to-[#ff7849] hover:opacity-95 text-white text-xs font-bold cursor-pointer transition shrink-0"
                >
                  Join
                </button>
              </div>
              {subscribed && (
                <p className="text-xs text-emerald-400 flex items-center gap-1 font-semibold">
                  <Check className="w-3.5 h-3.5" />
                  <span>Subscribed for VIP discounts!</span>
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom copyright and payment badges */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Suffex Store Bangladesh. All rights reserved.</p>
          <div className="flex items-center gap-3 text-[11px] text-slate-400 flex-wrap justify-center">
            <span>Verified Payments:</span>
            <span className="font-bold text-rose-400">bKash</span>
            <span>•</span>
            <span className="font-bold text-amber-400">Nagad</span>
            <span>•</span>
            <span className="font-bold text-blue-400">Visa / Mastercard</span>
            <span>•</span>
            <span className="font-bold text-emerald-400">Cash on Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
