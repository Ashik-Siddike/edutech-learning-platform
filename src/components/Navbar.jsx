import { useState } from "react";

export default function Navbar({
  activeTab,
  setActiveTab,
  cartCount = 0,
  onOpenCart,
}) {
  // Mobile drawer collapse state
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Switch active tab and close mobile menu
  const handleNavClick = (tab) => {
    setActiveTab(tab);
    setIsMenuOpen(false);
  };

  // E-Commerce Navigation menu items
  const navItems = [
    { id: "home", label: "Home" },
    { id: "products", label: "Shop Products" },
    { id: "orders", label: "My Orders" },
    { id: "contact", label: "Support & Contact" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#191b24]/95 backdrop-blur-md border-b border-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand logo */}
        <div
          onClick={() => handleNavClick("home")}
          className="flex items-center gap-3 cursor-pointer select-none group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#b0401d] to-[#df5d2c] flex items-center justify-center shadow-lg shadow-orange-950/50 group-hover:scale-105 transition-transform">
            <span className="text-white font-serif font-black text-lg">S</span>
          </div>
          <div className="leading-tight">
            <span className="text-lg font-serif font-bold text-white block">
              Suffex <span className="text-[#df5d2c]">Store</span>
            </span>
          </div>
        </div>

        {/* Center navigation tabs (desktop) */}
        <nav className="hidden md:flex items-center gap-1.5 bg-[#212430] p-1 rounded-xl border border-gray-700/60">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? "bg-gradient-to-r from-[#b0401d] to-[#df5d2c] text-white shadow font-semibold"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right action group: Cart button & fast delivery indicator */}
        <div className="flex items-center gap-3">
          {/* Cart button with sleek SVG icon & floating badge */}
          <button
            type="button"
            onClick={onOpenCart}
            className="relative p-2 sm:px-3.5 sm:py-1.5 rounded-xl text-xs font-medium bg-[#212430] hover:bg-gray-800 border border-gray-700/70 text-gray-200 hover:text-white transition cursor-pointer flex items-center gap-1.5 sm:gap-2 shadow-sm active:scale-95"
            aria-label="Open shopping cart"
          >
            <svg className="w-5 h-5 sm:w-4 sm:h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="hidden sm:inline">Cart</span>
            {cartCount > 0 ? (
              <span className="absolute -top-1.5 -right-1.5 sm:static sm:top-auto sm:right-auto bg-gradient-to-r from-[#b0401d] to-[#df5d2c] text-white text-[10px] sm:text-[11px] font-bold w-5 h-5 sm:w-auto sm:h-auto sm:px-1.5 sm:py-0.5 rounded-full flex items-center justify-center leading-none shadow">
                {cartCount}
              </span>
            ) : (
              <span className="hidden sm:inline text-gray-400 text-[11px]">(0)</span>
            )}
          </button>

          <div className="hidden xl:flex items-center gap-2 text-xs text-gray-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Fast Shipping BD</span>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="p-2 rounded-xl bg-[#212430] text-gray-400 hover:text-white border border-gray-700/60 focus:outline-none transition cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#161822] border-b border-gray-800 px-4 pt-3 pb-4 space-y-2 animate-fadeIn">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium transition cursor-pointer flex items-center justify-between ${
                  isActive
                    ? "bg-gradient-to-r from-[#b0401d] to-[#df5d2c] text-white font-semibold shadow"
                    : "text-gray-300 hover:bg-[#212430] hover:text-white"
                }`}
              >
                <span>{item.label}</span>
                <span className="text-gray-500 text-xs">→</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
