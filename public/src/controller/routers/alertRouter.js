import { divApp } from '../../controller/homeController.js';

import { getAlerts, filterLow, filterMedium, filterHigh} from '../../Global/globalInport.js';

import { tableAlertTemplate, render, welcomePage } from '../../Global/globalLit.js';

import { pagesTable } from '../../Js/global.js';

let alerts = {};

const alertRouter = async () =>{
    page.redirect('/alerts/all');
};

const alertLowRouter = () =>{
    page.redirect('/alerts/low');
};

const alertMediumRouter = () =>{
    page.redirect('/alerts/medium');
};

const alertHighRouter = () =>{
    page.redirect('/alerts/high');
};

page('/alerts/all', async () =>{
    alerts = await getAlerts();

    pagesTable('alert');
    empty('No alerts');
});

page('/alerts/low', () =>{
    alerts = filterLow();

    pagesTable('alert');
    empty('No alerts from type low.');
});

page('/alerts/medium', () =>{
    alerts = filterMedium();

    pagesTable('alert');
    empty('No alerts from type medium.');
});

page('/alerts/high', () =>{
    alerts = filterHigh();

    pagesTable('alert');
    empty('No alerts from type high.');
});


function empty(message){
    if (alerts.items.length  === 0 ) {
        render(welcomePage(tableAlertTemplate(alerts, emptyError(message))), divApp);
    }else{
        render(welcomePage(tableAlertTemplate(alerts)), divApp);
    }
}

export { alertRouter, alertLowRouter, alertMediumRouter, alertHighRouter };