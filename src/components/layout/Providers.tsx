"use client";

import { Suspense } from "react";
import SmoothScroll from "@/components/layout/SmoothScroll";
import LenisRouteSync from "@/components/layout/LenisRouteSync";
import { LanguageProvider } from "@/components/i18n/LanguageProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <SmoothScroll>
        {children}
        <Suspense fallback={null}>
          <LenisRouteSync />
        </Suspense>
      </SmoothScroll>
    </LanguageProvider>
  );
}
