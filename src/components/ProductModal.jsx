// ProductModal component: Displays detailed product information in a modal dialog
// Fetches live data dynamically using useProduct hook
import { useProduct } from "../hooks/useProduct";

export default function ProductModal({
  productId,
  onClose,
  isInCart = false,
  onAddToCart,
  onRemoveFromCart,
}) {
  // Dynamically fetch product details using the hook
  const { product, loading, error, refetch } = useProduct(productId);

  if (!productId) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#191b24] border border-gray-800 rounded-3xl p-6 sm:p-7 shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-gray-800/80 hover:bg-gray-700 text-gray-300 hover:text-white flex items-center justify-center transition cursor-pointer text-xs shadow-md border border-gray-700"
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* Loading State */}
        {loading && (
          <div className="py-20 text-center space-y-3">
            <div className="w-9 h-9 border-3 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs text-gray-400">Loading live product details from DummyJSON...</p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="py-16 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-950/60 border border-rose-800 text-rose-400 flex items-center justify-center mx-auto">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <p className="text-xs text-rose-300 max-w-sm mx-auto">{error}</p>
            <button
              type="button"
              onClick={refetch}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold cursor-pointer transition"
            >
              Retry
            </button>
          </div>
        )}

        {/* Product Details Content */}
        {!loading && !error && product && (
          <div className="space-y-6">
            {/* Top Media & Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              {/* Image showcase */}
              <div className="bg-[#14161f] rounded-2xl p-4 flex items-center justify-center aspect-square border border-gray-800">
                <img
                  src={product.thumbnail || product.images?.[0]}
                  alt={product.title}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              {/* Title & Specs */}
              <div className="space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-orange-400 bg-orange-950/60 px-2 py-0.5 rounded border border-orange-800/40">
                      {product.category}
                    </span>
                    <span className="text-[11px] text-gray-400">
                      Brand: <span className="text-white font-medium">{product.brand || "Authentic"}</span>
                    </span>
                  </div>

                  <h2 className="text-lg sm:text-xl font-bold font-serif text-white mt-2 leading-tight">
                    {product.title}
                  </h2>

                  <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-400">
                    <span className="font-mono text-[11px]">SKU: {product.sku || "N/A"}</span>
                    <span>•</span>
                    <span className="text-amber-400 font-semibold flex items-center gap-1">
                      ★ {product.rating?.toFixed(1) || "4.5"}
                    </span>
                  </div>

                  {/* Price & Discount */}
                  <div className="flex items-baseline gap-2.5 mt-3">
                    <span className="text-2xl font-bold font-mono text-white">
                      ${product.price?.toFixed(2)}
                    </span>
                    {product.discountPercentage > 0 && (
                      <>
                        <span className="text-xs text-gray-500 line-through font-mono">
                          ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                        </span>
                        <span className="text-xs font-bold text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded">
                          -{Math.round(product.discountPercentage)}% OFF
                        </span>
                      </>
                    )}
                  </div>

                  <p className="text-xs text-gray-300 mt-3 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Cart Action Button */}
                <div className="pt-4 border-t border-gray-800 flex items-center gap-3">
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
                            price: Math.round(product.price * 120),
                            originalPrice: Math.round(
                              (product.price / (1 - product.discountPercentage / 100)) * 120
                            ),
                            displayPriceUSD: `$${product.price.toFixed(2)}`,
                            image: product.thumbnail,
                            directImage: product.thumbnail,
                            category: product.category,
                            brand: product.brand || "Official",
                          });
                        }
                      }
                    }}
                    className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition cursor-pointer shadow ${
                      isInCart
                        ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                        : "bg-gradient-to-r from-[#b0401d] to-[#df5d2c] hover:opacity-95 text-white"
                    }`}
                  >
                    {isInCart ? (
                      <>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>In Your Cart (Click to Remove)</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        <span>Add to Cart</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Specifications Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 border-t border-gray-800 text-xs">
              <div className="p-3 rounded-xl bg-[#212430] border border-gray-800">
                <span className="text-[10px] text-gray-400 block">Warranty</span>
                <span className="font-medium text-white">{product.warrantyInformation || "1 Year Standard"}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#212430] border border-gray-800">
                <span className="text-[10px] text-gray-400 block">Shipping</span>
                <span className="font-medium text-white">{product.shippingInformation || "Ships in 2-3 days"}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#212430] border border-gray-800">
                <span className="text-[10px] text-gray-400 block">Return Policy</span>
                <span className="font-medium text-white">{product.returnPolicy || "30 Days return"}</span>
              </div>
            </div>

            {/* Customer Reviews */}
            {product.reviews?.length > 0 && (
              <div className="space-y-3 pt-2 border-t border-gray-800">
                <h3 className="text-xs font-bold font-serif text-white uppercase tracking-wider">
                  Verified Reviews ({product.reviews.length})
                </h3>
                <div className="space-y-2">
                  {product.reviews.slice(0, 3).map((rev, i) => (
                    <div key={i} className="p-3 rounded-xl bg-[#212430] border border-gray-800/80 text-xs">
                      <div className="flex items-center justify-between text-gray-400 mb-1">
                        <span className="font-semibold text-white">{rev.reviewerName}</span>
                        <span className="text-amber-400 font-mono">★ {rev.rating}</span>
                      </div>
                      <p className="text-gray-300 italic">"{rev.comment}"</p>
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
