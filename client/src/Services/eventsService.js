import { getEvents } from "../axiosrequests/apiEvents";
import { findClientById } from "./clientServiceFolder/clientSevice";

const fetchEvents = async (clientId) => {
    try {
      const events = await getEvents(clientId);
      const soretedEvents =  events.sort(compareByTime);

      return soretedEvents;
    } catch (error) {
      console.error('Error fetching endpoints:', error);
      throw error;
    }
};

function compareByTime(a, b) {
  const timeA = new Date(a.when);
  const timeB = new Date(b.when);

  return timeB - timeA;
};

const findClientEvents = (currentClient_id) => {
  const client = findClientById(currentClient_id);
  
  if (client !== -1) {
    return client.events;
  };

  return [];
};

export { fetchEvents, findClientEvents };