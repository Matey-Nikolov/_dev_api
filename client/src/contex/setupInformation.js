import { createContext, useEffect, useState } from "react";
import { setupClients } from "../Services/clientServiceFolder/clientSevice";

const UseCreatedContex = createContext();

const ContextProvider = ({ children }) => {
    const [informationForClients, setInformationForUser] = useState([]);

    const [loading, setLoading] = useState(true);

    const [currentClient_role, setCurrentClient_role] = useState(null);
    const [currentClient_id, setCurrentClient_id] = useState(null);
    const [currentClient_name, setCurrentClient_name] = useState(null);

    const getInfomationForClients = async () =>{
        const clients = await setupClients();
        
        setInformationForUser(clients);
        setLoading(false);
    };

    useEffect(() => {
        getInfomationForClients();
    }, []);

    return(
        <UseCreatedContex.Provider value={{ loading, informationForClients,
                                            setCurrentClient_id, currentClient_id, 
                                            setCurrentClient_role, currentClient_role,
                                            setCurrentClient_name, currentClient_name }}>
            {children}
        </UseCreatedContex.Provider>
    );
};

export { UseCreatedContex, ContextProvider };
