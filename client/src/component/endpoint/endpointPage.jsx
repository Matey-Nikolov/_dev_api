// EndpointPage.jsx
import React, { useState, useEffect }  from 'react';
import EndpointTable from './endpointTable';
import EndpointDetails from './endpointDetails';

const EndpointPage = () => {
  // endpointId or machine_Id
  const [selectedEndpointId, setSelectedEndpointId] = useState(null);

  // useEffect(() => {
  // }, [selectedEndpointId]);
  
  const handlEndpointDetailsClick = (endpointId) => {
    setSelectedEndpointId(endpointId);
  };  

  const handleBackClick = () => {
    setSelectedEndpointId(null);
  };

  return (
    <div className="container text-center">
        <div>
          {selectedEndpointId ? (
            <EndpointDetails machine_Id={selectedEndpointId} onBackClick={handleBackClick}/>
          ) : (
            <EndpointTable onEndpointDetailsClick={handlEndpointDetailsClick} />
          )}
        </div>
    </div>
  );
};

export default EndpointPage;