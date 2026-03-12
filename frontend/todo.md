# Task: Fix Loading Page to Wait for All Data - COMPLETED ✅

## Problem
The loading page showed briefly while data was being fetched, but some data took longer to load, causing a "flicker" effect where the loading disappeared before all data was ready.

## Solution Implemented
Created a custom hook `useDataReady` that ensures the loading page stays until ALL data is fetched before showing the page content.

## Files Created:
1. `hooks/useDataReady.ts` - Custom hook with:
   - `useDataReady(isLoading, delay?)` - For single data source
   - `useAllDataReady(loadingStates[], delay?)` - For multiple data sources

## Files Updated:
- [x] `app/(main)/home/page.tsx` - Uses `useAllDataReady` for 4 data hooks
- [x] `app/(main)/industries/page.tsx` - Uses `useDataReady`
- [x] `app/(main)/industries/[id]/page.tsx` - Uses `useDataReady`
- [x] `app/(main)/services/page.tsx` - Uses `useDataReady`
- [x] `app/(main)/services/[id]/page.tsx` - Uses `useDataReady` (was already using isLoading directly)
- [x] `app/(main)/projects/page.tsx` - Uses `useDataReady`
- [x] `app/(main)/projects/[id]/page.tsx` - Uses `useDataReady` (was already using isLoading directly)
- [x] `app/(main)/packages/page.tsx` - Uses `useDataReady`
- [x] `app/(main)/packages/[id]/page.tsx` - Uses `useDataReady` (was already using isLoading directly)
- [x] `app/(main)/news/page.tsx` - Uses `useDataReady`
- [x] `app/(main)/about/page.tsx` - Uses `useDataReady`

## Key Changes:
- Removed local `isReady` state and `useEffect` from each page
- Replaced with centralized `useDataReady` hook
- Removed unused imports (`useState`, `useEffect` in most cases)
- Added import for new hook from `@/hooks/useDataReady`

## Result:
The loading page now waits until ALL data is fetched before transitioning to the content page, eliminating the "flicker" effect caused by data arriving at different times.