'use client';

import { useState, useEffect } from 'react';
import { Menu, Sun, Moon, LogOut, Users, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/dashboard/navbar';
import DashboardGrid from '@/components/dashboard/dashboard-grid';
import MobileMenu from '@/components/dashboard/mobile-menu';

export default function Dashboard() {
  const [darkMode, setDarkMode] = useState(true);
  const [role, setRole] = useState<'viewer' | 'admin'>('viewer');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isDark = document.documentElement.classList.contains('dark');
    setDarkMode(isDark);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const toggleRole = () => {
    setRole(role === 'viewer' ? 'admin' : 'viewer');
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        <Navbar 
          darkMode={darkMode} 
          toggleDarkMode={toggleDarkMode}
          role={role}
          toggleRole={toggleRole}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
        
        <div className="relative">
          {isMobileMenuOpen && (
            <MobileMenu 
              darkMode={darkMode}
              toggleDarkMode={toggleDarkMode}
              role={role}
              toggleRole={toggleRole}
            />
          )}
          
          <main className="pt-20 lg:pt-0 md:pt-20">
            <DashboardGrid role={role} />
          </main>
        </div>
    </div>
  );
}
