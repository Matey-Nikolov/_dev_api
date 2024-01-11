import { createGlobalState } from 'react-hooks-global-state';

const { setGlobalState , useGlobalState } = createGlobalState({
    tenetId: '',
    tokenTenat: '',
    client_Id_Db: process.env.REACT_APP_CLIENT_ID,
    client_secret_Db: process.env.REACT_APP_SECRET_ID
});

export { setGlobalState, useGlobalState };