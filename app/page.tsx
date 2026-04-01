"use client";

import { useState } from "react";
import { SITE, HERO, PRODUCTS, CTA, API_URL, INTEREST_OPTIONS } from "@/lib/constants";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen px-6 py-6 sm:py-8">
      {/* Header */}
      <header className="flex items-center justify-between max-w-[900px] w-full mx-auto">
        <span className="text-lg sm:text-xl font-bold tracking-[0.25em] uppercase text-ink">
          {SITE.name}
        </span>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-navy text-white text-sm font-medium px-5 py-2.5 rounded cursor-pointer hover:bg-navy-hover transition-colors"
        >
          {CTA.buttonText} &rarr;
        </button>
      </header>

      {/* Hero + Cards */}
      <main className="flex-1 flex flex-col justify-center max-w-[900px] w-full mx-auto">
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-center leading-tight mb-12 sm:mb-16">
          {HERO.headline}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {([PRODUCTS.heavy, PRODUCTS.lite] as const).map((product) => (
            <div
              key={product.name}
              className="bg-white border border-card-border rounded-lg p-6 sm:p-8 shadow-sm"
            >
              <h2 className="font-serif text-xl sm:text-2xl mb-3">
                {product.name}
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-ink/70">
                {product.description}
              </p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-ink/40 pt-6 max-w-[900px] w-full mx-auto">
        {SITE.copyright}
      </footer>

      {/* Modal */}
      {modalOpen && (
        <RequestInfoModal onClose={() => setModalOpen(false)} />
      )}
    </div>
  );
}

function RequestInfoModal({ onClose }: { onClose: () => void }) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [interest, setInterest] = useState<string>(INTEREST_OPTIONS[2]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-paper rounded-lg shadow-xl w-full max-w-md p-6 sm:p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-ink/40 hover:text-ink text-xl leading-none cursor-pointer"
          aria-label="Close"
        >
          &times;
        </button>

        {status === "success" ? (
          <p className="text-center text-lg py-8">{CTA.successMessage}</p>
        ) : status === "error" ? (
          <p className="text-center text-sm py-8 text-red-600">{CTA.errorMessage}</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="font-serif text-2xl mb-2">{CTA.buttonText}</h2>

            <input
              name="name"
              type="text"
              required
              placeholder="Name"
              className="w-full border border-card-border rounded px-3 py-2 text-sm bg-white"
            />
            <input
              name="email"
              type="email"
              required
              placeholder="Email"
              className="w-full border border-card-border rounded px-3 py-2 text-sm bg-white"
            />
            <input
              name="company"
              type="text"
              required
              placeholder="Company"
              className="w-full border border-card-border rounded px-3 py-2 text-sm bg-white"
            />

            <fieldset>
              <legend className="text-sm font-medium mb-2">
                I&apos;m interested in:
              </legend>
              <div className="flex flex-wrap gap-4">
                {INTEREST_OPTIONS.map((option) => (
                  <label key={option} className="flex items-center gap-1.5 text-sm cursor-pointer">
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
                ))}
              </div>
            </fieldset>

            <textarea
              name="message"
              placeholder="Message (optional)"
              rows={3}
              className="w-full border border-card-border rounded px-3 py-2 text-sm bg-white resize-none"
            />

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full bg-navy text-white font-medium py-2.5 rounded hover:bg-navy-hover transition-colors cursor-pointer disabled:opacity-60"
            >
              {status === "sending" ? "Sending\u2026" : CTA.submitText}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
