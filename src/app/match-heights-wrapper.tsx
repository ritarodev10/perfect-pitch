"use client";

import { useEffect } from "react";

interface MatchHeightsWrapperProps {
  children: React.ReactNode;
  targetId: string;
  referenceId: string;
  minWidth?: number; // Minimum viewport width to apply height matching (default: 1024 = lg breakpoint)
}

/**
 * Client component wrapper to match heights between two elements
 * Only applies on screens wider than minWidth (default lg breakpoint)
 */
export function MatchHeightsWrapper({
  children,
  targetId,
  referenceId,
  minWidth = 1024, // Tailwind lg breakpoint
}: MatchHeightsWrapperProps) {
  useEffect(() => {
    const matchHeights = () => {
      const target = document.getElementById(targetId);
      const reference = document.getElementById(referenceId);

      if (target && reference) {
        // Only match heights on larger screens where columns are side by side
        if (window.innerWidth >= minWidth) {
          const referenceHeight = reference.offsetHeight;
          target.style.height = `${referenceHeight}px`;
        } else {
          // Reset to auto height on smaller screens
          target.style.height = "auto";
        }
      }
    };

    // Match on mount and after delays to ensure elements are rendered
    const timeoutId1 = setTimeout(matchHeights, 100);
    const timeoutId2 = setTimeout(matchHeights, 500);
    const timeoutId3 = setTimeout(matchHeights, 1000);

    // Match on resize
    const resizeObserver = new ResizeObserver(() => {
      matchHeights();
    });

    const reference = document.getElementById(referenceId);
    if (reference) {
      resizeObserver.observe(reference);
    }

    // Also observe window resize
    window.addEventListener("resize", matchHeights);

    return () => {
      clearTimeout(timeoutId1);
      clearTimeout(timeoutId2);
      clearTimeout(timeoutId3);
      resizeObserver.disconnect();
      window.removeEventListener("resize", matchHeights);
    };
  }, [targetId, referenceId, minWidth]);

  return <>{children}</>;
}

