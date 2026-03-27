import { FadeIn } from "@/components/motion";
import { BodyText, Eyebrow, Heading, PrimaryButton, Section } from "@/components/ui";

export default function BlogPage() {
  return (
    <Section className="pt-16 lg:pt-20">
      <FadeIn>
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>Coming Soon</Eyebrow>
          <Heading className="text-center">Gradeum journal and field notes are on the way.</Heading>
          <BodyText className="mt-6">
            This placeholder keeps navigation intact while editorial content is still being
            prepared.
          </BodyText>
          <PrimaryButton href="/trial" className="mt-8">
            Start Free Trial
          </PrimaryButton>
        </div>
      </FadeIn>
    </Section>
  );
}
