import { FadeIn } from "@/components/motion";
import { BodyText, Eyebrow, Heading, PrimaryButton, Section } from "@/components/ui";

export default function DocsPage() {
  return (
    <Section className="pt-16 lg:pt-20">
      <FadeIn>
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>Coming Soon</Eyebrow>
          <Heading className="text-center">Product documentation will publish here.</Heading>
          <BodyText className="mt-6">
            For launch, this route exists as a placeholder so visitors never hit a dead end.
          </BodyText>
          <PrimaryButton href="/trial" className="mt-8">
            Start Free Trial
          </PrimaryButton>
        </div>
      </FadeIn>
    </Section>
  );
}
