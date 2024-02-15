// EndpointPage.jsx
import React, { useState }  from 'react';
import EndpointTablePage from './EndpointsTable';
import EndpointDetails from './EndpointDetails';

const EndpointsPages = () => {
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
            <EndpointTablePage onEndpointDetailsClick={handlEndpointDetailsClick} />
          )}
        </div>
    </div>
  );
};

export default EndpointsPages;