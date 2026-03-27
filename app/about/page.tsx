import { principles } from "@/components/content";
import { FadeIn } from "@/components/motion";
import { BodyText, Card, Eyebrow, Heading, PlaceholderMedia, PrimaryButton, Section } from "@/components/ui";

export default function AboutPage() {
  return (
    <>
      <Section className="pt-16 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <FadeIn>
            <div className="max-w-xl">
              <Eyebrow>About</Eyebrow>
              <Heading>Built by a PE who knows how much engineering time gets lost to retrieval and reconstruction.</Heading>
              <BodyText className="mt-6">
                Jacob built Gradeum out of marine and coastal engineering work where the hard part
                was often not judgment itself, but recovering references, prior language, and the
                record of what had already been decided.
              </BodyText>
              <BodyText className="mt-4">
                Gradeum exists to help firms preserve institutional memory, accelerate first drafts,
                and keep professional review explicit instead of implied.
              </BodyText>
              <PrimaryButton href="/trial" className="mt-8">
                Start Free Trial
              </PrimaryButton>
            </div>
          </FadeIn>
          <FadeIn delay={0.08}>
            <PlaceholderMedia
              title="Jacob in the Field Placeholder"
              alt="Placeholder image block representing Jacob performing marine or coastal engineering field work."
              className="min-h-[460px]"
            />
          </FadeIn>
        </div>
      </Section>

      <Section tone="mist">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <FadeIn>
            <div className="max-w-xl">
              <Eyebrow>Vision</Eyebrow>
              <Heading>The product vision behind Gradeum.</Heading>
            </div>
          </FadeIn>
          <FadeIn delay={0.08}>
            <blockquote className="rounded-4xl border border-gradeum-border bg-white p-8 font-serif text-2xl italic leading-10 text-gradeum-navy shadow-panel">
              Engineering knowledge should remain available to the firm that earned it. The
              software should recover the memory, trace the source, and prepare the draft. The
              engineer should still decide, review, and sign.
            </blockquote>
          </FadeIn>
        </div>
      </Section>

      <Section>
        <FadeIn>
          <div className="max-w-3xl">
            <Eyebrow>Principles</Eyebrow>
            <Heading>Gradeum is built around a narrow but firm boundary.</Heading>
          </div>
        </FadeIn>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {principles.map((principle, index) => (
            <FadeIn key={principle} delay={index * 0.06}>
              <Card className="h-full">
                <p className="text-xl font-semibold leading-8 text-gradeum-navy">{principle}</p>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Section>
    </>
  );
}
