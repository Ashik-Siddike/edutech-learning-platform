export default function CourseModal({
  course,
  onClose,
  onEnroll,
  onAddToCart,
  onRemoveFromCart,
  isInCart = false,
}) {
  if (!course) return null;

  // Calculate discount percentage when original price is available
  const discountPercent = course.originalPrice
    ? Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)
    : 0;

  // Fallback image url if directImage is missing
  const imageSrc =
    course.directImage ||
    (course.image && course.image.startsWith("http") && !course.image.includes("PASTE_YOUR")
      ? course.image
      : "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1200&auto=format&fit=crop");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#212430] border border-gray-700 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-gray-300 hover:text-white flex items-center justify-center border border-white/10 transition cursor-pointer"
        >
          ✕
        </button>

        <div className="relative aspect-video max-h-64 w-full overflow-hidden bg-[#191b24]">
          <img
            src={imageSrc}
            alt={course.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#212430] via-transparent to-black/30" />
          {course.badge && (
            <span className="absolute bottom-4 left-4 px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-md bg-gradient-to-r from-[#b0401d] to-[#df5d2c] text-white shadow-lg">
              {course.badge}
            </span>
          )}
        </div>

        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          <div>
            <div className="flex items-center gap-2 text-xs text-orange-400 font-medium mb-1">
              <span>{course.category}</span>
              <span>•</span>
              <span>{course.level}</span>
            </div>
            <h2 className="text-2xl font-serif font-bold text-white leading-tight">
              {course.title}
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              Lead Instructor: <span className="text-gray-200 font-medium">{course.instructor}</span>
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 p-3 rounded-xl bg-[#191b24] border border-gray-700/60 text-center text-xs">
            <div>
              <p className="text-gray-400 text-[10px]">Rating</p>
              <p className="font-bold text-amber-400 mt-0.5 flex items-center justify-center gap-1">
                <svg className="w-3.5 h-3.5 fill-current text-amber-400" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>{course.rating}</span>
                <span className="text-gray-400 font-normal">({course.reviewsCount})</span>
              </p>
            </div>
            <div className="border-x border-gray-700/60">
              <p className="text-gray-400 text-[10px]">Duration</p>
              <p className="font-bold text-white mt-0.5">{course.duration}</p>
            </div>
            <div>
              <p className="text-gray-400 text-[10px]">Total Lessons</p>
              <p className="font-bold text-white mt-0.5">{course.lessonsCount} Modules</p>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
              Course Overview
            </h4>
            <p className="text-sm text-gray-300 leading-relaxed">
              {course.description}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
              What You Will Learn
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-300">
              <li className="flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-orange-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
                <span>Industry standard hands-on projects</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-orange-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
                <span>1-on-1 mentor guidance & code review</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-orange-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
                <span>Resume & portfolio building support</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-orange-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
                <span>Certificate of completion</span>
              </li>
            </ul>
          </div>

          <div className="pt-4 border-t border-gray-700/80 flex items-center justify-between">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold font-serif text-white">
                  ৳{course.price.toLocaleString()}
                </span>
                {course.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    ৳{course.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              {discountPercent > 0 && (
                <span className="text-xs font-semibold text-emerald-400">
                  {discountPercent}% Special Discount
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-xs font-medium text-gray-300 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-xl transition border border-gray-700 cursor-pointer"
              >
                Close
              </button>

              {onAddToCart && (
                <button
                  type="button"
                  onClick={() =>
                    isInCart ? onRemoveFromCart(course.id) : onAddToCart(course)
                  }
                  className={`px-4 py-2.5 text-xs font-semibold rounded-xl border transition cursor-pointer flex items-center gap-1.5 active:scale-95 whitespace-nowrap ${
                    isInCart
                      ? "bg-emerald-600 hover:bg-red-600 text-white border-emerald-500/50"
                      : "bg-[#191b24] hover:bg-gray-800 text-orange-300 hover:text-white border-orange-500/40"
                  }`}
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
              )}

              <button
                type="button"
                onClick={() => {
                  onEnroll(course);
                  onClose();
                }}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-[#b0401d] to-[#df5d2c] hover:opacity-95 rounded-xl shadow-lg transition active:scale-95 cursor-pointer"
              >
                Enroll Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
