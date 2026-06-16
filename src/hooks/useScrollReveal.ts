import { useEffect, useRef } from "react";

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(delay = 0) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    el.style.opacity = "0";
    el.style.transform = "translateY(22px)";
    el.style.transition = "opacity 0.55s ease, transform 0.55s ease";
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return ref;
}
