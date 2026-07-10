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

  return (
    <div className={`flex items-center ${compact ? "gap-2" : "gap-3"}`}>
      {!compact && (
        <span className="mr-1 text-body-sm font-medium text-fg-muted">
          Offer ends in
        </span>
      )}
      <Unit label="Days" value={pad(parts.days)} compact={compact} />
      <Sep compact={compact} />
      <Unit label="Hrs" value={pad(parts.hours)} compact={compact} />
      <Sep compact={compact} />
      <Unit label="Min" value={pad(parts.mins)} compact={compact} />
      <Sep compact={compact} />
      <Unit label="Sec" value={pad(parts.secs)} compact={compact} />
    </div>
  );
}

function Unit({
  label,
  value,
  compact,
}: {
  label: string;
  value: string;
  compact: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      {!compact && (
        <span className="text-caption font-medium uppercase tracking-widest text-fg-muted">
          {label}
        </span>
      )}
      <span
        className={`flex items-center justify-center rounded-xl bg-brand-500 font-semibold tabular-nums text-white ${
          compact ? "h-11 w-11 text-body-sm" : "h-20 w-20 rounded-2xl text-h4"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

function Sep({ compact }: { compact: boolean }) {
  return (
    <span
      className={`font-semibold text-brand-500 ${
        compact ? "text-body-sm" : "mt-6 text-h4"
      }`}
    >
      :
    </span>
  );
}
