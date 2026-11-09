import { FAQS } from "@/lib/seo";

export function Faq() {
  return (
    <section id="faq" className="faq relative z-10 mx-auto w-full max-w-[720px] px-5 pt-12 pb-[max(48px,env(safe-area-inset-bottom))]" aria-label="Questions">
      {FAQS.map((faq) => (
        <div key={faq.question} className="mt-8 first:mt-0">
          <h2 className="text-xl font-semibold tracking-tight text-ink">{faq.question}</h2>
          <p className="mt-2 text-base leading-relaxed text-muted">{faq.answer}</p>
        </div>
      ))}
    </section>
  );
}
