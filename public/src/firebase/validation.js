const inputsRegister ={
    'username': '',
    'role': '',
    'client_id': '',
    'client_secret': ''
}

function validationTrueFalse(){
    if (!username || !inputPassword || !inputRole || !inputClient_id || !inputClient_secret) {
        alert('Please fill in all fields.');
    }
    else{
        createUser(event, username, username, inputPassword, inputRole, inputClient_id, inputClient_secret);
    }
}





export { inputsRegister, validationInput };