"use client";

import {
  AGE_GROUPS,
  ESTIMATE_NOTE,
  formatDuration,
  type SleepAnalysisResult,
} from "@/lib/sleepAnalysis";
import { labelFrom24, split24 } from "@/lib/cycles";

export function AnalyzeFields({
  bedtime,
  wake,
  ageGroupId,
  onBedtimeOpen,
  onWakeOpen,
  onToggleBedtime,
  onToggleWake,
  onAgeGroup,
  onCalculate,
}: {
  bedtime: string;
  wake: string;
  ageGroupId: string;
  onBedtimeOpen: () => void;
  onWakeOpen: () => void;
  onToggleBedtime: () => void;
  onToggleWake: () => void;
  onAgeGroup: (id: string) => void;
  onCalculate: () => void;
}) {
  return (
    <>
      <ClockField
        label="Bedtime"
        at={bedtime}
        onOpen={onBedtimeOpen}
        onTogglePeriod={onToggleBedtime}
      />
      <ClockField
        label="Wake-up time"
        at={wake}
        onOpen={onWakeOpen}
        onTogglePeriod={onToggleWake}
      />
      <label className="analyze-age">
        <span className="analyze-label">Age group, optional</span>
        <select
          className="age-select"
          value={ageGroupId}
          onChange={(event) => onAgeGroup(event.target.value)}
        >
          <option value="">No age group selected</option>
          {AGE_GROUPS.map((group) => (
            <option key={group.id} value={group.id}>
              {group.label}
            </option>
          ))}
        </select>
      </label>
      <div className="form-actions">
        <button type="button" className="btn btn-solid" onClick={onCalculate}>
          Calculate
        </button>
      </div>
    </>
  );
}

export function AnalyzeResults({ result }: { result: SleepAnalysisResult }) {
  if (!result.ok) {
    return (
      <div className="results" role="alert">
        <h2 className="result-title">Check the times</h2>
        <p className="analysis-note">{result.message}</p>
      </div>
    );
  }

  const remainder =
    result.remainderMinutes === 0
      ? "no minutes remaining"
      : `about ${formatDuration(result.remainderMinutes)} remaining`;

  return (
    <div className="results" aria-live="polite">
      <h2 className="result-title">Sleep estimate</h2>
      <ul className="analysis-grid">
        <li className="analysis-card">
          <span className="analysis-kicker">Time in bed</span>
          <span className="analysis-value">{formatDuration(result.inBedMinutes)}</span>
        </li>
        <li className="analysis-card">
          <span className="analysis-kicker">Estimated sleep</span>
          <span className="analysis-value">{formatDuration(result.sleepMinutes)}</span>
          <span className="analysis-detail">
            Time in bed minus {formatDuration(result.onsetMinutes)} to fall asleep.
          </span>
        </li>
        <li className="analysis-card">
          <span className="analysis-kicker">Estimated 90-minute equivalents</span>
          <span className="analysis-value">{result.equivalentsLabel}</span>
          <span className="analysis-detail">
            {result.completeCycles} complete 90-minute blocks, with {remainder}.
          </span>
        </li>
        <li className="analysis-card">
          <span className="analysis-kicker">Recommendation</span>
          <span className={`analysis-value analysis-${result.band}`}>{bandLabel(result.band)}</span>
          <span className="analysis-detail">{result.status}</span>
        </li>
      </ul>
      <p className="analysis-note">{result.suggestion}</p>
      <p className="analysis-note">{ESTIMATE_NOTE}</p>
    </div>
  );
}

function bandLabel(band: "below" | "within" | "above"): string {
  if (band === "below") return "Below the range";
  if (band === "above") return "Above the range";
  return "Within the range";
}

function ClockField({
  label,
  at,
  onOpen,
  onTogglePeriod,
}: {
  label: string;
  at: string;
  onOpen: () => void;
  onTogglePeriod: () => void;
}) {
  const parts = split24(at);
  const pretty = labelFrom24(at);
  const nextPeriod = parts.period === "AM" ? "PM" : "AM";
  return (
    <div className="analyze-clock">
      <p className="analyze-label">{label}</p>
      <div className="time-row">
        <button
          type="button"
          className="time-pill time-clock"
          aria-label={`${label}, ${pretty}`}
          aria-haspopup="dialog"
          onClick={onOpen}
        >
          <time>
            {parts.hour12} : {String(parts.minute).padStart(2, "0")}
          </time>
        </button>
        <button
          type="button"
          className="time-pill time-period"
          aria-label={`${label} ${parts.period}, switch to ${nextPeriod}`}
          onClick={onTogglePeriod}
        >
          {parts.period}
        </button>
      </div>
    </div>
  );
}
