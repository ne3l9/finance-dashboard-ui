'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Card } from '@/components/ui/card';
import type { Transaction } from '@/lib/financial-calculator';

interface BalanceTrendChartProps {
  transactions: Transaction[];
}

function generateChartData(transactions: Transaction[]) {
  // Group transactions by unique dates and calculate running balance
  const uniqueDates = [...new Set(transactions.map(t => t.date))].reverse();
  
  let runningBalance = 0;
  const monthlyData: Array<{ month: string; balance: number; income: number; expense: number }> = [];

  uniqueDates.forEach(date => {
    const dateTransactions = transactions.filter(t => t.date === date);
    const income = dateTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const expense = dateTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    
    runningBalance += income - expense;
    monthlyData.push({
      month: date,
      balance: runningBalance,
      income,
      expense,
    });
  });

  return monthlyData.length > 0 ? monthlyData : [{ month: 'No data', balance: 0, income: 0, expense: 0 }];
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
        <p className="text-sm font-semibold text-foreground">{payload[0].payload.month}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-xs" style={{ color: entry.color }}>
            {entry.name}: ₹{(entry.value / 1000).toFixed(0)}K
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function BalanceTrendChart({ transactions }: BalanceTrendChartProps) {
  const chartData = generateChartData(transactions);

  return (
    <Card className="bg-gradient-to-br from-card to-card/80 border border-border/50 p-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Balance Trend</h3>
          <p className="text-sm text-muted-foreground">{chartData.length} transactions tracked</p>
        </div>

        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <defs>
                <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis
                dataKey="month"
                stroke="var(--color-muted-foreground)"
                style={{ fontSize: '12px' }}
              />
              <YAxis
                stroke="var(--color-muted-foreground)"
                style={{ fontSize: '12px' }}
                tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ fontSize: '12px' }}
                iconType="line"
              />
              <Line
                type="monotone"
                dataKey="balance"
                stroke="var(--color-primary)"
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 6 }}
                name="Balance"
              />
              <Line
                type="monotone"
                dataKey="income"
                stroke="var(--color-success)"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
                name="Income"
              />
              <Line
                type="monotone"
                dataKey="expense"
                stroke="var(--color-destructive)"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
                name="Expense"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
}
