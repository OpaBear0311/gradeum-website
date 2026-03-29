"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function Analytics() {
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("gradeum-analytics-consent");
    if (stored === "true") setConsent(true);
  }, []);

  useEffect(() => {
    const onStorage = () => {
      const stored = localStorage.getItem("gradeum-analytics-consent");
      setConsent(stored === "true");
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  if (!consent || !GA_ID) return null;

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}
