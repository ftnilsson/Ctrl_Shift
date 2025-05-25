"use client";
import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CoverageWarnings from '@/components/dashboard/CoverageWarnings';
import { coverageMockApi } from '@/services/api/coverageMockApi';
import { CoverageGap } from '@/services/coverageAnalysisService';
import { useTheme } from '@/features/theme/ThemeContext';

export default function DashboardPage() {
  const { theme } = useTheme();
  const [coverageGaps, setCoverageGaps] = useState<CoverageGap[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCoverageData = async () => {
      setLoading(true);
      try {
        // Fetch coverage gaps for the next 14 days
        const gaps = await coverageMockApi.getCoverageGaps({ days: 14 });
        setCoverageGaps(gaps);
      } catch (error) {
        console.error("Error fetching coverage data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoverageData();
  }, []);

  // Calculate overall coverage status
  const coverageStats = {
    total: coverageGaps.length,
    urgent: coverageGaps.filter(gap => {
      const today = new Date();
      const diffDays = Math.ceil((gap.date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      return diffDays <= 3;
    }).length
  };

  return (
    <div className={`flex flex-col min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 transition-colors">
        <div className="mb-8">
          <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Ctrl+Shift Dashboard</h1>
          <p className={`mt-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Monitor your on-call coverage and team status
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className={`rounded-lg shadow-md p-6 transition-colors ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center">
              <div className={`p-3 rounded-full mr-4 ${theme === 'dark' ? 'bg-blue-900' : 'bg-blue-100'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className={theme === 'dark' ? 'text-sm text-gray-400' : 'text-sm text-gray-500'}>Coverage Issues</p>
                <p className={`text-2xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{coverageStats.total}</p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between items-center">
                <span className={theme === 'dark' ? 'text-sm text-gray-400' : 'text-sm text-gray-500'}>
                  {coverageStats.urgent} urgent
                </span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  coverageStats.total === 0 
                    ? theme === 'dark' ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'
                    : theme === 'dark' ? 'bg-yellow-900 text-yellow-200' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {coverageStats.total === 0 ? 'All covered' : 'Attention needed'}
                </span>
              </div>
            </div>
          </div>

          <div className={`rounded-lg shadow-md p-6 transition-colors ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center">
              <div className={`p-3 rounded-full mr-4 ${theme === 'dark' ? 'bg-purple-900' : 'bg-purple-100'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${theme === 'dark' ? 'text-purple-300' : 'text-purple-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <p className={theme === 'dark' ? 'text-sm text-gray-400' : 'text-sm text-gray-500'}>Teams</p>
                <p className={`text-2xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>3</p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between items-center">
                <span className={theme === 'dark' ? 'text-sm text-gray-400' : 'text-sm text-gray-500'}>
                  8 team members
                </span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  theme === 'dark' ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'
                }`}>
                  Active
                </span>
              </div>
            </div>
          </div>

          <div className={`rounded-lg shadow-md p-6 transition-colors ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center">
              <div className={`p-3 rounded-full mr-4 ${theme === 'dark' ? 'bg-green-900' : 'bg-green-100'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${theme === 'dark' ? 'text-green-300' : 'text-green-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <p className={theme === 'dark' ? 'text-sm text-gray-400' : 'text-sm text-gray-500'}>Active Shifts</p>
                <p className={`text-2xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>24</p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between items-center">
                <span className={theme === 'dark' ? 'text-sm text-gray-400' : 'text-sm text-gray-500'}>
                  2 this week
                </span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  theme === 'dark' ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'
                }`}>
                  Scheduled
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Coverage Warnings */}
        <div className="mb-8">
          <h2 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Coverage Warnings</h2>
          <CoverageWarnings gaps={coverageGaps} loading={loading} />
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a href="/shifts" className={`rounded-lg shadow-md p-4 border-l-4 border-blue-500 transition-colors ${
              theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
            }`}>
              <h3 className={`font-semibold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Manage Shifts</h3>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Schedule and assign on-call shifts</p>
            </a>
            <a href="/teams" className={`rounded-lg shadow-md p-4 border-l-4 border-purple-500 transition-colors ${
              theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
            }`}>
              <h3 className={`font-semibold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Manage Teams</h3>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Add or update team members</p>
            </a>
            <a href="/reports" className={`rounded-lg shadow-md p-4 border-l-4 border-green-500 transition-colors ${
              theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
            }`}>
              <h3 className={`font-semibold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>View Reports</h3>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Analyze on-call performance and metrics</p>
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}