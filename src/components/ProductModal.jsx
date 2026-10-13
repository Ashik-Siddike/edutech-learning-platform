import { useState, useEffect, useMemo } from "react";
import { useProduct } from "../hooks/useProduct";
import { createPriceCalculator } from "../helpers/priceCalculator";
import {
  X,
  Plus,
  Minus,
  ShoppingCart,
  Check,
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  AlertTriangle,
  Loader2,
} from "lucide-react";

export default function ProductModal({
  productId,
  onClose,
  isInCart = false,
  onAddToCart,
  onRemoveFromCart,
}) {
  const { product, loading, error, refetch } = useProduct(productId);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setQuantity(1);
  }, [productId]);

  /**
   * Price calculator function using a JavaScript Closure.
   * `createPriceCalculator` captures config variables (vatRate: 0.05, exchangeRate: 120)
   * in its lexical scope.
   */
  const calculatePriceWithClosure = useMemo(() => {
    return createPriceCalculator({
      vatRate: 0.05, // 5% VAT
      exchangeRate: 120, // 1 USD = 120 BDT
      currencySymbol: "৳",
    });
  }, []);

  const pricing = useMemo(() => {
    return calculatePriceWithClosure(product, quantity);
  }, [calculatePriceWithClosure, product, quantity]);

  if (!productId) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-2.5 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#060a16] border border-white/[0.12] rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-2xl max-h-[92vh] sm:max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-5 sm:right-5 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/[0.08] hover:bg-white/[0.15] text-slate-300 hover:text-white flex items-center justify-center transition cursor-pointer text-xs shadow-md border border-white/10"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Loading State */}
        {loading && (
          <div className="py-20 sm:py-24 text-center space-y-4">
            <Loader2 className="w-9 h-9 text-cyan-400 animate-spin mx-auto" />
            <p className="text-xs text-slate-400">Loading product specifications via DummyJSON API...</p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="py-12 sm:py-16 text-center space-y-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <p className="text-xs text-rose-300 max-w-sm mx-auto">{error}</p>
            <button
              type="button"
              onClick={refetch}
              className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold cursor-pointer transition shadow-lg"
            >
              Retry
            </button>
          </div>
        )}

        {/* Product Details Content */}
        {!loading && !error && product && (
          <div className="space-y-4 sm:space-y-6">
            {/* Top Media & Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-start">
              {/* Image Showcase */}
              <div className="bg-[#030610] rounded-xl sm:rounded-2xl p-3 sm:p-4 flex items-center justify-center aspect-[4/3] sm:aspect-square max-h-56 sm:max-h-none border border-white/[0.06] overflow-hidden">
                <img
                  src={product.thumbnail || product.images?.[0]}
                  alt={product.title}
                  className="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Title & Specs */}
              <div className="space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/15 px-2 py-0.5 rounded-md border border-cyan-500/30">
                      {product.category}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Brand: <strong className="text-white">{product.brand || "Official Store"}</strong>
                    </span>
                  </div>

                  <h2 className="text-lg sm:text-xl font-extrabold text-white font-['Outfit'] mt-2 leading-tight">
                    {product.title}
                  </h2>

                  <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-400">
                    <span className="font-mono text-[11px]">SKU: {product.sku || "N/A"}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1 text-amber-400 font-bold">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{product.rating?.toFixed(1) || "4.5"}</span>
                    </div>
                  </div>

                  {/* Price & Discount */}
                  <div className="flex items-baseline gap-2.5 mt-3">
                    <span className="text-2xl font-black font-mono text-white">
                      ${product.price?.toFixed(2)}
                    </span>
                    {product.discountPercentage > 0 && (
                      <>
                        <span className="text-xs text-slate-500 line-through font-mono">
                          ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                        </span>
                        <span className="text-xs font-bold text-violet-300 bg-violet-500/20 px-2 py-0.5 rounded-md border border-violet-500/30">
                          -{Math.round(product.discountPercentage)}% OFF
                        </span>
                      </>
                    )}
                  </div>

                  <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Interactive Quantity Selector & Closure Price Breakdown */}
                <div className="p-4 rounded-2xl bg-[#090e1c] border border-white/[0.08] space-y-3 mt-2 shadow-inner">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-300 font-semibold font-['Outfit']">Quantity Selection</span>
                    <div className="flex items-center gap-2 bg-[#040711] rounded-xl border border-white/10 p-1">
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        disabled={quantity <= 1}
                        className="w-6 h-6 rounded-lg bg-white/[0.08] hover:bg-white/[0.15] disabled:opacity-30 text-white flex items-center justify-center transition cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-7 text-center text-xs font-mono font-bold text-white">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => q + 1)}
                        className="w-6 h-6 rounded-lg bg-white/[0.08] hover:bg-white/[0.15] text-white flex items-center justify-center transition cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Closure Calculated Breakdown */}
                  <div className="space-y-1.5 pt-2.5 border-t border-white/[0.08] text-[11px] text-slate-400">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="px-2 py-0.5 rounded-md bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 font-mono font-semibold">
                        ⚡ JS Closure Engine
                      </span>
                      <span>5% VAT: ${pricing.vatAmountUSD}</span>
                    </div>

                    <div className="flex justify-between items-baseline pt-1">
                      <span className="text-slate-300 font-medium">Grand Total ({quantity} {quantity === 1 ? "unit" : "units"}):</span>
                      <div className="text-right">
                        <span className="font-mono text-base font-extrabold text-cyan-400">
                          ৳{pricing.totalBDT.toLocaleString()}
                        </span>
                        <span className="font-mono text-[10px] text-slate-400 block">
                          (${pricing.totalUSD.toFixed(2)} USD)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cart Action Button */}
                <div className="pt-3 border-t border-white/[0.08] flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      if (isInCart) {
                        if (onRemoveFromCart) onRemoveFromCart(`prod-${product.id}`);
                      } else {
                        if (onAddToCart) {
                          onAddToCart({
                            id: `prod-${product.id}`,
                            title: product.title,
                            price: pricing.totalBDT,
                            originalPrice: Math.round(
                              (product.price * pricing.quantity) * 120
                            ),
                            displayPriceUSD: `$${pricing.totalUSD.toFixed(2)}`,
                            quantity: pricing.quantity,
                            image: product.thumbnail,
                            directImage: product.thumbnail,
                            category: product.category,
                            brand: product.brand || "Official Store",
                          });
                        }
                      }
                    }}
                    className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer shadow-lg active:scale-98 ${
                      isInCart
                        ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                        : "bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white hover:opacity-95 shadow-cyan-950/40"
                    }`}
                  >
                    {isInCart ? (
                      <>
                        <Check className="w-4 h-4 text-white" />
                        <span>In Your Cart (Click to Remove)</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4" />
                        <span>Add {quantity} to Cart (৳{pricing.totalBDT.toLocaleString()})</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Specifications Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-white/[0.08] text-xs">
              <div className="p-3.5 rounded-2xl bg-[#090e1c] border border-white/[0.06] flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase tracking-wider">Warranty</span>
                  <span className="font-semibold text-white">{product.warrantyInformation || "1 Year Official"}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#090e1c] border border-white/[0.06] flex items-center gap-3">
                <Truck className="w-5 h-5 text-cyan-400 shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase tracking-wider">Shipping</span>
                  <span className="font-semibold text-white">{product.shippingInformation || "Ships in 2-3 Days"}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#090e1c] border border-white/[0.06] flex items-center gap-3">
                <RotateCcw className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase tracking-wider">Return Policy</span>
                  <span className="font-semibold text-white">{product.returnPolicy || "7 Days Return"}</span>
                </div>
              </div>
            </div>

            {/* Customer Reviews */}
            {product.reviews?.length > 0 && (
              <div className="space-y-3 pt-3 border-t border-white/[0.08]">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider font-['Outfit']">
                  Customer Feedback ({product.reviews.length})
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {product.reviews.slice(0, 2).map((rev, i) => (
                    <div key={i} className="p-3.5 rounded-2xl bg-[#090e1c] border border-white/[0.06] text-xs space-y-1">
                      <div className="flex items-center justify-between text-slate-400">
                        <span className="font-semibold text-white">{rev.reviewerName}</span>
                        <div className="flex items-center gap-1 text-amber-400 font-mono text-xs">
                          <Star className="w-3 h-3 fill-current" />
                          <span>{rev.rating}</span>
                        </div>
                      </div>
                      <p className="text-slate-300 text-xs italic">&ldquo;{rev.comment}&rdquo;</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
