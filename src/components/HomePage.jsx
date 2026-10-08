// High-impact Home Page with sleek SVG vector icons, stats, tracks, featured courses, and testimonials
import { useState } from "react";
import coursesData from "../data/coursesData.json";
import CourseCard from "./CourseCard";
import CourseModal from "./CourseModal";
import heroImg from "../assets/3D hero image.png";

export default function HomePage({
  onNavigate,
  cart = [],
  onAddToCart,
  onRemoveFromCart,
}) {
  const [modalCourse, setModalCourse] = useState(null);

  // Curated 4 flagship featured courses
  const featuredCourses = coursesData.slice(0, 4);

  const careerTracks = [
    {
      title: "Full Stack & Web Engineering",
      tag: "Web Dev",
      count: "6 Courses",
      desc: "Master modern frontend and scalable backend systems with React, Next.js, Node.js, and MongoDB.",
      icon: (
        <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
    },
    {
      title: "AI, Data Science & Machine Learning",
      tag: "AI & ML",
      count: "4 Courses",
      desc: "Harness generative AI, Python, deep learning architectures, and production model deployments.",
      icon: (
        <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: "Cloud Computing & DevOps",
      tag: "DevOps",
      count: "3 Courses",
      desc: "Deploy resilient microservices with Docker, Kubernetes, CI/CD pipelines, and AWS cloud.",
      icon: (
        <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 00-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      ),
    },
    {
      title: "Mobile App Development",
      tag: "Mobile",
      count: "3 Courses",
      desc: "Build cross-platform iOS & Android mobile applications with Flutter and React Native.",
      icon: (
        <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: "Cyber Security & Defense",
      tag: "Security",
      count: "2 Courses",
      desc: "Protect mission-critical networks, practice ethical penetration testing, and security auditing.",
      icon: (
        <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: "UI/UX & Product Design",
      tag: "Design",
      count: "2 Courses",
      desc: "Craft human-centered digital experiences, wireframes, prototypes, and scalable design systems.",
      icon: (
        <svg className="w-5 h-5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
    },
  ];

  const testimonials = [
    {
      name: "Sabbir Ahmed",
      role: "Frontend Engineer at Brain Station 23",
      avatar: "SA",
      course: "Frontend Mastery (React & Next.js)",
      comment:
        "The project-based curriculum at Tawhid Academy completely changed my career trajectory. Within 3 months of graduation, I landed my dream software engineering job.",
      rating: 5,
    },
    {
      name: "Nusrat Jahan",
      role: "Full Stack Developer at Selise",
      avatar: "NJ",
      course: "MERN Stack Web Development",
      comment:
        "The 1-on-1 mentor support during late-night debugging sessions made all the difference. The instructors are active industry leaders who know current market requirements.",
      rating: 5,
    },
    {
      name: "Tariqul Islam",
      role: "DevOps Engineer at Pathao",
      avatar: "TI",
      course: "DevOps & Cloud Computing",
      comment:
        "From Docker to multi-cloud Kubernetes clusters, everything was taught with practical real-world production environments. Highly recommended for aspiring engineers!",
      rating: 5,
    },
  ];

  const handleEnroll = (course) => {
    if (onNavigate) {
      onNavigate("form", course.title);
    }
  };

  return (
    <div className="w-full text-white animate-fadeIn">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#191b24] to-[#12131a] pt-12 pb-20 border-b border-gray-800">
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-orange-600/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 rounded-full bg-cyan-600/10 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero copy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#6e3333]/60 text-orange-200 border border-orange-800/60 shadow-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Premier Tech Academy • Bangladesh</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white tracking-tight leading-[1.15]">
                Master High-Impact <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#df5d2c] via-orange-400 to-amber-300">
                  Tech Skills
                </span>{" "}
                With Mentors
              </h1>

              <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-xl font-sans">
                Accelerate your software engineering career with production-grade bootcamps, personal mentorship from senior engineers, and guaranteed job placement support.
              </p>

              {/* Call to action buttons */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-0 pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate("courses")}
                  className="px-8 py-3.5 font-semibold text-xs sm:text-sm text-white bg-gradient-to-r from-[#b0401d] via-[#c44c25] to-[#df5d2c] border border-2 border-white  hover:brightness-110 [clip-path:polygon(0_0,calc(100%-16px)_0,100%_100%,0_100%)] drop-shadow-[0_10px_20px_rgba(176,64,29,0.45)] transition-all duration-300 active:scale-95 cursor-pointer flex items-center gap-2 group z-10"
                >
                  <span>Explore 20+ Courses</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate("form")}
                  className="sm:-ml-2 px-7 py-3.5 font-semibold text-xs sm:text-sm text-gray-200 hover:text-white border border-2 border-white  bg-gradient-to-r from-[#212430] to-[#2b2f3e] hover:from-[#2a2d3d] hover:to-[#363a4d] [clip-path:polygon(0_0,100%_0,100%_100%,16px_100%)] drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)] transition-all duration-300 active:scale-95 cursor-pointer flex items-center gap-2"
                >
                  <span>Register for Batch 2026</span>
                </button>
              </div>
              {/* Stats highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-gray-800/80">
                <div>
                  <p className="text-2xl sm:text-3xl font-serif font-bold text-white">15K+</p>
                  <p className="text-xs text-gray-400">Students Trained</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-serif font-bold text-orange-400">94%</p>
                  <p className="text-xs text-gray-400">Placement Rate</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-serif font-bold text-amber-300">20+</p>
                  <p className="text-xs text-gray-400">Tech Programs</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-serif font-bold text-emerald-400">4.9 / 5.0</p>
                  <p className="text-xs text-gray-400">Alumni Rating</p>
                </div>
              </div>
            </div>

            {/* Right Hero Visual */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-xl flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-tr from-orange-600/20 to-amber-500/10 rounded-3xl blur-2xl pointer-events-none" />
                <img
                  src={heroImg}
                  alt="Tawhid Academy 3D Hub"
                  className="w-full max-w-lg h-auto object-contain drop-shadow-[0_20px_40px_rgba(223,93,44,0.35)] hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Career Tracks Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-wider text-orange-400">
            Tailored Career Paths
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mt-2">
            Choose Your Technology Specialization
          </h2>
          <p className="text-sm text-gray-400 mt-3 leading-relaxed">
            Curriculums engineered directly with tech hiring managers to meet the demands of global software teams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {careerTracks.map((track, idx) => (
            <div
              key={idx}
              onClick={() => onNavigate("courses")}
              className="group p-6 rounded-2xl bg-[#212430] border border-gray-700/70 hover:border-orange-500/50 hover:bg-[#252837] shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-[#191b24] border border-gray-700/60 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {track.icon}
                  </div>
                  <span className="text-[11px] font-semibold text-orange-400 px-2.5 py-1 rounded-full bg-orange-950/40 border border-orange-900/60">
                    {track.count}
                  </span>
                </div>
                <h3 className="text-lg font-serif font-bold text-white group-hover:text-orange-300 transition-colors">
                  {track.title}
                </h3>
                <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                  {track.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-800 flex items-center justify-between text-xs font-medium text-gray-300 group-hover:text-orange-400 transition-colors">
                <span>View Track Courses</span>
                <span>→</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Courses Showcase */}
      <section className="py-16 bg-[#161822] border-y border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-orange-400">
                Top Rated Programs
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mt-1">
                Featured Flagship Courses
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-2">
                Join our most in-demand live bootcamps led by senior industry engineers.
              </p>
            </div>

            <button
              type="button"
              onClick={() => onNavigate("courses")}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#212430] hover:bg-gray-800 border border-gray-700 transition flex items-center gap-2 cursor-pointer w-fit"
            >
              <span>Explore All 20 Courses</span>
              <span>→</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCourses.map((course) => (
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
        </div>
      </section>

      {/* Why Choose Tawhid Academy */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-wider text-orange-400">
            The Tawhid Advantage
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mt-2">
            Why Thousands of Students Choose Us
          </h2>
          <p className="text-sm text-gray-400 mt-2">
            We don't just teach code syntax; we build industry-ready problem solvers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-[#212430] border border-gray-700/60 shadow-xl">
            <div className="w-10 h-10 rounded-xl bg-orange-950/60 text-orange-400 border border-orange-800/40 flex items-center justify-center mb-4">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-base font-serif font-bold text-white mb-2">
              Production Codebases
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Build full-stack real-world software applications that you can proudly showcase on GitHub and in tech interviews.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#212430] border border-gray-700/60 shadow-xl">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/60 text-cyan-400 border border-cyan-800/40 flex items-center justify-center mb-4">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="text-base font-serif font-bold text-white mb-2">
              1-on-1 Senior Mentorship
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Get dedicated code reviews, weekly doubt-clearing sessions, and architectural guidance from veteran software leads.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#212430] border border-gray-700/60 shadow-xl">
            <div className="w-10 h-10 rounded-xl bg-blue-950/60 text-blue-400 border border-blue-800/40 flex items-center justify-center mb-4">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-base font-serif font-bold text-white mb-2">
              Job Placement Cell
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Resume optimization, GitHub audit, technical mock interviews, and direct recommendations to 50+ hiring companies.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#212430] border border-gray-700/60 shadow-xl">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/60 text-emerald-400 border border-emerald-800/40 flex items-center justify-center mb-4">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <h3 className="text-base font-serif font-bold text-white mb-2">
              Verified Certification
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Receive a verifiable digital credential upon successful completion of your capstone projects and assessments.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-[#161822] border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-semibold uppercase tracking-wider text-orange-400">
              Alumni Success
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mt-2">
              Hear From Our Graduates
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-2">
              Over 15,000+ alumni working at top tech firms, fintech startups, and remote international agencies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#212430] border border-gray-700/70 shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 text-xs mb-3">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-amber-400" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed italic mb-6">
                    "{item.comment}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-gray-800">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#b0401d] to-[#df5d2c] flex items-center justify-center text-xs font-bold font-serif text-white shadow">
                    {item.avatar}
                  </div>
                  <div>
                    <h4 className="text-xs font-serif font-bold text-white">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-orange-400 font-medium">
                      {item.role}
                    </p>
                    <p className="text-[10px] text-gray-500">
                      {item.course}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action card */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-[#212430] border border-gray-700/70 shadow-2xl">
          {/* Signature signup page clip-path terracotta gradient overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-[#b0401d] via-[#c44c25] to-[#df5d2c] [clip-path:polygon(0_65%,100%_50%,100%_100%,0_100%)] md:[clip-path:polygon(42%_0,100%_0,100%_100%,58%_100%)] pointer-events-none transition-all duration-300"
          />

          {/* Subtle ambient lighting */}
          <div className="absolute inset-0 bg-black/10 pointer-events-none" />
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-orange-600/15 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-8 sm:p-12 lg:p-16 gap-8">
            {/* Left side on dark slate background */}
            <div className="w-full md:w-[55%] space-y-4 text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-orange-500/15 text-orange-300 border border-orange-500/30">
                Limited Early Bird Seats
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight">
                Ready to Accelerate Your Tech Career?
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-xl">
                Don't wait for opportunities—build the skills that make you indispensable in the modern software industry.
              </p>
              <div className="pt-3 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate("courses")}
                  className="px-6 py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-[#b0401d] to-[#df5d2c] hover:opacity-95 text-white shadow-xl shadow-orange-950/50 transition active:scale-95 cursor-pointer"
                >
                  Browse All Courses
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate("form")}
                  className="px-6 py-3 rounded-xl font-bold text-xs bg-[#191b24] hover:bg-gray-800 text-gray-200 border border-gray-700/80 transition active:scale-95 cursor-pointer"
                >
                  Sign Up for Next Batch
                </button>
              </div>
            </div>

            {/* Right side positioned over the terracotta gradient split */}
            <div className="w-full md:w-[42%] flex flex-col justify-center items-center md:items-end">
              <div className="bg-black/25 backdrop-blur-md border border-white/20 rounded-2xl p-6 sm:p-7 shadow-2xl max-w-sm w-full space-y-4">
                <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>Batch Highlights</span>
                </div>
                <h4 className="text-lg font-serif font-bold text-white leading-snug">
                  Fast-Track Your Journey
                </h4>
                <ul className="space-y-2.5 text-xs text-orange-100/90 font-medium">
                  <li className="flex items-center gap-2.5">
                    <svg className="w-3.5 h-3.5 text-amber-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>100% Project-Based Curriculum</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <svg className="w-3.5 h-3.5 text-amber-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>1-on-1 Code Review & Mentorship</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <svg className="w-3.5 h-3.5 text-amber-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Resume & Placement Assistance</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
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
