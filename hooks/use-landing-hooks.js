"use client";

import { useEffect, useState, useRef } from "react";

// Custom hook to check if a DOM element is visible in the viewport
export const useIntersectionObserver = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false); // `isVisible` will be true when the element is in the viewport
  const ref = useRef(); // `ref` is a reference to the DOM element

  useEffect(() => {
    // `useEffect` will run when the component is mounted or when `threshold` changes
    const observer = new IntersectionObserver( // `observer` is an instance of IntersectionObserver
      // Callback that runs when visibility changes
      ([entry]) => setIsVisible(entry.isIntersecting),
      // Options object: `threshold` controls how much of the element must be visible
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);     // If the ref is attached to a DOM element, start observing it
    return () => observer.disconnect();     // Clean up when component unmounts or ref/threshold changes
  }, [threshold]);

  return [ref, isVisible];   // Return the ref (to attach to an element) and visibility state
};

export const useAnimatedCounter = (target, duration = 2000) => { // `target` is the number to count to, `duration` is how long it takes
  const [count, setCount] = useState(0); // `count` is the current number
  const [isActive, setIsActive] = useState(false); // `isActive` is a flag to start/stop the animation

  useEffect(() => {
    if (!isActive) return;

    const step = target / (duration / 16); // `step` is how much to increment each frame
    const timer = setInterval(() => { // `timer` is the interval ID
      setCount((prev) => { // `prev` is the previous value
        const next = prev + step; // `next` is the next value
        if (next >= target) { // If we've reached the target, stop the animation
          clearInterval(timer); // Clear the interval
          return target;
        }
        return next;
      });
    }, 16);

    return () => clearInterval(timer); 
  }, [target, duration, isActive]); 

  return [Math.floor(count), setIsActive]; // Return the current number and a function to start/stop the animation
};


// Hook	Purpose
// useIntersectionObserver	Detects if a component is in view (based on a threshold).
// useAnimatedCounter	Smoothly animates numbers up to a target value over time.