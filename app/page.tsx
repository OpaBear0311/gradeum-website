import { FadeIn } from "@/components/motion";
import { coreFeatures, homeStats, workflowSteps } from "@/components/content";
import { BodyText, BrowserMockup, Eyebrow, Heading, PlaceholderMedia, PrimaryButton, Section } from "@/components/ui";

export default function HomePage() {
  return (
    <>
      <Section className="overflow-hidden bg-hero-radial pt-16 lg:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <FadeIn>
            <div>
              <Eyebrow>Gradeum Technologies LLC</Eyebrow>
              <h1 className="text-5xl font-bold uppercase tracking-tight text-gradeum-navy sm:text-6xl lg:text-7xl">
                AI for the<br />infrastructure<br />of our world
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-8 text-gradeum-muted">
                Engineering firms that design it. Agencies that maintain it. Industry that builds it.
              </p>
              <div className="mt-6 space-y-1">
                <p className="text-xl font-semibold text-gradeum-navy sm:text-2xl">Engineers</p>
                <p className="text-xl font-semibold text-gradeum-navy sm:text-2xl">Agencies</p>
                <p className="text-xl font-semibold text-gradeum-navy sm:text-2xl">Companies</p>
              </div>
              <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <PrimaryButton href="/trial">Start Free Trial</PrimaryButton>
                <p className="text-sm leading-6 text-gradeum-muted">
                  30-day trial. Your data stays on your machine. No credit card required.
                </p>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="relative">
              <div className="absolute -left-6 top-6 hidden h-32 w-32 rounded-full bg-gradeum-gold/15 blur-3xl sm:block" />
              <BrowserMockup
                title="Product Screenshot Placeholder"
                alt="Placeholder browser frame representing a Gradeum product screenshot in a mission control style interface."
                className="relative"
              />
            </div>
          </FadeIn>
        </div>
      </Section>

      <Section tone="mist">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <FadeIn>
            <PlaceholderMedia
              title="Port Terminal Aerial Placeholder"
              alt="Desaturated placeholder block for a port terminal aerial photograph spanning the hero and problem narrative."
              className="min-h-[420px]"
            />
          </FadeIn>
          <FadeIn delay={0.08}>
            <Eyebrow>The Problem</Eyebrow>
            <Heading>Half your week isn&apos;t engineering.</Heading>
            <BodyText className="mt-6">
              The engineer who should be doing engineering is spending half their time doing
              everything but. Searching for references they&apos;ve found before. Rebuilding
              documents they&apos;ve already built. Tracking down permits. Formatting reports.
            </BodyText>
            <blockquote className="mt-8 border-l-4 border-gradeum-gold pl-6 font-serif text-xl italic leading-8 text-gradeum-navy">
              Every hour stolen from engineering judgment is a small violation of the oath. Not
              from negligence. Not from incompetence. From volume.
            </blockquote>
          </FadeIn>
        </div>
        <div className="mt-12 space-y-4">
          {homeStats.map((stat, index) => (
            <FadeIn key={stat.label} delay={index * 0.06}>
              <div className="border-l-4 border-gradeum-navy pl-6 py-3">
                <p className="text-3xl font-semibold text-gradeum-navy">{stat.value}</p>
                <p className="mt-1 text-base leading-7 text-gradeum-muted">{stat.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section>
        <FadeIn>
          <div className="max-w-2xl">
            <Eyebrow>What Gradeum Does</Eyebrow>
            <Heading>Gradeum does everything else.</Heading>
          </div>
        </FadeIn>
        <div className="mt-12 space-y-8">
          {coreFeatures.map((feature, index) => (
            <FadeIn key={feature.title} delay={index * 0.06}>
              <div className="border-l-4 border-gradeum-cyan pl-6">
                <h3 className="text-2xl font-semibold text-gradeum-navy">{feature.title}</h3>
                <p className="mt-2 text-base leading-7 text-gradeum-muted">{feature.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section tone="mist">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <FadeIn>
            <div className="max-w-xl">
              <Eyebrow>How It Works</Eyebrow>
              <Heading>Built for firms that need traceability as much as speed.</Heading>
              <BodyText className="mt-6">
                Gradeum keeps engineering knowledge usable without asking your team to surrender
                security, responsible charge, or professional review.
              </BodyText>
            </div>
          </FadeIn>
          <div className="space-y-8">
            {workflowSteps.map((step, index) => (
              <FadeIn key={step.title} delay={index * 0.07}>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradeum-navy text-lg font-semibold text-white">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-gradeum-navy">{step.title}</h3>
                    <p className="mt-2 text-base leading-7 text-gradeum-muted">{step.description}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="navy" className="relative overflow-hidden">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <FadeIn>
            <div className="max-w-xl">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-gradeum-gold">
                Final Call
              </p>
              <h2 className="text-balance text-4xl font-semibold sm:text-5xl">
                The practice of engineering. Remembered.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-white/80">
                Give your engineers back the time they should be spending on judgment, design, and
                review.
              </p>
              <PrimaryButton href="/trial" className="mt-8">
                Start Free Trial
              </PrimaryButton>
            </div>
          </FadeIn>
          <FadeIn delay={0.08}>
            <PlaceholderMedia
              title="Bridge and Causeway Placeholder"
              alt="Placeholder image block representing a bridge or causeway used in the final call-to-action section."
              className="min-h-[340px] bg-white/10"
            />
          </FadeIn>
        </div>
      </Section>
    </>
  );
}
