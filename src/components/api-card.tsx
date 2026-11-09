"use client";

import { useEffect, useState } from "react";

type Props = { json: string };

/** Card "GET /api/vinicius" que se digita sozinho. Respeita prefers-reduced-motion. */
export function ApiCard({ json }: Props) {
  const [shown, setShown] = useState(json.length);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let i = 0;
    const id = setInterval(() => {
      i += 2;
      setShown(i);
      if (i >= json.length) clearInterval(id);
    }, 16);
    return () => clearInterval(id);
  }, [json]);

  const done = shown >= json.length;

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface/90 font-mono text-[13px] shadow-2xl backdrop-blur">
      <div className="flex items-center justify-between border-b border-border bg-surface-2 px-4 py-2.5 text-xs">
        <span>
          <span className="font-semibold text-accent">GET</span> <span className="text-muted">/api/vinicius</span>
        </span>
        <span className={done ? "text-accent" : "text-muted"}>{done ? "200 OK" : "…"}</span>
      </div>
      <pre className="relative overflow-x-auto p-4 leading-relaxed" aria-label={json}>
        {/* Reserva o espaço final para não "pular" o layout enquanto digita. */}
        <code className="invisible" aria-hidden="true">
          {json}
        </code>
        <code className="absolute inset-0 p-4" aria-hidden="true">
          {json.slice(0, shown)}
          {!done && <span className="ml-px inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-accent" />}
        </code>
      </pre>
    </div>
  );
}
