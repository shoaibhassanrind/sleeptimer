import type { Metadata } from "next";
import Link from "next/link";
import { TextPage } from "@/components/TextPage";
import { pageMetadata } from "@/lib/seo";

const PATH = "/contact";
const TITLE = "Contact Us";
const DESCRIPTION =
  "Send questions, feedback, corrections, or suggestions about the Sleep Calculator to getsleepcalculator.support@gmail.com.";
const EMAIL = "getsleepcalculator.support@gmail.com";

export const metadata: Metadata = pageMetadata(TITLE, DESCRIPTION, PATH);

export default function Page() {
  return (
    <TextPage path={PATH} title={TITLE} description={DESCRIPTION} heading="Contact Us">
      <p>
        Questions, feedback, corrections, and suggestions about the Sleep Calculator are welcome.
      </p>
      <p>
        <a href={`mailto:${EMAIL}`}>{"getsleepcalculator.support"}<wbr />{"@gmail.com"}</a>
      </p>
      <p>You can also write about a website issue or about feedback on the calculator.</p>
      <ul>
        <li>
          <Link href="/">Homepage</Link>
        </li>
        <li>
          <Link href="/about">About Us</Link>
        </li>
        <li>
          <Link href="/privacy">Privacy Policy</Link>
        </li>
      </ul>
    </TextPage>
  );
}
