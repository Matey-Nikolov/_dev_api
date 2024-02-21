import { getEvents } from "../axiosrequests/apiEvents";

const fetchEvents = async (clientId) => {
    try {
      const events = await getEvents(clientId);
      
      return events;
    } catch (error) {
      console.error('Error fetching endpoints:', error);
      throw error;
    }
};

const hasEvents = (events) => {
  return events.items != [] ?  -1 : events.items.length;
};

export { fetchEvents, hasEvents };