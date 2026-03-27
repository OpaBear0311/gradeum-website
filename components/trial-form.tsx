"use client";

import type { FormEvent } from "react";
import { useState } from "react";

const downloadLinks = {
  exe: "https://downloads.gradeum.com/trial/gradeum-installer.exe",
  zip: "https://downloads.gradeum.com/trial/gradeum-portable.zip"
};

type Status =
  | { type: "idle" }
  | { type: "success"; message: string }
  | { type: "error"; message: string };

export function TrialForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>({ type: "idle" });
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    const endpoint = process.env.NEXT_PUBLIC_SUPABASE_LEAD_ENDPOINT;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    try {
      if (endpoint) {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(anonKey ? { Authorization: `Bearer ${anonKey}` } : {})
          },
          body: JSON.stringify({
            email,
            source: "gradeum-trial-page",
            capturedAt: new Date().toISOString()
          })
        });

        if (!response.ok) {
          throw new Error("Lead capture failed");
        }
      }

      setStatus({
        type: "success",
        message:
          "Thanks. Your trial links are ready below. If a live lead endpoint is configured, this email has been submitted to Supabase."
      });
      setEmail("");
    } catch {
      setStatus({
        type: "error",
        message:
          "We could not submit the form right now. If you are testing locally without a configured endpoint, add NEXT_PUBLIC_SUPABASE_LEAD_ENDPOINT and try again."
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="rounded-4xl border border-gradeum-border bg-white p-8 shadow-panel">
      <form className="space-y-4" onSubmit={onSubmit}>
        <label htmlFor="email" className="block text-sm font-semibold uppercase tracking-[0.1em] text-gradeum-navy">
          Work Email
        </label>
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@firm.com"
          className="min-h-12 w-full rounded-2xl border border-gradeum-border px-4 text-base text-gradeum-text placeholder:text-gradeum-muted/80"
        />
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-gradeum-cyan px-6 text-sm font-semibold uppercase tracking-[0.08em] text-white hover:bg-gradeum-cyan-deep disabled:cursor-not-allowed disabled:bg-gradeum-cyan/70"
        >
          {submitting ? "Submitting..." : "Get Trial Access"}
        </button>
      </form>
      <p className="mt-4 text-sm leading-6 text-gradeum-muted">
        Downloads appear immediately after submission. No credit card required.
      </p>

      {status.type !== "idle" ? (
        <div
          className={`mt-6 rounded-3xl border px-5 py-4 text-sm leading-6 ${
            status.type === "success"
              ? "border-gradeum-cyan/30 bg-gradeum-cyan/10 text-gradeum-navy"
              : "border-gradeum-gold/40 bg-gradeum-gold/10 text-gradeum-navy"
          }`}
        >
          <p>{status.message}</p>
          {status.type === "success" ? (
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <a
                href={downloadLinks.exe}
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-gradeum-navy px-5 text-sm font-semibold uppercase tracking-[0.08em] text-white hover:bg-gradeum-navy/90"
              >
                Download .exe
              </a>
              <a
                href={downloadLinks.zip}
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-gradeum-border px-5 text-sm font-semibold uppercase tracking-[0.08em] text-gradeum-navy hover:border-gradeum-cyan hover:text-gradeum-cyan"
              >
                Download .zip
              </a>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
