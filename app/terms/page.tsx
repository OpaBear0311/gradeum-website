import { FadeIn } from "@/components/motion";
import { BodyText, Eyebrow, Heading, Section } from "@/components/ui";

export default function TermsPage() {
  return (
    <Section className="pt-16 lg:pt-20">
      <FadeIn>
        <div className="mx-auto max-w-4xl">
          <Eyebrow>Terms</Eyebrow>
          <Heading>Terms placeholder.</Heading>
          <BodyText className="mt-6">
            This page is reserved for Gradeum&apos;s formal terms and conditions. Until finalized,
            all product messaging on the site should be treated as marketing information rather than
            a contractual offer.
          </BodyText>
        </div>
      </FadeIn>
    </Section>
  );
}
