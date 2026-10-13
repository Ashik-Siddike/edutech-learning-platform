/**
 * ============================================================================
 * JAVASCRIPT CLOSURE PRICE CALCULATION ENGINE
 * ============================================================================
 * 
 * HOW THIS CLOSURE WORKS (Based on Sir's Examples):
 * ----------------------------------------------------------------------------
 * Example 1 (createNotification):
 *   function createNotification() {
 *     let unreadCount = 0; // Private enclosed state
 *     return {
 *       add: function() { unreadCount++; ... },
 *       read: function() { unreadCount--; ... }
 *     };
 *   }
 * 
 * Example 2 (createEmployee):
 *   function createEmployee(name, salary) {
 *     return {
 *       getName: function() { return name; },
 *       getSalary: function() { return salary; },
 *       increaseSalary: function(amount) { salary += amount; }
 *     };
 *   }
 * 
 * In this file, `createProductPriceCalculator(product, options)` encapsulates:
 * - `quantity` (private mutable state, like `unreadCount` or `salary`)
 * - `couponDiscountPercent` (private discount state)
 * - `vatRate`, `exchangeRate`, `currencySymbol`
 * 
 * The returned object exposes methods that close over and manipulate this private
 * state without exposing the raw variables directly to the outside scope.
 * ============================================================================
 */

/**
 * Factory function creating an encapsulated Product Price Calculator instance.
 * @param {Object} product - Selected product object from DummyJSON API
 * @param {Object} options - Configuration options (vatRate, exchangeRate, currencySymbol)
 * @returns {Object} Object with getter, mutator, and calculation methods
 */
export function createProductPriceCalculator(
  product,
  {
    vatRate = 0.05,       // 5% VAT
    exchangeRate = 120,   // 1 USD = 120 BDT
    currencySymbol = "৳",
  } = {}
) {
  // --------------------------------------------------------------------------
  // PRIVATE ENCLOSED STATE (Lexical Scope)
  // Accessible ONLY through the returned closure methods below!
  // --------------------------------------------------------------------------
  let quantity = 1;                  // like `unreadCount` in createNotification
  let couponDiscountPercent = 0;     // like `salary` modification in createEmployee
  const basePriceUSD = Number(product?.price) || 0;
  const productDiscountPercent = Number(product?.discountPercentage) || 0;
  const TAX_PERCENT = vatRate * 100;

  return {
    /**
     * Getter method: reads private `quantity` variable.
     */
    getQuantity: function () {
      return quantity;
    },

    /**
     * Setter method: sets private `quantity` variable safely.
     */
    setQuantity: function (newQty) {
      quantity = Math.max(1, parseInt(newQty, 10) || 1);
      return this.calculate();
    },

    /**
     * Mutator method: increases private `quantity` (analogous to `notification.add()`).
     */
    increaseQuantity: function () {
      quantity++;
      return this.calculate();
    },

    /**
     * Mutator method: decreases private `quantity` safely (analogous to `notification.read()`).
     */
    decreaseQuantity: function () {
      if (quantity > 1) {
        quantity--;
      }
      return this.calculate();
    },

    /**
     * Mutator method: applies a coupon discount (analogous to `employee.increaseSalary(amount)`).
     */
    applyCoupon: function (discountPercent) {
      couponDiscountPercent = Math.max(0, Math.min(80, Number(discountPercent) || 0));
      return this.calculate();
    },

    /**
     * Calculator method: uses the enclosed variables to compute the full breakdown.
     */
    calculate: function (overrideQty = null) {
      const activeQty =
        overrideQty !== null
          ? Math.max(1, parseInt(overrideQty, 10) || 1)
          : quantity;

      if (!product || basePriceUSD <= 0) {
        return {
          quantity: activeQty,
          baseUnitPriceUSD: 0,
          discountedUnitPriceUSD: 0,
          combinedDiscountPercent: 0,
          subtotalUSD: 0,
          vatPercent: TAX_PERCENT,
          vatAmountUSD: 0,
          totalUSD: 0,
          totalBDT: 0,
          savingsUSD: 0,
          savingsBDT: 0,
          exchangeRate,
          currencySymbol,
        };
      }

      // Calculate combined discount (capped at 80%)
      const combinedDiscount = Math.min(
        80,
        productDiscountPercent + couponDiscountPercent
      );

      // Discounted unit price
      const discountedUnitPriceUSD =
        basePriceUSD * (1 - combinedDiscount / 100);

      // Subtotal for the active quantity
      const subtotalUSD = discountedUnitPriceUSD * activeQty;

      // VAT Amount (uses enclosed `vatRate`)
      const vatAmountUSD = subtotalUSD * vatRate;

      // Total in USD
      const totalUSD = subtotalUSD + vatAmountUSD;

      // Conversion to Bangladeshi Taka (uses enclosed `exchangeRate`)
      const totalBDT = Math.round(totalUSD * exchangeRate);

      // Savings in USD & BDT
      const originalTotalUSD = basePriceUSD * activeQty;
      const savingsUSD = Math.max(0, originalTotalUSD - subtotalUSD);
      const savingsBDT = Math.round(savingsUSD * exchangeRate);

      return {
        quantity: activeQty,
        baseUnitPriceUSD: Number(basePriceUSD.toFixed(2)),
        discountedUnitPriceUSD: Number(discountedUnitPriceUSD.toFixed(2)),
        combinedDiscountPercent: Math.round(combinedDiscount),
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
    },
  };
}

/**
 * Legacy wrapper: allows calling as `calculatePriceWithClosure(product, quantity, couponDiscount)`
 * for 100% backward compatibility across existing components.
 */
export function createPriceCalculator({
  vatRate = 0.05,
  exchangeRate = 120,
  currencySymbol = "৳",
} = {}) {
  return function calculateProductPrice(product, quantity = 1, couponDiscountPercent = 0) {
    const calc = createProductPriceCalculator(product, {
      vatRate,
      exchangeRate,
      currencySymbol,
    });
    calc.setQuantity(quantity);
    if (couponDiscountPercent) {
      calc.applyCoupon(couponDiscountPercent);
    }
    return calc.calculate();
  };
}

export default createPriceCalculator;
