import { Sun, Moon, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MobileMenuProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  role: 'viewer' | 'admin';
  toggleRole: () => void;
}

export default function MobileMenu({
  darkMode,
  toggleDarkMode,
  role,
  toggleRole,
}: MobileMenuProps) {
  return (
    <div className="md:hidden fixed top-16 left-0 right-0 bg-card border-b border-border p-4 space-y-2 z-40">
      <Button
        variant="ghost"
        className="w-full justify-start gap-2 hover:bg-secondary"
        onClick={toggleRole}
      >
        <Users className="w-4 h-4" />
        <span className="text-sm font-medium">{role === 'viewer' ? 'Viewer Mode' : 'Admin Mode'}</span>
      </Button>
      
      <Button
        variant="ghost"
        className="w-full justify-start gap-2 hover:bg-secondary"
        onClick={toggleDarkMode}
      >
        {darkMode ? (
          <Sun className="w-4 h-4" />
        ) : (
          <Moon className="w-4 h-4" />
        )}
        <span className="text-sm font-medium">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
      </Button>
    </div>
  );
}
