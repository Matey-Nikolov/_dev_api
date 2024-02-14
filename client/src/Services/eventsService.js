import { getEvents } from "../axiosrequests/apiEvents";

const fetchEvents = async () => {
    try {
      const events = await getEvents();
      
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