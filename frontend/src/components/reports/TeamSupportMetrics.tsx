import React from 'react';
import { Team } from '@/interfaces/team';
import { Shift } from '@/interfaces/shift';

interface TeamMemberMetrics {
  id: string;
  name: string;
  email: string;
  role: string;
  shiftsCount: number;
  hoursScheduled: number;
  coveragePercentage: number;
}

interface TeamMetrics {
  id: string;
  name: string;
  totalShifts: number;
  totalHours: number;
  members: TeamMemberMetrics[];
}

interface TeamSupportMetricsProps {
  teams: Team[];
  shifts: Shift[];
  loading?: boolean;
  period?: 'week' | 'month' | 'quarter';
}

const TeamSupportMetrics: React.FC<TeamSupportMetricsProps> = ({ 
  teams, 
  shifts, 
  loading = false,
  period = 'month' 
}) => {
  // Calculate metrics for each team and their members
  const calculateTeamMetrics = (): TeamMetrics[] => {
    if (!teams.length || !shifts.length) return [];

    return teams.map(team => {
      // Get all shifts assigned to members of this team
      const teamShifts = shifts.filter(shift => 
        team.members.some(member => member.id === shift.assignee)
      );
      
      // Calculate total hours for all shifts
      const totalHours = teamShifts.reduce((sum, shift) => {
        const startDate = new Date(shift.start);
        const endDate = new Date(shift.end);
        const hours = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);
        return sum + hours;
      }, 0);
      
      // Calculate metrics for each team member
      const membersWithMetrics: TeamMemberMetrics[] = team.members.map(member => {
        const memberShifts = shifts.filter(shift => shift.assignee === member.id);
        
        // Calculate hours scheduled for this member
        const hoursScheduled = memberShifts.reduce((sum, shift) => {
          const startDate = new Date(shift.start);
          const endDate = new Date(shift.end);
          const hours = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);
          return sum + hours;
        }, 0);
        
        // Calculate coverage percentage (against team total)
        const coveragePercentage = totalHours > 0 
          ? Math.round((hoursScheduled / totalHours) * 100) 
          : 0;
        
        return {
          ...member,
          shiftsCount: memberShifts.length,
          hoursScheduled,
          coveragePercentage
        };
      });
      
      // Sort members by hours scheduled (descending)
      membersWithMetrics.sort((a, b) => b.hoursScheduled - a.hoursScheduled);
      
      return {
        id: team.id,
        name: team.name,
        totalShifts: teamShifts.length,
        totalHours,
        members: membersWithMetrics
      };
    });
  };
  
  const teamMetrics = calculateTeamMetrics();
  
  // Format hours as readable string
  const formatHours = (hours: number): string => {
    if (hours < 1) return `${Math.round(hours * 60)} minutes`;
    
    const wholeHours = Math.floor(hours);
    const minutes = Math.round((hours - wholeHours) * 60);
    
    if (minutes === 0) return `${wholeHours} hour${wholeHours !== 1 ? 's' : ''}`;
    return `${wholeHours} hour${wholeHours !== 1 ? 's' : ''} ${minutes} min`;
  };

  if (loading) {
    return (
      <div className="animate-pulse bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 transition-colors">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-3/4"></div>
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-3">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {teamMetrics.map(team => (
        <div key={team.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-colors">
          <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 md:mb-0">
                {team.name}
              </h3>
              <div className="flex items-center space-x-4">
                <div className="text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Total Shifts:</span> 
                  <span className="ml-1 font-medium text-gray-900 dark:text-white">{team.totalShifts}</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Total Hours:</span> 
                  <span className="ml-1 font-medium text-gray-900 dark:text-white">{formatHours(team.totalHours)}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {team.members.map((member, index) => (
              <div 
                key={member.id} 
                className={`px-6 py-4 ${index % 2 === 1 ? 'bg-gray-50 dark:bg-gray-700/50' : ''}`}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="mb-2 md:mb-0">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mr-3">
                        <span className="text-indigo-800 dark:text-indigo-200 font-medium text-sm">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">{member.name}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{member.role}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:text-right">
                    <div>
                      <p className="text-xs uppercase text-gray-500 dark:text-gray-400">Shifts</p>
                      <p className="font-medium text-gray-900 dark:text-white">{member.shiftsCount}</p>
                    </div>
                    
                    <div>
                      <p className="text-xs uppercase text-gray-500 dark:text-gray-400">Hours</p>
                      <p className="font-medium text-gray-900 dark:text-white">{formatHours(member.hoursScheduled)}</p>
                    </div>
                    
                    <div>
                      <p className="text-xs uppercase text-gray-500 dark:text-gray-400">Coverage</p>
                      <div className="flex items-center justify-end">
                        <span className="font-medium text-gray-900 dark:text-white mr-2">
                          {member.coveragePercentage}%
                        </span>
                        <div className="w-16 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <div 
                            className="bg-indigo-600 dark:bg-indigo-400 h-2 rounded-full" 
                            style={{ width: `${member.coveragePercentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {team.members.length === 0 && (
              <div className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                No team members found.
              </div>
            )}
          </div>
        </div>
      ))}
      
      {teamMetrics.length === 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-lg font-medium text-gray-900 dark:text-white">No team data available</p>
          <p className="mt-1 text-gray-500 dark:text-gray-400">
            There's no support data to display for the current {period}.
          </p>
        </div>
      )}
    </div>
  );
};

export default TeamSupportMetrics;