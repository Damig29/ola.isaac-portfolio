import type Lenis from 'lenis';

const NAV_OFFSET = 88;

export function scrollToHashAnchor(href: string, lenis: Lenis | null | undefined): void {
  const target = document.querySelector(href);
  if (!target) return;
  if (lenis) {
    lenis.scrollTo(target as HTMLElement, { offset: -NAV_OFFSET, lerp: 0.12 });
  } else {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export function scrollToTop(lenis: Lenis | null | undefined): void {
  if (lenis) lenis.scrollTo(0, { lerp: 0.12 });
  else window.scrollTo({ top: 0, behavior: 'smooth' });
}
