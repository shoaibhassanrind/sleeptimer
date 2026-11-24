import { FAQS, type FaqItem } from "@/lib/seo";

export function Faq({
  items = FAQS,
  heading,
}: {
  items?: readonly FaqItem[];
  heading?: string;
}) {
  const QuestionHeading = heading ? "h3" : "h2";
  return (
    <section
      id="faq"
      className="faq relative z-10 mx-auto w-full max-w-[720px] px-5 pt-12"
      aria-labelledby={heading ? "faq-heading" : undefined}
      aria-label={heading ? undefined : "Questions"}
    >
      {heading ? (
        <h2 id="faq-heading" className="text-[1.875rem] font-semibold leading-tight tracking-tight text-ink">
          {heading}
        </h2>
      ) : null}
      {items.map((faq) => (
        <div key={faq.question} className={heading ? "mt-8" : "mt-8 first:mt-0"}>
          <QuestionHeading className="text-xl font-semibold tracking-tight text-ink">
            {faq.question}
          </QuestionHeading>
          <p className="mt-2 text-base leading-relaxed text-muted">{faq.answer}</p>
        </div>
      ))}
    </section>
  );
}
