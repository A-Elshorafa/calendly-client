const pages = {
  LOGIN: '/login',
  EVENTS_DASHBORAD: '/events-dashboard',
  MEETING_DETAILS: '/create-event/meeting-summary',
  SUCCESSFUL_CREATION: '/create-event/successful-creation',
  ATTENDEE_DETAILS: '/event-subscription/attendee-details',
  SELECT_AVAILABLE_DATES: '/create-event/select-available-dates',
  APPOINTMENT_SELECTION: `/event-subscription/[id]/[custom_link]?`,
  EVENT_DETAILS_PENDING: eventId => `/event-details/${eventId}/pending/`,
  SUCCESSFUL_SUBSCRIPTION: '/event-subscription/successful-subscription',
  EVENT_DETAILS_UPCOMING: eventId => `/event-details/${eventId}/upcoming/`,
}

export default pages;