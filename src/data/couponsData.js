// Master coupons data and business validation logic for E-Commerce Store
export const availableCoupons = [
  {
    code: "STORE20",
    aliases: ["EDUTECH20"],
    type: "percentage",
    value: 20, // 20% discount
    maxDiscount: 2000, // Up to 2,000 BDT
    minOrderAmount: 1000,
    badge: "Most Popular",
    description: "20% Instant Discount on All Store Products (Max ৳2,000)",
    expiryDate: "2026-12-31",
  },
  {
    code: "SUFFEX500",
    aliases: [],
    type: "flat",
    value: 500, // 500 BDT flat discount
    maxDiscount: 500,
    minOrderAmount: 2500,
    badge: "Flat Bonus",
    description: "Flat ৳500 Shopping Bonus on orders of ৳2,500 or more",
    expiryDate: "2026-12-31",
  },
  {
    code: "TECH15",
    aliases: ["DEVPRO15"],
    type: "percentage",
    value: 15,
    maxDiscount: 1500,
    minOrderAmount: 1500,
    badge: "Electronics",
    description: "15% off on Tech Gadgets, Laptops & Smartphones",
    expiryDate: "2026-12-31",
  },
  {
    code: "WELCOME10",
    aliases: [],
    type: "percentage",
    value: 10,
    maxDiscount: 1000,
    minOrderAmount: 0, // No minimum order
    badge: "New Shopper",
    description: "10% Welcome Discount on First Order (No minimum)",
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
  const coupon = availableCoupons.find(
    (c) => c.code === normalized || (c.aliases && c.aliases.includes(normalized))
  );

  if (!coupon) {
    return {
      isValid: false,
      discount: 0,
      message: `Invalid coupon "${normalized}". Try "STORE20" or "SUFFEX500".`,
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
