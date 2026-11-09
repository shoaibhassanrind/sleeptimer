import type { Metadata } from "next";
import Link from "next/link";
import { TextPage } from "@/components/TextPage";
import { ONSET_MAX, ONSET_MIN, ONSET_STEP, ONSET_STORAGE_KEY } from "@/lib/cycles";
import { pageMetadata, siteOrigin } from "@/lib/seo";

const PATH = "/privacy";
const TITLE = "Privacy on sleeptimer";
const DESCRIPTION =
  "sleeptimer keeps your fall-asleep minutes in this browser only. No account, no microphone, and no sleep sensor.";

export const metadata: Metadata = pageMetadata(TITLE, DESCRIPTION, PATH);

export default function Page() {
  const origin = siteOrigin();
  return (
    <TextPage path={PATH} title={TITLE} description={DESCRIPTION} heading="Privacy">
      <p>
        This page describes sleeptimer, the calculator at {origin}. The only preference the app
        saves is how many minutes you usually need to fall asleep.
      </p>
      <h2>Stored on this device</h2>
      <p>
        That number is a whole number from {ONSET_MIN} to {ONSET_MAX}, in steps of {ONSET_STEP}.
        Until you change it, the calculator uses 15. The browser stores it under the key{" "}
        <code>{ONSET_STORAGE_KEY}</code>. If storage is blocked, the same number stays in memory
        for the open tab and is dropped when the tab closes. Another open tab of this site can
        pick up a saved change. There is no account, so the number is never filed under a name,
        an email address, or a sign-in.
      </p>
      <h2>What the address holds</h2>
      <p>
        Calculate writes two fields into the address on the page you are using: <code>mode</code>{" "}
        (<code>bed</code> or <code>wake</code>) and <code>at</code> (a 24-hour time such as{" "}
        <code>06:30</code>). Those fields let a refresh show the same plan. A request for that
        address includes them, the way any page address does. Back removes the fields. sleeptimer
        does not ask you to create a profile for them.
      </p>
      <h2>What the calculator leaves alone</h2>
      <p>
        The fall-asleep setting is read and written in this browser. The app has no microphone, no
        camera, and no motion sensor, and it does not connect to a watch or other wearable. It
        does not record a night of sleep. The times on the cards are minutes added and subtracted
        on the page. Read the <Link href="/about">about page</Link> for what the calculator is
        for, and what it refuses to decide.
      </p>
    </TextPage>
  );
}
