import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';

import WebsiteService from '../../Services/websiteService';

import { useGlobalState } from '../../hooks';



const WebsiteTable = () => {

  const [tenetId] = useGlobalState('tenetId');
  const [tokenTenat] = useGlobalState('tokenTenat');

  const websiteServiceInstance = new WebsiteService(tokenTenat, tenetId);


  const [useWebsites, setWebsite] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const websiteData = await websiteServiceInstance.allowWebsite();

        setWebsite([...websiteData]);
      } catch (error) {
        console.error('Error fetching websites:', error);
        throw error;
      }
    };

    fetchData();
  }, []);
   
  return (
    <Table responsive bordered hover>
      <thead>
        <tr>
          <th scope="col">Site</th>
          <th scope="col">Comment</th>
          <th scope="col">Block</th>
        </tr>
      </thead>
      <tbody id="website">
        {useWebsites.map((items) => (
          <tr key={items.id}>
            <td>
              <a href={`https://${items.url}`} target="_blank" rel="noopener noreferrer">
                {items.url}
              </a>
            </td>
            <td>{items.comment}</td>
            <td>
              <Button>
                Block
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
  
export default WebsiteTable;