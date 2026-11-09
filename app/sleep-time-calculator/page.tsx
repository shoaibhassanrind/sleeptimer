import type { Metadata } from "next";
import Link from "next/link";
import { CalculatorLanding, type CalculatorSearch } from "@/components/CalculatorLanding";
import { CYCLE_COUNTS, CYCLE_LENGTH_MINUTES } from "@/lib/cycles";
import { pageMetadata, type FaqItem } from "@/lib/seo";

const PATH = "/sleep-time-calculator";
const TITLE = "Sleep time calculator: 1.5 to 9 hours, in cycles";
const DESCRIPTION =
  "See how long each sleep suggestion is. Six cards cover 1.5, 3, 4.5, 6, 7.5, and 9 hours, then shift by the minutes you need to fall asleep.";

export const metadata: Metadata = pageMetadata(TITLE, DESCRIPTION, PATH);

const FAQS: readonly FaqItem[] = [
  {
    question: "Do the hour labels include the time it takes to fall asleep?",
    answer:
      "The hour line is the cycle count times 90 minutes. The fall-asleep setting moves the clock time and stays out of that hour line.",
  },
  {
    question: "What time does Sleep now use?",
    answer:
      'Sleep now sets "go to bed at" to the current time, rounded to the nearest five minutes, with seconds included in the rounding. It then builds the same six lengths.',
  },
  {
    question: "Can this tell me how long I slept last night?",
    answer:
      "It has no sleep log. It turns a time you enter into six possible lengths, from 1.5 hours to 9 hours.",
  },
];

function hourLabel(cycles: number): string {
  const hours = (cycles * CYCLE_LENGTH_MINUTES) / 60;
  const text = Number.isInteger(hours) ? String(hours) : hours.toFixed(1);
  const unit = hours === 1 ? "hour" : "hours";
  const cycleWord = cycles === 1 ? "cycle" : "cycles";
  return `${cycles} ${cycleWord}: ${text} ${unit}`;
}

export default function Page({ searchParams }: { searchParams: Promise<CalculatorSearch> }) {
  return (
    <CalculatorLanding
      searchParams={searchParams}
      path={PATH}
      title={TITLE}
      description={DESCRIPTION}
      heading="Sleep time calculator"
      faqs={FAQS}
    >
      <p>
        The sleep time calculator is about duration. Choose a time to be in bed, and the six cards
        show how long each option lasts and what clock time that makes in the morning. The hours
        come from the cycle count. The clock time and the fall-asleep offset are the parts you
        change.
      </p>
      <h2>The six lengths</h2>
      <ul>
        {CYCLE_COUNTS.map((cycles) => (
          <li key={cycles}>{hourLabel(cycles)}</li>
        ))}
      </ul>
      <p>
        Those hours leave out the fall-asleep minutes. The offset is time in bed before that sleep
        length starts. From 11:00 PM with the starting 15-minute offset, the 7.5-hour card is a
        6:45 AM wake-up, the 9-hour card is 8:15 AM, and the 1.5-hour card is 12:45 AM.
      </p>
      <p>
        Sleep now is the shortcut when the bedtime is &quot;right now&quot;. It rounds the current
        time to five minutes and calculates as &quot;go to bed at&quot;. To count the same lengths
        backward from an alarm, switch the control to &quot;wake up at&quot;, or open the{" "}
        <Link href="/bedtime-calculator">bedtime calculator</Link>, which starts in that mode.
      </p>
    </CalculatorLanding>
  );
}
