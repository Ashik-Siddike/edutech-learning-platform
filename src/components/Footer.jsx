// Comprehensive footer component with navigation, contact info, and newsletter subscription
import { useState } from "react";

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
    <footer className="w-full bg-[#161822] border-t border-gray-800 text-gray-300 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-12">
          {/* Brand and bio */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#b0401d] to-[#df5d2c] flex items-center justify-center shadow-lg shadow-orange-950/50">
                <span className="text-white font-serif font-black text-xl">S</span>
              </div>
              <div className="leading-tight">
                <span className="text-xl font-serif font-bold text-white block">
                  Suffex <span className="text-[#df5d2c]">Store</span>
                </span>
                <span className="text-[11px] text-gray-400">Authentic Gadgets &amp; Lifestyle</span>
              </div>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              Discover authentic gadgets, electronics, perfumes, and lifestyle products with nationwide express delivery, 100% genuine guarantee, and instant bKash/Nagad checkout.
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs text-gray-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Verified Brand Store</span>
              </span>
              <span>•</span>
              <span>Dhaka, Bangladesh</span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-serif font-bold text-white uppercase tracking-wider mb-4">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("home")}
                  className="hover:text-orange-400 transition cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("products")}
                  className="hover:text-orange-400 transition cursor-pointer flex items-center gap-1.5"
                >
                  <span>Shop Products</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-orange-950/80 text-orange-400 border border-orange-800/40">API</span>
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
                  Support &amp; Help Desk
                </button>
              </li>
            </ul>
          </div>

          {/* Popular Categories */}
          <div>
            <h4 className="text-xs font-serif font-bold text-white uppercase tracking-wider mb-4">
              Categories
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
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
                  Modern Furniture
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter and support */}
          <div className="space-y-4">
            <h4 className="text-xs font-serif font-bold text-white uppercase tracking-wider">
              Shopper Deals &amp; Offers
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Subscribe to get instant alerts on flash sales, new gadget arrivals, and promo coupons.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-3 py-2 rounded-xl bg-[#212430] border border-gray-700 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#b0401d] to-[#df5d2c] hover:opacity-95 text-white text-xs font-semibold cursor-pointer transition shrink-0"
                >
                  Join
                </button>
              </div>
              {subscribed && (
                <p className="text-xs text-emerald-400 flex items-center gap-1">
                  <span>✓</span> Subscribed for VIP discounts!
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom copyright and payment badges */}
        <div className="pt-8 border-t border-gray-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Suffex Store Bangladesh. All rights reserved.</p>
          <div className="flex items-center gap-3 text-[11px] text-gray-400">
            <span>Payment Methods:</span>
            <span className="font-semibold text-rose-400">bKash</span>
            <span>•</span>
            <span className="font-semibold text-amber-400">Nagad</span>
            <span>•</span>
            <span className="font-semibold text-blue-400">Visa / Mastercard</span>
            <span>•</span>
            <span className="font-semibold text-emerald-400">COD</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
