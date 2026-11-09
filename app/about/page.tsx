import type { Metadata } from "next";
import Link from "next/link";
import { TextPage } from "@/components/TextPage";
import { pageMetadata } from "@/lib/seo";

const PATH = "/about";
const TITLE = "About sleeptimer";
const DESCRIPTION =
  "sleeptimer plans bedtimes and wake-ups from 90-minute cycles plus a fall-asleep offset. It is a planning guide, not a medical device or a sleep tracker.";

export const metadata: Metadata = pageMetadata(TITLE, DESCRIPTION, PATH);

export default function Page() {
  return (
    <TextPage path={PATH} title={TITLE} description={DESCRIPTION} heading="About sleeptimer">
      <p>
        sleeptimer is a sleep calculator. You set a bedtime or a wake-up, and it lists six clock
        times: 6 cycles down to 1, at 90 minutes each, shifted by the minutes you say you need to
        fall asleep.
      </p>
      <p>
        It is a planning guide for the clock. It is not a medical device, not a diagnostic tool,
        and not a sleep tracker. It does not measure breathing, movement, heart rate, or sleep
        stages, and it does not decide whether a time is enough sleep for you. Questions about a
        sleep problem belong with a qualified clinician.
      </p>
      <p>
        The same calculator is on the{" "}
        <Link href="/sleep-cycle-calculator">sleep cycle</Link>,{" "}
        <Link href="/bedtime-calculator">bedtime</Link>,{" "}
        <Link href="/sleep-time-calculator">sleep time</Link>,{" "}
        <Link href="/sleep-schedule">sleep schedule</Link>, and{" "}
        <Link href="/rem-sleep-calculator">REM</Link> pages. The REM page uses this same 90-minute
        average and says plainly that it cannot detect REM. The{" "}
        <Link href="/privacy">privacy page</Link> covers the one value stored in this browser: the
        fall-asleep minutes.
      </p>
    </TextPage>
  );
}
