import { getAlerts } from "../axiosrequests/apiAlert";
let sortedAlerts = {
    'items': {},
};

async function getAlers(dataAccess) {
    const alertsData = await getAlerts(dataAccess.tokenTenat, dataAccess.tenetId);

    sortedAlerts.items = Object.values(alertsData.items).sort(compareByTime);
    //sortedAlerts.pages = alertsData.pages;

    return sortedAlerts;
}

function compareByTime(a, b) {
    const timeA = new Date(a.raisedAt);
    const timeB = new Date(b.raisedAt);

    return timeB - timeA;
}

function filterAlerts(source, severity) {
    if (severity === 'all') {
        return source;
    }

    const result = {
        items: source.items.filter(x => x.severity === severity),
    };

    return result;
}

const fetchAlerts = async (filter, useDataGetAlerts, setData) => {
    try {
        let alertsData;

        console.log(filter);
        switch (filter) {
            case 'all':
                alertsData = filterAlerts(sortedAlerts, filter);
                break;
            case 'low':
            case 'medium':
            case 'high':
                alertsData = filterAlerts(sortedAlerts, filter);
                break;
            default:
                alertsData = await getAlers(useDataGetAlerts);
                break;
        }

        setData(alertsData);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export default fetchAlerts;