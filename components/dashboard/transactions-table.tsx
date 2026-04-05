'use client';

import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Edit2, Trash2, Plus } from 'lucide-react';
import { formatCurrency, cn } from '@/lib/utils';
import AddTransactionModal from './add-transaction-modal';
import type { Transaction } from '@/lib/financial-calculator';

const categories = ['All', 'Salary', 'Food', 'Utilities', 'Investment', 'Entertainment', 'Healthcare', 'Transport'];

interface TransactionsTableProps {
  role: 'viewer' | 'admin';
  transactions: Transaction[];
  onAddTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  onDeleteTransaction: (id: string) => void;
}

export default function TransactionsTable({ 
  role, 
  transactions,
  onAddTransaction,
  onDeleteTransaction,
}: TransactionsTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'date' | 'amount'>('date');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((t) => {
        const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || t.category === selectedCategory;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (sortBy === 'date') {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
        return b.amount - a.amount;
      });
  }, [transactions, searchTerm, selectedCategory, sortBy]);

  return (
    <Card className="bg-gradient-to-br from-card to-card/80 border border-border/50 p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Recent Transactions</h3>
            <p className="text-sm text-muted-foreground">{filteredTransactions.length} transactions</p>
          </div>
          {role === 'admin' && (
            <Button 
              onClick={() => setIsModalOpen(true)}
              className="gap-2 bg-primary hover:bg-primary/90"
            >
              <Plus className="w-4 h-4" />
              Add Transaction
            </Button>
          )}
      </div>
        {/* Modal */}
        <AddTransactionModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAdd={(newTransaction) => {
            onAddTransaction(newTransaction);
            setIsModalOpen(false);
          }}
        />

        {/* Search and Filter */}
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
              className="pl-10 bg-secondary border-border focus:ring-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-medium transition-colors duration-200',
                  selectedCategory === cat
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort Buttons */}
          <div className="flex gap-2">
            <Button
              variant={sortBy === 'date' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSortBy('date')}
              className={sortBy === 'date' ? 'bg-primary' : ''}
            >
              Date
            </Button>
            <Button
              variant={sortBy === 'amount' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSortBy('amount')}
              className={sortBy === 'amount' ? 'bg-primary' : ''}
            >
              Amount
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <div className="min-w-full divide-y divide-border">
            {/* Header Row */}
            <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-3 bg-secondary/50 rounded-lg font-medium text-xs text-muted-foreground">
              <div className="col-span-3">Description</div>
              <div className="col-span-2">Date</div>
              <div className="col-span-2">Category</div>
              <div className="col-span-2">Type</div>
              <div className="col-span-2 text-right">Amount</div>
              {role === 'admin' && <div className="col-span-1 text-right">Actions</div>}
            </div>

            {/* Transaction Rows */}
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 px-4 py-4 md:py-3 items-center border-b border-border/50 hover:bg-secondary/30 transition-colors duration-200 group"
                >
                  {/* Mobile view */}
                  <div className="md:hidden col-span-1 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-foreground">{transaction.description}</p>
                        <p className="text-xs text-muted-foreground">{transaction.date}</p>
                      </div>
                      <span className={cn(
                        'text-sm font-semibold',
                        transaction.type === 'income' ? 'text-success' : 'text-destructive'
                      )}>
                        {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs px-2 py-1 rounded-full bg-secondary text-muted-foreground">
                        {transaction.category}
                      </span>
                      {role === 'admin' && (
                        <div className="flex gap-2">
                          <button className="p-1 hover:bg-secondary rounded transition-colors">
                            <Edit2 className="w-3 h-3 text-muted-foreground" />
                          </button>
                          <button 
                            onClick={() => onDeleteTransaction(transaction.id)}
                            className="p-1 hover:bg-secondary rounded transition-colors"
                          >
                            <Trash2 className="w-3 h-3 text-destructive" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Desktop view */}
                  <div className="hidden md:col-span-3 md:flex md:flex-col">
                    <p className="font-medium text-foreground">{transaction.description}</p>
                  </div>
                  <div className="hidden md:col-span-2 md:flex md:flex-col">
                    <p className="text-sm text-muted-foreground">{transaction.date}</p>
                  </div>
                  <div className="hidden md:col-span-2 md:flex md:flex-col">
                    <span className="text-xs px-3 py-1 rounded-full bg-secondary text-muted-foreground w-fit">
                      {transaction.category}
                    </span>
                  </div>
                  <div className="hidden md:col-span-2 md:flex md:flex-col">
                    <span className={cn(
                      'text-xs font-semibold px-3 py-1 rounded-full w-fit',
                      transaction.type === 'income'
                        ? 'bg-success/20 text-success'
                        : 'bg-destructive/20 text-destructive'
                    )}>
                      {transaction.type === 'income' ? 'Income' : 'Expense'}
                    </span>
                  </div>
                  <div className="hidden md:col-span-2 md:flex md:flex-col md:text-right">
                    <span className={cn(
                      'font-semibold',
                      transaction.type === 'income' ? 'text-success' : 'text-destructive'
                    )}>
                      {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                    </span>
                  </div>
                  {role === 'admin' && (
                    <div className="hidden md:col-span-1 md:flex md:justify-end md:gap-2 md:opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1 hover:bg-secondary rounded transition-colors">
                        <Edit2 className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                      </button>
                      <button 
                        onClick={() => onDeleteTransaction(transaction.id)}
                        className="p-1 hover:bg-destructive/20 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="py-8 text-center">
                <p className="text-muted-foreground">No transactions found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

