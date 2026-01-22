import React from 'react';
import { CodeIcon } from '@radix-ui/react-icons';
import { ThemeToggle } from '@/components/theme-toggle';

const NavBar = () => {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between rounded-2xl bg-white/0 p-4 shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[4.4px]">
      <CodeIcon className="h-7 w-7 transition hover:scale-110" />
      <ThemeToggle />
    </nav>
  );
};

export default NavBar;
