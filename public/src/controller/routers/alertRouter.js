import { divApp } from '../../controller/homeController.js';

import { getAlerts, filterLow, filterMedium, filterHigh} from '../../Global/globalInport.js';

import { tableAlertTemplate, render, welcomePage } from '../../Global/globalLit.js';

import { pagesTable } from '../../Js/global.js';

let alerts = {};

const alertRouter = async () =>{
    page.redirect('/alerts/all');
    alerts = await getAlerts();

    pagesTable('alert');

    if (alerts.items.length  === 0 ) {
        render(welcomePage(emptyError('No alerts')), divApp);
    }else{
        render(welcomePage(tableAlertTemplate(alerts)), divApp);
    }
};

const alertLowRouter = () =>{
    page.redirect('/alerts/low');
    alerts = filterLow();

    pagesTable('alert');

    if (alerts.items.length  === 0 ) {
        render(welcomePage(tableAlertTemplate(alerts, emptyError('No alerts from type low.'))), divApp);
    }else{
        render(welcomePage(tableAlertTemplate(alerts)), divApp);
    }
};

const alertMediumRouter = () =>{
    page.redirect('/alerts/medium');
    alerts = filterMedium();

    pagesTable('alert');

    if (alerts.items.length  === 0 ) {
        render(welcomePage(tableAlertTemplate(alerts, emptyError('No alerts from type medium.'))), divApp);
    }else{
        render(welcomePage(tableAlertTemplate(alerts)), divApp);
    }
};

const alertHighRouter = () =>{
    page.redirect('/alerts/high');
    alerts = filterHigh();

    pagesTable('alert');

    if (alerts.items.length  === 0 ) {
        render(welcomePage(tableAlertTemplate(alerts, emptyError('No alerts from type high.'))), divApp);
    }else{
        render(welcomePage(tableAlertTemplate(alerts)), divApp);
    }
};

export { alertRouter, alertLowRouter, alertMediumRouter, alertHighRouter };