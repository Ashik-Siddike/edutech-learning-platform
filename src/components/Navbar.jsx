import { useState } from "react";
import { ShoppingBag, Sparkles, Menu, X, Truck, Flame, ArrowRight, ShieldCheck } from "lucide-react";

export default function Navbar({
  activeTab,
  setActiveTab,
  cartCount = 0,
  onOpenCart,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (tab) => {
    setActiveTab(tab);
    setIsMenuOpen(false);
  };

  const navItems = [
    { id: "home", label: "Home", badge: null },
    { id: "products", label: "Shop Products", badge: "HOT" },
    { id: "orders", label: "My Orders", badge: null },
    { id: "contact", label: "Support & FAQ", badge: null },
  ];

  return (
    <>
      {/* Top Ambient Announcement Ticker */}
      <div className="bg-gradient-to-r from-[#040814] via-[#091124] to-[#040814] border-b border-white/[0.06] text-xs py-1.5 px-4 text-slate-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 font-semibold text-[10px]">
              <Flame className="w-3 h-3 text-cyan-400 animate-pulse" />
              <span>LIMITED PROMO</span>
            </span>
            <span className="text-slate-300 text-[11px] hidden sm:inline">
              Apply coupon <strong className="text-cyan-400 font-mono font-bold tracking-wider">STORE20</strong> for 20% OFF on all flagship tech &amp; authentic gear!
            </span>
            <span className="text-slate-300 text-[11px] sm:hidden">
              Code <strong className="text-cyan-400 font-mono">STORE20</strong> for 20% OFF!
            </span>
          </div>

          <div className="hidden md:flex items-center gap-4 text-[11px] text-slate-400 shrink-0">
            <div className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-cyan-400" />
              <span>Express Dispatch BD</span>
            </div>
            <span className="w-1 h-1 rounded-full bg-slate-700" />
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>100% Genuine Guaranteed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Glassmorphic Sticky Header */}
      <header className="sticky top-0 z-40 w-full bg-[#030712]/90 backdrop-blur-2xl border-b border-white/[0.08] shadow-2xl shadow-black/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
          
          {/* Brand Logo with Ambient Glow */}
          <div
            onClick={() => handleNavClick("home")}
            className="flex items-center gap-3 cursor-pointer select-none group"
          >
            <div className="relative">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 opacity-50 blur-sm group-hover:opacity-90 transition duration-300" />
              <div className="relative w-10 h-10 rounded-xl bg-[#090e1c] border border-cyan-500/30 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                <Sparkles className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>

            <div className="leading-tight">
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-tight text-white font-['Outfit']">
                  Suffex
                </span>
                <span className="text-xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 font-['Outfit']">
                  Store
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-medium tracking-widest uppercase block -mt-0.5">
                Next-Gen Commerce
              </span>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1.5 bg-[#0a0f1d]/90 p-1.5 rounded-2xl border border-white/[0.08] shadow-inner">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? "bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white shadow-lg shadow-cyan-950/50"
                      : "text-slate-400 hover:text-white hover:bg-white/[0.05]"
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-md ${
                      isActive 
                        ? "bg-black/30 text-white" 
                        : "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30"
                    }`}>
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-0.5 rounded-full bg-cyan-300 shadow-sm" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Group */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Quick Explore Products button on desktop if not on products tab */}
            {activeTab !== "products" && (
              <button
                type="button"
                onClick={() => handleNavClick("products")}
                className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/[0.08] hover:border-cyan-500/30 transition cursor-pointer"
              >
                <span>Browse Catalog</span>
                <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
              </button>
            )}

            {/* Premium Shopping Cart Button */}
            <button
              type="button"
              onClick={onOpenCart}
              className="relative group p-2.5 sm:px-4 sm:py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-b from-[#0d1424] to-[#070c18] hover:from-[#11192e] hover:to-[#091020] border border-white/[0.12] hover:border-cyan-500/40 text-slate-100 transition-all duration-200 cursor-pointer flex items-center gap-2 shadow-lg shadow-black/40 active:scale-95"
              aria-label="Open shopping cart"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform duration-200" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                )}
              </div>
              <span className="hidden sm:inline font-['Outfit'] font-bold tracking-wide">Cart</span>
              <span className={`px-2 py-0.5 rounded-lg text-[11px] font-mono font-bold transition-colors ${
                cartCount > 0
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-sm"
                  : "bg-white/[0.06] text-slate-400"
              }`}>
                {cartCount}
              </span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="md:hidden p-2.5 rounded-xl bg-[#0a0f1d] text-slate-300 hover:text-white border border-white/[0.1] hover:border-cyan-500/30 transition cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Drawer Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#070b16]/95 backdrop-blur-2xl border-b border-white/[0.08] px-4 pt-3 pb-5 space-y-2 animate-fadeIn shadow-2xl">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center justify-between ${
                    isActive
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg"
                      : "text-slate-300 hover:bg-white/[0.05] hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <ArrowRight className="w-4 h-4 opacity-60" />
                </button>
              );
            })}
          </div>
        )}
      </header>
    </>
  );
}
