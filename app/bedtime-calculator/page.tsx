import type { Metadata } from "next";
import Link from "next/link";
import { CalculatorLanding, type CalculatorSearch } from "@/components/CalculatorLanding";
import { CYCLE_LENGTH_MINUTES, DEFAULT_ONSET_MINUTES } from "@/lib/cycles";
import { pageMetadata, type FaqItem } from "@/lib/seo";

const PATH = "/bedtime-calculator";
const ORIGIN = "https://getsleepcalculator.com";
const CANONICAL = `${ORIGIN}${PATH}`;
const TITLE = "Bedtime Calculator: What Time to Go to Bed | GetSleepCalculator";
const DESCRIPTION =
  "Use our bedtime calculator to count back from your wake-up time and see when to get into bed. Six options follow estimated 90-minute sleep cycles.";
const H1 = "Bedtime Calculator: What Time Should You Go to Bed?";

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
    question: "Is the card the time to get into bed?",
    answer:
      "Yes. The card is a get-into-bed time. The fall-asleep minutes are already subtracted, using the allowance you set. The page cannot see the minute you actually fall asleep.",
  },
  {
    question: "How do the fall-asleep minutes move a bedtime?",
    answer:
      "Each extra minute in the allowance moves every bedtime earlier by one minute. The cycle hours on the card stay the same. With a 7:00 AM alarm, raising the allowance from 15 minutes to 30 minutes moves the five-cycle bedtime from 11:15 PM to 11:00 PM.",
  },
  {
    question: "Should I choose the five-cycle bedtime or the six-cycle bedtime?",
    answer:
      "Six cycles is the earlier bedtime and a 9-hour night of planned sleep. Five cycles is 7.5 hours and a later bedtime. Take six when you can be in bed that early. Take five when the evening runs later and 7.5 hours still fits before the alarm. A shorter card is for a morning that is already too close, not a target for an ordinary night.",
  },
  {
    question: "Why does the clock still show 11:00 PM?",
    answer:
      "The control opens at 11:00 PM until you change it. The mode on this page is already “wake up at,” so that opening hour is not your alarm. Replace it with the time you have to be up, then press Calculate.",
  },
  {
    question: "Will one of these bedtimes guarantee I wake up rested?",
    answer:
      "No. The page only counts backward from the alarm you entered. It does not measure your sleep, and landing on a cycle boundary is still an estimate, not a promise about how you will feel.",
  },
];

const BREADCRUMBS = [
  { name: "Sleep calculator", path: "/" },
  { name: "Bedtime calculator", path: PATH },
] as const;

export default function Page({ searchParams }: { searchParams: Promise<CalculatorSearch> }) {
  return (
    <CalculatorLanding
      searchParams={searchParams}
      path={PATH}
      title={TITLE}
      description={DESCRIPTION}
      heading={H1}
      schemaName={H1}
      defaultMode="wake"
      faqs={FAQS}
      faqHeading="Frequently Asked Questions"
      faqPage={false}
      breadcrumbs={BREADCRUMBS}
      linkCurrentCrumb
      origin={ORIGIN}
      siteName="Get Sleep Calculator"
      inLanguage="en"
      afterFaq={
        <section className="guide" aria-labelledby="bedtime-references">
          <h2 id="bedtime-references">References</h2>
          <p>
            The cycle range and the adult sleep figure in this guide come from the public pages
            below. Those pages are not a review of this calculator.
          </p>
          <ul>
            <li>
              <a href="https://www.nhlbi.nih.gov/health/sleep/stages-of-sleep" rel="noopener noreferrer">
                NHLBI: How Sleep Works — Sleep Phases and Stages
              </a>
            </li>
            <li>
              <a href="https://www.cdc.gov/sleep/about/" rel="noopener noreferrer">
                CDC: About Sleep
              </a>
            </li>
          </ul>
        </section>
      }
    >
      <p>
        A morning that cannot move is the usual reason to look for a bedtime. This bedtime
        calculator starts from that alarm and counts backward to six times you could get into bed.
      </p>
      <p>
        Each card is a planning estimate. It repeats a {`${CYCLE_LENGTH_MINUTES}-minute`} block, then
        shifts the result earlier by the minutes you usually need to fall asleep. The times belong
        on a clock. They are not a promise about how rested you will feel, and they are not
        medical advice.
      </p>

      <h2>What This Bedtime Calculator Estimates</h2>
      <p>
        You enter the time you need to be awake. This page already opens on &quot;wake up
        at,&quot; so the first field is that alarm. Calculate then lists six bedtimes, from a long
        night down to a very short one.
      </p>
      <p>
        The other tools here answer a different question. The{" "}
        <Link href="/sleep-cycle-calculator">sleep cycle calculator</Link> explains what the six
        lengths mean and can count forward from a bedtime you have already chosen. When the
        morning is the time that is stuck, stay on this page and work backward.
      </p>

      <h2>How Counting Backward from a Wake-Up Time Works</h2>
      <p>
        The sleep on a card is the cycle count times {CYCLE_LENGTH_MINUTES} minutes. One cycle is
        1.5 hours of planned sleep. Five cycles are 7.5 hours. Six cycles are 9 hours. The
        fall-asleep allowance is added to that length, and the whole total is subtracted from the
        wake-up.
      </p>
      <p>
        The allowance starts at {DEFAULT_ONSET_MINUTES} minutes. You can set it from 5 to 60
        minutes, in steps of 5, and the list updates on this device. A longer allowance pulls
        every bedtime earlier, because you need more time in bed before the planned sleep begins.
        The cycle hours printed on the card do not change.
      </p>
      <p>
        The clock still opens at 11:00 PM, the shared starting hour on this site, even though the
        mode is already &quot;wake up at.&quot; That 11:00 PM is not your alarm. Set the control
        to the time you actually have to be up, then press Calculate.
      </p>

      <h2>Why the Card Is a Bedtime, Not the Moment You Fall Asleep</h2>
      <p>
        Read the card as the time to get into bed. The fall-asleep minutes are already removed,
        using the allowance you set. With the starting {`${DEFAULT_ONSET_MINUTES}-minute`} allowance,
        the card is {DEFAULT_ONSET_MINUTES} minutes earlier than the moment the planned sleep is
        assumed to begin.
      </p>
      <p>
        Nothing on the page can find the minute you really drift off. If you lie awake longer
        than the setting, sleep starts late and the alarm cuts the night short. Raise the
        allowance and read the cards again. If you usually fall asleep faster, lower it.
      </p>
      <p>
        When the bedtime is the time you already know, and you want the morning instead, switch
        the control to &quot;go to bed at&quot; or open the{" "}
        <Link href="/sleep-time-calculator">sleep time calculator</Link>.
      </p>

      <h2>A 7:00 AM Wake-Up, Counted Backward</h2>
      <p>
        Suppose the alarm is 7:00 AM and you leave the fall-asleep setting at{" "}
        {DEFAULT_ONSET_MINUTES} minutes. Counting backward, the six get-into-bed times are:
      </p>
      <ul>
        <li>6 cycles: 9:45 PM</li>
        <li>5 cycles: 11:15 PM</li>
        <li>4 cycles: 12:45 AM</li>
        <li>3 cycles: 2:15 AM</li>
        <li>2 cycles: 3:45 AM</li>
        <li>1 cycle: 5:15 AM</li>
      </ul>
      <p>
        Five cycles means getting into bed at 11:15 PM, falling asleep around 11:30 PM, and waking
        at 7:00 AM after 7 hours and 30 minutes. Six cycles moves bedtime to 9:45 PM and plans 9
        hours of sleep before the same alarm. Four cycles, bedtime 12:45 AM, leaves 6 hours. That
        is a short night for most adults, even though the subtraction lands exactly on 7:00 AM.
      </p>
      <p>
        These clock times belong to a 7:00 AM alarm only. If your morning is different, type that
        wake-up before you treat a card as a plan. Change the alarm or the allowance and every
        bedtime moves. The gap between neighboring cards stays one{" "}
        {`${CYCLE_LENGTH_MINUTES}-minute`} block.
      </p>
      <p>
        If that same 7:00 AM alarm repeats on weekdays, the{" "}
        <Link href="/sleep-schedule">sleep schedule</Link> page can hold the same kind of estimate
        as a repeating plan.
      </p>

      <h2>How to Choose a Longer or Shorter Bedtime</h2>
      <p>
        Start from the bedtime you can keep, then see how much night it leaves before the alarm.
        For many adults, five cycles is the card that still looks like a full night: 7.5 hours of
        planned sleep, plus the minutes spent falling asleep. Six cycles is the earlier bedtime, a
        9-hour night, when the evening can hold it.
      </p>
      <p>
        For adults 18 to 60, the{" "}
        <a href="https://www.cdc.gov/sleep/about/" rel="noopener noreferrer">
          CDC&apos;s general guidance
        </a>{" "}
        is at least 7 hours of sleep. Five cycles on this list, at 7.5 hours of planned sleep,
        sits inside that range for a lot of people. Four cycles, at 6 hours, falls under it. The
        shorter cards are there for a morning that is already too close. They make a poor routine
        if an earlier bedtime was possible and you passed it by.
      </p>
      <p>
        The face on a card only groups the lengths. Five and six cycles share one mark. One
        through four cycles share the other. The mark is not a grade of how you will feel in the
        morning.
      </p>
      <p>
        What each length means when you count forward from a bedtime is written on the{" "}
        <Link href="/sleep-cycle-calculator">sleep cycle calculator</Link>. This page stays with
        the backward count from a fixed wake-up.
      </p>

      <h2>How Accurate Is a Backward Bedtime Count?</h2>
      <p>
        The subtraction is exact for the numbers you typed. Real sleep is less regular. A
        biological cycle often runs about 80 to 100 minutes, and the length shifts from person to
        person and across the night. The National Heart, Lung, and Blood Institute describes a
        cycle as starting over on about that span. This page still subtracts fixed{" "}
        {`${CYCLE_LENGTH_MINUTES}-minute`} blocks so the six bedtimes stay easy to compare. Those
        90 minutes are a planning interval, not a minute your body is required to hit.
      </p>
      <p>
        No sensor is involved. The calculator does not record brain activity, breathing, or
        movement, and it cannot name a sleep stage or promise that you will wake between cycles.
        How the stages differ, including REM, is covered on the{" "}
        <Link href="/rem-sleep-calculator">REM sleep calculator</Link>.
      </p>
      <p>
        If the fall-asleep allowance is wrong for you, every bedtime is off by that same gap. Fix
        the setting before you keep a card. The result is a draft for an alarm you already have.
        It does not diagnose a sleep problem, and it is not personal medical advice.
      </p>
    </CalculatorLanding>
  );
}
