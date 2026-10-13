import { ShoppingCart, Check, Eye, Star, Zap } from "lucide-react";

export default function ProductCard({
  product,
  isInCart = false,
  onAddToCart,
  onRemoveFromCart,
  onViewDetails,
}) {
  if (!product) return null;

  // Calculate original price before discount
  const originalPrice = product.discountPercentage
    ? (product.price / (1 - product.discountPercentage / 100)).toFixed(2)
    : null;

  const bdtPrice = Math.round(product.price * 120);
  const bdtOriginalPrice = originalPrice
    ? Math.round(Number(originalPrice) * 120)
    : bdtPrice;

  const handleCartClick = (e) => {
    e.stopPropagation();
    if (isInCart) {
      if (onRemoveFromCart) onRemoveFromCart(`prod-${product.id}`);
    } else {
      if (onAddToCart) {
        onAddToCart({
          id: `prod-${product.id}`,
          title: product.title,
          price: bdtPrice,
          originalPrice: bdtOriginalPrice,
          displayPriceUSD: `$${product.price.toFixed(2)}`,
          image: product.thumbnail,
          directImage: product.thumbnail,
          category: product.category,
          brand: product.brand || "Official Store",
        });
      }
    }
  };

  return (
    <div
      onClick={() => onViewDetails && onViewDetails(product)}
      className="group relative rounded-xl sm:rounded-2xl bg-gradient-to-b from-[#141a2c] to-[#0d1222] border border-white/[0.08] hover:border-orange-500/40 p-2.5 sm:p-4 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-orange-950/20 cursor-pointer flex flex-col justify-between"
    >
      {/* Product Image Area */}
      <div className="relative aspect-[4/3] rounded-lg sm:rounded-xl bg-[#090d18] overflow-hidden flex items-center justify-center p-2 sm:p-3 mb-2 sm:mb-3 border border-white/[0.04]">
        {/* Category Badge */}
        <span className="absolute top-2 left-2 z-10 px-1.5 sm:px-2 py-0.5 rounded-md text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-[#0f1424]/90 text-orange-400 border border-orange-500/30 backdrop-blur-md">
          {product.category}
        </span>

        {/* Discount Badge */}
        {product.discountPercentage > 0 && (
          <span className="absolute top-2 right-2 z-10 px-1.5 sm:px-2 py-0.5 rounded-md text-[9px] sm:text-[10px] font-extrabold text-white bg-gradient-to-r from-rose-600 to-rose-500 shadow-sm">
            -{Math.round(product.discountPercentage)}%
          </span>
        )}

        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          className="max-h-full max-w-full object-contain group-hover:scale-108 transition-transform duration-500"
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=400&auto=format&fit=crop";
          }}
        />

        {/* Quick View Hover Pill */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
          <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-[#121829]/90 text-white text-[11px] sm:text-xs font-semibold border border-white/20 shadow-xl flex items-center gap-1.5 backdrop-blur-md">
            <Eye className="w-3.5 h-3.5 text-orange-400" />
            <span>Quick View</span>
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="space-y-1.5 sm:space-y-2 flex-1 flex flex-col justify-between">
        <div className="space-y-1">
          {/* Brand & Star Rating */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-[10px] sm:text-[11px] text-slate-400 truncate max-w-[80px] sm:max-w-[120px]">
              {product.brand || "Official Store"}
            </span>

            <div className="flex items-center gap-1 text-amber-400 font-bold text-[11px] sm:text-xs shrink-0">
              <Star className="w-3 h-3 fill-current" />
              <span>{product.rating?.toFixed(1) || "4.5"}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-orange-400 transition-colors line-clamp-2 font-['Outfit'] leading-snug">
            {product.title}
          </h3>
        </div>

        {/* Pricing & Cart Action */}
        <div className="pt-1.5 sm:pt-2 border-t border-white/[0.06] flex items-center justify-between gap-1.5 sm:gap-2">
          <div>
            <div className="flex items-baseline gap-1 sm:gap-1.5">
              <span className="text-sm sm:text-lg font-black text-white font-mono">
                ৳{bdtPrice.toLocaleString()}
              </span>
              {originalPrice && (
                <span className="text-[10px] sm:text-xs text-slate-500 line-through font-mono">
                  ৳{bdtOriginalPrice.toLocaleString()}
                </span>
              )}
            </div>
            <span className="text-[9px] sm:text-[10px] text-slate-400 block font-mono">
              ${product.price?.toFixed(2)} USD
            </span>
          </div>

          {/* Add / In Cart Button */}
          <button
            type="button"
            onClick={handleCartClick}
            className={`p-2 sm:px-3 sm:py-2 rounded-xl text-[11px] sm:text-xs font-bold transition-all duration-200 flex items-center gap-1 sm:gap-1.5 cursor-pointer shadow-md active:scale-90 shrink-0 ${
              isInCart
                ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-950/40"
                : "bg-white/[0.08] hover:bg-gradient-to-r hover:from-[#df5d2c] hover:to-[#ff7849] text-white hover:shadow-orange-950/50"
            }`}
            title={isInCart ? "Remove from cart" : "Add to cart"}
          >
            {isInCart ? (
              <>
                <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                <span className="hidden sm:inline">Added</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-400 group-hover:text-white" />
                <span className="hidden sm:inline">Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
