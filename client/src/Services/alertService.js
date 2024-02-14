import { getAlerts } from "../axiosrequests/apiAlert";

let sortedAlerts = {
    'items': {},
};

async function getAlersFromApi() {
    const alertsData = await getAlerts();

    sortedAlerts.items = Object.values(alertsData.items).sort(compareByTime);
    //sortedAlerts.pages = alertsData.pages;

    return sortedAlerts;
}

function compareByTime(a, b) {
    const timeA = new Date(a.raisedAt);
    const timeB = new Date(b.raisedAt);

    return timeB - timeA;
}

function countAlerts(alertsData){

    let countLowAlerts = alertsData.items.filter(x => x.severity === 'low').length;
    let countMediumAlerts = alertsData.items.filter(x => x.severity === 'medium').length;
    let countHighAlerts = alertsData.items.filter(x => x.severity === 'high').length;

    return { 
        'low': countLowAlerts, 
        'medium': countMediumAlerts, 
        'high': countHighAlerts 
    };
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

const fetchAlerts = async (filter, setData) => {
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
                alertsData = await getAlersFromApi();
                break;
        }

        setData(alertsData);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export { getAlersFromApi, fetchAlerts, countAlerts };