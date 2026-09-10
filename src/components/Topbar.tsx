'use client';

import { useState, useRef, useEffect } from 'react';
const { Search, Bell, Settings, Home, Users, Heart, DollarSign } = require('lucide-react');
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/lib/auth';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Topbar() {
  const { logout } = useAuth();
  const pathname = usePathname();
  const [searchValue, setSearchValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Search suggestions
  const suggestions = ['maggie', 'lena', 'philip'];

  // Filter suggestions based on search input
  const filteredSuggestions = suggestions.filter(suggestion =>
    suggestion.toLowerCase().includes(searchValue.toLowerCase())
  );

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    setShowSuggestions(value.length > 0);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchValue(suggestion);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const navItems = [
    { href: '/', label: 'Feed', icon: Home },
    { href: '/messages', label: 'Messages', icon: Users },
    { href: '/profile', label: 'Profile', icon: Heart },
    { href: '/donations', label: 'Donations', icon: DollarSign },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="flex items-center justify-between px-3 sm:px-4 lg:px-8 h-14 sm:h-16 max-w-full">
        <div className="flex items-center space-x-2 sm:space-x-4 lg:space-x-8 flex-1 min-w-0">
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-fit">
            <img
              src="https://i0.wp.com/www.teamimpact.org/wp-content/uploads/2022/04/TeamIMPACT_Logo_Standard.png?w=1600&quality=80&ssl=1"
              alt="Team IMPACT Logo"
              className="h-6 sm:h-8 w-auto"
            />
            <h1 className="hidden sm:block text-lg sm:text-xl font-semibold text-slate-900 tracking-tight">Team IMPACT Hub</h1>
          </div>
          
          {/* Navigation Tabs - Hidden on mobile, shown on lg+ */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Search - Hidden on mobile, shown on md+ */}
          <div ref={searchRef} className="relative flex-1 max-w-xl hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input
              ref={inputRef}
              value={searchValue}
              onChange={handleSearchChange}
              onFocus={() => setShowSuggestions(searchValue.length > 0)}
              placeholder="Search posts, people, or topics..."
              className="pl-10 bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 h-10 rounded-lg text-black"
            />
            
            {/* Search Suggestions Dropdown */}
            {showSuggestions && filteredSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                {filteredSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full px-4 py-2 text-left text-sm text-black hover:bg-slate-50 focus:bg-slate-50 focus:outline-none first:rounded-t-lg last:rounded-b-lg"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-1 sm:space-x-2">
          {/* Mobile search button */}
          <Button variant="ghost" size="icon" className="md:hidden hover:bg-slate-100 rounded-lg h-8 w-8">
            <Search className="h-4 w-4 text-slate-600" />
          </Button>

          <Button variant="ghost" size="icon" className="hidden sm:flex hover:bg-slate-100 rounded-lg h-8 w-8 sm:h-10 sm:w-10">
            <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-slate-600" />
          </Button>

          <Button variant="ghost" size="icon" className="hidden sm:flex hover:bg-slate-100 rounded-lg h-8 w-8 sm:h-10 sm:w-10">
            <Settings className="h-4 w-4 sm:h-5 sm:w-5 text-slate-600" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 sm:h-10 sm:w-10 rounded-full hover:bg-slate-100">
                <Avatar className="h-7 w-7 sm:h-9 sm:w-9">
                  <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face" alt="Sarah Johnson" />
                  <AvatarFallback className="bg-blue-600 text-white text-xs sm:text-sm">SJ</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-white border-slate-200 shadow-lg" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium text-slate-900">Sarah Johnson</p>
                  <p className="text-xs text-slate-500">
                    sarah@example.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-slate-200" />
              <DropdownMenuItem className="hover:bg-slate-50 cursor-pointer">
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-slate-50 cursor-pointer">
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-slate-200" />
              <DropdownMenuItem 
                className="hover:bg-red-50 text-red-600 cursor-pointer"
                onClick={logout}
              >
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
