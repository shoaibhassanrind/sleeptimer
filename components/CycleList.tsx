import type { CycleCount, CycleOption } from "@/lib/cycles";

type CycleListProps = {
  options: CycleOption[];
  chosen: CycleCount;
  onSelect: (cycles: CycleCount) => void;
};

function hourPhrase(minutes: number): string {
  const hours = minutes / 60;
  const text = Number.isInteger(hours) ? String(hours) : hours.toFixed(1);
  return `${text} hr`;
}

function moodKind(cycles: number): "good" | "mid" | "warn" {
  if (cycles >= 5) return "good";
  if (cycles <= 2) return "warn";
  return "mid";
}

function Mood({ cycles }: { cycles: number }) {
  const kind = moodKind(cycles);
  const mouth =
    kind === "good"
      ? "M8 15.2c1.15 1.35 2.5 2 4 2s2.85-.65 4-2"
      : kind === "warn"
        ? "M8 17.2c1.15-1.35 2.5-2 4-2s2.85.65 4 2"
        : "M8.5 16h7";
  return (
    <svg className={`mood mood-${kind}`} viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <circle cx="9" cy="10" r="1.15" fill="currentColor" />
      <circle cx="15" cy="10" r="1.15" fill="currentColor" />
      <path d={mouth} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function CycleList({ options, chosen, onSelect }: CycleListProps) {
  return (
    <ol className="cycle-grid">
      {options.map((option) => {
        const selected = option.cycles === chosen;
        const cycleLabel = option.cycles === 1 ? "1 cycle" : `${option.cycles} cycles`;
        return (
          <li key={option.cycles}>
            <button
              type="button"
              className="cycle-card"
              aria-pressed={selected}
              onClick={() => onSelect(option.cycles)}
            >
              <Mood cycles={option.cycles} />
              <time dateTime={option.when.dateTime} className="cycle-time">
                {option.when.hour}:{option.when.minute} {option.when.period}
              </time>
              <span className="cycle-meta">{cycleLabel}</span>
              <span className="cycle-meta">{hourPhrase(option.sleepMinutes)}</span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}
