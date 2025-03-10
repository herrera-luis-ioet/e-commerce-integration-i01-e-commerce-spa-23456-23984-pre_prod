import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './index';

/**
 * Custom typed hooks for Redux
 * These hooks provide type safety when working with Redux state and dispatch
 */

// Use this typed hook instead of plain `useDispatch`
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Use this typed hook instead of plain `useSelector`
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;