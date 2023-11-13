import { divApp } from '../../homeController.js';
import { render, welcomePage } from '../../../Global/globalLit.js'; 

import { endpoints, endpointsTypeServer, endpointsTypeComputer} from '../../../Global/globalInport.js';

import { tableEndpointsDetailsTemplate } from '../../../js-lit/Endpoint/endpointsDetailLit.js';

import { tableEndpointsTemplate } from '../../../Global/globalLit.js';

import { pagesTable } from '../../../Js/global.js';

// -----------------------endpointsRouter-------------------------------
let getEndpoints = {};

const endpointsRouter = () =>{
    page.redirect('/endpoints/all');
};

const endpointsTypeServerRouter = () =>{
    page.redirect('/endpoints/servers');
};

const endpointsTypeComputerRouter = () =>{
    page.redirect('/endpoints/computers');
};

const endpointReturnRouter = () =>{
    page.redirect('/endpoints/all');
};

const endpointDetailsRouter = async (hostName, machineDetailsAssignedProducts, machineDetailsHealth, machineDetails_Os) =>{
    page.redirect(`/endpoints/details/${hostName}`);
    
    pagesTable('health_Check');
    
    render(welcomePage(tableEndpointsDetailsTemplate(hostName, machineDetailsAssignedProducts, machineDetailsHealth, machineDetails_Os)), divApp);
};

page('/endpoints/computers', async () =>{
    getEndpoints = await endpointsTypeComputer();
    
    pagesTable('endpoint');

    render(welcomePage(tableEndpointsTemplate(getEndpoints)), divApp);
});

page('/endpoints/servers', async () =>{
    getEndpoints = await endpointsTypeServer();

    pagesTable('endpoint');

    render(welcomePage(tableEndpointsTemplate(getEndpoints)), divApp);
});

page('/endpoints/all', async () =>{
    getEndpoints = await endpoints();

    pagesTable('endpoint');

    render(welcomePage(tableEndpointsTemplate(getEndpoints)), divApp);
});

export { endpointsRouter, endpointsTypeServerRouter, endpointsTypeComputerRouter, endpointReturnRouter, endpointDetailsRouter };