import { useState } from "react";
import { Calculator, Swords, ChartBar, ScrollText, Phone, Share2, ChevronDown } from "lucide-react";
import IntroSection from "./components/IntroSection";
import TimelineSection from "./components/TimelineSection";
import BossFight from "./components/BossFight";
import MDRCalculator from "./components/MDRCalculator";
import ActionSection from "./components/ActSection";

type Tab = "calculator" | "boss-fight" | "timeline" | "act";

const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "calculator", label: "MDR Calculator", icon: Calculator },
  { id: "boss-fight", label: "Boss Fight", icon: Swords },
  { id: "timeline", label: "Timeline", icon: ScrollText },
  { id: "act", label: "Act Now", icon: Phone },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("calculator");

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100">
      {/* Hero */}
      <header className="relative border-b border-stone-800/60 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(220,38,38,0.08),transparent_50%)]" />
        <div className="relative max-w-5xl mx-auto px-4 pt-12 pb-6">
          <div className="flex items-center gap-2 text-red-400 text-sm font-medium mb-3">
            <ChartBar className="size-4" />
            <span>CashlessConsumer Investigation</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight text-balance">
            The UPI MDR{" "}
            <span className="text-red-400">Tax on You</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-stone-400 max-w-2xl">
            The government wants to reintroduce MDR on UPI — a fee on every digital payment you make.
            Use the tools below to see how much it will cost <em>you</em>, and what you can do about it.
          </p>
          <nav className="mt-8 flex gap-2 flex-wrap">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "bg-red-600 text-white shadow-lg shadow-red-600/20"
                      : "bg-stone-900 text-stone-300 hover:bg-stone-800 hover:text-stone-100"
                  }`}
                >
                  <Icon className="size-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {activeTab === "calculator" && (
          <>
            <IntroSection />
            <MDRCalculator />
          </>
        )}
        {activeTab === "boss-fight" && <BossFight />}
        {activeTab === "timeline" && <TimelineSection />}
        {activeTab === "act" && <ActionSection />}
      </main>

      <footer className="border-t border-stone-800/60 mt-16 py-8 text-center text-sm text-stone-600">
        <p>CashlessConsumer — Consumer advocacy in India's fintech era.</p>
        <p className="mt-1">Data sourced from RBI notifications, NPCI circulars, PIB releases, and parliamentary records.</p>
      </footer>
    </div>
  );
}
