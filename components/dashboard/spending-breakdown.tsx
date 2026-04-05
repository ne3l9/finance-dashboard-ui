'use client';

import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from '@/components/ui/card';

interface SpendingItem {
  name: string;
  value: number;
  percentage: number;
}

interface SpendingBreakdownProps {
  spendingData: SpendingItem[];
}

const COLORS = [
  'var(--color-destructive)',
  'var(--color-primary)',
  'var(--color-accent)',
  'var(--color-chart-2)',
  'var(--color-chart-3)',
  'var(--color-chart-5)',
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-2 shadow-lg">
        <p className="text-xs font-semibold text-foreground">{payload[0].payload.name}</p>
        <p className="text-xs text-muted-foreground">₹{payload[0].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

export default function SpendingBreakdown({ spendingData }: SpendingBreakdownProps) {
  const totalSpending = spendingData.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card className="bg-gradient-to-br from-card to-card/80 border border-border/50 p-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Spending Breakdown</h3>
          <p className="text-sm text-muted-foreground">By category</p>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={spendingData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
              >
                {spendingData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="space-y-2 border-t border-border pt-4">
          {spendingData.map((item, index) => (
            <div key={item.name} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></div>
                <span className="text-muted-foreground">{item.name}</span>
              </div>
              <span className="font-medium text-foreground">{item.percentage}%</span>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="bg-secondary/50 rounded-lg p-3 text-center border border-border/50">
          <p className="text-xs text-muted-foreground">Total Spending</p>
          <p className="text-xl font-bold text-foreground">₹{totalSpending.toLocaleString()}</p>
        </div>
      </div>
    </Card>
  );
}
