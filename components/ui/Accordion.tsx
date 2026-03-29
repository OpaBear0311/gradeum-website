"use client";

import { useState } from "react";

interface AccordionProps {
  items: { question: string; answer: string }[];
}

export default function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="divide-y divide-warm-gray">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        const panelId = `accordion-panel-${i}`;
        const triggerId = `accordion-trigger-${i}`;
        return (
          <div key={i}>
            <h3>
              <button
                id={triggerId}
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="w-full flex items-center justify-between py-5 text-left group"
              >
                <span className="text-base font-medium text-navy pr-4">
                  {item.question}
                </span>
                <span
                  aria-hidden="true"
                  className={`text-navy/40 transition-transform duration-200 ${
                    isOpen ? "rotate-45" : ""
                  }`}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M10 4v12M4 10h12" />
                  </svg>
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              className={`overflow-hidden transition-all duration-200 ${
                isOpen ? "max-h-96 pb-5" : "max-h-0"
              }`}
            >
              <p className="text-navy/60 leading-relaxed text-sm">
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
