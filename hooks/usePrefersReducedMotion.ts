"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

/**
 * 「動きを減らす」設定の購読(仕様書4.2 / 13.2)。
 *
 * 描画の有無そのものを設定で切り替えたい箇所で使う。
 * gsap のコールバック内など、レンダリング外で一度だけ判定すれば足りる箇所は
 * lib/animations.ts の prefersReducedMotion() を使う。
 */
function subscribe(onChange: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false, // SSR時は動きありを既定とし、クライアントで実値に追従する
  );
}
