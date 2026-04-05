'use client';

import { useState } from 'react';
import { Sun, Moon, Menu, X, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AccountPopup from './account-popup';

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  role: 'viewer' | 'admin';
  toggleRole: () => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

export default function Navbar({
  darkMode,
  toggleDarkMode,
  role,
  toggleRole,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}: NavbarProps) {
  const [isAccountPopupOpen, setIsAccountPopupOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border backdrop-blur-xl bg-opacity-80 dark:bg-opacity-80">
      <div className="px-4 md:px-8 py-4 flex items-center justify-between max-w-7xl mx-auto w-full">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-lg">
            ₹
          </div>
          <div className="hidden md:flex flex-col">
            <h1 className="text-lg font-bold text-foreground">Your's CA</h1>
            <p className="text-xs text-muted-foreground">Command Pallete For Finance</p>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>

        {/* Right Controls - Desktop */}
        <div className="hidden md:flex items-center gap-3">
          {/* Role Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleRole}
            className="gap-2 hover:bg-secondary"
          >
            <Users className="w-4 h-4" />
            <span className="text-sm font-medium">{role === 'viewer' ? 'Viewer' : 'Admin'}</span>
          </Button>

          {/* Divider */}
          <div className="h-6 w-px bg-border"></div>

          {/* Dark Mode Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleDarkMode}
            className="hover:bg-secondary"
          >
            {darkMode ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </Button>

          {/* User Avatar */}
          <div className="relative">
            <button
              onClick={() => setIsAccountPopupOpen(!isAccountPopupOpen)}
              className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xs font-bold text-primary-foreground cursor-pointer hover:shadow-lg transition-shadow"
            >
              PKM
            </button>
            <AccountPopup
              isOpen={isAccountPopupOpen}
              onClose={() => setIsAccountPopupOpen(false)}
              userName="Pratyush Kumar Mishra"
              userEmail="ineedthejob@needmoney.com"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
