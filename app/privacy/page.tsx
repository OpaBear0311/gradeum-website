import { FadeIn } from "@/components/motion";
import { BodyText, Eyebrow, Heading, Section } from "@/components/ui";

export default function PrivacyPage() {
  return (
    <Section className="pt-16 lg:pt-20">
      <FadeIn>
        <div className="mx-auto max-w-4xl">
          <Eyebrow>Privacy</Eyebrow>
          <Heading>Privacy policy placeholder.</Heading>
          <BodyText className="mt-6">
            This page is reserved for Gradeum&apos;s formal privacy policy. Until final legal copy is
            supplied, the site avoids third-party trackers beyond Vercel Analytics and keeps trial
            lead collection limited to the submitted email address.
          </BodyText>
        </div>
      </FadeIn>
    </Section>
  );
}
