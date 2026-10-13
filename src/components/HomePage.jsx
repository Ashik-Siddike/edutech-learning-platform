// High-impact E-Commerce Home Page with hero gadgets, categories grid, deals, and trust badges
import heroImg from "../assets/3D hero image.png";

export default function HomePage({ onNavigate, onAddToCart }) {
  const shopCategories = [
    {
      id: "smartphones",
      label: "Smartphones",
      count: "Latest Flagships",
      icon: (
        <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      gradient: "from-orange-950/40 to-amber-950/20",
    },
    {
      id: "laptops",
      label: "Laptops & PC",
      count: "Pro Tech Gear",
      icon: (
        <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      gradient: "from-cyan-950/40 to-blue-950/20",
    },
    {
      id: "fragrances",
      label: "Fragrances",
      count: "Luxury Perfumes",
      icon: (
        <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      gradient: "from-pink-950/40 to-rose-950/20",
    },
    {
      id: "beauty",
      label: "Beauty & Care",
      count: "Skincare & Cosmetics",
      icon: (
        <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      gradient: "from-purple-950/40 to-indigo-950/20",
    },
    {
      id: "furniture",
      label: "Modern Furniture",
      count: "Home & Office",
      icon: (
        <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      gradient: "from-amber-950/40 to-yellow-950/20",
    },
    {
      id: "groceries",
      label: "Groceries & Fresh",
      count: "Pantry Essentials",
      icon: (
        <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      gradient: "from-emerald-950/40 to-teal-950/20",
    },
  ];

  const featuredDeals = [
    {
      id: "prod-1",
      title: "Essence Mascara Lash Princess",
      category: "beauty",
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
      price: 2399,
      originalPrice: 2999,
      discount: "20% OFF",
      rating: 4.8,
      image: "https://cdn.dummyjson.com/products/images/beauty/Eyeshadow%20Palette%20with%20Mirror/thumbnail.png",
    },
    {
      id: "prod-3",
      title: "Powder Canister Fragrance",
      category: "beauty",
      price: 1799,
      originalPrice: 2200,
      discount: "18% OFF",
      rating: 4.7,
      image: "https://cdn.dummyjson.com/products/images/beauty/Powder%20Canister/thumbnail.png",
    },
    {
      id: "prod-4",
      title: "Red Lipstick Matte Velvet",
      category: "beauty",
      price: 1550,
      originalPrice: 1999,
      discount: "22% OFF",
      rating: 4.6,
      image: "https://cdn.dummyjson.com/products/images/beauty/Red%20Lipstick/thumbnail.png",
    },
  ];

  return (
    <div className="space-y-16 pb-16 font-sans">
      {/* 1. Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-12 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Heading, Slogan & Actions */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-950/60 border border-orange-700/50 text-orange-400 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Next-Gen E-Commerce Experience</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black text-white tracking-tight leading-tight sm:leading-none">
                Upgrade Your Life With{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#df5d2c] via-[#f77e48] to-[#f99e74]">
                  Premium Gadgets
                </span>{" "}
                &amp; Daily Essentials.
              </h1>

              <p className="text-gray-300 text-xs sm:text-sm sm:leading-relaxed max-w-xl mx-auto lg:mx-0">
                Shop genuine tech, smartphones, laptops, fragrances, and lifestyle products with instant bKash/Nagad checkout, 100% authenticity guarantee, and nationwide delivery.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate("products")}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-[#b0401d] via-[#c44c25] to-[#df5d2c] text-white font-semibold text-xs sm:text-sm shadow-xl shadow-orange-950/60 hover:opacity-95 transition active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Explore All Products</span>
                  <span>→</span>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate("orders")}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[#212430] hover:bg-[#2a2e3d] text-gray-200 border border-gray-700 text-xs sm:text-sm font-semibold transition cursor-pointer flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <span>Track My Orders</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 grid grid-cols-3 gap-3 border-t border-gray-800/80 text-left">
                <div>
                  <span className="text-xl sm:text-2xl font-bold font-mono text-white block">10,000+</span>
                  <span className="text-[11px] text-gray-400">Authentic Items</span>
                </div>
                <div>
                  <span className="text-xl sm:text-2xl font-bold font-mono text-orange-400 block">4.9 ★</span>
                  <span className="text-[11px] text-gray-400">Customer Rating</span>
                </div>
                <div>
                  <span className="text-xl sm:text-2xl font-bold font-mono text-emerald-400 block">2-3 Days</span>
                  <span className="text-[11px] text-gray-400">Fast Nationwide BD</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Showcase */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="relative w-full max-w-md aspect-square rounded-3xl bg-gradient-to-tr from-[#191b24] to-[#212430] border border-gray-800 p-4 shadow-2xl flex items-center justify-center overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-b from-orange-500/10 to-transparent pointer-events-none" />
                <img
                  src={heroImg}
                  alt="Suffex E-Commerce Store Hero"
                  className="w-full h-full object-contain filter drop-shadow-2xl group-hover:scale-105 transition duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Top Categories Showcase */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
          <div>
            <span className="text-xs text-orange-400 uppercase tracking-widest font-semibold block">
              Curated Collections
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-white mt-1">
              Popular Product Categories
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate("products")}
            className="text-xs text-orange-400 hover:text-orange-300 font-semibold flex items-center gap-1 cursor-pointer transition"
          >
            <span>View All Categories</span>
            <span>→</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {shopCategories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onNavigate("products")}
              className={`p-4 rounded-2xl bg-gradient-to-b ${cat.gradient} bg-[#191b24] border border-gray-800 hover:border-gray-700 transition cursor-pointer text-center group flex flex-col items-center justify-center space-y-2.5 shadow-md hover:scale-[1.02]`}
            >
              <div className="w-12 h-12 rounded-xl bg-[#212430] border border-gray-700 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
                {cat.icon}
              </div>
              <div>
                <h3 className="font-semibold text-xs sm:text-sm text-white group-hover:text-orange-400 transition">
                  {cat.label}
                </h3>
                <span className="text-[10px] text-gray-400 block mt-0.5">
                  {cat.count}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Flash Deals & Trending Items */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-[#191b24] rounded-3xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-rose-950/70 text-rose-300 border border-rose-800">
                  🔥 Flash Deals
                </span>
                <span className="text-xs text-gray-400 font-mono">Limited Quantities</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-white mt-1">
                Trending Deals of the Week
              </h2>
            </div>

            <button
              type="button"
              onClick={() => onNavigate("products")}
              className="px-4 py-2 rounded-xl bg-[#212430] hover:bg-[#2a2e3d] text-gray-200 border border-gray-700 text-xs font-semibold cursor-pointer transition"
            >
              See All Deals →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredDeals.map((item) => (
              <div
                key={item.id}
                className="bg-[#212430]/80 rounded-2xl border border-gray-800/80 p-4 space-y-3 flex flex-col justify-between hover:border-gray-700 transition shadow"
              >
                <div>
                  <div className="relative aspect-square rounded-xl bg-[#14161f] p-3 flex items-center justify-center overflow-hidden border border-gray-800 mb-3">
                    <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-rose-950/80 border border-rose-800 text-rose-300 text-[10px] font-mono font-bold">
                      {item.discount}
                    </span>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <span className="text-[10px] font-semibold text-orange-400 uppercase tracking-wide">
                    {item.category}
                  </span>
                  <h4 className="font-semibold text-xs sm:text-sm text-white line-clamp-1 mt-0.5">
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-1 text-[11px] text-amber-400 mt-1">
                    <span>★ {item.rating}</span>
                    <span className="text-gray-500">• Verified</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-800/80 flex items-center justify-between">
                  <div>
                    <span className="text-sm font-bold font-mono text-white block">
                      ৳{item.price.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-gray-500 line-through font-mono">
                      ৳{item.originalPrice.toLocaleString()}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (onAddToCart) {
                        onAddToCart({
                          id: item.id,
                          title: item.title,
                          price: item.price,
                          originalPrice: item.originalPrice,
                          image: item.image,
                          category: item.category,
                        });
                      }
                    }}
                    className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#b0401d] to-[#df5d2c] hover:opacity-95 text-white text-xs font-semibold cursor-pointer transition shadow"
                  >
                    Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Promo Coupons Showcase Banner */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-3xl bg-gradient-to-r from-orange-950/40 via-[#212430] to-orange-950/30 border border-orange-800/40 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-1.5 text-center md:text-left">
            <span className="text-xs text-orange-400 font-mono font-bold uppercase">
              Exclusive Shopper Promos
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
              Save Up To ৳2,000 On Your Order Today!
            </h3>
            <p className="text-xs text-gray-300 max-w-md">
              Use code <strong className="text-orange-400 font-mono">STORE20</strong> for 20% off or <strong className="text-orange-400 font-mono">SUFFEX500</strong> for flat ৳500 off on checkout!
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate("products")}
              className="px-6 py-3 rounded-2xl bg-[#df5d2c] hover:bg-orange-600 text-white text-xs sm:text-sm font-semibold transition cursor-pointer shadow-lg active:scale-95"
            >
              Shop &amp; Apply Coupon →
            </button>
          </div>
        </div>
      </section>

      {/* 5. Trust Badges & Guarantee */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-[#191b24] border border-gray-800 flex items-start gap-3.5 shadow-md">
            <div className="w-10 h-10 rounded-xl bg-orange-950/60 text-orange-400 border border-orange-800/40 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase">Free Express Shipping</h4>
              <p className="text-[11px] text-gray-400 mt-0.5">On all orders over ৳2,000 nationwide.</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#191b24] border border-gray-800 flex items-start gap-3.5 shadow-md">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/60 text-emerald-400 border border-emerald-800/40 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase">100% Genuine Items</h4>
              <p className="text-[11px] text-gray-400 mt-0.5">Authentic products directly from verified brands.</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#191b24] border border-gray-800 flex items-start gap-3.5 shadow-md">
            <div className="w-10 h-10 rounded-xl bg-blue-950/60 text-blue-400 border border-blue-800/40 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase">7-Day Easy Return</h4>
              <p className="text-[11px] text-gray-400 mt-0.5">Hassle-free money-back guarantee if unsatisfied.</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#191b24] border border-gray-800 flex items-start gap-3.5 shadow-md">
            <div className="w-10 h-10 rounded-xl bg-purple-950/60 text-purple-400 border border-purple-800/40 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase">bKash &amp; Nagad Pay</h4>
              <p className="text-[11px] text-gray-400 mt-0.5">Safe mobile banking, cards &amp; cash on delivery.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
