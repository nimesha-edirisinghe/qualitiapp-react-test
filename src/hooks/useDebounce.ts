import { useState, useEffect } from 'react';

// Custom hook for debouncing a value
const useDebounce = <T>(value: T, delay: number): T => {
  // State to store the debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // set timeout with given delay
    const handler = setTimeout(() => {
      setDebouncedValue(value); // Update the debounced value with the latest value
    }, delay);

    // Cleanup function
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Dependencies: re-run the effect if value or delay changes

  // Return the debounced value
  return debouncedValue;
};

export default useDebounce;
