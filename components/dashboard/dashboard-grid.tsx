'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import BalanceTrendChart from './balance-trend-chart';
import TransactionsTable from './transactions-table';
import SummaryCards from './summary-cards';
import SpendingBreakdown from './spending-breakdown';
import FinancialHealthScore from './financial-health-score';
import InsightsPanel from './insights-panel';
import { calculateFinancialMetrics } from '@/lib/financial-calculator';
import type { Transaction } from '@/lib/financial-calculator';

interface DashboardGridProps {
  role: 'viewer' | 'admin';
}

// Initial mock transactions
const mockTransactions: Transaction[] = [
  { id: '1', date: 'Dec 12', amount: 5200, category: 'Salary', type: 'income', description: 'Monthly salary' },
  { id: '2', date: 'Dec 11', amount: 240, category: 'Food', type: 'expense', description: 'Groceries' },
  { id: '3', date: 'Dec 10', amount: 1200, category: 'Utilities', type: 'expense', description: 'Electricity bill' },
  { id: '4', date: 'Dec 9', amount: 3500, category: 'Investment', type: 'income', description: 'Stock dividend' },
  { id: '5', date: 'Dec 8', amount: 450, category: 'Entertainment', type: 'expense', description: 'Movie tickets' },
  { id: '6', date: 'Dec 7', amount: 800, category: 'Food', type: 'expense', description: 'Restaurant' },
  { id: '7', date: 'Dec 6', amount: 2000, category: 'Healthcare', type: 'expense', description: 'Doctor visit' },
  { id: '8', date: 'Dec 5', amount: 1500, category: 'Transport', type: 'expense', description: 'Fuel' },
  { id: '9', date: 'Dec 4', amount: 4200, category: 'Salary', type: 'income', description: 'Bonus' },
  { id: '10', date: 'Dec 3', amount: 350, category: 'Entertainment', type: 'expense', description: 'Concert tickets' },
  { id: '11', date: 'Dec 2', amount: 1100, category: 'Utilities', type: 'expense', description: 'Internet bill' },
  { id: '12', date: 'Dec 1', amount: 5500, category: 'Salary', type: 'income', description: 'Monthly salary' },
];

export default function DashboardGrid({ role }: DashboardGridProps) {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [expandedSections, setExpandedSections] = useState({
    chart: true,
    transactions: true,
    insights: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Calculate metrics from transactions
  const metrics = calculateFinancialMetrics(transactions);

  const handleAddTransaction = (newTransaction: Omit<Transaction, 'id'>) => {
    const transaction: Transaction = {
      ...newTransaction,
      id: Date.now().toString(),
    };
    setTransactions([transaction, ...transactions]);
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/5">
      <div className="px-3 md:px-6 lg:px-8 py-6 md:py-8 max-w-7xl mx-auto space-y-4 md:space-y-6">
        {/* Header */}
        <div className="space-y-1 md:space-y-2 px-2">
          <h2 className="text-2xl md:text-4xl font-bold text-foreground"></h2>
          <p className="text-sm md:text-base text-muted-foreground"></p>
        </div>

        {/* Top Row - Summary Cards */}
        <SummaryCards 
          totalBalance={metrics.totalBalance}
          totalIncome={metrics.totalIncome}
          totalExpenses={metrics.totalExpenses}
          incomeChange={metrics.incomeChange}
          expenseChange={metrics.expenseChange}
        />

        {/* Main Content Grid - Responsive */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Left Section - Transactions & Chart */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            {/* Balance Trend Chart - Collapsible on Mobile */}
            <div className="bg-card rounded-lg border border-border overflow-hidden">
              <button
                onClick={() => toggleSection('chart')}
                className="md:hidden w-full px-4 py-3 flex items-center justify-between bg-secondary/50 hover:bg-secondary transition-colors"
              >
                <h3 className="font-semibold text-foreground">Balance Trend</h3>
                <ChevronDown 
                  className={`w-5 h-5 transition-transform ${expandedSections.chart ? '' : '-rotate-90'}`}
                />
              </button>
              {(expandedSections.chart) && (
                <div className="p-4 md:p-6">
                  <BalanceTrendChart transactions={transactions} />
                </div>
              )}
            </div>

            {/* Transactions Table - Collapsible on Mobile */}
            <div>
              <button
                onClick={() => toggleSection('transactions')}
                className="md:hidden w-full px-4 py-3 flex items-center justify-between bg-secondary/50 hover:bg-secondary rounded-t-lg transition-colors border border-b-0 border-border"
              >
                <h3 className="font-semibold text-foreground">Transactions</h3>
                <ChevronDown 
                  className={`w-5 h-5 transition-transform ${expandedSections.transactions ? '' : '-rotate-90'}`}
                />
              </button>
              {(expandedSections.transactions) && (
                <TransactionsTable 
                  role={role} 
                  transactions={transactions}
                  onAddTransaction={handleAddTransaction}
                  onDeleteTransaction={handleDeleteTransaction}
                />
              )}
            </div>
          </div>

          {/* Right Section - Sidebar (Collapsible on Mobile) */}
          <div className="space-y-4 md:space-y-6">
            {/* Spending Breakdown */}
            <SpendingBreakdown spendingData={metrics.spendingByCategory} />

            {/* Financial Health Score */}
            <FinancialHealthScore 
              healthScore={metrics.healthScore}
              savingsRate={metrics.savingsRate}
              totalBalance={metrics.totalBalance}
              totalExpenses={metrics.totalExpenses}
            />

            {/* Insights Panel - Collapsible on Mobile */}
            <div className="bg-card rounded-lg border border-border overflow-hidden">
              <button
                onClick={() => toggleSection('insights')}
                className="md:hidden w-full px-4 py-3 flex items-center justify-between bg-secondary/50 hover:bg-secondary transition-colors"
              >
                <h3 className="font-semibold text-foreground">Insights</h3>
                <ChevronDown 
                  className={`w-5 h-5 transition-transform ${expandedSections.insights ? '' : '-rotate-90'}`}
                />
              </button>
              {(expandedSections.insights) && (
                <div className="p-4 md:p-6">
                  <InsightsPanel 
                    transactions={transactions}
                    metrics={metrics}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
