"use client";
import React from 'react';
import dynamic from 'next/dynamic';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useTheme } from '@/features/theme/ThemeContext';

// Import the ShiftCalendar component with dynamic loading to prevent SSR issues with FullCalendar
const ShiftCalendar = dynamic(
  () => import('@/components/calendar/ShiftCalendar'),
  { loading: () => <p className="text-center py-8 text-gray-600 dark:text-gray-300">Loading calendar...</p> }
);

export default function ShiftsPage() {
  const { theme } = useTheme();

  return (
    <div className={`flex flex-col min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Header />

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8 transition-colors">
        <div className="mb-6">
          <h2 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>On-Call Schedule</h2>
          <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>Manage your team&apos;s on-call rotations. Click on the calendar to add a new shift or click an existing shift to modify it.</p>
        </div>
        
        <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-4 md:p-6 transition-colors`}>
          {/* Calendar Component */}
          <ShiftCalendar 
            onEventAdded={(event) => {
              console.log('Event added:', event);
              // In a real app, you would send this to your API
            }}
            onEventDeleted={(eventId) => {
              console.log('Event deleted:', eventId);
              // In a real app, you would send this to your API
            }}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}