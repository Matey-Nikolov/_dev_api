import { getEvents } from "../axiosrequests/apiEvents";
import { findClientById } from "./clientServiceFolder/clientSevice";
import getWebsiteServiceInstance from "./websiteService";

let clientEvents;

const fetchEvents = async (clientId) => {
    try {
      const events = await getEvents(clientId);
      let soretedEvents =  events.sort(compareByTime);

      soretedEvents = await removeExistedWebsite(soretedEvents, clientId);

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

const regex = /(?:https?:\/\/www\.)?(?<hostname>[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b)([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/;

const removeExistedWebsite = async (soretedEvents, clientId) => {
  const websiteInformation = getWebsiteServiceInstance(clientId);
  const findAllowWebsites = await websiteInformation.allowWebsite('allow');

  soretedEvents = soretedEvents.filter(event => {

    const match = event.name.match(regex);
    if (match && match.groups && match.groups.hostname) {

      return !findAllowWebsites.has(match.groups.hostname);
    }

    return true;
  });

  return soretedEvents;
};

const findClientEvents = (currentClient_id) => {
  clientEvents = findClientById(currentClient_id);
  
  if (clientEvents !== -1) {
    return clientEvents.events;
  };

  return [];
};

const updateEventsForClient = (events, eventsId) => {
  const updateEvents = events.filter(event => event.id !== eventsId);

  clientEvents.updateEvents(updateEvents);

  return clientEvents.events;
};

export { fetchEvents, findClientEvents, updateEventsForClient };