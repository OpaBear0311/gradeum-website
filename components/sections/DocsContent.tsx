"use client";

import { useState } from "react";
import { CONTACT_EMAIL } from "@/lib/constants";

const categories = [
  {
    id: "getting-started",
    title: "Getting Started",
    content: `Documentation is being prepared. Contact ${CONTACT_EMAIL} for onboarding support.`,
  },
  {
    id: "agent",
    title: "Gradeum Agent",
    content: "Agent installation guide coming soon.",
  },
  {
    id: "platform",
    title: "Platform",
    content: "Platform documentation coming soon.",
  },
  {
    id: "api",
    title: "API Reference",
    content: "API documentation coming soon.",
  },
];

export default function DocsContent() {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const active = categories.find((c) => c.id === activeCategory)!;

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-10 py-12 md:py-16">
      {/* Search placeholder */}
      <div className="mb-10">
        <div className="max-w-md">
          <div className="flex items-center border border-warm-gray rounded-lg px-4 py-2.5 bg-paper">
            <svg
              className="w-4 h-4 text-navy/30 mr-3 flex-shrink-0"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="8.5" cy="8.5" r="6" />
              <path d="M13 13l4.5 4.5" />
            </svg>
            <input
              type="text"
              placeholder="Search documentation..."
              className="flex-1 bg-transparent text-sm text-navy outline-none placeholder:text-navy/30"
              disabled
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Sidebar */}
        <nav className="md:w-56 flex-shrink-0">
          <ul className="space-y-1">
            {categories.map((cat) => (
              <li key={cat.id}>
                <button
                  onClick={() => setActiveCategory(cat.id)}
                  className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${
                    activeCategory === cat.id
                      ? "bg-navy/5 text-navy font-medium"
                      : "text-navy/50 hover:text-navy/80"
                  }`}
                >
                  {cat.title}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h1 className="text-3xl font-serif text-navy mb-6">
            {active.title}
          </h1>
          <p className="text-navy/60 leading-relaxed">{active.content}</p>
        </div>
      </div>
    </div>
  );
}
