// Slide-over Shopping Cart Drawer with real-time items list, price summary, promo coupon engine, and checkout
import { useState } from "react";
import { availableCoupons, validateAndCalculateCoupon } from "../data/couponsData";

export default function CartDrawer({
  isOpen,
  onClose,
  cart = [],
  onRemoveFromCart,
  onClearCart,
  onCheckout,
  onExploreCourses,
  appliedCoupon = null,
  onApplyCoupon,
  onRemoveCoupon,
}) {
  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState("");
  const [showAvailableCoupons, setShowAvailableCoupons] = useState(false);

  if (!isOpen) return null;

  // Calculate pricing breakdown
  const totalPrice = cart.reduce((sum, item) => sum + (Number(item.price) || 0), 0);
  const totalOriginal = cart.reduce(
    (sum, item) => sum + (Number(item.originalPrice) || Number(item.price) || 0),
    0
  );
  const totalSavings = totalOriginal > totalPrice ? totalOriginal - totalPrice : 0;

  // Calculate coupon discount
  let couponDiscount = 0;
  if (appliedCoupon) {
    const calc = validateAndCalculateCoupon(appliedCoupon.code, totalPrice);
    if (calc.isValid) {
      couponDiscount = calc.discount;
    }
  }

  const finalGrandTotal = Math.max(0, totalPrice - couponDiscount);

  // Handle coupon apply form submit
  const handleApplyCoupon = (e) => {
    e?.preventDefault();
    setCouponError("");

    if (!couponInput.trim()) {
      setCouponError("Please type a promo code.");
      return;
    }

    const result = validateAndCalculateCoupon(couponInput, totalPrice);
    if (result.isValid && onApplyCoupon) {
      onApplyCoupon(result.coupon);
      setCouponInput("");
      setCouponError("");
    } else {
      setCouponError(result.message);
    }
  };

  // Quick 1-click apply from available list
  const handleQuickApply = (code) => {
    const result = validateAndCalculateCoupon(code, totalPrice);
    if (result.isValid && onApplyCoupon) {
      onApplyCoupon(result.coupon);
      setCouponError("");
      setShowAvailableCoupons(false);
    } else {
      setCouponError(result.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Backdrop overlay */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Slide-over container */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-full sm:max-w-md bg-[#191b24] border-l border-gray-800 shadow-2xl flex flex-col h-full h-[100dvh]">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-gray-800 flex items-center justify-between bg-[#161822] shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-orange-950/60 text-orange-400 border border-orange-800/40 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-base font-serif font-bold text-white leading-tight">
                  Shopping Cart
                </h2>
                <p className="text-xs text-gray-400">
                  {cart.length} {cart.length === 1 ? "item" : "items"} selected
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-xl bg-gray-800/80 hover:bg-gray-700 text-gray-300 hover:text-white flex items-center justify-center border border-gray-700 transition cursor-pointer text-sm"
              aria-label="Close cart"
            >
              ✕
            </button>
          </div>

          {/* Cart items list */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4">
                <div className="w-16 h-16 rounded-2xl bg-[#212430] border border-gray-700/60 flex items-center justify-center mb-4 text-gray-400 shadow-inner">
                  <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <h3 className="text-base font-serif font-semibold text-white mb-1">
                  Your cart is empty
                </h3>
                <p className="text-xs text-gray-400 max-w-xs mb-6 leading-relaxed">
                  Explore our authentic gadgets, tech gear, and store products to add them to your cart.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    if (onExploreCourses) onExploreCourses();
                  }}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#b0401d] to-[#df5d2c] hover:opacity-95 text-white text-xs font-semibold shadow-lg transition active:scale-95 cursor-pointer"
                >
                  Browse Store Products
                </button>
              </div>
            ) : (
              cart.map((item) => {
                const discount = item.originalPrice
                  ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
                  : 0;

                const imageSrc =
                  item.directImage ||
                  (item.image && item.image.startsWith("http") && !item.image.includes("PASTE_YOUR")
                    ? item.image
                    : item.thumbnail ||
                      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=400&auto=format&fit=crop");

                return (
                  <div
                    key={item.id}
                    className="p-3.5 bg-[#212430]/90 border border-gray-800 rounded-2xl flex items-center justify-between gap-3 hover:border-gray-700 transition shadow-sm"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-14 h-14 rounded-xl bg-[#191b24] overflow-hidden shrink-0 border border-gray-700/80 relative">
                        <img
                          src={imageSrc}
                          alt={item.title}
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=400&auto=format&fit=crop";
                          }}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="min-w-0">
                        <h4 className="text-xs sm:text-sm font-semibold text-white truncate">
                          {item.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[11px] font-mono text-orange-400 font-bold">
                            ৳{Number(item.price).toLocaleString()}
                          </span>
                          {item.originalPrice && (
                            <span className="text-[10px] text-gray-500 line-through font-mono">
                              ৳{Number(item.originalPrice).toLocaleString()}
                            </span>
                          )}
                          {discount > 0 && (
                            <span className="text-[9px] font-semibold text-rose-400 bg-rose-950/60 px-1.5 py-0.2 rounded">
                              -{discount}%
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => onRemoveFromCart(item.id)}
                      className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition cursor-pointer shrink-0"
                      title="Remove from cart"
                      aria-label="Remove item"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer checkout summary & Promo coupon engine */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-gray-800 bg-[#161822] space-y-3 sm:space-y-4 shrink-0">
              {/* Promo Coupon Section */}
              <div className="space-y-2 p-3 rounded-2xl bg-[#191b24] border border-gray-800 text-xs">
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2 rounded-xl bg-emerald-950/40 border border-emerald-700/50">
                    <div className="min-w-0 pr-2">
                      <div className="flex items-center gap-1.5 text-emerald-400 font-bold font-mono">
                        <span className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center text-[10px]">
                          ✓
                        </span>
                        <span className="tracking-wide">{appliedCoupon.code}</span>
                        <span className="text-[10px] font-semibold text-emerald-300 px-1.5 py-0.2 rounded bg-emerald-900/60 border border-emerald-700/60">
                          -৳{couponDiscount.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-[10px] text-gray-400 mt-1 truncate">
                        {appliedCoupon.description}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={onRemoveCoupon}
                      className="px-2 py-1 rounded-lg bg-rose-950/60 hover:bg-rose-900/70 border border-rose-800/60 text-rose-300 text-[10px] font-semibold cursor-pointer shrink-0 transition"
                      title="Clear / Remove Coupon"
                    >
                      ✕ Clear
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        placeholder="Enter Promo Code (e.g. EDUTECH20)"
                        className="flex-1 px-3 py-1.5 rounded-xl bg-[#212430] border border-gray-700 text-xs text-white placeholder-gray-500 uppercase font-mono focus:outline-none focus:border-orange-500"
                      />
                      <button
                        type="submit"
                        className="px-3.5 py-1.5 rounded-xl bg-[#212430] hover:bg-[#2a2e3d] border border-gray-600 text-xs font-semibold text-white transition cursor-pointer"
                      >
                        Apply
                      </button>
                    </form>

                    {couponError && (
                      <p className="text-[11px] text-rose-400">{couponError}</p>
                    )}

                    {/* Quick view available promo codes toggle */}
                    <div className="pt-1">
                      <button
                        type="button"
                        onClick={() => setShowAvailableCoupons((prev) => !prev)}
                        className="text-[11px] text-orange-400 hover:text-orange-300 flex items-center gap-1 cursor-pointer"
                      >
                        <span>🎁 {showAvailableCoupons ? "Hide Available Coupons" : "View Available Coupons"}</span>
                        <span>{showAvailableCoupons ? "▲" : "▼"}</span>
                      </button>

                      {showAvailableCoupons && (
                        <div className="mt-2 space-y-1.5 max-h-36 overflow-y-auto pr-1">
                          {availableCoupons.map((c) => (
                            <div
                              key={c.code}
                              className="p-2 rounded-xl bg-[#212430] border border-gray-700 flex items-center justify-between gap-2"
                            >
                              <div className="min-w-0">
                                <div className="flex items-center gap-1.5">
                                  <span className="font-mono font-bold text-white text-[11px]">{c.code}</span>
                                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-orange-950 text-orange-300 border border-orange-800">
                                    {c.badge}
                                  </span>
                                </div>
                                <span className="text-[10px] text-gray-400 block truncate">{c.description}</span>
                              </div>

                              <button
                                type="button"
                                onClick={() => handleQuickApply(c.code)}
                                className="px-2 py-1 rounded bg-[#df5d2c] hover:bg-orange-600 text-white text-[10px] font-semibold cursor-pointer shrink-0 transition"
                              >
                                Apply
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal ({cart.length} items)</span>
                  <span className="text-gray-200">৳{totalPrice.toLocaleString()}</span>
                </div>

                {couponDiscount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>Coupon Discount</span>
                    <span>-৳{couponDiscount.toLocaleString()}</span>
                  </div>
                )}

                {totalSavings > 0 && (
                  <div className="flex justify-between text-gray-400">
                    <span>Catalog Savings</span>
                    <span className="text-emerald-400">-৳{totalSavings.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between items-baseline pt-2 border-t border-gray-700/60">
                  <span className="text-sm font-semibold text-white">Grand Total</span>
                  <span className="text-xl font-bold font-serif text-white text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300 font-mono">
                    ৳{finalGrandTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Checkout action */}
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={onCheckout}
                  className="w-full py-3.5 px-4 rounded-xl font-semibold text-xs sm:text-sm tracking-wide text-white bg-gradient-to-r from-[#b0401d] via-[#c44c25] to-[#df5d2c] hover:opacity-95 shadow-xl shadow-orange-950/40 transition active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Checkout Now</span>
                  <span className="font-mono">(৳{finalGrandTotal.toLocaleString()})</span>
                  <span>→</span>
                </button>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-2 text-[11px] text-gray-400 pt-1 text-center sm:text-left">
                  <button
                    type="button"
                    onClick={onClearCart}
                    className="hover:text-red-400 transition cursor-pointer underline text-[11px] py-0.5"
                  >
                    Clear All
                  </button>
                  <span className="text-gray-500 flex items-center justify-center gap-1 text-[11px]">
                    <svg className="w-3 h-3 text-emerald-500/80 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Instant checkout • bKash/Nagad</span>
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
