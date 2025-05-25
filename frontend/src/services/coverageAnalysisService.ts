import { Team } from '@/interfaces/team';
import { Shift, ShiftType, ShiftStatus } from '@/interfaces/shift';

export interface CoverageGap {
  date: Date;
  team: Team;
}

/**
 * Service for analyzing coverage across teams and shifts
 */
export const coverageAnalysisService = {
  /**
   * Finds dates in a specified range where teams don't have any assigned shifts
   * 
   * @param teams - All teams to check for coverage
   * @param shifts - All shifts in the system
   * @param startDate - Start of period to check (defaults to today)
   * @param daysToCheck - Number of days to look ahead (defaults to 14 days)
   * @returns Array of coverage gaps (team + date combinations)
   */
  findCoverageGaps(
    teams: Team[],
    shifts: Shift[],
    startDate: Date = new Date(),
    daysToCheck: number = 14
  ): CoverageGap[] {
    const gaps: CoverageGap[] = [];
    
    // Normalize start date to beginning of day
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);
    
    // Loop through each day in the range
    for (let i = 0; i < daysToCheck; i++) {
      const currentDate = new Date(start);
      currentDate.setDate(start.getDate() + i);
      
      // Format date as YYYY-MM-DD for comparison
      const dateStr = currentDate.toISOString().split('T')[0];
      
      // Check each team for coverage on this day
      teams.forEach(team => {
        // Find if team has any active shifts on this day
        const hasShiftCoverage = shifts.some(shift => {
          // Skip cancelled or completed shifts
          if (shift.status === ShiftStatus.CANCELLED || shift.status === ShiftStatus.COMPLETED) {
            return false;
          }
          
          // Check if shift's team members are part of this team
          const isTeamMember = team.members.some(member => member.id === shift.assignee);
          if (!isTeamMember) {
            return false;
          }
          
          // Parse shift dates and check if they overlap with the current date
          const shiftStart = new Date(shift.start);
          const shiftEnd = new Date(shift.end);
          
          // Format shift dates for date-only comparison
          const shiftStartDate = shiftStart.toISOString().split('T')[0];
          const shiftEndDate = shiftEnd.toISOString().split('T')[0];
          
          return (shiftStartDate <= dateStr && dateStr <= shiftEndDate);
        });
        
        // If no coverage found, add to gaps
        if (!hasShiftCoverage) {
          gaps.push({
            date: currentDate,
            team
          });
        }
      });
    }
    
    // Sort gaps by date (soonest first)
    return gaps.sort((a, b) => a.date.getTime() - b.date.getTime());
  },
  
  /**
   * Finds shifts that are assigned but have no backup coverage
   * 
   * @param shifts - All shifts in the system
   * @param startDate - Start of period to check (defaults to today)
   * @param daysToCheck - Number of days to look ahead (defaults to 14 days)
   * @returns Array of shifts without backup
   */
  findShiftsWithoutBackup(
    shifts: Shift[],
    startDate: Date = new Date(),
    daysToCheck: number = 14
  ): Shift[] {
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + daysToCheck);
    
    // Group primary shifts by date
    const shiftsByDate: Record<string, {primary: Shift[], backup: Shift[]}> = {};
    
    shifts.forEach(shift => {
      // Skip cancelled or completed shifts
      if (shift.status === ShiftStatus.CANCELLED || shift.status === ShiftStatus.COMPLETED) {
        return;
      }
      
      const shiftStart = new Date(shift.start);
      const shiftEnd = new Date(shift.end);
      
      // Skip shifts outside our date range
      if (shiftStart > endDate || shiftEnd < startDate) {
        return;
      }
      
      // Get each date covered by this shift
      const currentDate = new Date(shiftStart);
      while (currentDate <= shiftEnd) {
        const dateStr = currentDate.toISOString().split('T')[0];
        
        if (!shiftsByDate[dateStr]) {
          shiftsByDate[dateStr] = { primary: [], backup: [] };
        }
        
        // Sort shifts into primary and backup
        if (shift.type === ShiftType.PRIMARY) {
          shiftsByDate[dateStr].primary.push(shift);
        } else if (shift.type === ShiftType.BACKUP) {
          shiftsByDate[dateStr].backup.push(shift);
        }
        
        // Move to next day
        currentDate.setDate(currentDate.getDate() + 1);
      }
    });
    
    // Find primary shifts without backup
    const shiftsWithoutBackup: Shift[] = [];
    
    Object.entries(shiftsByDate).forEach(([date, { primary, backup }]) => {
      if (primary.length > 0 && backup.length === 0) {
        shiftsWithoutBackup.push(...primary);
      }
    });
    
    return shiftsWithoutBackup;
  }
};