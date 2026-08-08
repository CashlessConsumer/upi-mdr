import { useState } from "react";
import { Copy, Check, ExternalLink } from "lucide-react";
import { useI18n } from "../i18n";

const mpLetter = `To: [Your MP's Name]
Lok Sabha / Rajya Sabha
Parliament of India
New Delhi

Subject: Demand for review of Section 10A — MDR on UPI (Taxation Laws Amendment Bill 2026)

Dear Honourable MP,

I am writing as a constituent and a regular UPI user. The Taxation Laws (Amendment) Bill 2026 was passed by voice vote on August 6, 2026 without a recorded division or Standing Committee examination.

This Bill introduces MDR on UPI — a tax on digital payments used by over 300 million Indians. Key concerns:

1. The Bill was passed without recorded division — I cannot verify your position
2. No Standing Committee on Finance examined the impact on consumers or small merchants
3. No cost study justifying the MDR rate has been made public
4. Parliamentary Standing Committee on Finance (March 2026) itself questioned zero-MDR sustainability — but the solution was legislated without public consultation

I request you to:
- Write to the Finance Minister demanding a Cost Benefit Analysis of UPI MDR be tabled
- Support a freeze on MDR implementation until a Parliamentary Committee reviews it
- Share your position on this matter

I look forward to your response.

Yours sincerely,
[Your Name]
[Your Address]
[Aadhaar-linked voter ID or EPIC number for verification]`;

const rtiText = `To:
CPIO, National Payments Corporation of India (NPCI)
1001A, The Capital, BKC,
Bandra East, Mumbai — 400051

1. Provide copies of all studies, cost analyses, and impact assessments conducted by NPCI regarding the introduction of MDR on UPI P2M transactions, including projected revenue and cost estimates.

2. Provide the NPCI Board resolution(s) regarding the introduction of MDR on UPI transactions.

3. Provide the total operating cost per UPI transaction and the methodology used to compute it for FY 2023-24 and FY 2024-25.

4. Provide details of consultations held with consumer organisations, merchant associations, and public representatives before proposing MDR.

5. Provide a breakdown of NPCI's surplus of ₹1,552 Cr for FY 2024-25, including amounts allocated to reserves, marketing incentives, and technology development.`;

export default function ActSection() {
  const [copiedMP, setCopiedMP] = useState(false);
  const [copiedRTI, setCopiedRTI] = useState(false);
  const { t } = useI18n();

  const copyToClipboard = async (text: string, setter: (v: boolean) => void) => {
    await navigator.clipboard.writeText(t(text));
    setter(true);
    setTimeout(() => setter(false), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-1 sm:p-4 space-y-6 sm:space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">{t("What You Can Do About It")}</h2>
        <p className="text-stone-400">
          {t("Three concrete actions. Each takes 10-15 minutes.")}
        </p>
      </div>

      <div className="grid gap-6">
        {/* 1. Write to MP */}
        <div className="bg-stone-800/60 rounded-xl p-4 sm:p-6 border border-stone-700/50 space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-lg font-bold flex items-center gap-2 min-w-0">
              <span className="w-8 h-8 rounded-full bg-rose-800 flex items-center justify-center text-sm">1</span>
              {t("Write to Your MP")}
            </h3>
            <button
              onClick={() => copyToClipboard(mpLetter, setCopiedMP)}
              className="flex items-center gap-1 text-sm px-3 py-1.5 rounded-lg bg-stone-700 hover:bg-stone-600 transition-all self-start sm:self-auto"
            >
              {copiedMP ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              {copiedMP ? t("Copied!") : t("Copy Letter")}
            </button>
          </div>
          <div className="text-sm text-stone-300 leading-relaxed whitespace-pre-wrap break-words font-mono bg-stone-900/50 p-3 sm:p-4 rounded-lg max-h-60 overflow-y-auto">
            {t(mpLetter)}
          </div>
          <p className="text-xs text-stone-500">
            {t("Find your MP:")} {" "}
            <a href="https://sansad.in" target="_blank" rel="noopener noreferrer" className="underline text-rose-300 hover:text-rose-200">
              sansad.in <ExternalLink className="w-3 h-3 inline" />
            </a>
          </p>
        </div>

        {/* 2. File RTI */}
        <div className="bg-stone-800/60 rounded-xl p-4 sm:p-6 border border-stone-700/50 space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-lg font-bold flex items-center gap-2 min-w-0">
              <span className="w-8 h-8 rounded-full bg-rose-800 flex items-center justify-center text-sm">2</span>
              {t("File an RTI with NPCI")}
            </h3>
            <button
              onClick={() => copyToClipboard(rtiText, setCopiedRTI)}
              className="flex items-center gap-1 text-sm px-3 py-1.5 rounded-lg bg-stone-700 hover:bg-stone-600 transition-all self-start sm:self-auto"
            >
              {copiedRTI ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              {copiedRTI ? t("Copied!") : t("Copy RTI")}
            </button>
          </div>
          <div className="text-sm text-stone-300 leading-relaxed whitespace-pre-wrap break-words font-mono bg-stone-900/50 p-3 sm:p-4 rounded-lg max-h-60 overflow-y-auto">
            {t(rtiText)}
          </div>
          <p className="text-xs text-stone-500">
            {t("File online:")} {" "}
            <a href="https://rtionline.gov.in" target="_blank" rel="noopener noreferrer" className="underline text-rose-300 hover:text-rose-200">
              rtionline.gov.in <ExternalLink className="w-3 h-3 inline" />
            </a>
            {" "}· {t("Fee: ₹10")}
          </p>
        </div>

        {/* 3. Share */}
        <div className="bg-stone-800/60 rounded-xl p-4 sm:p-6 border border-stone-700/50 space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-rose-800 flex items-center justify-center text-sm">3</span>
            <h3 className="text-lg font-bold">{t("Share This Site")}</h3>
          </div>
          <p className="text-sm text-stone-400">
            {t("Share with someone who uses UPI daily. Most people don't know they're about to be taxed.")}
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                const text = "Did you know UPI is getting a tax? See how much it will cost you and what you can do about it: [URL]";
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, "_blank");
              }}
              className="px-4 py-2 bg-stone-700 hover:bg-stone-600 rounded-lg text-sm"
            >
              {t("Share on X")}
            </button>
            <button
              onClick={() => {
                const text = "UPI is getting a tax — here's what it means for you";
                window.open(`https://wa.me/?text=${encodeURIComponent(text + " [URL]")}`, "_blank");
              }}
              className="px-4 py-2 bg-stone-700 hover:bg-stone-600 rounded-lg text-sm"
            >
              {t("Share on WhatsApp")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
