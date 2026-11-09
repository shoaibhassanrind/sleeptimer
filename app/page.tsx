import type { Metadata } from "next";
import { Calculator } from "@/components/Calculator";
import { Faq } from "@/components/Faq";
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
      <Calculator initial={initial} initialResults={resolved.modeValid && resolved.atValid} />
      <Faq />
      <noscript>
        <p>{DEFAULT_RECOMMENDATION}</p>
        <p>{NOSCRIPT_FAQ}</p>
      </noscript>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript() }} />
    </>
  );
}
