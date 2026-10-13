import { useState } from "react";
import heroImg from "../assets/3D hero image.png";
import useProducts from "../hooks/useProducts";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";
import {
  Sparkles,
  ShoppingBag,
  ArrowRight,
  Flame,
  Truck,
  ShieldCheck,
  RotateCcw,
  Clock,
  Headphones,
  Check,
  Copy,
  Star,
  Smartphone,
  Laptop,
  Heart,
  Tag,
  Zap,
  Search,
  CheckCircle2,
  Eye,
  Loader2,
  PackageSearch,
} from "lucide-react";

export default function HomePage({ onNavigate, cart = [], onAddToCart, onRemoveFromCart }) {
  const [copiedCode, setCopiedCode] = useState(null);
  const [activeSpotlight, setActiveSpotlight] = useState(0);
  const [heroSearch, setHeroSearch] = useState("");
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [activeCatalogCategory, setActiveCatalogCategory] = useState("all");

  // Fetch live products for landing page catalog
  const {
    products: catalogProducts,
    loading: catalogLoading,
    error: catalogError,
    refetch: refetchCatalog,
  } = useProducts({
    category: activeCatalogCategory === "all" ? "" : activeCatalogCategory,
    limit: 8,
  });

  const catalogTabs = [
    { id: "all", label: "🔥 All Trending" },
    { id: "smartphones", label: "📱 Smartphones" },
    { id: "laptops", label: "💻 Laptops" },
    { id: "mobile-accessories", label: "⚡ Accessories" },
    { id: "fragrances", label: "✨ Fragrances" },
    { id: "beauty", label: "💄 Beauty" },
  ];

  const handleCopyCode = (code) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleHeroSearchSubmit = (e) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate("products");
    }
  };

  const handleCategoryClick = (catId) => {
    setActiveCatalogCategory(catId);
    const catalogEl = document.getElementById("featured-catalog");
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const heroSpotlights = [
    {
      id: 123,
      category: "smartphones",
      badge: "FLAGSHIP SMARTPHONE",
      title: "Apple iPhone 13 Pro 256GB",
      tagline: "Aerospace Titanium • Super Retina XDR",
      specs: ["A15 Bionic 5-Core GPU", "Super Retina XDR with ProMotion", "12MP Pro Camera System", "Ceramic Shield"],
      priceBDT: 131999,
      originalPriceBDT: 145000,
      discount: "9% OFF",
      rating: 4.9,
      reviews: "1.2k+ reviews",
      image: "https://cdn.dummyjson.com/product-images/smartphones/iphone-13-pro/thumbnail.webp",
      tag: "Top Flagship",
    },
    {
      id: 78,
      category: "laptops",
      badge: "PRO WORKSTATION",
      title: "Apple MacBook Pro 14 Inch Space Grey",
      tagline: "Liquid Retina XDR • 16GB Unified RAM",
      specs: ["Apple M-Series Silicon", "Liquid Retina XDR", "16GB Unified Memory", "MagSafe Fast Charging"],
      priceBDT: 239999,
      originalPriceBDT: 265000,
      discount: "10% OFF",
      rating: 5.0,
      reviews: "850+ reviews",
      image: "https://cdn.dummyjson.com/products/images/laptops/Apple%20MacBook%20Pro%2014%20Inch%20Space%20Grey/thumbnail.png",
      tag: "Pro Studio",
    },
    {
      id: 101,
      category: "mobile-accessories",
      badge: "FLAGSHIP AUDIO",
      title: "Apple AirPods Max Silver",
      tagline: "Active Noise Cancellation • Spatial Audio",
      specs: ["High-Fidelity Audio", "Active Noise Cancellation", "Transparency Mode", "20h Battery Life"],
      priceBDT: 65900,
      originalPriceBDT: 72000,
      discount: "8% OFF",
      rating: 4.9,
      reviews: "3.8k+ reviews",
      image: "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods-max-silver/thumbnail.webp",
      tag: "Signature Sound",
    },
  ];

  const currentSpotlight = heroSpotlights[activeSpotlight];

  const shopCategories = [
    {
      id: "smartphones",
      label: "Smartphones",
      subtitle: "Flagship 5G Devices",
      count: "Latest Models",
      icon: <Smartphone className="w-6 h-6 text-orange-400" />,
      accent: "from-orange-500/20 to-amber-500/10",
      borderGlow: "group-hover:border-orange-500/40",
    },
    {
      id: "laptops",
      label: "Laptops & PC",
      subtitle: "M3/M4 & RTX Rigs",
      count: "Pro Tech Gear",
      icon: <Laptop className="w-6 h-6 text-cyan-400" />,
      accent: "from-cyan-500/20 to-blue-500/10",
      borderGlow: "group-hover:border-cyan-500/40",
    },
    {
      id: "fragrances",
      label: "Fragrances",
      subtitle: "Eau De Parfum",
      count: "Luxury Scents",
      icon: <Sparkles className="w-6 h-6 text-pink-400" />,
      accent: "from-pink-500/20 to-rose-500/10",
      borderGlow: "group-hover:border-pink-500/40",
    },
    {
      id: "beauty",
      label: "Beauty & Care",
      subtitle: "Organic Skincare",
      count: "Derm-Tested",
      icon: <Heart className="w-6 h-6 text-purple-400" />,
      accent: "from-purple-500/20 to-indigo-500/10",
      borderGlow: "group-hover:border-purple-500/40",
    },
    {
      id: "furniture",
      label: "Modern Furniture",
      subtitle: "Ergonomic & Living",
      count: "Interior Designs",
      icon: <Tag className="w-6 h-6 text-amber-400" />,
      accent: "from-amber-500/20 to-yellow-500/10",
      borderGlow: "group-hover:border-amber-500/40",
    },
    {
      id: "groceries",
      label: "Groceries & Fresh",
      subtitle: "Pantry & Gourmet",
      count: "Everyday Needs",
      icon: <ShoppingBag className="w-6 h-6 text-emerald-400" />,
      accent: "from-emerald-500/20 to-teal-500/10",
      borderGlow: "group-hover:border-emerald-500/40",
    },
  ];

  const featuredDeals = [
    {
      id: "prod-1",
      title: "Essence Mascara Lash Princess",
      category: "beauty",
      brand: "Essence",
      price: 1199,
      originalPrice: 1599,
      discount: "25% OFF",
      rating: 4.9,
      image: "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png",
    },
    {
      id: "prod-2",
      title: "Eyeshadow Palette with Mirror",
      category: "beauty",
      brand: "Glamour",
      price: 2399,
      originalPrice: 2999,
      discount: "20% OFF",
      rating: 4.8,
      image: "https://cdn.dummyjson.com/products/images/beauty/Eyeshadow%20Palette%20with%20Mirror/thumbnail.png",
    },
    {
      id: "prod-3",
      title: "Powder Canister Fragrance",
      category: "fragrances",
      brand: "Aroma Luxury",
      price: 1799,
      originalPrice: 2200,
      discount: "18% OFF",
      rating: 4.7,
      image: "https://cdn.dummyjson.com/products/images/beauty/Powder%20Canister/thumbnail.png",
    },
    {
      id: "prod-4",
      title: "Red Lipstick Long Wear Matte",
      category: "beauty",
      brand: "Chic Glow",
      price: 1499,
      originalPrice: 1899,
      discount: "21% OFF",
      rating: 4.9,
      image: "https://cdn.dummyjson.com/products/images/beauty/Red%20Lipstick/thumbnail.png",
    },
  ];

  const isItemInCart = (id) => {
    if (!id) return false;
    const clean = String(id).replace(/^prod-/, "");
    return cart.some((c) => {
      const cClean = String(c.id).replace(/^prod-/, "");
      return cClean === clean || c.id === id;
    });
  };

  return (
    <div className="w-full text-slate-100 overflow-hidden bg-ambient-mesh">
      {/* ========================================================
          HERO SECTION: 3D Holographic Stage + Interactive Spotlight
         ======================================================== */}
      <section className="relative pt-8 pb-16 md:pt-16 md:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Ambient Radial Mesh Cyber Aura */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-[#df5d2c]/20 via-[#00f2fe]/15 to-[#a855f7]/10 rounded-full blur-[160px] pointer-events-none -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Interactive Spotlight & Action Triggers */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Interactive Flagship Switcher Pills */}
            <div className="inline-flex items-center gap-1.5 p-1.5 rounded-2xl bg-[#12182a]/90 border border-white/[0.1] backdrop-blur-xl shadow-xl mx-auto lg:mx-0">
              {heroSpotlights.map((item, idx) => {
                const isSelected = activeSpotlight === idx;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveSpotlight(idx)}
                    className={`px-3 sm:px-4 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? "bg-gradient-to-r from-[#b0401d] via-[#df5d2c] to-[#ff7849] text-white shadow-lg shadow-orange-950/50"
                        : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
                    }`}
                  >
                    <span>{idx === 0 ? "📱 Smartphones" : idx === 1 ? "💻 Pro Laptops" : "🎧 Audio Gear"}</span>
                  </button>
                );
              })}
            </div>

            {/* Glowing Architecture Eyebrow */}
            <div className="flex items-center justify-center lg:justify-start gap-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-orange-500/15 via-orange-500/10 to-transparent border border-orange-500/30 text-orange-400 text-xs font-semibold shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-['Outfit'] tracking-wider uppercase">OFFICIAL STORE BD • 2026 ARCHITECTURE</span>
              </div>
            </div>

            {/* Display Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-['Outfit'] tracking-tight leading-[1.06] text-white">
              Where Technology Meets{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#df5d2c] via-[#ff7849] to-[#00f2fe]">
                Pure Luxury.
              </span>
            </h1>

            {/* Sub-paragraph */}
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Discover Bangladesh&apos;s premier authentic tech &amp; lifestyle destination. 100% genuine Apple, Samsung, and pro gadgets backed by official 1-year brand warranty and rapid doorstep dispatch.
            </p>

            {/* Hero Quick Search Bar */}
            <form onSubmit={handleHeroSearchSubmit} className="relative max-w-xl mx-auto lg:mx-0 pt-1">
              <div className="relative flex items-center">
                <Search className="absolute left-4 w-4 h-4 text-orange-400 pointer-events-none" />
                <input
                  type="text"
                  value={heroSearch}
                  onChange={(e) => setHeroSearch(e.target.value)}
                  placeholder="Search 1,000+ smartphones, laptops, perfumes, gadgets..."
                  className="w-full pl-11 pr-28 py-3.5 rounded-2xl bg-[#121829]/90 border border-white/[0.12] focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-xs sm:text-sm text-white placeholder-slate-400 outline-none backdrop-blur-xl shadow-2xl transition"
                />
                <button
                  type="submit"
                  className="absolute right-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#b0401d] via-[#df5d2c] to-[#ff7849] text-white text-xs font-bold hover:opacity-95 transition shadow cursor-pointer"
                >
                  Search
                </button>
              </div>

              {/* Quick Keyword Pills */}
              <div className="flex items-center gap-2 mt-2.5 overflow-x-auto text-[11px] text-slate-400 scrollbar-none">
                <span className="shrink-0 text-slate-500 font-semibold font-['Outfit']">Trending:</span>
                <button
                  type="button"
                  onClick={() => onNavigate("products")}
                  className="hover:text-orange-400 transition cursor-pointer shrink-0 font-medium"
                >
                  📱 iPhone 15 Pro
                </button>
                <span>•</span>
                <button
                  type="button"
                  onClick={() => onNavigate("products")}
                  className="hover:text-cyan-400 transition cursor-pointer shrink-0 font-medium"
                >
                  💻 MacBook M3
                </button>
                <span>•</span>
                <button
                  type="button"
                  onClick={() => onNavigate("products")}
                  className="hover:text-pink-400 transition cursor-pointer shrink-0 font-medium"
                >
                  ✨ Dior Sauvage
                </button>
                <span>•</span>
                <button
                  type="button"
                  onClick={() => onNavigate("products")}
                  className="hover:text-emerald-400 transition cursor-pointer shrink-0 font-mono font-bold text-orange-400"
                >
                  🏷️ STORE20 (20% OFF)
                </button>
              </div>
            </form>

            {/* Dynamic Active Spotlight Action Box */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#141a2c] to-[#0e1424] border border-white/[0.1] flex flex-col sm:flex-row items-center justify-between gap-4 max-w-xl mx-auto lg:mx-0 shadow-xl relative overflow-hidden">
              <div className="text-center sm:text-left space-y-1">
                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  <span className="text-[10px] font-bold text-orange-400 uppercase tracking-wider font-mono">
                    SPOTLIGHT: {currentSpotlight.badge}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.2 rounded border border-emerald-500/20">
                    {currentSpotlight.discount}
                  </span>
                </div>
                <h4
                  onClick={() => setSelectedProductId(currentSpotlight.id)}
                  className="text-sm font-bold text-white font-['Outfit'] line-clamp-1 hover:text-orange-400 transition-colors cursor-pointer"
                  title="Click to view full specs & closure pricing"
                >
                  {currentSpotlight.title}
                </h4>
                <div className="flex items-baseline gap-2 justify-center sm:justify-start">
                  <span className="text-lg font-black text-white font-mono">
                    ৳{currentSpotlight.priceBDT.toLocaleString()}
                  </span>
                  <span className="text-xs text-slate-500 line-through font-mono">
                    ৳{currentSpotlight.originalPriceBDT.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    ({currentSpotlight.reviews})
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setSelectedProductId(currentSpotlight.id)}
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] border border-white/[0.15] text-white text-xs font-semibold hover:border-orange-500/40 transition cursor-pointer shrink-0 flex items-center justify-center gap-1.5 shadow-sm"
                  title="Quick View Specs & Closure Price"
                >
                  <Eye className="w-3.5 h-3.5 text-orange-400" />
                  <span>View Specs</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onAddToCart({
                      id: `prod-${currentSpotlight.id}`,
                      title: currentSpotlight.title,
                      price: currentSpotlight.priceBDT,
                      originalPrice: currentSpotlight.originalPriceBDT,
                      image: currentSpotlight.image,
                      directImage: heroImg,
                      category: currentSpotlight.category,
                      brand: "Apple / Flagship",
                    });
                  }}
                  className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#b0401d] via-[#df5d2c] to-[#ff7849] text-white text-xs font-bold shadow-lg shadow-orange-950/40 hover:scale-105 active:scale-95 transition cursor-pointer shrink-0 flex items-center justify-center gap-1.5"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>{isItemInCart(currentSpotlight.id) ? "In Cart ✓" : "Add to Cart"}</span>
                </button>
              </div>
            </div>

            {/* Social Proof & Customer Count Row */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <div className="flex -space-x-2">
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-[#0B0F19]"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop"
                  alt="Customer"
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-[#0B0F19]"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop"
                  alt="Customer"
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-[#0B0F19]"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&auto=format&fit=crop"
                  alt="Customer"
                />
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-600 text-[10px] font-bold text-white ring-2 ring-[#0B0F19]">
                  +50k
                </div>
              </div>

              <div className="text-xs text-slate-400 text-center sm:text-left leading-tight">
                <div className="flex items-center gap-1 text-amber-400 justify-center sm:justify-start font-bold">
                  <span>★★★★★</span>
                  <span className="text-slate-200 ml-1">4.9 / 5 Rating</span>
                </div>
                <span className="text-[11px] text-slate-400 block mt-0.5">
                  Over 50,000+ satisfied tech buyers across all 64 districts in Bangladesh.
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Holographic Gadget Stage */}
          <div className="lg:col-span-5 relative flex items-center justify-center pt-8 lg:pt-0">
            
            {/* Concentric Pulsing Light Rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
              <div className="w-[340px] sm:w-[420px] h-[340px] sm:h-[420px] rounded-full border border-orange-500/20 animate-ring-pulse" />
              <div className="absolute w-[440px] sm:w-[520px] h-[440px] sm:h-[520px] rounded-full border border-cyan-500/15 animate-ring-pulse" style={{ animationDelay: "1.5s" }} />
            </div>

            {/* Levitating Device Stage Container */}
            <div className="relative group w-full max-w-md">
              
              {/* Floating Levitating Image */}
              <div className="relative animate-float-slow transition-transform duration-500">
                <img
                  src={heroImg}
                  alt="Suffex Store Gadgets"
                  className="w-full h-auto object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.9)] filter group-hover:scale-105 transition-transform duration-500"
                />

                {/* 3D Holographic Floor Shadow / Pedestal */}
                <div className="w-3/4 h-8 mx-auto -mt-6 bg-gradient-to-r from-transparent via-[#df5d2c]/40 to-transparent blur-xl rounded-full" />
              </div>

              {/* Floating Glassmorphic Micro-HUD 1: Trust Score */}
              <div className="absolute -top-4 -left-3 sm:-left-6 px-3.5 py-2 rounded-2xl bg-[#0e1424]/90 border border-white/20 backdrop-blur-xl shadow-2xl flex items-center gap-2.5 animate-float-reverse">
                <div className="w-7 h-7 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="leading-tight">
                  <span className="text-[11px] font-extrabold text-white font-['Outfit'] block">
                    100% Genuine BD
                  </span>
                  <span className="text-[10px] text-emerald-400 font-semibold">
                    Official 1-Yr Warranty
                  </span>
                </div>
              </div>

              {/* Floating Glassmorphic Micro-HUD 2: Flash Voucher */}
              <div className="absolute top-1/3 -right-3 sm:-right-6 px-3.5 py-2 rounded-2xl bg-gradient-to-r from-[#df5d2c] to-[#ff7849] text-white shadow-2xl flex items-center gap-2.5 animate-float-slow">
                <Zap className="w-4 h-4 fill-white" />
                <div className="leading-tight text-left">
                  <span className="text-[11px] font-black font-['Outfit'] block">
                    EXTRA 20% OFF
                  </span>
                  <span className="text-[10px] text-orange-100 font-mono tracking-wider font-bold">
                    CODE: STORE20
                  </span>
                </div>
              </div>

              {/* Floating Glassmorphic Micro-HUD 3: Express Delivery Route */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-2.5 rounded-2xl bg-[#0e1424]/95 border border-white/20 backdrop-blur-xl shadow-2xl flex items-center gap-3 w-max">
                <div className="w-7 h-7 rounded-xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center animate-pulse">
                  <Truck className="w-4 h-4" />
                </div>
                <div className="leading-tight text-left">
                  <span className="text-[11px] font-bold text-white font-['Outfit'] block">
                    Express 24h Delivery
                  </span>
                  <span className="text-[10px] text-slate-400">
                    Dhanmondi Hub ➔ Your Doorstep
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* 4-Item Anti-Boring Trust Ticker Bar at Bottom of Hero */}
        <div className="mt-14 pt-8 border-t border-white/[0.08] grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
            <ShieldCheck className="w-5 h-5 text-orange-400 shrink-0" />
            <div className="text-left leading-tight">
              <span className="text-xs font-bold text-white font-['Outfit'] block">100% Authentic</span>
              <span className="text-[10px] text-slate-400">Official Brand Importers</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
            <Truck className="w-5 h-5 text-cyan-400 shrink-0" />
            <div className="text-left leading-tight">
              <span className="text-xs font-bold text-white font-['Outfit'] block">24-48h Delivery</span>
              <span className="text-[10px] text-slate-400">Across 64 Districts BD</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
            <RotateCcw className="w-5 h-5 text-emerald-400 shrink-0" />
            <div className="text-left leading-tight">
              <span className="text-xs font-bold text-white font-['Outfit'] block">7 Days Return</span>
              <span className="text-[10px] text-slate-400">Replacement Guarantee</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
            <Zap className="w-5 h-5 text-amber-400 shrink-0" />
            <div className="text-left leading-tight">
              <span className="text-xs font-bold text-white font-['Outfit'] block">bKash &amp; COD</span>
              <span className="text-[10px] text-slate-400">Instant Digital Checkout</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          CURATED CATEGORIES: Interactive Glass Grid
         ======================================================== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.06]">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-400 mb-2 uppercase tracking-wider font-['Outfit']">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Explore Departments</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit'] tracking-tight">
              Curated Collections
            </h2>
          </div>

          <button
            type="button"
            onClick={() => onNavigate("products")}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-orange-400 transition cursor-pointer"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 6 Category Tiles */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {shopCategories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className={`group relative rounded-2xl p-4 sm:p-5 bg-gradient-to-b from-[#13192c] to-[#0d1222] border border-white/[0.08] ${cat.borderGlow} hover:-translate-y-1.5 transition-all duration-300 cursor-pointer shadow-lg flex flex-col justify-between`}
            >
              <div className="w-12 h-12 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {cat.icon}
              </div>

              <div>
                <h3 className="text-sm font-bold text-white font-['Outfit'] group-hover:text-orange-400 transition-colors">
                  {cat.label}
                </h3>
                <p className="text-[11px] text-slate-400 truncate mt-0.5">
                  {cat.subtitle}
                </p>
                <span className="inline-block mt-3 text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-white/[0.05] text-slate-300">
                  {cat.count}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          FEATURED PRODUCTS CATALOG: Live API Storefront
         ======================================================== */}
      <section id="featured-catalog" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.06]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>LIVE STORE CATALOG</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit'] tracking-tight">
              Featured Trending Products
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Click any product to view real-time specs, customer reviews, and interactive JS closure pricing directly on this landing page.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigate("products")}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-orange-500/20 text-xs font-semibold text-slate-300 hover:text-orange-400 border border-white/[0.1] hover:border-orange-500/30 transition cursor-pointer self-start md:self-auto"
          >
            <span>Explore All 1,000+ Items</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          {catalogTabs.map((tab) => {
            const isActive = activeCatalogCategory === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCatalogCategory(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 border ${
                  isActive
                    ? "bg-gradient-to-r from-[#b0401d] via-[#df5d2c] to-[#ff7849] text-white border-transparent shadow-lg shadow-orange-950/40"
                    : "bg-[#121829] text-slate-400 border-white/[0.08] hover:text-white hover:border-white/[0.2]"
                }`}
              >
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Catalog Grid */}
        {catalogLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 py-8">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-80 rounded-2xl bg-[#121829]/60 border border-white/[0.05] animate-pulse p-4 flex flex-col justify-between"
              >
                <div className="w-full aspect-[4/3] bg-white/[0.04] rounded-xl" />
                <div className="space-y-2 mt-4">
                  <div className="h-4 bg-white/[0.04] rounded w-3/4" />
                  <div className="h-3 bg-white/[0.03] rounded w-1/2" />
                  <div className="h-4 bg-white/[0.05] rounded w-1/3 mt-2" />
                </div>
              </div>
            ))}
          </div>
        ) : catalogError ? (
          <div className="p-8 text-center rounded-2xl bg-[#121829] border border-red-500/20 my-6">
            <p className="text-sm text-red-400 mb-3">{catalogError}</p>
            <button
              onClick={refetchCatalog}
              className="px-4 py-2 rounded-xl bg-orange-600 text-white text-xs font-bold hover:bg-orange-500 cursor-pointer"
            >
              Retry
            </button>
          </div>
        ) : catalogProducts.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-[#121829] border border-white/[0.06] text-slate-400">
            <PackageSearch className="w-10 h-10 mx-auto text-slate-500 mb-2" />
            <p className="text-sm">No products found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {catalogProducts.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                isInCart={isItemInCart(prod.id)}
                onAddToCart={onAddToCart}
                onRemoveFromCart={onRemoveFromCart}
                onViewDetails={(p) => setSelectedProductId(p.id)}
              />
            ))}
          </div>
        )}

        {/* View full store inventory button */}
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => onNavigate("products")}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-[#12182a] hover:bg-[#161f36] border border-white/[0.1] hover:border-orange-500/40 text-xs sm:text-sm font-bold text-white shadow-xl transition-all cursor-pointer group"
          >
            <span>Browse Full Store With Filters &amp; Pagination</span>
            <ArrowRight className="w-4 h-4 text-orange-400 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* ========================================================
          FLASH DEALS SHOWCASE: Real-Time Discounts
         ======================================================== */}
      <section id="flash-deals" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.06]">
        <div className="rounded-3xl bg-gradient-to-b from-[#151c30] to-[#0e1324] border border-white/[0.1] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Header & Live Countdown Badge */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold">
                <Flame className="w-3.5 h-3.5 text-rose-400 animate-bounce" />
                <span>HOT FLASH SALE</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit'] tracking-tight">
                Limited-Time Flagship Deals
              </h2>
            </div>

            {/* Mock Countdown Clock */}
            <div className="inline-flex items-center gap-2.5 bg-black/40 px-4 py-2 rounded-2xl border border-white/10 text-xs font-mono">
              <Clock className="w-4 h-4 text-orange-400 shrink-0" />
              <span className="text-slate-400">Ends in:</span>
              <span className="text-white font-bold tracking-wider">08h : 42m : 15s</span>
            </div>
          </div>

          {/* Deal Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredDeals.map((deal) => {
              const inCart = isItemInCart(deal.id);
              return (
                <div
                  key={deal.id}
                  onClick={() => setSelectedProductId(deal.id)}
                  className="group bg-[#0e1424]/90 rounded-2xl border border-white/[0.08] hover:border-orange-500/40 p-4 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-lg cursor-pointer"
                >
                  <div className="relative aspect-square rounded-xl bg-black/30 p-3 mb-3 flex items-center justify-center overflow-hidden">
                    <span className="absolute top-2 left-2 z-10 text-[10px] font-bold text-white bg-rose-600 px-2 py-0.5 rounded-md shadow-sm">
                      {deal.discount}
                    </span>
                    <img
                      src={deal.image}
                      alt={deal.title}
                      className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                    {/* Hover Quick View Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-xs pointer-events-none">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/20 text-white text-xs font-semibold backdrop-blur-md">
                        <Eye className="w-3.5 h-3.5 text-orange-400" />
                        <span>Quick View</span>
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[11px] text-slate-400">{deal.brand}</span>
                      <div className="flex items-center gap-1 text-amber-400 font-bold text-xs">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{deal.rating}</span>
                      </div>
                    </div>

                    <h4 className="text-sm font-bold text-white line-clamp-1 font-['Outfit'] group-hover:text-orange-400 transition-colors">
                      {deal.title}
                    </h4>

                    {/* Price Row */}
                    <div className="flex items-baseline gap-2 pt-1">
                      <span className="text-base font-extrabold text-orange-400 font-mono">
                        ৳{deal.price.toLocaleString()}
                      </span>
                      <span className="text-xs text-slate-500 line-through font-mono">
                        ৳{deal.originalPrice.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProductId(deal.id);
                        }}
                        className="p-2.5 rounded-xl bg-white/[0.05] hover:bg-orange-500/20 text-slate-300 hover:text-orange-400 border border-white/[0.1] hover:border-orange-500/30 transition cursor-pointer"
                        title="Quick View Product Details & Closure Price"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (inCart) {
                            onRemoveFromCart(deal.id);
                          } else {
                            onAddToCart({
                              id: deal.id,
                              title: deal.title,
                              price: deal.price,
                              originalPrice: deal.originalPrice,
                              image: deal.image,
                              category: deal.category,
                              brand: deal.brand,
                            });
                          }
                        }}
                        className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                          inCart
                            ? "bg-emerald-600/90 text-white shadow-emerald-950/40"
                            : "bg-white/[0.08] hover:bg-gradient-to-r hover:from-[#df5d2c] hover:to-[#ff7849] text-white hover:shadow-lg"
                        }`}
                      >
                        {inCart ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>In Cart</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Add to Cart</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================
          PROMO COUPON CARDS: Copy with One Click
         ======================================================== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.06]">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold mb-2">
            <Tag className="w-3.5 h-3.5" />
            <span>SAVE MORE WITH COUPONS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit'] tracking-tight">
            Exclusive Shopper Promo Codes
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Click any voucher code below to instantly copy it and apply at checkout for maximum discount!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {/* Coupon 1: STORE20 */}
          <div className="relative rounded-2xl bg-[#141a2c] border border-orange-500/30 p-5 shadow-xl flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-orange-400 bg-orange-500/15 px-2 py-0.5 rounded-md border border-orange-500/30">
                  Most Popular
                </span>
                <h3 className="text-2xl font-black text-white font-['Outfit'] mt-2">20% DISCOUNT</h3>
                <p className="text-xs text-slate-300 mt-1">On all tech gadgets & lifestyle products (Up to ৳2,000).</p>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-dashed border-white/15 flex items-center justify-between">
              <span className="font-mono font-bold text-orange-400 text-sm tracking-wider">STORE20</span>
              <button
                type="button"
                onClick={() => handleCopyCode("STORE20")}
                className="px-3 py-1.5 rounded-xl bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 text-xs font-semibold transition cursor-pointer flex items-center gap-1.5"
              >
                {copiedCode === "STORE20" ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Coupon 2: SUFFEX500 */}
          <div className="relative rounded-2xl bg-[#141a2c] border border-cyan-500/30 p-5 shadow-xl flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/15 px-2 py-0.5 rounded-md border border-cyan-500/30">
                  Flat Bonus
                </span>
                <h3 className="text-2xl font-black text-white font-['Outfit'] mt-2">৳500 CASH OFF</h3>
                <p className="text-xs text-slate-300 mt-1">Instant ৳500 flat off on any order of ৳2,500 or more.</p>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-dashed border-white/15 flex items-center justify-between">
              <span className="font-mono font-bold text-cyan-400 text-sm tracking-wider">SUFFEX500</span>
              <button
                type="button"
                onClick={() => handleCopyCode("SUFFEX500")}
                className="px-3 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-xs font-semibold transition cursor-pointer flex items-center gap-1.5"
              >
                {copiedCode === "SUFFEX500" ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Coupon 3: TECH15 */}
          <div className="relative rounded-2xl bg-[#141a2c] border border-purple-500/30 p-5 shadow-xl flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 bg-purple-500/15 px-2 py-0.5 rounded-md border border-purple-500/30">
                  Electronics
                </span>
                <h3 className="text-2xl font-black text-white font-['Outfit'] mt-2">15% SAVINGS</h3>
                <p className="text-xs text-slate-300 mt-1">Save 15% on Laptops, Smartphones, and Tech Accessories.</p>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-dashed border-white/15 flex items-center justify-between">
              <span className="font-mono font-bold text-purple-400 text-sm tracking-wider">TECH15</span>
              <button
                type="button"
                onClick={() => handleCopyCode("TECH15")}
                className="px-3 py-1.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 text-xs font-semibold transition cursor-pointer flex items-center gap-1.5"
              >
                {copiedCode === "TECH15" ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          ANTI-BORING FEATURE PILL GRID: Trust Guarantees
         ======================================================== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.06]">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit'] tracking-tight">
            Why Hundreds of Thousands Choose Suffex
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1.5">
            Designed to guarantee 100% peace of mind on every transaction.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="group flex items-center gap-3.5 p-4 rounded-2xl bg-[#12182a] border border-white/[0.08] hover:border-orange-500/40 hover:-translate-y-1 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white font-['Outfit']">100% Authentic Products</h4>
              <p className="text-xs text-slate-400">Directly imported from official manufacturer channels.</p>
            </div>
          </div>

          <div className="group flex items-center gap-3.5 p-4 rounded-2xl bg-[#12182a] border border-white/[0.08] hover:border-cyan-500/40 hover:-translate-y-1 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white font-['Outfit']">Express 24-48h Delivery</h4>
              <p className="text-xs text-slate-400">Superfast doorstep courier across 64 districts in Bangladesh.</p>
            </div>
          </div>

          <div className="group flex items-center gap-3.5 p-4 rounded-2xl bg-[#12182a] border border-white/[0.08] hover:border-emerald-500/40 hover:-translate-y-1 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white font-['Outfit']">7 Days Easy Return</h4>
              <p className="text-xs text-slate-400">Hassle-free replacement policy if you receive a damaged unit.</p>
            </div>
          </div>

          <div className="group flex items-center gap-3.5 p-4 rounded-2xl bg-[#12182a] border border-white/[0.08] hover:border-purple-500/40 hover:-translate-y-1 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white font-['Outfit']">24/7 VIP Customer Support</h4>
              <p className="text-xs text-slate-400">Live chat, WhatsApp, and dedicated hotline assistance.</p>
            </div>
          </div>

          <div className="group flex items-center gap-3.5 p-4 rounded-2xl bg-[#12182a] border border-white/[0.08] hover:border-amber-500/40 hover:-translate-y-1 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
              <Tag className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white font-['Outfit']">Best Price Guarantee</h4>
              <p className="text-xs text-slate-400">Direct pricing with exclusive store vouchers & instant discounts.</p>
            </div>
          </div>

          <div className="group flex items-center gap-3.5 p-4 rounded-2xl bg-[#12182a] border border-white/[0.08] hover:border-rose-500/40 hover:-translate-y-1 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white font-['Outfit']">Cash on Delivery & bKash</h4>
              <p className="text-xs text-slate-400">Multiple secure payment gateways with instant digital receipts.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          BOTTOM CTA BANNER
         ======================================================== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative rounded-3xl bg-gradient-to-r from-[#b0401d] via-[#df5d2c] to-[#ff8c42] p-8 sm:p-14 shadow-2xl overflow-hidden text-center sm:text-left">
          <div className="relative z-10 max-w-2xl space-y-4">
            <h2 className="text-3xl sm:text-4xl font-black text-white font-['Outfit'] tracking-tight">
              Ready to Upgrade Your Tech & Lifestyle?
            </h2>
            <p className="text-sm text-orange-100 leading-relaxed font-normal">
              Browse our vast inventory of genuine products, take advantage of seasonal discount coupons, and enjoy fast doorstep delivery.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => onNavigate("products")}
                className="px-8 py-3.5 rounded-2xl bg-slate-950 text-white hover:bg-slate-900 text-sm font-bold shadow-xl transition-transform hover:scale-105 active:scale-95 cursor-pointer inline-flex items-center gap-2"
              >
                <span>Start Shopping Now</span>
                <ArrowRight className="w-4 h-4 text-orange-400" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick View Product Modal with JS Closure Price Calculation */}
      {selectedProductId && (
        <ProductModal
          productId={selectedProductId}
          onClose={() => setSelectedProductId(null)}
          isInCart={isItemInCart(selectedProductId)}
          onAddToCart={onAddToCart}
          onRemoveFromCart={onRemoveFromCart}
        />
      )}
    </div>
  );
}
