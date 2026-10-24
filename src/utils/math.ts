/**
 * Pure calculation utilities for 3D Creator portfolio
 */

/**
 * Calculates horizontal marquee scroll offset based on window scroll position
 */
export function calculateMarqueeOffset(
  scrollY: number,
  sectionTop: number,
  innerHeight: number,
  multiplier = 0.3
): number {
  return (scrollY - sectionTop + innerHeight) * multiplier;
}

/**
 * Calculates card scale for stacking effect:
 * targetScale = 1 - (totalCards - 1 - index) * 0.03
 */
export function calculateCardScale(index: number, totalCards: number, scaleStep = 0.03): number {
  const diff = Math.max(0, totalCards - 1 - index);
  return Number((1 - diff * scaleStep).toFixed(4));
}

/**
 * Calculates sticky top offset for stacked card
 */
export function calculateCardTop(index: number, baseStep = 28): number {
  return index * baseStep;
}

/**
 * Calculates mouse magnet offset
 */
export function calculateMagnetOffset(
  cursorX: number,
  cursorY: number,
  elemRect: { left: number; top: number; width: number; height: number },
  padding = 150,
  strength = 3
): { x: number; y: number; active: boolean } {
  const centerX = elemRect.left + elemRect.width / 2;
  const centerY = elemRect.top + elemRect.height / 2;

  const withinHorizontal =
    cursorX >= elemRect.left - padding && cursorX <= elemRect.left + elemRect.width + padding;
  const withinVertical =
    cursorY >= elemRect.top - padding && cursorY <= elemRect.top + elemRect.height + padding;

  if (withinHorizontal && withinVertical) {
    const deltaX = (cursorX - centerX) / strength;
    const deltaY = (cursorY - centerY) / strength;
    return { x: deltaX, y: deltaY, active: true };
  }

  return { x: 0, y: 0, active: false };
}

/**
 * Calculates individual character reveal opacity in scroll range
 */
export function calculateCharOpacity(
  charIndex: number,
  totalChars: number,
  scrollProgress: number,
  minOpacity = 0.2,
  maxOpacity = 1
): number {
  if (totalChars <= 0) return minOpacity;
  const charThreshold = charIndex / totalChars;
  if (scrollProgress <= charThreshold) {
    return minOpacity;
  }
  const nextThreshold = (charIndex + 1) / totalChars;
  if (scrollProgress >= nextThreshold) {
    return maxOpacity;
  }
  const localRatio = (scrollProgress - charThreshold) / (nextThreshold - charThreshold);
  return minOpacity + localRatio * (maxOpacity - minOpacity);
}
