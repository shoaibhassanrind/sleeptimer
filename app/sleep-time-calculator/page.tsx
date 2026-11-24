import type { Metadata } from "next";
import Link from "next/link";
import { CalculatorLanding, type CalculatorSearch } from "@/components/CalculatorLanding";
import { calculate, CYCLE_LENGTH_MINUTES, DEFAULT_ONSET_MINUTES } from "@/lib/cycles";
import { pageMetadata, type FaqItem } from "@/lib/seo";

const PATH = "/sleep-time-calculator";
const ORIGIN = "https://getsleepcalculator.com";
const CANONICAL = `${ORIGIN}${PATH}`;
const TITLE = "Sleep Time Calculator: Hours Until You Wake | GetSleepCalculator";
const DESCRIPTION =
  "Use our sleep time calculator to turn a bedtime into six sleep durations and wake-up times. See how many hours of sleep each option includes.";
const H1 = "Sleep Time Calculator: How Many Hours Until You Wake?";

export const metadata: Metadata = {
  ...pageMetadata(TITLE, DESCRIPTION, PATH),
  metadataBase: new URL(ORIGIN),
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: CANONICAL,
    siteName: "Get Sleep Calculator",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: TITLE,
    description: DESCRIPTION,
  },
};

const FAQS: readonly FaqItem[] = [
  {
    question: "Do the hour labels include the time it takes to fall asleep?",
    answer:
      "No. The hour line is the cycle count times 90 minutes. The fall-asleep minutes move the wake-up later and stay off that hour line.",
  },
  {
    question: "What time does Sleep now use?",
    answer:
      "Sleep now uses the current time as the bedtime. It rounds that time to the nearest five minutes, and seconds count in the rounding. It then shows the same six lengths as any other bedtime.",
  },
  {
    question: "Can this tell me how long I slept last night?",
    answer:
      "No. It has no sleep log. It only turns a bedtime you enter into six possible lengths, from 1.5 hours to 9 hours.",
  },
];

const BREADCRUMBS = [
  { name: "Sleep calculator", path: "/" },
  { name: "Sleep time calculator", path: PATH },
] as const;

const TEN_THIRTY = calculate({
  mode: "bed",
  at: "22:30",
  onset: DEFAULT_ONSET_MINUTES,
  now: new Date(2026, 0, 15, 12, 0, 0),
});

const EXAMPLE_OPTIONS = [...TEN_THIRTY.options].sort((a, b) => a.cycles - b.cycles);

function hoursText(cycles: number): string {
  const hours = (cycles * CYCLE_LENGTH_MINUTES) / 60;
  const text = Number.isInteger(hours) ? String(hours) : hours.toFixed(1);
  return `${text} ${hours === 1 ? "hour" : "hours"}`;
}

export default function Page({ searchParams }: { searchParams: Promise<CalculatorSearch> }) {
  const fiveCycles = EXAMPLE_OPTIONS.find((option) => option.cycles === 5);
  const sixCycles = EXAMPLE_OPTIONS.find((option) => option.cycles === 6);
  const fourCycles = EXAMPLE_OPTIONS.find((option) => option.cycles === 4);

  return (
    <CalculatorLanding
      searchParams={searchParams}
      path={PATH}
      title={TITLE}
      description={DESCRIPTION}
      heading={H1}
      schemaName={H1}
      faqs={FAQS}
      faqHeading="Frequently Asked Questions"
      faqPage={false}
      breadcrumbs={BREADCRUMBS}
      linkCurrentCrumb
      origin={ORIGIN}
      siteName="Get Sleep Calculator"
      inLanguage="en"
    >
      <p>
        You already know when you will get into bed. This sleep time calculator turns that bedtime
        into six lengths, from a short stretch to a long night, and pairs each length with a
        wake-up time.
      </p>
      <p>
        Each card is a planning estimate. The hours are the cycle count times{" "}
        {CYCLE_LENGTH_MINUTES} minutes. The times belong on a clock. Your results are planning
        estimates, so your actual morning energy may differ.
      </p>

      <h2>What This Sleep Time Calculator Shows</h2>
      <p>
        You enter a bedtime. This page already opens on &quot;go to bed at,&quot; so the first
        field is the time you get into bed. Calculate then lists six cards. Every card shows an
        hour length and the clock time when that length would end.
      </p>
      <p>
        Read the hours as time asleep. The minutes you usually need to fall asleep are kept
        separate. They push the wake-up later, and they are not added into the hour printed for
        the cycles.
      </p>
      <p>
        When the morning is the time that cannot move, switch to the{" "}
        <Link href="/bedtime-calculator">bedtime calculator</Link>. That page opens on &quot;wake
        up at&quot; and counts backward. This one stays with a bedtime you already have.
      </p>

      <h2>How the Hours Are Counted</h2>
      <p>
        The sleep on a card is the cycle count times {CYCLE_LENGTH_MINUTES} minutes. One cycle is
        1.5 hours. Two cycles are 3 hours. Three are 4.5 hours. Four are 6 hours. Five are 7.5
        hours. Six are 9 hours. Those figures are the hour labels. They do not include the
        fall-asleep allowance.
      </p>
      <p>
        The allowance starts at {DEFAULT_ONSET_MINUTES} minutes. You can move it anywhere from 5
        minutes to 60 minutes. Each step is 5 minutes, and the six morning times update on this
        device as soon as you change it. A larger allowance delays every wake-up, because the
        planned sleep begins later. The hour labels stay the same.
      </p>
      <p>
        The control still opens at 11:00 PM. On this page that hour is only a starting bedtime,
        not a time chosen for you. Replace 11:00 PM with the time you will actually get into bed
        before you press Calculate.
      </p>

      <h2>A 10:30 PM Bedtime, Counted in Hours</h2>
      <p>
        Suppose you get into bed at {TEN_THIRTY.input.label} and you leave the fall-asleep setting
        at {DEFAULT_ONSET_MINUTES} minutes. Counting forward, the six wake-up times are:
      </p>
      <ul>
        {EXAMPLE_OPTIONS.map((option) => (
          <li key={option.cycles}>
            {option.cycles} {option.cycles === 1 ? "cycle" : "cycles"}, {hoursText(option.cycles)}:{" "}
            {option.when.label}
          </li>
        ))}
      </ul>
      <p>
        Five cycles means getting into bed at {TEN_THIRTY.input.label}, allowing{" "}
        {DEFAULT_ONSET_MINUTES} minutes to fall asleep, and waking at {fiveCycles?.when.label}{" "}
        after 7 hours and 30 minutes. Six cycles moves the wake-up to {sixCycles?.when.label} and
        plans 9 hours of sleep. Four cycles ends at {fourCycles?.when.label}, which is 6 hours of
        planned sleep. The addition is exact for those numbers. It does not say the shorter night
        was enough.
      </p>
      <p>
        These clock times belong to a {TEN_THIRTY.input.label} bedtime only. If your evening is
        different, type that bedtime before you treat a card as a plan. Change the bedtime or the
        allowance and every wake-up moves. The gap between neighboring cards stays one{" "}
        {`${CYCLE_LENGTH_MINUTES}-minute`} block, and the hour labels stay the same.
      </p>

      <h2>What Sleep Now Does</h2>
      <p>
        Sleep now is the shortcut when the bedtime is this moment. It takes the current time,
        rounds it to the nearest five minutes, and calculates as &quot;go to bed at.&quot; Seconds
        count in that rounding, so a time just past the halfway point moves up to the next
        five-minute mark. You still get the same six lengths, from 1.5 hours to 9 hours.
      </p>
      <p>
        It does not look up last night, and it does not know whether you are already in bed. It
        only uses the clock on this device as the bedtime for a fresh count.
      </p>

      <h2>How to Choose a Longer or Shorter Sleep Time</h2>
      <p>
        Read the hours before the morning clock. Five cycles is 7.5 hours of planned sleep. Six
        cycles is 9 hours, the longest card on the list. Four cycles is 6 hours. Three cycles and
        below are a short night or a nap-length stretch on this scale.
      </p>
      <p>
        Take the longest card the evening can actually hold. The shorter cards are there for a
        bedtime that is already late. They make a poor habit if a longer option was available and
        you skipped it. The small icon groups the cards by length. The 7.5-hour and 9-hour cards
        share one icon. The 6-hour card and everything shorter share another. That icon does not
        predict the morning.
      </p>
      <p>
        What each cycle count is for, beyond the hour label, is written on the{" "}
        <Link href="/sleep-cycle-calculator">sleep cycle calculator</Link>. This page stays with
        the hours that follow a bedtime you chose.
      </p>

      <h2>How Accurate Is a Sleep Time Count?</h2>
      <p>
        The addition is exact for the bedtime and the allowance you typed. This page keeps a fixed{" "}
        {`${CYCLE_LENGTH_MINUTES}-minute`} step so the six hour labels stay easy to line up. That
        step is a planning interval. It is not a minute your body is required to hit, and the page
        cannot see whether a real cycle matched it.
      </p>
      <p>
        Nothing here records brain activity, breathing, or movement. The calculator cannot name a
        sleep stage or promise that you will wake between cycles. How the stages differ, including
        REM, is covered on the <Link href="/rem-sleep-calculator">REM sleep calculator</Link>.
      </p>
      <p>
        If the fall-asleep allowance is wrong for you, every wake-up is off by that same gap. Fix
        the setting before you keep a card. The result is a draft for a bedtime you already have.
        This calculator provides general timing estimates, not an assessment of your sleep health.
      </p>
    </CalculatorLanding>
  );
}
