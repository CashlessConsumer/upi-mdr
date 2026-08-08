import { AlertTriangle, Banknote, Users, Shield, ExternalLink } from "lucide-react";
import { useI18n } from "../i18n";

export default function IntroSection() {
  const { t } = useI18n();
  return (
    <div className="w-full max-w-4xl mx-auto p-1 sm:p-4 space-y-6 sm:space-y-8">
      {/* The summary */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-red-900/20 to-red-800/10 rounded-xl p-4 sm:p-5 border border-red-800/30">
          <Banknote className="w-6 h-6 text-red-400 mb-2" />
          <div className="text-sm font-bold text-red-300 uppercase tracking-wider mb-1">{t("What Changed")}</div>
          <div className="text-sm text-stone-300">
            {t("The government passed a law on Aug 6, 2026 allowing MDR on UPI. It's not active yet — but the framework is ready.")}
          </div>
        </div>
        <div className="bg-gradient-to-br from-amber-900/20 to-amber-800/10 rounded-xl p-4 sm:p-5 border border-amber-800/30">
          <AlertTriangle className="w-6 h-6 text-amber-400 mb-2" />
          <div className="text-sm font-bold text-amber-300 uppercase tracking-wider mb-1">{t("The Spin")}</div>
          <div className="text-sm text-stone-300">
            {t("\"Merchants pay, not you.\" — FM Sitharaman. But every business cost eventually reaches consumers. The real question: how much will it cost you?")}
          </div>
        </div>
        <div className="bg-gradient-to-br from-emerald-900/20 to-emerald-800/10 rounded-xl p-4 sm:p-5 border border-emerald-800/30">
          <Users className="w-6 h-6 text-emerald-400 mb-2" />
          <div className="text-sm font-bold text-emerald-300 uppercase tracking-wider mb-1">{t("The Truth")}</div>
          <div className="text-sm text-stone-300">
            {t("UPI was built as a public good. NPCI operates at ₹0.10/txn with ₹1,552 Cr surplus. Apps already earn ₹5,065 Cr from your data. MDR is a revenue grab.")}
          </div>
        </div>
      </div>

      {/* Key stats bar */}
      <div className="bg-stone-800/40 rounded-xl p-4 sm:p-5 border border-stone-700/50">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-red-400">₹1,552 Cr</div>
            <div className="text-xs text-stone-400">{t("NPCI surplus (FY25)")}</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-amber-400">₹0.10</div>
            <div className="text-xs text-stone-400">{t("NPCI cost per transaction")}</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-emerald-400">₹5,065 Cr</div>
            <div className="text-xs text-stone-400">{t("PhonePe + GPay revenue (no MDR)")}</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-rose-400">₹80,000+ Cr</div>
            <div className="text-xs text-stone-400">{t("Unspent in USOF/DBN fund")}</div>
          </div>
        </div>
      </div>

      {/* Sources bar */}
      <details className="bg-stone-900/30 rounded-lg px-4 py-2 border border-stone-800/50">
        <summary className="text-xs text-stone-500 cursor-pointer hover:text-stone-300">
          {t("Sources & methodology")}
        </summary>
        <div className="mt-2 text-xs text-stone-600 space-y-1 leading-relaxed">
          <p>{t("NPCI surplus, cost/txn: IIMB analysis of NPCI FY25 financials. PhonePe+GPay revenue: Indiabytes. USOF idle funds: PRS Legislative Research. PIDF: Dataful RTI. MDR rate assumptions based on media reports (0.11% on txns >₹2,000).")}</p>
          <p>{t("Calculator assumes 100% pass-through of MDR by merchants. Real pass-through may be partial. Calculator is for illustration.")}</p>
        </div>
      </details>
    </div>
  );
}
