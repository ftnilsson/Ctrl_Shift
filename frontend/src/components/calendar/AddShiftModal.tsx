import React, { useState } from 'react';
import { CalendarEvent, ShiftType, ShiftStatus } from '@/interfaces/shift';
import { TeamMember } from '@/interfaces/team';
import styles from './AddShiftModal.module.css';

interface AddShiftModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: CalendarEvent) => void;
  date: Date;
  teamMembers?: TeamMember[];
}

const AddShiftModal: React.FC<AddShiftModalProps> = ({
  isOpen,
  onClose,
  onSave,
  date,
  teamMembers = []
}) => {
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('08:00');
  const [endTime, setEndTime] = useState('17:00');
  const [shiftType, setShiftType] = useState<ShiftType>(ShiftType.PRIMARY);
  const [assignee, setAssignee] = useState('');
  const [description, setDescription] = useState('');
  
  if (!isOpen) return null;

  const formatDateForInput = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create date strings in ISO format
    const startDateStr = `${formatDateForInput(date)}T${startTime}:00`;
    const endDateStr = `${formatDateForInput(date)}T${endTime}:00`;
    
    // Create the calendar event
    const newEvent: CalendarEvent = {
      id: `event-${Date.now()}`,
      title,
      start: startDateStr,
      end: endDateStr,
      resourceId: assignee || 'unassigned',
      color: getColorForShiftType(shiftType),
      extendedProps: {
        type: shiftType,
        status: ShiftStatus.SCHEDULED,
        description: description
      }
    };
    
    onSave(newEvent);
    onClose();
  };
  
  const getColorForShiftType = (type: ShiftType): string => {
    switch(type) {
      case ShiftType.PRIMARY:
        return '#4338ca'; // Indigo
      case ShiftType.BACKUP:
        return '#8b5cf6'; // Purple
      case ShiftType.NIGHT:
        return '#4f46e5'; // Blue
      case ShiftType.WEEKEND:
        return '#0ea5e9'; // Sky
      case ShiftType.HOLIDAY:
        return '#ef4444'; // Red
      default:
        return '#4f46e5'; // Default blue
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <h2 className={styles.modalTitle}>Add New Shift</h2>
        
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Shift Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={styles.formInput}
              required 
              placeholder='Enter shift title'
            />
          </div>
          
          <div className={styles.formGrid}>
            <div>
              <label className={styles.formLabel}>Start Time</label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className={styles.formInput}
                required
                placeholder='8:00 AM'
              />
            </div>
            <div>
              <label className={styles.formLabel}>End Time</label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className={styles.formInput}
                required
                placeholder='5:00 PM'
              />
            </div>
          </div>
          
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Shift Type</label>
            <select
              value={shiftType}
              onChange={(e) => setShiftType(e.target.value as ShiftType)}
              className={styles.formInput}
              required
            >
              {Object.values(ShiftType).map(type => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>
          
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Assignee</label>
            <select
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
              className={styles.formInput}
            >
              <option value="">Unassigned</option>
              {teamMembers.map(member => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={styles.formTextarea}
              rows={3}
            />
          </div>
          
          <div className={styles.buttonContainer}>
            <button 
              type="button" 
              onClick={onClose}
              className={styles.cancelButton}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className={styles.saveButton}
            >
              Save Shift
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddShiftModal;