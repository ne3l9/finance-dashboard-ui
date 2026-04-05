'use client';

import { useState, useRef, useEffect } from 'react';
import { User, Settings, LogOut, CreditCard, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AccountPopupProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  userEmail: string;
}

export default function AccountPopup({
  isOpen,
  onClose,
  userName,
  userEmail,
}: AccountPopupProps) {
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={popupRef}
      className="absolute top-full right-0 mt-2 w-72 bg-card border border-border rounded-lg shadow-xl z-50 overflow-hidden"
    >
      {/* Header with User Info */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 px-4 py-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xs font-bold text-primary-foreground">
            {userName
              .split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground truncate">{userName}</p>
            <p className="text-xs text-muted-foreground truncate">{userEmail}</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="py-2">
        {/* Profile */}
        <button className="w-full px-4 py-3 flex items-center gap-3 hover:bg-secondary transition-colors text-foreground hover:text-primary">
          <User className="w-4 h-4 flex-shrink-0" />
          <div className="text-left flex-1">
            <p className="text-sm font-medium">My Profile</p>
            <p className="text-xs text-muted-foreground">View and edit profile</p>
          </div>
        </button>

        {/* Notifications */}
        <button className="w-full px-4 py-3 flex items-center gap-3 hover:bg-secondary transition-colors text-foreground hover:text-primary">
          <Bell className="w-4 h-4 flex-shrink-0" />
          <div className="text-left flex-1">
            <p className="text-sm font-medium">Notifications</p>
            <p className="text-xs text-muted-foreground">2 unread alerts</p>
          </div>
        </button>

        {/* Billing */}
        <button className="w-full px-4 py-3 flex items-center gap-3 hover:bg-secondary transition-colors text-foreground hover:text-primary">
          <CreditCard className="w-4 h-4 flex-shrink-0" />
          <div className="text-left flex-1">
            <p className="text-sm font-medium">Billing</p>
            <p className="text-xs text-muted-foreground">Manage subscription</p>
          </div>
        </button>

        {/* Settings */}
        <button className="w-full px-4 py-3 flex items-center gap-3 hover:bg-secondary transition-colors text-foreground hover:text-primary">
          <Settings className="w-4 h-4 flex-shrink-0" />
          <div className="text-left flex-1">
            <p className="text-sm font-medium">Settings</p>
            <p className="text-xs text-muted-foreground">Account preferences</p>
          </div>
        </button>
      </div>

      {/* Divider */}
      <div className="h-px bg-border"></div>

      {/* Logout */}
      <div className="p-2">
        <button className="w-full px-4 py-3 flex items-center gap-3 hover:bg-destructive/10 transition-colors text-destructive rounded hover:text-destructive">
          <LogOut className="w-4 h-4 flex-shrink-0" />
          <span className="text-sm font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  );
}
