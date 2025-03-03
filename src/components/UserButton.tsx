
import React from 'react';
import { cn } from '@/lib/utils';

interface UserButtonProps {
  onClick: () => void;
}

const UserButton = ({ onClick }: UserButtonProps) => {
  return (
    <button 
      className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white"
      onClick={onClick}
    >
      <span className="text-lg font-semibold">N</span>
    </button>
  );
};

export default UserButton;
