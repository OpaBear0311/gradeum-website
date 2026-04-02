"use client";

import { useState, FormEvent } from "react";
import { SITE, HERO, PRODUCTS, CTA, API_URL } from "@/lib/constants";

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col px-6 py-6 sm:px-8 md:py-8">
      {/* Header */}
      <header className="flex items-center justify-between">
        <span className="font-display text-xl tracking-[0.2em] text-navy sm:text-2xl">
          {SITE.name}
        </span>
        <button
          onClick={() => setModalOpen(true)}
          className="rounded bg-navy px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy-dark"
        >
          {CTA.buttonText} &rarr;
        </button>
      </header>

      {/* Hero + Cards */}
      <div className="flex flex-1 flex-col items-center justify-center">
        <h1 className="mx-auto max-w-3xl text-center font-display text-4xl leading-tight text-ink sm:text-5xl md:text-6xl">
          {HERO.headline}
        </h1>

        <div className="mt-12 grid w-full max-w-[900px] gap-6 sm:mt-16 sm:grid-cols-2">
          <ProductCard
            name={PRODUCTS.heavy.name}
            description={PRODUCTS.heavy.description}
          />
          <ProductCard
            name={PRODUCTS.lite.name}
            description={PRODUCTS.lite.description}
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="pt-8 text-center text-sm text-ink/50">
        {SITE.copyright}
      </footer>

      {/* Modal */}
      {modalOpen && <RequestModal onClose={() => setModalOpen(false)} />}
    </div>
  );
}

function ProductCard({
  name,
  description,
}: {
  name: string;
  description: string;
}) {
  return (
    <div className="rounded-lg border border-ink/10 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="font-display text-2xl text-navy">{name}</h2>
      <p className="mt-4 text-sm leading-relaxed text-ink/70">{description}</p>
    </div>
  );
}

function RequestModal({ onClose }: { onClose: () => void }) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [interest, setInterest] = useState("Both");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
      interest,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch(`${API_URL}/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setTimeout(onClose, 2000);
    } catch {
      setStatus("error");
    }
  }

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-md rounded-lg bg-white p-8 shadow-xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-2xl leading-none text-ink/40 hover:text-ink"
          aria-label="Close"
        >
          &times;
        </button>

        <h2 className="font-display text-2xl text-navy">{CTA.buttonText}</h2>

        {status === "success" ? (
          <p className="mt-6 text-sm text-ink/70">{CTA.successMessage}</p>
        ) : status === "error" ? (
          <p className="mt-6 text-sm text-red-600">{CTA.errorMessage}</p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <input
              name="name"
              type="text"
              placeholder="Name"
              required
              className="w-full rounded border border-ink/15 px-4 py-2.5 text-sm focus:border-navy focus:outline-none"
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              required
              className="w-full rounded border border-ink/15 px-4 py-2.5 text-sm focus:border-navy focus:outline-none"
            />
            <input
              name="company"
              type="text"
              placeholder="Company"
              required
              className="w-full rounded border border-ink/15 px-4 py-2.5 text-sm focus:border-navy focus:outline-none"
            />

            <fieldset>
              <legend className="mb-2 text-sm font-medium text-ink/70">
                I&apos;m interested in:
              </legend>
              <div className="flex gap-4 text-sm">
                {[PRODUCTS.heavy.name, PRODUCTS.lite.name, "Both"].map(
                  (option) => (
                    <label key={option} className="flex items-center gap-1.5">
                      <input
                        type="radio"
                        name="interest"
                        value={option}
                        checked={interest === option}
                        onChange={() => setInterest(option)}
                        className="accent-navy"
                      />
                      {option}
                    </label>
                  )
                )}
              </div>
            </fieldset>

            <textarea
              name="message"
              placeholder="Message (optional)"
              rows={3}
              className="w-full rounded border border-ink/15 px-4 py-2.5 text-sm focus:border-navy focus:outline-none"
            />

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full rounded bg-navy py-2.5 text-sm font-semibold text-white hover:bg-navy-dark disabled:opacity-60"
            >
              {status === "sending" ? "Sending..." : CTA.submitText}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
