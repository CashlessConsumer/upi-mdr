import { useState } from "react";
import { Swords, Shield, ShieldCheck, SkipForward, Trophy, AlertTriangle } from "lucide-react";

interface BossLevel {
  id: string;
  boss: string;
  playerDefeat: string;
  reality: string;
  sourceNote: string;
}

const bossLevels: BossLevel[] = [
  {
    id: "L1",
    boss: "MDR will fund fraud prevention on UPI",
    playerDefeat: "NPCI already mandates fraud prevention. ₹4,386 Cr in fraud prevented through existing measures. Adding MDR doesn't make UPI more secure — it just adds a tax.",
    reality: "Fraud prevention is a regulatory mandate, not an optional extra. NPCI's multi-layered security (tokenisation, device binding, UPI PIN, risk scoring) is already required infrastructure — MDR revenue doesn't 'unlock' it.",
    sourceNote: "RBI/NPCI circulars. UPI fraud prevention architecture is mandatory."
  },
  {
    id: "L2",
    boss: "Merchants pay, not consumers",
    playerDefeat: "Every cost to a business is passed to consumers in final prices. Small merchants with thin margins absorb it or pass it on — either way, consumers pay.",
    reality: "This is Econ 101. MDR is a cost of doing business. Whether shown separately or hidden in prices, consumers bear it. Small merchants are hit hardest because they can't negotiate lower MDR rates like large chains.",
    sourceNote: "Economic theory, global interchange studies."
  },
  {
    id: "L3",
    boss: "Zero MDR is financially unsustainable",
    playerDefeat: "NPCI processes at ₹0.10 per transaction and generates ₹1,552 Cr surplus. Pix, FedNow, and Swish are free. India's own subsidy was cut 88% — the system works without MDR.",
    reality: "If zero MDR were unsustainable, NPCI would be running losses. Instead it has 42% margins, ₹2,288 Cr in cash reserves, and zero debt. It is the most efficient payments utility in the world per IIMB.",
    sourceNote: "IIMB case study, Moneycontrol analysis of NPCI FY25 financials."
  },
  {
    id: "L3B",
    boss: "NPCI is a non-profit, it needs MDR to cover costs",
    playerDefeat: "NPCI is a Section 8 company with ₹1,552 Cr surplus, 42% margin, ₹2,288 Cr cash reserves, and zero debt. Non-profit doesn't mean zero-revenue — it means non-distribution of surplus. NPCI is already profitable.",
    reality: "A 'non-profit' with 42% profit margin isn't struggling — it's thriving. Section 8 status prohibits distributing dividends, but NPCI's surplus goes to reserves, marketing incentives (₹1,116 Cr), and expansion. The network is financially robust.",
    sourceNote: "NPCI FY25 financials via Moneycontrol, CARE Ratings, IIMB analysis."
  },
  {
    id: "L4",
    boss: "Proper parliamentary debate happened before the Bill",
    playerDefeat: "The Taxation Laws Amendment Bill 2026 was passed by voice vote — no recorded division. No Standing Committee examined it. No LARR process under the Regulatory Impact Assessment framework.",
    reality: "Voice votes mean no MP's position is recorded. The public cannot hold anyone accountable. A bill that introduces a new tax on 300M+ UPI users bypassed the normal scrutiny process. It was tagged to a taxation bill — a procedural vehicle.",
    sourceNote: "Lok Sabha proceedings, August 6, 2026. Inc42 report."
  },
  {
    id: "L5",
    boss: "It's just 5-7 bps — negligible",
    playerDefeat: "There is no statutory cap in the law. The rate can be changed by notification alone. Without an indexation or floor, 'just 5-7 bps' is not a guarantee — it's a starting point.",
    reality: "The law empowers rate changes via notification. No indexation to cost of operations. No public consultation requirement. What starts at 5 bps can become 50 bps without any legislative check.",
    sourceNote: "Text of Taxation Laws Amendment Bill 2026."
  },
  {
    id: "L6",
    boss: "We need MDR to fund digital payment infrastructure",
    playerDefeat: "USOF/DBN has ₹80,000+ Cr sitting idle from 5% telecom levy. PIDF had ₹329 Cr surplus at close. Two dedicated infrastructure funds already exist — both with unspent balances.",
    reality: "Adding MDR as a third layer for 'infrastructure' when existing funds are under-utilised makes no fiscal sense. USOF collected ₹1.61L Cr from phone users with only 49% utilisation. PIDF disbursed 81% to PhonePe and Paytm — not to rural infrastructure.",
    sourceNote: "PIB, RBI PIDF circulars, Dataful analysis of PIDF disbursements."
  },
  {
    id: "L7",
    boss: "Merchants need subsidised acceptance infrastructure",
    playerDefeat: "81% of PIDF funds went to PhonePe (₹507 Cr) and Paytm (₹352 Cr). Not to small merchants. The same PSPs now get MDR — a double-dip from public funds.",
    reality: "PIDF was meant to expand acceptance in smaller towns. Instead, two private PSPs captured over ₹1,149 Cr of the ₹1,417 Cr disbursed. The infrastructure problem MDR claims to solve is already being paid for — just not reaching the intended beneficiaries.",
    sourceNote: "Dataful analysis of PIDF disbursement records."
  },
  {
    id: "L8",
    boss: "UPI apps can't monetise without MDR",
    playerDefeat: "PhonePe + Google Pay earned ₹5,065 Cr in FY25 without charging MDR. Sources: lending, soundbox rentals, transaction display ads, data-driven credit products.",
    reality: "UPI apps have built multi-billion-rupee business models around UPI. They don't need transaction fees — they use your transaction data to sell you loans, insurance, and credit products. You are the product, not the customer.",
    sourceNote: "Indiabytes, Financial Express reports on UPI app revenue."
  },
  {
    id: "L9",
    boss: "MDR will fund better security against fraud",
    playerDefeat: "Most UPI fraud is social engineering (phishing, impersonation) — not infrastructure failures. MDR doesn't fix gullibility. Security is about user education and system-level KYC/Authentication controls, which already exist.",
    reality: "NPCI's own data shows most UPI fraud involves deceived users, not hacked systems. The security measures that matter (device binding, risk-based authentication, cooling periods) are regulatory mandates, not MDR-funded projects. Adding MDR does not stop a user from sharing their OTP.",
    sourceNote: "RBI annual fraud reports, NPCI security architecture documentation."
  },
  {
    id: "L10",
    boss: "Every country charges interchange — UPI should too",
    playerDefeat: "Card interchange (1950s cost-recovery model) is not comparable. Modern fast payment systems (Pix, FedNow, Swish, UPI itself) work without MDR globally.",
    reality: "The 4-party card model was built for a world of paper processing, float, and chargeback risk. Instant-rail systems like UPI have none of these cost vectors. Comparing interchange to a zero-MDR instant payment is apples-to-oranges.",
    sourceNote: "Global fast payments comparison (BIS CPMI reports)."
  },
];

export default function BossFight() {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [defeated, setDefeated] = useState<Set<string>>(new Set());
  const [showReality, setShowReality] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const level = bossLevels[currentLevel];

  const handleDefeat = () => {
    setDefeated((prev) => new Set(prev).add(level.id));
    setShowReality(true);
  };

  const handleNext = () => {
    setShowReality(false);
    if (currentLevel < bossLevels.length - 1) {
      setCurrentLevel((prev) => prev + 1);
    } else {
      setGameOver(true);
    }
  };

  const handleSkip = () => {
    setShowReality(false);
    if (currentLevel < bossLevels.length - 1) {
      setCurrentLevel((prev) => prev + 1);
    } else {
      setGameOver(true);
    }
  };

  if (gameOver) {
    const totalDefeated = defeated.size;
    return (
      <div className="w-full max-w-2xl mx-auto p-4 text-center space-y-6">
        <Trophy className="w-16 h-16 text-yellow-400 mx-auto" />
        <h2 className="text-3xl font-bold">You defeated {totalDefeated}/{bossLevels.length} arguments!</h2>
        <p className="text-lg text-stone-400">
          {totalDefeated === bossLevels.length
            ? "Perfect score. Every pro-MDR argument dismantled."
            : "Most of them dismantled. The remaining would fall too with more data."}
        </p>
        <div className="bg-gradient-to-r from-emerald-900/40 to-emerald-800/30 rounded-xl p-6 border border-emerald-700/50 space-y-4">
          <h3 className="text-xl font-bold text-emerald-300">What You Can Do</h3>
          <div className="grid gap-3 text-left">
            <div className="p-3 bg-stone-800/50 rounded-lg">
              <strong className="text-rose-300">1. Write to your MP</strong>
              <p className="text-sm text-stone-400 mt-1">Template in the Act section below. Demand a recorded vote and Standing Committee review.</p>
            </div>
            <div className="p-3 bg-stone-800/50 rounded-lg">
              <strong className="text-rose-300">2. File an RTI</strong>
              <p className="text-sm text-stone-400 mt-1">Ask NPCI/RBI for the cost study that justified MDR. It should be public.</p>
            </div>
            <div className="p-3 bg-stone-800/50 rounded-lg">
              <strong className="text-rose-300">3. Share this site</strong>
              <p className="text-sm text-stone-400 mt-1">Not everyone knows they're about to be taxed. Send this to someone who uses UPI daily.</p>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            setCurrentLevel(0);
            setDefeated(new Set());
            setShowReality(false);
            setGameOver(false);
          }}
          className="px-6 py-2 bg-stone-700 hover:bg-stone-600 rounded-full text-sm"
        >
          Fight Again
        </button>
      </div>
    );
  }

  if (!level) return null;

  return (
    <div className="w-full max-w-3xl mx-auto p-4 space-y-6">
      {/* Progress bar */}
      <div className="flex items-center gap-2">
        <div className="flex-1 h-2 bg-stone-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-rose-500 rounded-full transition-all"
            style={{ width: `${((currentLevel + 1) / bossLevels.length) * 100}%` }}
          />
        </div>
        <span className="text-xs text-stone-400">
          Level {currentLevel + 1}/{bossLevels.length}
        </span>
      </div>

      <div className="flex items-center gap-3 text-2xl font-bold">
        <Swords className="w-7 h-7 text-rose-400" />
        <span>Boss Fight: <span className="text-rose-300">{level.id}</span></span>
        {defeated.has(level.id) && <ShieldCheck className="w-5 h-5 text-emerald-400" />}
      </div>

      {/* Boss claim */}
      <div className="bg-red-900/20 border border-red-800/40 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
          <div>
            <div className="text-xs text-stone-500 mb-1 uppercase tracking-wider">The Argument</div>
            <div className="text-lg font-semibold text-red-300">{level.boss}</div>
          </div>
        </div>
      </div>

      {!showReality ? (
        <div className="text-center space-y-4">
          <div className="text-stone-400 text-sm">
            How would you respond? Click the sword to see the counter.
          </div>
          <button
            onClick={handleDefeat}
            className="px-8 py-3 bg-rose-700 hover:bg-rose-600 rounded-xl text-lg font-bold transition-all shadow-lg shadow-rose-900/30 flex items-center gap-2 mx-auto"
          >
            <Swords className="w-5 h-5" />
            Strike Down!
          </button>
        </div>
      ) : (
        <div className="space-y-4 animate-in fade-in">
          {/* Player response */}
          <div className="bg-emerald-900/20 border border-emerald-800/40 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <Shield className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
              <div>
                <div className="text-xs text-stone-500 mb-1 uppercase tracking-wider">The Reality</div>
                <div className="text-base leading-relaxed text-emerald-200">{level.playerDefeat}</div>
              </div>
            </div>
          </div>

          {/* Reality detail */}
          <details className="bg-stone-800/50 rounded-xl p-4 border border-stone-700/50">
            <summary className="text-sm font-medium cursor-pointer text-stone-300 hover:text-stone-100">
              Why this matters
            </summary>
            <div className="mt-3 text-sm text-stone-400 leading-relaxed">{level.reality}</div>
            <div className="mt-2 text-xs text-stone-500 italic">Source: {level.sourceNote}</div>
          </details>

          <div className="flex justify-between items-center">
            <button
              onClick={handleSkip}
              className="flex items-center gap-1 text-sm text-stone-400 hover:text-stone-200"
            >
              <SkipForward className="w-4 h-4" />
              Skip to next
            </button>
            <button
              onClick={handleNext}
              className="px-6 py-2 bg-emerald-700 hover:bg-emerald-600 rounded-lg font-medium transition-all"
            >
              {currentLevel < bossLevels.length - 1 ? "Next Boss »" : "See Results!"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
