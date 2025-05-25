import { Team, TeamMember, TeamRole } from '@/interfaces/team';

// Mock data for teams
const mockTeams: Team[] = [
  {
    id: 'team-1',
    name: 'Frontend Team',
    description: 'Web application frontend development team',
    members: [],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2025-04-20')
  },
  {
    id: 'team-2',
    name: 'Backend Team',
    description: 'API and database development team',
    members: [],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2025-04-22')
  },
  {
    id: 'team-3',
    name: 'DevOps Team',
    description: 'Infrastructure and deployment team',
    members: [],
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2025-04-18')
  },
  {
    id: 'team-4',
    name: 'QA Team',
    description: 'Quality assurance and testing team',
    members: [],
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2025-04-15')
  }
];

// Mock data for team members
const mockTeamMembers: TeamMember[] = [
  {
    id: 'member-1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    role: TeamRole.DEVELOPER,
    title: 'Senior Frontend Developer',
    avatar: 'https://i.pravatar.cc/150?img=1',
    phone: '+1 (555) 123-4567',
    slackId: '@alice',
    pagerDutyId: 'alice_j',
    timeZone: 'America/New_York',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2025-03-10')
  },
  {
    id: 'member-2',
    name: 'Bob Smith',
    email: 'bob@example.com',
    role: TeamRole.DEVELOPER,
    title: 'Backend Engineer',
    avatar: 'https://i.pravatar.cc/150?img=2',
    phone: '+1 (555) 234-5678',
    slackId: '@bob',
    pagerDutyId: 'bob_s',
    timeZone: 'America/Chicago',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2025-03-12')
  },
  {
    id: 'member-3',
    name: 'Carol Martinez',
    email: 'carol@example.com',
    role: TeamRole.DEVOPS,
    title: 'DevOps Engineer',
    avatar: 'https://i.pravatar.cc/150?img=3',
    phone: '+1 (555) 345-6789',
    slackId: '@carol',
    pagerDutyId: 'carol_m',
    timeZone: 'America/Los_Angeles',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2025-03-15')
  },
  {
    id: 'member-4',
    name: 'Dave Wilson',
    email: 'dave@example.com',
    role: TeamRole.QA,
    title: 'QA Engineer',
    avatar: 'https://i.pravatar.cc/150?img=4',
    phone: '+1 (555) 456-7890',
    slackId: '@dave',
    pagerDutyId: 'dave_w',
    timeZone: 'Europe/London',
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2025-03-20')
  },
  {
    id: 'member-5',
    name: 'Eva Garcia',
    email: 'eva@example.com',
    role: TeamRole.MANAGER,
    title: 'Engineering Manager',
    avatar: 'https://i.pravatar.cc/150?img=5',
    phone: '+1 (555) 567-8901',
    slackId: '@eva',
    pagerDutyId: 'eva_g',
    timeZone: 'America/New_York',
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2025-03-25')
  },
  {
    id: 'member-6',
    name: 'Frank Lee',
    email: 'frank@example.com',
    role: TeamRole.DESIGNER,
    title: 'UI/UX Designer',
    avatar: 'https://i.pravatar.cc/150?img=6',
    phone: '+1 (555) 678-9012',
    slackId: '@frank',
    pagerDutyId: 'frank_l',
    timeZone: 'America/Los_Angeles',
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2025-04-01')
  },
  {
    id: 'member-7',
    name: 'Grace Kim',
    email: 'grace@example.com',
    role: TeamRole.DEVELOPER,
    title: 'Full Stack Developer',
    avatar: 'https://i.pravatar.cc/150?img=7',
    phone: '+1 (555) 789-0123',
    slackId: '@grace',
    pagerDutyId: 'grace_k',
    timeZone: 'Asia/Seoul',
    createdAt: new Date('2024-03-10'),
    updatedAt: new Date('2025-04-05')
  },
  {
    id: 'member-8',
    name: 'Henry Chen',
    email: 'henry@example.com',
    role: TeamRole.DEVOPS,
    title: 'Site Reliability Engineer',
    avatar: 'https://i.pravatar.cc/150?img=8',
    phone: '+1 (555) 890-1234',
    slackId: '@henry',
    pagerDutyId: 'henry_c',
    timeZone: 'Asia/Tokyo',
    createdAt: new Date('2024-03-15'),
    updatedAt: new Date('2025-04-10')
  }
];

// Associate team members with their respective teams
mockTeams[0].members = [mockTeamMembers[0], mockTeamMembers[5], mockTeamMembers[6]]; // Frontend Team
mockTeams[1].members = [mockTeamMembers[1], mockTeamMembers[6]]; // Backend Team
mockTeams[2].members = [mockTeamMembers[2], mockTeamMembers[7]]; // DevOps Team
mockTeams[3].members = [mockTeamMembers[3]]; // QA Team
// Note: member-4 (Eva) is a manager and not specifically assigned to a team

/**
 * Delay utility to simulate network latency
 */
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Mock implementation of the Teams API
 */
export const teamsMockApi = {
  /**
   * Get all teams
   */
  getTeams: async (): Promise<Team[]> => {
    await delay(300); // Simulate network delay
    return [...mockTeams];
  },

  /**
   * Get a specific team by ID
   */
  getTeamById: async (teamId: string): Promise<Team | null> => {
    await delay(200);
    const team = mockTeams.find(t => t.id === teamId);
    return team ? { ...team } : null;
  },

  /**
   * Create a new team
   */
  createTeam: async (team: Omit<Team, 'id' | 'createdAt' | 'updatedAt'>): Promise<Team> => {
    await delay(400);
    const newTeam: Team = {
      ...team,
      id: `team-${mockTeams.length + 1}`,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    mockTeams.push(newTeam);
    return { ...newTeam };
  },

  /**
   * Update an existing team
   */
  updateTeam: async (teamId: string, teamUpdate: Partial<Team>): Promise<Team | null> => {
    await delay(300);
    const teamIndex = mockTeams.findIndex(t => t.id === teamId);
    
    if (teamIndex === -1) return null;
    
    const updatedTeam = {
      ...mockTeams[teamIndex],
      ...teamUpdate,
      updatedAt: new Date()
    };
    
    mockTeams[teamIndex] = updatedTeam;
    return { ...updatedTeam };
  },

  /**
   * Delete a team
   */
  deleteTeam: async (teamId: string): Promise<boolean> => {
    await delay(300);
    const teamIndex = mockTeams.findIndex(t => t.id === teamId);
    
    if (teamIndex === -1) return false;
    
    mockTeams.splice(teamIndex, 1);
    return true;
  },

  /**
   * Get all team members, optionally filtered by team ID
   */
  getTeamMembers: async (teamId?: string): Promise<TeamMember[]> => {
    await delay(300);
    
    if (!teamId) {
      return [...mockTeamMembers];
    }
    
    const team = mockTeams.find(t => t.id === teamId);
    if (!team) return [];
    
    // Return members that belong to the specified team
    return team.members.map(member => ({ ...member }));
  },

  /**
   * Get a specific team member by ID
   */
  getTeamMemberById: async (memberId: string): Promise<TeamMember | null> => {
    await delay(200);
    const member = mockTeamMembers.find(m => m.id === memberId);
    return member ? { ...member } : null;
  },

  /**
   * Create a new team member
   */
  createTeamMember: async (member: Omit<TeamMember, 'id' | 'createdAt' | 'updatedAt'>): Promise<TeamMember> => {
    await delay(400);
    const newMember: TeamMember = {
      ...member,
      id: `member-${mockTeamMembers.length + 1}`,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    mockTeamMembers.push(newMember);
    return { ...newMember };
  },

  /**
   * Update an existing team member
   */
  updateTeamMember: async (memberId: string, memberUpdate: Partial<TeamMember>): Promise<TeamMember | null> => {
    await delay(300);
    const memberIndex = mockTeamMembers.findIndex(m => m.id === memberId);
    
    if (memberIndex === -1) return null;
    
    const updatedMember = {
      ...mockTeamMembers[memberIndex],
      ...memberUpdate,
      updatedAt: new Date()
    };
    
    mockTeamMembers[memberIndex] = updatedMember;
    return { ...updatedMember };
  },

  /**
   * Delete a team member
   */
  deleteTeamMember: async (memberId: string): Promise<boolean> => {
    await delay(300);
    const memberIndex = mockTeamMembers.findIndex(m => m.id === memberId);
    
    if (memberIndex === -1) return false;
    
    mockTeamMembers.splice(memberIndex, 1);
    
    // Also remove this member from any teams they belong to
    for (const team of mockTeams) {
      team.members = team.members.filter(m => m.id !== memberId);
    }
    
    return true;
  },

  /**
   * Add a member to a team
   */
  addMemberToTeam: async (teamId: string, memberId: string): Promise<boolean> => {
    await delay(200);
    const team = mockTeams.find(t => t.id === teamId);
    const member = mockTeamMembers.find(m => m.id === memberId);
    
    if (!team || !member) return false;
    
    // Check if member is already in the team
    if (team.members.some(m => m.id === memberId)) {
      return true; // Already a member
    }
    
    team.members.push(member);
    return true;
  },

  /**
   * Remove a member from a team
   */
  removeMemberFromTeam: async (teamId: string, memberId: string): Promise<boolean> => {
    await delay(200);
    const team = mockTeams.find(t => t.id === teamId);
    
    if (!team) return false;
    
    const initialLength = team.members.length;
    team.members = team.members.filter(m => m.id !== memberId);
    
    return team.members.length !== initialLength;
  }
};