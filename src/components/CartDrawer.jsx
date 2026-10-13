import { useState } from "react";
import { availableCoupons, validateAndCalculateCoupon } from "../data/couponsData";
import {
  ShoppingBag,
  X,
  Trash2,
  Tag,
  Check,
  Truck,
  ArrowRight,
  Sparkles,
  Percent,
} from "lucide-react";

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

  const freeShippingThreshold = 2500;
  const freeShippingProgress = Math.min(100, (totalPrice / freeShippingThreshold) * 100);
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - totalPrice);

  const finalGrandTotal = Math.max(0, totalPrice - couponDiscount);

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
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Slide-over container */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-full sm:max-w-md bg-[#0e1424] border-l border-white/[0.1] shadow-2xl flex flex-col h-full h-[100dvh]">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-white/[0.08] flex items-center justify-between bg-[#111728] shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-orange-500/15 text-orange-400 border border-orange-500/30 flex items-center justify-center shrink-0">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-extrabold text-white font-['Outfit'] leading-tight">
                  Shopping Cart
                </h2>
                <p className="text-xs text-slate-400">
                  {cart.length} {cart.length === 1 ? "item" : "items"} selected
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-slate-300 hover:text-white flex items-center justify-center border border-white/10 transition cursor-pointer text-sm"
              aria-label="Close cart"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          {cart.length > 0 && (
            <div className="px-5 py-3 bg-[#131a2e] border-b border-white/[0.06] text-xs">
              <div className="flex items-center justify-between mb-1.5 font-medium">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <Truck className="w-3.5 h-3.5 text-orange-400" />
                  {amountNeededForFreeShipping === 0 ? (
                    <span className="text-emerald-400 font-bold">🎉 FREE Express Delivery Unlocked!</span>
                  ) : (
                    <span>Add <strong className="text-orange-400 font-mono">৳{amountNeededForFreeShipping.toLocaleString()}</strong> for Free Delivery</span>
                  )}
                </span>
                <span className="text-[11px] font-mono text-slate-400 font-semibold">{Math.round(freeShippingProgress)}%</span>
              </div>
              <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#df5d2c] to-[#00f2fe] rounded-full transition-all duration-300"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Cart items list */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4">
                <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center mb-4 text-slate-400 shadow-inner">
                  <ShoppingBag className="w-8 h-8 text-orange-400/60" />
                </div>
                <h3 className="text-base font-bold text-white font-['Outfit'] mb-1">
                  Your cart is empty
                </h3>
                <p className="text-xs text-slate-400 max-w-xs mb-6 leading-relaxed">
                  Discover genuine flagship gadgets, tech accessories, and lifestyle essentials to add them to your cart.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    if (onExploreCourses) onExploreCourses();
                  }}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#b0401d] via-[#df5d2c] to-[#ff7849] hover:opacity-95 text-white text-xs font-bold shadow-lg transition active:scale-95 cursor-pointer flex items-center gap-2"
                >
                  <span>Browse Store Catalog</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              cart.map((item) => {
                const itemImg =
                  item.directImage ||
                  item.image ||
                  item.thumbnail ||
                  "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=400&auto=format&fit=crop";

                return (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-2xl bg-[#13192c] border border-white/[0.08] hover:border-orange-500/30 flex gap-3.5 transition-all shadow-sm"
                  >
                    {/* Item Thumbnail */}
                    <div className="w-16 h-16 rounded-xl bg-[#090d18] border border-white/10 flex items-center justify-center overflow-hidden shrink-0 p-1">
                      <img
                        src={itemImg}
                        alt={item.title}
                        className="max-h-full max-w-full object-contain"
                        onError={(e) => {
                          e.target.src =
                            "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=400&auto=format&fit=crop";
                        }}
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-xs font-bold text-white line-clamp-1 font-['Outfit']">
                            {item.title}
                          </h4>
                          <button
                            type="button"
                            onClick={() => onRemoveFromCart(item.id)}
                            className="text-slate-500 hover:text-rose-400 transition cursor-pointer p-0.5"
                            title="Remove from cart"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <span className="text-[10px] text-slate-400 capitalize block mt-0.5">
                          {item.category || "Official Brand"}
                        </span>
                      </div>

                      <div className="flex items-baseline justify-between pt-1">
                        <span className="text-xs font-extrabold text-orange-400 font-mono">
                          ৳{Number(item.price || 0).toLocaleString()}
                        </span>
                        {item.originalPrice && Number(item.originalPrice) > Number(item.price) && (
                          <span className="text-[10px] text-slate-500 line-through font-mono">
                            ৳{Number(item.originalPrice).toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer & Checkout Area */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-white/[0.08] bg-[#111728] space-y-4 shrink-0 shadow-2xl">
              {/* Promo Coupon Module */}
              <div className="space-y-2">
                {appliedCoupon ? (
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Percent className="w-4 h-4 text-emerald-400 shrink-0" />
                      <div>
                        <span className="text-xs font-bold font-mono text-emerald-400 tracking-wider">
                          {appliedCoupon.code}
                        </span>
                        <span className="text-[10px] text-slate-300 block">
                          Voucher Applied (-৳{couponDiscount.toLocaleString()})
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={onRemoveCoupon}
                      className="text-[11px] font-semibold text-rose-400 hover:text-rose-300 transition cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                        placeholder="Promo code (e.g. STORE20)"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d18] border border-white/10 focus:border-orange-500 text-xs text-white placeholder-slate-500 uppercase font-mono tracking-wider outline-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2.5 rounded-xl bg-white/[0.08] hover:bg-orange-600 text-white text-xs font-bold transition cursor-pointer shrink-0"
                    >
                      Apply
                    </button>
                  </form>
                )}

                {couponError && (
                  <p className="text-[11px] text-rose-400 pl-1">{couponError}</p>
                )}

                {/* Quick Toggle Available Vouchers */}
                {!appliedCoupon && (
                  <div>
                    <button
                      type="button"
                      onClick={() => setShowAvailableCoupons((prev) => !prev)}
                      className="text-[11px] text-orange-400 hover:text-orange-300 font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>{showAvailableCoupons ? "Hide available vouchers" : "View available vouchers"}</span>
                    </button>

                    {showAvailableCoupons && (
                      <div className="mt-2 space-y-1.5 max-h-36 overflow-y-auto p-1 bg-black/20 rounded-xl">
                        {availableCoupons.map((c) => (
                          <div
                            key={c.code}
                            className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-between text-xs"
                          >
                            <div>
                              <span className="font-mono font-bold text-orange-400 text-[11px]">{c.code}</span>
                              <span className="text-[10px] text-slate-400 block line-clamp-1">{c.description}</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleQuickApply(c.code)}
                              className="px-2.5 py-1 rounded-md bg-orange-500/20 text-orange-300 text-[10px] font-bold hover:bg-orange-500/30 transition cursor-pointer"
                            >
                              Apply
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 pt-2 border-t border-white/[0.08] text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span className="font-mono text-white">৳{totalPrice.toLocaleString()}</span>
                </div>

                {couponDiscount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Coupon Savings</span>
                    <span className="font-mono">-৳{couponDiscount.toLocaleString()}</span>
                  </div>
                )}

                {totalSavings > 0 && !couponDiscount && (
                  <div className="flex justify-between text-slate-400">
                    <span>Direct Store Savings</span>
                    <span className="font-mono text-emerald-400">-৳{totalSavings.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between items-baseline pt-2 border-t border-white/[0.08]">
                  <span className="text-sm font-bold text-white font-['Outfit']">Grand Total</span>
                  <span className="text-lg font-black text-orange-400 font-mono">
                    ৳{finalGrandTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Checkout Action CTA */}
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={onCheckout}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#b0401d] via-[#df5d2c] to-[#ff7849] hover:opacity-95 text-white text-xs font-bold shadow-xl shadow-orange-950/50 flex items-center justify-center gap-2 transition cursor-pointer active:scale-98"
                >
                  <span>Proceed to Secure Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
                  <button
                    type="button"
                    onClick={onClearCart}
                    className="hover:text-rose-400 transition cursor-pointer"
                  >
                    Clear Cart
                  </button>
                  <span>🛡️ 256-Bit SSL Encrypted</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
