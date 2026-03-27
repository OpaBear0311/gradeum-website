"use client";

import { useState } from "react";
import clsx from "clsx";
import type { FaqItem } from "@/components/types";

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const isOpen = index === openIndex;
        return (
          <div key={item.question} className="overflow-hidden rounded-3xl border border-gradeum-border bg-white">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
              aria-expanded={isOpen}
            >
              <span className="text-lg font-semibold text-gradeum-navy">{item.question}</span>
              <span
                className={clsx(
                  "flex h-8 w-8 items-center justify-center rounded-full border border-gradeum-border text-gradeum-navy",
                  isOpen && "border-gradeum-cyan text-gradeum-cyan"
                )}
              >
                {isOpen ? "−" : "+"}
              </span>
            </button>
            {isOpen ? (
              <div className="border-t border-gradeum-border px-6 py-5 text-base leading-7 text-gradeum-muted">
                {item.answer}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
