"use client";
import React, { useState, useEffect, useCallback } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import TeamSupportMetrics from '@/components/reports/TeamSupportMetrics';
import { reportsMockApi } from '@/services/api/reportsMockApi';
import { Team } from '@/interfaces/team';
import { Shift } from '@/interfaces/shift';
import { useTheme } from '@/features/theme/ThemeContext';

export default function ReportsPage() {
  const { theme } = useTheme();
  const [teams, setTeams] = useState<Team[]>([]);
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [period, setPeriod] = useState<'week' | 'month' | 'quarter'>('month');
  const [metrics, setMetrics] = useState<{
    totalShifts: number;
    totalHours: number;
    averageShiftLength: number;
    teamsCount: number;
    membersCount: number;
  } | null>(null);

  // Format hours as readable string
  const formatHours = (hours: number): string => {
    if (hours < 1) return `${Math.round(hours * 60)} minutes`;
    
    const wholeHours = Math.floor(hours);
    const minutes = Math.round((hours - wholeHours) * 60);
    
    if (minutes === 0) return `${wholeHours} hr${wholeHours !== 1 ? 's' : ''}`;
    return `${wholeHours} hr${wholeHours !== 1 ? 's' : ''} ${minutes} min`;
  };

  const fetchReportData = useCallback(async () => {
    setLoading(true);
    try {
      const { teams: fetchedTeams, shifts: fetchedShifts } = await reportsMockApi.getTeamSupportData({ period });
      const summaryMetrics = await reportsMockApi.getSummaryMetrics();
      
      setTeams(fetchedTeams);
      setShifts(fetchedShifts);
      setMetrics(summaryMetrics);
    } catch (error) {
      console.error("Error fetching report data:", error);
    } finally {
      setLoading(false);
    }
  }, [period]);

  useEffect(() => {
    fetchReportData();
  }, [fetchReportData]);

  const handlePeriodChange = (newPeriod: 'week' | 'month' | 'quarter') => {
    setPeriod(newPeriod);
  };

  return (
    <div className={`flex flex-col min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 transition-colors">
        <div className="mb-6">
          <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Support Reports</h1>
          <p className={`mt-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            View detailed reports on team support coverage and member contributions
          </p>
        </div>

        {/* Period Selector */}
        <div className="mb-8">
          <div className={`flex flex-wrap gap-2 items-center p-4 rounded-lg shadow-sm ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <span className={`font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Time Period:</span>
            <div className="flex rounded-md shadow-sm">
              <button
                onClick={() => handlePeriodChange('week')}
                className={`px-4 py-2 text-sm font-medium ${
                  period === 'week'
                    ? 'bg-indigo-600 text-white'
                    : theme === 'dark'
                    ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                } border border-gray-300 dark:border-gray-600 rounded-l-md focus:z-10 focus:outline-none`}
              >
                Week
              </button>
              <button
                onClick={() => handlePeriodChange('month')}
                className={`px-4 py-2 text-sm font-medium ${
                  period === 'month'
                    ? 'bg-indigo-600 text-white'
                    : theme === 'dark'
                    ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                } border-t border-b border-r border-gray-300 dark:border-gray-600 focus:z-10 focus:outline-none`}
              >
                Month
              </button>
              <button
                onClick={() => handlePeriodChange('quarter')}
                className={`px-4 py-2 text-sm font-medium ${
                  period === 'quarter'
                    ? 'bg-indigo-600 text-white'
                    : theme === 'dark'
                    ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                } border border-gray-300 dark:border-gray-600 rounded-r-md focus:z-10 focus:outline-none`}
              >
                Quarter
              </button>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        {metrics && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className={`rounded-lg shadow-md p-6 border-t-4 border-indigo-500 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
              <h3 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{metrics.totalShifts}</h3>
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>Total Shifts</p>
            </div>
            
            <div className={`rounded-lg shadow-md p-6 border-t-4 border-pink-500 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
              <h3 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {formatHours(metrics.totalHours)}
              </h3>
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>Total Support Hours</p>
            </div>
            
            <div className={`rounded-lg shadow-md p-6 border-t-4 border-amber-500 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
              <h3 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {formatHours(metrics.averageShiftLength)}
              </h3>
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>Avg. Shift Length</p>
            </div>
            
            <div className={`rounded-lg shadow-md p-6 border-t-4 border-emerald-500 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
              <h3 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {metrics.membersCount} / {metrics.teamsCount}
              </h3>
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>Members / Teams</p>
            </div>
          </div>
        )}

        {/* Team Support Metrics */}
        <div className="space-y-8">
          <h2 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Team Support Contribution</h2>
          <TeamSupportMetrics teams={teams} shifts={shifts} loading={loading} period={period} />
        </div>

      </main>

      <Footer />
    </div>
  );
}