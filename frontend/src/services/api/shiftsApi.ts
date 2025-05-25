import { apiRequest, HttpMethod } from './baseApi';
import { Shift, ShiftCreationParams, ShiftUpdateParams } from '@/interfaces/shift';

const SHIFTS_ENDPOINT = '/shifts';

/**
 * Service for handling shift-related API operations
 */
export const shiftsApi = {
  /**
   * Get all shifts, with optional filtering
   */
  getShifts: async (params?: {
    startDate?: string;
    endDate?: string;
    teamId?: string;
    assigneeId?: string;
  }) => {
    return apiRequest<Shift[]>(SHIFTS_ENDPOINT, {
      params: params as Record<string, string>
    });
  },

  /**
   * Get a specific shift by ID
   */
  getShiftById: async (shiftId: string) => {
    return apiRequest<Shift>(`${SHIFTS_ENDPOINT}/${shiftId}`);
  },

  /**
   * Create a new shift
   */
  createShift: async (shift: ShiftCreationParams) => {
    return apiRequest<Shift>(SHIFTS_ENDPOINT, {
      method: HttpMethod.POST,
      body: shift
    });
  },

  /**
   * Update an existing shift
   */
  updateShift: async (shiftId: string, shift: ShiftUpdateParams) => {
    return apiRequest<Shift>(`${SHIFTS_ENDPOINT}/${shiftId}`, {
      method: HttpMethod.PUT,
      body: shift
    });
  },

  /**
   * Delete a shift
   */
  deleteShift: async (shiftId: string) => {
    return apiRequest(`${SHIFTS_ENDPOINT}/${shiftId}`, {
      method: HttpMethod.DELETE
    });
  }
};