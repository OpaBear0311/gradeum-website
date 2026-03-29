import type { Metadata } from "next";
import ContactForm from "@/components/sections/ContactForm";

export const metadata: Metadata = {
  title: "Contact \u2014 Gradeum for Agencies",
  description:
    "Get in touch with Gradeum. Document retrieval for government organizations.",
};

export default function ContactPage() {
  return (
    <section className="py-24 px-6">
      <ContactForm />
    </section>
  );
}
