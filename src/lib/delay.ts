import type { CSSProperties } from 'react';

/** Stagger helper for the .ld / .rv entrance animations (reads var(--d)). */
export const delay = (s: string) => ({ '--d': s }) as CSSProperties;
