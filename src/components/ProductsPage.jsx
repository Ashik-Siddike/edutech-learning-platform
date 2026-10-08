// Products Page component consuming DummyJSON API via custom useProducts & useProduct hooks
import { useState, useMemo } from "react";
import useProducts from "../hooks/useProducts";
import { useProduct } from "../hooks/useProduct";
import ProductCard from "./ProductCard";

export default function ProductsPage({
  cart = [],
  onAddToCart,
  onRemoveFromCart,
}) {
  // Filter and pagination state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default"); // "default" | "price-asc" | "price-desc" | "rating-desc" | "title-asc"
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Selected product ID for Quick View Modal
  const [selectedProductId, setSelectedProductId] = useState(null);

  // Fetch single product details using useProduct hook when modal is open
  const {
    product: modalProduct,
    loading: modalLoading,
  } = useProduct(selectedProductId);

  // Derive sort parameters for DummyJSON API
  const sortParams = useMemo(() => {
    switch (sortBy) {
      case "price-asc":
        return { sortBy: "price", order: "asc" };
      case "price-desc":
        return { sortBy: "price", order: "desc" };
      case "rating-desc":
        return { sortBy: "rating", order: "desc" };
      case "title-asc":
        return { sortBy: "title", order: "asc" };
      default:
        return { sortBy: "", order: "asc" };
    }
  }, [sortBy]);

  // Fetch products using custom hook
  const {
    products,
    total,
    loading,
    error,
    refetch,
  } = useProducts({
    search: searchQuery,
    category: selectedCategory,
    limit: itemsPerPage,
    skip: (currentPage - 1) * itemsPerPage,
    sortBy: sortParams.sortBy,
    order: sortParams.order,
  });

  // Available categories list
  const categories = [
    { id: "all", label: "All Items" },
    { id: "beauty", label: "Beauty" },
    { id: "fragrances", label: "Fragrances" },
    { id: "furniture", label: "Furniture" },
    { id: "groceries", label: "Groceries" },
    { id: "laptops", label: "Laptops" },
    { id: "smartphones", label: "Smartphones" },
    { id: "home-decoration", label: "Home Decor" },
    { id: "kitchen-accessories", label: "Kitchen" },
    { id: "mens-shirts", label: "Men's Wear" },
    { id: "womens-dresses", label: "Women's Wear" },
  ];

  // Total pages
  const totalPages = Math.ceil(total / itemsPerPage) || 1;

  // Handle category change
  const handleCategoryChange = (catId) => {
    setSelectedCategory(catId);
    setCurrentPage(1);
  };

  // Handle search query
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSortBy("default");
    setCurrentPage(1);
  };

  // Check if a product is in cart
  const isProductInCart = (id) => cart.some((item) => item.id === `prod-${id}`);

  return (
    <div className="w-full min-h-screen bg-[#12131a] text-gray-200 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header banner */}
        <div className="relative rounded-3xl bg-gradient-to-r from-[#191b24] via-[#212430] to-[#191b24] p-6 sm:p-10 border border-gray-800 shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-950/60 border border-orange-700/50 text-orange-400 text-xs font-semibold mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Live DummyJSON API Integration</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-serif font-black text-white tracking-tight leading-tight mb-2">
              Products & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#df5d2c] to-[#f98054]">Gadgets Store</span>
            </h1>

            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              Explore authentic products fetched live from DummyJSON via our custom Axios client and React hooks (<code className="text-orange-300 font-mono text-xs">useProducts</code> &amp; <code className="text-orange-300 font-mono text-xs">useProduct</code>).
            </p>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-[#191b24] p-4 sm:p-5 rounded-2xl border border-gray-800 shadow-md space-y-4">
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search products by title, brand, tag..."
                className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-[#212430] border border-gray-700 text-white placeholder-gray-500 text-xs sm:text-sm focus:outline-none focus:border-orange-500 transition"
              />
              <svg
                className="w-4 h-4 text-gray-400 absolute left-3.5 top-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-3 text-gray-400 hover:text-white text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sort & Quick Refetch */}
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="px-3 py-2.5 rounded-xl bg-[#212430] border border-gray-700 text-gray-200 text-xs font-medium focus:outline-none focus:border-orange-500 cursor-pointer appearance-none pr-8"
                >
                  <option value="default">Sort: Default</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating-desc">Highest Rated</option>
                  <option value="title-asc">Title: A to Z</option>
                </select>
                <svg
                  className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-3.5 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {/* Refresh Button */}
              <button
                type="button"
                onClick={refetch}
                disabled={loading}
                title="Reload products from API"
                className="p-2.5 rounded-xl bg-[#212430] hover:bg-[#2b2f3e] border border-gray-700 text-gray-300 hover:text-white transition cursor-pointer disabled:opacity-50"
              >
                <svg
                  className={`w-4 h-4 ${loading ? "animate-spin text-orange-400" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            </div>
          </div>

          {/* Categories Pill Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                    active
                      ? "bg-gradient-to-r from-[#b0401d] to-[#df5d2c] text-white shadow"
                      : "bg-[#212430] hover:bg-[#272b3a] text-gray-400 hover:text-white border border-gray-800"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Status & Results Summary Bar */}
        <div className="flex items-center justify-between text-xs text-gray-400 px-1">
          <div>
            Showing{" "}
            <span className="font-bold text-white">
              {products.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}-
              {Math.min(currentPage * itemsPerPage, total)}
            </span>{" "}
            of <span className="font-bold text-orange-400">{total}</span> products
          </div>

          {selectedCategory !== "all" && (
            <div className="flex items-center gap-1.5">
              <span>Filtered by:</span>
              <span className="font-semibold text-white uppercase bg-gray-800 px-2 py-0.5 rounded text-[11px]">
                {selectedCategory}
              </span>
            </div>
          )}
        </div>

        {/* Error State Banner */}
        {error && (
          <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-800/80 text-rose-300 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-rose-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs sm:text-sm font-medium">{error}</span>
            </div>
            <button
              type="button"
              onClick={refetch}
              className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold cursor-pointer shrink-0 transition"
            >
              Retry
            </button>
          </div>
        )}

        {/* Loading Skeletons */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, idx) => (
              <div
                key={idx}
                className="bg-[#191b24] border border-gray-800/80 rounded-2xl p-4 space-y-4 animate-pulse"
              >
                <div className="w-full aspect-[4/3] bg-gray-800/60 rounded-xl" />
                <div className="space-y-2">
                  <div className="w-1/3 h-3 bg-gray-800/80 rounded" />
                  <div className="w-3/4 h-4 bg-gray-800 rounded" />
                  <div className="w-full h-3 bg-gray-800/50 rounded" />
                </div>
                <div className="pt-2 border-t border-gray-800 flex justify-between items-center">
                  <div className="w-1/4 h-5 bg-gray-800 rounded" />
                  <div className="w-16 h-7 bg-gray-800 rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                isInCart={isProductInCart(prod.id)}
                onAddToCart={onAddToCart}
                onRemoveFromCart={onRemoveFromCart}
                onViewDetails={(p) => setSelectedProductId(p.id)}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && products.length === 0 && (
          <div className="text-center py-16 px-4 bg-[#191b24] rounded-3xl border border-gray-800">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gray-800/60 flex items-center justify-center text-gray-500">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-base font-serif font-bold text-white mb-1">
              No products found
            </h3>
            <p className="text-xs text-gray-400 max-w-sm mx-auto mb-5">
              We couldn't find any items matching your current search or category filter.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#b0401d] to-[#df5d2c] text-white text-xs font-semibold hover:opacity-95 transition cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Pagination Bar */}
        {!loading && totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-4">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => {
                setCurrentPage((p) => Math.max(p - 1, 1));
                window.scrollTo({ top: 300, behavior: "smooth" });
              }}
              className="px-3 py-1.5 rounded-xl bg-[#212430] hover:bg-[#2a2e3d] text-gray-300 disabled:opacity-40 disabled:pointer-events-none border border-gray-700 text-xs font-medium cursor-pointer transition"
            >
              ← Previous
            </button>

            <span className="text-xs text-gray-400 px-3">
              Page <span className="font-bold text-white">{currentPage}</span> of{" "}
              <span className="font-bold text-white">{totalPages}</span>
            </span>

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => {
                setCurrentPage((p) => Math.min(p + 1, totalPages));
                window.scrollTo({ top: 300, behavior: "smooth" });
              }}
              className="px-3 py-1.5 rounded-xl bg-[#212430] hover:bg-[#2a2e3d] text-gray-300 disabled:opacity-40 disabled:pointer-events-none border border-gray-700 text-xs font-medium cursor-pointer transition"
            >
              Next →
            </button>
          </div>
        )}
      </div>

      {/* Quick View Product Modal */}
      {selectedProductId && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-[#191b24] border border-gray-800 rounded-3xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedProductId(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-800/80 hover:bg-gray-700 text-gray-300 hover:text-white flex items-center justify-center transition cursor-pointer text-xs"
            >
              ✕
            </button>

            {modalLoading || !modalProduct ? (
              <div className="py-16 text-center space-y-3">
                <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-xs text-gray-400">Loading product details from DummyJSON...</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Top media & title section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Image showcase */}
                  <div className="bg-[#14161f] rounded-2xl p-4 flex items-center justify-center aspect-square border border-gray-800">
                    <img
                      src={modalProduct.thumbnail || modalProduct.images?.[0]}
                      alt={modalProduct.title}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  {/* Summary details */}
                  <div className="space-y-3 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-orange-400 bg-orange-950/60 px-2 py-0.5 rounded border border-orange-800/40">
                        {modalProduct.category}
                      </span>

                      <h2 className="text-lg sm:text-xl font-bold font-serif text-white mt-2 leading-tight">
                        {modalProduct.title}
                      </h2>

                      <p className="text-xs text-gray-400 mt-1">
                        Brand: <span className="text-white font-medium">{modalProduct.brand || "Authentic"}</span> • SKU: <span className="font-mono text-gray-400">{modalProduct.sku}</span>
                      </p>

                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xl font-bold font-mono text-white">
                          ${modalProduct.price?.toFixed(2)}
                        </span>
                        {modalProduct.discountPercentage > 0 && (
                          <span className="text-xs font-bold text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded">
                            -{Math.round(modalProduct.discountPercentage)}% OFF
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-gray-300 mt-3 leading-relaxed">
                        {modalProduct.description}
                      </p>
                    </div>

                    {/* Stock & Cart action */}
                    <div className="pt-4 border-t border-gray-800 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          const isIn = isProductInCart(modalProduct.id);
                          if (isIn) {
                            if (onRemoveFromCart) onRemoveFromCart(`prod-${modalProduct.id}`);
                          } else {
                            if (onAddToCart) {
                              onAddToCart({
                                id: `prod-${modalProduct.id}`,
                                title: modalProduct.title,
                                price: Math.round(modalProduct.price * 120),
                                originalPrice: Math.round(
                                  (modalProduct.price / (1 - modalProduct.discountPercentage / 100)) * 120
                                ),
                                displayPriceUSD: `$${modalProduct.price.toFixed(2)}`,
                                image: modalProduct.thumbnail,
                                directImage: modalProduct.thumbnail,
                                category: modalProduct.category,
                                brand: modalProduct.brand || "Official",
                              });
                            }
                          }
                        }}
                        className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition cursor-pointer shadow ${
                          isProductInCart(modalProduct.id)
                            ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                            : "bg-gradient-to-r from-[#b0401d] to-[#df5d2c] hover:opacity-95 text-white"
                        }`}
                      >
                        {isProductInCart(modalProduct.id) ? "In Your Cart (Click to Remove)" : "Add to Cart"}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Additional Metadata Specifications */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-gray-800 text-xs">
                  <div className="p-3 rounded-xl bg-[#212430] border border-gray-800">
                    <span className="text-[10px] text-gray-400 block">Warranty</span>
                    <span className="font-medium text-white">{modalProduct.warrantyInformation || "1 Year Standard"}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#212430] border border-gray-800">
                    <span className="text-[10px] text-gray-400 block">Shipping</span>
                    <span className="font-medium text-white">{modalProduct.shippingInformation || "Ships in 2-3 days"}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#212430] border border-gray-800">
                    <span className="text-[10px] text-gray-400 block">Return Policy</span>
                    <span className="font-medium text-white">{modalProduct.returnPolicy || "30 Days return"}</span>
                  </div>
                </div>

                {/* Reviews section */}
                {modalProduct.reviews?.length > 0 && (
                  <div className="space-y-3 pt-2 border-t border-gray-800">
                    <h3 className="text-xs font-bold font-serif text-white uppercase tracking-wider">
                      Verified Reviews ({modalProduct.reviews.length})
                    </h3>
                    <div className="space-y-2">
                      {modalProduct.reviews.slice(0, 3).map((rev, i) => (
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
      )}
    </div>
  );
}
