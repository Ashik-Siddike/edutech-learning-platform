
export function createPriceCalculator({
  vatRate = 0.05,
  exchangeRate = 120,
  currencySymbol = "৳",
} = {}) {
  // Enclosed state in outer scope:
  // These variables are closed over by the returned function.
  const TAX_PERCENT = vatRate * 100;

  /**
   * The Closure function:
   * Has persistent access to `vatRate`, `exchangeRate`, and `TAX_PERCENT`.
   */
  return function calculateProductPrice(product, quantity = 1, couponDiscountPercent = 0) {
    if (!product || typeof product.price !== "number") {
      return {
        unitPriceUSD: 0,
        subtotalUSD: 0,
        vatAmountUSD: 0,
        totalUSD: 0,
        totalBDT: 0,
        currencySymbol,
      };
    }

    const safeQty = Math.max(1, parseInt(quantity, 10) || 1);
    const baseUnitPriceUSD = product.price;

    // Calculate product discount
    const productDiscountPercent = product.discountPercentage || 0;
    const combinedDiscountPercent = Math.min(
      80, // Cap discount at 80%
      productDiscountPercent + (couponDiscountPercent || 0)
    );

    // Discounted unit price
    const discountedUnitPriceUSD =
      baseUnitPriceUSD * (1 - combinedDiscountPercent / 100);

    // Subtotal for the selected quantity
    const subtotalUSD = discountedUnitPriceUSD * safeQty;

    // VAT / Tax calculation (uses enclosed `vatRate`)
    const vatAmountUSD = subtotalUSD * vatRate;

    // Final total in USD
    const totalUSD = subtotalUSD + vatAmountUSD;

    // Local currency conversion (uses enclosed `exchangeRate`)
    const totalBDT = Math.round(totalUSD * exchangeRate);

    // Total savings
    const originalTotalUSD = baseUnitPriceUSD * safeQty;
    const savingsUSD = Math.max(0, originalTotalUSD - subtotalUSD);
    const savingsBDT = Math.round(savingsUSD * exchangeRate);

    return {
      quantity: safeQty,
      baseUnitPriceUSD: Number(baseUnitPriceUSD.toFixed(2)),
      discountedUnitPriceUSD: Number(discountedUnitPriceUSD.toFixed(2)),
      combinedDiscountPercent: Math.round(combinedDiscountPercent),
      subtotalUSD: Number(subtotalUSD.toFixed(2)),
      vatPercent: TAX_PERCENT,
      vatAmountUSD: Number(vatAmountUSD.toFixed(2)),
      totalUSD: Number(totalUSD.toFixed(2)),
      totalBDT,
      savingsUSD: Number(savingsUSD.toFixed(2)),
      savingsBDT,
      exchangeRate,
      currencySymbol,
    };
  };
}

export default createPriceCalculator;
