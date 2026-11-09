import type { Metadata } from "next";
import Link from "next/link";
import { CalculatorLanding, type CalculatorSearch } from "@/components/CalculatorLanding";
import { pageMetadata, type FaqItem } from "@/lib/seo";

const PATH = "/bedtime-calculator";
const TITLE = "Bedtime calculator: count back from your wake-up";
const DESCRIPTION =
  "Set the time you want to wake up. sleeptimer counts backward in 90-minute cycles and subtracts the minutes you need to fall asleep.";

export const metadata: Metadata = pageMetadata(TITLE, DESCRIPTION, PATH);

const FAQS: readonly FaqItem[] = [
  {
    question: 'Why does this page open on "wake up at"?',
    answer:
      'A bedtime question usually starts from the morning that cannot move. "Wake up at" is mode=wake in the page address. "Go to bed at" is mode=bed. A valid mode or at in the address replaces the opening values.',
  },
  {
    question: "Is the card the moment I have to be asleep?",
    answer:
      "The card is the time to be in bed. The fall-asleep minutes are already subtracted, using the setting for how long sleep usually takes to start. The page cannot know the minute you actually fall asleep.",
  },
  {
    question: "What does the address remember?",
    answer:
      "After Calculate, the address keeps mode and at, such as mode=wake and at=06:30, on this same page. Opening that address again restores the plan. Back clears those two fields.",
  },
];

export default function Page({ searchParams }: { searchParams: Promise<CalculatorSearch> }) {
  return (
    <CalculatorLanding
      searchParams={searchParams}
      path={PATH}
      title={TITLE}
      description={DESCRIPTION}
      heading="Bedtime calculator"
      defaultMode="wake"
      faqs={FAQS}
    >
      <p>
        The bedtime calculator opens on &quot;wake up at&quot;. Set the time you need to be awake,
        and the cards count backward so the cycles finish at that alarm.
      </p>
      <h2>What time should I go to bed?</h2>
      <p>
        The result is the time to get into bed. The fall-asleep minutes are separate from the
        cycle hours: they move that bedtime, and they stay off the hour line on the card.
      </p>
      <h2>Bedtime</h2>
      <p>
        A bedtime here is that get-into-bed time for one of the six cycle lengths. Move the
        wake-up or the fall-asleep setting and the bedtime moves with it. The hours on the card
        stay the cycle count times 90 minutes.
      </p>
      <h2>Counting backward</h2>
      <p>
        Sleep length is the cycle count times 90 minutes. The fall-asleep minutes are added to
        that length, and the total is subtracted from the wake-up. With a 6:30 AM wake-up and the
        starting 15-minute offset, five cycles (7.5 hours) lands at 10:45 PM. Six cycles (9 hours)
        lands at 9:15 PM. One cycle (1.5 hours) lands at 4:45 AM.
      </p>
      <p>
        The clock on the control starts at 11:00 PM, the same default used on the rest of
        sleeptimer, until you change it or open an address that already has an <code>at</code>{" "}
        time. Switch it to your alarm, then press Calculate. If you already know the bedtime and
        want the morning cards, switch to &quot;go to bed at&quot; or use the{" "}
        <Link href="/sleep-time-calculator">sleep time calculator</Link>.
      </p>
    </CalculatorLanding>
  );
}
