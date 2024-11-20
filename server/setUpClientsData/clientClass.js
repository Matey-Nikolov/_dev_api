import authentication from './SetUpDataFromAPI/authentication.js';
import authorization from './SetUpDataFromAPI/authorization.js';
import setupInformation from '../configs/api/setupInfomationRouter.js';
import getAlersFromApi from './SetUpDataFromAPI/alert.js';

import { v4 as uuidv4 } from 'uuid';

class Client {
    #clientInfo;
    #tenantIdAndDataRegion  = '';
    #setupTimestamp;
  
    constructor(infoUserClient) {
        this.uniqueId = uuidv4();

        this.clientName = infoUserClient.name;

        this.role = infoUserClient.role;

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

        const setAuthToken = await authentication(this.#clientInfo);

        if(setAuthToken === true){
            this.unauthorized = true;
            return;
        };

        try {
            this.#tenantIdAndDataRegion = await authorization(setAuthToken);

            await setupInformation(setAuthToken, this.#tenantIdAndDataRegion.id, this.uniqueId, this.#tenantIdAndDataRegion.urlDataRegion);

     
            // this
            this.alerts = await this.#getAlerts();

            // this
            // this.endpoints = await this.#getEndpoints();


            // if (this.role === process.env.REACT_APP_ROLE) {
            //     // this
            //     this.events = await this.#getEvents();
            //     // this
            //     this.websites = await this.#getWebsites();
            //     // this
            //     this.software = await this.#getSoftware();
            // };

            this.#setupTimestamp = currentTime;

            this.#clearPrivateProperties();
        } catch (error) {
            console.error('Error:', error.message);
        };
    };
  
    async #getAlerts() {
        return getAlersFromApi(this.uniqueId);
    };

    // async #getEndpoints() {
    //     return fetchEndpoints(this.uniqueId);
    // };

    // async #getEvents() {
    //     return fetchEvents(this.uniqueId);
    // };

    // async #getWebsites(){
    //     return getWebsiteServiceInstance(this.uniqueId);
    // };

    // async #getSoftware(){
    //     return getSoftwareCurrentClient(this.uniqueId);
    // };

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