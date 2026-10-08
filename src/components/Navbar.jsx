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

  // Navigation menu items (clean text labels without emojis)
  const navItems = [
    { id: "home", label: "Home" },
    { id: "courses", label: "Courses", badge: "20" },
    { id: "products", label: "Products", badge: "API" },
    { id: "contact", label: "Contact" },
    { id: "form", label: "Sign Up" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#191b24]/95 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand logo */}
        <div
          onClick={() => handleNavClick("home")}
          className="flex items-center gap-3 cursor-pointer select-none group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#b0401d] to-[#df5d2c] flex items-center justify-center shadow-lg shadow-orange-950/50 group-hover:scale-105 transition-transform">
            <span className="text-white font-serif font-black text-lg">L</span>
          </div>
          <div className="leading-tight">
            <span className="text-lg font-serif font-bold text-white block">
              Learning <span className="text-[#df5d2c]">Academy</span>
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
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? "bg-gradient-to-r from-[#b0401d] to-[#df5d2c] text-white shadow font-semibold"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-black/40 text-orange-200 font-bold">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right action group: Cart button & admissions indicator */}
        <div className="flex items-center gap-3">
          {/* Cart button with sleek SVG icon & mobile floating badge */}
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
            <span>Admissions Open</span>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="p-2 rounded-xl text-gray-300 hover:text-white bg-[#212430] border border-gray-700/60 focus:outline-none cursor-pointer"
              aria-label="Toggle Menu"
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

      {/* Mobile drawer dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#161822] border-b border-gray-800 px-4 pt-2 pb-4 space-y-1.5 shadow-2xl animate-fadeIn">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`w-full px-4 py-2.5 rounded-xl text-xs font-medium transition flex items-center justify-between cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-[#b0401d] to-[#df5d2c] text-white font-semibold"
                    : "text-gray-300 bg-[#212430] hover:bg-gray-800"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-black/40 text-orange-200 font-bold">
                      {item.badge}
                    </span>
                  )}
                </span>
                {isActive && (
                  <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => {
              setIsMenuOpen(false);
              if (onOpenCart) onOpenCart();
            }}
            className="w-full px-4 py-2.5 rounded-xl text-xs font-medium transition flex items-center justify-between cursor-pointer text-gray-300 bg-[#212430] hover:bg-gray-800 border border-gray-700/60"
          >
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>Shopping Cart</span>
            </span>
            {cartCount > 0 ? (
              <span className="bg-gradient-to-r from-[#b0401d] to-[#df5d2c] text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                {cartCount} items
              </span>
            ) : (
              <span className="text-gray-500 text-[11px]">0</span>
            )}
          </button>

          <div className="pt-2 px-1 flex items-center justify-between text-[11px] text-gray-400 border-t border-gray-800">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Admissions Open 2026</span>
            </span>
            <span className="text-orange-400 font-medium">Learning Academy</span>
          </div>
        </div>
      )}  
    </header>
  );
}
