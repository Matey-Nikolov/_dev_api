import { createContext, useEffect, useState } from "react";
import { getAlersFromApi } from "../Services/alertService";
import { fetchEvents } from "../Services/eventsService";
import { fetchEndpoints, setupClients } from "../Services/endpointsService";
import getWebsiteServiceInstance from '../Services/websiteService';

const UseCreatedContex = createContext();

const ContextProvider = ({ children }) => {
    const [useAlerts, setAlerts] = useState({});
    const [useEvents, setEvents] = useState({});
    const [useEndpoints, setEndpoints] = useState({});
    const [useWebsites, setWebsite] = useState([]);
    const [informationForClients, setInformationForUser] = useState([]);

    const [loading, setLoading] = useState(true);

    const getAlerts = async () => {
        let alerts = await getAlersFromApi();

        setAlerts(alerts);
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
        
        setInformationForUser([...clients]);
        setLoading(false);
    };

    useEffect(() => {
        getAlerts();
        getEvents();
        getEndpoints();
        getWebsites();
        getInfomationForClients();
    }, []);

    return(
        <UseCreatedContex.Provider value={{ useAlerts, loading, useEvents, useEndpoints, useWebsites, informationForClients }}>
            {children}
        </UseCreatedContex.Provider>
    );
};

export { UseCreatedContex, ContextProvider };
