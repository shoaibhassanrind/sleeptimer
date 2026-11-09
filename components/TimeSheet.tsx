"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { join24, split24, type Period } from "@/lib/cycles";
import { Sheet } from "./Sheet";

type TimeSheetProps = {
  open: boolean;
  time24: string;
  onClose: () => void;
  onConfirm: (time24: string) => void;
};

const HOURS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;
const MINUTE_STEPS = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55] as const;

function minuteOptions(current: number): number[] {
  if (MINUTE_STEPS.some((step) => step === current)) return [...MINUTE_STEPS];
  return [...MINUTE_STEPS, current].sort((a, b) => a - b);
}

function padMinute(minute: number): string {
  return String(minute).padStart(2, "0");
}

export function TimeSheet({ open, time24, onClose, onConfirm }: TimeSheetProps) {
  if (!open) return null;
  return (
    <TimeSheetBody time24={time24} onClose={onClose} onConfirm={onConfirm} />
  );
}

function TimeSheetBody({
  time24,
  onClose,
  onConfirm,
}: {
  time24: string;
  onClose: () => void;
  onConfirm: (time24: string) => void;
}) {
  const initial = split24(time24);
  const [hour, setHour] = useState(initial.hour12);
  const [minute, setMinute] = useState(initial.minute);
  const [period, setPeriod] = useState<Period>(initial.period);
  const rootRef = useRef<HTMLDivElement>(null);
  const minutes = minuteOptions(initial.minute);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    root.querySelectorAll<HTMLElement>("[data-selected='true']").forEach((element) => {
      const parent = element.parentElement;
      if (!parent) return;
      const topWithinParent =
        element.getBoundingClientRect().top -
        parent.getBoundingClientRect().top +
        parent.scrollTop;
      parent.scrollTop = Math.max(
        0,
        topWithinParent - parent.clientHeight / 2 + element.clientHeight / 2,
      );
    });
  }, []);

  return (
    <Sheet title="Set the time" onClose={onClose}>
      <div ref={rootRef} className="grid grid-cols-3 gap-2">
        <PickerColumn label="Hour">
          {HOURS.map((value) => (
            <PickerButton
              key={value}
              selected={value === hour}
              onClick={() => setHour(value)}
            >
              {value}
            </PickerButton>
          ))}
        </PickerColumn>
        <PickerColumn label="Minute">
          {minutes.map((value) => (
            <PickerButton
              key={value}
              selected={value === minute}
              onClick={() => setMinute(value)}
            >
              {padMinute(value)}
            </PickerButton>
          ))}
        </PickerColumn>
        <PickerColumn label="AM/PM">
          {(["AM", "PM"] as const).map((value) => (
            <PickerButton
              key={value}
              selected={value === period}
              onClick={() => setPeriod(value)}
            >
              {value}
            </PickerButton>
          ))}
        </PickerColumn>
      </div>
      <button
        type="button"
        className="mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-ink text-base font-semibold text-night active:bg-white"
        onClick={() => onConfirm(join24(hour, minute, period))}
      >
        Done
      </button>
    </Sheet>
  );
}

function PickerColumn({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="min-w-0">
      <p className="mb-2 text-base text-muted">{label}</p>
      <div className="picker-col flex flex-col gap-1" role="group" aria-label={label}>
        {children}
      </div>
    </div>
  );
}

function PickerButton({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      data-selected={selected ? "true" : "false"}
      aria-pressed={selected}
      className={`min-h-11 w-full rounded-xl px-2 text-base tabular-nums active:bg-white/10 ${
        selected
          ? "bg-chip font-semibold text-ink shadow-[inset_0_0_0_1.5px_#f4f1ea]"
          : "font-medium text-muted"
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
