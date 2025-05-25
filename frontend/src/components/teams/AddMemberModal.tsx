import React, { useState } from 'react';
import { TeamMember, TeamRole } from '@/interfaces/team';

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (member: Omit<TeamMember, 'id' | 'createdAt' | 'updatedAt'>) => void;
  existingMembers?: TeamMember[];
}

const AddMemberModal: React.FC<AddMemberModalProps> = ({
  isOpen,
  onClose,
  onSave,
  existingMembers = []
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<TeamRole>(TeamRole.DEVELOPER);
  const [title, setTitle] = useState('');
  const [phone, setPhone] = useState('');
  const [slackId, setSlackId] = useState('');
  const [timeZone, setTimeZone] = useState('America/New_York');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newMember: Omit<TeamMember, 'id' | 'createdAt' | 'updatedAt'> = {
      name,
      email,
      role,
      title,
      phone,
      slackId,
      timeZone
    };
    
    onSave(newMember);
    resetForm();
  };
  
  const resetForm = () => {
    setName('');
    setEmail('');
    setRole(TeamRole.DEVELOPER);
    setTitle('');
    setPhone('');
    setSlackId('');
    setTimeZone('America/New_York');
  };
  
  if (!isOpen) return null;

  // Common time zones
  const timeZones = [
    { value: 'America/New_York', label: 'Eastern Time (ET)' },
    { value: 'America/Chicago', label: 'Central Time (CT)' },
    { value: 'America/Denver', label: 'Mountain Time (MT)' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
    { value: 'Europe/London', label: 'London (GMT)' },
    { value: 'Europe/Berlin', label: 'Central European Time (CET)' },
    { value: 'Asia/Tokyo', label: 'Japan Standard Time (JST)' },
    { value: 'Asia/Seoul', label: 'Korean Standard Time (KST)' },
    { value: 'Australia/Sydney', label: 'Australian Eastern Time (AET)' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto transition-colors">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold dark:text-white">Add Team Member</h3>
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
                Name*
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md dark:bg-gray-700 dark:text-white"
                required
                placeholder="Full name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email*
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md dark:bg-gray-700 dark:text-white"
                required
                placeholder="email@example.com"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Role*
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as TeamRole)}
                  className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md dark:bg-gray-700 dark:text-white"
                  required
                >
                  {Object.values(TeamRole).map((roleOption) => (
                    <option key={roleOption} value={roleOption}>
                      {roleOption.charAt(0).toUpperCase() + roleOption.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Job Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md dark:bg-gray-700 dark:text-white"
                  placeholder="Senior Developer"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md dark:bg-gray-700 dark:text-white"
                placeholder="+1 (555) 123-4567"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Slack ID
              </label>
              <input
                type="text"
                value={slackId}
                onChange={(e) => setSlackId(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md dark:bg-gray-700 dark:text-white"
                placeholder="@username"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Time Zone
              </label>
              <select
                value={timeZone}
                onChange={(e) => setTimeZone(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md dark:bg-gray-700 dark:text-white"
              >
                {timeZones.map((tz) => (
                  <option key={tz.value} value={tz.value}>
                    {tz.label}
                  </option>
                ))}
              </select>
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
              Add Member
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMemberModal;