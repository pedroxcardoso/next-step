"use client";

import dynamic from "next/dynamic";

// The whole experience depends on the browser (scroll position, window size, WebGL, localStorage),
// so it renders on the client only. This avoids server/client markup mismatches (hydration errors)
// from scroll-linked styles that framer-motion computes at mount.
const NextStepApp = dynamic(() => import("@/components/next-step-app"), {
  ssr: false,
  loading: () => (
    <div className="grid min-h-svh place-items-center bg-night text-white">
      <p className="text-lg font-semibold">Preparando o embarque…</p>
    </div>
  ),
});

export default function Page() {
  return <NextStepApp />;
}
