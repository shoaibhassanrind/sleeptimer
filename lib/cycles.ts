export const CYCLE_LENGTH_MINUTES = 90;
export const CYCLE_COUNTS = [6, 5, 4, 3, 2, 1] as const;
export const DEFAULT_ONSET_MINUTES = 15;
export const DEFAULT_CHOSEN_CYCLES = 5;
export const DEFAULT_MODE = "bed" as const;
export const DEFAULT_AT = "23:00";
export const ONSET_STORAGE_KEY = "sleeptimer.onset";
export const ONSET_MIN = 5;
export const ONSET_MAX = 60;
export const ONSET_STEP = 5;

export type Mode = "wake" | "bed";
export type CycleCount = (typeof CYCLE_COUNTS)[number];
export type Period = "AM" | "PM";

export type TimeLabel = {
  dateTime: string;
  hour: string;
  minute: string;
  period: Period;
  label: string;
};

export type CycleOption = {
  cycles: CycleCount;
  sleepMinutes: number;
  sleepLabel: string;
  when: TimeLabel;
};

export type Calculation = {
  mode: Mode;
  input24: string;
  input: TimeLabel;
  onset: number;
  chosenCycles: CycleCount;
  options: CycleOption[];
  recommendation: string;
};

export type ClockParts = {
  hour12: number;
  minute: number;
  period: Period;
};

const TIME_RE = /^([01]\d|2[0-3]):([0-5]\d)$/;

export function isValidAt(value: string | undefined): value is string {
  return typeof value === "string" && TIME_RE.test(value);
}

export function isValidMode(value: string | undefined): value is Mode {
  return value === "wake" || value === "bed";
}

export function isCycleCount(value: number): value is CycleCount {
  return (CYCLE_COUNTS as readonly number[]).includes(value);
}

export function isStoredOnset(value: number): boolean {
  return (
    Number.isInteger(value) &&
    value >= ONSET_MIN &&
    value <= ONSET_MAX &&
    value % ONSET_STEP === 0
  );
}

function firstParam(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export function parseMode(value: string | string[] | undefined): Mode {
  const raw = firstParam(value);
  return isValidMode(raw) ? raw : DEFAULT_MODE;
}

export function parseAt(value: string | string[] | undefined): string {
  const raw = firstParam(value);
  return isValidAt(raw) ? raw : DEFAULT_AT;
}

function pad(value: number): string {
  return String(value).padStart(2, "0");
}

export function labelFrom24(at: string): string {
  const valid = isValidAt(at) ? at : DEFAULT_AT;
  const hours24 = Number(valid.slice(0, 2));
  const minute = valid.slice(3, 5);
  const period: Period = hours24 >= 12 ? "PM" : "AM";
  const hour12 = hours24 % 12 || 12;
  return `${hour12}:${minute} ${period}`;
}

export function split24(at: string): ClockParts {
  const valid = isValidAt(at) ? at : DEFAULT_AT;
  const hours24 = Number(valid.slice(0, 2));
  return {
    hour12: hours24 % 12 || 12,
    minute: Number(valid.slice(3, 5)),
    period: hours24 >= 12 ? "PM" : "AM",
  };
}

export function join24(hour12: number, minute: number, period: Period): string {
  let hours24 = hour12 % 12;
  if (period === "PM") hours24 += 12;
  return `${pad(hours24)}:${pad(minute)}`;
}

function formatDateTimeAttr(date: Date): string {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function toTimeLabel(date: Date): TimeLabel {
  const at = `${pad(date.getHours())}:${pad(date.getMinutes())}`;
  const label = labelFrom24(at);
  const period: Period = label.endsWith("PM") ? "PM" : "AM";
  const clock = label.slice(0, -3);
  const [hour, minute] = clock.split(":");
  return {
    dateTime: formatDateTimeAttr(date),
    hour,
    minute,
    period,
    label,
  };
}

export function formatSleep(minutes: number): string {
  const hours = minutes / 60;
  const text = Number.isInteger(hours) ? String(hours) : hours.toFixed(1);
  return `${text} h`;
}

export function recommendationFor(
  mode: Mode,
  when: TimeLabel,
  cycles: number,
  sleepLabel: string,
): string {
  const lead = mode === "wake" ? `Asleep by ${when.label}` : `Wake at ${when.label}`;
  return `${lead} · ${cycles} cycles · ${sleepLabel}`;
}

export function calculatorPath(mode: Mode, at: string): string {
  return `/?mode=${mode}&at=${at}`;
}

/** Nearest 5-minute clock time, including seconds in the rounding. */
export function roundNowToFive(now: Date): string {
  const next = new Date(now);
  const totalSeconds = next.getMinutes() * 60 + next.getSeconds();
  const roundedMinutes = Math.round(totalSeconds / 300) * 5;
  next.setSeconds(0, 0);
  next.setMinutes(roundedMinutes);
  return `${pad(next.getHours())}:${pad(next.getMinutes())}`;
}

const ONSET_EVENT = "sleeptimer-onset";
let memoryOnset: number | null = null;

export function readStoredOnset(): number | null {
  if (typeof window === "undefined") return memoryOnset;
  try {
    const raw = window.localStorage.getItem(ONSET_STORAGE_KEY);
    if (raw !== null) {
      const value = Number(raw);
      if (isStoredOnset(value)) return value;
    }
  } catch {
    // Storage can be blocked; the in-memory value still applies in this tab.
  }
  return memoryOnset;
}

export function readOnsetOrDefault(): number {
  return readStoredOnset() ?? DEFAULT_ONSET_MINUTES;
}

export function serverOnset(): number {
  return DEFAULT_ONSET_MINUTES;
}

export function subscribeOnset(onStoreChange: () => void): () => void {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(ONSET_EVENT, onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(ONSET_EVENT, onStoreChange);
  };
}

export function writeStoredOnset(onset: number): void {
  if (!isStoredOnset(onset)) return;
  memoryOnset = onset;
  try {
    window.localStorage.setItem(ONSET_STORAGE_KEY, String(onset));
  } catch {
    // Private mode and blocked storage still update the in-memory plan.
  }
  window.dispatchEvent(new Event(ONSET_EVENT));
}

function anchorOn(at: string, reference: Date): Date {
  const valid = isValidAt(at) ? at : DEFAULT_AT;
  const date = new Date(reference);
  date.setHours(Number(valid.slice(0, 2)), Number(valid.slice(3, 5)), 0, 0);
  return date;
}

export function calculate(input: {
  mode: Mode;
  at: string;
  onset: number;
  chosenCycles?: number;
  now?: Date;
}): Calculation {
  const mode = input.mode === "bed" ? "bed" : "wake";
  const at = isValidAt(input.at) ? input.at : DEFAULT_AT;
  const onset = isStoredOnset(input.onset) ? input.onset : DEFAULT_ONSET_MINUTES;
  const chosenCycles =
    input.chosenCycles !== undefined && isCycleCount(input.chosenCycles)
      ? input.chosenCycles
      : DEFAULT_CHOSEN_CYCLES;
  const anchor = anchorOn(at, input.now ? new Date(input.now) : new Date());

  const options: CycleOption[] = CYCLE_COUNTS.map((cycles) => {
    const sleepMinutes = cycles * CYCLE_LENGTH_MINUTES;
    const deltaMinutes = mode === "wake" ? -(sleepMinutes + onset) : sleepMinutes + onset;
    const whenDate = new Date(anchor);
    whenDate.setMinutes(whenDate.getMinutes() + deltaMinutes);
    return {
      cycles,
      sleepMinutes,
      sleepLabel: formatSleep(sleepMinutes),
      when: toTimeLabel(whenDate),
    };
  });

  const chosen = options.find((option) => option.cycles === chosenCycles) ?? options[1];

  return {
    mode,
    input24: at,
    input: toTimeLabel(anchor),
    onset,
    chosenCycles,
    options,
    recommendation: recommendationFor(mode, chosen.when, chosen.cycles, chosen.sleepLabel),
  };
}

export const DEFAULT_RECOMMENDATION = calculate({
  mode: DEFAULT_MODE,
  at: DEFAULT_AT,
  onset: DEFAULT_ONSET_MINUTES,
  chosenCycles: DEFAULT_CHOSEN_CYCLES,
  now: new Date(2026, 0, 15, 12, 0, 0),
}).recommendation;
