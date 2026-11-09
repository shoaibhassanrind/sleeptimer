import {
  isValidAt,
  isValidMode,
  labelFrom24,
  parseAt,
  parseMode,
  type Mode,
} from "./cycles";

export const DEFAULT_TITLE = "Sleep calculator: bedtime and wake-up by sleep cycle";

export const DESCRIPTION =
  "Pick a wake-up or bedtime and see six sleep-cycle times. Each suggestion uses 90-minute cycles plus the minutes you usually need to fall asleep.";

export type FaqItem = {
  question: string;
  answer: string;
};

export const FAQS: readonly FaqItem[] = [
  {
    question: "Why is 90 minutes only an average?",
    answer:
      "A sleep cycle is often about 90 minutes, but the real length varies by person and can shift during the night. sleeptimer uses that average to suggest a clock time. It is a planning guide, not a reading of your sleep.",
  },
  {
    question: "How does the fall-asleep setting change the times?",
    answer:
      "Onset is the number of minutes you usually need to fall asleep. Bedtime suggestions move earlier by that amount, and wake-up suggestions move later, so they match when you are actually asleep. Change it in settings and the six suggestions update on this device right away.",
  },
  {
    question: "Why is this not a sleep-stage tracker?",
    answer:
      "This page only adds and subtracts time. It does not use a microphone, a watch, or any sensor, and it cannot tell light sleep from deep sleep.",
  },
];

export const NOSCRIPT_FAQ =
  "A sleep cycle is often about 90 minutes, but the real length varies by person and can shift during the night.";

export type ResolvedSearch = {
  mode: Mode;
  at: string;
  modeValid: boolean;
  atValid: boolean;
};

export function resolveSearch(search: {
  mode?: string | string[];
  at?: string | string[];
}): ResolvedSearch {
  const modeRaw = Array.isArray(search.mode) ? search.mode[0] : search.mode;
  const atRaw = Array.isArray(search.at) ? search.at[0] : search.at;
  return {
    mode: parseMode(modeRaw),
    at: parseAt(atRaw),
    modeValid: isValidMode(modeRaw),
    atValid: isValidAt(atRaw),
  };
}

export function pageTitle(mode: Mode, at: string, includeTime: boolean): string {
  if (!includeTime) return DEFAULT_TITLE;
  const label = labelFrom24(at);
  if (mode === "bed") return `Wake-up times if you sleep at ${label}`;
  return `Bedtime for a ${label} wake-up`;
}

export function canonicalPath(resolved: ResolvedSearch): string {
  const parts: string[] = [];
  if (resolved.modeValid) parts.push(`mode=${resolved.mode}`);
  if (resolved.atValid) parts.push(`at=${resolved.at}`);
  return parts.length > 0 ? `/?${parts.join("&")}` : "/";
}

export function siteOrigin(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return raw.replace(/\/$/, "");
}

export function jsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "sleeptimer",
        applicationCategory: "HealthApplication",
        operatingSystem: "Web",
        url: `${siteOrigin()}/`,
        description: DESCRIPTION,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQS.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };
}

export function jsonLdScript(): string {
  return JSON.stringify(jsonLd()).replace(/</g, "\\u003c");
}
