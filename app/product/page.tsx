import { FadeIn } from "@/components/motion";
import { productFeatures } from "@/components/content";
import { BodyText, BrowserMockup, Card, Eyebrow, Heading, PlaceholderMedia, PrimaryButton, Section, SecondaryButton } from "@/components/ui";

const architectureNodes = [
  "Project Files",
  "Local Gradeum Agent",
  "Indexed Knowledge Layer",
  "PE Review Workflow",
  "Approved Deliverables"
];

const securityItems = ["AES-256 Encryption", "TLS 1.3 in Transit", "Tenant Isolation", "U.S. Data Residency"];

export default function ProductPage() {
  return (
    <>
      <Section className="pt-16 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <FadeIn>
            <div className="max-w-xl">
              <Eyebrow>Product</Eyebrow>
              <Heading>Mission-control capability with a professional engineering chain of review.</Heading>
              <BodyText className="mt-6">
                Gradeum is designed to turn dormant project archives into a searchable, draftable,
                reviewable body of engineering knowledge while keeping firm data local.
              </BodyText>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <PrimaryButton href="/trial">Start Free Trial</PrimaryButton>
                <SecondaryButton href="/pricing">See Pricing</SecondaryButton>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <PlaceholderMedia
              title="Engineering Drawings Placeholder"
              alt="Placeholder block representing a close-up photograph of engineering drawings used on the product page."
              className="min-h-[420px]"
            />
          </FadeIn>
        </div>
      </Section>

      <Section tone="mist">
        <FadeIn>
          <div className="max-w-3xl">
            <Eyebrow>Architecture</Eyebrow>
            <Heading>Five nodes. One local-first workflow.</Heading>
          </div>
        </FadeIn>
        <div className="mt-12 grid gap-4 lg:grid-cols-5">
          {architectureNodes.map((node, index) => (
            <FadeIn key={node} delay={index * 0.05}>
              <Card className="flex h-full min-h-[180px] items-center justify-center text-center">
                <div>
                  <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-gradeum-cyan">
                    Node {index + 1}
                  </p>
                  <h3 className="text-xl font-semibold text-gradeum-navy">{node}</h3>
                </div>
              </Card>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.12}>
          <p className="mt-8 max-w-4xl text-base leading-7 text-gradeum-muted">
            Files stay inside the firm environment, the local agent indexes them, and the resulting
            knowledge layer supports search, drafting, and PE-reviewed approvals with a visible
            audit trail.
          </p>
        </FadeIn>
      </Section>

      <Section>
        <FadeIn>
          <div className="max-w-3xl">
            <Eyebrow>Feature Deep Dives</Eyebrow>
            <Heading>Built for standards-heavy, reference-heavy engineering work.</Heading>
          </div>
        </FadeIn>
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {productFeatures.map((feature, index) => (
            <FadeIn key={feature.title} delay={index * 0.05}>
              <Card className="h-full">
                <h3 className="text-2xl font-semibold text-gradeum-navy">{feature.title}</h3>
                <p className="mt-4 text-base leading-7 text-gradeum-muted">{feature.description}</p>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section tone="mist">
        <div className="grid gap-10 lg:grid-cols-2">
          <FadeIn>
            <div className="max-w-xl">
              <Eyebrow>Security</Eyebrow>
              <Heading>Security posture that matches the trust you&apos;re asking for.</Heading>
              <BodyText className="mt-6">
                Gradeum is marketed as a local-first system for firms that need strong boundaries
                around confidential documents, clients, and professional records.
              </BodyText>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {securityItems.map((item) => (
                  <div key={item} className="rounded-3xl border border-gradeum-border bg-white px-5 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-gradeum-navy">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.08}>
            <div className="grid gap-6 sm:grid-cols-2">
              <BrowserMockup
                title="Search Results Placeholder"
                alt="Placeholder browser mockup representing a cited knowledge search interface."
              />
              <BrowserMockup
                title="Draft Review Placeholder"
                alt="Placeholder browser mockup representing a deliverable drafting and review screen."
              />
              <BrowserMockup
                title="Drawing Q&A Placeholder"
                alt="Placeholder browser mockup representing a drawing question and answer interface."
              />
              <BrowserMockup
                title="Audit Trail Placeholder"
                alt="Placeholder browser mockup representing a revision and approval audit trail."
              />
            </div>
          </FadeIn>
        </div>
      </Section>
    </>
  );
}
