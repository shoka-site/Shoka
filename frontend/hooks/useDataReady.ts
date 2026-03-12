"use client";

import { useState, useEffect } from "react";

/**
 * Custom hook that ensures the loading page stays visible until ALL data is fetched.
 * This prevents the "flicker" effect where the loading disappears before all data is ready.
 * 
 * @param isLoading - The loading state from the data fetch hook
 * @param delay - Optional delay in ms (default: 100ms) to ensure smooth transition
 * @returns boolean - true when data is ready and page should be shown
 */
export function useDataReady(isLoading: boolean, delay: number = 100): boolean {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      // Data has loaded, but wait a small delay to ensure the render is complete
      // This prevents any visual glitches during the transition
      const timer = setTimeout(() => {
        setIsReady(true);
      }, delay);
      return () => clearTimeout(timer);
    } else {
      // Data is still loading, show the loading screen
      setIsReady(false);
    }
  }, [isLoading, delay]);

  return isReady;
}

/**
 * Extended version that handles multiple loading states.
 * Use this when a page fetches multiple data sources (like home page).
 * 
 * @param loadingStates - Array of boolean loading states
 * @param delay - Optional delay in ms (default: 100ms)
 * @returns boolean - true when ALL data is ready
 */
export function useAllDataReady(loadingStates: boolean[], delay: number = 100): boolean {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Check if ANY data is still loading
    const allLoaded = loadingStates.every(state => !state);
    
    if (allLoaded) {
      // All data has loaded, but wait a small delay to ensure smooth transition
      const timer = setTimeout(() => {
        setIsReady(true);
      }, delay);
      return () => clearTimeout(timer);
    } else {
      // Some data is still loading, show the loading screen
      setIsReady(false);
    }
  }, [loadingStates, delay]);

  return isReady;
}