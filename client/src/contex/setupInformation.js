import { createContext, useEffect, useState } from "react";
import { getAlersFromApi } from "../Services/alertService";
import { fetchEvents } from "../Services/eventsService";
import { fetchEndpoints } from "../Services/endpointsService";
import getWebsiteServiceInstance from '../Services/websiteService';
import { setupClients } from "../Services/clientServiceFolder/clientSevice";

const UseCreatedContex = createContext();

const ContextProvider = ({ children }) => {
    const [currentAlertsForClient, setCurrentAlertsForClient] = useState({});
    const [useEvents, setEvents] = useState({});
    const [useEndpoints, setEndpoints] = useState({});
    const [useWebsites, setWebsite] = useState([]);
    
    const [informationForClients, setInformationForUser] = useState([]);

    const [loading, setLoading] = useState(true);

    const [currentClient, setCurrentClient] = useState(null);

    const getAlerts = async () => {
        let alerts = await getAlersFromApi();

        setCurrentAlertsForClient(alerts);
        setLoading(false);
    };

    const getEvents = async () =>{
        let events = await fetchEvents();
        setEvents(events);

        setLoading(false);
    };

    const getEndpoints = async () =>{
        let endpoins = await fetchEndpoints();
        setEndpoints(endpoins);

        setLoading(false);
    };

    const getWebsites = async () =>{
        const websiteService = new getWebsiteServiceInstance();

        const websiteData = await websiteService.allowWebsite();
        
        setWebsite(websiteData);

        setLoading(false);
    };

    const getInfomationForClients = async () =>{
        const clients = await setupClients();
        
        setInformationForUser(clients);
        setLoading(false);
    };

    useEffect(() => {
        // getAlerts();
        // getEvents();
        // getEndpoints();
        // getWebsites();
        getInfomationForClients();
    }, []);

    return(
        <UseCreatedContex.Provider value={{ currentAlertsForClient, loading, useEvents, useEndpoints, useWebsites, informationForClients, setCurrentClient, currentClient }}>
            {children}
        </UseCreatedContex.Provider>
    );
};

export { UseCreatedContex, ContextProvider };
