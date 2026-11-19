import type { Metadata } from "next";
import Link from "next/link";
import { TextPage } from "@/components/TextPage";
import { DEFAULT_ONSET_MINUTES } from "@/lib/cycles";
import { pageMetadata } from "@/lib/seo";

const PATH = "/about";
const TITLE = "About Get Sleep Calculator";
const DESCRIPTION =
  "Get Sleep Calculator helps you estimate bedtimes and wake-up times from 90-minute cycles. It is a planning tool, not a sleep tracker or a medical device.";
const EMAIL = "getsleepcalculator.support@gmail.com";

export const metadata: Metadata = pageMetadata(TITLE, DESCRIPTION, PATH);

export default function Page() {
  return (
    <TextPage path={PATH} title={TITLE} description={DESCRIPTION} heading="About Us">
      <h2>About Get Sleep Calculator</h2>
      <p>
        Get Sleep Calculator helps you estimate a suitable bedtime or wake-up time. You set one
        clock time, and the page suggests the other end of that plan. It is a guide for the clock,
        so you can compare a few options before you choose.
      </p>
      <h2>Our Purpose</h2>
      <p>
        The goal is to make sleep schedule planning simple and accessible. There is no account to
        create. Enter a bedtime or a wake-up time, and the suggestions appear on the page.
      </p>
      <h2>How Our Calculator Works</h2>
      <p>
        The calculator uses an estimated 90-minute sleep cycle. It lists six clock times, from 6
        cycles down to 1. You can change how many minutes you usually need to fall asleep. Until
        you change it, that setting is {DEFAULT_ONSET_MINUTES} minutes. Bedtime suggestions move
        earlier by those minutes, and wake-up suggestions move later.
      </p>
      <p>
        Actual sleep cycles vary from person to person and from night to night, so 90 minutes is
        an estimate, not a fixed rule. The same calculator is on the{" "}
        <Link href="/sleep-cycle-calculator">sleep cycle</Link>,{" "}
        <Link href="/bedtime-calculator">bedtime</Link>,{" "}
        <Link href="/sleep-time-calculator">sleep time</Link>,{" "}
        <Link href="/sleep-schedule">sleep schedule</Link>, and{" "}
        <Link href="/rem-sleep-calculator">REM</Link> pages. The REM page uses this same average
        and cannot detect REM. The <Link href="/privacy">Privacy Policy</Link> covers the one
        value stored in this browser: the fall-asleep minutes.
      </p>
      <h2>Accuracy and Limitations</h2>
      <p>
        This is a planning tool. It is not a sleep tracker, not a medical device, and not a
        diagnostic tool. It does not measure breathing, movement, heart rate, or sleep stages, and
        it cannot guarantee better sleep. It does not decide whether a time is enough sleep for
        you. Questions about a sleep problem belong with a qualified clinician.
      </p>
      <h2>Contact Us</h2>
      <p>Questions, corrections, and suggestions can be sent to:</p>
      <p>
        <a href={`mailto:${EMAIL}`}>{"getsleepcalculator.support"}<wbr />{"@gmail.com"}</a>
      </p>
      <p>
        The <Link href="/contact">Contact page</Link> lists this same address.
      </p>
      <ul>
        <li>
          <Link href="/">Homepage</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
        <li>
          <Link href="/privacy">Privacy Policy</Link>
        </li>
      </ul>
    </TextPage>
  );
}
