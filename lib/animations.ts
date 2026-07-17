import gsap from "gsap";

export const EASE = "power2.out";
export const EASE_SOFT = "power1.out";
export const EASE_REVEAL = "expo.out";

export const scrollTriggerDefaults = {
  start: "top 78%",
  toggleActions: "play none none none",
} as const;

/**
 * 動きの低減設定(WCAG 2.2 / 仕様書4.2・13.2)。
 *
 * 各セクションの gsap コールバック冒頭でこれを見て早期 return する。
 * gsap.from() は「開始値を作ってから戻す」性質上、途中で止めると要素が
 * 隠れたままになりうるため、無効化ではなく最初から実行しない方針を採る。
 */
export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function fadeUp(
  target: gsap.TweenTarget,
  vars?: gsap.TweenVars,
): gsap.core.Tween {
  return gsap.from(target, {
    opacity: 0,
    y: 32,
    duration: 1,
    ease: EASE,
    ...vars,
  });
}

export function staggerFadeUp(
  target: gsap.TweenTarget,
  vars?: gsap.TweenVars,
): gsap.core.Tween {
  return gsap.from(target, {
    opacity: 0,
    y: 24,
    duration: 0.9,
    ease: EASE,
    stagger: 0.12,
    ...vars,
  });
}

export function imageReveal(
  target: gsap.TweenTarget,
  vars?: gsap.TweenVars,
): gsap.core.Tween {
  return gsap.from(target, {
    opacity: 0,
    scale: 1.08,
    duration: 1.4,
    ease: EASE_SOFT,
    ...vars,
  });
}

/** 罫線を左から引く。図面が引かれるような所作を各セクションの見出しに共通で与える。 */
export function drawLine(
  target: gsap.TweenTarget,
  vars?: gsap.TweenVars,
): gsap.core.Tween {
  return gsap.from(target, {
    scaleX: 0,
    transformOrigin: "left center",
    duration: 1.1,
    ease: "power3.inOut",
    ...vars,
  });
}
