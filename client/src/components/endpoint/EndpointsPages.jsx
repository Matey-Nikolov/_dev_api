import React, { useState }  from 'react';
import EndpointTablePage from './EndpointsTable';
import EndpointDetails from './EndpointDetails';

const EndpointsPages = () => {
  const [selectedEndpointId, setSelectedEndpointId] = useState(null);
  const [selectedClientId, setSelectedClientId] = useState(null);

  const handlEndpointDetailsClick = (endpointId, clientId) => {
    setSelectedEndpointId(endpointId);
    setSelectedClientId(clientId);
  };  

  const handleBackClick = () => {
    setSelectedEndpointId(null);
  };

  return (
    <div>
        <div>
          {selectedEndpointId ? (
            <EndpointDetails machine_Id={selectedEndpointId} clientId={selectedClientId} onBackClick={handleBackClick}/>
          ) : (
            <EndpointTablePage onEndpointDetailsClick={handlEndpointDetailsClick} />
          )}
        </div>
    </div>
  );
};

export default EndpointsPages;