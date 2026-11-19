import type { Metadata } from "next";
import { Calculator } from "@/components/Calculator";
import { Faq } from "@/components/Faq";
import { SiteLinks } from "@/components/SiteLinks";
import {
  calculate,
  DEFAULT_CHOSEN_CYCLES,
  DEFAULT_ONSET_MINUTES,
  DEFAULT_RECOMMENDATION,
} from "@/lib/cycles";
import {
  canonicalPath,
  DESCRIPTION,
  jsonLdScript,
  NOSCRIPT_FAQ,
  pageTitle,
  resolveSearch,
} from "@/lib/seo";

type Search = {
  mode?: string | string[];
  at?: string | string[];
};

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<Search>;
}): Promise<Metadata> {
  const resolved = resolveSearch(await searchParams);
  const title = pageTitle(resolved.mode, resolved.at, resolved.atValid);
  const canonical = canonicalPath(resolved);
  return {
    title,
    description: DESCRIPTION,
    alternates: { canonical },
    openGraph: {
      title,
      description: DESCRIPTION,
      url: canonical,
      siteName: "sleeptimer",
      type: "website",
    },
  };
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Search>;
}) {
  const resolved = resolveSearch(await searchParams);
  const initial = calculate({
    mode: resolved.mode,
    at: resolved.at,
    onset: DEFAULT_ONSET_MINUTES,
    chosenCycles: DEFAULT_CHOSEN_CYCLES,
  });

  return (
    <>
      <Calculator
        initial={initial}
        initialResults={resolved.modeValid && resolved.atValid}
        promptIsHeading={false}
      />
      <article className="guide">
        <h1>Free Sleep Calculator – Find Your Ideal Bedtime</h1>
        <h2>What Is a Sleep Calculator?</h2>
        <p>
          A sleep calculator estimates a bedtime or a wake-up time from a clock time you already
          know. If you know when you need to get up, it suggests when to get into bed. If you know
          when you can go to bed, it suggests when to wake. It does not watch you sleep or
          measure how long you actually slept.
        </p>
        <h2>How Does a Sleep Calculator Work?</h2>
        <p>
          Start with a bedtime or a wake-up time. Bedtime mode takes the time you plan to go to
          bed and lists possible wake-up times. Wake-up mode takes the time you need to rise and
          lists possible bedtimes.
        </p>
        <p>
          The times follow an estimated 90-minute sleep-cycle model. You can compare several
          lengths, from one cycle up to six. A sleep-onset setting adds the minutes you usually
          need to fall asleep. That setting starts at about 15 minutes, and you can change it.
          Those minutes move a bedtime earlier or a wake-up later, so the suggestion lines up with
          time asleep rather than time in bed alone.
        </p>
        <p>
          For example, a 6:30 AM wake-up and five estimated cycles equal 7 hours and 30 minutes of
          sleep. Allow about 15 minutes to fall asleep, and the matching bedtime is around 10:45
          PM.
        </p>
        <h2>The Science Behind Sleep Cycles</h2>
        <p>
          Sleep alternates between non-REM sleep, called NREM, and REM sleep. NREM includes
          lighter sleep and deeper sleep, when heart rate and breathing tend to slow. REM is the
          stage most closely tied to dreaming, and brain activity then is nearer to waking.
        </p>
        <p>
          One pass through NREM and REM often lasts about 80–100 minutes. The length varies
          between people, and it can change from the beginning of the night to the end. A 2024
          laboratory study of healthy adults found a median cycle duration of 96 minutes. Ninety
          minutes is a practical estimate for choosing a clock time. It is not an exact rule your
          body follows every night.
        </p>
        <h2>Why Do You Wake Up Feeling Groggy?</h2>
        <p>
          Feeling slow after the alarm is common. That grogginess is called sleep inertia:
          alertness is lower for a while after waking, and it usually lifts. It can feel stronger
          when you wake from deeper sleep than from lighter sleep.
        </p>
        <p>
          Sleep duration and sleep timing can also change how refreshed you feel. A very short
          night, or sleep timed far from your usual hours, can leave you less alert the next day.
          This calculator cannot detect REM sleep, deep sleep, or any other stage. It cannot
          guarantee that you will wake feeling refreshed.
        </p>
        <h2>How Much Sleep Do You Need?</h2>
        <p>Sleep need changes with age. For adults, CDC guidance is:</p>
        <ul>
          <li>Adults aged 18–60: at least 7 hours.</li>
          <li>Adults aged 61–64: 7–9 hours.</li>
          <li>Adults aged 65+: 7–8 hours.</li>
        </ul>
        <p>
          These ranges are a general guide for a usual night. The calculator can place a bedtime
          and a wake-up on a schedule you choose. It cannot tell you that you got enough sleep.
        </p>
        <h2>Sleep Calculator Accuracy and Disclaimer</h2>
        <p>
          Every suggestion uses estimated 90-minute cycles plus your fall-asleep setting. Actual
          cycles vary from person to person and from night to night, so the same wake-up will not
          suit everyone. Treat the times as a plan you can adjust.
        </p>
        <p>
          sleeptimer is a planning tool. It is not a medical device, and this page is not medical
          advice. If you have ongoing trouble falling asleep, staying asleep, or staying alert
          during the day, consult a healthcare professional.
        </p>
        <h2>Scientific references</h2>
        <ul>
          <li>
            <a href="https://www.nhlbi.nih.gov/health/sleep/stages-of-sleep">
              NHLBI: Stages of Sleep
            </a>
          </li>
          <li>
            <a href="https://pubmed.ncbi.nlm.nih.gov/37914631/">2024 Sleep Cycle Research</a>
          </li>
          <li>
            <a href="https://pubmed.ncbi.nlm.nih.gov/12531174/">Sleep Inertia Research</a>
          </li>
          <li>
            <a href="https://www.cdc.gov/sleep/about/">CDC Sleep Recommendations</a>
          </li>
        </ul>
      </article>
      <Faq />
      <SiteLinks current="/" />
      <noscript>
        <p>{DEFAULT_RECOMMENDATION}</p>
        <p>{NOSCRIPT_FAQ}</p>
      </noscript>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript() }} />
    </>
  );
}
