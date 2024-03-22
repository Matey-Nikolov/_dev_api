import { getEvents } from "../axiosrequests/apiEvents";
import { findClientById } from "./clientServiceFolder/clientSevice";
import getWebsiteServiceInstance from "./websiteService";

let clientEvents;

/**
 * Fetches events for a given client ID.
 * @param {string} clientId - The ID of the client.
 * @returns {Promise<Array>} A promise that resolves to an array of sorted events.
 */
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

/**
 * Compares two events by time.
 * @param {Object} a - The first event.
 * @param {Object} b - The second event.
 * @returns {number} The difference in time between the two events.
 */
function compareByTime(a, b) {
  const timeA = new Date(a.when);
  const timeB = new Date(b.when);

  return timeB - timeA;
};

const regex = /(?:https?:\/\/www\.)?(?<hostname>[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b)([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/;

/**
 * Removes events that exist on the website.
 * @param {Array} soretedEvents - The sorted events.
 * @param {string} clientId - The ID of the client.
 * @returns {Promise<Array>} A promise that resolves to an array of filtered events.
 */
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

/**
 * Finds events for a given client ID.
 * @param {string} currentClient_id - The ID of the client.
 * @returns {Array} An array of events for the client.
 */
const findClientEvents = (currentClient_id) => {
  clientEvents = findClientById(currentClient_id);
  
  if (clientEvents !== -1) {
    return clientEvents.events;
  };

  return [];
};

/**
 * Updates events for a given client.
 * @param {Array} events - The current events.
 * @param {string} eventsId - The ID of the event to update.
 * @returns {Array} An array of updated events for the client.
 */
const updateEventsForClient = (events, eventsId) => {
  const updateEvents = events.filter(event => event.id !== eventsId);

  clientEvents.updateEvents(updateEvents);

  return clientEvents.events;
};

export { fetchEvents, findClientEvents, updateEventsForClient };