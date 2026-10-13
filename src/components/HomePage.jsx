import { useState } from "react";
import heroImg from "../assets/3D hero image.png";
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
} from "lucide-react";

export default function HomePage({ onNavigate, cart = [], onAddToCart, onRemoveFromCart }) {
  const [copiedCode, setCopiedCode] = useState(null);

  const handleCopyCode = (code) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

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

  const isItemInCart = (id) => cart.some((c) => c.id === id);

  return (
    <div className="w-full text-slate-100 overflow-hidden bg-ambient-mesh">
      {/* ========================================================
          HERO SECTION: 3D Visual Stage + High-Impact Typography
         ======================================================== */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Ambient Radial Mesh Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-orange-500/15 to-cyan-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines & Action Trigger */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Glowing Eyebrow Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-orange-500/15 via-orange-500/10 to-transparent border border-orange-500/30 text-orange-400 text-xs font-semibold shadow-sm">
              <span className="w-2 h-2 rounded-full bg-orange-400 animate-ping" />
              <span className="font-['Outfit'] tracking-wider uppercase">OFFICIAL STORE BD • 2026 ED</span>
            </div>

            {/* Display Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-['Outfit'] tracking-tight leading-[1.08] text-white">
              Next-Gen Tech &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#df5d2c] via-[#ff7849] to-[#00f2fe]">
                Modern Lifestyle
              </span>{" "}
              Delivered Faster.
            </h1>

            {/* Sub-paragraph */}
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Experience the future of online shopping in Bangladesh. Curated authentic gadgets, flagship smartphones, laptops, and luxury essentials backed by official warranty and instant doorstep delivery.
            </p>

            {/* CTAs Group */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                type="button"
                onClick={() => onNavigate("products")}
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-[#b0401d] via-[#df5d2c] to-[#ff7849] text-white text-sm font-bold shadow-xl shadow-orange-950/50 hover:shadow-orange-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer flex items-center justify-center gap-2.5 group"
              >
                <span>Explore Store Catalog</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById("flash-deals");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[#141b2d] hover:bg-[#1a233a] border border-white/10 hover:border-white/20 text-slate-200 text-sm font-semibold transition cursor-pointer flex items-center justify-center gap-2 shadow-md"
              >
                <Flame className="w-4 h-4 text-orange-400" />
                <span>Today's Flash Deals</span>
              </button>
            </div>

            {/* Anti-Boring KPI Metric Pills */}
            <div className="pt-6 grid grid-cols-3 gap-3 sm:gap-4 max-w-lg mx-auto lg:mx-0">
              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-center">
                <span className="block text-lg sm:text-xl font-extrabold text-white font-['Outfit']">100%</span>
                <span className="text-[11px] text-slate-400 font-medium">Genuine Brand</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-center">
                <span className="block text-lg sm:text-xl font-extrabold text-orange-400 font-['Outfit']">24 Hours</span>
                <span className="text-[11px] text-slate-400 font-medium">Fast Dispatch</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-center">
                <span className="block text-lg sm:text-xl font-extrabold text-cyan-400 font-['Outfit']">4.9 / 5</span>
                <span className="text-[11px] text-slate-400 font-medium">TrustScore</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Hero Gadget Stage */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Ambient Lighting Ring */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#df5d2c]/20 via-transparent to-[#00f2fe]/20 rounded-3xl blur-2xl -z-10" />

            <div className="relative group w-full max-w-md">
              <div className="relative rounded-3xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-4 sm:p-6 border border-white/[0.12] shadow-2xl backdrop-blur-xl overflow-hidden">
                <img
                  src={heroImg}
                  alt="Suffex Store Gadgets"
                  className="w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] group-hover:scale-105 transition-transform duration-500"
                />

                {/* Floating Micro Badge 1 */}
                <div className="absolute top-4 left-4 sm:top-6 sm:left-6 px-3 py-1.5 rounded-xl bg-[#0e1424]/90 border border-white/15 backdrop-blur-md shadow-xl flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[11px] font-bold text-white font-['Outfit']">Verified Flagship</span>
                </div>

                {/* Floating Micro Badge 2 */}
                <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 px-3.5 py-2 rounded-2xl bg-gradient-to-r from-[#df5d2c] to-[#ff7849] text-white shadow-xl flex items-center gap-2 font-['Outfit'] font-bold text-xs">
                  <Zap className="w-4 h-4 fill-white" />
                  <span>Extra 20% Off Code</span>
                </div>
              </div>
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
              onClick={() => onNavigate("products")}
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
                  className="group bg-[#0e1424]/90 rounded-2xl border border-white/[0.08] hover:border-orange-500/40 p-4 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-lg"
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
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[11px] text-slate-400">{deal.brand}</span>
                      <div className="flex items-center gap-1 text-amber-400 font-bold text-xs">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{deal.rating}</span>
                      </div>
                    </div>

                    <h4 className="text-sm font-bold text-white line-clamp-1 font-['Outfit']">
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

                    <button
                      type="button"
                      onClick={() => {
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
                      className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-2 ${
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
    </div>
  );
}
