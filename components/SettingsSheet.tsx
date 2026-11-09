"use client";

import { ONSET_MAX, ONSET_MIN, ONSET_STEP } from "@/lib/cycles";
import { Sheet } from "./Sheet";

type SettingsSheetProps = {
  open: boolean;
  onset: number;
  onClose: () => void;
  onOnset: (onset: number) => void;
};

export function SettingsSheet({ open, onset, onClose, onOnset }: SettingsSheetProps) {
  if (!open) return null;

  return (
    <Sheet title="Fall-asleep time" onClose={onClose}>
      <p className="text-base leading-relaxed text-muted">
        Minutes you usually need before sleep starts. The six suggestions update immediately.
      </p>
      <div className="mt-5 grid grid-cols-[44px_minmax(0,1fr)_44px] items-center gap-3">
        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full bg-chip text-2xl text-ink active:bg-white/10"
          aria-label="Decrease fall-asleep time"
          disabled={onset <= ONSET_MIN}
          onClick={() => onOnset(onset - ONSET_STEP)}
        >
          −
        </button>
        <p className="text-center text-[1.75rem] font-semibold tabular-nums text-ink" aria-live="polite">
          {onset}
          <span className="ml-2 text-base font-medium text-muted">min</span>
        </p>
        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full bg-chip text-2xl text-ink active:bg-white/10"
          aria-label="Increase fall-asleep time"
          disabled={onset >= ONSET_MAX}
          onClick={() => onOnset(onset + ONSET_STEP)}
        >
          +
        </button>
      </div>
      <p className="mt-4 text-center text-base text-muted">5 to 60 minutes, in steps of 5.</p>
    </Sheet>
  );
}
