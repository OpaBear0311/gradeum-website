import { FaqAccordion } from "@/components/faq-accordion";
import { pricingFaqs } from "@/components/content";
import { FadeIn } from "@/components/motion";
import { BodyText, Card, Eyebrow, Heading, PrimaryButton, Section } from "@/components/ui";

const tiers = [
  {
    name: "Core",
    seats: "Up to 5 seats",
    price: "$6K-$12K/year",
    detail: "Best for small specialist teams piloting internal knowledge capture and draft support."
  },
  {
    name: "Pro",
    seats: "Up to 25 seats",
    price: "$24K-$60K/year",
    detail: "Designed for growing engineering groups standardizing search, drafting, and PE review workflows.",
    featured: true
  },
  {
    name: "Enterprise",
    seats: "Unlimited seats",
    price: "Custom",
    detail: "For multi-team rollouts that need security review, implementation planning, and change management."
  }
];

const implementationServices = [
  "Standard implementation: $8.5K-$15K",
  "Enterprise implementation: $25K-$45K",
  "Remote implementation: $2.5K"
];

export default function PricingPage() {
  return (
    <>
      <Section className="pt-16 lg:pt-20">
        <FadeIn>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>Pricing</Eyebrow>
            <Heading className="text-center">Trial first. Pricing scaled to team size and rollout scope.</Heading>
            <BodyText className="mt-6">
              Every plan includes local-first deployment, PE-reviewed workflow support, and a path
              to evaluate Gradeum with your own data before committing.
            </BodyText>
          </div>
        </FadeIn>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {tiers.map((tier, index) => (
            <FadeIn key={tier.name} delay={index * 0.06}>
              <Card
                className={tier.featured ? "relative border-gradeum-cyan bg-gradient-to-b from-gradeum-cyan/8 to-white" : ""}
              >
                {tier.featured ? (
                  <div className="mb-6 inline-flex rounded-full bg-gradeum-gold px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-gradeum-navy">
                    Most Common
                  </div>
                ) : null}
                <h2 className="text-3xl font-semibold text-gradeum-navy">{tier.name}</h2>
                <p className="mt-3 text-sm font-semibold uppercase tracking-[0.12em] text-gradeum-cyan">
                  {tier.seats}
                </p>
                <p className="mt-6 text-4xl font-semibold text-gradeum-navy">{tier.price}</p>
                <p className="mt-4 text-base leading-7 text-gradeum-muted">{tier.detail}</p>
                <PrimaryButton href="/trial" className="mt-8 w-full">
                  Start Free Trial
                </PrimaryButton>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section tone="mist">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <FadeIn>
            <div className="max-w-xl">
              <Eyebrow>Implementation</Eyebrow>
              <Heading>Deployment support sized to the complexity of your corpus.</Heading>
              <BodyText className="mt-6">
                Firms can start with a remote setup or engage Gradeum for a broader implementation
                that covers indexing, templates, governance, and rollout planning.
              </BodyText>
              <div className="mt-8 space-y-4">
                {implementationServices.map((service) => (
                  <div key={service} className="rounded-3xl border border-gradeum-border bg-white px-5 py-4 text-base font-medium text-gradeum-navy">
                    {service}
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.08}>
            <div>
              <Eyebrow>FAQ</Eyebrow>
              <Heading>Questions firms usually ask before rollout.</Heading>
              <div className="mt-8">
                <FaqAccordion items={pricingFaqs} />
              </div>
            </div>
          </FadeIn>
        </div>
      </Section>
    </>
  );
}
