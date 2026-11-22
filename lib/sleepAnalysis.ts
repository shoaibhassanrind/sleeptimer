import { CYCLE_LENGTH_MINUTES, isValidAt, labelFrom24 } from "./cycles";

export type AgeGroupId = "child" | "teen" | "adult" | "older" | "senior";

export type AgeGroup = {
  id: AgeGroupId;
  label: string;
  minMinutes: number;
  maxMinutes: number | null;
  dayTotal: boolean;
};

/** Public-health ranges. Adult 18–60 follows the stated minimum of at least 7 hours. */
export const AGE_GROUPS: readonly AgeGroup[] = [
  { id: "child", label: "6–12 years", minMinutes: 9 * 60, maxMinutes: 12 * 60, dayTotal: true },
  { id: "teen", label: "13–17 years", minMinutes: 8 * 60, maxMinutes: 10 * 60, dayTotal: true },
  { id: "adult", label: "18–60 years", minMinutes: 7 * 60, maxMinutes: null, dayTotal: false },
  { id: "older", label: "61–64 years", minMinutes: 7 * 60, maxMinutes: 9 * 60, dayTotal: false },
  { id: "senior", label: "65 and older", minMinutes: 7 * 60, maxMinutes: 8 * 60, dayTotal: false },
];

const GENERAL_ADULT_MINUTES = 7 * 60;
const DAY_MINUTES = 24 * 60;

export const ESTIMATE_NOTE =
  "These figures are mathematical estimates made by dividing time by 90 minutes. They are not measured sleep cycles. Cycle length varies between people and across the night. This calculator cannot detect REM sleep, deep sleep, or any sleep stage.";

export type SleepBand = "below" | "within" | "above";

export type SleepAnalysis = {
  ok: true;
  inBedMinutes: number;
  sleepMinutes: number;
  onsetMinutes: number;
  equivalentsLabel: string;
  completeCycles: number;
  remainderMinutes: number;
  band: SleepBand;
  status: string;
  suggestion: string;
};

export type SleepAnalysisResult = SleepAnalysis | { ok: false; message: string };

export function analyzeSleep(input: {
  bedtime: string;
  wake: string;
  onset: number;
  ageGroupId?: string | null;
}): SleepAnalysisResult {
  if (!isValidAt(input.bedtime) || !isValidAt(input.wake)) {
    return { ok: false, message: "Enter a valid bedtime and wake-up time." };
  }
  if (!Number.isInteger(input.onset) || input.onset < 0 || input.onset > 12 * 60) {
    return { ok: false, message: "Enter a fall-asleep time of 0 minutes or more." };
  }

  const inBedMinutes = minutesBetween(input.bedtime, input.wake);
  if (inBedMinutes === 0) {
    return {
      ok: false,
      message: "Bedtime and wake-up time are the same, so there is no sleep interval to estimate.",
    };
  }

  const onsetMinutes = input.onset;
  const sleepMinutes = Math.max(0, inBedMinutes - onsetMinutes);
  const completeCycles = Math.floor(sleepMinutes / CYCLE_LENGTH_MINUTES);
  const remainderMinutes = sleepMinutes % CYCLE_LENGTH_MINUTES;
  const group = AGE_GROUPS.find((item) => item.id === input.ageGroupId) ?? null;
  const band = sleepBand(sleepMinutes, group);
  const bedtimeLabel = labelFrom24(shiftClock(input.bedtime, 0));

  return {
    ok: true,
    inBedMinutes,
    sleepMinutes,
    onsetMinutes,
    equivalentsLabel: formatEquivalents(sleepMinutes),
    completeCycles,
    remainderMinutes,
    band,
    status: statusText(band, group),
    suggestion: suggestionText({
      band,
      group,
      bedtime: input.bedtime,
      wake: input.wake,
      sleepMinutes,
      onsetMinutes,
      inBedMinutes,
      bedtimeLabel,
    }),
  };
}

export function formatDuration(minutes: number): string {
  const whole = Math.max(0, Math.round(minutes));
  const hours = Math.floor(whole / 60);
  const mins = whole % 60;
  if (hours === 0) return mins === 1 ? "1 minute" : `${mins} minutes`;
  const hourLabel = hours === 1 ? "1 hour" : `${hours} hours`;
  if (mins === 0) return hourLabel;
  const minuteLabel = mins === 1 ? "1 minute" : `${mins} minutes`;
  return `${hourLabel} ${minuteLabel}`;
}

export function formatEquivalents(sleepMinutes: number): string {
  if (sleepMinutes <= 0) return "0";
  const rounded = Math.round((sleepMinutes / CYCLE_LENGTH_MINUTES) * 100) / 100;
  return rounded.toFixed(2).replace(/0+$/, "").replace(/\.$/, "");
}

function minutesFromClock(at: string): number {
  return Number(at.slice(0, 2)) * 60 + Number(at.slice(3, 5));
}

function minutesBetween(bedtime: string, wake: string): number {
  const bed = minutesFromClock(bedtime);
  const wakeMinutes = minutesFromClock(wake);
  if (wakeMinutes === bed) return 0;
  if (wakeMinutes > bed) return wakeMinutes - bed;
  return DAY_MINUTES - bed + wakeMinutes;
}

function shiftClock(at: string, deltaMinutes: number): string {
  const next = minutesFromClock(at) + deltaMinutes;
  const wrapped = ((next % DAY_MINUTES) + DAY_MINUTES) % DAY_MINUTES;
  const hours = Math.floor(wrapped / 60);
  const minutes = wrapped % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

function sleepBand(sleepMinutes: number, group: AgeGroup | null): SleepBand {
  const min = group?.minMinutes ?? GENERAL_ADULT_MINUTES;
  const max = group?.maxMinutes ?? null;
  if (sleepMinutes < min) return "below";
  if (max !== null && sleepMinutes > max) return "above";
  return "within";
}

function rangeLabel(group: AgeGroup): string {
  const min = formatDuration(group.minMinutes);
  if (group.maxMinutes === null) return `at least ${min}`;
  return `${formatDuration(group.minMinutes)} to ${formatDuration(group.maxMinutes)}`;
}

function statusText(band: SleepBand, group: AgeGroup | null): string {
  if (!group) {
    if (band === "below") {
      return "No age group is selected. This estimate is below the general adult guidance of at least 7 hours. That comparison is not based on your age.";
    }
    return "No age group is selected. This estimate meets the general adult guidance of at least 7 hours. That comparison is not based on your age.";
  }

  const range = rangeLabel(group);
  const dayNote = group.dayTotal
    ? " This public-health range is for a full day, including naps, so one time in bed is only part of it."
    : "";
  if (band === "below") {
    return `For ${group.label}, general guidance is ${range}. This estimate is below that range.${dayNote}`;
  }
  if (band === "above") {
    return `For ${group.label}, general guidance is ${range}. This estimate is above that range.${dayNote}`;
  }
  return `For ${group.label}, general guidance is ${range}. This estimate is within that range.${dayNote}`;
}

function suggestionText(input: {
  band: SleepBand;
  group: AgeGroup | null;
  bedtime: string;
  wake: string;
  sleepMinutes: number;
  onsetMinutes: number;
  inBedMinutes: number;
  bedtimeLabel: string;
}): string {
  const refreshed = "This does not mean you will wake up feeling refreshed.";
  if (input.onsetMinutes >= input.inBedMinutes) {
    return `The fall-asleep setting is as long as the time in bed, so estimated sleep is 0 minutes. An earlier bedtime gives this wake-up time a longer estimate. ${refreshed}`;
  }

  const minimum = input.group?.minMinutes ?? GENERAL_ADULT_MINUTES;
  if (input.band === "below") {
    const deficit = minimum - input.sleepMinutes;
    const earlier = labelFrom24(shiftClock(input.bedtime, -deficit));
    return `If you keep this wake-up time and the same fall-asleep setting, a bedtime around ${earlier} would add about ${formatDuration(deficit)} in bed. ${refreshed}`;
  }

  if (input.band === "above" && input.group?.maxMinutes != null) {
    const excess = input.sleepMinutes - input.group.maxMinutes;
    const later = labelFrom24(shiftClock(input.bedtime, excess));
    return `If you keep this wake-up time, a bedtime around ${later} would bring the estimate down to about ${formatDuration(input.group.maxMinutes)}. Sleeping less is not automatically healthier. ${refreshed}`;
  }

  return `A similar bedtime, around ${input.bedtimeLabel}, fits this wake-up time. ${refreshed}`;
}
