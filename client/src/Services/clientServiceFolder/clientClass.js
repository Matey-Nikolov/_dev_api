import { setupInformation } from '../../axiosrequests/apiSetupInfo';
import { whoIAm } from '../../axiosrequests/apiAuth';
import { postToken } from "../../axiosrequests/apiToken";
import { getAlersFromApi } from "../alertService";
import { fetchEndpoints, getSoftwareCurrentClient } from '../endpointsService';
import { fetchEvents } from '../eventsService';
import getWebsiteServiceInstance from '../websiteService';

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
    };

    async setupEnvironment() {
        const currentTime = Date.now();
        if (this.#setupTimestamp && currentTime - this.#setupTimestamp < 50 * 60 * 1000) {
            return;
        };

        try {
            const setAuthToken = await postToken(this.#clientInfo);
            this.#tenantIdAndDataRegion = await whoIAm(setAuthToken);

            await setupInformation(setAuthToken, this.#tenantIdAndDataRegion.id, this.uniqueId, this.#tenantIdAndDataRegion.urlDataRegion);

            this.alerts = await this.getAlerts();

            this.endpoints = await this.getEndpoints();


            if (this.role === 'R/W') {
                this.events = await this.getEvents();
                this.websites = await this.getWebsites();
                this.software = await this.getSoftware();
            };

            this.#setupTimestamp = currentTime;

            this.#clearPrivateProperties();
        } catch (error) {
        console.error('Error:', error.message);
        };
    };

    async getAlerts() {
        return getAlersFromApi(this.uniqueId);
    };

    async getEndpoints() {
        return fetchEndpoints(this.uniqueId);
    };

    async getEvents() {
        return fetchEvents(this.uniqueId);
    };

    async getWebsites(){
        return getWebsiteServiceInstance(this.uniqueId);
    };

    async getSoftware(){
        return getSoftwareCurrentClient(this.uniqueId);
    };

    #clearPrivateProperties() {
        this.#tenantIdAndDataRegion = '';
        this.#clientInfo = null;
    };
}

export default Client;