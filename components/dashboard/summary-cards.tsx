'use client';

import { ArrowUp, ArrowDown, Wallet } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';

interface SummaryCardsProps {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
  incomeChange: number;
  expenseChange: number;
}

export default function SummaryCards({
  totalBalance,
  totalIncome,
  totalExpenses,
  incomeChange,
  expenseChange,
}: SummaryCardsProps) {
  const summaryData = [
    {
      label: 'Total Balance',
      value: totalBalance,
      change: incomeChange > 0 ? incomeChange : expenseChange,
      icon: Wallet,
      color: 'from-primary to-accent',
    },
    {
      label: 'Total Income',
      value: totalIncome,
      change: incomeChange,
      icon: ArrowUp,
      color: 'from-success to-accent',
    },
    {
      label: 'Total Expenses',
      value: totalExpenses,
      change: expenseChange,
      icon: ArrowDown,
      color: 'from-destructive to-primary',
    },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
      {summaryData.map((item, index) => {
        const Icon = item.icon;
        return (
          <Card
            key={index}
            className="group relative overflow-hidden bg-gradient-to-br from-card to-card/80 border border-border/50 hover:border-border transition-all duration-300 hover:shadow-lg p-4 md:p-6 cursor-pointer"
          >
            {/* Background gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
            
            <div className="relative z-10 space-y-4">
              {/* Header with icon */}
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{item.label}</p>
                </div>
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center text-card-foreground`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              {/* Value */}
              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground tracking-tight">
                  {formatCurrency(item.value)}
                </h3>
                
                {/* Change indicator */}
                <div className="flex items-center gap-1">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    item.change >= 0
                      ? 'bg-success/20 text-success'
                      : 'bg-destructive/20 text-destructive'
                  }`}>
                    {item.change > 0 ? '+' : ''}{item.change}%
                  </span>
                  <span className="text-xs text-muted-foreground">from last month</span>
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
