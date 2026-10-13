export default function CourseCard({
  course,
  onSelectCourse,
  onQuickView,
  onAddToCart,
  onRemoveFromCart,
  isInCart = false,
}) {
  // Calculate discount percentage when original price is available
  const discountPercent = course.originalPrice
    ? Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)
    : 0;

  // Resolve direct image or provide high quality fallback
  const imageSrc =
    course.directImage ||
    (course.image && course.image.startsWith("http") && !course.image.includes("PASTE_YOUR")
      ? course.image
      : "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1200&auto=format&fit=crop");

  return (
    <div className="group bg-[#212430] border border-gray-700/70 hover:border-orange-500/60 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-orange-950/30 transition-all duration-300 flex flex-col">
      <div className="relative aspect-video overflow-hidden bg-[#191b24]">
        <img
          src={imageSrc}
          alt={course.title}
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop";
          }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#212430] via-transparent to-black/30 pointer-events-none" />

        {course.badge && (
          <span className="absolute top-3 left-3 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider rounded-md shadow-md bg-gradient-to-r from-[#b0401d] to-[#df5d2c] text-white">
            {course.badge}
          </span>
        )}

        <span className="absolute top-3 right-3 px-2.5 py-1 text-[11px] font-medium rounded-md bg-black/60 backdrop-blur-md text-gray-200 border border-white/10">
          {course.category}
        </span>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
            <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
              <svg className="w-3.5 h-3.5 fill-current text-amber-400" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>{course.rating}</span>
              <span className="text-gray-400 font-normal">({course.reviewsCount})</span>
            </div>
            <span className="text-gray-400 font-medium">{course.level}</span>
          </div>

          <h3 className="text-base font-serif font-bold text-white group-hover:text-orange-300 transition-colors line-clamp-1 mb-2">
            {course.title}
          </h3>

          <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed mb-4">
            {course.description}
          </p>
        </div>

        <div>
          <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-300 py-2.5 px-3 rounded-lg bg-[#191b24] border border-gray-700/50 mb-4">
            <div className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span>{course.lessonsCount} Lessons</span>
            </div>
          </div>

          {/* Price & Discount row */}
          <div className="pt-3 border-t border-gray-700/60 flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-white font-serif tracking-tight">
                ৳{course.price.toLocaleString()}
              </span>
              {course.originalPrice && (
                <span className="text-xs text-gray-500 line-through">
                  ৳{course.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            {discountPercent > 0 && (
              <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-[10px] font-semibold text-emerald-400">
                Save {discountPercent}%
              </span>
            )}
          </div>

          {/* Symmetrical Action Buttons */}
          <div className="grid grid-cols-2 gap-2 mt-3">
            <button
              type="button"
              onClick={() => onQuickView(course)}
              className="w-full py-2 px-3 text-xs font-medium text-gray-300 hover:text-white bg-[#191b24] hover:bg-gray-800 rounded-xl transition border border-gray-700/80 hover:border-gray-600 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Details</span>
            </button>

            <button
              type="button"
              onClick={() =>
                isInCart ? onRemoveFromCart(course.id) : onAddToCart(course)
              }
              className={`w-full py-2 px-3 text-xs font-semibold rounded-xl transition shadow flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 whitespace-nowrap ${
                isInCart
                  ? "bg-emerald-600 hover:bg-red-600 text-white border border-emerald-500/50 shadow-emerald-950/40"
                  : "bg-gradient-to-r from-[#b0401d] to-[#df5d2c] hover:opacity-95 text-white shadow-orange-950/40"
              }`}
              title={isInCart ? "Click to remove from cart" : "Add to cart"}
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>Add to Cart</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
