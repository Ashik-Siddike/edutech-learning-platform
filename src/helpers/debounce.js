/**
 * Classic JavaScript Debounce Utility Function
 * 
 * Demonstrates a fundamental JavaScript Closure:
 * The outer function retains the `timeoutId` in its lexical scope.
 * Every time the returned inner function is invoked, it cancels the previous timer
 * and schedules a new execution after `delay` milliseconds.
 * 
 * @param {Function} fn - The function to debounce
 * @param {number} delay - Delay in milliseconds (default: 400ms)
 * @returns {Function} - Debounced version of the function
 */
export function debounce(fn, delay = 400) {
  let timeoutId = null;

  return function debounced(...args) {
    const context = this;

    // Clear previous pending execution
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Schedule new execution
    timeoutId = setTimeout(() => {
      fn.apply(context, args);
      timeoutId = null;
    }, delay);
  };
}

export default debounce;
