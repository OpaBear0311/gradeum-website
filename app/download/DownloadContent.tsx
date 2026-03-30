"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { DOWNLOAD_URL } from "@/lib/constants";

function DownloadInner() {
  const searchParams = useSearchParams();
  const inviteCode = searchParams.get("invite") || "";
  const activateUrl = inviteCode
    ? `gradeum://signup?invite=${encodeURIComponent(inviteCode)}`
    : "gradeum://signup";

  return (
    <div className="min-h-screen bg-paper flex flex-col items-center justify-center px-6 py-20">
      <div className="max-w-lg w-full text-center">
        {/* Logo */}
        <div className="mb-8">
          <span
            className="text-navy font-serif tracking-[0.35em] text-3xl"
            style={{ fontFamily: "'Garamond', 'Georgia', serif" }}
          >
            GRADEUM
          </span>
        </div>

        {/* Download section */}
        <h1 className="text-2xl font-serif text-navy mb-4">
          Download Gradeum for Windows
        </h1>
        <p className="text-navy/60 mb-8 leading-relaxed">
          Gradeum installs in under 2 minutes. Includes the desktop application
          and the local document indexing agent.
        </p>

        <a
          href={DOWNLOAD_URL}
          className="inline-flex items-center gap-3 px-8 py-4 bg-navy text-white rounded-xl text-base font-medium hover:bg-navy/90 transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M10 3v10m0 0l-4-4m4 4l4-4M3 17h14"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Download for Windows
        </a>

        {/* System requirements */}
        <div className="mt-6 text-navy/40 text-sm space-y-1">
          <p>Windows 10 or later (64-bit)</p>
          <p>2 GB available disk space</p>
        </div>

        {/* Divider */}
        <div className="my-12 border-t border-warm-gray" />

        {/* Activate section */}
        <h2 className="text-lg font-serif text-navy mb-3">
          Already installed?
        </h2>
        <p className="text-navy/60 mb-6 text-sm leading-relaxed">
          Click below to open the Gradeum desktop application and activate your
          account.
        </p>

        <a
          href={activateUrl}
          className="inline-flex items-center gap-2 px-6 py-3 border-2 border-navy text-navy rounded-xl text-sm font-medium hover:bg-navy hover:text-white transition-colors"
        >
          Activate Gradeum
        </a>

        {inviteCode && (
          <div className="mt-6 p-4 bg-warm-gray/40 rounded-lg">
            <p className="text-navy/50 text-xs mb-2">
              If Gradeum doesn&apos;t open, launch it from your desktop and
              enter this code manually:
            </p>
            <code className="text-navy font-mono text-sm font-semibold tracking-wider">
              {inviteCode}
            </code>
          </div>
        )}
      </div>

      {/* Footer */}
      <p className="mt-16 text-navy/30 text-xs">
        Gradeum Technologies, LLC
      </p>
    </div>
  );
}

export default function DownloadContent() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-paper" />}>
      <DownloadInner />
    </Suspense>
  );
}
