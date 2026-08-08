import { useState, useMemo } from "react";
import { Calculator, IndianRupee, Info, AlertTriangle } from "lucide-react";
import {
  mccCategories,
  incomeBrackets,
  mdrRate,
  calculateMdrByCategory,
} from "../data/mdr-data";

export default function MDRCalculator() {
  const [income, setIncome] = useState(600000);
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(
    new Set(mccCategories.slice(0, 8).map((c) => c.code))
  );
  const [customSpends, setCustomSpends] = useState<Record<string, string>>({});
  const [showDetails, setShowDetails] = useState(false);

  const categories = useMemo(
    () =>
      mccCategories
        .filter((c) => selectedCategories.has(c.code))
        .map((c) => ({
          label: c.name,
          annualSpend: (Number(customSpends[c.code]) || c.typicalAnnual),
        })),
    [selectedCategories, customSpends]
  );

  const result = useMemo(() => calculateMdrByCategory(categories), [categories]);
  const incomeBracket = incomeBrackets.find((b) => b.annual === income);
  const totalAnnualUPISpend = categories.reduce((s, c) => s + c.annualSpend, 0);
  const mdrAsPctOfIncome = income > 0 ? (result.total / income) * 100 : 0;
  const cumulative10Years = result.total * 10;

  const toggleCategory = (code: string) => {
    setSelectedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(code)) next.delete(code);
      else next.add(code);
      return next;
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 text-3xl font-bold">
          <Calculator className="w-8 h-8 text-rose-500" />
          <span>UPI MDR Impact Calculator</span>
        </div>
        <p className="text-lg text-stone-400">
          See how much the new {mdrRate * 100}% MDR will cost you each year
        </p>
      </div>

      {/* Income Selector */}
      <div className="bg-stone-800/50 rounded-xl p-6 space-y-4 border border-stone-700/50">
        <label className="flex items-center gap-2 text-lg font-medium">
          <IndianRupee className="w-5 h-5 text-emerald-400" />
          Your Annual Income
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {incomeBrackets.map((b) => (
            <button
              key={b.annual}
              onClick={() => setIncome(b.annual)}
              className={`p-2 rounded-lg text-sm transition-all ${
                income === b.annual
                  ? "bg-emerald-600 text-white font-medium shadow-lg shadow-emerald-900/30"
                  : "bg-stone-700/50 text-stone-300 hover:bg-stone-700"
              }`}
            >
              {b.label.split(" —")[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Category Selector */}
      <div className="bg-stone-800/50 rounded-xl p-6 space-y-4 border border-stone-700/50">
        <div className="flex items-center justify-between">
          <label className="text-lg font-medium">Where you spend</label>
          <div className="flex gap-2 text-sm">
            <button
              onClick={() =>
                setSelectedCategories(new Set(mccCategories.map((c) => c.code)))
              }
              className="px-3 py-1 rounded bg-stone-700 hover:bg-stone-600 text-xs"
            >
              Select All
            </button>
            <button
              onClick={() => setSelectedCategories(new Set())}
              className="px-3 py-1 rounded bg-stone-700 hover:bg-stone-600 text-xs"
            >
              Clear
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-2">
          {mccCategories.map((cat) => (
            <label
              key={cat.code}
              className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all ${
                selectedCategories.has(cat.code)
                  ? "bg-rose-800/30 border border-rose-700/50"
                  : "bg-stone-700/30 border border-transparent hover:bg-stone-700/50"
              }`}
            >
              <input
                type="checkbox"
                checked={selectedCategories.has(cat.code)}
                onChange={() => toggleCategory(cat.code)}
                className="accent-rose-500"
              />
              <div className="flex-1">
                <div className="text-sm">{cat.name}</div>
                <div className="text-xs text-stone-400">MCC {cat.code}</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Custom Spend Toggle */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-sm text-stone-400 hover:text-stone-200 underline flex items-center gap-1"
        >
          <Info className="w-3 h-3" />
          {showDetails ? "Hide" : "Show"} custom spend entries
        </button>
      </div>

      {showDetails && (
        <div className="bg-stone-800/50 rounded-xl p-6 space-y-3 border border-stone-700/50">
          <label className="text-sm font-medium">
            Override annual spends (₹) — defaults based on average Indian household
          </label>
          {categories.map((cat) => (
            <div key={cat.label} className="flex items-center gap-3">
              <span className="w-40 text-sm truncate">{cat.label}</span>
              <input
                type="number"
                value={customSpends[cat.label] || cat.annualSpend}
                onChange={(e) =>
                  setCustomSpends((prev) => ({
                    ...prev,
                    [cat.label]: e.target.value,
                  }))
                }
                className="flex-1 p-1.5 rounded bg-stone-700 border border-stone-600 text-sm"
                placeholder="Annual spend"
              />
            </div>
          ))}
        </div>
      )}

      {/* Result */}
      <div className="bg-stone-800 rounded-xl p-6 space-y-6 border border-stone-600/50 shadow-xl">
        <div className="text-center pb-4 border-b border-stone-700">
          <div className="text-sm text-stone-400 mb-1">
            Your annual UPI spend
          </div>
          <div className="text-2xl font-bold">
            ₹{totalAnnualUPISpend.toLocaleString("en-IN")}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-rose-900/30 rounded-lg p-4 text-center border border-rose-800/50">
            <div className="text-xs text-stone-400 mb-1">MDR you pay per year</div>
            <div className="text-3xl font-bold text-rose-400">
              ₹{result.total.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
            </div>
            <div className="text-xs text-stone-500 mt-1">
              @ {mdrRate * 100}% rate
            </div>
          </div>

          <div className="bg-amber-900/30 rounded-lg p-4 text-center border border-amber-800/50">
            <div className="text-xs text-stone-400 mb-1">As % of your income</div>
            <div className="text-3xl font-bold text-amber-400">
              {mdrAsPctOfIncome.toFixed(3)}%
            </div>
            <div className="text-xs text-stone-500 mt-1">
              of ₹{income.toLocaleString("en-IN")}
            </div>
          </div>

          <div className="bg-emerald-900/30 rounded-lg p-4 text-center border border-emerald-800/50">
            <div className="text-xs text-stone-400 mb-1">Cost over 10 years</div>
            <div className="text-3xl font-bold text-emerald-400">
              ₹{cumulative10Years.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
            </div>
            <div className="text-xs text-stone-500 mt-1">
              assumes MDR rate stays flat
            </div>
          </div>
        </div>

        {/* Breakdown table */}
        {result.breakdown.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-stone-400 border-b border-stone-700">
                  <th className="text-left p-2">Category</th>
                  <th className="text-right p-2">Annual Spend</th>
                  <th className="text-right p-2">MDR Fee</th>
                  <th className="text-right p-2">Rate</th>
                </tr>
              </thead>
              <tbody>
                {result.breakdown.map((b) => (
                  <tr key={b.label} className="border-b border-stone-800 hover:bg-stone-800/50">
                    <td className="p-2">{b.label}</td>
                    <td className="text-right p-2">
                      ₹{b.annualSpend.toLocaleString("en-IN")}
                    </td>
                    <td className="text-right p-2 text-rose-400">
                      ₹{b.fee.toLocaleString("en-IN", { maximumFractionDigits: 1 })}
                    </td>
                    <td className="text-right p-2 text-stone-500">{b.feePct.toFixed(3)}%</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="font-bold text-stone-200">
                  <td className="p-2">Total</td>
                  <td className="text-right p-2">
                    ₹{result.breakdown.reduce((s, b) => s + b.annualSpend, 0).toLocaleString("en-IN")}
                  </td>
                  <td className="text-right p-2 text-rose-300">
                    ₹{result.total.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                  </td>
                  <td className="text-right p-2">{mdrRate * 100}%</td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}

        {/* Warning */}
        <div className="flex items-start gap-3 p-3 bg-amber-900/20 rounded-lg border border-amber-800/30">
          <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-amber-200">
            <strong>Worth noting:</strong> For a low-income household (₹1.2L/yr), MDR on even
            basic UPI spend could eat ~0.6–1% of annual income. For a wealthy household
            (₹60L/yr), that same percentage is <em>tiny</em> — making UPI fees a
            regressive tax on digital payments for the poor.
          </div>
        </div>
      </div>
    </div>
  );
}
