"use client";

import { useId, useState, useSyncExternalStore } from "react";
import {
  calculate,
  calculatorPath,
  join24,
  readOnsetOrDefault,
  roundNowToFive,
  serverOnset,
  split24,
  subscribeOnset,
  writeStoredOnset,
  type Calculation,
  type CycleCount,
  type Mode,
} from "@/lib/cycles";
import { DEFAULT_TITLE, pageTitle } from "@/lib/seo";
import { CycleList } from "./CycleList";
import { SettingsSheet } from "./SettingsSheet";
import { TimeSheet } from "./TimeSheet";

export function Calculator({
  initial,
  initialResults,
}: {
  initial: Calculation;
  initialResults: boolean;
}) {
  const [plan, setPlan] = useState(initial);
  const [resultsOn, setResultsOn] = useState(initialResults);
  const [timeOpen, setTimeOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const liveOnset = useSyncExternalStore(subscribeOnset, readOnsetOrDefault, serverOnset);
  const calc =
    liveOnset === plan.onset
      ? plan
      : calculate({
          mode: plan.mode,
          at: plan.input24,
          onset: liveOnset,
          chosenCycles: plan.chosenCycles,
        });

  function withPlan(partial: { mode?: Mode; at?: string; chosenCycles?: CycleCount }) {
    return calculate({
      mode: partial.mode ?? calc.mode,
      at: partial.at ?? calc.input24,
      onset: liveOnset,
      chosenCycles: partial.chosenCycles ?? calc.chosenCycles,
    });
  }

  function publish(next: Calculation) {
    setPlan(next);
    window.history.replaceState(window.history.state, "", calculatorPath(next.mode, next.input24));
    document.title = pageTitle(next.mode, next.input24, true);
  }

  function edit(partial: { mode?: Mode; at?: string; chosenCycles?: CycleCount }) {
    const next = withPlan(partial);
    if (resultsOn && (partial.mode !== undefined || partial.at !== undefined)) publish(next);
    else setPlan(next);
  }

  function reveal() {
    setTimeOpen(false);
    setSettingsOpen(false);
    setResultsOn(true);
    publish(calc);
    scrollPageTop();
  }

  function sleepNow() {
    setTimeOpen(false);
    setSettingsOpen(false);
    const next = calculate({
      mode: "bed",
      at: roundNowToFive(new Date()),
      onset: liveOnset,
      chosenCycles: calc.chosenCycles,
    });
    setResultsOn(true);
    publish(next);
    scrollPageTop();
  }

  function back() {
    setResultsOn(false);
    window.history.replaceState(window.history.state, "", "/");
    document.title = DEFAULT_TITLE;
    scrollPageTop();
  }

  function togglePeriod() {
    const parts = split24(calc.input24);
    edit({ at: join24(parts.hour12, parts.minute, parts.period === "AM" ? "PM" : "AM") });
  }

  const heading = calc.mode === "wake" ? "You should go to bed at:" : "You should wake up at:";

  return (
    <>
      <section className="hero" aria-labelledby="calculator-title">
        <Sky />
        <button
          type="button"
          className="settings-launch"
          aria-label="Fall-asleep settings"
          aria-haspopup="dialog"
          onClick={() => {
            setTimeOpen(false);
            setSettingsOpen(true);
          }}
        >
          <SettingsIcon />
        </button>
        <div className="hero-frame">
          <p className="brand">sleeptimer</p>
          <div className={resultsOn ? "hero-main is-results" : "hero-main is-form"}>
            <div className="control-stack">
              <h1 id="calculator-title" className="prompt">
                I want to...
              </h1>
              <div className="mode-switch" role="group" aria-label="Calculator mode">
                <button
                  type="button"
                  aria-pressed={calc.mode === "bed"}
                  onClick={() => edit({ mode: "bed" })}
                >
                  go to bed at
                </button>
                <button
                  type="button"
                  aria-pressed={calc.mode === "wake"}
                  onClick={() => edit({ mode: "wake" })}
                >
                  wake up at
                </button>
              </div>
              <div className="time-row">
                <button
                  type="button"
                  className="time-pill time-clock"
                  aria-label={`Change time, ${calc.input.label}`}
                  aria-haspopup="dialog"
                  onClick={() => {
                    setSettingsOpen(false);
                    setTimeOpen(true);
                  }}
                >
                  <time dateTime={calc.input.dateTime}>
                    {calc.input.hour} : {calc.input.minute}
                  </time>
                </button>
                <button
                  type="button"
                  className="time-pill time-period"
                  aria-label={`${calc.input.period}, switch to ${calc.input.period === "AM" ? "PM" : "AM"}`}
                  onClick={togglePeriod}
                >
                  {calc.input.period}
                </button>
              </div>
              {resultsOn ? null : (
                <div className="form-actions">
                  <button type="button" className="btn btn-solid" onClick={reveal}>
                    Calculate
                    <Arrow direction="right" />
                  </button>
                  <button type="button" className="btn btn-ghost" onClick={sleepNow}>
                    Sleep now
                  </button>
                </div>
              )}
            </div>
            {resultsOn ? (
              <div className="results">
                <h2 className="result-title">{heading}</h2>
                <CycleList
                  options={calc.options}
                  chosen={calc.chosenCycles}
                  onSelect={(cycles) => edit({ chosenCycles: cycles })}
                />
                <div className="result-actions">
                  <a className="btn btn-ghost" href="#faq">
                    How does it work?
                    <Arrow direction="right" />
                  </a>
                  <button type="button" className="btn btn-ghost btn-back" onClick={back}>
                    <Arrow direction="left" />
                    Back
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>
      <TimeSheet
        open={timeOpen}
        time24={calc.input24}
        onClose={() => setTimeOpen(false)}
        onConfirm={(at) => {
          edit({ at });
          setTimeOpen(false);
        }}
      />
      <SettingsSheet
        open={settingsOpen}
        onset={calc.onset}
        onClose={() => setSettingsOpen(false)}
        onOnset={(onset) => writeStoredOnset(onset)}
      />
    </>
  );
}

function scrollPageTop() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
}

const STARS = Array.from({ length: 56 }, (_, i) => {
  let x = ((i * 53) % 94) + 3;
  let y = ((i * 37) % 34) + 5;
  if (x < 24 && y < 20) {
    x += 28;
    y += 8;
  }
  if (x > 84 && y < 12) x -= 16;
  return {
    x,
    y,
    size: i % 9 === 0 ? 2.2 : i % 3 === 0 ? 1.5 : 1.05,
    peak: 0.42 + (i % 5) * 0.12,
    delay: (i * 0.41) % 6.2,
    duration: 3.1 + (i % 7) * 0.38,
  };
});

function Sky() {
  const shadeId = `moon-${useId().replace(/:/g, "")}`;
  return (
    <div className="sky" aria-hidden="true">
      <div className="stars">
        {STARS.map((star, index) => (
          <span
            key={index}
            className="star"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
              ["--peak" as string]: String(star.peak),
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
            }}
          />
        ))}
      </div>
      <div className="shooting">
        <span className="shooting-star shooting-star-a" />
        <span className="shooting-star shooting-star-b" />
      </div>
      <div className="moon">
        <svg className="moon-face" viewBox="0 0 80 80">
          <defs>
            <radialGradient id={shadeId} cx="34%" cy="32%" r="72%">
              <stop offset="0%" stopColor="#f7f8fc" />
              <stop offset="38%" stopColor="#d5ddec" />
              <stop offset="72%" stopColor="#aeb9cb" />
              <stop offset="100%" stopColor="#74839a" />
            </radialGradient>
          </defs>
          <circle cx="40" cy="40" r="38" fill={`url(#${shadeId})`} />
          <ellipse cx="30" cy="34" rx="14" ry="11" fill="rgba(96, 110, 134, 0.16)" />
          <ellipse cx="26" cy="28" rx="8" ry="6.6" fill="rgba(78, 92, 116, 0.42)" />
          <ellipse cx="27.2" cy="27.2" rx="3.2" ry="2.4" fill="rgba(214, 222, 234, 0.35)" />
          <ellipse cx="52" cy="48" rx="6.4" ry="5.2" fill="rgba(74, 88, 112, 0.4)" />
          <ellipse cx="36" cy="54" rx="3.4" ry="2.6" fill="rgba(86, 100, 124, 0.36)" />
          <circle cx="55" cy="27" r="2.4" fill="rgba(80, 94, 118, 0.4)" />
          <circle cx="20" cy="46" r="1.8" fill="rgba(88, 102, 126, 0.34)" />
        </svg>
      </div>
      <div className="sun" />
      <div className="range range-back" />
      <div className="moonlight" />
      <div className="range range-mid" />
      <div className="range range-front" />
      <div className="sky-fade" />
    </div>
  );
}

function Arrow({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true" className="btn-arrow">
      {direction === "right" ? (
        <path d="M4 10h11M11 5.5 15.5 10 11 14.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d="M16 10H5M9 5.5 4.5 10 9 14.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3.2v2.1M12 18.7v2.1M3.2 12h2.1M18.7 12h2.1M5.8 5.8l1.5 1.5M16.7 16.7l1.5 1.5M18.2 5.8l-1.5 1.5M7.3 16.7l-1.5 1.5" />
    </svg>
  );
}
