import React from 'react';
import Image from 'next/image';
import { Team } from '@/interfaces/team';
import { useTheme } from '@/features/theme/ThemeContext';

interface TeamCardProps {
  team: Team;
  isSelected?: boolean;
  onClick?: () => void;
}

const TeamCard: React.FC<TeamCardProps> = ({ team, isSelected = false, onClick }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  return (
    <div 
      className={`
        border ${isDark ? 'border-gray-700' : 'border-gray-200'} rounded-lg p-4 cursor-pointer transition-colors
        ${isSelected 
          ? `bg-indigo-50 ${isDark ? 'bg-indigo-900/30 border-indigo-700' : 'border-indigo-200'}` 
          : `${isDark ? 'bg-gray-800 hover:bg-gray-700/50' : 'bg-white hover:bg-gray-50'}`}
      `}
      onClick={onClick}
    >
      <h3 className={`font-medium text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>{team.name}</h3>
      {team.description && (
        <p className={`text-sm mt-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{team.description}</p>
      )}
      
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center">
          <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{team.members.length} members</span>
        </div>
        
        {/* Show first 3 team members avatars as a stack */}
        {team.members.length > 0 && (
          <div className="flex -space-x-2 overflow-hidden">
            {team.members.slice(0, 3).map((member) => (
              <div key={member.id} className={`inline-block h-6 w-6 rounded-full ring-2 ${isDark ? 'ring-gray-800' : 'ring-white'}`}>
                {member.avatar ? (
                  <div className="relative h-full w-full">
                    <Image
                      src={member.avatar}
                      alt={member.name}
                      fill
                      className="rounded-full object-cover"
                      sizes="24px"
                    />
                  </div>
                ) : (
                  <div className={`h-full w-full rounded-full ${isDark ? 'bg-indigo-900' : 'bg-indigo-100'} flex items-center justify-center`}>
                    <span className={`font-medium text-xs ${isDark ? 'text-indigo-200' : 'text-indigo-800'}`}>
                      {member.name.substring(0, 2).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
            ))}
            {team.members.length > 3 && (
              <div className={`inline-block h-6 w-6 rounded-full ${isDark ? 'bg-gray-600' : 'bg-gray-200'} ring-2 ${isDark ? 'ring-gray-800' : 'ring-white'} flex items-center justify-center`}>
                <span className={`text-xs font-medium ${isDark ? 'text-gray-200' : 'text-gray-600'}`}>
                  +{team.members.length - 3}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamCard;