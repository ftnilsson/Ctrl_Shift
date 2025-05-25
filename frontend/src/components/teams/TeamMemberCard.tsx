import React from 'react';
import { TeamMember, TeamRole } from '@/interfaces/team';
import { useTheme } from '@/features/theme/ThemeContext';

interface TeamMemberCardProps {
  member: TeamMember;
  onRemove?: () => void;
  showActions?: boolean;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ 
  member, 
  onRemove,
  showActions = true 
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  // Function to get role badge color based on role
  const getRoleBadgeColor = (role: TeamRole): string => {
    switch (role) {
      case TeamRole.DEVELOPER:
        return isDark ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800';
      case TeamRole.QA:
        return isDark ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800';
      case TeamRole.DEVOPS:
        return isDark ? 'bg-purple-900 text-purple-200' : 'bg-purple-100 text-purple-800';
      case TeamRole.MANAGER:
        return isDark ? 'bg-yellow-900 text-yellow-200' : 'bg-yellow-100 text-yellow-800';
      case TeamRole.DESIGNER:
        return isDark ? 'bg-pink-900 text-pink-200' : 'bg-pink-100 text-pink-800';
      default:
        return isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={`border ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'} rounded-lg p-4 shadow-sm transition-colors`}>
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          {member.avatar ? (
            <img
              src={member.avatar}
              alt={member.name}
              className={`h-12 w-12 rounded-full object-cover border-2 ${isDark ? 'border-gray-700' : 'border-white'} shadow-sm`}
            />
          ) : (
            <div className={`h-12 w-12 rounded-full ${isDark ? 'bg-indigo-900' : 'bg-indigo-100'} flex items-center justify-center border-2 ${isDark ? 'border-gray-700' : 'border-white'} shadow-sm`}>
              <span className={`${isDark ? 'text-indigo-200' : 'text-indigo-800'} font-medium text-lg`}>
                {member.name.substring(0, 2).toUpperCase()}
              </span>
            </div>
          )}
        </div>
        <div className="flex-1">
          <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{member.name}</h4>
          {member.title && (
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{member.title}</p>
          )}
        </div>
        {showActions && onRemove && (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }} 
            className={`text-gray-400 hover:${isDark ? 'text-red-400' : 'text-red-500'} transition-colors`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
      
      <div className="mt-4 flex flex-wrap gap-2">
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleBadgeColor(member.role)}`}>
          {member.role}
        </span>
        {member.timeZone && (
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800'}`}>
            {member.timeZone.replace('_', ' ')}
          </span>
        )}
      </div>

      {(member.email || member.phone || member.slackId) && (
        <div className={`mt-4 pt-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-100'} grid gap-2`}>
          {member.email && (
            <div className={`flex items-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {member.email}
            </div>
          )}
          {member.phone && (
            <div className={`flex items-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {member.phone}
            </div>
          )}
          {member.slackId && (
            <div className={`flex items-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 15a3 3 0 100-6 3 3 0 000 6zm0 1a4 4 0 110-8 4 4 0 010 8zm8-8a3 3 0 100-6 3 3 0 000 6zm0 1a4 4 0 110-8 4 4 0 010 8zM6 23a3 3 0 100-6 3 3 0 000 6zm0 1a4 4 0 110-8 4 4 0 010 8zm8-8a3 3 0 100-6 3 3 0 000 6zm0 1a4 4 0 110-8 4 4 0 010 8z" />
              </svg>
              {member.slackId}
            </div>
          )}
          {member.pagerDutyId && (
            <div className={`flex items-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              {member.pagerDutyId}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TeamMemberCard;