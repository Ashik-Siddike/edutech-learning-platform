// Contact Page with inquiry form, campus details, office hours, and interactive FAQ accordion
import { useState } from "react";

export default function ContactPage({ onShowToast }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Full Stack Web (MERN)",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      q: "Are the classes conducted online or offline?",
      a: "We offer both flexible online live interactive batches (streamed via Zoom with recording access) and hands-on weekend offline lab sessions at our Dhanmondi campus.",
    },
    {
      q: "Do I need a Computer Science background to join?",
      a: "No prior CS degree is required. Our beginner-friendly tracks start from fundamental problem-solving concepts and progress to advanced architectures with dedicated mentor support.",
    },
    {
      q: "Can I pay the course fee in installments?",
      a: "Yes! All courses priced above ৳5,000 can be paid in 2 or 3 convenient monthly installments without any additional charges or interest.",
    },
    {
      q: "How does the job placement support work?",
      a: "After completing your capstone project, our placement cell conducts mock technical interviews, optimizes your GitHub and resume, and arranges direct interview opportunities with 120+ partner tech companies.",
    },
    {
      q: "Will I receive an industry-recognized certificate?",
      a: "Yes, upon passing your capstone assessments and project defense, you will receive a verifiable digital certificate with a unique verification URL for LinkedIn and resumes.",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (onShowToast) {
      onShowToast(
        `Thank you, ${formData.name}! Your message has been received. Our counselor will call you shortly.`
      );
    }
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "Full Stack Web (MERN)",
      message: "",
    });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="w-full text-white animate-fadeIn pb-20">
      {/* Header */}
      <section className="relative overflow-hidden bg-[#161822] border-b border-gray-800 py-16 text-center">
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-orange-600/10 blur-3xl pointer-events-none" />
        <div className="max-w-3xl mx-auto px-4 relative z-10 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#6e3333]/50 text-orange-200 border border-orange-900/60">
            Admissions & Student Support
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            Contact & Academic Support
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-xl mx-auto">
            Have questions regarding admissions, curriculum, payment plans, or career counseling? Reach out directly to our team.
          </p>
        </div>
      </section>

      {/* Main Grid: Info + Contact Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Contact Information */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-2xl font-serif font-bold text-white">
              Get in Touch Directly
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              Visit our innovation campus, give us a phone call, or send an inquiry. Our admissions office is open 6 days a week.
            </p>

            <div className="space-y-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#212430] border border-gray-700/60 flex items-start gap-3.5 shadow-lg">
                <div className="w-10 h-10 rounded-xl bg-orange-950/60 text-orange-400 border border-orange-800/40 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
                    Campus Location
                  </h3>
                  <p className="text-xs text-gray-300 mt-0.5">
                    Level 7, Software Technology Park, Dhanmondi 27, Dhaka - 1205, Bangladesh
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#212430] border border-gray-700/60 flex items-start gap-3.5 shadow-lg">
                <div className="w-10 h-10 rounded-xl bg-cyan-950/60 text-cyan-400 border border-cyan-800/40 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
                    Hotline & WhatsApp
                  </h3>
                  <p className="text-xs text-gray-300 mt-0.5">
                    +880 1712-345678 / +880 1987-654321
                  </p>
                  <p className="text-[11px] text-gray-400">
                    Available: Sat - Thu (10:00 AM - 8:00 PM)
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#212430] border border-gray-700/60 flex items-start gap-3.5 shadow-lg">
                <div className="w-10 h-10 rounded-xl bg-emerald-950/60 text-emerald-400 border border-emerald-800/40 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
                    Official Email
                  </h3>
                  <p className="text-xs text-gray-300 mt-0.5">
                    admissions@tawhidacademy.com
                  </p>
                  <p className="text-[11px] text-gray-400">
                    support@tawhidacademy.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#212430] border border-gray-700 shadow-2xl relative">
              <h3 className="text-xl font-serif font-bold text-white mb-1">
                Send an Inquiry Message
              </h3>
              <p className="text-xs text-gray-400 mb-6">
                Fill in the details below and an academic counselor will connect with you within 2 business hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Tanvir Hasan"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#191b24] border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. tanvir@example.com"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#191b24] border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 01712345678"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#191b24] border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">
                      Course of Interest
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#191b24] border border-gray-700 text-white focus:outline-none focus:border-orange-500 cursor-pointer"
                    >
                      <option>Full Stack Web (MERN)</option>
                      <option>Frontend Mastery (React & Next.js)</option>
                      <option>Python, Django & Machine Learning</option>
                      <option>DevOps & Cloud Computing</option>
                      <option>Mobile App Development (Flutter)</option>
                      <option>UI/UX & Product Design</option>
                      <option>General Admission Inquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">
                    Your Message / Question *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your learning goals or any questions you have..."
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#191b24] border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl font-semibold text-xs text-white bg-gradient-to-r from-[#b0401d] via-[#c44c25] to-[#df5d2c] hover:opacity-95 shadow-xl shadow-orange-950/40 transition active:scale-95 cursor-pointer"
                >
                  Send Inquiry Message →
                </button>
              </form>

              {submitted && (
                <div className="mt-4 p-3 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs text-center font-medium flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Message sent successfully! We will get in touch with you shortly.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="text-center mb-10">
          <span className="text-xs font-semibold uppercase tracking-wider text-orange-400">
            Got Questions?
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-[#212430] border border-gray-700/70 overflow-hidden transition"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                  className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-serif font-semibold text-white hover:text-orange-300 transition cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <span className="text-orange-400 text-base font-bold ml-3">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-gray-300 leading-relaxed border-t border-gray-800/80">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
