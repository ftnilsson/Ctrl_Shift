"use client";
import React, { useState, useEffect, useMemo } from 'react';
import { Team, TeamMember } from '@/interfaces/team';
import { teamsMockApi } from '@/services/api/teamsMockApi';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import TeamCard from '@/components/teams/TeamCard';
import TeamMemberCard from '@/components/teams/TeamMemberCard';
import AddMemberModal from '@/components/teams/AddMemberModal';
import AddTeamModal from '@/components/teams/AddTeamModal';
import { useTheme } from '@/features/theme/ThemeContext';

export default function TeamsPage() {
  const { theme } = useTheme();
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddTeamModalOpen, setIsAddTeamModalOpen] = useState(false);
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
  const [allMembers, setAllMembers] = useState<TeamMember[]>([]);
  const [availableMembers, setAvailableMembers] = useState<TeamMember[]>([]);
  
  // Calculate stats
  const stats = useMemo(() => {
    if (!teams.length) return { totalTeams: 0, totalMembers: 0, rolesDistribution: {} };
    
    const uniqueMemberIds = new Set<string>();
    const rolesDistribution: Record<string, number> = {};
    
    teams.forEach(team => {
      team.members.forEach(member => {
        uniqueMemberIds.add(member.id);
        
        if (rolesDistribution[member.role]) {
          rolesDistribution[member.role]++;
        } else {
          rolesDistribution[member.role] = 1;
        }
      });
    });
    
    return {
      totalTeams: teams.length,
      totalMembers: uniqueMemberIds.size,
      rolesDistribution
    };
  }, [teams]);

  useEffect(() => {
    // Fetch teams when component mounts
    const fetchTeams = async () => {
      try {
        setLoading(true);
        const teamsData = await teamsMockApi.getTeams();
        setTeams(teamsData);
        
        // Select the first team by default if available
        if (teamsData.length > 0) {
          setSelectedTeam(teamsData[0]);
        }
        
        // Get all members
        const membersData = await teamsMockApi.getTeamMembers();
        setAllMembers(membersData);
        
      } catch (err) {
        setError('Failed to load teams. Please try again later.');
        console.error('Error fetching teams:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);
  
  // Update available members when selected team changes
  useEffect(() => {
    if (selectedTeam && allMembers.length > 0) {
      const memberIds = new Set(selectedTeam.members.map(m => m.id));
      const available = allMembers.filter(m => !memberIds.has(m.id));
      setAvailableMembers(available);
    } else {
      setAvailableMembers(allMembers);
    }
  }, [selectedTeam, allMembers]);

  // Filter teams based on search query
  const filteredTeams = useMemo(() => {
    if (!searchQuery.trim()) return teams;
    
    const query = searchQuery.toLowerCase();
    return teams.filter(team => 
      team.name.toLowerCase().includes(query) || 
      (team.description && team.description.toLowerCase().includes(query)) ||
      team.members.some(member => 
        member.name.toLowerCase().includes(query) ||
        member.role.toLowerCase().includes(query) ||
        (member.title && member.title.toLowerCase().includes(query))
      )
    );
  }, [teams, searchQuery]);
  
  // Filter team members when there's a search query
  const filteredTeamMembers = useMemo(() => {
    if (!selectedTeam) return [];
    if (!searchQuery.trim()) return selectedTeam.members;
    
    const query = searchQuery.toLowerCase();
    return selectedTeam.members.filter(member => 
      member.name.toLowerCase().includes(query) ||
      member.role.toLowerCase().includes(query) ||
      (member.title && member.title.toLowerCase().includes(query)) ||
      (member.email && member.email.toLowerCase().includes(query))
    );
  }, [selectedTeam, searchQuery]);

  const handleTeamSelect = (team: Team) => {
    setSelectedTeam(team);
  };

  const handleRemoveMember = async (teamId: string, memberId: string) => {
    try {
      const success = await teamsMockApi.removeMemberFromTeam(teamId, memberId);
      if (success) {
        // Update the teams state to reflect the change
        setTeams(prevTeams => 
          prevTeams.map(team => {
            if (team.id === teamId) {
              return {
                ...team,
                members: team.members.filter(member => member.id !== memberId)
              };
            }
            return team;
          })
        );

        // Update selected team if it's the one we modified
        if (selectedTeam?.id === teamId) {
          setSelectedTeam(prevTeam => {
            if (prevTeam) {
              return {
                ...prevTeam,
                members: prevTeam.members.filter(member => member.id !== memberId)
              };
            }
            return prevTeam;
          });
        }
      }
    } catch (err) {
      console.error('Failed to remove team member:', err);
      // Show an error message to the user (could use a toast notification component)
    }
  };
  
  const handleCreateTeam = async (newTeam: Omit<Team, 'id' | 'members' | 'createdAt' | 'updatedAt'>) => {
    try {
      const createdTeam = await teamsMockApi.createTeam({
        ...newTeam,
        members: []
      });
      
      setTeams(prevTeams => [...prevTeams, createdTeam]);
      setSelectedTeam(createdTeam);
      setIsAddTeamModalOpen(false);
    } catch (err) {
      console.error('Failed to create team:', err);
      // Show an error message to the user
    }
  };
  
  const handleAddMember = async (newMember: Omit<TeamMember, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!selectedTeam) return;
    
    try {
      // First create the member
      const createdMember = await teamsMockApi.createTeamMember(newMember);
      
      // Then add them to the selected team
      const success = await teamsMockApi.addMemberToTeam(selectedTeam.id, createdMember.id);
      
      if (success) {
        // Update allMembers state
        setAllMembers(prev => [...prev, createdMember]);
        
        // Update teams state
        setTeams(prevTeams => 
          prevTeams.map(team => {
            if (team.id === selectedTeam.id) {
              return {
                ...team,
                members: [...team.members, createdMember]
              };
            }
            return team;
          })
        );
        
        // Update selected team
        setSelectedTeam(prevTeam => {
          if (prevTeam) {
            return {
              ...prevTeam,
              members: [...prevTeam.members, createdMember]
            };
          }
          return prevTeam;
        });
      }
      
      setIsAddMemberModalOpen(false);
    } catch (err) {
      console.error('Failed to add team member:', err);
      // Show an error message to the user
    }
  };
  
  const handleDeleteTeam = async (teamId: string) => {
    if (!window.confirm('Are you sure you want to delete this team? This action cannot be undone.')) {
      return;
    }
    
    try {
      const success = await teamsMockApi.deleteTeam(teamId);
      if (success) {
        const updatedTeams = teams.filter(team => team.id !== teamId);
        setTeams(updatedTeams);
        
        // If we deleted the selected team, select the first team (if any)
        if (selectedTeam?.id === teamId) {
          setSelectedTeam(updatedTeams.length > 0 ? updatedTeams[0] : null);
        }
      }
    } catch (err) {
      console.error('Failed to delete team:', err);
      // Show an error message to the user
    }
  };

  return (
    <div className={`flex flex-col min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 transition-colors">
        <div className="mb-6">
          <h2 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Teams Management</h2>
          <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            View and manage your on-call teams and their members.
          </p>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className={`rounded-lg shadow-md p-4 transition-colors ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className={`text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{stats.totalTeams}</h3>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Total Teams</p>
          </div>
          <div className={`rounded-lg shadow-md p-4 transition-colors ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className={`text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{stats.totalMembers}</h3>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Team Members</p>
          </div>
          <div className={`rounded-lg shadow-md p-4 transition-colors ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center justify-between">
              {Object.entries(stats.rolesDistribution).length > 0 ? (
                <div className="flex items-center gap-2">
                  {Object.entries(stats.rolesDistribution).map(([role, count]) => (
                    <span 
                      key={role}
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        theme === 'dark' ? 'bg-indigo-900 text-indigo-200' : 'bg-indigo-100 text-indigo-800'
                      }`}
                    >
                      {role}: {count}
                    </span>
                  ))}
                </div>
              ) : (
                <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>No roles data</span>
              )}
            </div>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} mt-2`}>Roles Distribution</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search teams and members..."
              className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white focus:ring-indigo-400' : 'border-gray-300 bg-white text-gray-900 focus:ring-indigo-500'
              }`}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            {searchQuery && (
              <button 
                className="absolute inset-y-0 right-0 pr-3 flex items-center" 
                onClick={() => setSearchQuery('')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : error ? (
          <div className={`rounded-lg shadow-md p-4 transition-colors ${theme === 'dark' ? 'bg-red-900 border border-red-800 text-red-100' : 'bg-red-100 border border-red-400 text-red-700'}`}>
            <span className="block sm:inline">{error}</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Teams sidebar */}
            <div className={`rounded-lg shadow-md transition-colors p-4 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="flex justify-between items-center mb-4">
                <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : ''}`}>Teams</h3>
                <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  {filteredTeams.length} {filteredTeams.length === 1 ? 'team' : 'teams'}
                </span>
              </div>
              
              {filteredTeams.length === 0 ? (
                <div className="text-center py-8">
                  {searchQuery ? (
                    <p className={`text-gray-500 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>No teams match your search</p>
                  ) : (
                    <p className={`text-gray-500 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>No teams available</p>
                  )}
                </div>
              ) : (
                <ul className="space-y-2 max-h-[60vh] overflow-y-auto">
                  {filteredTeams.map((team) => (
                    <li key={team.id}>
                      <TeamCard 
                        team={team} 
                        isSelected={selectedTeam?.id === team.id}
                        onClick={() => handleTeamSelect(team)}
                      />
                    </li>
                  ))}
                </ul>
              )}
              
              <div className={`mt-4 pt-4 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                <button 
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md transition-colors"
                  onClick={() => setIsAddTeamModalOpen(true)}
                >
                  Add New Team
                </button>
              </div>
            </div>

            {/* Team details */}
            <div className={`rounded-lg shadow-md transition-colors p-4 lg:col-span-3 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
              {selectedTeam ? (
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : ''}`}>{selectedTeam.name}</h3>
                      <p className={`mt-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        {selectedTeam.description || 'No description available'}
                      </p>
                      <div className={`text-sm mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        Created: {selectedTeam.createdAt ? new Date(selectedTeam.createdAt).toLocaleDateString() : 'Unknown'}
                        {selectedTeam.updatedAt && ` • Last updated: ${new Date(selectedTeam.updatedAt).toLocaleDateString()}`}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-1 px-3 rounded-md text-sm transition-colors">
                        Edit Team
                      </button>
                      <button 
                        className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded-md text-sm transition-colors"
                        onClick={() => handleDeleteTeam(selectedTeam.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : ''}`}>
                        Team Members
                        <span className={`ml-2 text-sm font-normal ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                          ({filteredTeamMembers.length} {filteredTeamMembers.length === 1 ? 'member' : 'members'})
                        </span>
                      </h4>
                      <button 
                        className="bg-green-600 hover:bg-green-700 text-white py-1 px-3 rounded-md text-sm transition-colors"
                        onClick={() => setIsAddMemberModalOpen(true)}
                      >
                        Add Member
                      </button>
                    </div>

                    {filteredTeamMembers.length === 0 ? (
                      searchQuery ? (
                        <p className={`italic ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                          No members match your search.
                        </p>
                      ) : (
                        <p className={`italic ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                          This team has no members yet.
                        </p>
                      )
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {filteredTeamMembers.map((member) => (
                          <TeamMemberCard
                            key={member.id}
                            member={member}
                            onRemove={() => handleRemoveMember(selectedTeam.id, member.id)}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64">
                  {filteredTeams.length === 0 ? (
                    <div className="text-center">
                      <p className={`mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        No teams found. Create your first team to get started.
                      </p>
                      <button 
                        className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md transition-colors"
                        onClick={() => setIsAddTeamModalOpen(true)}
                      >
                        Create Team
                      </button>
                    </div>
                  ) : (
                    <p className={`mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      Select a team to view details
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Add Team Modal */}
      <AddTeamModal 
        isOpen={isAddTeamModalOpen}
        onClose={() => setIsAddTeamModalOpen(false)}
        onSave={handleCreateTeam}
      />
      
      {/* Add Member Modal */}
      <AddMemberModal
        isOpen={isAddMemberModalOpen}
        onClose={() => setIsAddMemberModalOpen(false)}
        onSave={handleAddMember}
        existingMembers={allMembers}
      />

      <Footer />
    </div>
  );
}