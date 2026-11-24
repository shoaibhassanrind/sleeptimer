import type { ReactNode } from "react";
import Link from "next/link";
import { Calculator } from "@/components/Calculator";
import { Faq } from "@/components/Faq";
import { SiteLinks } from "@/components/SiteLinks";
import {
  calculate,
  DEFAULT_CHOSEN_CYCLES,
  DEFAULT_ONSET_MINUTES,
  type Mode,
} from "@/lib/cycles";
import {
  pageJsonLdScript,
  resolveSearch,
  type BreadcrumbItem,
  type FaqItem,
} from "@/lib/seo";

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
  faqHeading,
  faqPage = true,
  breadcrumbs,
  schemaName,
  origin,
  siteName,
  inLanguage,
  children,
}: {
  searchParams: Promise<CalculatorSearch>;
  path: string;
  title: string;
  description: string;
  heading: string;
  defaultMode?: Mode;
  faqs: readonly FaqItem[];
  faqHeading?: string;
  faqPage?: boolean;
  breadcrumbs?: readonly BreadcrumbItem[];
  schemaName?: string;
  origin?: string;
  siteName?: string;
  inLanguage?: string;
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
        {breadcrumbs && breadcrumbs.length > 0 ? (
          <nav aria-label="Breadcrumb">
            <ol className="crumbs">
              {breadcrumbs.map((crumb, index) => {
                const current = index === breadcrumbs.length - 1;
                return (
                  <li key={`${crumb.path}-${crumb.name}`}>
                    {index > 0 ? <span aria-hidden="true">/</span> : null}
                    {current ? (
                      <span aria-current="page">{crumb.name}</span>
                    ) : (
                      <Link href={crumb.path}>{crumb.name}</Link>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        ) : null}
        <h1>{heading}</h1>
        {children}
      </article>
      <Faq items={faqs} heading={faqHeading} />
      <SiteLinks current={path} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: pageJsonLdScript({
            path,
            name: schemaName ?? title,
            description,
            faqs,
            faqPage,
            breadcrumbs,
            origin,
            siteName,
            inLanguage,
          }),
        }}
      />
    </>
  );
}
