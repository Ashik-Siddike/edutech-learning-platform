import { useState } from "react";
import useApiCall from "../hooks/useApiCall";
import { availableCoupons, validateAndCalculateCoupon } from "../data/couponsData";

export default function CheckoutPage({
  cart = [],
  onRemoveFromCart,
  onClearCart,
  onNavigate,
  onShowToast,
  appliedCoupon = null,
  onApplyCoupon,
  onRemoveCoupon,
}) {
  // Order submission API call hook
  const orderApi = useApiCall();

  // Form states
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    division: "Dhaka",
    orderNotes: "",
  });

  const [formErrors, setFormErrors] = useState({});

  // Payment method selection: "bkash" | "nagad" | "rocket" | "card" | "cod"
  const [paymentMethod, setPaymentMethod] = useState("bkash");
  const [paymentDetails, setPaymentDetails] = useState({
    senderNumber: "",
    trxId: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
  });

  // Coupon state
  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState("");
  const [showAvailableCoupons, setShowAvailableCoupons] = useState(false);

  // Completed order invoice state
  const [orderPlaced, setOrderPlaced] = useState(null);

  // Fallback image helper to prevent broken images
  const getItemImage = (item) => {
    if (item?.directImage && typeof item.directImage === "string" && item.directImage.startsWith("http")) {
      return item.directImage;
    }
    if (
      item?.image &&
      typeof item.image === "string" &&
      item.image.startsWith("http") &&
      !item.image.includes("PASTE_YOUR")
    ) {
      return item.image;
    }
    if (item?.thumbnail && typeof item.thumbnail === "string" && item.thumbnail.startsWith("http")) {
      return item.thumbnail;
    }
    return "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=400&auto=format&fit=crop";
  };

  // Cart financial calculations
  const subtotal = cart.reduce((sum, item) => sum + (Number(item.price) || 0), 0);
  const totalOriginal = cart.reduce(
    (sum, item) => sum + (Number(item.originalPrice) || Number(item.price) || 0),
    0
  );
  const originalSavings = totalOriginal > subtotal ? totalOriginal - subtotal : 0;

  // Check if cart contains physical goods (products) vs digital courses
  const hasPhysicalProducts = cart.some((item) => String(item.id).startsWith("prod-"));
  const shippingFee = hasPhysicalProducts ? 60 : 0; // Free for digital courses

  // Coupon discount calculation using centralized validation engine
  let couponDiscount = 0;
  if (appliedCoupon) {
    const calc = validateAndCalculateCoupon(appliedCoupon.code, subtotal);
    if (calc.isValid) {
      couponDiscount = calc.discount;
    }
  }

  const grandTotal = Math.max(0, subtotal - couponDiscount + shippingFee);

  // Form input change handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Payment details input change handler
  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prev) => ({ ...prev, [name]: value }));
  };

  // Apply promo coupon
  const handleApplyCoupon = (e) => {
    e?.preventDefault();
    setCouponError("");
    const cleanedCode = couponInput.trim();

    if (!cleanedCode) {
      setCouponError("Please enter a valid coupon code.");
      return;
    }

    const result = validateAndCalculateCoupon(cleanedCode, subtotal);
    if (result.isValid && onApplyCoupon) {
      onApplyCoupon(result.coupon);
      setCouponInput("");
      setCouponError("");
      if (onShowToast) onShowToast(result.message);
    } else {
      setCouponError(result.message);
    }
  };

  // Quick coupon apply helper
  const handleQuickCoupon = (code) => {
    setCouponError("");
    const result = validateAndCalculateCoupon(code, subtotal);
    if (result.isValid && onApplyCoupon) {
      onApplyCoupon(result.coupon);
      setCouponInput("");
      if (onShowToast) onShowToast(result.message);
    } else {
      setCouponError(result.message);
    }
  };

  // Remove / Clear applied coupon
  const handleRemoveCoupon = () => {
    if (onRemoveCoupon) {
      onRemoveCoupon();
    }
    setCouponError("");
  };

  // Form validation before order placement
  const validateForm = () => {
    const errors = {};
    if (!formData.fullName.trim()) errors.fullName = "Full name is required.";
    if (!formData.email.trim()) {
      errors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address.";
    }

    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required.";
    } else if (!/^01[3-9]\d{8}$/.test(formData.phone.replace(/[\s-]/g, ""))) {
      errors.phone = "Enter a valid 11-digit Bangladeshi mobile number (01XXXXXXXXX).";
    }

    if (hasPhysicalProducts && !formData.address.trim()) {
      errors.address = "Delivery address is required for physical store items.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle order submission using production useApiCall hook
  const handleSubmitOrder = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      if (onShowToast) onShowToast("Please fill in all required fields properly.");
      return;
    }

    const generatedTrxId =
      paymentDetails.trxId.trim() ||
      `TXN-${Math.floor(100000 + Math.random() * 900000)}`;

    const orderPayload = {
      title: `Order by ${formData.fullName}`,
      userId: 1,
      order: {
        customer: formData,
        items: cart,
        payment: {
          method: paymentMethod,
          senderNumber: paymentDetails.senderNumber || formData.phone,
          trxId: generatedTrxId,
          status: "Confirmed",
        },
        pricing: {
          subtotal,
          couponDiscount,
          shippingFee,
          grandTotal,
        },
        orderDate: new Date().toISOString(),
      },
    };

    // Use our enterprise useApiCall hook with apiFetcher & callback
    orderApi.apiFetcher({
      options: {
        method: "POST",
        url: "/posts/add",
        data: orderPayload,
      },
      callback: () => {
        // Construct printable invoice on success
        const invoiceData = {
          orderId: `EDU-${Math.floor(100000 + Math.random() * 900000)}`,
          orderDate: new Date().toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
          customer: { ...formData },
          items: [...cart],
          paymentMethod,
          trxId: generatedTrxId,
          subtotal,
          couponDiscount,
          shippingFee,
          grandTotal,
        };

        setOrderPlaced(invoiceData);

        // Save to localStorage for Student Dashboard
        try {
          const prevOrders = JSON.parse(localStorage.getItem("orderHistory") || "[]");
          localStorage.setItem("orderHistory", JSON.stringify([invoiceData, ...prevOrders]));

          const prevEnrolled = JSON.parse(localStorage.getItem("enrolledCourses") || "[]");
          const newEnrolledCourses = cart
            .filter((item) => !String(item.id).startsWith("prod-"))
            .map((c) => ({
              ...c,
              enrolledAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
              progress: 25, // Starting progress
              completedLessons: 4,
              totalLessons: c.lessonsCount || 40,
            }));

          const mergedEnrolled = [...prevEnrolled];
          newEnrolledCourses.forEach((c) => {
            if (!mergedEnrolled.some((m) => m.id === c.id)) {
              mergedEnrolled.push(c);
            }
          });
          localStorage.setItem("enrolledCourses", JSON.stringify(mergedEnrolled));
        } catch (err) {
          console.warn("Could not save to localStorage:", err);
        }

        if (onClearCart) onClearCart();
        window.scrollTo({ top: 0, behavior: "smooth" });
        if (onShowToast) onShowToast("Order confirmed successfully!");
      },
    });
  };

  // 1. RENDER: If Order has been placed successfully -> Show Receipt / Invoice Screen
  if (orderPlaced) {
    return (
      <div className="w-full min-h-screen bg-[#12131a] text-gray-200 py-12 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Success Banner */}
          <div className="text-center space-y-3 bg-gradient-to-b from-[#212430] to-[#191b24] p-8 rounded-3xl border border-emerald-500/30 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center mx-auto text-emerald-400">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-black text-white">
              Enrollment &amp; Order Confirmed!
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 max-w-md mx-auto">
              Thank you, <span className="text-white font-semibold">{orderPlaced.customer.fullName}</span>! Your order has been recorded and learning credentials have been prepared.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-800 text-emerald-400 text-xs font-mono font-semibold">
              <span>Order Reference: {orderPlaced.orderId}</span>
            </div>
          </div>

          {/* Printable Invoice Card */}
          <div className="bg-[#191b24] rounded-3xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
            {/* Invoice Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-gray-800">
              <div>
                <span className="text-xs text-orange-400 font-semibold uppercase tracking-wider">Official Invoice</span>
                <h2 className="text-xl font-serif font-bold text-white">Edutech Learning Platform</h2>
                <p className="text-xs text-gray-400 mt-0.5">Order Date: {orderPlaced.orderDate}</p>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-xs text-gray-400 block">Payment Method</span>
                <span className="text-sm font-semibold text-white uppercase">{orderPlaced.paymentMethod}</span>
                <span className="text-[11px] font-mono text-gray-400 block">TrxID: {orderPlaced.trxId}</span>
              </div>
            </div>

            {/* Customer Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-[#212430] text-xs">
              <div>
                <span className="text-gray-400 block text-[11px]">Billed To:</span>
                <span className="font-semibold text-white text-sm block">{orderPlaced.customer.fullName}</span>
                <span className="text-gray-300 block">{orderPlaced.customer.email}</span>
                <span className="text-gray-300 block">{orderPlaced.customer.phone}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[11px]">Delivery / Region:</span>
                <span className="text-gray-300 block">{orderPlaced.customer.division} Division, Bangladesh</span>
                {orderPlaced.customer.address && (
                  <span className="text-gray-400 block mt-0.5">{orderPlaced.customer.address}</span>
                )}
              </div>
            </div>

            {/* Items Table */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Enrolled Items &amp; Products</h3>
              <div className="divide-y divide-gray-800 border-y border-gray-800">
                {orderPlaced.items.map((item, idx) => (
                  <div key={idx} className="py-3 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#212430] overflow-hidden shrink-0 border border-gray-700 flex items-center justify-center">
                        <img
                          src={getItemImage(item)}
                          alt={item.title}
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=400&auto=format&fit=crop";
                          }}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <span className="font-semibold text-white block">{item.title}</span>
                        <span className="text-[11px] text-gray-400">
                          {item.id?.toString().startsWith("prod-") ? "Store Product" : "Course Track"}
                        </span>
                      </div>
                    </div>
                    <span className="font-mono font-semibold text-white">
                      ৳{Number(item.price).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Total Financial Summary */}
            <div className="space-y-2 pt-2 text-xs">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal</span>
                <span className="font-mono text-white">৳{orderPlaced.subtotal.toLocaleString()}</span>
              </div>
              {orderPlaced.couponDiscount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Special Promo Discount</span>
                  <span className="font-mono">-৳{orderPlaced.couponDiscount.toLocaleString()}</span>
                </div>
              )}
              {orderPlaced.shippingFee > 0 && (
                <div className="flex justify-between text-gray-400">
                  <span>Standard Shipping</span>
                  <span className="font-mono text-white">৳{orderPlaced.shippingFee}</span>
                </div>
              )}
              <div className="flex justify-between items-center text-sm sm:text-base font-bold text-white pt-3 border-t border-gray-800">
                <span>Grand Total Paid</span>
                <span className="font-mono text-xl text-[#df5d2c]">৳{orderPlaced.grandTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => onNavigate("dashboard")}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:opacity-95 text-white text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition shadow-lg"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span>Go to Student Dashboard</span>
              </button>

              <button
                type="button"
                onClick={() => window.print()}
                className="py-3 px-4 rounded-xl bg-[#212430] hover:bg-[#2a2e3d] text-gray-200 hover:text-white border border-gray-700 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                <span>Print Invoice</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate("courses")}
                className="py-3 px-4 rounded-xl bg-[#212430] hover:bg-[#2a2e3d] text-gray-300 hover:text-white border border-gray-700 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition"
              >
                <span>Browse More</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. RENDER: If Cart is empty -> Prompt user to add courses/products
  if (cart.length === 0) {
    return (
      <div className="w-full min-h-[70vh] bg-[#12131a] flex items-center justify-center py-16 px-4 font-sans text-center">
        <div className="max-w-md w-full bg-[#191b24] p-8 rounded-3xl border border-gray-800 shadow-2xl space-y-5">
          <div className="w-16 h-16 rounded-2xl bg-[#212430] border border-gray-700 flex items-center justify-center mx-auto text-gray-400">
            <svg className="w-8 h-8 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h2 className="text-xl font-serif font-bold text-white">Your Cart is Currently Empty</h2>
          <p className="text-xs text-gray-400 leading-relaxed">
            Please select at least one course track or store item to proceed to the checkout page.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => onNavigate("courses")}
              className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#b0401d] to-[#df5d2c] text-white text-xs font-semibold cursor-pointer transition shadow"
            >
              Browse Courses
            </button>
            <button
              type="button"
              onClick={() => onNavigate("products")}
              className="flex-1 py-2.5 px-4 rounded-xl bg-[#212430] hover:bg-[#2a2e3d] text-gray-200 border border-gray-700 text-xs font-semibold cursor-pointer transition"
            >
              Visit Store
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 3. RENDER: Standard 2-Column Checkout Form
  return (
    <div className="w-full min-h-screen bg-[#12131a] text-gray-200 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Checkout Header Banner */}
        <div className="relative rounded-3xl bg-gradient-to-r from-[#191b24] via-[#212430] to-[#191b24] p-6 sm:p-8 border border-gray-800 shadow-xl overflow-hidden">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-950/60 border border-orange-700/50 text-orange-400 text-xs font-semibold mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Secure SSL 256-Bit Checkout</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-black text-white">
              Enrollment &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#df5d2c] to-[#f98054]">Checkout</span>
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              Complete your student registration and confirm your payment method below.
            </p>
          </div>
        </div>

        {/* Form & Summary Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (7 cols): Billing Info & Payment Selection */}
          <div className="lg:col-span-7 space-y-6">
            <form onSubmit={handleSubmitOrder} className="space-y-6">
              {/* Student & Billing Information */}
              <div className="bg-[#191b24] p-6 sm:p-7 rounded-3xl border border-gray-800 shadow-lg space-y-5">
                <div className="flex items-center gap-2.5 pb-3 border-b border-gray-800">
                  <div className="w-7 h-7 rounded-lg bg-orange-950/60 text-orange-400 border border-orange-800/40 flex items-center justify-center text-xs font-bold">
                    1
                  </div>
                  <h2 className="text-base font-serif font-bold text-white">
                    Student &amp; Billing Details
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-xs font-medium text-gray-300">
                      Full Name <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g. Ashik Siddike"
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-[#212430] border text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none transition ${
                        formErrors.fullName ? "border-rose-500" : "border-gray-700 focus:border-orange-500"
                      }`}
                    />
                    {formErrors.fullName && (
                      <p className="text-[11px] text-rose-400 mt-0.5">{formErrors.fullName}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-300">
                      Email Address <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="student@example.com"
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-[#212430] border text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none transition ${
                        formErrors.email ? "border-rose-500" : "border-gray-700 focus:border-orange-500"
                      }`}
                    />
                    {formErrors.email && (
                      <p className="text-[11px] text-rose-400 mt-0.5">{formErrors.email}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-300">
                      Phone Number (WhatsApp) <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="017XXXXXXXX"
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-[#212430] border text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none transition ${
                        formErrors.phone ? "border-rose-500" : "border-gray-700 focus:border-orange-500"
                      }`}
                    />
                    {formErrors.phone && (
                      <p className="text-[11px] text-rose-400 mt-0.5">{formErrors.phone}</p>
                    )}
                  </div>

                  {/* Division */}
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-300">Division</label>
                    <select
                      name="division"
                      value={formData.division}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#212430] border border-gray-700 text-xs sm:text-sm text-white focus:outline-none focus:border-orange-500 transition cursor-pointer"
                    >
                      <option value="Dhaka">Dhaka</option>
                      <option value="Chittagong">Chittagong</option>
                      <option value="Sylhet">Sylhet</option>
                      <option value="Rajshahi">Rajshahi</option>
                      <option value="Khulna">Khulna</option>
                      <option value="Barisal">Barisal</option>
                      <option value="Rangpur">Rangpur</option>
                      <option value="Mymensingh">Mymensingh</option>
                    </select>
                  </div>

                  {/* Address */}
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-300">
                      Address {hasPhysicalProducts && <span className="text-rose-400">*</span>}
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Road / House / Area details"
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-[#212430] border text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none transition ${
                        formErrors.address ? "border-rose-500" : "border-gray-700 focus:border-orange-500"
                      }`}
                    />
                    {formErrors.address && (
                      <p className="text-[11px] text-rose-400 mt-0.5">{formErrors.address}</p>
                    )}
                  </div>

                  {/* Order notes */}
                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-xs font-medium text-gray-300">Order Notes (Optional)</label>
                    <textarea
                      name="orderNotes"
                      rows="2"
                      value={formData.orderNotes}
                      onChange={handleInputChange}
                      placeholder="Special instructions or queries..."
                      className="w-full px-3.5 py-2 rounded-xl bg-[#212430] border border-gray-700 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Methods Section */}
              <div className="bg-[#191b24] p-6 sm:p-7 rounded-3xl border border-gray-800 shadow-lg space-y-5">
                <div className="flex items-center gap-2.5 pb-3 border-b border-gray-800">
                  <div className="w-7 h-7 rounded-lg bg-orange-950/60 text-orange-400 border border-orange-800/40 flex items-center justify-center text-xs font-bold">
                    2
                  </div>
                  <h2 className="text-base font-serif font-bold text-white">
                    Select Payment Method
                  </h2>
                </div>

                {/* Radio selection options */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {/* bKash */}
                  <div
                    onClick={() => setPaymentMethod("bkash")}
                    className={`p-3.5 rounded-2xl border text-center cursor-pointer transition flex flex-col items-center justify-center gap-1.5 ${
                      paymentMethod === "bkash"
                        ? "bg-[#e2136e]/15 border-[#e2136e] shadow-lg shadow-[#e2136e]/10"
                        : "bg-[#212430] border-gray-700/70 hover:border-gray-600"
                    }`}
                  >
                    <span className="font-bold text-sm text-[#e2136e]">bKash</span>
                    <span className="text-[10px] text-gray-400">Mobile Banking</span>
                  </div>

                  {/* Nagad */}
                  <div
                    onClick={() => setPaymentMethod("nagad")}
                    className={`p-3.5 rounded-2xl border text-center cursor-pointer transition flex flex-col items-center justify-center gap-1.5 ${
                      paymentMethod === "nagad"
                        ? "bg-[#f7941d]/15 border-[#f7941d] shadow-lg shadow-[#f7941d]/10"
                        : "bg-[#212430] border-gray-700/70 hover:border-gray-600"
                    }`}
                  >
                    <span className="font-bold text-sm text-[#f7941d]">Nagad</span>
                    <span className="text-[10px] text-gray-400">Fast &amp; Secure</span>
                  </div>

                  {/* Credit / Debit Card */}
                  <div
                    onClick={() => setPaymentMethod("card")}
                    className={`p-3.5 rounded-2xl border text-center cursor-pointer transition flex flex-col items-center justify-center gap-1.5 ${
                      paymentMethod === "card"
                        ? "bg-blue-600/15 border-blue-500 shadow-lg shadow-blue-600/10"
                        : "bg-[#212430] border-gray-700/70 hover:border-gray-600"
                    }`}
                  >
                    <span className="font-bold text-sm text-blue-400">Card</span>
                    <span className="text-[10px] text-gray-400">Visa / Mastercard</span>
                  </div>

                  {/* Cash On Delivery / In-Person */}
                  <div
                    onClick={() => setPaymentMethod("cod")}
                    className={`p-3.5 rounded-2xl border text-center cursor-pointer transition flex flex-col items-center justify-center gap-1.5 ${
                      paymentMethod === "cod"
                        ? "bg-emerald-600/15 border-emerald-500 shadow-lg shadow-emerald-600/10"
                        : "bg-[#212430] border-gray-700/70 hover:border-gray-600"
                    }`}
                  >
                    <span className="font-bold text-sm text-emerald-400">Cash / Campus</span>
                    <span className="text-[10px] text-gray-400">Pay on counter</span>
                  </div>
                </div>

                {/* Sub-form based on selected payment method */}
                {(paymentMethod === "bkash" || paymentMethod === "nagad") && (
                  <div className="p-4 rounded-2xl bg-[#212430] border border-gray-700 space-y-3 text-xs">
                    <div className="flex items-center justify-between text-gray-300">
                      <span>Merchant / Send-Money No:</span>
                      <span className="font-mono font-bold text-white">01712-345678 (Personal)</span>
                    </div>
                    <p className="text-[11px] text-gray-400 leading-relaxed">
                      Please send <strong className="text-white">৳{grandTotal.toLocaleString()}</strong> to the above {paymentMethod.toUpperCase()} number and enter your Transaction ID below:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div>
                        <label className="text-[11px] text-gray-400 block mb-1">Your Sender Mobile No.</label>
                        <input
                          type="text"
                          name="senderNumber"
                          value={paymentDetails.senderNumber}
                          onChange={handlePaymentChange}
                          placeholder="e.g. 018XXXXXXXX"
                          className="w-full px-3 py-2 rounded-xl bg-[#191b24] border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-gray-400 block mb-1">Transaction ID (TrxID)</label>
                        <input
                          type="text"
                          name="trxId"
                          value={paymentDetails.trxId}
                          onChange={handlePaymentChange}
                          placeholder="e.g. 9J4K2L8A"
                          className="w-full px-3 py-2 rounded-xl bg-[#191b24] border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 font-mono uppercase"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "card" && (
                  <div className="p-4 rounded-2xl bg-[#212430] border border-gray-700 space-y-3 text-xs">
                    <div className="space-y-1">
                      <label className="text-[11px] text-gray-400">Card Number</label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={paymentDetails.cardNumber}
                        onChange={handlePaymentChange}
                        placeholder="4242 •••• •••• 4242"
                        className="w-full px-3 py-2 rounded-xl bg-[#191b24] border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] text-gray-400">Expiry Date</label>
                        <input
                          type="text"
                          name="cardExpiry"
                          value={paymentDetails.cardExpiry}
                          onChange={handlePaymentChange}
                          placeholder="MM/YY"
                          className="w-full px-3 py-2 rounded-xl bg-[#191b24] border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-gray-400">CVC / CVV</label>
                        <input
                          type="text"
                          name="cardCvc"
                          value={paymentDetails.cardCvc}
                          onChange={handlePaymentChange}
                          placeholder="123"
                          className="w-full px-3 py-2 rounded-xl bg-[#191b24] border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "cod" && (
                  <div className="p-4 rounded-2xl bg-[#212430] border border-gray-700 text-xs text-gray-300 leading-relaxed">
                    You can pay <strong className="text-white">৳{grandTotal.toLocaleString()}</strong> in person at our campus reception desk or upon physical delivery of course materials.
                  </div>
                )}

                {/* API Error alert if any */}
                {orderApi.isError && (
                  <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs">
                    {orderApi.isError}
                  </div>
                )}

                {/* Submit button inside form */}
                <button
                  type="submit"
                  disabled={orderApi.isLoading}
                  className="w-full py-4 px-6 rounded-2xl font-bold text-sm tracking-wide text-white bg-gradient-to-r from-[#b0401d] via-[#c44c25] to-[#df5d2c] hover:opacity-95 shadow-xl shadow-orange-950/50 transition active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {orderApi.isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Confirming Order &amp; Enrolling via API...</span>
                    </>
                  ) : (
                    <>
                      <span>Complete Enrollment &amp; Pay</span>
                      <span>(৳{grandTotal.toLocaleString()})</span>
                      <span>→</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Right Column (5 cols): Order Summary & Interactive Coupon */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#191b24] p-6 rounded-3xl border border-gray-800 shadow-lg space-y-5 sticky top-24">
              <div className="flex items-center justify-between pb-3 border-b border-gray-800">
                <h3 className="text-base font-serif font-bold text-white">Order Summary</h3>
                <span className="text-xs text-gray-400 font-mono">
                  {cart.length} {cart.length === 1 ? "Item" : "Items"}
                </span>
              </div>

              {/* Items in Cart */}
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-[#212430]/70 border border-gray-800 text-xs"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-10 h-10 rounded-lg bg-[#14161f] overflow-hidden shrink-0 border border-gray-700 flex items-center justify-center">
                        <img
                          src={getItemImage(item)}
                          alt={item.title}
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=400&auto=format&fit=crop";
                          }}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-semibold text-white truncate text-xs">{item.title}</h4>
                        <span className="text-[11px] text-gray-400">
                          {item.id?.toString().startsWith("prod-") ? "Store Product" : "Course Track"}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="font-mono font-bold text-white text-xs">
                        ৳{Number(item.price).toLocaleString()}
                      </span>
                      <button
                        type="button"
                        onClick={() => onRemoveFromCart(item.id)}
                        className="text-gray-500 hover:text-rose-400 transition cursor-pointer text-xs p-1"
                        title="Remove item"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon Box */}
              <div className="pt-2 border-t border-gray-800 space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-gray-300 block">
                    Have a Promo Coupon?
                  </label>
                  {appliedCoupon && (
                    <button
                      type="button"
                      onClick={handleRemoveCoupon}
                      className="text-[11px] font-semibold text-rose-400 hover:text-rose-300 hover:underline flex items-center gap-1 cursor-pointer transition"
                      title="Clear applied coupon"
                    >
                      <span>✕ Clear Coupon</span>
                    </button>
                  )}
                </div>

                {appliedCoupon ? (
                  <div className="p-3 rounded-2xl bg-emerald-950/40 border border-emerald-600/40 flex items-center justify-between text-xs shadow-inner">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-bold">
                          ✓
                        </span>
                        <span className="text-emerald-300 font-bold font-mono text-sm tracking-wide">
                          {appliedCoupon.code}
                        </span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-900/60 text-emerald-300 border border-emerald-700/60">
                          -৳{couponDiscount.toLocaleString()} Saved
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-300 pl-7 leading-relaxed">
                        {appliedCoupon.description || appliedCoupon.desc || "Promo discount applied"}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleRemoveCoupon}
                      className="px-2.5 py-1.5 rounded-lg bg-rose-950/50 hover:bg-rose-900/60 border border-rose-800/60 text-rose-300 hover:text-rose-200 text-[11px] font-semibold cursor-pointer transition shrink-0 ml-2"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        placeholder="Enter Promo Code (e.g. EDUTECH20)"
                        className="flex-1 px-3.5 py-2 rounded-xl bg-[#212430] border border-gray-700 text-xs text-white placeholder-gray-500 uppercase font-mono focus:outline-none focus:border-orange-500 transition"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-[#212430] hover:bg-[#2a2e3d] border border-gray-600 text-xs font-semibold text-white transition cursor-pointer shadow-sm active:scale-95"
                      >
                        Apply
                      </button>
                    </form>

                    {couponError && (
                      <p className="text-[11px] text-rose-400 flex items-center gap-1">
                        <span>⚠</span>
                        <span>{couponError}</span>
                      </p>
                    )}

                    {/* Quick Coupon Badges & Toggle */}
                    <div className="pt-1">
                      <div className="flex items-center justify-between text-[11px] text-gray-400 mb-1.5">
                        <span className="flex items-center gap-1 text-orange-400 font-medium">
                          <span>🎁 Available Promo Codes</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => setShowAvailableCoupons((prev) => !prev)}
                          className="text-gray-400 hover:text-white underline cursor-pointer text-[10px]"
                        >
                          {showAvailableCoupons ? "Hide" : "Show All"}
                        </button>
                      </div>

                      <div className="flex items-center gap-1.5 flex-wrap">
                        {availableCoupons.slice(0, 2).map((c) => (
                          <button
                            key={c.code}
                            type="button"
                            onClick={() => handleQuickCoupon(c.code)}
                            className="px-2 py-1 rounded-lg bg-orange-950/60 border border-orange-800/60 text-orange-300 hover:bg-orange-900/60 cursor-pointer transition text-[10px] font-mono font-bold flex items-center gap-1 active:scale-95"
                          >
                            <span>{c.code}</span>
                            <span className="text-[9px] text-orange-200/80 font-sans font-normal">
                              ({c.type === "percentage" ? `${c.value}% Off` : `৳${c.value} Off`})
                            </span>
                          </button>
                        ))}
                      </div>

                      {showAvailableCoupons && (
                        <div className="mt-2 space-y-1.5 max-h-40 overflow-y-auto pr-1">
                          {availableCoupons.map((c) => (
                            <div
                              key={c.code}
                              className="p-2 rounded-xl bg-[#212430] border border-gray-700/80 flex items-center justify-between gap-2"
                            >
                              <div className="min-w-0">
                                <div className="flex items-center gap-1.5">
                                  <span className="font-mono font-bold text-white text-[11px]">
                                    {c.code}
                                  </span>
                                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-orange-950 text-orange-300 border border-orange-800">
                                    {c.badge}
                                  </span>
                                </div>
                                <span className="text-[10px] text-gray-400 block truncate">
                                  {c.description}
                                </span>
                              </div>

                              <button
                                type="button"
                                onClick={() => handleQuickCoupon(c.code)}
                                className="px-2.5 py-1 rounded-lg bg-[#df5d2c] hover:bg-orange-600 text-white text-[10px] font-semibold cursor-pointer shrink-0 transition"
                              >
                                Apply
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="pt-3 border-t border-gray-800 space-y-2 text-xs">
                <div className="flex justify-between text-gray-400">
                  <span>Cart Subtotal</span>
                  <span className="font-mono text-white">৳{subtotal.toLocaleString()}</span>
                </div>

                {originalSavings > 0 && (
                  <div className="flex justify-between text-gray-400">
                    <span>Course Catalog Savings</span>
                    <span className="font-mono text-emerald-400">-৳{originalSavings.toLocaleString()}</span>
                  </div>
                )}

                {couponDiscount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Promo Coupon Discount</span>
                    <span className="font-mono font-bold">-৳{couponDiscount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between text-gray-400">
                  <span>Processing / Shipping</span>
                  <span className="font-mono text-white">
                    {shippingFee === 0 ? "FREE" : `৳${shippingFee}`}
                  </span>
                </div>

                <div className="pt-3 border-t border-gray-800 flex justify-between items-baseline">
                  <div>
                    <span className="text-sm font-bold text-white block">Grand Total</span>
                    <span className="text-[10px] text-gray-400">Includes all applicable fees</span>
                  </div>
                  <span className="text-2xl font-bold font-mono text-[#df5d2c]">
                    ৳{grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="pt-3 border-t border-gray-800 grid grid-cols-2 gap-2 text-[10px] text-gray-400">
                <div className="flex items-center gap-1.5">
                  <span className="text-emerald-400 text-xs">✓</span>
                  <span>Instant LMS Access</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-emerald-400 text-xs">✓</span>
                  <span>7-Day Refund Policy</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-emerald-400 text-xs">✓</span>
                  <span>Official Certificate</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-emerald-400 text-xs">✓</span>
                  <span>Dedicated Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
