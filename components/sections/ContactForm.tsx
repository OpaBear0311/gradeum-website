"use client";

import { useState } from "react";
import { CONTACT_EMAIL } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";

const ORG_TYPES = [
  "Port Authority",
  "Municipality",
  "State DOT",
  "Federal Agency",
  "State Agency",
  "County",
  "Other",
];

interface FormData {
  organizationName: string;
  contactName: string;
  title: string;
  email: string;
  phone: string;
  organizationType: string;
  message: string;
}

export default function ContactForm() {
  const [form, setForm] = useState<FormData>({
    organizationName: "",
    contactName: "",
    title: "",
    email: "",
    phone: "",
    organizationType: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const set = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((f) => ({ ...f, [field]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Submission failed");
      setStatus("success");
      trackEvent("contact_submit", {
        organization_type: form.organizationType || "unspecified",
      });
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        className="bg-white border border-warm-gray rounded-2xl p-10 max-w-[640px] mx-auto text-center"
        role="status"
        aria-live="polite"
      >
        <h2 className="text-2xl font-serif text-navy mb-4">Thank you.</h2>
        <p className="text-navy/60">
          We&apos;ll be in touch within one business day.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full border border-warm-gray rounded-lg px-4 py-2.5 text-sm text-navy bg-paper/50 focus:outline-none focus:ring-2 focus:ring-amber/40 focus:border-amber";
  const labelClass = "block text-sm font-medium text-navy mb-1.5";

  return (
    <div className="max-w-[640px] mx-auto">
      <div className="bg-white border border-warm-gray rounded-2xl p-8 md:p-10">
        <h2 className="text-2xl font-serif text-navy mb-8 text-center">
          Get in Touch
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="org-name" className={labelClass}>
                Organization Name <span aria-hidden="true" className="text-amber">*</span>
              </label>
              <input
                id="org-name"
                type="text"
                required
                aria-required="true"
                value={form.organizationName}
                onChange={set("organizationName")}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="contact-name" className={labelClass}>
                Contact Name <span aria-hidden="true" className="text-amber">*</span>
              </label>
              <input
                id="contact-name"
                type="text"
                required
                aria-required="true"
                value={form.contactName}
                onChange={set("contactName")}
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="contact-title" className={labelClass}>Title / Position</label>
              <input
                id="contact-title"
                type="text"
                value={form.title}
                onChange={set("title")}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="contact-email" className={labelClass}>
                Email <span aria-hidden="true" className="text-amber">*</span>
              </label>
              <input
                id="contact-email"
                type="email"
                required
                aria-required="true"
                value={form.email}
                onChange={set("email")}
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="contact-phone" className={labelClass}>Phone</label>
              <input
                id="contact-phone"
                type="tel"
                value={form.phone}
                onChange={set("phone")}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="org-type" className={labelClass}>Organization Type</label>
              <select
                id="org-type"
                value={form.organizationType}
                onChange={set("organizationType")}
                className={inputClass}
              >
                <option value="">Select...</option>
                {ORG_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="contact-message" className={labelClass}>
              Message <span aria-hidden="true" className="text-amber">*</span>
            </label>
            <textarea
              id="contact-message"
              required
              aria-required="true"
              aria-describedby={status === "error" ? "form-error" : undefined}
              rows={5}
              value={form.message}
              onChange={set("message")}
              className={inputClass}
            />
          </div>

          {status === "error" && (
            <p id="form-error" className="text-red-600 text-sm" role="alert">
              Something went wrong. Please try again or email us directly.
            </p>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full py-3 bg-amber text-white font-medium rounded-lg hover:bg-amber-dark transition-colors disabled:opacity-60"
          >
            {status === "submitting" ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>

      <p className="text-center text-sm text-navy/50 mt-6">
        Or email us directly at{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-amber underline">
          {CONTACT_EMAIL}
        </a>
      </p>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        {[
          "Your documents never leave your server",
          "Implementation in under 2 hours",
          "No long-term contract required",
        ].map((point) => (
          <p key={point} className="text-xs text-navy/50 font-medium">
            {point}
          </p>
        ))}
      </div>
    </div>
  );
}
