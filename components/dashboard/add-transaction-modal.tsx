'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (transaction: { description: string; amount: number; category: string; type: 'income' | 'expense'; date: string }) => void;
}

const categories = ['Salary', 'Food', 'Utilities', 'Investment', 'Entertainment', 'Healthcare', 'Transport'];

export default function AddTransactionModal({ isOpen, onClose, onAdd }: AddTransactionModalProps) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount) {
      alert('Please fill in all fields');
      return;
    }
    
    onAdd({
      description,
      amount: parseFloat(amount),
      category,
      type,
      date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    });

    // Reset form
    setDescription('');
    setAmount('');
    setCategory('Food');
    setType('expense');
    setDate(new Date().toISOString().split('T')[0]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <Card className="w-full max-w-md bg-card border border-border p-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground">Add Transaction</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-secondary rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Description</label>
            <Input
              type="text"
              placeholder="Enter transaction description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-secondary border-border focus:ring-primary"
            />
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Amount</label>
            <Input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-secondary border-border focus:ring-primary"
            />
          </div>

          {/* Type Toggle */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Type</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setType('expense')}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                  type === 'expense'
                    ? 'bg-destructive text-destructive-foreground'
                    : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
                }`}
              >
                Expense
              </button>
              <button
                type="button"
                onClick={() => setType('income')}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                  type === 'income'
                    ? 'bg-success text-white'
                    : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
                }`}
              >
                Income
              </button>
            </div>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Date</label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-secondary border-border focus:ring-primary"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              Add Transaction
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
