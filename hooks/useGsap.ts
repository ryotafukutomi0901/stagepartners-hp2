"use client";

import { useRef, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

// SplitText は GSAP 3.13 以降 gsap 本体に同梱された無償プラグインのため、
// 追加パッケージなしで registerPlugin できる。
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
}

export function useScopedGsap<T extends HTMLElement>(
  callback: (context: { scope: RefObject<T | null> }) => void | (() => void),
  deps: unknown[] = [],
) {
  const scope = useRef<T | null>(null);

  useGSAP(
    () => {
      // gsap.context は戻り値の関数をクリーンアップとして扱うため、
      // ScrollTrigger 以外の後始末(イベント購読など)もここに集約できる。
      return callback({ scope });
    },
    { scope, dependencies: deps },
  );

  return scope;
}

export { gsap, ScrollTrigger, SplitText };
