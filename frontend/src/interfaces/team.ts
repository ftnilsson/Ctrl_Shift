export enum TeamRole {
  DEVELOPER = 'developer',
  QA = 'qa',
  DEVOPS = 'devops',
  MANAGER = 'manager',
  DESIGNER = 'designer',
  OTHER = 'other',
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: TeamRole;
  title?: string;
  avatar?: string;
  phone?: string;
  slackId?: string;
  pagerDutyId?: string;
  availabilityHours?: AvailabilityHours;
  timeZone?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AvailabilityHours {
  monday?: DailyHours;
  tuesday?: DailyHours;
  wednesday?: DailyHours;
  thursday?: DailyHours;
  friday?: DailyHours;
  saturday?: DailyHours;
  sunday?: DailyHours;
}

export interface DailyHours {
  isAvailable: boolean;
  startTime?: string; // Format: "HH:MM" (24-hour)
  endTime?: string; // Format: "HH:MM" (24-hour)
}

export interface Team {
  id: string;
  name: string;
  description?: string;
  members: TeamMember[];
  createdAt?: Date;
  updatedAt?: Date;
}