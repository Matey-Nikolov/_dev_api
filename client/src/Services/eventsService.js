import { getEvents } from "../axiosrequests/apiEvents";

const fetchEvents = async (dataAccess) => {
    try {
      const events = await getEvents(dataAccess.tokenTenat, dataAccess.tenetId);
      
      return events;
    } catch (error) {
      console.error('Error fetching endpoints:', error);
      throw error;
    }
};

const hasEvents = async (dataAccess) => {
  const events = await  fetchEvents(dataAccess); 

  return events.items != [] ?  -1 : events.items.length;
};

export { fetchEvents, hasEvents };