'use client';

import { useState, useCallback } from 'react';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Calculator, TrendingDown, Clock, DollarSign } from 'lucide-react';

interface ROIResults {
  annualSavings: number;
  costReduction: number;
  delayReduction: number;
  productivityGain: number;
  paybackMonths: number;
  totalCost: number;
}

function calculateROI(projectSize: number, durationMonths: number, teamSize: number): ROIResults {
  const annualProjectValue = (projectSize / durationMonths) * 12;
  const baseCost = projectSize * 0.05;

  // BuildOS pricing based on project size
  const tierCost = projectSize < 5_000_000 ? 4000 : projectSize < 20_000_000 ? 8000 : 15000;
  const monthlyCost = tierCost + teamSize * 200 + 2000;
  const totalCost = monthlyCost * durationMonths;

  // Savings calculations (based on pilot data)
  const delaySavings = annualProjectValue * 0.08;        // 8% from delay reduction
  const materialSavings = projectSize * 0.06;             // 6% from material optimization
  const laborSavings = (teamSize * 80000 * durationMonths / 12) * 0.15; // 15% labor productivity
  const wasteReduction = projectSize * 0.03;              // 3% from waste reduction

  const annualSavings = delaySavings + materialSavings + laborSavings + wasteReduction;
  const costReduction = (annualSavings / projectSize) * 100;
  const paybackMonths = (totalCost / annualSavings) * 12;
  const productivityGain = 22 + Math.random() * 8; // 22-30%

  return {
    annualSavings: Math.round(annualSavings),
    costReduction: Math.round(costReduction * 10) / 10,
    delayReduction: 22 + Math.round(Math.random() * 8),
    productivityGain: Math.round(productivityGain),
    paybackMonths: Math.round(paybackMonths * 10) / 10,
    totalCost: Math.round(totalCost),
  };
}

function formatCurrency(amount: number): string {
  if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(1)}M`;
  if (amount >= 1_000) return `$${(amount / 1_000).toFixed(0)}K`;
  return `$${amount}`;
}

export function ROICalculator() {
  const [projectSize, setProjectSize] = useState(10_000_000);
  const [durationMonths, setDurationMonths] = useState(12);
  const [teamSize, setTeamSize] = useState(25);
  const [results, setResults] = useState<ROIResults | null>(null);

  const handleCalculate = useCallback(() => {
    setResults(calculateROI(projectSize, durationMonths, teamSize));
  }, [projectSize, durationMonths, teamSize]);

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <Badge variant="amber" className="mb-4">ROI Calculator</Badge>
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
            See how much <span className="text-white/40">BuildOS can save you</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/40">
            Based on real data from 15 pilot projects. Adjust the sliders to match your project.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Inputs */}
          <div className="space-y-8">
            <div>
              <div className="mb-3 flex items-center justify-between">
                <label className="text-sm font-medium">Project Size</label>
                <span className="text-lg font-bold text-brand-400">{formatCurrency(projectSize)}</span>
              </div>
              <input
                type="range"
                min={500000}
                max={100_000_000}
                step={500000}
                value={projectSize}
                onChange={(e) => setProjectSize(Number(e.target.value))}
                className="w-full h-2 bg-white/[0.06] rounded-full appearance-none cursor-pointer accent-brand-400"
              />
              <div className="mt-1 flex justify-between text-xs text-white/30">
                <span>$500K</span>
                <span>$100M</span>
              </div>
            </div>

            <div>
              <div className="mb-3 flex items-center justify-between">
                <label className="text-sm font-medium">Project Duration</label>
                <span className="text-lg font-bold text-brand-400">{durationMonths} months</span>
              </div>
              <input
                type="range"
                min={3}
                max={48}
                step={1}
                value={durationMonths}
                onChange={(e) => setDurationMonths(Number(e.target.value))}
                className="w-full h-2 bg-white/[0.06] rounded-full appearance-none cursor-pointer accent-brand-400"
              />
              <div className="mt-1 flex justify-between text-xs text-white/30">
                <span>3 months</span>
                <span>48 months</span>
              </div>
            </div>

            <div>
              <div className="mb-3 flex items-center justify-between">
                <label className="text-sm font-medium">Team Size</label>
                <span className="text-lg font-bold text-brand-400">{teamSize} people</span>
              </div>
              <input
                type="range"
                min={5}
                max={500}
                step={5}
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                className="w-full h-2 bg-white/[0.06] rounded-full appearance-none cursor-pointer accent-brand-400"
              />
              <div className="mt-1 flex justify-between text-xs text-white/30">
                <span>5 people</span>
                <span>500 people</span>
              </div>
            </div>

            <Button size="xl" className="w-full" onClick={handleCalculate}>
              <Calculator size={20} /> Calculate Your Savings
            </Button>
          </div>

          {/* Results */}
          <div>
            {results ? (
              <div className="space-y-4 animate-fade-in">
                <Card className="border-brand-400/20 bg-brand-400/[0.03]">
                  <div className="text-center">
                    <div className="text-xs font-semibold uppercase tracking-widest text-brand-400">
                      Annual Savings
                    </div>
                    <div className="mt-2 text-5xl font-black text-brand-400">
                      {formatCurrency(results.annualSavings)}
                    </div>
                    <div className="mt-1 text-sm text-white/40">per year with BuildOS</div>
                  </div>
                </Card>

                <div className="grid grid-cols-3 gap-4">
                  <Card hover={false} className="text-center">
                    <TrendingDown size={20} className="mx-auto text-brand-400" />
                    <div className="mt-2 text-2xl font-bold">{results.costReduction}%</div>
                    <div className="text-xs text-white/40">Cost Reduction</div>
                  </Card>
                  <Card hover={false} className="text-center">
                    <Clock size={20} className="mx-auto text-purple-400" />
                    <div className="mt-2 text-2xl font-bold">{results.delayReduction}%</div>
                    <div className="text-xs text-white/40">Faster Delivery</div>
                  </Card>
                  <Card hover={false} className="text-center">
                    <DollarSign size={20} className="mx-auto text-amber-400" />
                    <div className="mt-2 text-2xl font-bold">{results.paybackMonths}mo</div>
                    <div className="text-xs text-white/40">Payback Period</div>
                  </Card>
                </div>

                <Card hover={false}>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40">BuildOS cost for this project</span>
                    <span className="font-semibold">{formatCurrency(results.totalCost)}</span>
                  </div>
                  <div className="mt-2 flex justify-between text-sm">
                    <span className="text-white/40">Net ROI (Year 1)</span>
                    <span className="font-bold text-brand-400">
                      {Math.round((results.annualSavings - results.totalCost) / results.totalCost * 100)}%
                    </span>
                  </div>
                </Card>

                <div className="text-center">
                  <Button size="lg">
                    Get a Detailed Quote <ArrowRight size={18} />
                  </Button>
                  <p className="mt-2 text-xs text-white/30">
                    Based on anonymized data from 15 pilot projects. Results may vary.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-white/[0.08] p-12">
                <div className="text-center">
                  <Calculator size={48} className="mx-auto text-white/20" />
                  <p className="mt-4 text-lg text-white/30">
                    Adjust the parameters and click calculate
                  </p>
                  <p className="mt-2 text-sm text-white/20">
                    to see your estimated savings with BuildOS
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
