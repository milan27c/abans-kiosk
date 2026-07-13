"use client";

import { useEffect, useState } from "react";

type Parts = { days: number; hours: number; mins: number; secs: number };

function partsFrom(msLeft: number): Parts {
  const t = Math.max(0, Math.floor(msLeft / 1000));
  return {
    days: Math.floor(t / 86400),
    hours: Math.floor((t % 86400) / 3600),
    mins: Math.floor((t % 3600) / 60),
    secs: t % 60,
  };
}

const pad = (n: number) => n.toString().padStart(2, "0");

export default function CountdownTimer({
  endsInHours,
  compact = false,
}: {
  endsInHours: number;
  compact?: boolean;
}) {
  // Fix the target once (client-side), so it counts down live.
  const [target] = useState(() => Date.now() + endsInHours * 3600_000);
  // Deterministic initial value (depends only on the prop) → matches SSR, no
  // hydration mismatch; the interval then syncs to real remaining time.
  const [parts, setParts] = useState<Parts>(() =>
    partsFrom(endsInHours * 3600_000)
  );

  useEffect(() => {
    const id = setInterval(
      () => setParts(partsFrom(target - Date.now())),
      1000
    );
    return () => clearInterval(id);
  }, [target]);

  if (compact) {
    // Panel style: an animated pink→red tray holding white number tiles.
    return (
      <div className="gradient-bg-pink-red flex items-start gap-1.5 rounded-2xl px-3 py-2.5">
        <PanelUnit label="Days" value={pad(parts.days)} />
        <PanelSep />
        <PanelUnit label="Hrs" value={pad(parts.hours)} />
        <PanelSep />
        <PanelUnit label="Min" value={pad(parts.mins)} />
        <PanelSep />
        <PanelUnit label="Sec" value={pad(parts.secs)} />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <span className="mr-1 text-body-sm font-medium text-fg-muted">
        Offer ends in
      </span>
      <Unit label="Days" value={pad(parts.days)} />
      <Sep />
      <Unit label="Hrs" value={pad(parts.hours)} />
      <Sep />
      <Unit label="Min" value={pad(parts.mins)} />
      <Sep />
      <Unit label="Sec" value={pad(parts.secs)} />
    </div>
  );
}

function PanelUnit({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-body font-bold tabular-nums text-support-red">
        {value}
      </span>
      <span className="text-[12px] font-semibold uppercase tracking-wide text-white/90">
        {label}
      </span>
    </div>
  );
}

function PanelSep() {
  return (
    <span className="flex h-10 items-center text-body font-bold text-white/60">:</span>
  );
}

function Unit({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-caption font-medium uppercase tracking-widest text-fg-muted">
        {label}
      </span>
      <span className="flex h-20 w-20 items-center justify-center rounded-2xl bg-brand-500 text-h4 font-semibold tabular-nums text-white">
        {value}
      </span>
    </div>
  );
}

function Sep() {
  return <span className="mt-6 text-h4 font-semibold text-brand-500">:</span>;
}
