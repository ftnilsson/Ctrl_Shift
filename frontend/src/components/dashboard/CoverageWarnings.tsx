import React from 'react';
import { Team } from '@/interfaces/team';
import Link from 'next/link';
import { useTheme } from '@/features/theme/ThemeContext';

interface CoverageGap {
  date: Date;
  team: Team;
}

interface CoverageWarningsProps {
  gaps: CoverageGap[];
  loading?: boolean;
}

const CoverageWarnings: React.FC<CoverageWarningsProps> = ({ gaps, loading = false }) => {
  const { theme } = useTheme();
  
  // Format date for display
  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatRelativeDate = (date: Date): string => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    }
    
    // Calculate days difference
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 7) {
      return `In ${diffDays} days`;
    }
    
    return formatDate(date);
  };

  if (loading) {
    return (
      <div className={`animate-pulse ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-4 transition-colors`}>
        <div className={`h-6 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} rounded mb-4 w-3/4`}></div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className={`h-16 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} rounded`}></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md overflow-hidden transition-colors`}>
      <div className={`border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} px-4 py-3 flex justify-between items-center`}>
        <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Coverage Gaps</h3>
        <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          gaps.length > 0 
            ? theme === 'dark' ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800'
            : theme === 'dark' ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'
        }`}>
          {gaps.length > 0 ? `${gaps.length} issues` : 'All covered'}
        </span>
      </div>

      {gaps.length === 0 ? (
        <div className={`p-4 text-center ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-green-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p>All teams have proper coverage. No gaps detected.</p>
        </div>
      ) : (
        <ul className={`divide-y ${theme === 'dark' ? 'divide-gray-700' : 'divide-gray-200'}`}>
          {gaps.map((gap, index) => {
            const isUrgent = new Date(gap.date).getTime() - new Date().getTime() < 3 * 24 * 60 * 60 * 1000; // 3 days
            
            return (
              <li 
                key={`${gap.team.id}-${gap.date.toISOString()}-${index}`} 
                className={`p-4 ${
                  isUrgent 
                    ? theme === 'dark' ? 'bg-red-900 bg-opacity-20' : 'bg-red-50'
                    : ''
                } ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition-colors`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {gap.team.name}
                    </span>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      Missing coverage on {formatDate(gap.date)}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      isUrgent
                        ? theme === 'dark' ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800'
                        : theme === 'dark' ? 'bg-yellow-900 text-yellow-200' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {formatRelativeDate(gap.date)}
                    </span>
                    <Link 
                      href="/shifts" 
                      className={`ml-4 ${theme === 'dark' ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-900'} text-sm font-medium`}
                    >
                      Assign
                    </Link>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default CoverageWarnings;