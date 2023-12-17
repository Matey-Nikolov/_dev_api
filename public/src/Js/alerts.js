let sortedAlerts = {
    'items': {},
    'pages': {}
};

async function getAlerts(){
    const alertsData = await fetch('/data/alerts')
    .then(response => response.json())
    .catch(error => console.log('error', error));

    sortedAlerts.items = Object.values(alertsData.items).sort(compareByTime);
    sortedAlerts.pages = alertsData.pages;

    return sortedAlerts;
};

function compareByTime(a, b) {
    const timeA = new Date(a.raisedAt);
    const timeB = new Date(b.raisedAt);

    if (timeA > timeB) 
        return -1;

    if (timeA < timeB) 
        return 1;

    return 0;
}

let filteredAlerts = {
    'items': {},
    'pages': {}
};

// fix - name - alersFilterLow or filterAlers_Low_By_Severity
function filterLow(){

    filteredAlerts.items = sortedAlerts.items.filter(x => x.severity === 'low');
    filteredAlerts.pages = sortedAlerts.pages;

    return filteredAlerts;
};

function filterMedium(){

    filteredAlerts.items = sortedAlerts.items.filter(x => x.severity === 'medium');
    filteredAlerts.pages = sortedAlerts.pages;

    return filteredAlerts;
};

function filterHigh(){

    filteredAlerts.items = sortedAlerts.items.filter(x => x.severity === 'high');
    filteredAlerts.pages = sortedAlerts.pages;

    return filteredAlerts;
};

export { getAlerts, filterLow, filterMedium, filterHigh };