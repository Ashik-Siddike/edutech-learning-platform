// Product card component to display individual product item from DummyJSON API
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

  // Format cart item object so it works identically with CartDrawer
  const handleCartClick = (e) => {
    e.stopPropagation();
    if (isInCart) {
      if (onRemoveFromCart) onRemoveFromCart(`prod-${product.id}`);
    } else {
      if (onAddToCart) {
        onAddToCart({
          id: `prod-${product.id}`,
          title: product.title,
          price: Math.round(product.price * 120), // Convert to demo BDT or keep USD equivalent
          originalPrice: originalPrice
            ? Math.round(Number(originalPrice) * 120)
            : Math.round(product.price * 120),
          displayPriceUSD: `$${product.price.toFixed(2)}`,
          image: product.thumbnail,
          directImage: product.thumbnail,
          category: product.category,
          brand: product.brand || "Official",
        });
      }
    }
  };

  return (
    <div
      onClick={() => onViewDetails && onViewDetails(product)}
      className="group bg-[#191b24] hover:bg-[#1c1f2b] border border-gray-800 hover:border-orange-500/40 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col shadow-lg hover:shadow-2xl hover:shadow-orange-950/20 cursor-pointer"
    >
      {/* Product image container */}
      <div className="relative aspect-[4/3] bg-[#14161f] overflow-hidden flex items-center justify-center p-4">
        {/* Category tag */}
        <span className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-md text-[10px] font-semibold tracking-wide uppercase bg-orange-950/80 text-orange-400 border border-orange-800/50 backdrop-blur-sm">
          {product.category}
        </span>

        {/* Discount badge */}
        {product.discountPercentage > 0 && (
          <span className="absolute top-3 right-3 z-10 px-2 py-0.5 rounded-md text-[10px] font-bold text-white bg-rose-600 shadow-sm">
            -{Math.round(product.discountPercentage)}%
          </span>
        )}

        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          className="max-h-full max-w-full object-contain group-hover:scale-108 transition-transform duration-300"
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=400&auto=format&fit=crop";
          }}
        />

        {/* Quick view hover badge */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="px-3 py-1.5 rounded-xl bg-[#212430]/90 text-white text-xs font-medium border border-gray-600/80 shadow-md flex items-center gap-1.5 backdrop-blur-sm">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span>Quick View</span>
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Brand & Rating row */}
          <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
            <span className="text-[11px] text-gray-400 truncate max-w-[120px]">
              {product.brand || "Brand Store"}
            </span>

            {/* Rating */}
            <div className="flex items-center gap-1 text-amber-400 font-semibold text-xs shrink-0">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>{product.rating?.toFixed(1) || "4.5"}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-sm font-semibold text-white group-hover:text-orange-400 transition-colors line-clamp-1 leading-snug">
            {product.title}
          </h3>

          {/* Description preview */}
          <p className="text-xs text-gray-400 line-clamp-2 mt-1 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price & Action Button */}
        <div className="pt-2 border-t border-gray-800/80 flex items-center justify-between gap-2">
          {/* Price */}
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold text-white font-mono">
                ${product.price?.toFixed(2)}
              </span>
              {originalPrice && (
                <span className="text-xs text-gray-500 line-through font-mono">
                  ${originalPrice}
                </span>
              )}
            </div>
            <span className="text-[10px] text-emerald-400 block font-medium">
              {product.availabilityStatus || "In Stock"} ({product.stock || 0})
            </span>
          </div>

          {/* Add to cart / In cart button */}
          <button
            type="button"
            onClick={handleCartClick}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow cursor-pointer active:scale-95 ${
              isInCart
                ? "bg-emerald-600 hover:bg-emerald-700 text-white border border-emerald-500"
                : "bg-gradient-to-r from-[#b0401d] to-[#df5d2c] hover:opacity-95 text-white"
            }`}
            title={isInCart ? "Remove from cart" : "Add to cart"}
          >
            {isInCart ? (
              <>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
                <span>In Cart</span>
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
