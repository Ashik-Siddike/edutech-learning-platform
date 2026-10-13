import { Home, ShoppingBag, Sparkles, PackageCheck, Headphones, ShoppingCart } from "lucide-react";

export default function BottomNav({
  activeTab,
  setActiveTab,
  cartCount = 0,
  onOpenCart,
}) {
  const navTabs = [
    { id: "home", label: "Home", icon: Home },
    { id: "products", label: "Store", icon: Sparkles, badge: "HOT" },
    { id: "orders", label: "Orders", icon: PackageCheck },
    { id: "contact", label: "Support", icon: Headphones },
  ];

  return (
    <nav
      className="md:hidden fixed bottom-3 inset-x-3 z-40 max-w-md mx-auto bg-[#070b16]/95 backdrop-blur-2xl border border-white/[0.14] rounded-2xl shadow-2xl shadow-black/90 px-2 py-1.5 flex items-center justify-around select-none"
      aria-label="Mobile Navigation"
    >
      {/* Home */}
      <button
        type="button"
        onClick={() => {
          setActiveTab("home");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className={`relative flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all duration-200 cursor-pointer ${
          activeTab === "home"
            ? "text-cyan-400 font-bold"
            : "text-slate-400 hover:text-white"
        }`}
      >
        <Home className={`w-4.5 h-4.5 transition-transform ${activeTab === "home" ? "scale-110" : ""}`} />
        <span className="text-[10px] mt-0.5 font-['Outfit']">Home</span>
        {activeTab === "home" && (
          <span className="absolute -top-1 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8]" />
        )}
      </button>

      {/* Store Products */}
      <button
        type="button"
        onClick={() => {
          setActiveTab("products");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className={`relative flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all duration-200 cursor-pointer ${
          activeTab === "products"
            ? "text-cyan-400 font-bold"
            : "text-slate-400 hover:text-white"
        }`}
      >
        <div className="relative">
          <Sparkles className={`w-4.5 h-4.5 transition-transform ${activeTab === "products" ? "scale-110" : ""}`} />
          <span className="absolute -top-1.5 -right-2 text-[8px] font-black font-mono bg-cyan-500 text-black px-1 py-0 rounded-full scale-90">
            HOT
          </span>
        </div>
        <span className="text-[10px] mt-0.5 font-['Outfit']">Store</span>
        {activeTab === "products" && (
          <span className="absolute -top-1 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8]" />
        )}
      </button>

      {/* Center Floating Cart Button */}
      <button
        type="button"
        onClick={onOpenCart}
        className="relative -mt-5 flex flex-col items-center justify-center p-2.5 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 text-white shadow-xl shadow-cyan-950/70 border border-white/20 active:scale-90 transition-transform cursor-pointer"
        aria-label="Open Shopping Cart"
      >
        <div className="relative">
          <ShoppingCart className="w-5 h-5 text-white" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2.5 min-w-4 h-4 px-1 rounded-full bg-white text-blue-700 text-[10px] font-black font-mono flex items-center justify-center shadow-md animate-pulse">
              {cartCount}
            </span>
          )}
        </div>
      </button>

      {/* Orders */}
      <button
        type="button"
        onClick={() => {
          setActiveTab("orders");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className={`relative flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all duration-200 cursor-pointer ${
          activeTab === "orders"
            ? "text-cyan-400 font-bold"
            : "text-slate-400 hover:text-white"
        }`}
      >
        <PackageCheck className={`w-4.5 h-4.5 transition-transform ${activeTab === "orders" ? "scale-110" : ""}`} />
        <span className="text-[10px] mt-0.5 font-['Outfit']">Orders</span>
        {activeTab === "orders" && (
          <span className="absolute -top-1 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8]" />
        )}
      </button>

      {/* Support */}
      <button
        type="button"
        onClick={() => {
          setActiveTab("contact");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className={`relative flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all duration-200 cursor-pointer ${
          activeTab === "contact"
            ? "text-cyan-400 font-bold"
            : "text-slate-400 hover:text-white"
        }`}
      >
        <Headphones className={`w-4.5 h-4.5 transition-transform ${activeTab === "contact" ? "scale-110" : ""}`} />
        <span className="text-[10px] mt-0.5 font-['Outfit']">Support</span>
        {activeTab === "contact" && (
          <span className="absolute -top-1 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8]" />
        )}
      </button>
    </nav>
  );
}
