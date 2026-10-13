import { useState, useEffect } from "react";

export default function StudentDashboard({ onNavigate, onSelectCourse }) {
  // Active dashboard tab: "courses" | "certificates" | "orders"
  const [activeTab, setActiveTab] = useState("courses");

  // Enrolled courses state (synced with localStorage)
  const [enrolledCourses, setEnrolledCourses] = useState(() => {
    try {
      const saved = localStorage.getItem("enrolledCourses");
      if (saved && JSON.parse(saved).length > 0) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn("Could not parse enrolledCourses", e);
    }
    // Default demo enrolled tracks so dashboard looks immediately vibrant
    return [
      {
        id: 2,
        title: "Frontend Mastery (React & Next.js)",
        category: "Frontend Development",
        instructor: "Rahat Chowdhury",
        progress: 65,
        completedLessons: 31,
        totalLessons: 48,
        nextLesson: "Server Components & Suspense in Next.js 15",
        directImage:
          "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop",
      },
      {
        id: 1,
        title: "MERN Stack Web Development",
        category: "Full Stack Web",
        instructor: "Md. Tanvir Hasan",
        progress: 38,
        completedLessons: 21,
        totalLessons: 56,
        nextLesson: "JWT Auth & Protected Role Middleware",
        directImage:
          "https://i.ibb.co.com/GvNr9Y8J/MERN-Stack-Web-Development.jpg",
      },
      {
        id: 4,
        title: "Python for Data Science & Machine Learning",
        category: "Data Science",
        instructor: "Dr. Farhan Ahmed",
        progress: 100,
        completedLessons: 60,
        totalLessons: 60,
        certificateEarned: true,
        certificateId: "CERT-PY-882194",
        completedDate: "Sep 28, 2026",
        directImage:
          "https://i.ibb.co.com/b5F5k3SQ/Python-for-Data-Science-Machine-Learning.jpg",
      },
    ];
  });

  // Order history state (synced with localStorage)
  const [orderHistory, setOrderHistory] = useState(() => {
    try {
      const saved = localStorage.getItem("orderHistory");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn("Could not parse orderHistory", e);
    }
    return [
      {
        orderId: "EDU-647835",
        orderDate: "Oct 11, 2026",
        paymentMethod: "bKash",
        trxId: "TXN-984210",
        grandTotal: 7500,
        items: [
          {
            title: "Frontend Mastery (React & Next.js)",
            price: 7500,
          },
        ],
      },
    ];
  });

  // Certificate Modal State
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [studentName, setStudentName] = useState(() => {
    return localStorage.getItem("studentName") || "Ashik Siddike";
  });

  // Keep localStorage updated when progress changes
  useEffect(() => {
    localStorage.setItem("enrolledCourses", JSON.stringify(enrolledCourses));
  }, [enrolledCourses]);

  // Handle increasing lesson progress for demo interactivity
  const handleCompleteLesson = (courseId) => {
    setEnrolledCourses((prev) =>
      prev.map((c) => {
        if (c.id === courseId) {
          const nextCompleted = Math.min((c.completedLessons || 0) + 1, c.totalLessons || 40);
          const nextProgress = Math.round((nextCompleted / (c.totalLessons || 40)) * 100);
          const isDone = nextProgress === 100;
          return {
            ...c,
            completedLessons: nextCompleted,
            progress: nextProgress,
            certificateEarned: isDone ? true : c.certificateEarned,
            certificateId: isDone && !c.certificateId ? `CERT-ED-${Math.floor(100000 + Math.random() * 900000)}` : c.certificateId,
            completedDate: isDone && !c.completedDate ? "Today" : c.completedDate,
          };
        }
        return c;
      })
    );
  };

  // Safe image helper
  const getCourseImg = (c) => {
    if (c?.directImage && c.directImage.startsWith("http")) return c.directImage;
    if (c?.image && c.image.startsWith("http") && !c.image.includes("PASTE_YOUR")) return c.image;
    return "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop";
  };

  // Overall stats
  const totalEnrolled = enrolledCourses.length;
  const completedCount = enrolledCourses.filter((c) => c.progress === 100).length;
  const inProgressCount = totalEnrolled - completedCount;
  const totalCertificates = enrolledCourses.filter((c) => c.certificateEarned).length;

  return (
    <div className="w-full min-h-screen bg-[#12131a] text-gray-200 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Profile & Welcome Banner */}
        <div className="relative rounded-3xl bg-gradient-to-r from-[#191b24] via-[#212430] to-[#191b24] p-6 sm:p-8 border border-gray-800 shadow-xl overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#b0401d] to-[#df5d2c] flex items-center justify-center text-white text-2xl font-serif font-black shadow-lg shadow-orange-950/50">
              {studentName.charAt(0)}
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-800 text-emerald-400 text-[11px] font-semibold mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>Active Student Account</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-serif font-bold text-white">
                Welcome back, {studentName}!
              </h1>
              <p className="text-xs text-gray-400 mt-0.5">
                Track your course progress, download credentials, and continue your tech career roadmap.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate("courses")}
              className="py-2.5 px-4 rounded-xl bg-[#212430] hover:bg-[#2a2e3d] text-gray-200 hover:text-white border border-gray-700 text-xs font-semibold cursor-pointer transition shadow"
            >
              + Explore New Courses
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-[#191b24] p-4 sm:p-5 rounded-2xl border border-gray-800 shadow space-y-1">
            <span className="text-[11px] text-gray-400 uppercase tracking-wider block">Enrolled Courses</span>
            <span className="text-2xl font-bold font-mono text-white">{totalEnrolled}</span>
            <span className="text-[11px] text-orange-400 block">{inProgressCount} in progress</span>
          </div>

          <div className="bg-[#191b24] p-4 sm:p-5 rounded-2xl border border-gray-800 shadow space-y-1">
            <span className="text-[11px] text-gray-400 uppercase tracking-wider block">Completed</span>
            <span className="text-2xl font-bold font-mono text-emerald-400">{completedCount}</span>
            <span className="text-[11px] text-gray-400 block">Graduated tracks</span>
          </div>

          <div className="bg-[#191b24] p-4 sm:p-5 rounded-2xl border border-gray-800 shadow space-y-1">
            <span className="text-[11px] text-gray-400 uppercase tracking-wider block">Certificates</span>
            <span className="text-2xl font-bold font-mono text-amber-400">{totalCertificates}</span>
            <span className="text-[11px] text-gray-400 block">Verified credentials</span>
          </div>

          <div className="bg-[#191b24] p-4 sm:p-5 rounded-2xl border border-gray-800 shadow space-y-1">
            <span className="text-[11px] text-gray-400 uppercase tracking-wider block">Study Hours</span>
            <span className="text-2xl font-bold font-mono text-cyan-400">54 hrs</span>
            <span className="text-[11px] text-gray-400 block">This month</span>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
          <button
            type="button"
            onClick={() => setActiveTab("courses")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer flex items-center gap-2 ${
              activeTab === "courses"
                ? "bg-gradient-to-r from-[#b0401d] to-[#df5d2c] text-white shadow"
                : "text-gray-400 hover:text-white hover:bg-gray-800/60"
            }`}
          >
            <span>My Enrolled Courses</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-black/40">
              {enrolledCourses.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("certificates")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer flex items-center gap-2 ${
              activeTab === "certificates"
                ? "bg-gradient-to-r from-[#b0401d] to-[#df5d2c] text-white shadow"
                : "text-gray-400 hover:text-white hover:bg-gray-800/60"
            }`}
          >
            <span>Certificates &amp; Diplomas</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-black/40">
              {totalCertificates}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("orders")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer flex items-center gap-2 ${
              activeTab === "orders"
                ? "bg-gradient-to-r from-[#b0401d] to-[#df5d2c] text-white shadow"
                : "text-gray-400 hover:text-white hover:bg-gray-800/60"
            }`}
          >
            <span>Order &amp; Payment History</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-black/40">
              {orderHistory.length}
            </span>
          </button>
        </div>

        {/* TAB 1: Enrolled Courses List */}
        {activeTab === "courses" && (
          <div className="space-y-4">
            {enrolledCourses.length === 0 ? (
              <div className="text-center py-16 bg-[#191b24] rounded-3xl border border-gray-800">
                <p className="text-gray-400 text-xs">No courses enrolled yet.</p>
                <button
                  type="button"
                  onClick={() => onNavigate("courses")}
                  className="mt-4 px-4 py-2 rounded-xl bg-gradient-to-r from-[#b0401d] to-[#df5d2c] text-white text-xs font-semibold"
                >
                  Explore Course Catalog
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrolledCourses.map((course) => {
                  const isFinished = course.progress === 100;
                  return (
                    <div
                      key={course.id}
                      className="bg-[#191b24] border border-gray-800 rounded-3xl overflow-hidden shadow-lg flex flex-col justify-between hover:border-gray-700 transition"
                    >
                      <div>
                        {/* Course Image */}
                        <div className="relative aspect-video w-full bg-[#14161f] overflow-hidden">
                          <img
                            src={getCourseImg(course)}
                            alt={course.title}
                            onError={(e) => {
                              e.currentTarget.src =
                                "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop";
                            }}
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-semibold uppercase bg-black/75 text-orange-400 border border-orange-500/30">
                            {course.category}
                          </span>
                          {isFinished && (
                            <span className="absolute top-3 right-3 px-2 py-0.5 rounded text-[10px] font-bold text-white bg-emerald-600 shadow">
                              Completed 🏆
                            </span>
                          )}
                        </div>

                        {/* Info & Progress */}
                        <div className="p-5 space-y-4">
                          <div>
                            <h3 className="text-base font-serif font-bold text-white leading-tight">
                              {course.title}
                            </h3>
                            <p className="text-xs text-gray-400 mt-1">
                              Instructor: <span className="text-gray-300">{course.instructor || "Lead Mentor"}</span>
                            </p>
                          </div>

                          {/* Progress Bar */}
                          <div className="space-y-1.5 bg-[#212430] p-3 rounded-2xl border border-gray-800">
                            <div className="flex justify-between items-center text-xs">
                              <span className="text-gray-400 text-[11px]">Track Completion</span>
                              <span className="font-mono font-bold text-white">{course.progress}%</span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-gray-800 overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all duration-500 ${
                                  isFinished
                                    ? "bg-emerald-500"
                                    : "bg-gradient-to-r from-[#b0401d] to-[#df5d2c]"
                                }`}
                                style={{ width: `${course.progress}%` }}
                              />
                            </div>
                            <div className="flex justify-between text-[11px] text-gray-400 pt-0.5">
                              <span>
                                {course.completedLessons || 0} of {course.totalLessons || 40} lessons completed
                              </span>
                            </div>
                          </div>

                          {course.nextLesson && !isFinished && (
                            <div className="p-2.5 rounded-xl bg-orange-950/30 border border-orange-900/40 text-[11px] text-orange-300 flex items-center gap-2">
                              <span className="shrink-0 text-orange-400">▶</span>
                              <span className="truncate">Up next: {course.nextLesson}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="p-5 pt-0 flex gap-2">
                        {isFinished ? (
                          <button
                            type="button"
                            onClick={() => setSelectedCertificate(course)}
                            className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:opacity-95 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow cursor-pointer transition"
                          >
                            <span>🎓 View Certificate</span>
                          </button>
                        ) : (
                          <>
                            <button
                              type="button"
                              onClick={() => {
                                if (onSelectCourse) {
                                  onSelectCourse(course.id);
                                } else {
                                  onNavigate("course-details", course.id);
                                }
                              }}
                              className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#b0401d] to-[#df5d2c] hover:opacity-95 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow cursor-pointer transition"
                            >
                              <span>Continue Study</span>
                              <span>→</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => handleCompleteLesson(course.id)}
                              className="py-2.5 px-3 rounded-xl bg-[#212430] hover:bg-[#2a2e3d] text-emerald-400 border border-gray-700 text-xs font-bold transition cursor-pointer"
                              title="Simulate finishing a lesson"
                            >
                              +1 Lesson
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Certificates List */}
        {activeTab === "certificates" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses
                .filter((c) => c.certificateEarned)
                .map((course) => (
                  <div
                    key={course.id}
                    className="bg-[#191b24] border border-amber-500/40 rounded-3xl p-6 shadow-xl space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-2xl">
                        🏅
                      </div>
                      <div>
                        <span className="text-[10px] text-amber-400 font-mono uppercase font-bold tracking-wider">
                          Official Certificate of Completion
                        </span>
                        <h3 className="text-lg font-serif font-bold text-white mt-1">
                          {course.title}
                        </h3>
                        <p className="text-xs text-gray-400 mt-1">
                          Recipient: <span className="text-white font-medium">{studentName}</span>
                        </p>
                      </div>
                      <div className="p-3 rounded-xl bg-[#212430] text-[11px] space-y-1 font-mono text-gray-300">
                        <div>Credential ID: {course.certificateId || "CERT-ED-782194"}</div>
                        <div>Awarded: {course.completedDate || "Recent"}</div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedCertificate(course)}
                      className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:opacity-95 text-white text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition shadow"
                    >
                      <span>Open Certificate &amp; Download</span>
                      <span>→</span>
                    </button>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* TAB 3: Order History */}
        {activeTab === "orders" && (
          <div className="bg-[#191b24] rounded-3xl border border-gray-800 overflow-hidden shadow-lg divide-y divide-gray-800">
            <div className="p-4 sm:p-5 bg-[#161822] flex items-center justify-between text-xs font-bold uppercase tracking-wider text-gray-400">
              <span>Order Reference &amp; Items</span>
              <span className="hidden sm:inline">Payment</span>
              <span>Total Paid</span>
            </div>

            {orderHistory.map((order, idx) => (
              <div key={idx} className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-white">{order.orderId}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-950/60 text-emerald-400 border border-emerald-800">
                      Completed &amp; Active
                    </span>
                  </div>
                  <p className="text-gray-400 mt-1">
                    Date: {order.orderDate} • {order.items?.length || 1} items enrolled
                  </p>
                  <p className="text-gray-300 text-[11px] mt-0.5">
                    {order.items?.map((it) => it.title).join(", ")}
                  </p>
                </div>

                <div className="hidden sm:block text-gray-300">
                  <span className="block font-medium uppercase">{order.paymentMethod}</span>
                  <span className="text-[11px] font-mono text-gray-400">{order.trxId}</span>
                </div>

                <div className="text-right">
                  <span className="text-sm font-bold font-mono text-[#df5d2c] block">
                    ৳{Number(order.grandTotal).toLocaleString()}
                  </span>
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="text-[11px] text-gray-400 hover:text-white underline cursor-pointer mt-0.5"
                  >
                    Print Receipt
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Certificate Modal */}
        {selectedCertificate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
            <div className="relative w-full max-w-3xl bg-[#191b24] border border-amber-500/40 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
              <button
                type="button"
                onClick={() => setSelectedCertificate(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-800 text-gray-300 hover:text-white flex items-center justify-center cursor-pointer transition text-xs"
              >
                ✕
              </button>

              {/* Printable Certificate Frame */}
              <div className="border-4 border-double border-amber-500/60 p-6 sm:p-10 rounded-2xl bg-gradient-to-b from-[#1c1f2b] to-[#14161f] text-center space-y-6 relative overflow-hidden">
                <div className="space-y-1">
                  <span className="text-xs uppercase tracking-widest text-amber-400 font-mono font-bold block">
                    Edutech Learning Academy
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-serif font-black text-white">
                    Certificate of Completion
                  </h2>
                  <p className="text-xs text-gray-400">
                    This official certificate is proudly awarded to
                  </p>
                </div>

                <div className="py-2 border-b border-amber-500/30 max-w-md mx-auto">
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="text-2xl sm:text-3xl font-serif font-bold text-white text-center bg-transparent focus:outline-none w-full border-b border-dashed border-gray-600 focus:border-amber-400"
                    title="Click to customize your student name"
                  />
                  <span className="text-[10px] text-gray-500 block mt-1">(Click name above to edit)</span>
                </div>

                <p className="text-xs sm:text-sm text-gray-300 max-w-lg mx-auto leading-relaxed">
                  for successfully mastering the curriculum and fulfilling all practical project requirements for{" "}
                  <strong className="text-white block mt-1 text-base font-serif">
                    {selectedCertificate.title}
                  </strong>
                </p>

                {/* Seal & Signatures */}
                <div className="grid grid-cols-3 items-center pt-6 border-t border-gray-800 text-xs">
                  <div>
                    <span className="font-mono text-gray-300 font-semibold block">{selectedCertificate.instructor || "Rahat Chowdhury"}</span>
                    <span className="text-[10px] text-gray-400">Lead Instructor</span>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-600 flex items-center justify-center text-white text-xl shadow-lg border-2 border-white/40">
                      ★
                    </div>
                    <span className="text-[9px] font-mono text-amber-400 uppercase mt-1">Verified Credential</span>
                  </div>

                  <div>
                    <span className="font-mono text-gray-300 font-semibold block">{selectedCertificate.completedDate || "Oct 2026"}</span>
                    <span className="text-[10px] text-gray-400">Issuing Date</span>
                  </div>
                </div>

                <div className="text-[10px] font-mono text-gray-500">
                  Verification ID: {selectedCertificate.certificateId || "CERT-ED-882194"} • edutech.academy/verify
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:opacity-95 text-white text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition shadow-lg"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  <span>Download / Print Official PDF</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedCertificate(null)}
                  className="py-3 px-5 rounded-xl bg-[#212430] hover:bg-[#2a2e3d] text-gray-300 text-xs font-semibold cursor-pointer transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
