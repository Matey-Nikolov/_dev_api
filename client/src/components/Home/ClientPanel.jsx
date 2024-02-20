import { useEffect } from 'react';
import React from 'react';
import { Container, Table } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

const ClientPanel = () => {
    const location = useLocation();
    const clientInfo = location.state.info;


    useEffect(() => {
        console.log(clientInfo);
    }, []);

    return (
        <Container fluid className="px-4 d-flex justify-content-center">
            <h1 className="text-center my-4">🚀 Customer Dashboard: {clientInfo.clientName} 🚀</h1>
            <Table striped bordered hover className="my-cool-table">
                <thead>
                    <tr>
                        <th colSpan="2">Endpoints</th>
                    </tr>
                    <tr>
                        <th>Computer</th>
                        <th>Server</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{clientInfo.endpoints.filter(x => x.type === 'computer').length}</td>
                        <td>{clientInfo.endpoints.filter(x => x.type === 'server').length}</td>
                    </tr>
                </tbody>
            </Table>
        </Container>
    );
};

export default ClientPanel;