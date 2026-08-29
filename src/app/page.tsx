"use client";

import { useEffect, useMemo, useState } from "react";
import { defaultCandidate } from "@/lib/candidate";
import type { AgentResult } from "@/app/api/agent/run/route";

const STEPS = [
  "Buscando vagas reais no feed do Departamento do Trabalho dos EUA",
  "Avaliando compatibilidade de cada vaga com o perfil do candidato",
  "Redigindo cartas de apresentação personalizadas",
];

const STORAGE_KEY = "pathfinder-applied-cases";

function fitTone(score: number) {
  if (score >= 70) return { fg: "text-good", bg: "bg-good-soft", label: "Boa compatibilidade" };
  if (score >= 40) return { fg: "text-warn", bg: "bg-warn-soft", label: "Compatibilidade parcial" };
  return { fg: "text-bad", bg: "bg-bad-soft", label: "Baixa compatibilidade" };
}

export default function Home() {
  const [keywords, setKeywords] = useState("cook, chef, kitchen, sushi, culinary");
  const [daysBack, setDaysBack] = useState(7);
  const [status, setStatus] = useState<"idle" | "running" | "done" | "error">("idle");
  const [stepIndex, setStepIndex] = useState(0);
  const [results, setResults] = useState<AgentResult[]>([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [applied, setApplied] = useState<Record<string, boolean>>({});
  const [openLetter, setOpenLetter] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setApplied(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  function toggleApplied(caseNumber: string) {
    setApplied((prev) => {
      const next = { ...prev, [caseNumber]: !prev[caseNumber] };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }

  const appliedCount = useMemo(
    () => Object.values(applied).filter(Boolean).length,
    [applied]
  );

  async function runAgent() {
    setStatus("running");
    setErrorMsg("");
    setResults([]);
    setStepIndex(0);

    const kwList = keywords
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean);

    const stepTimer = setInterval(() => {
      setStepIndex((i) => Math.min(i + 1, STEPS.length - 1));
    }, 2200);

    try {
      const res = await fetch("/api/agent/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          keywords: kwList,
          daysBack,
          candidate: defaultCandidate,
          maxResults: 6,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Falha ao executar o agente");
      setResults(data.results ?? []);
      setStatus("done");
    } catch (err) {
      setErrorMsg((err as Error).message);
      setStatus("error");
    } finally {
      clearInterval(stepTimer);
    }
  }

  return (
    <main className="flex-1 mx-auto w-full max-w-3xl px-6 py-14 flex flex-col gap-10">
      <header className="flex flex-col gap-3">
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-ember">
          Agente autônomo · dados reais do DOL · Gemini 2.5 Flash
        </span>
        <h1 className="font-display text-4xl sm:text-5xl leading-[1.05] text-balance">
          Pathfinder Agent
        </h1>
        <p className="text-text-muted max-w-xl leading-relaxed">
          Um agente que busca vagas H-2B reais publicadas pelo Departamento do
          Trabalho dos EUA, avalia a compatibilidade com um perfil de
          candidato e redige, sozinho, uma carta de apresentação para cada
          vaga. Construído a partir de um processo real: usei esse mesmo
          fluxo manualmente para me candidatar a dezenas de vagas H-2B antes
          de automatizá-lo aqui.
        </p>
      </header>

      <section className="rounded-lg border border-border bg-bg-card p-5 flex flex-col gap-3">
        <h2 className="font-display text-xl">Perfil do candidato</h2>
        <p className="text-text-muted text-sm leading-relaxed">
          {defaultCandidate.summary}
        </p>
        <ul className="flex flex-wrap gap-2 pt-1">
          {defaultCandidate.skills.map((s) => (
            <li
              key={s}
              className="text-xs font-mono px-2 py-1 rounded border border-border text-text-faint"
            >
              {s}
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-4">
        <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
          <label className="flex flex-col gap-1.5">
            <span className="text-xs uppercase tracking-wide text-text-faint">
              Palavras-chave da vaga
            </span>
            <input
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              className="rounded border border-border bg-bg-raised px-3 py-2 text-sm outline-none focus:border-ember"
              placeholder="cook, chef, kitchen"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-xs uppercase tracking-wide text-text-faint">
              Dias a escanear
            </span>
            <input
              type="number"
              min={1}
              max={30}
              value={daysBack}
              onChange={(e) => setDaysBack(Number(e.target.value))}
              className="w-24 rounded border border-border bg-bg-raised px-3 py-2 text-sm outline-none focus:border-ember"
            />
          </label>
        </div>

        <button
          onClick={runAgent}
          disabled={status === "running"}
          className="self-start rounded bg-ember px-5 py-2.5 font-medium text-bg disabled:opacity-60 disabled:cursor-not-allowed transition-opacity hover:opacity-90"
        >
          {status === "running" ? "Agente em execução…" : "Executar agente"}
        </button>

        {status === "running" && (
          <ol className="flex flex-col gap-1.5 text-sm">
            {STEPS.map((step, i) => (
              <li
                key={step}
                className={`flex items-center gap-2 ${
                  i <= stepIndex ? "text-text" : "text-text-faint"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    i === stepIndex ? "bg-ember animate-pulse" : i < stepIndex ? "bg-good" : "bg-border"
                  }`}
                />
                {step}
              </li>
            ))}
          </ol>
        )}

        {status === "error" && (
          <p className="text-sm text-bad">{errorMsg}</p>
        )}
      </section>

      {results.length > 0 && (
        <section className="flex flex-col gap-4">
          <div className="flex items-baseline justify-between">
            <h2 className="font-display text-xl">
              {results.length} vaga{results.length > 1 ? "s" : ""} encontrada
              {results.length > 1 ? "s" : ""}
            </h2>
            <span className="font-mono text-xs text-text-faint">
              {appliedCount} marcada{appliedCount === 1 ? "" : "s"} como enviada
            </span>
          </div>

          <ul className="flex flex-col gap-4">
            {results.map(({ job, assessment }) => {
              const tone = fitTone(assessment.fitScore);
              const isApplied = !!applied[job.caseNumber];
              const isOpen = !!openLetter[job.caseNumber];
              return (
                <li
                  key={job.caseNumber}
                  className="rounded-lg border border-border bg-bg-card p-5 flex flex-col gap-3"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display text-lg leading-tight">
                        {job.tempneedJobtitle}
                      </h3>
                      <p className="text-sm text-text-muted">
                        {job.empBusinessName} · {job.jobCity}, {job.jobState}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 rounded-full ${tone.bg} ${tone.fg} px-3 py-1 text-xs font-mono font-medium`}
                    >
                      {assessment.fitScore}/100
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-text-faint">
                    <span>{job.caseNumber}</span>
                    <span>
                      {job.wageFrom ?? "?"}
                      {job.wageTo ? `–${job.wageTo}` : ""}/{job.wagePer ?? "hora"}
                    </span>
                    <span>
                      {job.tempneedStart} → {job.tempneedEnd}
                    </span>
                  </div>

                  <p className="text-sm leading-relaxed">
                    <span className={`font-medium ${tone.fg}`}>{tone.label}.</span>{" "}
                    {assessment.reasoning}
                  </p>

                  <div className="flex items-center gap-3 pt-1">
                    <button
                      onClick={() =>
                        setOpenLetter((p) => ({ ...p, [job.caseNumber]: !p[job.caseNumber] }))
                      }
                      className="text-sm text-ember hover:underline"
                    >
                      {isOpen ? "Ocultar carta" : "Ver carta gerada"}
                    </button>
                    <label className="flex items-center gap-2 text-sm text-text-muted cursor-pointer ml-auto">
                      <input
                        type="checkbox"
                        checked={isApplied}
                        onChange={() => toggleApplied(job.caseNumber)}
                        className="accent-ember"
                      />
                      Candidatura enviada
                    </label>
                  </div>

                  {isOpen && (
                    <pre className="whitespace-pre-wrap rounded border border-border bg-bg-raised p-4 text-sm leading-relaxed font-body">
                      {assessment.coverLetter}
                    </pre>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </main>
  );
}
