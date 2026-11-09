import type { Metadata } from "next";
import Link from "next/link";
import { CalculatorLanding, type CalculatorSearch } from "@/components/CalculatorLanding";
import { CYCLE_LENGTH_MINUTES, DEFAULT_ONSET_MINUTES } from "@/lib/cycles";
import { pageMetadata, type FaqItem } from "@/lib/seo";

const PATH = "/sleep-cycle-calculator";
const TITLE = "Sleep cycle calculator: six times from 90-minute cycles";
const DESCRIPTION =
  "Build six bedtimes or wake-ups from 90-minute cycles plus the minutes you usually need to fall asleep. A clock plan, not a sleep-stage reading.";

export const metadata: Metadata = pageMetadata(TITLE, DESCRIPTION, PATH);

const FAQS: readonly FaqItem[] = [
  {
    question: "Why does every cycle count as 90 minutes?",
    answer:
      "Ninety minutes is the planning average sleeptimer uses for one cycle. The length of a real cycle changes by person and across the night. This page keeps 90 minutes fixed so the six cards stay predictable.",
  },
  {
    question: "Why are there exactly six cards?",
    answer:
      "The list is always 6, 5, 4, 3, 2, and 1 cycle. That puts a short rest and a long night on the same screen. Five cycles, 7.5 hours, is highlighted when the results first open.",
  },
  {
    question: "Which card should I pick?",
    answer:
      "Pick the length that fits the time you have. Five cycles starts selected because it is the middle-length night in this list. The calculator does not know how much sleep you need.",
  },
];

export default function Page({ searchParams }: { searchParams: Promise<CalculatorSearch> }) {
  return (
    <CalculatorLanding
      searchParams={searchParams}
      path={PATH}
      title={TITLE}
      description={DESCRIPTION}
      heading="Sleep cycle calculator"
      faqs={FAQS}
    >
      <p>
        A sleep cycle is the stretch of sleep that moves through lighter sleep, deeper sleep, and
        dream sleep. People often plan that stretch as {CYCLE_LENGTH_MINUTES} minutes. The sleep
        cycle calculator uses that average on purpose: it adds and subtracts clock time so a
        bedtime or a wake-up can land at the end of a planned cycle.
      </p>
      <h2>How the six suggestions are built</h2>
      <p>
        Start from the time in the control. The list runs from 6 cycles down to 1. At{" "}
        {CYCLE_LENGTH_MINUTES} minutes each, the sleep lengths are 9, 7.5, 6, 4.5, 3, and 1.5
        hours. The fall-asleep setting is extra minutes around that length. Bedtime cards move
        earlier by those minutes. Wake-up cards move later.
      </p>
      <p>
        The settings control starts at {DEFAULT_ONSET_MINUTES} minutes, and it accepts 5 to 60
        minutes in steps of 5. With that starting value and a bedtime of 11:00 PM, the 5-cycle
        card is 6:45 AM: 15 minutes to fall asleep, then 7.5 hours. The same offset with a 6:30 AM
        wake-up puts the 5-cycle bedtime at 10:45 PM. Change the offset and all six cards update
        on this device.
      </p>
      <p>
        A small face on each card only marks the length: five and six cycles share one mark, three
        and four another, and one and two a third. Leave the control on &quot;go to bed at&quot;
        when the night is the fixed time. When the morning is fixed, the{" "}
        <Link href="/bedtime-calculator">bedtime calculator</Link> opens on &quot;wake up at&quot;.
      </p>
    </CalculatorLanding>
  );
}
