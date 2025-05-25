import { apiRequest, HttpMethod } from './baseApi';
import { Team, TeamMember } from '@/interfaces/team';

const TEAMS_ENDPOINT = '/teams';
const TEAM_MEMBERS_ENDPOINT = '/team-members';

/**
 * Service for handling team-related API operations
 */
export const teamsApi = {
  /**
   * Get all teams
   */
  getTeams: async () => {
    return apiRequest<Team[]>(TEAMS_ENDPOINT);
  },

  /**
   * Get a specific team by ID
   */
  getTeamById: async (teamId: string) => {
    return apiRequest<Team>(`${TEAMS_ENDPOINT}/${teamId}`);
  },

  /**
   * Create a new team
   */
  createTeam: async (team: Omit<Team, 'id' | 'createdAt' | 'updatedAt'>) => {
    return apiRequest<Team>(TEAMS_ENDPOINT, {
      method: HttpMethod.POST,
      body: team
    });
  },

  /**
   * Update an existing team
   */
  updateTeam: async (teamId: string, team: Partial<Team>) => {
    return apiRequest<Team>(`${TEAMS_ENDPOINT}/${teamId}`, {
      method: HttpMethod.PUT,
      body: team
    });
  },

  /**
   * Delete a team
   */
  deleteTeam: async (teamId: string) => {
    return apiRequest(`${TEAMS_ENDPOINT}/${teamId}`, {
      method: HttpMethod.DELETE
    });
  },

  /**
   * Get all team members
   */
  getTeamMembers: async (teamId?: string) => {
    const params = teamId ? { teamId } : undefined;
    return apiRequest<TeamMember[]>(TEAM_MEMBERS_ENDPOINT, { params });
  },

  /**
   * Get a specific team member by ID
   */
  getTeamMemberById: async (memberId: string) => {
    return apiRequest<TeamMember>(`${TEAM_MEMBERS_ENDPOINT}/${memberId}`);
  },

  /**
   * Create a new team member
   */
  createTeamMember: async (member: Omit<TeamMember, 'id' | 'createdAt' | 'updatedAt'>) => {
    return apiRequest<TeamMember>(TEAM_MEMBERS_ENDPOINT, {
      method: HttpMethod.POST,
      body: member
    });
  },

  /**
   * Update an existing team member
   */
  updateTeamMember: async (memberId: string, member: Partial<TeamMember>) => {
    return apiRequest<TeamMember>(`${TEAM_MEMBERS_ENDPOINT}/${memberId}`, {
      method: HttpMethod.PUT,
      body: member
    });
  },

  /**
   * Delete a team member
   */
  deleteTeamMember: async (memberId: string) => {
    return apiRequest(`${TEAM_MEMBERS_ENDPOINT}/${memberId}`, {
      method: HttpMethod.DELETE
    });
  }
};