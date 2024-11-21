import { v4 as uuidv4 } from 'uuid';

import authentication from './SetUpDataFromAPI/authentication.js';
import authorization from './SetUpDataFromAPI/authorization.js';
import setupInformation from '../configs/api/setupInfomationRouter.js';

import getAlersFromAPI from './SetUpDataFromAPI/alert.js';
import getEventsFromAPI from './SetUpDataFromAPI/events.js';
import getEndpointsFromAPI from './SetUpDataFromAPI/endpoints.js';
import getWebsitesFromAPI from './SetUpDataFromAPI/websites.js';
import getSoftwareFromAPI from './SetUpDataFromAPI/software.js';


const isAdmin = process.env.DB_ROLE;

class Client {
    #clientInfo;
    #tenantIdAndDataRegion  = '';
    #setupTimestamp;
    #role;
  
    constructor(infoUserClient) {
        this.uniqueId = uuidv4();

        this.clientName = infoUserClient.name;

        this.#role = infoUserClient.role;

        this.#clientInfo = {
            'client_Id_Db': infoUserClient.client_id,
            'client_secret_Db': infoUserClient.client_secret
        };

        this.alerts = [];
        this.endpoints = [];
        this.events = [];
        this.websites = [];
        this.software = [];

        this.unauthorized = false;
    };
  
    async setupEnvironment() {
        const currentTime = Date.now();
        if (this.#setupTimestamp && currentTime - this.#setupTimestamp < 50 * 60 * 1000) {
            return;
        };

        const setAuthToken = await authentication(this.#clientInfo.client_Id_Db, this.#clientInfo.client_secret_Db);

        if(setAuthToken === true){
            this.unauthorized = true;
            return;
        };
        
        try {
            this.#tenantIdAndDataRegion = await authorization(setAuthToken);

            await setupInformation(setAuthToken, this.#tenantIdAndDataRegion.id, this.uniqueId, this.#tenantIdAndDataRegion.urlDataRegion);

            this.alerts = await this.#getAlerts();

            this.endpoints = await this.#getEndpoints();


            if (this.#role === isAdmin) {
                this.events = await this.#getEvents();

                this.websites = await this.#getWebsites();

                this.software = await this.#getSoftware();
            };

            this.#setupTimestamp = currentTime;

            this.#clearPrivateProperties();
        } catch (error) {
            console.error('Setup in class clientClass:', error.message);
        };
    };
  
    async #getAlerts() {
        return getAlersFromAPI(this.uniqueId);
    };

    async #getEndpoints() {
        return getEndpointsFromAPI(this.uniqueId);
    };

    async #getEvents() {
        return getEventsFromAPI(this.uniqueId);
    };

    async #getWebsites(){
        return getWebsitesFromAPI(this.uniqueId);
    };

    async #getSoftware(){
        return getSoftwareFromAPI(this.uniqueId);
    };

    // updateAlerts(updatedAlerts){
    //     this.alerts.items = updatedAlerts;
    // };

    // updateEvents(updatedEvents){
    //     this.events = updatedEvents;
    // };

    #clearPrivateProperties() {
        this.#tenantIdAndDataRegion = '';
        this.#clientInfo = null;
    };
};


export default Client;