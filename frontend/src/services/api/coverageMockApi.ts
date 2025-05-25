import { Team } from '@/interfaces/team';
import { Shift, ShiftType, ShiftStatus } from '@/interfaces/shift';
import { CoverageGap, coverageAnalysisService } from '../coverageAnalysisService';

// Mock teams data
const mockTeams: Team[] = [
  {
    id: 'team1',
    name: 'Frontend Team',
    description: 'Responsible for the user interface and client-side logic',
    members: [
      { id: 'member1', name: 'Alice Johnson', email: 'alice@example.com', role: 'Team Lead' },
      { id: 'member2', name: 'Bob Smith', email: 'bob@example.com', role: 'Developer' },
      { id: 'member3', name: 'Charlie Davis', email: 'charlie@example.com', role: 'Developer' }
    ],
    createdAt: new Date('2024-12-01')
  },
  {
    id: 'team2',
    name: 'Backend Team',
    description: 'Responsible for API development and database management',
    members: [
      { id: 'member4', name: 'David Wilson', email: 'david@example.com', role: 'Team Lead' },
      { id: 'member5', name: 'Eve Brown', email: 'eve@example.com', role: 'Developer' }
    ],
    createdAt: new Date('2024-12-05')
  },
  {
    id: 'team3',
    name: 'Infrastructure Team',
    description: 'Manages cloud infrastructure, CI/CD pipelines, and DevOps',
    members: [
      { id: 'member6', name: 'Frank Thomas', email: 'frank@example.com', role: 'DevOps Engineer' },
      { id: 'member7', name: 'Grace Lee', email: 'grace@example.com', role: 'SRE' },
      { id: 'member8', name: 'Henry Moore', email: 'henry@example.com', role: 'Cloud Engineer' }
    ],
    createdAt: new Date('2025-01-10')
  }
];

// Generate mock shifts with some coverage gaps
const generateMockShifts = (): Shift[] => {
  const today = new Date(2025, 4, 6); // May 6, 2025
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  
  const shifts: Shift[] = [];
  
  // Create Frontend Team shifts (with a gap on day 8 and 9)
  for (let day = 0; day < 14; day++) {
    if (day !== 8 && day !== 9) { // Create gap on May 14-15
      shifts.push({
        id: `shift-frontend-${day}`,
        title: 'Frontend On-Call',
        start: new Date(currentYear, currentMonth, today.getDate() + day, 8, 0),
        end: new Date(currentYear, currentMonth, today.getDate() + day, 20, 0),
        type: ShiftType.PRIMARY,
        status: ShiftStatus.SCHEDULED,
        assignee: day % 3 === 0 ? 'member1' : day % 3 === 1 ? 'member2' : 'member3',
        description: 'Primary on-call for frontend systems',
        color: '#4338ca'
      });
    }
  }
  
  // Create Backend Team shifts (with gaps on day 2, 4, and 10)
  for (let day = 0; day < 14; day++) {
    if (day !== 2 && day !== 4 && day !== 10) { // Create gaps on May 8, 10, and 16
      shifts.push({
        id: `shift-backend-${day}`,
        title: 'Backend On-Call',
        start: new Date(currentYear, currentMonth, today.getDate() + day, 8, 0),
        end: new Date(currentYear, currentMonth, today.getDate() + day, 20, 0),
        type: ShiftType.PRIMARY,
        status: ShiftStatus.SCHEDULED,
        assignee: day % 2 === 0 ? 'member4' : 'member5',
        description: 'Primary on-call for backend systems',
        color: '#0ea5e9'
      });
    }
  }
  
  // Infrastructure Team has no shifts for the first week, then coverage the second week
  for (let day = 7; day < 14; day++) {
    shifts.push({
      id: `shift-infra-${day}`,
      title: 'Infrastructure On-Call',
      start: new Date(currentYear, currentMonth, today.getDate() + day, 8, 0),
      end: new Date(currentYear, currentMonth, today.getDate() + day, 20, 0),
      type: ShiftType.PRIMARY,
      status: ShiftStatus.SCHEDULED,
      assignee: day % 3 === 0 ? 'member6' : day % 3 === 1 ? 'member7' : 'member8',
      description: 'Primary on-call for infrastructure',
      color: '#8b5cf6'
    });
  }
  
  // Add some backup coverage, but not for all primary shifts
  shifts.push({
    id: 'shift-backup-1',
    title: 'Frontend Backup',
    start: new Date(currentYear, currentMonth, today.getDate() + 1, 8, 0),
    end: new Date(currentYear, currentMonth, today.getDate() + 1, 20, 0),
    type: ShiftType.BACKUP,
    status: ShiftStatus.SCHEDULED,
    assignee: 'member3',
    description: 'Backup on-call for frontend systems',
    color: '#a855f7'
  });
  
  shifts.push({
    id: 'shift-backup-2',
    title: 'Backend Backup',
    start: new Date(currentYear, currentMonth, today.getDate() + 3, 8, 0),
    end: new Date(currentYear, currentMonth, today.getDate() + 3, 20, 0),
    type: ShiftType.BACKUP,
    status: ShiftStatus.SCHEDULED,
    assignee: 'member5',
    description: 'Backup on-call for backend systems',
    color: '#a855f7'
  });
  
  // Add a weekend shift
  shifts.push({
    id: 'shift-weekend',
    title: 'Weekend Coverage',
    start: new Date(currentYear, currentMonth, today.getDate() + 4, 8, 0), // Assuming this falls on a weekend
    end: new Date(currentYear, currentMonth, today.getDate() + 5, 20, 0),
    type: ShiftType.WEEKEND,
    status: ShiftStatus.SCHEDULED,
    assignee: 'member7',
    description: 'Weekend on-call rotation',
    color: '#0ea5e9'
  });
  
  return shifts;
};

const mockShifts = generateMockShifts();

/**
 * Mock API service for coverage-related data
 */
export const coverageMockApi = {
  /**
   * Get coverage gaps for all teams
   */
  getCoverageGaps: async (params?: { days?: number }): Promise<CoverageGap[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const today = new Date(2025, 4, 6); // May 6, 2025
        const daysToCheck = params?.days || 14;
        
        const gaps = coverageAnalysisService.findCoverageGaps(
          mockTeams,
          mockShifts,
          today,
          daysToCheck
        );
        
        resolve(gaps);
      }, 500); // Simulate network delay
    });
  },
  
  /**
   * Get all teams
   */
  getTeams: async (): Promise<Team[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockTeams);
      }, 300);
    });
  },
  
  /**
   * Get all shifts
   */
  getShifts: async (): Promise<Shift[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockShifts);
      }, 300);
    });
  }
};