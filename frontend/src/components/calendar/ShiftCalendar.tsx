"use client";
import React, { useState, useMemo, useEffect} from 'react';
import { CalendarEvent, ShiftType, ShiftStatus, Shift } from '@/interfaces/shift';
import AddShiftModal from './AddShiftModal';
import styles from './ShiftCalendar.module.css';

interface ShiftCalendarProps {
  initialEvents?: CalendarEvent[];
  onEventAdded?: (event: CalendarEvent) => void;
  onEventChanged?: (event: CalendarEvent) => void;
  onEventDeleted?: (eventId: string) => void;
}

const ShiftCalendar: React.FC<ShiftCalendarProps> = ({
  initialEvents = [],
  //onEventAdded,
  //onEventChanged,
  onEventDeleted,
}) => {
  // Current date state for navigation
  const [currentDate, setCurrentDate] = useState(() => new Date(2025, 4, 4)); // May 4, 2025
  const [currentView, setCurrentView] = useState<'month' | 'week' | 'day'>('month');
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  
  // Sample initial shifts (events) for demonstration
  const demoEvents = useMemo(() => {
    const year = 2025;
    const month = 4; // May (0-indexed)
    const day = 4;
    
    return [
      {
        id: '1',
        title: 'Primary On-Call Shift',
        start: `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}T08:00:00`,
        end: `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}T20:00:00`,
        resourceId: 'member1',
        color: '#4338ca',
        extendedProps: {
          type: ShiftType.PRIMARY,
          status: ShiftStatus.SCHEDULED,
          description: 'Primary on-call rotation'
        }
      },
      {
        id: '2',
        title: 'Backup On-Call',
        start: `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}T08:00:00`,
        end: `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}T20:00:00`,
        resourceId: 'member2',
        color: '#8b5cf6',
        extendedProps: {
          type: ShiftType.BACKUP,
          status: ShiftStatus.SCHEDULED,
          description: 'Backup support'
        }
      },
      {
        id: '3',
        title: 'Night Shift',
        start: `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}T20:00:00`,
        end: `${year}-${String(month + 1).padStart(2, '0')}-${String(day + 1).padStart(2, '0')}T08:00:00`,
        resourceId: 'member3',
        color: '#4f46e5',
        extendedProps: {
          type: ShiftType.NIGHT,
          status: ShiftStatus.SCHEDULED,
          description: 'Overnight coverage'
        }
      },
      {
        id: '4',
        title: 'Weekend On-Call',
        start: `${year}-${String(month + 1).padStart(2, '0')}-${String(day + 2).padStart(2, '0')}T08:00:00`,
        end: `${year}-${String(month + 1).padStart(2, '0')}-${String(day + 3).padStart(2, '0')}T08:00:00`,
        resourceId: 'member4',
        color: '#0ea5e9',
        extendedProps: {
          type: ShiftType.WEEKEND,
          status: ShiftStatus.SCHEDULED,
          description: 'Weekend coverage for all systems'
        }
      }
    ];
  }, []);
  
  // Initialize events with initialEvents or demo events
  useEffect(() => {
    if (initialEvents && initialEvents.length > 0) {
      setEvents(initialEvents);
    } else {
      setEvents(demoEvents);
    }
  }, [initialEvents, demoEvents]);
  
  // Event change handler that would use onEventChanged prop
  // const handleEventChange = (updatedEvent: CalendarEvent) => {
  //   if (onEventChanged) {
  //     onEventChanged(updatedEvent);
  //   }
  // };

  // Check if a date is today (for this demo, "today" is May 4, 2025)
  const isToday = (date: Date) => {
    const today = new Date(2025, 4, 4); // May 4, 2025
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };

  // Calculate calendar grid data based on current date
  const calendarData = useMemo(() => {
    try {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      
      // Get first day of the month and how many days in month
      const firstDayOfMonth = new Date(year, month, 1);
      const lastDayOfMonth = new Date(year, month + 1, 0);
      const daysInMonth = lastDayOfMonth.getDate();
      
      // Get day of week of first day (0 = Sunday, 1 = Monday, etc)
      const firstDayOfWeek = firstDayOfMonth.getDay();
      
      // Calculate days from previous month to display
      const daysFromPrevMonth = firstDayOfWeek;
      
      // Calculate days from next month to display to complete the grid
      const totalDaysDisplayed = Math.ceil((daysInMonth + daysFromPrevMonth) / 7) * 7;
      const daysFromNextMonth = totalDaysDisplayed - daysInMonth - daysFromPrevMonth;
      
      // Create calendar grid
      const calendarDays = [];
      
      // Add previous month's days
      const prevMonth = month === 0 ? 11 : month - 1;
      const prevMonthYear = month === 0 ? year - 1 : year;
      const daysInPrevMonth = new Date(prevMonthYear, prevMonth + 1, 0).getDate();
      
      for (let i = 0; i < daysFromPrevMonth; i++) {
        const dayNumber = daysInPrevMonth - daysFromPrevMonth + i + 1;
        calendarDays.push({
          date: new Date(prevMonthYear, prevMonth, dayNumber),
          dayNumber,
          isCurrentMonth: false,
          isPrevMonth: true,
          isNextMonth: false
        });
      }
      
      // Add current month's days
      for (let i = 1; i <= daysInMonth; i++) {
        const date = new Date(year, month, i);
        calendarDays.push({
          date,
          dayNumber: i,
          isCurrentMonth: true,
          isPrevMonth: false,
          isNextMonth: false,
          isToday: isToday(date)
        });
      }
      
      // Add next month's days
      const nextMonth = month === 11 ? 0 : month + 1;
      const nextMonthYear = month === 11 ? year + 1 : year;
      
      for (let i = 1; i <= daysFromNextMonth; i++) {
        calendarDays.push({
          date: new Date(nextMonthYear, nextMonth, i),
          dayNumber: i,
          isCurrentMonth: false,
          isPrevMonth: false,
          isNextMonth: true
        });
      }
      
      // Group days into weeks
      const weeks = [];
      for (let i = 0; i < calendarDays.length; i += 7) {
        weeks.push(calendarDays.slice(i, i + 7));
      }
      
      return {
        year,
        month,
        weeks,
        monthName: new Date(year, month).toLocaleString('default', { month: 'long' })
      };
    } catch (error) {
      console.error("Error in calendarData calculation:", error);
      // Return fallback data
      return {
        year: 2025,
        month: 4,
        weeks: [],
        monthName: "May"
      };
    }
  }, [currentDate]);

  // Navigation functions
  const goToPrevMonth = () => {
    setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1));
  };
  
  const goToNextMonth = () => {
    setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1));
  };
  
  const goToToday = () => {
    setCurrentDate(new Date(2025, 4, 4)); // May 4, 2025
  };

  // Find events for a specific day
  const getEventsForDay = (date: Date) => {
    try {
      if (!events || events.length === 0) return [];
      
      const dateStr = date.toISOString().split('T')[0]; // YYYY-MM-DD
      return events.filter(event => {
        try {
          const eventStartDate = new Date(event.start);
          const eventStartStr = eventStartDate.toISOString().split('T')[0];
          return eventStartStr === dateStr;
        } catch (error) {
          console.error("Error comparing event dates:", error);
          return false;
        }
      });
    } catch (error) {
      console.error("Error in getEventsForDay:", error);
      return [];
    }
  };

  // Handle adding a new event
  const handleAddEvent = (date: Date) => {
    setSelectedDate(date);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedDate(null);
  };

  const handleSaveShift = (shiftData: Partial<Shift>) => {
    if (selectedDate && shiftData.title) {
      const newEvent: CalendarEvent = {
        id: String(Date.now()),
        title: shiftData.title,
        start: shiftData.start?.toLocaleString() || selectedDate?.toLocaleString(),
        end: shiftData.end?.toLocaleString() || new Date(selectedDate.getTime() + 3600000).toLocaleString(), // Default 1 hour
        extendedProps: {
          type: shiftData.type || ShiftType.PRIMARY,
          status: shiftData.status || ShiftStatus.SCHEDULED,
          description: shiftData.description || ''
        }
      };
      setEvents([...events, newEvent]);
      setModalOpen(false);
      setSelectedDate(null);
      
      // Here you would typically save to APIS
      // Example: saveShift(shiftData)
    }
  };

  // Handle event deletion
  const handleDeleteEvent = (eventId: string, e: React.MouseEvent) => {
    try {
      e.stopPropagation(); // Prevent triggering day click
      
      if (confirm("Are you sure you want to delete this shift?")) {
        const updatedEvents = events.filter(event => event.id !== eventId);
        setEvents(updatedEvents);
        
        if (onEventDeleted) {
          onEventDeleted(eventId);
        }
      }
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <div className={styles.customCalendar}>
      {/* Calendar Header */}
      <div className={styles.calendarHeader}>
        <div className={styles.calendarNavigation}>
          <button onClick={goToPrevMonth} className={styles.navButton}>&lt;</button>
          <h2 className={styles.calendarTitle}>{calendarData.monthName} {calendarData.year}</h2>
          <button onClick={goToNextMonth} className={styles.navButton}>&gt;</button>
        </div>
        <div className={styles.calendarTools}>
          <button onClick={goToToday} className={styles.todayButton}>Today</button>
          <div className={styles.viewSelector}>
            <button 
              className={`${styles.viewButton} ${currentView === 'month' ? styles.active : ''}`}
              onClick={() => setCurrentView('month')}
            >
              Month
            </button>
            <button 
              className={`${styles.viewButton} ${currentView === 'week' ? styles.active : ''}`}
              onClick={() => setCurrentView('week')}
            >
              Week
            </button>
            <button 
              className={`${styles.viewButton} ${currentView === 'day' ? styles.active : ''}`}
              onClick={() => setCurrentView('day')}
            >
              Day
            </button>
          </div>
        </div>
      </div>

      {/* Month View Calendar */}
      {currentView === 'month' && (
        <div className={styles.calendarMonthView}>
          {/* Weekday Headers */}
          <div className={styles.calendarWeekdays}>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className={styles.calendarWeekday}>{day}</div>
            ))}
          </div>
          
          {/* Calendar Grid */}
          <div className={styles.calendarGrid}>
            {calendarData.weeks.map((week, weekIndex) => (
              <div key={`week-${weekIndex}`} className={styles.calendarWeek}>
                {week.map((day, dayIndex) => {
                  // Safely get events for this day
                  const dayEvents = day.date ? getEventsForDay(day.date) : [];
                  
                  return (
                    <div 
                      key={`day-${weekIndex}-${dayIndex}`} 
                      className={`${styles.calendarDay} ${day.isCurrentMonth ? styles.currentMonth : styles.otherMonth} 
                                ${day.isToday ? styles.today : ''}`}
                      onClick={() => handleAddEvent(day.date)}
                    >
                      <div className={styles.dayHeader}>
                        <span className={styles.dayNumber}>{day.dayNumber}</span>
                      </div>
                      
                      {/* Events for this day */}
                      <div className={styles.dayEvents}>
                        {dayEvents && dayEvents.slice(0, 3).map(event => (
                          <div 
                            key={event.id} 
                            className={styles.event}
                            style={{ backgroundColor: event.color || '#4f46e5' }}
                            onClick={(e) => handleDeleteEvent(event.id, e)}
                          >
                            <div className={styles.eventTitle}>{event.title}</div>
                          </div>
                        ))}
                        {dayEvents && dayEvents.length > 3 && (
                          <div className={styles.moreEvents}>+{dayEvents.length - 3} more</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Week View */}
      {currentView === 'week' && (
        <div className={styles.calendarWeekView}>
          <div className={styles.placeholderMessage}>
            Week view coming soon. Switch to Month view to see the calendar.
          </div>
        </div>
      )}

      {/* Day View */}
      {currentView === 'day' && (
        <div className={styles.calendarDayView}>
          <div className={styles.placeholderMessage}>
            Day view coming soon. Switch to Month view to see the calendar.
          </div>
        </div>
      )}

      {/* Add Shift Modal */}
      {modalOpen && selectedDate && (
        <AddShiftModal
          isOpen={modalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveShift}
          date={selectedDate}
        />
      )}
    </div>
  );
};

export default ShiftCalendar;