import { getAlerts, takeActionAlert } from "../axiosrequests/apiAlert";

import { findClientById } from './clientServiceFolder/clientSevice';

async function getAlersFromApi(clientId) {
    const alertsData = await getAlerts(clientId);

    const localSortedAlerts = JSON.parse(JSON.stringify(alertsData));

    localSortedAlerts.items = Object.values(alertsData.items).sort(compareByTime);

    return localSortedAlerts;
};

function compareByTime(a, b) {
    const timeA = new Date(a.raisedAt);
    const timeB = new Date(b.raisedAt);

    return timeB - timeA;
};

const findClientAlerts = (currentClient_id) => {
    const client = findClientById(currentClient_id);
    
    if (client !== -1) {
      return { alerts: client.alerts, role: client.role };
    };

    return { alerts: null, role: null };
};
  
const filterItems = (data, filter) => {
    let filteredItems;

    switch (filter) {
        case 'low':
        case 'medium':
        case 'high':
        filteredItems = data.items.filter((x) => x.severity === filter);
        break;
        default:
        filteredItems = data.items;
        break;
    };

    return filteredItems;
};
  
const searchItems = (filteredItems, searchTerm) => {
    return filteredItems.filter(
      (value) =>
        value.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
        value.severity.toLowerCase().includes(searchTerm.toLowerCase()) ||
        value.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        value.raisedAt.toLowerCase().includes(searchTerm.toLowerCase())
    );
};

const takeAction = async (clientId, alertId, action) =>{
    const success = await takeActionAlert(clientId, alertId, action);

    return success;
};

export { getAlersFromApi };
export { findClientAlerts, filterItems, searchItems, takeAction };