'use client';

import { Card } from '@/components/ui/card';
import { AlertCircle, CheckCircle2, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FinancialHealthScoreProps {
  healthScore: number;
  savingsRate: number;
  totalBalance: number;
  totalExpenses: number;
}

const getHealthStatus = (score: number) => {
  if (score >= 70) return { label: 'Healthy', color: 'text-success', bg: 'bg-success/20', icon: CheckCircle2 };
  if (score >= 50) return { label: 'Moderate', color: 'text-accent', bg: 'bg-accent/20', icon: TrendingUp };
  return { label: 'Risky', color: 'text-destructive', bg: 'bg-destructive/20', icon: AlertCircle };
};

export default function FinancialHealthScore({
  healthScore,
  savingsRate,
  totalBalance,
  totalExpenses,
}: FinancialHealthScoreProps) {
  const status = getHealthStatus(healthScore);
  const StatusIcon = status.icon;
  
  // Calculate debt ratio (lower is better)
  const debtRatio = totalExpenses > 0 ? Math.min((totalExpenses / totalBalance) * 100, 100) : 0;
  return (
    <Card className="bg-gradient-to-br from-card to-card/80 border border-border/50 p-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Financial Health</h3>
          <p className="text-sm text-muted-foreground">Overall score</p>
        </div>

        {/* Circular Score */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-32 h-32 flex items-center justify-center">
            {/* Background circle */}
            <svg className="absolute w-full h-full" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="var(--color-border)"
                strokeWidth="3"
              />
              {/* Progress circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeDasharray={`${(healthScore / 100) * 283} 283`}
                strokeLinecap="round"
                className={status.color}
                style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
              />
            </svg>

            {/* Center text */}
            <div className="text-center">
              <p className="text-3xl font-bold text-foreground">{healthScore}</p>
              <p className="text-xs text-muted-foreground">/ 100</p>
            </div>
          </div>

          {/* Status badge */}
          <div className={cn('px-4 py-2 rounded-lg flex items-center gap-2', status.bg)}>
            <StatusIcon className={cn('w-4 h-4', status.color)} />
            <span className={cn('font-semibold text-sm', status.color)}>{status.label}</span>
          </div>
        </div>

        {/* Metrics */}
        <div className="space-y-3 border-t border-border pt-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Savings Rate</span>
            <span className="font-semibold text-foreground">{savingsRate}%</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <div
              className="bg-success rounded-full h-2 transition-all duration-500"
              style={{ width: `${Math.min(savingsRate, 100)}%` }}
            ></div>
          </div>

          <div className="flex justify-between items-center pt-2">
            <span className="text-sm text-muted-foreground">Expense Ratio</span>
            <span className="font-semibold text-foreground">{Math.round(debtRatio)}%</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <div
              className="bg-destructive rounded-full h-2 transition-all duration-500"
              style={{ width: `${Math.round(debtRatio)}%` }}
            ></div>
          </div>
        </div>

        {/* Recommendation */}
        <div className="bg-primary/10 border border-primary/30 rounded-lg p-3">
          <p className="text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">💡 Tip: </span>
            Maintain your savings rate and reduce discretionary spending to reach excellent health.
          </p>
        </div>
      </div>
    </Card>
  );
}
