import { useState } from "react";
import coursesData from "../data/coursesData";

export default function CourseDetailsPage({
  courseId = 2,
  cart = [],
  onAddToCart,
  onRemoveFromCart,
  onNavigate,
}) {
  // Find current course from coursesData, or fallback to first course
  const course =
    coursesData.find((c) => String(c.id) === String(courseId)) ||
    coursesData[0] || {
      id: 2,
      title: "Frontend Mastery (React & Next.js)",
      category: "Frontend Development",
      badge: "Popular",
      price: 7500,
      originalPrice: 10500,
      rating: 4.9,
      reviewsCount: 280,
      duration: "4 Months",
      lessonsCount: 48,
      level: "Intermediate",
      instructor: "Rahat Chowdhury",
      description:
        "Deep dive into React 19, Next.js App Router, Tailwind CSS, Server Actions and State Management.",
      directImage:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1200&auto=format&fit=crop",
    };

  // Video preview player state
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  // Curriculum accordion open state: array of open module indices
  const [openModules, setOpenModules] = useState([0, 1]); // First 2 open by default

  const toggleModule = (index) => {
    setOpenModules((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  // Check if this course is already in the cart
  const isInCart = cart.some((c) => String(c.id) === String(course.id));

  // Handle direct enrollment: add to cart & immediately redirect to checkout
  const handleEnrollNow = () => {
    if (!isInCart && onAddToCart) {
      onAddToCart(course);
    }
    if (onNavigate) {
      onNavigate("checkout");
    }
  };

  // Toggle Cart
  const handleCartToggle = () => {
    if (isInCart) {
      if (onRemoveFromCart) onRemoveFromCart(course.id);
    } else {
      if (onAddToCart) onAddToCart(course);
    }
  };

  // Safe image helper
  const courseImage =
    course.directImage ||
    (course.image && course.image.startsWith("http") && !course.image.includes("PASTE_YOUR")
      ? course.image
      : "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1200&auto=format&fit=crop");

  // Dynamic Syllabus Modules
  const modules = [
    {
      title: "Module 1: Modern Foundations & Architecture",
      duration: "6 Lessons • 3.5 Hours",
      lessons: [
        { title: "Course Introduction & Setting Up the Development Stack", duration: "18 mins", isPreview: true },
        { title: "Modern JavaScript (ES6+), Closures, and Async Event Loop", duration: "32 mins", isPreview: true },
        { title: "Deep Dive into TypeScript Essentials for Frontends", duration: "45 mins", isPreview: false },
        { title: "Component Driven Architecture & Atomic Design System", duration: "28 mins", isPreview: false },
      ],
    },
    {
      title: "Module 2: Advanced React 19 & Custom Hooks",
      duration: "8 Lessons • 5 Hours",
      lessons: [
        { title: "React 19 Compiler, Actions, and useActionState Hook", duration: "35 mins", isPreview: true },
        { title: "Mastering React Reconciliation, Fiber, and Virtual DOM", duration: "40 mins", isPreview: false },
        { title: "Building Enterprise Reusable Custom Hooks (useApiCall)", duration: "42 mins", isPreview: false },
        { title: "State Management: Context API vs Zustand vs Redux Toolkit", duration: "50 mins", isPreview: false },
      ],
    },
    {
      title: "Module 3: Next.js 15 Full Stack Mastery",
      duration: "10 Lessons • 7 Hours",
      lessons: [
        { title: "App Router, Layouts, Templates, and Route Groups", duration: "38 mins", isPreview: true },
        { title: "Server Components (RSC) vs Client Components Architecture", duration: "45 mins", isPreview: false },
        { title: "Server Actions, Mutations, and Optimistic UI Updates", duration: "52 mins", isPreview: false },
        { title: "Streaming SSR, Suspense Boundaries & Skeleton Loaders", duration: "36 mins", isPreview: false },
        { title: "Auth.js (NextAuth) Session Management & Protected Routes", duration: "48 mins", isPreview: false },
      ],
    },
    {
      title: "Module 4: Enterprise Project, Testing & CI/CD",
      duration: "8 Lessons • 6 Hours",
      lessons: [
        { title: "Full Stack Capstone Project: Production Edutech SaaS Platform", duration: "75 mins", isPreview: false },
        { title: "Unit Testing with Vitest and React Testing Library", duration: "40 mins", isPreview: false },
        { title: "Automated Docker Containerization & GitHub Actions CI/CD", duration: "45 mins", isPreview: false },
        { title: "Production Deployment on Vercel, AWS & Performance Audit", duration: "35 mins", isPreview: false },
      ],
    },
  ];

  return (
    <div className="w-full min-h-screen bg-[#12131a] text-gray-200 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-gray-400">
          <button
            type="button"
            onClick={() => onNavigate("home")}
            className="hover:text-white transition cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <button
            type="button"
            onClick={() => onNavigate("courses")}
            className="hover:text-white transition cursor-pointer"
          >
            Courses
          </button>
          <span>/</span>
          <span className="text-gray-300 font-medium truncate max-w-xs">{course.title}</span>
        </nav>

        {/* Top Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (8 cols): Title, Specs, Video Player */}
          <div className="lg:col-span-8 space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-orange-950/60 text-orange-400 border border-orange-800/40">
                  {course.category}
                </span>
                {course.badge && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#b0401d] to-[#df5d2c] shadow">
                    {course.badge}
                  </span>
                )}
                <span className="text-xs text-gray-400">• {course.level} Level</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-serif font-black text-white leading-tight">
                {course.title}
              </h1>

              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-2xl">
                {course.description}
              </p>

              {/* Meta Stats */}
              <div className="flex items-center gap-4 sm:gap-6 pt-2 text-xs text-gray-400 flex-wrap">
                <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                  <span>★ {course.rating || "4.9"}</span>
                  <span className="text-gray-400 font-normal">({course.reviewsCount || 280} Reviews)</span>
                </div>
                <div>⏱️ {course.duration || "4 Months"} Duration</div>
                <div>📚 {course.lessonsCount || 48} Comprehensive Lessons</div>
                <div>🗣️ Language: Bangla (Bengali)</div>
              </div>

              {/* Instructor Mini Card */}
              <div className="flex items-center gap-3 pt-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#b0401d] to-[#df5d2c] flex items-center justify-center text-white font-bold text-sm">
                  {course.instructor?.charAt(0) || "T"}
                </div>
                <div>
                  <span className="text-xs text-gray-400 block">Created &amp; Mentored by</span>
                  <span className="text-sm font-semibold text-white">{course.instructor || "Rahat Chowdhury"}</span>
                </div>
              </div>
            </div>

            {/* Large Interactive Video Preview Player */}
            <div className="relative aspect-video w-full rounded-3xl overflow-hidden bg-[#14161f] border border-gray-800 shadow-2xl group">
              {isPlayingVideo ? (
                <div className="w-full h-full flex flex-col items-center justify-center bg-black relative">
                  {/* Interactive simulated player */}
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-black/60 px-3 py-1 rounded-full text-xs text-white">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                    <span>Free Preview: Lecture #1 - Architectural Overview</span>
                  </div>

                  <div className="text-center space-y-3 p-6">
                    <div className="w-16 h-16 rounded-full bg-orange-600/20 border border-orange-500 flex items-center justify-center mx-auto text-orange-400 animate-pulse">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-300">
                      Playing sample course preview video (HD 1080p)
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsPlayingVideo(false)}
                      className="px-4 py-1.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-xs text-gray-300 transition cursor-pointer"
                    >
                      Pause &amp; Close Preview
                    </button>
                  </div>

                  {/* Player timeline bar */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 to-transparent p-4 flex items-center gap-3">
                    <span className="text-[11px] font-mono text-gray-400">03:45 / 18:20</span>
                    <div className="flex-1 h-1.5 rounded-full bg-gray-700 overflow-hidden">
                      <div className="h-full bg-[#df5d2c] w-1/4 rounded-full" />
                    </div>
                    <span className="text-xs text-gray-400">HD 1080p</span>
                  </div>
                </div>
              ) : (
                <>
                  <img
                    src={courseImage}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/30 flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => setIsPlayingVideo(true)}
                      className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#b0401d] to-[#df5d2c] flex items-center justify-center text-white shadow-2xl shadow-orange-950/70 hover:scale-110 active:scale-95 transition-all cursor-pointer border-2 border-white/30"
                      aria-label="Play Course Preview Video"
                    >
                      <svg className="w-8 h-8 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </button>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
                    <span className="bg-black/70 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">
                      ▶ Watch Free Course Preview (18 Mins)
                    </span>
                    <span className="bg-black/70 px-2.5 py-1 rounded-full backdrop-blur-sm font-mono text-[11px]">
                      Full HD Video + Source Code
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* What you will learn Section */}
            <div className="bg-[#191b24] p-6 sm:p-7 rounded-3xl border border-gray-800 shadow space-y-4">
              <h2 className="text-lg font-serif font-bold text-white">
                What You Will Master in this Track
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-300">
                <div className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold shrink-0 mt-0.5">✓</span>
                  <span>Architect full-stack React &amp; Next.js 15 apps from ground zero to production.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold shrink-0 mt-0.5">✓</span>
                  <span>Master TypeScript, Tailwind CSS, custom hooks, and server-side state.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold shrink-0 mt-0.5">✓</span>
                  <span>Implement secure JWT Auth, role middlewares, and database integrations.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold shrink-0 mt-0.5">✓</span>
                  <span>Build real-world scalable APIs and responsive, accessible UI dashboards.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold shrink-0 mt-0.5">✓</span>
                  <span>Write automated unit tests, handle edge cases, and CI/CD pipelines.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold shrink-0 mt-0.5">✓</span>
                  <span>Prepare an industry-standard portfolio with verified live deployed projects.</span>
                </div>
              </div>
            </div>

            {/* Course Curriculum Accordion */}
            <div className="bg-[#191b24] p-6 sm:p-7 rounded-3xl border border-gray-800 shadow space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gray-800">
                <div>
                  <h2 className="text-lg font-serif font-bold text-white">
                    Course Curriculum &amp; Syllabus
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {modules.length} Modules • {course.lessonsCount || 48} Lessons • All materials downloadable
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setOpenModules(
                      openModules.length === modules.length ? [] : modules.map((_, i) => i)
                    )
                  }
                  className="text-xs text-orange-400 hover:underline cursor-pointer"
                >
                  {openModules.length === modules.length ? "Collapse All" : "Expand All Modules"}
                </button>
              </div>

              {/* Accordion List */}
              <div className="space-y-3">
                {modules.map((mod, idx) => {
                  const isOpen = openModules.includes(idx);
                  return (
                    <div
                      key={idx}
                      className="rounded-2xl border border-gray-800 overflow-hidden bg-[#212430]/60 transition"
                    >
                      <button
                        type="button"
                        onClick={() => toggleModule(idx)}
                        className="w-full p-4 flex items-center justify-between text-left hover:bg-[#212430] transition cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-orange-400 font-mono text-xs font-bold">
                            {isOpen ? "▼" : "▶"}
                          </span>
                          <div>
                            <h3 className="text-xs sm:text-sm font-semibold text-white">
                              {mod.title}
                            </h3>
                            <span className="text-[11px] text-gray-400">{mod.duration}</span>
                          </div>
                        </div>
                        <span className="text-[11px] text-gray-400 hidden sm:inline">
                          {mod.lessons.length} lessons
                        </span>
                      </button>

                      {isOpen && (
                        <div className="p-4 pt-0 border-t border-gray-800/80 divide-y divide-gray-800/60">
                          {mod.lessons.map((lesson, lIdx) => (
                            <div
                              key={lIdx}
                              className="py-2.5 flex items-center justify-between text-xs text-gray-300"
                            >
                              <div className="flex items-center gap-2.5">
                                <span className="text-gray-500">▶</span>
                                <span className="text-white">{lesson.title}</span>
                                {lesson.isPreview && (
                                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-950/70 text-emerald-400 border border-emerald-800">
                                    Free Preview
                                  </span>
                                )}
                              </div>
                              <span className="font-mono text-gray-400 text-[11px]">
                                {lesson.duration}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Prerequisites & Requirements */}
            <div className="bg-[#191b24] p-6 rounded-3xl border border-gray-800 shadow space-y-3">
              <h2 className="text-base font-serif font-bold text-white">
                Course Requirements &amp; Prerequisites
              </h2>
              <ul className="space-y-2 text-xs text-gray-300 list-disc list-inside">
                <li>Basic understanding of HTML, CSS, and modern JavaScript syntax.</li>
                <li>A computer (Windows, Mac, or Linux) with Node.js installed.</li>
                <li>No prior Next.js or React knowledge required; we cover everything step-by-step.</li>
                <li>Passion for practical project building and willingness to practice assignments.</li>
              </ul>
            </div>

            {/* Lead Instructor Profile */}
            <div className="bg-[#191b24] p-6 sm:p-7 rounded-3xl border border-gray-800 shadow space-y-4">
              <h2 className="text-base font-serif font-bold text-white">About Your Lead Instructor</h2>
              <div className="flex flex-col sm:flex-row gap-5 items-start">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#b0401d] to-[#df5d2c] flex items-center justify-center text-white text-3xl font-serif font-black shadow-xl shrink-0">
                  {course.instructor?.charAt(0) || "R"}
                </div>
                <div className="space-y-2">
                  <div>
                    <h3 className="text-base font-serif font-bold text-white">{course.instructor || "Rahat Chowdhury"}</h3>
                    <p className="text-xs text-orange-400">Principal Frontend Architect &amp; Tech Mentor</p>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Over 8+ years of industry experience training 5,000+ software engineers across Bangladesh and multinational tech companies. Passionate about clean scalable architecture, developer productivity, and real-world project coaching.
                  </p>
                  <div className="flex gap-4 pt-1 text-[11px] text-gray-400 font-mono">
                    <span>👥 4,200+ Students</span>
                    <span>★ 4.9 Instructor Rating</span>
                    <span>🎓 12 Tech Tracks</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (4 cols): Sticky Enrollment & Pricing Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#191b24] p-6 sm:p-7 rounded-3xl border border-gray-800 shadow-2xl space-y-6 sticky top-24">
              {/* Pricing Headline */}
              <div className="space-y-1">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold font-mono text-white">
                    ৳{Number(course.price).toLocaleString()}
                  </span>
                  {course.originalPrice && (
                    <span className="text-sm font-mono text-gray-500 line-through">
                      ৳{Number(course.originalPrice).toLocaleString()}
                    </span>
                  )}
                  {course.originalPrice && (
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-rose-600 text-white">
                      {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% OFF
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-orange-400 flex items-center gap-1 font-medium">
                  <span>⏳</span> Special Batch Enrollment Open (Limited Seats)
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={handleEnrollNow}
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-sm tracking-wide text-white bg-gradient-to-r from-[#b0401d] via-[#c44c25] to-[#df5d2c] hover:opacity-95 shadow-xl shadow-orange-950/50 transition active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Enroll Now &amp; Checkout</span>
                  <span>→</span>
                </button>

                <button
                  type="button"
                  onClick={handleCartToggle}
                  className={`w-full py-3 px-4 rounded-xl font-semibold text-xs transition cursor-pointer border flex items-center justify-center gap-2 ${
                    isInCart
                      ? "bg-emerald-600/20 border-emerald-500 text-emerald-300 hover:bg-emerald-600/30"
                      : "bg-[#212430] border-gray-700 text-gray-200 hover:bg-[#2a2e3d] hover:text-white"
                  }`}
                >
                  {isInCart ? (
                    <>
                      <span>✓ Added in Cart (Click to Remove)</span>
                    </>
                  ) : (
                    <>
                      <span>+ Add to Shopping Cart</span>
                    </>
                  )}
                </button>
              </div>

              {/* Course Features Guarantee */}
              <div className="space-y-3 pt-3 border-t border-gray-800 text-xs">
                <h4 className="font-semibold text-white uppercase text-[11px] tracking-wider">
                  This Comprehensive Track Includes:
                </h4>
                <ul className="space-y-2 text-gray-300 text-xs">
                  <li className="flex items-center gap-2">
                    <span className="text-orange-400">▶</span>
                    <span>{course.lessonsCount || 48} On-demand HD video lectures</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-orange-400">📦</span>
                    <span>12 Real-world industry portfolio projects</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-orange-400">♾️</span>
                    <span>Lifetime access to LMS portal &amp; updates</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-orange-400">💬</span>
                    <span>Dedicated Discord 1-on-1 mentor support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-orange-400">🎓</span>
                    <span>Official Certificate of Completion</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">🛡️</span>
                    <span>7-Day 100% money-back guarantee</span>
                  </li>
                </ul>
              </div>

              {/* Money back badge */}
              <div className="p-3.5 rounded-2xl bg-[#212430] border border-gray-800 text-center text-xs text-gray-400">
                🔒 256-Bit SSL Encrypted Payment (bKash, Nagad, Cards supported)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
