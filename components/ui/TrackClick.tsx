"use client";

import { trackEvent } from "@/lib/analytics";

interface TrackClickProps {
  event: string;
  params?: Record<string, string>;
  children: React.ReactNode;
}

export default function TrackClick({ event, params, children }: TrackClickProps) {
  return (
    <span onClick={() => trackEvent(event, params)}>
      {children}
    </span>
  );
}
