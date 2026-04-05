export interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: string;
  type: 'income' | 'expense';
  description: string;
}

export interface FinancialMetrics {
  totalIncome: number;
  totalExpenses: number;
  totalBalance: number;
  savingsRate: number;
  healthScore: number;
  spendingByCategory: Array<{ name: string; value: number; percentage: number }>;
  incomeChange: number;
  expenseChange: number;
}

export function calculateFinancialMetrics(transactions: Transaction[]): FinancialMetrics {
  // Separate income and expenses
  const incomeTransactions = transactions.filter(t => t.type === 'income');
  const expenseTransactions = transactions.filter(t => t.type === 'expense');

  // Calculate totals
  const totalIncome = incomeTransactions.reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = expenseTransactions.reduce((sum, t) => sum + t.amount, 0);
  const totalBalance = totalIncome - totalExpenses;

  // Calculate spending by category
  const spendingByCategory = getSpendingByCategory(expenseTransactions);

  // Calculate savings rate (percentage of income saved)
  const savingsRate = totalIncome > 0 ? Math.round(((totalIncome - totalExpenses) / totalIncome) * 100) : 0;

  // Calculate health score (0-100)
  const healthScore = calculateHealthScore(savingsRate, totalBalance, totalExpenses);

  // Calculate month-over-month changes (comparing recent transactions)
  const { incomeChange, expenseChange } = calculateMonthlyChanges(transactions);

  return {
    totalIncome,
    totalExpenses,
    totalBalance,
    savingsRate,
    healthScore,
    spendingByCategory,
    incomeChange,
    expenseChange,
  };
}

function getSpendingByCategory(expenses: Transaction[]): Array<{ name: string; value: number; percentage: number }> {
  const categoryTotals: { [key: string]: number } = {};

  expenses.forEach(expense => {
    categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + expense.amount;
  });

  const totalSpending = Object.values(categoryTotals).reduce((sum, val) => sum + val, 0);

  return Object.entries(categoryTotals)
    .map(([name, value]) => ({
      name,
      value,
      percentage: totalSpending > 0 ? Math.round((value / totalSpending) * 100) : 0,
    }))
    .sort((a, b) => b.value - a.value);
}

function calculateHealthScore(savingsRate: number, balance: number, expenses: number): number {
  let score = 50; // Base score

  // Savings rate component (0-30 points)
  if (savingsRate >= 40) score += 30;
  else if (savingsRate >= 30) score += 25;
  else if (savingsRate >= 20) score += 20;
  else if (savingsRate >= 10) score += 15;
  else if (savingsRate >= 0) score += 10;
  else score -= 10; // Negative savings

  // Balance component (0-20 points)
  if (balance > expenses * 6) score += 20; // 6 months emergency fund
  else if (balance > expenses * 3) score += 15;
  else if (balance > expenses) score += 10;
  else if (balance > 0) score += 5;
  else score -= 20; // Debt situation

  // Cap score between 0-100
  return Math.min(Math.max(score, 0), 100);
}

function calculateMonthlyChanges(transactions: Transaction[]): { incomeChange: number; expenseChange: number } {
  if (transactions.length === 0) return { incomeChange: 0, expenseChange: 0 };

  // Simple calculation: assume first half vs second half
  const midpoint = Math.floor(transactions.length / 2);
  const recentTransactions = transactions.slice(0, midpoint);
  const olderTransactions = transactions.slice(midpoint);

  const recentIncome = recentTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const olderIncome = olderTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);

  const recentExpenses = recentTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const olderExpenses = olderTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);

  const incomeChange = olderIncome > 0 ? ((recentIncome - olderIncome) / olderIncome) * 100 : 0;
  const expenseChange = olderExpenses > 0 ? ((recentExpenses - olderExpenses) / olderExpenses) * 100 : 0;

  return {
    incomeChange: Math.round(incomeChange * 10) / 10,
    expenseChange: Math.round(expenseChange * 10) / 10,
  };
}
