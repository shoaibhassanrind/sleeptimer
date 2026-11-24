import type { Metadata } from "next";
import Link from "next/link";
import { CalculatorLanding, type CalculatorSearch } from "@/components/CalculatorLanding";
import { CYCLE_LENGTH_MINUTES, DEFAULT_ONSET_MINUTES } from "@/lib/cycles";
import { pageMetadata, type FaqItem } from "@/lib/seo";

const PATH = "/rem-sleep-calculator";
const ORIGIN = "https://getsleepcalculator.com";
const CANONICAL = `${ORIGIN}${PATH}`;
const TITLE = "REM Sleep Calculator: Estimate Sleep Cycles | GetSleepCalculator";
const DESCRIPTION =
  "Use our REM sleep calculator to estimate sleep cycles and wake-up times. Understand REM sleep and how sleep cycle estimates work.";
const H1 = "REM Sleep Calculator: Estimate Sleep Cycles and Wake-Up Times";

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
    question: "Does this REM calculator measure REM sleep?",
    answer:
      "No. It estimates clock times from 90-minute blocks and the minutes you allow for falling asleep. It does not record eye movement, muscle tone, or brain activity, so it cannot tell when a REM period starts or ends.",
  },
  {
    question: "Is a sleep cycle exactly 90 minutes?",
    answer:
      "No. A cycle often lasts about 80 to 100 minutes, and a large laboratory sample of healthy adults found a median of 96 minutes, with a wide spread. This page keeps 90 minutes fixed so the six times stay easy to compare. Your own cycles can be shorter or longer, and the first cycle of the night is often the short one.",
  },
  {
    question: "Will I wake up during REM if I use one of these times?",
    answer:
      "There is no way to know from this page. A card is a sum of cycles plus fall-asleep minutes. You might be in REM, deep sleep, or lighter sleep. Waking at a suggested time does not decide how rested you will feel.",
  },
  {
    question: "How many sleep cycles do adults usually need?",
    answer:
      "Many adults do well with enough time for about five of these cycles, which is 7 hours and 30 minutes asleep, plus time to fall asleep. CDC guidance for adults 18 to 60 is 7 or more hours. Four cycles is 6 hours, which is short for most adults. Six cycles is 9 hours. Pick a length that fits the night you actually have.",
  },
  {
    question: "Is this a sleep cycle timer?",
    answer:
      "It counts cycle lengths on the clock, and then it stops. It does not run while you sleep, and it will not sound an alarm. Choose a time, then set that alarm on your own phone or clock.",
  },
  {
    question: "Why do the times change when I edit fall-asleep minutes?",
    answer:
      "Those minutes are the gap between getting into bed and falling asleep. Wake-up suggestions move later by that amount. Bedtime suggestions move earlier. The starting value is 15 minutes. Change it in settings and the six cards update on this device.",
  },
];

const BREADCRUMBS = [
  { name: "Sleep calculator", path: "/" },
  { name: "REM sleep calculator", path: PATH },
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
      origin={ORIGIN}
      siteName="Get Sleep Calculator"
      inLanguage="en"
    >
      <p>
        A REM calculator is a clock planner. You give it a bedtime or a wake-up time, and it lays
        out six options from an approximate {`${CYCLE_LENGTH_MINUTES}-minute`} sleep cycle plus the
        minutes you usually need to fall asleep. Use it to compare a short night with a longer
        one, then set your own alarm. It cannot see the night you actually have.
      </p>
      <p>
        This REM sleep calculator does not measure REM sleep, brain activity, or sleep quality.
        Cycles differ from person to person, and they shift between the start of the night and
        morning. Ninety minutes is a convenient average for the arithmetic. It is an estimate, and
        your own cycles will sit on either side of it.
      </p>

      <h2>What Is REM Sleep?</h2>
      <p>
        REM is short for rapid eye movement. Across a night, sleep alternates between non-REM
        sleep and REM sleep. Non-REM has three stages. Stage 1 is the drift from waking. Stage 2
        is lighter, steadier sleep, and it takes up a large share of the night. Stage 3 is deep
        sleep, also called slow-wave sleep, and people usually get more of it in the first half
        of the night.
      </p>
      <p>
        REM looks different. The eyes move, most of the muscles go slack, and brain activity is
        closer to waking than it is in deep sleep. Dreams are often more vivid here, though
        dreaming also happens in non-REM. The first REM period tends to be brief. Later ones
        usually run longer, so more of the night&apos;s REM arrives toward morning. The National
        Heart, Lung, and Blood Institute also notes that people tend to get less REM in colder
        temperatures, because body temperature is not regulated as tightly during that stage.
      </p>
      <p>
        A sleep study scores those stages from eye movement, muscle tone, and brain waves. Nothing
        on this page collects those signals. There is no microphone, no watch, and no motion
        sensor.
      </p>

      <h2>How Does a REM Sleep Calculator Work?</h2>
      <p>
        Pick the end of the night that cannot move. &quot;Go to bed at&quot; counts forward from
        the time you get into bed. &quot;Wake up at&quot; counts backward from the alarm. Either
        way, the list is six lengths: 6, 5, 4, 3, 2, and 1 cycle.
      </p>
      <p>
        Each cycle is counted as {CYCLE_LENGTH_MINUTES} minutes. The fall-asleep setting sits on
        top of that. It starts at {DEFAULT_ONSET_MINUTES} minutes, and you can change it from 5
        to 60 minutes in steps of 5. The value stays in this browser. For a bedtime, those minutes
        push the wake-up later. For a wake-up, they pull the bedtime earlier, so the suggestion
        includes time to drift off.
      </p>
      <p>
        The small face on each card only separates the longer options from the shorter ones. It
        is not a sleep-quality score, and it says nothing about which stage you will be in.
      </p>
      <h3>If you go to bed at 11:00 PM</h3>
      <p>
        With the starting {`${DEFAULT_ONSET_MINUTES}-minute`} offset, five cycles land at 6:45 AM.
        That is {DEFAULT_ONSET_MINUTES} minutes to fall asleep, then 7 hours and 30 minutes. Six
        cycles is 9 hours of sleep and a later wake-up. Four cycles is 6 hours, which is a short
        night for most adults, even when the clock time looks neat.
      </p>
      <h3>If you need to wake at 6:30 AM</h3>
      <p>
        Five cycles and the same {`${DEFAULT_ONSET_MINUTES}-minute`} offset put bedtime at 10:45 PM.
        You get into bed at 10:45, fall asleep around 11:00, and the alarm is 7 hours and 30
        minutes after that. When the morning is the fixed point, the{" "}
        <Link href="/bedtime-calculator">bedtime calculator</Link> opens on &quot;wake up
        at.&quot; The <Link href="/sleep-cycle-calculator">sleep cycle calculator</Link> uses this
        same clock math and describes the cards only as times.
      </p>

      <h2>How Long Does a Sleep Cycle Last?</h2>
      <p>
        A full pass through non-REM and REM often takes about 80 to 100 minutes. That range is
        why 90 minutes became the number people add on a clock. The NHLBI describes a cycle as
        restarting on roughly that interval, with four to six cycles across a full night. Those
        figures describe groups of sleepers. They are not a timetable for your next night.
      </p>
      <p>
        A laboratory study of healthy adults, each given an 8-hour sleep opportunity, found a
        median cycle of 96 minutes. The spread was wide. The first cycle was consistently shorter
        than later cycles, and age and recent sleep changed how much of a cycle was non-REM
        versus REM. One fixed 90-minute step cannot follow that.
      </p>
      <p>
        Waking briefly between cycles is ordinary. This page still shows all six lengths so a
        short rest and a long night sit together. It does not know how many of those cycles you
        will finish.
      </p>

      <h2>Why Do You Sometimes Wake Up Feeling Tired?</h2>
      <p>
        The fog after the alarm has a name: sleep inertia. For a while after waking, alertness
        is lower, and then it usually lifts. Research reviews find stronger inertia when someone
        is woken from deep sleep than from lighter sleep. Waking from REM tends to fall between
        those two. A short night, or sleep at an unusual hour, can make the morning feel worse
        as well.
      </p>
      <p>
        A wake-up that lands on a 90-minute mark is still just a clock time. It does not place
        you in REM, and it does not promise a clear head. If daytime sleepiness hangs on, or you
        struggle on most nights to fall asleep or stay asleep, that is a reason to talk with a
        clinician. Moving the cards around will not sort out why.
      </p>

      <h2>How Much Sleep Do You Actually Need?</h2>
      <p>
        Sleep need changes with age, and two people of the same age can still differ. For a usual
        night, CDC guidance is:
      </p>
      <ul>
        <li>Adults 18–60: 7 or more hours.</li>
        <li>Adults 61–64: 7–9 hours.</li>
        <li>Adults 65 and older: 7–8 hours.</li>
      </ul>
      <p>
        Five cycles here is 7 hours and 30 minutes asleep, before the minutes you spend falling
        asleep. That length sits inside the adult range for many people. It is a general marker,
        not a personal prescription. Illness, heavy training, or a run of short nights can raise
        what you need for a while. The calculator can place a bedtime and a wake-up. It cannot
        tell you the night was enough. To sketch a repeating plan from the same estimates, use
        the <Link href="/sleep-schedule">sleep schedule</Link> page.
      </p>

      <h2>Tips for Building a Better Sleep Routine</h2>
      <p>
        A tidy wake-up time does less if the rest of the night swings around. The NHLBI and the
        CDC describe a few habits that may help:
      </p>
      <ul>
        <li>
          Go to bed and get up at the same time, and keep weekends within about an hour of
          weekdays. A late Friday and a long sleep-in is a common way to throw off the next
          morning.
        </li>
        <li>
          Use the hour before bed for something quiet. Bright screens and hard exercise in that
          hour make it harder to wind down.
        </li>
        <li>
          Leave caffeine for earlier in the day. The NHLBI notes that its effects can last as
          long as 8 hours, so a late-afternoon cup can still be around at bedtime. The CDC
          suggests skipping caffeine in the afternoon and evening.
        </li>
        <li>
          Skip a heavy meal and alcohol in the hours before bed. A light snack is fine.
        </li>
        <li>Keep the bedroom quiet, cool, and dark.</li>
      </ul>
      <p>
        These are habits for a schedule. They are not treatment, and they do not make the
        90-minute estimate more exact. If sleep stays poor, the CDC&apos;s advice is to talk with
        a healthcare provider rather than keep tweaking a clock plan.
      </p>

      <h2>REM Sleep Calculator Accuracy and Limitations</h2>
      <p>
        Every suggestion uses an approximate {`${CYCLE_LENGTH_MINUTES}-minute`} cycle plus your
        fall-asleep adjustment. That is the whole model.
      </p>
      <p>
        The calculator does not measure REM sleep stages. It does not measure brain activity. It
        does not measure sleep quality. It also does not infer a stage from how quiet the room
        is.
      </p>
      <p>
        Real cycles vary between people and across the night. The first cycle is often shorter,
        and REM periods often lengthen toward morning. Treat 90 minutes as a draft you can shift.
        If {DEFAULT_ONSET_MINUTES} minutes is the wrong fall-asleep gap for you, change it and
        read the cards again.
      </p>
      <p>
        sleeptimer is a planning tool. It is not a medical device, and this page is not medical
        advice.
      </p>

      <h2>Scientific References</h2>
      <p>
        The explanations above draw on these public sources. None of them is a review or
        endorsement of this calculator.
      </p>
      <ul>
        <li>
          <a
            href="https://www.nhlbi.nih.gov/health/sleep/stages-of-sleep"
            rel="noopener noreferrer"
          >
            NHLBI: How Sleep Works — Sleep Phases and Stages
          </a>
        </li>
        <li>
          <a href="https://www.cdc.gov/sleep/about/" rel="noopener noreferrer">
            CDC: About Sleep
          </a>
        </li>
        <li>
          <a href="https://pubmed.ncbi.nlm.nih.gov/37914631/" rel="noopener noreferrer">
            Cajochen and colleagues, Sleep Health (2024): ultradian sleep-cycle duration
          </a>
        </li>
        <li>
          <a href="https://pubmed.ncbi.nlm.nih.gov/12531174/" rel="noopener noreferrer">
            Tassi and Muzet, Sleep Medicine Reviews (2000): sleep inertia
          </a>
        </li>
        <li>
          <a
            href="https://www.nhlbi.nih.gov/health/sleep-deprivation/healthy-sleep-habits"
            rel="noopener noreferrer"
          >
            NHLBI: Healthy Sleep Habits
          </a>
        </li>
      </ul>
    </CalculatorLanding>
  );
}
