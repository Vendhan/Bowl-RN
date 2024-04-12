import { useEffect, useRef } from "react";

export const useDebounceEffect = (func, deps, delay) => {
  const ref = useRef();
  useEffect(() => {
    clearTimeout(ref.current);
    ref.current = setTimeout(() => {
      func();
      clearTimeout(ref.current);
    }, delay);
  }, [...deps, func, delay]);
};