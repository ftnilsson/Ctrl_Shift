
export enum ShiftType {
  PRIMARY = 'primary',
  BACKUP = 'backup',
  NIGHT = 'night',
  WEEKEND = 'weekend',
  HOLIDAY = 'holiday',
}

export enum ShiftStatus {
  SCHEDULED = 'scheduled',
  ACTIVE = 'active',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export interface Shift {
  id: string;
  title: string;
  start: Date | string;
  end: Date | string;
  allDay?: boolean;
  type: ShiftType;
  status: ShiftStatus;
  assignee: string; // Team member ID
  description?: string;
  color?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  resourceId?: string;
  allDay?: boolean;
  color?: string;
  extendedProps?: {
    description?: string;
    type?: ShiftType;
    status?: ShiftStatus;
  };
}

export interface ShiftCreationParams {
  title: string;
  start: Date | string;
  end: Date | string;
  type: ShiftType;
  assignee: string;
  description?: string;
}

export interface ShiftUpdateParams {
  id: string;
  title?: string;
  start?: Date | string;
  end?: Date | string;
  type?: ShiftType;
  status?: ShiftStatus;
  assignee?: string;
  description?: string;
  color?: string;
}