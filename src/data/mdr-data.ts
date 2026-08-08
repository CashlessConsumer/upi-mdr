export const mccCategories = [
  { code: "5411", name: "Grocery & Supermarkets", typicalMonthly: 8000, typicalAnnual: 96000 },
  { code: "5812", name: "Restaurants & Dining", typicalMonthly: 4000, typicalAnnual: 48000 },
  { code: "5814", name: "Fast Food", typicalMonthly: 2000, typicalAnnual: 24000 },
  { code: "5651", name: "Clothing & Apparel", typicalMonthly: 3000, typicalAnnual: 36000 },
  { code: "5311", name: "Department Stores", typicalMonthly: 2000, typicalAnnual: 24000 },
  { code: "5412", name: "Pharmacies & Medical", typicalMonthly: 1500, typicalAnnual: 18000 },
  { code: "4814", name: "Telecom (Mobile Recharge)", typicalMonthly: 500, typicalAnnual: 6000 },
  { code: "4900", name: "Utilities (Electricity, Water)", typicalMonthly: 2000, typicalAnnual: 24000 },
  { code: "5541", name: "Fuel / Petrol Pumps", typicalMonthly: 3000, typicalAnnual: 36000 },
  { code: "4131", name: "Bus / Metro / Transit", typicalMonthly: 1000, typicalAnnual: 12000 },
  { code: "4112", name: "Railways (Train Tickets)", typicalMonthly: 1500, typicalAnnual: 18000 },
  { code: "4511", name: "Airline / Flight Tickets", typicalMonthly: 5000, typicalAnnual: 60000 },
  { code: "4722", name: "Travel Agencies & Tours", typicalMonthly: 2000, typicalAnnual: 24000 },
  { code: "5946", name: "Books & Stationery", typicalMonthly: 1000, typicalAnnual: 12000 },
  { code: "5732", name: "Electronics & Appliances", typicalMonthly: 3000, typicalAnnual: 36000 },
  { code: "5999", name: "Other General Merchandise", typicalMonthly: 2000, typicalAnnual: 24000 },
];

export const incomeBrackets = [
  { label: "₹1.2 Lakh/year (₹10K/mo — poor)", annual: 120000 },
  { label: "₹3.0 Lakh/year (₹25K/mo — lower middle)", annual: 300000 },
  { label: "₹6.0 Lakh/year (₹50K/mo — middle)", annual: 600000 },
  { label: "₹12 Lakh/year (₹1L/mo — upper middle)", annual: 1200000 },
  { label: "₹24 Lakh/year (₹2L/mo — rich)", annual: 2400000 },
  { label: "₹60 Lakh/year (₹5L/mo — wealthy)", annual: 6000000 },
];

export const mdrRate = 0.0011; // 0.11% per transaction

export function calculateMdr(annualSpend: number, mdrRate: number = 0.0011): number {
  return annualSpend * mdrRate;
}

export function calculateMdrByCategory(categories: { annualSpend: number; label: string }[]): {
  total: number;
  breakdown: { label: string; annualSpend: number; fee: number; feePct: number }[];
} {
  const breakdown = categories.map(c => ({
    label: c.label,
    annualSpend: c.annualSpend,
    fee: c.annualSpend * mdrRate,
    feePct: mdrRate * 100,
  }));
  const total = breakdown.reduce((s, b) => s + b.fee, 0);
  return { total, breakdown };
}

// Assumptions based on NPCI data: 88% of txns under ₹200
export const transactionSizes = [
  { label: "Under ₹200 (88% of all UPI txns)", typical: 100, weight: 0.88 },
  { label: "₹200–₹2,000 (10%)", typical: 600, weight: 0.10 },
  { label: "Above ₹2,000 (2%)", typical: 5000, weight: 0.02 },
];
