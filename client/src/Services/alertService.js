import { getAlerts, takeActionAlert } from "../axiosrequests/apiAlert";

/** @type {Object} */
let clientAlerts;

/**
 * Get alerts from API.
 * @async
 * @param {string} clientId - The ID of the client.
 * @returns {Promise<Object>} The alerts data.
 */
async function getAlersFromApi(clientId) {
    const alertsData = await getAlerts(clientId);

    const localSortedAlerts = JSON.parse(JSON.stringify(alertsData.items));

    localSortedAlerts.items = Object.values(alertsData.items).sort(compareByTime);

    return localSortedAlerts.items;
};

/**
 * Compare by time.
 * @param {Object} a - The first object.
 * @param {Object} b - The second object.
 * @returns {number} The comparison result.
 */
function compareByTime(a, b) {
    const timeA = new Date(a.raisedAt);
    const timeB = new Date(b.raisedAt);

    return timeB - timeA;
};

/**
 * Find client alerts.
 * @param {string} currentClient_id - The ID of the current client.
 * @returns {Array} The alerts items.
 */
const findClientAlerts = async (currentClient_id) => {
    clientAlerts = await getAlersFromApi(currentClient_id);

    if (clientAlerts !== -1) {
        return clientAlerts;
    };

    return [];
};
  
/**
 * Filter items.
 * @param {Array} data - The data to filter.
 * @param {string} filter - The filter to apply.
 * @returns {Array} The filtered items.
 */
const filterItems = (data, filter) => {
    let filteredItemsBySeverity;

    switch (filter) {
        case 'low':
        case 'medium':
        case 'high':
            filteredItemsBySeverity = data.filter((x) => x.severity === filter);
        break;
        default:
            filteredItemsBySeverity = data;
        break;
    };

    return filteredItemsBySeverity;
};
  
/**
 * Search items.
 * @param {Array} filteredItems - The filtered items.
 * @param {string} searchTerm - The search term.
 * @returns {Array} The searched items.
 */
const searchItems = (filteredItems, searchTerm) => {
    return filteredItems.filter(
      (value) =>
        value.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
        value.severity.toLowerCase().includes(searchTerm.toLowerCase()) ||
        value.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        value.raisedAt.toLowerCase().includes(searchTerm.toLowerCase())
    );
};

/**
 * Take action.
 * @async
 * @param {string} clientId - The ID of the client.
 * @param {string} alertId - The ID of the alert.
 * @param {string} action - The action to take.
 * @returns {Promise<boolean>} The success status.
 */
const takeAction = async (clientId, alertId, action) =>{
    const successAndAlers = await takeActionAlert(clientId, alertId, action);

    clientAlerts = successAndAlers.alerts;

    return successAndAlers;
};

export { getAlersFromApi };
export { findClientAlerts, filterItems, searchItems, takeAction };