'use client';

import { Card } from '@/components/ui/card';
import { Lightbulb, TrendingDown, Target, AlertTriangle, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Transaction, FinancialMetrics } from '@/lib/financial-calculator';

interface Insight {
  id: string;
  title: string;
  description: string;
  type: 'positive' | 'warning' | 'neutral';
  icon: React.ComponentType<{ className: string }>;
}

interface InsightsPanelProps {
  transactions: Transaction[];
  metrics: FinancialMetrics;
}

function generateInsights(transactions: Transaction[], metrics: FinancialMetrics): Insight[] {
  const insights: Insight[] = [];

  // Check top spending category
  if (metrics.spendingByCategory.length > 0) {
    const topCategory = metrics.spendingByCategory[0];
    if (topCategory.percentage > 25) {
      insights.push({
        id: '1',
        title: `${topCategory.name} Spending High`,
        description: `${topCategory.percentage}% of spending is on ${topCategory.name.toLowerCase()} — consider optimizing`,
        type: 'warning',
        icon: AlertTriangle,
      });
    }
  }

  // Check expense trend
  if (metrics.expenseChange > 15) {
    insights.push({
      id: '2',
      title: 'Expenses Trending Up',
      description: `Monthly expenses increased by ${Math.abs(metrics.expenseChange).toFixed(1)}% compared to previous period`,
      type: 'warning',
      icon: TrendingDown,
    });
  } else if (metrics.expenseChange < -10) {
    insights.push({
      id: '2',
      title: 'Great Expense Control',
      description: `Expenses decreased by ${Math.abs(metrics.expenseChange).toFixed(1)}% — keep up the good work!`,
      type: 'positive',
      icon: TrendingUp,
    });
  }

  // Savings potential
  const potentialSavings = Math.round(metrics.totalExpenses * 0.15); // 15% optimization potential
  if (potentialSavings > 0) {
    insights.push({
      id: '3',
      title: 'Savings Opportunity',
      description: `Potential savings: ₹${potentialSavings.toLocaleString()} by optimizing top spending categories`,
      type: 'positive',
      icon: Target,
    });
  }

  // Health score insight
  if (metrics.healthScore < 50) {
    insights.push({
      id: '4',
      title: 'Improve Financial Health',
      description: 'Focus on increasing savings rate and reducing discretionary spending to improve your score',
      type: 'warning',
      icon: AlertTriangle,
    });
  }

  return insights.slice(0, 3); // Return top 3 insights
}

export default function InsightsPanel({ transactions, metrics }: InsightsPanelProps) {
  const insights = generateInsights(transactions, metrics);
  return (
    <Card className="bg-gradient-to-br from-card to-card/80 border border-border/50 p-6">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-accent" />
          <h3 className="text-lg font-semibold text-foreground">Smart Insights</h3>
        </div>

        <div className="space-y-3">
          {insights.map((insight) => {
            const Icon = insight.icon;
            return (
              <div
                key={insight.id}
                className={cn(
                  'p-3 rounded-lg border transition-all duration-200 hover:shadow-md',
                  insight.type === 'warning'
                    ? 'bg-destructive/10 border-destructive/30 hover:bg-destructive/15'
                    : insight.type === 'positive'
                    ? 'bg-success/10 border-success/30 hover:bg-success/15'
                    : 'bg-primary/10 border-primary/30 hover:bg-primary/15'
                )}
              >
                <div className="flex gap-3">
                  <div className="flex-shrink-0 pt-0.5">
                    <Icon
                      className={cn(
                        'w-4 h-4',
                        insight.type === 'warning'
                          ? 'text-destructive'
                          : insight.type === 'positive'
                          ? 'text-success'
                          : 'text-accent'
                      )}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-foreground">{insight.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-snug">
                      {insight.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Info footer */}
        <div className="text-center border-t border-border pt-4">
          <p className="text-xs text-muted-foreground">Updated today</p>
        </div>
      </div>
    </Card>
  );
}
