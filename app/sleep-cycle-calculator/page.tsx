import type { Metadata } from "next";
import Link from "next/link";
import { CalculatorLanding, type CalculatorSearch } from "@/components/CalculatorLanding";
import { CYCLE_LENGTH_MINUTES, DEFAULT_ONSET_MINUTES } from "@/lib/cycles";
import { pageMetadata, type FaqItem } from "@/lib/seo";

const PATH = "/sleep-cycle-calculator";
const ORIGIN = "https://getsleepcalculator.com";
const CANONICAL = `${ORIGIN}${PATH}`;
const TITLE = "Sleep Cycle Calculator: Choose Your Bedtime | GetSleepCalculator";
const DESCRIPTION =
  "Use our sleep cycle calculator to find six possible bedtimes or wake-up times based on estimated 90-minute sleep cycles. Plan your sleep schedule.";
const H1 = "Sleep Cycle Calculator: Choose a Bedtime or Wake-Up Time";

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
    question: "How many hours are five sleep cycles?",
    answer:
      "Five cycles are 7 hours and 30 minutes of planned sleep. The fall-asleep minutes sit outside that total. With the starting 15-minute allowance, you are in bed 15 minutes before those 7.5 hours begin.",
  },
  {
    question: "Is a 90-minute sleep cycle exact?",
    answer:
      "Not on this page, and not in real sleep either. The calculator keeps 90 minutes fixed so the six times stay easy to compare. Biological cycles often run about 80 to 100 minutes, and they change from person to person and across the night.",
  },
  {
    question: "How many sleep cycles should I aim for?",
    answer:
      "Many adults do well around five cycles, which is 7.5 hours of planned sleep and sits inside the usual adult range. Six cycles is 9 hours. Four cycles is 6 hours, which is short for most adults. Pick the longest option the night can actually hold.",
  },
  {
    question: "Can this calculator predict my actual sleep stages?",
    answer:
      "No. It adds and subtracts clock time. It does not record brain activity, eye movement, or breathing, so it cannot say when a cycle really started or which stage you were in.",
  },
  {
    question: "Should I choose five or six sleep cycles?",
    answer:
      "Choose six when you can take a 9-hour night. Choose five when 7.5 hours is what the schedule allows. Both are full-length options on this list. The shorter cards are for a night that is already cut short, not a target to hit every evening.",
  },
];

const BREADCRUMBS = [
  { name: "Sleep calculator", path: "/" },
  { name: "Sleep cycle calculator", path: PATH },
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
      faqs={FAQS}
      faqHeading="Frequently Asked Questions"
      faqPage={false}
      breadcrumbs={BREADCRUMBS}
      linkCurrentCrumb
      origin={ORIGIN}
      siteName="Get Sleep Calculator"
      inLanguage="en"
      afterFaq={
        <section className="guide" aria-labelledby="cycle-references">
          <h2 id="cycle-references">References</h2>
          <p>
            These public pages are the background for the cycle length and the adult sleep ranges
            above. They are not a review of this calculator.
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
        You already have one end of the night. A sleep cycle calculator takes that clock time and
        lays out six options for the other end. Each option stacks a {`${CYCLE_LENGTH_MINUTES}-minute`}
        block, then adds the minutes you usually need to fall asleep.
      </p>
      <p>
        The cards are times you can put on an alarm. They are mathematical planning estimates.
        They are not a medical sleep recommendation, and they do not describe the night you will
        actually have.
      </p>

      <h2>What Does This Sleep Cycle Calculator Estimate?</h2>
      <p>
        Set the end of the night that cannot move. &quot;Go to bed at&quot; starts when you get
        into bed and counts forward to possible wake-up times. &quot;Wake up at&quot; starts from
        the alarm and counts backward to possible bedtimes. Either way you get the same six
        lengths.
      </p>
      <p>
        Two numbers build every card. One is the {`${CYCLE_LENGTH_MINUTES}-minute`} planning interval,
        used once, twice, and so on up to six times. The other is your sleep-onset allowance, the
        gap between getting into bed and falling asleep. It starts at {DEFAULT_ONSET_MINUTES}{" "}
        minutes. You can set it from 5 to 60 minutes, in steps of 5, and the list updates on this
        device. A longer allowance pushes a wake-up later, or pulls a bedtime earlier.
      </p>
      <p>
        The page does not watch you sleep. Questions about REM and the other stages belong on the{" "}
        <Link href="/rem-sleep-calculator">REM sleep calculator</Link>. This one stays with the
        clock.
      </p>

      <h2>How Long Is One Sleep Cycle?</h2>
      <p>
        Here, one sleep cycle time is locked at {CYCLE_LENGTH_MINUTES} minutes. That fixed step is
        why the six results stay easy to line up when you change the hour. It is the interval the
        calculator uses for arithmetic.
      </p>
      <p>
        A biological cycle is less tidy. Sleep research usually places a full cycle around 80 to
        100 minutes, and the length shifts. It differs between people, and the first cycle of a
        night is often not the same length as a later one. The National Heart, Lung, and Blood
        Institute describes a cycle as starting over on about that 80-to-100-minute span. A
        90-minute sleep cycle sits in the middle of that range, which makes it a practical number
        to add on a clock. It is not a minute your body is required to hit.
      </p>

      <h2>What Do the Six Sleep Cycle Options Mean?</h2>
      <p>
        The six cards are the chart for this page. They always run from six cycles down to one.
        The hours below are time asleep, before the fall-asleep minutes are added:
      </p>
      <ul>
        <li>1 cycle = 1.5 hours</li>
        <li>2 cycles = 3 hours</li>
        <li>3 cycles = 4.5 hours</li>
        <li>4 cycles = 6 hours</li>
        <li>5 cycles = 7.5 hours</li>
        <li>6 cycles = 9 hours</li>
      </ul>
      <p>
        Those figures come from multiplying {CYCLE_LENGTH_MINUTES} minutes. They are not advice
        that a 3-hour night is a sensible plan.
      </p>
      <p>
        The small face on each card only separates the longer options from the shorter ones. Five
        and six cycles share one mark. One through four cycles share the other. The face is not a
        score of sleep quality, and it says nothing about which stage you will be in.
      </p>

      <h2>How Do You Choose the Right Number of Sleep Cycles?</h2>
      <p>
        Read the hours first, then the clock time. Five cycles is 7.5 hours of planned sleep. For
        many adults that is the card that still looks like a normal night. Six cycles is 9 hours,
        a long sleep when you can take it. Four cycles is 6 hours. Three and below are a nap or a
        severely shortened night.
      </p>
      <p>
        There is no single best time to wake up. A 5:00 AM alarm can fit one schedule and fight
        another, depending on when you can get into bed. What you can compare here is the length.
        When two times are both possible, take the one that leaves you more of a full night. The
        short cards are there for a night that is already cut short. They make a poor routine if
        you pick them every evening even though a longer option was available.
      </p>
      <p>
        The calculator will not hide a short option, and it does not know how much sleep you need.
      </p>

      <h2>A Practical Sleep Cycle Example</h2>
      <p>
        Say you get into bed at 10:00 PM and you leave the fall-asleep setting at{" "}
        {DEFAULT_ONSET_MINUTES} minutes. Counting forward, the six wake-up times are:
      </p>
      <ul>
        <li>1 cycle: 11:45 PM</li>
        <li>2 cycles: 1:15 AM</li>
        <li>3 cycles: 2:45 AM</li>
        <li>4 cycles: 4:15 AM</li>
        <li>5 cycles: 5:45 AM</li>
        <li>6 cycles: 7:15 AM</li>
      </ul>
      <p>
        Five cycles means falling asleep around 10:15 PM and waking at 5:45 AM, 7 hours and 30
        minutes later. Six cycles moves the alarm to 7:15 AM. If you have to be up at 4:15 AM,
        that is four cycles, or 6 hours, and it is a short night for most adults even though the
        time looks exact.
      </p>
      <p>
        When the morning is the time that cannot move, switch the control to &quot;wake up
        at.&quot; The <Link href="/bedtime-calculator">bedtime calculator</Link> opens on that
        setting.
      </p>

      <h2>How Many Sleep Cycles Do Adults Usually Need?</h2>
      <p>
        Need changes with age, and two people of the same age can still differ. For a usual
        night, the{" "}
        <a href="https://www.cdc.gov/sleep/about/" rel="noopener noreferrer">
          CDC&apos;s general guidance
        </a>{" "}
        is at least 7 hours for adults 18 to 60, 7 to 9 hours for adults 61 to 64, and 7 to 8
        hours for adults 65 and older.
      </p>
      <p>
        Five cycles on this list is 7.5 hours of planned sleep, before the minutes spent falling
        asleep. That length sits inside the adult range for many people. Six cycles is 9 hours,
        which is more than some adults want and reasonable for others. Four cycles, at 6 hours,
        falls under that range for most adults. Illness, heavy training, or a run of short nights
        can raise what you need for a while. The page can place the times. It cannot tell you the
        night was enough. To sketch a repeating plan from the same estimates, use the{" "}
        <Link href="/sleep-schedule">sleep schedule</Link> page.
      </p>

      <h2>How Accurate Is a Sleep Cycle Calculator?</h2>
      <p>
        Each suggestion is an estimated {`${CYCLE_LENGTH_MINUTES}-minute`} cycle, repeated, plus your
        sleep-onset allowance. The {CYCLE_LENGTH_MINUTES} minutes stay fixed so the six cards stay
        comparable when you change the hour. That is the whole model.
      </p>
      <p>
        A real night is not six identical blocks. This calculator does not locate the minute a
        cycle opens or closes, and it does not name a sleep stage. Nothing is recorded from a
        watch, a microphone, or a motion sensor. If {DEFAULT_ONSET_MINUTES} minutes is the wrong
        gap for you, change it and read the cards again.
      </p>
      <p>
        The times are a draft for the clock. They do not diagnose a sleep problem, and they are
        not personal medical advice.
      </p>
    </CalculatorLanding>
  );
}
