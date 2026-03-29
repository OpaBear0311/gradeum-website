"use client";

import { useState, useEffect } from "react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const pref = localStorage.getItem("gradeum-analytics-consent");
    if (pref === null) setVisible(true);
  }, []);

  const respond = (accepted: boolean) => {
    localStorage.setItem("gradeum-analytics-consent", String(accepted));
    setVisible(false);
    if (accepted) {
      // Trigger storage event for Analytics component in same tab
      window.dispatchEvent(new Event("storage"));
    }
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 bg-navy-deep/95 backdrop-blur-sm border-t border-white/10 p-4"
      role="dialog"
      aria-label="Cookie consent"
    >
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-white/70 text-sm">
          We use cookies for analytics to improve your experience.
        </p>
        <div className="flex items-center gap-3">
          <button
            onClick={() => respond(false)}
            className="px-4 py-2 text-sm text-white/50 hover:text-white/80 transition-colors"
          >
            Decline
          </button>
          <button
            onClick={() => respond(true)}
            className="px-5 py-2 bg-navy text-white text-sm font-medium rounded-lg hover:bg-navy-deep transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
