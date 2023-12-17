import { callAllEvents, callFilterWebsiteEvents, divApp } from '../../Global/globalInport.js';

import { tableEventTemplate, render, welcomePage, emptyError } from '../../Global/globalLit.js';

import { pagesTable } from '../../Js/global.js';

let events = {};

const eventAllRouter = () =>{
    page.redirect('/events/all');
};

const eventWebsiteRouter = () =>{
    page.redirect('/events/websites');
};

page('/events/all', async () =>{
    events = await callAllEvents();

    empty('No events from past 24 hours.');

    pagesTable('event');
});

page('/events/websites', async () =>{
    events = await callFilterWebsiteEvents();

    empty('No events from type web.');

    pagesTable('event');
});

function empty(message){
    if (events.items.length  === 0 ) {
        render(welcomePage(tableEventTemplate(events, emptyError(message))), divApp);
    }else{
        render(welcomePage(tableEventTemplate(events)), divApp);
    }
}

export { eventAllRouter, eventWebsiteRouter };