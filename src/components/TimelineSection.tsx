import { Calendar, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useI18n } from "../i18n";

interface TimelineEntry {
  date: string;
  title: string;
  body: string;
  kind: "law" | "rbi" | "npci" | "govt" | "market";
}

const timeline: TimelineEntry[] = [
  {
    date: "Apr 2016",
    title: "UPI launches",
    body: "NPCI launches Unified Payments Interface — a real-time, 24x7, interoperable payment rail built as a public good, on top of the existing IMPS infrastructure.",
    kind: "npci",
  },
  {
    date: "2016–2017",
    title: "Early MDR on UPI",
    body: "In UPI's first years NPCI charged a small MDR (0.25%–0.65% depending on ticket size) to incentivise banks and PSPs to build acceptance. Volume was tiny.",
    kind: "npci",
  },
  {
    date: "Nov 2017",
    title: "Zero MDR announced",
    body: "RBI removes MDR on UPI (and RuPay debit cards) to accelerate digital payments adoption post-demonetisation. NPCI absorbs switching costs.",
    kind: "rbi",
  },
  {
    date: "Jan 2020",
    title: "Government formalises zero MDR",
    body: "The Finance Ministry issues a notification removing MDR on UPI and RuPay debit cards entirely, effective 1 January 2020 — codifying the zero-MDR regime.",
    kind: "govt",
  },
  {
    date: "Aug 2022",
    title: "RBI discussion paper on charges",
    body: "RBI floats a discussion paper on 'Charges in Payment Systems' — floating 5–15 bps interchange on UPI P2M. Public consultation overwhelmingly rejects it; RBI shelves it in Dec 2022.",
    kind: "rbi",
  },
  {
    date: "2021–2025",
    title: "MeitY incentives instead of MDR",
    body: "Rather than fees, the government pays banks/RuPay via incentive schemes — ₹1,300 Cr (2021-22), ₹1,500 Cr (2022-23), continued through FY25 — to subsidise zero-MDR UPI.",
    kind: "govt",
  },
  {
    date: "Aug 2023",
    title: "UPI-PPI interchange (wallets)",
    body: "NPCI introduces interchange (UPI on prepaid instruments) — a narrow exception for wallet-funded UPI. The core bank-to-bank UPI stays free.",
    kind: "npci",
  },
  {
    date: "2024–2025",
    title: "MDR debate reopens",
    body: "With UPI crossing 18–20 billion transactions/month, industry bodies (banks, PSPs, soundbox vendors) lobby for MDR. RBI governor flags sustainability concerns.",
    kind: "market",
  },
  {
    date: "Aug 2026",
    title: "Taxation Laws (Amendment) Bill 2026 — Section 10A",
    body: "Parliament passes the Bill by voice vote, inserting Section 10A into the Income-Tax Act, 1961: payment gateways/acquiring banks may charge MDR on UPI transactions above ₹2,000. No statutory cap, no rate ceiling, no Standing Committee scrutiny, no LARR application.",
    kind: "law",
  },
  {
    date: "Post-Aug 2026",
    title: "What happens next",
    body: "Rates are to be notified — media reports suggest ~0.11% on transactions above ₹2,000. The ₹2,000 threshold excludes the 88% of UPI transactions under ₹200, but the affected 12% (large-ticket UPI: rent, education, healthcare, business payments) will carry the fee.",
    kind: "law",
  },
];

const kindStyle: Record<TimelineEntry["kind"], string> = {
  law: "bg-red-500/15 text-red-300 border-red-500/40",
  rbi: "bg-blue-500/15 text-blue-300 border-blue-500/40",
  npci: "bg-emerald-500/15 text-emerald-300 border-emerald-500/40",
  govt: "bg-amber-500/15 text-amber-300 border-amber-500/40",
  market: "bg-violet-500/15 text-violet-300 border-violet-500/40",
};

export default function TimelineSection() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const { t } = useI18n();

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="mb-8">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Calendar className="w-6 h-6 text-red-400" />
          {t("The MDR on UPI — Timeline")}
        </h2>
        <p className="text-sm text-stone-400 mt-2">
          {t("From free public rail to fee-charging utility. Tap an entry to expand.")}
        </p>
      </div>

      <div className="relative border-l border-stone-800 pl-6 space-y-4">
        {timeline.map((entry, i) => (
          <div key={i} className="relative">
            <div
              className="absolute -left-[31px] top-1.5 size-3 rounded-full border-2 border-stone-950"
              style={{ background: entry.kind === "law" ? "#dc2626" : "#57534e" }}
            />
            <button
              onClick={() => setExpanded(expanded === i ? null : i)}
              className={`w-full text-left rounded-lg border bg-stone-900/50 p-4 transition-colors hover:bg-stone-900 ${
                expanded === i ? "border-red-500/40" : "border-stone-800"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-xs font-mono text-stone-500">{entry.date}</span>
                  <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded border ${kindStyle[entry.kind]}`}>
                    {t(entry.kind)}
                  </span>
                  <span className="font-semibold text-stone-200">{entry.title}</span>
                </div>
                <ChevronDown
                  className={`size-4 text-stone-500 flex-shrink-0 transition-transform ${expanded === i ? "rotate-180" : ""}`}
                />
              </div>
              {expanded === i && (
                <p className="mt-3 text-sm text-stone-400 leading-relaxed">{t(entry.body)}</p>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
