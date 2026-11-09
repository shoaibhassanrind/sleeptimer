import type { Metadata } from "next";
import Link from "next/link";
import { CalculatorLanding, type CalculatorSearch } from "@/components/CalculatorLanding";
import { pageMetadata, type FaqItem } from "@/lib/seo";

const PATH = "/sleep-schedule";
const TITLE = "Sleep schedule: six bed and wake times from cycle length";
const DESCRIPTION =
  "A sleep schedule here is the set of bed and wake times from six cycle lengths. Each time uses 90-minute cycles plus the minutes you need to fall asleep. It is not a medical plan.";

export const metadata: Metadata = pageMetadata(TITLE, DESCRIPTION, PATH);

const FAQS: readonly FaqItem[] = [
  {
    question: "What does sleep schedule mean on this page?",
    answer:
      "It is the six bedtimes or six wake-up times from 1.5, 3, 4.5, 6, 7.5, and 9 hours. Those times come from 90-minute cycles plus your fall-asleep minutes. It is not a medical plan, and it does not prescribe how long you should sleep.",
  },
  {
    question: "Which control builds the schedule?",
    answer:
      "Wake up at counts backward to times to get into bed. Go to bed at counts forward to wake-up times. Both lists use the same six lengths.",
  },
  {
    question: "Can the schedule line up with a sleep stage?",
    answer:
      "It cannot. This page does not detect REM or any other stage. A time on the schedule is clock arithmetic only.",
  },
];

export default function Page({ searchParams }: { searchParams: Promise<CalculatorSearch> }) {
  return (
    <CalculatorLanding
      searchParams={searchParams}
      path={PATH}
      title={TITLE}
      description={DESCRIPTION}
      heading="Sleep schedule"
      faqs={FAQS}
    >
      <p>
        A sleep schedule here means the set of bed and wake times from the six cycle lengths. It
        is a clock plan you can read off the cards. It is not a medical plan, and it does not
        decide how long you should sleep.
      </p>
      <h2>Bed times and wake times</h2>
      <p>
        Choose wake up at when the morning is fixed. Each card is a time to get into bed, and the
        fall-asleep minutes stay separate from the cycle length. Choose go to bed at when the
        night is fixed, and the same six lengths become wake-up times.
      </p>
      <p>
        The lengths are always 6 cycles down to 1, at 90 minutes each. To start from an alarm, the{" "}
        <Link href="/bedtime-calculator">bedtime calculator</Link> opens on wake up at. To start
        from a night time, the <Link href="/sleep-time-calculator">sleep time calculator</Link>{" "}
        opens on go to bed at.
      </p>
    </CalculatorLanding>
  );
}
