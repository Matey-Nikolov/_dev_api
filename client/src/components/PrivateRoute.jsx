import { useContext, useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { UseCreatedContex } from '../contex/setupInformation';

function PrivateRoute({ children, requiredPermissions }) {
    const { currentClient_role } = useContext(UseCreatedContex);
    const [useRole, setRole] = useState(currentClient_role);

    useEffect(() => {
        setRole(currentClient_role);
    }, [currentClient_role]);

    if (useRole !== requiredPermissions) {
        return <Navigate to="/" />;
    };

    return children;
};

export default PrivateRoute;