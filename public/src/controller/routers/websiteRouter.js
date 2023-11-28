import { addAlloWebsite, allowWebSite, divApp } from '../../Global/globalInport.js';

import { emptyError, tableAllowWebsiteTemplate, addNewWebsite, render, welcomePage } from '../../Global/globalLit.js';

import { pagesTable } from '../../Js/global.js';

let websites = new Set(); 

const websitesRouter = () => {
    page.redirect('/websites');
};

const websiteAddRouter = () =>{
    page.redirect('/add');
};

page('/add', () => {
    render(welcomePage(addNewWebsite()), divApp);

    const btnWebsite = document.getElementById('allowWebsite');
    const getWebsiteURL = document.getElementById('website');

    btnWebsite.addEventListener('click', async (event) =>{
        event.preventDefault();

        let websiteURL = getWebsiteURL.value.trim();
        let alreadyAdd = await addAlloWebsite(websiteURL);

        if (alreadyAdd) {
            getWebsiteURL.value = '';
            render(welcomePage(addNewWebsite('You already have it as an exception.')), divApp);
        }
        else{
            if (websiteURL === '') {
                render(welcomePage(addNewWebsite('Please enter the url.')), divApp);
            }else if(alreadyAdd === null){
                render(welcomePage(addNewWebsite('Please enter the valid url.')), divApp);
            }else{
                page.redirect('/websites');
            }
        }  
    });
});

page('/websites', async () => {
    websites = await allowWebSite();
    websites = [...websites];

    pagesTable('website');

    if (websites.length === 0) {
        render(welcomePage(tableAllowWebsiteTemplate(websites, emptyError('The exclusion list of allowed sites to visit is empty.'))), divApp);
    }else{
        render(welcomePage(tableAllowWebsiteTemplate(websites)), divApp);
    }
});

export { websitesRouter, websiteAddRouter };