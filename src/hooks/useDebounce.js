import { useState, useEffect } from "react";

/**
 * Custom React Hook: useDebounce
 * 
 * Delays updating the debounced value until after the specified delay
 * has passed since the last time the input value changed.
 * 
 * Prevents rapid API requests while the user is actively typing.
 * 
 * @param {any} value - The input value to debounce (e.g. search string)
 * @param {number} delay - Delay in milliseconds (default: 400ms)
 * @returns {any} - The debounced value
 */
export function useDebounce(value, delay = 400) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set up a timer to update the debounced value after the delay
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup: Clear the timer if the value or delay changes before the timer finishes
    // (This happens on every keystroke, resetting the countdown!)
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
