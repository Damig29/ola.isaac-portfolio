import { createContext, useContext, type RefObject } from 'react';
import type Lenis from 'lenis';

export const LenisContext = createContext<RefObject<Lenis | null> | null>(null);

export function useLenisInstance(): RefObject<Lenis | null> | null {
  return useContext(LenisContext);
}
