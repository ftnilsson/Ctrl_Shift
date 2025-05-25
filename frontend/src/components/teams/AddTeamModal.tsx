import React, { useState } from 'react';
import { Team } from '@/interfaces/team';

interface AddTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (team: Omit<Team, 'id' | 'members' | 'createdAt' | 'updatedAt'>) => void;
}

const AddTeamModal: React.FC<AddTeamModalProps> = ({
  isOpen,
  onClose,
  onSave
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newTeam: Omit<Team, 'id' | 'members' | 'createdAt' | 'updatedAt'> = {
      name,
      description
    };
    
    onSave(newTeam);
    resetForm();
  };
  
  const resetForm = () => {
    setName('');
    setDescription('');
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6 transition-colors">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold dark:text-white">Create New Team</h3>
          <button 
            onClick={() => {
              resetForm();
              onClose();
            }}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Team Name*
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md dark:bg-gray-700 dark:text-white"
                required
                placeholder="e.g. Frontend Team"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md dark:bg-gray-700 dark:text-white"
                rows={4}
                placeholder="Brief description of the team's responsibilities"
              ></textarea>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => {
                resetForm();
                onClose();
              }}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md text-sm font-medium text-white transition-colors"
            >
              Create Team
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTeamModal;