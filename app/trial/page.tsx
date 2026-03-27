import { TrialForm } from "@/components/trial-form";
import { FadeIn } from "@/components/motion";
import { BodyText, Card, Eyebrow, Heading, PrimaryButton, Section } from "@/components/ui";

const downloadOptions = [
  {
    title: "Installable Build (.exe)",
    description:
      "Recommended for most users who want a guided setup and desktop shortcuts on a Windows workstation."
  },
  {
    title: "Portable Build (.zip)",
    description:
      "For firms that prefer a self-contained folder deployment or want to evaluate in a constrained environment."
  }
];

const systemRequirements = [
  ["OS", "Windows 10 or 11 (64-bit)"],
  ["CPU", "4 cores minimum, 8 cores recommended"],
  ["Memory", "16 GB RAM minimum, 32 GB recommended"],
  ["Storage", "10 GB free space plus project corpus storage"],
  ["Network", "Local network access to the indexed document location"],
  ["Permissions", "Read access to the project folders you want to index"]
];

const quickStart = [
  "Download the build that fits your evaluation environment.",
  "Point Gradeum at a representative project folder on your machine or network share.",
  "Ask the first question and verify the cited sources against your own files."
];

export default function TrialPage() {
  return (
    <>
      <Section className="pt-16 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <FadeIn>
            <div className="max-w-xl">
              <Eyebrow>Free Trial</Eyebrow>
              <Heading>Try Gradeum. On your machine. With your data.</Heading>
              <BodyText className="mt-6">
                This trial is meant to show how quickly your team can search project history,
                recover references, and draft from real internal knowledge while keeping documents
                under your control.
              </BodyText>
              <div className="mt-8 grid gap-5">
                {downloadOptions.map((option) => (
                  <Card key={option.title}>
                    <h2 className="text-2xl font-semibold text-gradeum-navy">{option.title}</h2>
                    <p className="mt-3 text-base leading-7 text-gradeum-muted">{option.description}</p>
                  </Card>
                ))}
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.08}>
            <TrialForm />
          </FadeIn>
        </div>
      </Section>

      <Section tone="mist">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <FadeIn>
            <div className="max-w-xl">
              <Eyebrow>System Requirements</Eyebrow>
              <Heading>Evaluation hardware that keeps the experience smooth.</Heading>
            </div>
          </FadeIn>
          <FadeIn delay={0.08}>
            <div className="overflow-hidden rounded-4xl border border-gradeum-border bg-white shadow-panel">
              <table className="min-w-full divide-y divide-gradeum-border">
                <tbody className="divide-y divide-gradeum-border">
                  {systemRequirements.map(([label, value]) => (
                    <tr key={label}>
                      <th className="w-40 bg-gradeum-mist px-6 py-4 text-left text-sm font-semibold uppercase tracking-[0.1em] text-gradeum-navy">
                        {label}
                      </th>
                      <td className="px-6 py-4 text-base leading-7 text-gradeum-muted">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>
        </div>
      </Section>

      <Section>
        <FadeIn>
          <div className="max-w-3xl">
            <Eyebrow>Quick Start</Eyebrow>
            <Heading>From first download to first answer in three steps.</Heading>
          </div>
        </FadeIn>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {quickStart.map((step, index) => (
            <FadeIn key={step} delay={index * 0.06}>
              <Card className="h-full">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradeum-navy text-lg font-semibold text-white">
                  {index + 1}
                </div>
                <p className="mt-5 text-xl font-semibold leading-8 text-gradeum-navy">{step}</p>
              </Card>
            </FadeIn>
          ))}
        </div>
        <div className="mt-10">
          <PrimaryButton href="/pricing">Review Pricing</PrimaryButton>
        </div>
      </Section>
    </>
  );
}
