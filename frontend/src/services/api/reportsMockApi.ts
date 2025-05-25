import { Team } from '@/interfaces/team';
import { Shift } from '@/interfaces/shift';
import { coverageMockApi } from './coverageMockApi';

/**
 * Mock API service for reports-related data
 */
export const reportsMockApi = {
  /**
   * Get all teams with their corresponding shifts for a specified period
   * 
   * @param params - Query parameters
   * @returns Teams and shifts for reports
   */
  getTeamSupportData: async (params?: { 
    period?: 'week' | 'month' | 'quarter',
    startDate?: Date,
    endDate?: Date
  }): Promise<{teams: Team[], shifts: Shift[]}> => {
    return new Promise(async (resolve) => {
      setTimeout(async () => {
        // Use the existing mock data from coverageMockApi
        const teams = await coverageMockApi.getTeams();
        const allShifts = await coverageMockApi.getShifts();

        // Filter shifts by date if period is provided
        let filteredShifts = allShifts;
        const now = new Date(2025, 4, 6); // Set the current date as May 6, 2025
        
        if (params?.startDate && params?.endDate) {
          // Filter by custom date range
          filteredShifts = allShifts.filter(shift => {
            const shiftDate = new Date(shift.start);
            return shiftDate >= params.startDate! && shiftDate <= params.endDate!;
          });
        } else if (params?.period) {
          // Filter by predefined period
          const startDate = new Date(now);
          
          switch (params.period) {
            case 'week':
              // Last 7 days
              startDate.setDate(startDate.getDate() - 7);
              break;
            case 'month':
              // Last 30 days
              startDate.setDate(startDate.getDate() - 30);
              break;
            case 'quarter':
              // Last 90 days
              startDate.setDate(startDate.getDate() - 90);
              break;
          }
          
          filteredShifts = allShifts.filter(shift => {
            const shiftDate = new Date(shift.start);
            return shiftDate >= startDate && shiftDate <= now;
          });
        }
        
        resolve({
          teams,
          shifts: filteredShifts
        });
      }, 600); // Simulate network delay
    });
  },
  
  /**
   * Get summary metrics for the dashboard
   */
  getSummaryMetrics: async (): Promise<{
    totalShifts: number;
    totalHours: number;
    averageShiftLength: number;
    teamsCount: number;
    membersCount: number;
  }> => {
    return new Promise(async (resolve) => {
      setTimeout(async () => {
        const { teams, shifts } = await reportsMockApi.getTeamSupportData();
        
        // Calculate total hours across all shifts
        const totalHours = shifts.reduce((sum, shift) => {
          const startDate = new Date(shift.start);
          const endDate = new Date(shift.end);
          const hours = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);
          return sum + hours;
        }, 0);
        
        // Get unique members count
        const uniqueMembers = new Set();
        teams.forEach(team => {
          team.members.forEach(member => {
            uniqueMembers.add(member.id);
          });
        });
        
        resolve({
          totalShifts: shifts.length,
          totalHours,
          averageShiftLength: shifts.length > 0 ? totalHours / shifts.length : 0,
          teamsCount: teams.length,
          membersCount: uniqueMembers.size
        });
      }, 500);
    });
  }
};