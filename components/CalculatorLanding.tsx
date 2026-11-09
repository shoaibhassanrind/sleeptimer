import type { ReactNode } from "react";
import { Calculator } from "@/components/Calculator";
import { Faq } from "@/components/Faq";
import { SiteLinks } from "@/components/SiteLinks";
import {
  calculate,
  DEFAULT_CHOSEN_CYCLES,
  DEFAULT_ONSET_MINUTES,
  type Mode,
} from "@/lib/cycles";
import { pageJsonLdScript, resolveSearch, type FaqItem } from "@/lib/seo";

export type CalculatorSearch = {
  mode?: string | string[];
  at?: string | string[];
};

export async function CalculatorLanding({
  searchParams,
  path,
  title,
  description,
  heading,
  defaultMode,
  faqs,
  children,
}: {
  searchParams: Promise<CalculatorSearch>;
  path: string;
  title: string;
  description: string;
  heading: string;
  defaultMode?: Mode;
  faqs: readonly FaqItem[];
  children: ReactNode;
}) {
  const resolved = resolveSearch(await searchParams);
  const mode = resolved.modeValid ? resolved.mode : (defaultMode ?? resolved.mode);
  const initial = calculate({
    mode,
    at: resolved.at,
    onset: DEFAULT_ONSET_MINUTES,
    chosenCycles: DEFAULT_CHOSEN_CYCLES,
  });

  return (
    <>
      <Calculator
        initial={initial}
        initialResults={resolved.modeValid && resolved.atValid}
        path={path}
        idleTitle={title}
        syncTitle={false}
        promptIsHeading={false}
        detailsHref="#guide"
      />
      <article id="guide" className="guide">
        <h1>{heading}</h1>
        {children}
      </article>
      <Faq items={faqs} />
      <SiteLinks current={path} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: pageJsonLdScript({ path, name: title, description, faqs }),
        }}
      />
    </>
  );
}
