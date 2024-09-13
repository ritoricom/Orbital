import { useEffect } from "react";

const isRefOutside = (ref, event) =>
  ref.current && !ref.current.contains(event.target);

export const useOnClickOutside = (ref, handler, ignoreRefs = []) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!isRefOutside(ref, event)) {
        return;
      }
      if (ignoreRefs.some((ref) => !isRefOutside(ref, event))) {
        return;
      }

      handler();
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [ref, handler, ignoreRefs]);
};
