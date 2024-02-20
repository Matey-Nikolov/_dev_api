import { setupInformation } from '../../axiosrequests/apiSetupInfo';
import { whoIAm } from '../../axiosrequests/apiAuth';
import { postToken } from "../../axiosrequests/apiToken";
import { getAlersFromApi } from "../alertService";
import { fetchEndpoints } from '../endpointsService';

import { v4 as uuidv4 } from 'uuid';

class Client {
    #clientInfo;
    #tenantId = '';
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
    }

    async setupEnvironment() {
        const currentTime = Date.now();
        if (this.#setupTimestamp && currentTime - this.#setupTimestamp < 50 * 60 * 1000) {
            return;
        };

        try {
            const setAuthToken = await postToken(this.#clientInfo);
            this.#tenantId = await whoIAm(setAuthToken);

            await setupInformation(setAuthToken, this.#tenantId, this.uniqueId);

            this.alerts = await this.getAlerts();
            this.endpoints = await this.getEndpoints();

            this.#setupTimestamp = currentTime;

            this.#clearPrivateProperties();
        } catch (error) {
        console.error('Error:', error.message);
        }
    }

    async getAlerts() {
        return getAlersFromApi(this.uniqueId);
    }

    async getEndpoints() {
        return fetchEndpoints(this.uniqueId);
    }

    #clearPrivateProperties() {
        this.#tenantId = '';
        this.#clientInfo = null;
    }
}

export default Client;