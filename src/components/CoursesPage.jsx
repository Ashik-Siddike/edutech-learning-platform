import { useState, useMemo, useEffect } from "react";
import coursesData from "../data/coursesData.json";
import CourseCard from "./CourseCard";
import CourseModal from "./CourseModal";
import heroBannerImg from "../assets/3D hero image.png";

export default function CoursesPage({
  onNavigateToForm,
  cart = [],
  onAddToCart,
  onRemoveFromCart,
}) {
  // Filter and pagination state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [modalCourse, setModalCourse] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Extract unique categories from dataset
  const categories = useMemo(() => {
    const set = new Set(coursesData.map((c) => c.category));
    return ["All", ...Array.from(set)];
  }, []);

  // Filter courses by search keyword & category, then sort
  const filteredCourses = useMemo(() => {
    return coursesData
      .filter((course) => {
        const matchesCategory =
          selectedCategory === "All" || course.category === selectedCategory;
        const query = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !query ||
          course.title.toLowerCase().includes(query) ||
          course.description.toLowerCase().includes(query) ||
          course.instructor.toLowerCase().includes(query) ||
          course.category.toLowerCase().includes(query);
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        return a.id - b.id;
      });
  }, [searchQuery, selectedCategory, sortBy]);

  // Reset to first page whenever search query or category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, sortBy]);

  // Calculate pagination slices
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCourses = filteredCourses.slice(startIndex, endIndex);

  // Enroll handler: pre-selects course and redirects to registration form
  const handleEnroll = (course) => {
    setToastMessage(`Selected "${course.title}". Redirecting to Registration...`);
    setTimeout(() => {
      setToastMessage("");
      if (onNavigateToForm) {
        onNavigateToForm(course.title);
      }
    }, 1200);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-[#b0401d] to-[#df5d2c] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-orange-400/40 text-xs font-medium animate-bounce">
          <svg className="w-4 h-4 text-white shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
          </svg>
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="relative rounded-3xl overflow-hidden mb-10 bg-[#161822] border border-gray-700/80 p-6 sm:p-10 lg:p-12 shadow-2xl">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-orange-600/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-cyan-600/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          <div className="lg:col-span-7 flex flex-col justify-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-[#6e3333]/50 text-orange-200 border border-orange-900/60 mb-4 w-fit">
              <svg className="w-3.5 h-3.5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Career-Ready Tech Programs</span>
            </span>

            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
              Explore Premium <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#df5d2c] via-orange-400 to-amber-300">
                Software & IT Courses
              </span>
            </h1>

            <p className="mt-4 text-sm sm:text-base text-gray-300 leading-relaxed max-w-xl font-sans">
              Build production-grade skills with project-based curriculum, one-on-one mentorship, and career placement support from top industry professionals.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center max-w-xl">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search courses, instructors, technologies..."
                  className="w-full pl-10 pr-4 py-3 bg-[#191b24] border border-gray-700 rounded-xl text-xs sm:text-sm text-white placeholder-gray-500 outline-none focus:border-orange-400 transition shadow-inner"
                />
                <svg
                  className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5"
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
                    className="absolute right-3 top-3 text-gray-400 hover:text-white text-xs cursor-pointer"
                  >
                    ✕
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3.5 py-3 bg-[#191b24] border border-gray-700 rounded-xl text-xs sm:text-sm text-gray-200 outline-none focus:border-orange-400 cursor-pointer"
                >
                  <option value="featured">Featured</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/25 via-cyan-500/20 to-transparent blur-3xl rounded-full transform scale-95 pointer-events-none" />

            <div className="relative w-full max-w-lg lg:max-w-none flex items-center justify-center group">
              <img
                src={heroBannerImg}
                alt="3D Tech Innovation Hub"
                className="w-full h-auto max-h-[380px] object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.7)] transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition cursor-pointer ${
                isActive
                  ? "bg-gradient-to-r from-[#b0401d] to-[#df5d2c] text-white shadow-md shadow-orange-950/40"
                  : "bg-[#212430] text-gray-400 hover:text-white hover:bg-gray-800 border border-gray-700/60"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      <div id="courses-section" className="flex items-center justify-between text-xs text-gray-400 mb-6 px-1">
        <p>
          Showing{" "}
          <span className="text-white font-semibold">
            {filteredCourses.length === 0 ? 0 : startIndex + 1} -{" "}
            {Math.min(endIndex, filteredCourses.length)}
          </span>{" "}
          of <span className="text-white font-semibold">{filteredCourses.length}</span> Courses
        </p>
        {(searchQuery || selectedCategory !== "All") && (
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
            }}
            className="text-orange-400 hover:underline cursor-pointer"
          >
            Clear Filters
          </button>
        )}
      </div>

      {filteredCourses.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onSelectCourse={handleEnroll}
                onQuickView={(c) => setModalCourse(c)}
                onAddToCart={onAddToCart}
                onRemoveFromCart={onRemoveFromCart}
                isInCart={cart.some((item) => item.id === course.id)}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-800">
              <p className="text-xs text-gray-400">
                Page <span className="text-white font-semibold">{currentPage}</span> of{" "}
                <span className="text-white font-semibold">{totalPages}</span>
              </p>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => {
                    setCurrentPage((p) => Math.max(p - 1, 1));
                    document.getElementById("courses-section")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="px-3.5 py-2 rounded-xl text-xs font-medium bg-[#212430] border border-gray-700/70 text-gray-300 hover:text-white hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center gap-1.5 cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                  <span className="hidden sm:inline">Previous</span>
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                  <button
                    key={pageNumber}
                    type="button"
                    onClick={() => {
                      setCurrentPage(pageNumber);
                      document.getElementById("courses-section")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className={`w-9 h-9 rounded-xl text-xs font-medium transition cursor-pointer flex items-center justify-center ${
                      currentPage === pageNumber
                        ? "bg-gradient-to-r from-[#b0401d] to-[#df5d2c] text-white font-bold shadow-md shadow-orange-950/40"
                        : "bg-[#212430] border border-gray-700/70 text-gray-400 hover:text-white hover:bg-gray-800"
                    }`}
                  >
                    {pageNumber}
                  </button>
                ))}

                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() => {
                    setCurrentPage((p) => Math.min(p + 1, totalPages));
                    document.getElementById("courses-section")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="px-3.5 py-2 rounded-xl text-xs font-medium bg-[#212430] border border-gray-700/70 text-gray-300 hover:text-white hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="hidden sm:inline">Next</span>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-20 bg-[#212430] border border-gray-700 rounded-2xl p-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-800/80 border border-gray-700 flex items-center justify-center text-gray-400">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-serif font-bold text-white mb-1">
            No courses found
          </h3>
          <p className="text-xs text-gray-400 max-w-sm mx-auto mb-4">
            We couldn't find any courses matching your search "{searchQuery}". Try searching with different keywords.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
            }}
            className="px-4 py-2 bg-gradient-to-r from-[#b0401d] to-[#df5d2c] text-white text-xs font-medium rounded-xl cursor-pointer"
          >
            Reset Search
          </button>
        </div>
      )}

      {modalCourse && (
        <CourseModal
          course={modalCourse}
          onClose={() => setModalCourse(null)}
          onEnroll={handleEnroll}
          onAddToCart={onAddToCart}
          onRemoveFromCart={onRemoveFromCart}
          isInCart={cart.some((item) => item.id === modalCourse.id)}
        />
      )}
    </div>
  );
}
