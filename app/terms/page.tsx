import type { Metadata } from "next";
import Link from "next/link";
import { TextPage } from "@/components/TextPage";
import { pageMetadata } from "@/lib/seo";

const PATH = "/terms";
const CANONICAL = "https://getsleepcalculator.com/terms";
const TITLE = "Terms and Conditions";
const DESCRIPTION =
  "Terms for using Get Sleep Calculator, a free tool that estimates bedtimes and wake-up times. It is a planning aid, not medical advice.";
const EMAIL = "getsleepcalculator.support@gmail.com";

export const metadata: Metadata = {
  ...pageMetadata(TITLE, DESCRIPTION, PATH),
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: CANONICAL,
    siteName: "sleeptimer",
    type: "website",
  },
};

export default function Page() {
  return (
    <TextPage path={PATH} title={TITLE} description={DESCRIPTION} heading="Terms & Conditions">
      <h2>Acceptance of Terms</h2>
      <p>
        By using Get Sleep Calculator, you agree to these terms. If you do not agree, please do
        not use the website.
      </p>
      <h2>Website Purpose</h2>
      <p>
        Get Sleep Calculator provides free tools that estimate a bedtime or a wake-up time. You
        choose one clock time, and the calculator suggests other times you can use to plan a
        schedule.
      </p>
      <h2>Calculator Accuracy</h2>
      <p>
        The calculations use estimated sleep cycles and an adjustable setting for how long you
        usually need to fall asleep. Actual sleep cycles vary from person to person and from night
        to night. The suggestions are estimates. They do not guarantee any particular sleep
        result.
      </p>
      <h2>Medical Disclaimer</h2>
      <p>
        The calculator is not a medical device and does not provide medical advice. It does not
        diagnose a sleep problem or decide whether a schedule is enough sleep for you. If you have
        ongoing trouble with sleep or daytime alertness, consult a qualified healthcare
        professional.
      </p>
      <h2>Acceptable Use</h2>
      <p>
        Use the website for personal planning. Do not misuse it, disrupt it, or attempt
        unauthorized access to the site or its systems.
      </p>
      <h2>Intellectual Property</h2>
      <p>
        The text, layout, and calculator on this website are provided so you can use the site.
        This page does not claim ownership of third-party names, scripts, or other material.
        Those remain the property of their owners.
      </p>
      <h2>Third-Party Services</h2>
      <p>
        Some parts of the site rely on other services. Where Google advertising is loaded, that
        service is covered by Google&apos;s own terms and policies, not by this page. Other
        third-party services, if used, have their own terms as well.
      </p>
      <h2>Changes to These Terms</h2>
      <p>
        These terms may be updated when necessary. The text on this page is the current version.
      </p>
      <h2>Contact</h2>
      <p>Questions about these terms can be sent to:</p>
      <p>
        <a href={`mailto:${EMAIL}`}>{"getsleepcalculator.support"}<wbr />{"@gmail.com"}</a>
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
        <li>
          <Link href="/privacy">Privacy Policy</Link>
        </li>
      </ul>
    </TextPage>
  );
}
