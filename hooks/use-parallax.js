"use client";

import { useState, useEffect } from "react";

export const useParallax = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);  // Update scrollY on scroll
    window.addEventListener("scroll", handleScroll);  // Add event listener for scroll event
    return () => window.removeEventListener("scroll", handleScroll);  // Cleanup function
  }, []);

  return scrollY;
};
