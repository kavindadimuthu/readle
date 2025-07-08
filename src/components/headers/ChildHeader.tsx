"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

interface ChildHeaderProps {
  childName: string;
  avatar: string;
  level: number;
  coins?: number;
  totalBadges?: number;
  weeklyStreak?: number;
}

const ChildHeader: React.FC<ChildHeaderProps> = ({
  childName = "Amara",
  avatar = "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=150&h=150&fit=crop&crop=face",
  level = 1,
  coins = 0,
  totalBadges = 0,
  weeklyStreak = 0
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const navigationItems = [
    { label: 'Dashboard', href: '/child-dashboard', icon: '🏠' },
    { label: 'Activities', href: '/activities', icon: '🎮' },
    { label: 'Achievements', href: '/achievements', icon: '🏆' },
    { label: 'My Progress', href: '/progress', icon: '📊' }
  ];

  const isActivePage = (href: string) => {
    if (href === '/child-dashboard') {
      return pathname === '/child-dashboard';
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="bg-gradient-to-r from-indigo-50 via-purple-50 to-blue-50 py-4 px-6 shadow-lg rounded-b-2xl relative">
      <div className="max-w-6xl mx-auto">
        {/* Main Header Row */}
        <div className="flex items-center justify-between">
          {/* Avatar and Welcome */}
          <div className="flex items-center">
            <div className="relative">
              <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-lg bg-white">
                <Image 
                  src={avatar} 
                  alt={`${childName}'s avatar`} 
                  width={64} 
                  height={64}
                  className="object-cover"
                />
              </div>
              {/* Level Badge */}
              <div className="absolute -bottom-1 -right-1 bg-gradient-to-br from-yellow-400 to-orange-500 text-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center border-3 border-white shadow-md">
                {level}
              </div>
            </div>
            <div className="ml-4">
              <h1 className="text-2xl font-bold text-indigo-800">
                Hi, {childName}! 🌟
              </h1>
              <p className="text-indigo-600 text-sm">Ready for today&apos;s adventure?</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center">
            <div className="flex bg-white rounded-full p-1 shadow-md border border-indigo-100">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                    ${isActivePage(item.href) 
                      ? 'bg-indigo-500 text-white shadow-md transform scale-105' 
                      : 'text-indigo-700 hover:bg-indigo-50 hover:text-indigo-800'
                    }
                  `}
                >
                  <span className="mr-2">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </nav>

          {/* Stats and Menu */}
          <div className="flex items-center gap-4">
            {/* Stats Cards - Desktop Only */}
            <div className="hidden md:flex items-center gap-3">
              {/* Coins */}
              {/* <div className="flex items-center bg-white px-3 py-2 rounded-full shadow-md border border-yellow-200">
                <span className="text-lg">⭐</span>
                <span className="ml-2 font-bold text-yellow-600">{coins}</span>
              </div> */}

              {/* Badges */}
              <div className="flex items-center bg-white px-3 py-2 rounded-full shadow-md border border-purple-200">
                <span className="text-lg">🏅</span>
                <span className="ml-2 font-bold text-purple-600">{totalBadges}</span>
              </div>

              {/* Streak */}
              {weeklyStreak > 0 && (
                <div className="flex items-center bg-white px-3 py-2 rounded-full shadow-md border border-orange-200">
                  <span className="text-lg">🔥</span>
                  <span className="ml-2 font-bold text-orange-600">{weeklyStreak}</span>
                </div>
              )}
            </div>

            {/* Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-3 rounded-full bg-white hover:bg-indigo-50 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-300 shadow-md"
              aria-label="Menu"
            >
              <svg 
                className="w-6 h-6 text-indigo-700" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" 
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation - Below main header */}
        <nav className="lg:hidden mt-4 pt-4 border-t border-white/30">
          <div className="flex justify-center">
            <div className="flex bg-white rounded-full p-1 shadow-md border border-indigo-100">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center px-3 py-2 rounded-full text-xs font-medium transition-all duration-200
                    ${isActivePage(item.href) 
                      ? 'bg-indigo-500 text-white shadow-md' 
                      : 'text-indigo-700 hover:bg-indigo-50'
                    }
                  `}
                >
                  <span className="mr-1">{item.icon}</span>
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </div>

      {/* Dropdown Menu */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* Menu */}
          <div className="absolute right-6 top-20 w-64 bg-white rounded-2xl shadow-xl py-3 z-20 border border-indigo-100">
            {/* Mobile Stats (visible on small screens) */}
            <div className="md:hidden px-4 pb-3 mb-3 border-b border-gray-100">
              <div className="grid grid-cols-3 gap-2">
                <div className="text-center">
                  <div className="text-xl">⭐</div>
                  <div className="text-sm font-bold text-yellow-600">{coins}</div>
                  <div className="text-xs text-gray-500">Coins</div>
                </div>
                <div className="text-center">
                  <div className="text-xl">🏅</div>
                  <div className="text-sm font-bold text-purple-600">{totalBadges}</div>
                  <div className="text-xs text-gray-500">Badges</div>
                </div>
                <div className="text-center">
                  <div className="text-xl">🔥</div>
                  <div className="text-sm font-bold text-orange-600">{weeklyStreak}</div>
                  <div className="text-xs text-gray-500">Streak</div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <Link 
              href="/activities"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="mr-3 text-lg">🎮</span>
              <div>
                <div className="font-medium">Play Activities</div>
                <div className="text-xs text-gray-500">Continue learning</div>
              </div>
            </Link>
            
            <Link 
              href="/achievements"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="mr-3 text-lg">🏆</span>
              <div>
                <div className="font-medium">My Achievements</div>
                <div className="text-xs text-gray-500">View your badges</div>
              </div>
            </Link>

            <button 
              className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="mr-3 text-lg">👤</span>
              <div className="text-left">
                <div className="font-medium">My Profile</div>
                <div className="text-xs text-gray-500">Settings & preferences</div>
              </div>
            </button>

            <div className="border-t border-gray-100 my-2"></div>
            
            <button 
              className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
              onClick={() => {
                setIsMenuOpen(false);
                handleLogout();
              }}
            >
              <span className="mr-3 text-lg">👋</span>
              <div className="text-left">
                <div className="font-medium">Say Goodbye</div>
                <div className="text-xs text-red-400">Until next time!</div>
              </div>
            </button>
          </div>
        </>
      )}
    </header>
  );
};

export default ChildHeader;