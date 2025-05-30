import React, { useState } from 'react';
import { Search, Bell, User, Plus } from 'lucide-react';
import Button from '../ui/Button';

interface HeaderProps {
  onCreateTask: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCreateTask }) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm sticky top-0 z-10 transition-colors duration-200">
      <div className="px-4 py-3 flex items-center justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-200"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center ml-4 space-x-2">
          <Button 
            variant="primary" 
            size="sm" 
            className="hidden sm:inline-flex"
            onClick={onCreateTask}
          >
            <Plus size={16} className="mr-1" />
            New Task
          </Button>
          <Button 
            variant="primary" 
            size="sm" 
            className="sm:hidden"
            onClick={onCreateTask}
          >
            <Plus size={16} />
          </Button>
          <button className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <Bell size={20} />
          </button>
          <button className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <User size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;