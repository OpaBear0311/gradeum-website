"use client";

import { useState } from "react";
import { CONTACT_EMAIL } from "@/lib/constants";

const categories = [
  {
    id: "getting-started",
    title: "Getting Started",
    content: {
      heading: "Welcome to Gradeum",
      paragraphs: [
        "Gradeum is an AI-powered platform that helps your team find, draft, and manage engineering documents \u2014 while keeping your data on your own server.",
      ],
      list: {
        intro: "This guide will walk you through:",
        items: [
          "Creating your organization account",
          "Installing the Gradeum Assistant on your server",
          "Running your first document search",
          "Understanding AI-assisted responses",
        ],
      },
      footer: `Detailed guides for each step are being finalized. Contact ${CONTACT_EMAIL} for priority onboarding support.`,
    },
  },
  {
    id: "assistant",
    title: "Gradeum Assistant",
    content: {
      heading: "About the Gradeum Assistant",
      paragraphs: [
        "The Gradeum Assistant is a local service that runs on your organization\u2019s server. It indexes your document archive \u2014 PDFs, specifications, reports, drawings, and correspondence \u2014 and makes them searchable in plain language.",
      ],
      list: {
        intro: "Key facts:",
        items: [
          "Runs entirely on your infrastructure",
          "Your documents never leave your network",
          "Indexes PDFs (including scanned documents via OCR), Word documents, and text files",
          "Updates automatically when new files are added to indexed directories",
          "Requires: Windows Server 2019+ or Ubuntu 22.04+, 8GB RAM minimum, Python 3.11+",
        ],
      },
      footer: `Installation guide coming soon. Contact ${CONTACT_EMAIL} for assisted installation.`,
    },
  },
  {
    id: "platform",
    title: "Platform",
    content: {
      heading: "Using the Gradeum Platform",
      paragraphs: [
        "The Gradeum platform is your team\u2019s interface for searching documents, reviewing AI-assisted outputs, and managing your engineering workflow.",
      ],
      list: {
        intro: "Topics being documented:",
        items: [
          "Searching your document archive",
          "Understanding source attribution",
          "Generating reports from search results",
          "Managing users and permissions",
          "Reviewing and approving AI-assisted outputs (Gradeum for Firms)",
          "Time tracking and resource management (Gradeum for Firms)",
        ],
      },
      footer: "Platform documentation is being prepared alongside the product launch.",
    },
  },
  {
    id: "api",
    title: "API Reference",
    content: {
      heading: "Gradeum API",
      paragraphs: [
        "API documentation for integrating with the Gradeum platform.",
        "The Gradeum API is currently in private beta. API access will be available to all subscribers at launch.",
      ],
      list: null,
      footer: `For early API access or integration questions, contact ${CONTACT_EMAIL}.`,
    },
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
          <label htmlFor="docs-search" className="sr-only">
            Search documentation
          </label>
          <div className="flex items-center border border-warm-gray rounded-lg px-4 py-2.5 bg-paper">
            <svg
              className="w-4 h-4 text-navy/30 mr-3 flex-shrink-0"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <circle cx="8.5" cy="8.5" r="6" />
              <path d="M13 13l4.5 4.5" />
            </svg>
            <input
              id="docs-search"
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
        <nav aria-label="Documentation sections" className="md:w-56 flex-shrink-0">
          <ul className="space-y-1">
            {categories.map((cat) => (
              <li key={cat.id}>
                <button
                  onClick={() => setActiveCategory(cat.id)}
                  aria-current={activeCategory === cat.id ? "page" : undefined}
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
            {active.content.heading}
          </h1>
          <div className="space-y-4 text-navy/60 leading-relaxed">
            {active.content.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            {active.content.list && (
              <>
                <p className="font-medium text-navy/80 mt-6">
                  {active.content.list.intro}
                </p>
                <ul className="space-y-2 ml-1">
                  {active.content.list.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="text-amber mt-1.5 shrink-0">&bull;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </>
            )}
            {active.content.footer && (
              <p className="mt-6 pt-6 border-t border-warm-gray text-sm text-navy/50">
                {active.content.footer}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
