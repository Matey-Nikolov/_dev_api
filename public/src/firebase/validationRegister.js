import { registerTemplate, alertError, welcomePage } from '../Global/globalLit.js';
import { render } from '../Global/globalLit.js';
import { divApp } from '../controller/homeController.js';

let getInformation_Register = {
    'username': '',
    'password': '',
    'role': '',
    'client_Id': '',
    'Client_Secret': ''
};

const lengthMinUsername = 5;
const lengthMaxUsername = 20;

const lengthMinPassword = 8;
const lengthMaxPassword = 25;

function validatePassword(){
    if(getInformation_Register.password === undefined || getInformation_Register.password === ''){
        render(welcomePage(registerTemplate(alertError('Password is empty!'))), divApp); 
        
        return false;
    }
    
    let lengtPassword = getInformation_Register.password.length;

    if (lengtPassword < lengthMinPassword || lengtPassword > lengthMaxPassword) {
        render(welcomePage(registerTemplate(alertError('Your password must be between eight and 25 characters long!'))), divApp); 
        
        return false;
    }

    return true;
};

function validateClient_Secret(){
    if(getInformation_Register.Client_Secret === undefined || getInformation_Register.Client_Secret === ''){
        render(welcomePage(registerTemplate(alertError('Client secret is empty!'))), divApp); 
        
        return false;
    }
    
    return true;
};

function validateClient_Id(){
    if(getInformation_Register.client_Id === undefined || getInformation_Register.client_Id === ''){
        render(welcomePage(registerTemplate(alertError('Client id is empty!'))), divApp); 
        
        return false;
    }
    
    return true;
};

function validateRole(){
    if(getInformation_Register.role === undefined || getInformation_Register.role === ''){
        render(welcomePage(registerTemplate(alertError('Role is empty!'))), divApp); 
        
        return false;
    }

    if (getInformation_Register.role !== 'admin' && getInformation_Register.role !== 'guest') {
        render(welcomePage(registerTemplate(alertError('Role must be admin or guest!'))), divApp); 
        
        return false;
    }

    return true;
};

function validateUsername(){
    if(getInformation_Register.username === undefined || getInformation_Register.username === ''){
        render(welcomePage(registerTemplate(alertError('Username is empty!'))), divApp); 
        
        return false;
    }

    let lengthUsername = getInformation_Register.username.length;

    if (lengthUsername < lengthMinUsername || lengthUsername > lengthMaxUsername) {
        render(welcomePage(registerTemplate(alertError('Your username should be between five and twenty saracters long!'))), divApp); 
        
        return false;
    }

    return true;
};

function validationRegisterInput(){

    if(validateUsername() && validateRole() && validateClient_Id() && validateClient_Secret() && validatePassword()){
        return true;
    }
    else{
    }
};

export { validationRegisterInput, getInformation_Register }