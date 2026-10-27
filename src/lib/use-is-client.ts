"use client";

import { useSyncExternalStore } from "react";

const noop = () => () => {};

/** false under server-render og hydrering, true bagefter. Hydreringssikker. */
export function useIsClient(): boolean {
  return useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );
}
