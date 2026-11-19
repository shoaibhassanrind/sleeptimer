import type { Metadata } from "next";
import Link from "next/link";
import { TextPage } from "@/components/TextPage";
import {
  DEFAULT_ONSET_MINUTES,
  ONSET_MAX,
  ONSET_MIN,
  ONSET_STEP,
  ONSET_STORAGE_KEY,
} from "@/lib/cycles";
import { pageMetadata, siteOrigin } from "@/lib/seo";

const PATH = "/privacy";
const TITLE = "Privacy Policy";
const DESCRIPTION =
  "Fall-asleep minutes stay in this browser's local storage. Pages load Google AdSense. The calculator does not use Google Analytics or an account.";
const EMAIL = "getsleepcalculator.support@gmail.com";

export const metadata: Metadata = pageMetadata(TITLE, DESCRIPTION, PATH);

export default function Page() {
  const origin = siteOrigin();
  return (
    <TextPage path={PATH} title={TITLE} description={DESCRIPTION} heading="Privacy Policy">
      <p>
        This page describes Get Sleep Calculator, the calculator at {origin}. It covers the
        fall-asleep setting saved in this browser, the time placed in the page address, and the
        Google AdSense script these pages load.
      </p>
      <h2>What the site collects</h2>
      <p>
        The calculator does not ask for your name, email address, or an account, and it does not
        record a night of sleep. Two details can remain after you use it. The minutes you need to
        fall asleep are saved in this browser. After you calculate, the bedtime or wake-up time
        is written into the page address. The pages also load Google AdSense, described below.
      </p>
      <h2>Stored in this browser</h2>
      <p>
        The fall-asleep preference is a whole number from {ONSET_MIN} to {ONSET_MAX}, in steps of{" "}
        {ONSET_STEP}. Until you change it, the calculator uses {DEFAULT_ONSET_MINUTES}. The browser
        stores that number in localStorage under the key <code>{ONSET_STORAGE_KEY}</code>. If
        storage is blocked, the number stays in memory for the open tab and is dropped when the
        tab closes. Another open tab of this site can pick up a saved change. The number is not
        filed under a name, an email address, or a sign-in, and this calculator does not send it
        to its own server.
      </p>
      <h2>The page address</h2>
      <p>
        Calculate writes two fields into the address on the page you are using: <code>mode</code>{" "}
        (<code>bed</code> or <code>wake</code>) and <code>at</code> (a 24-hour time such as{" "}
        <code>06:30</code>). Those fields let a refresh show the same plan. A request for that
        address includes them, the way any page address does. Back removes the fields. The
        fall-asleep minutes are not part of the address. sleeptimer does not ask you to create a
        profile for these fields.
      </p>
      <h2>Cookies</h2>
      <p>
        The calculator code does not set its own cookies. localStorage, used for the fall-asleep
        minutes, is not a cookie. This site does not include Google Analytics or another analytics
        script. The AdSense script below may set or read cookies.
      </p>
      <h2>Advertising</h2>
      <p>
        Each page loads Google&apos;s AdSense script from pagead2.googlesyndication.com. The
        browser contacts Google when that script loads. Google may use cookies to show ads,
        measure them, and, where allowed, personalize them. Those cookies belong to Google. You
        can read{" "}
        <a href="https://policies.google.com/technologies/ads">how Google uses advertising cookies</a>{" "}
        and change choices in{" "}
        <a href="https://adssettings.google.com/">Google ad settings</a>.
      </p>
      <h2>What the calculator leaves alone</h2>
      <p>
        The app has no microphone, no camera, and no motion sensor, and it does not connect to a
        watch or other wearable. The times on the cards are minutes added and subtracted on the
        page. The <Link href="/about">About Us</Link> page explains what the calculator is for,
        and what it refuses to decide.
      </p>
      <h2>Privacy questions</h2>
      <p>Questions about this policy can be sent to:</p>
      <p>
        <a href={`mailto:${EMAIL}`}>{"getsleepcalculator.support"}<wbr />{"@gmail.com"}</a>
      </p>
      <p>
        The <Link href="/contact">Contact Us</Link> page lists this same address.
      </p>
      <ul>
        <li>
          <Link href="/">Homepage</Link>
        </li>
        <li>
          <Link href="/about">About Us</Link>
        </li>
        <li>
          <Link href="/contact">Contact Us</Link>
        </li>
      </ul>
    </TextPage>
  );
}
