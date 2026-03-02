import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay: number) {
  const [debouncedval, setdebouncedval] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setdebouncedval(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedval;
}
