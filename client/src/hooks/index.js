import { createGlobalState } from 'react-hooks-global-state';

const { setGlobalState , useGlobalState } = createGlobalState({
    tenetId: '',
    tokenTenat: '',
    client_Id_Db: '',
    client_secret_Db: ''
});

export { setGlobalState, useGlobalState };