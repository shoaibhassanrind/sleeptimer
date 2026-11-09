import type { ReactNode } from "react";
import Link from "next/link";
import { SiteLinks } from "@/components/SiteLinks";
import { pageJsonLdScript } from "@/lib/seo";

export function TextPage({
  path,
  title,
  description,
  heading,
  children,
}: {
  path: string;
  title: string;
  description: string;
  heading: string;
  children: ReactNode;
}) {
  return (
    <main>
      <p className="brand px-5 pt-[max(1.15rem,env(safe-area-inset-top))]">
        <Link href="/" className="text-inherit no-underline">
          sleeptimer
        </Link>
      </p>
      <article className="guide guide-tight">
        <h1>{heading}</h1>
        {children}
      </article>
      <SiteLinks current={path} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: pageJsonLdScript({ path, name: title, description }),
        }}
      />
    </main>
  );
}
