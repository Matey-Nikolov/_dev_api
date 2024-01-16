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

export { fetchEvents };