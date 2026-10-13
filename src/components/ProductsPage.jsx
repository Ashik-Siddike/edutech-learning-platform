import { useState, useMemo } from "react";
import useProducts from "../hooks/useProducts";
import useDebounce from "../hooks/useDebounce";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";
import {
  Search,
  SlidersHorizontal,
  Sparkles,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  Loader2,
  PackageSearch,
} from "lucide-react";

export default function ProductsPage({
  cart = [],
  onAddToCart,
  onRemoveFromCart,
}) {
  // Filter and pagination state
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 400);
  const isDebouncing = searchQuery !== debouncedSearchQuery;

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Selected product ID for Quick View Modal
  const [selectedProductId, setSelectedProductId] = useState(null);

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

  // Fetch products using custom hook with debounced search query params
  const {
    products,
    total,
    loading,
    error,
    refetch,
  } = useProducts({
    search: debouncedSearchQuery,
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

  const totalPages = Math.ceil(total / itemsPerPage) || 1;

  const handleCategoryChange = (catId) => {
    setSelectedCategory(catId);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSortBy("default");
    setCurrentPage(1);
  };

  const isProductInCart = (id) => cart.some((item) => item.id === `prod-${id}`);

  return (
    <div className="w-full min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 animate-fadeIn">
      {/* Top Header Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-[#141a2c] via-[#1a2238] to-[#121626] p-6 sm:p-10 border border-white/[0.1] shadow-2xl overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>LIVE PRODUCT CATALOG</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-['Outfit'] tracking-tight">
            Discover Premium{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#df5d2c] via-[#ff7849] to-[#00f2fe]">
              Gadgets & Goods
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Powered by live API integration, debounced high-speed search, and instant closure price calculation. Find authentic electronics, luxury fragrances, and home goods.
          </p>
        </div>
      </div>

      {/* Control Bar: Search Input, Category Filter Pills, Sort Dropdown */}
      <div className="space-y-4">
        {/* Search & Sort Row */}
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Debounced Search Bar */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4 text-orange-400" />
            </div>

            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search by product name, brand, or model..."
              className="w-full pl-10 pr-24 py-3 rounded-2xl bg-[#121829] border border-white/[0.1] focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-sm text-white placeholder-slate-400 outline-none transition shadow-inner"
            />

            {/* Debounce / Loading Status Indicator inside search input */}
            <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center">
              {isDebouncing ? (
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-orange-500/15 border border-orange-500/30 text-orange-400 text-[10px] font-mono">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  <span>Debouncing...</span>
                </div>
              ) : searchQuery ? (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded cursor-pointer"
                >
                  Clear
                </button>
              ) : null}
            </div>
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2">
            <div className="relative shrink-0">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <SlidersHorizontal className="w-3.5 h-3.5" />
              </div>
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-9 pr-8 py-3 rounded-2xl bg-[#121829] border border-white/[0.1] text-xs font-semibold text-slate-200 outline-none hover:border-orange-500/40 transition cursor-pointer appearance-none shadow-sm"
              >
                <option value="default" className="bg-[#121829] text-white">Featured Sort</option>
                <option value="price-asc" className="bg-[#121829] text-white">Price: Low to High</option>
                <option value="price-desc" className="bg-[#121829] text-white">Price: High to Low</option>
                <option value="rating-desc" className="bg-[#121829] text-white">Highest Rated</option>
                <option value="title-asc" className="bg-[#121829] text-white">Alphabetical (A-Z)</option>
              </select>
            </div>

            {(searchQuery || selectedCategory !== "all" || sortBy !== "default") && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="p-3 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white border border-white/[0.1] transition cursor-pointer text-xs flex items-center gap-1.5"
                title="Reset all filters"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Category Horizontal Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer shrink-0 ${
                  isActive
                    ? "bg-gradient-to-r from-[#b0401d] via-[#df5d2c] to-[#ff7849] text-white shadow-lg shadow-orange-950/50"
                    : "bg-[#121829] hover:bg-white/[0.08] text-slate-300 border border-white/[0.08]"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Results Metadata Bar */}
        <div className="flex items-center justify-between text-xs text-slate-400 px-1">
          <div>
            Showing <strong className="text-white font-mono">{products.length}</strong> of{" "}
            <strong className="text-white font-mono">{total}</strong> items
            {selectedCategory !== "all" && (
              <span> in <strong className="text-orange-400 capitalize">{selectedCategory}</strong></span>
            )}
            {debouncedSearchQuery && (
              <span> matching &quot;<strong className="text-white">{debouncedSearchQuery}</strong>&quot;</span>
            )}
          </div>

          <div className="text-[11px] font-mono text-slate-400">
            Page {currentPage} of {totalPages}
          </div>
        </div>
      </div>

      {/* Main Content: Loading, Error, or Product Grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {[...Array(itemsPerPage)].map((_, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-[#121829] border border-white/[0.06] p-3 sm:p-4 space-y-3 animate-pulse"
            >
              <div className="aspect-[4/3] rounded-xl bg-white/[0.04]" />
              <div className="h-4 bg-white/[0.06] rounded w-3/4" />
              <div className="h-3 bg-white/[0.04] rounded w-1/2" />
              <div className="h-6 bg-white/[0.05] rounded w-1/3 pt-2" />
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="rounded-3xl bg-[#151a2c] border border-rose-500/30 p-8 sm:p-12 text-center max-w-lg mx-auto space-y-4 shadow-2xl">
          <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
            <AlertTriangle className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-white font-['Outfit']">Failed to Load Products</h3>
          <p className="text-xs text-rose-300/80 leading-relaxed">{error}</p>
          <button
            type="button"
            onClick={refetch}
            className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold cursor-pointer shadow-lg transition"
          >
            Retry Fetching
          </button>
        </div>
      ) : products.length === 0 ? (
        <div className="rounded-3xl bg-[#121829] border border-white/[0.08] p-10 sm:p-16 text-center max-w-md mx-auto space-y-4 shadow-xl">
          <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center mx-auto text-slate-400">
            <PackageSearch className="w-8 h-8 text-orange-400" />
          </div>
          <h3 className="text-lg font-bold text-white font-['Outfit']">No products found</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            No items matched your search criteria. Try modifying your keywords or resetting filters.
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#df5d2c] to-[#ff7849] text-white text-xs font-bold shadow-lg transition cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {products.map((item) => (
            <ProductCard
              key={item.id}
              product={item}
              isInCart={isProductInCart(item.id)}
              onAddToCart={onAddToCart}
              onRemoveFromCart={onRemoveFromCart}
              onViewDetails={(prod) => setSelectedProductId(prod.id)}
            />
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {!loading && !error && totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-6">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => {
              setCurrentPage((prev) => Math.max(1, prev - 1));
              window.scrollTo({ top: 180, behavior: "smooth" });
            }}
            className="p-2.5 rounded-xl bg-[#121829] border border-white/[0.1] text-slate-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-1.5">
            {[...Array(totalPages)].map((_, i) => {
              const pageNum = i + 1;
              // Show first, last, and near current
              if (
                pageNum === 1 ||
                pageNum === totalPages ||
                (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
              ) {
                return (
                  <button
                    key={pageNum}
                    type="button"
                    onClick={() => {
                      setCurrentPage(pageNum);
                      window.scrollTo({ top: 180, behavior: "smooth" });
                    }}
                    className={`w-9 h-9 rounded-xl text-xs font-bold font-mono transition cursor-pointer ${
                      currentPage === pageNum
                        ? "bg-gradient-to-r from-[#df5d2c] to-[#ff7849] text-white shadow-lg"
                        : "bg-[#121829] text-slate-400 hover:text-white border border-white/[0.08]"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              }
              if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
                return <span key={pageNum} className="text-slate-500 text-xs px-1">...</span>;
              }
              return null;
            })}
          </div>

          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => {
              setCurrentPage((prev) => Math.min(totalPages, prev + 1));
              window.scrollTo({ top: 180, behavior: "smooth" });
            }}
            className="p-2.5 rounded-xl bg-[#121829] border border-white/[0.1] text-slate-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
            aria-label="Next page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Quick View Product Modal with JS Closure Price Calculation */}
      {selectedProductId && (
        <ProductModal
          productId={selectedProductId}
          onClose={() => setSelectedProductId(null)}
          isInCart={isProductInCart(selectedProductId)}
          onAddToCart={onAddToCart}
          onRemoveFromCart={onRemoveFromCart}
        />
      )}
    </div>
  );
}
