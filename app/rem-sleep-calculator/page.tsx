import type { Metadata } from "next";
import Link from "next/link";
import { CalculatorLanding, type CalculatorSearch } from "@/components/CalculatorLanding";
import { pageMetadata, type FaqItem } from "@/lib/seo";

const PATH = "/rem-sleep-calculator";
const TITLE = "REM sleep calculator: a 90-minute plan, not stage detection";
const DESCRIPTION =
  "Plan a bedtime or wake-up with the 90-minute cycle average. sleeptimer cannot detect REM sleep and does not use a microphone, watch, or sensor.";

export const metadata: Metadata = pageMetadata(TITLE, DESCRIPTION, PATH);

const FAQS: readonly FaqItem[] = [
  {
    question: "Does one 90-minute block equal one REM cycle?",
    answer:
      "Ninety minutes is the average this tool uses for a whole cycle. REM is one part of a cycle. The cards never split a cycle into REM and non-REM.",
  },
  {
    question: "Will waking at one of these times line up with REM?",
    answer:
      "The page cannot know the stage you are in. A card is a sum of 90-minute blocks plus your fall-asleep minutes. Treat it as a clock plan.",
  },
  {
    question: "What would a REM reading actually use?",
    answer:
      "Stage scoring uses body signals such as eye movement, muscle tone, and brain activity, usually in a lab. sleeptimer reads none of those. It has no microphone and no sensor.",
  },
];

export default function Page({ searchParams }: { searchParams: Promise<CalculatorSearch> }) {
  return (
    <CalculatorLanding
      searchParams={searchParams}
      path={PATH}
      title={TITLE}
      description={DESCRIPTION}
      heading="REM sleep calculator"
      faqs={FAQS}
    >
      <p>
        REM means rapid eye movement. During a typical night it is one stage inside a cycle, along
        with lighter and deeper sleep, and REM periods often get longer toward morning. A
        90-minute average is a common way to sketch that whole cycle on a clock. This REM sleep
        calculator can do that sketch. It cannot see your stages.
      </p>
      <h2>What the six times actually are</h2>
      <p>
        The cards are 1 through 6 cycles of 90 minutes, shifted by the fall-asleep minutes stored
        on this device. &quot;Wake up at&quot; counts backward from the alarm. &quot;Go to bed
        at&quot; counts forward from the time you get into bed. With the starting 15-minute offset
        and an 11:00 PM bedtime, the 5-cycle card is 6:45 AM. That number is arithmetic. It is a
        clock time, and it is silent about which stage you will be in.
      </p>
      <h2>What this page cannot detect</h2>
      <p>
        It cannot tell when REM starts, how long a REM period lasts, or whether you are dreaming.
        There is no microphone, no wearable, and no motion sensor. Nothing is inferred from how
        quiet the room is. For the same six cards described only as clock time, use the{" "}
        <Link href="/sleep-cycle-calculator">sleep cycle calculator</Link>.
      </p>
    </CalculatorLanding>
  );
}
