// Master coupons data and business validation logic
export const availableCoupons = [
  {
    code: "EDUTECH20",
    type: "percentage",
    value: 20, // 20% discount
    maxDiscount: 2000, // Up to 2,000 BDT
    minOrderAmount: 1000,
    badge: "Most Popular",
    description: "20% Instant Discount on All Tracks & Store Items (Max ৳2,000)",
    expiryDate: "2026-12-31",
  },
  {
    code: "SUFFEX500",
    type: "flat",
    value: 500, // 500 BDT flat discount
    maxDiscount: 500,
    minOrderAmount: 2500,
    badge: "Flat Bonus",
    description: "Flat ৳500 Student Bonus on purchases of ৳2,500 or more",
    expiryDate: "2026-12-31",
  },
  {
    code: "DEVPRO15",
    type: "percentage",
    value: 15,
    maxDiscount: 1500,
    minOrderAmount: 1500,
    badge: "Tech Track",
    description: "15% off for aspiring Full Stack & Frontend Engineers",
    expiryDate: "2026-12-31",
  },
  {
    code: "WELCOME10",
    type: "percentage",
    value: 10,
    maxDiscount: 1000,
    minOrderAmount: 0, // No minimum order
    badge: "New Student",
    description: "10% Welcome Discount with No Minimum Cart Limit",
    expiryDate: "2026-12-31",
  },
];

export function validateAndCalculateCoupon(inputCode, subtotal) {
  if (!inputCode || typeof inputCode !== "string") {
    return {
      isValid: false,
      discount: 0,
      message: "Please enter a coupon code.",
    };
  }

  const normalized = inputCode.trim().toUpperCase();
  const coupon = availableCoupons.find((c) => c.code === normalized);

  if (!coupon) {
    return {
      isValid: false,
      discount: 0,
      message: `Invalid coupon "${normalized}". Try "EDUTECH20" or "SUFFEX500".`,
    };
  }

  // Check minimum order amount requirement
  if (coupon.minOrderAmount && subtotal < coupon.minOrderAmount) {
    return {
      isValid: false,
      discount: 0,
      message: `Coupon "${coupon.code}" requires a minimum cart total of ৳${coupon.minOrderAmount.toLocaleString()}.`,
    };
  }

  // Calculate discount amount
  let discount = 0;
  if (coupon.type === "percentage") {
    const rawDiscount = Math.round((subtotal * coupon.value) / 100);
    discount = coupon.maxDiscount
      ? Math.min(rawDiscount, coupon.maxDiscount)
      : rawDiscount;
  } else if (coupon.type === "flat") {
    discount = Math.min(subtotal, coupon.value);
  }

  return {
    isValid: true,
    coupon,
    discount,
    message: `Coupon "${coupon.code}" applied! You saved ৳${discount.toLocaleString()}.`,
  };
}

export default availableCoupons;
