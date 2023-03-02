const appEl = document.getElementById('app');

function el(type){
    const element = document.createElement(type);
    return element;
}

const loginFormEl = el('form');
const emailInputEl = el('input');
const passowordInputEl = el('input');
const submitInputEl = el('input');

const loginHeading  = el('h2');
loginHeading.textContent = 'Login';

emailInputEl.name = 'email';
passowordInputEl.name = 'passoword';

submitInputEl.type = 'submit';
submitInputEl.value = 'Login';

loginFormEl.append(loginHeading);
loginFormEl.append(emailInputEl);
loginFormEl.append(passowordInputEl);
loginFormEl.append(submitInputEl);

appEl.append(loginFormEl);

loginFormEl.addEventListener('submit', async (event) =>{
    event.preventDefault();

    const data = new FormData(event.target);
    const email = data.get('email');
    const password = data.get('passoword');

    try{
        const response = await fetch('http://localhost:3030/users/login', {

            method: 'POST',
            headers:{ 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({email, password})
        })

        //peter@abv.bg
        // 123456
        if(!response.ok){
            throw new Error('Wroung email or password!');
        }
        const userData = await response.json();
        const accessToken = userData.accessToken;

        sessionStorage.setItem('token', accessToken);
        //console.log(userData);
    }
    catch (arr){
        console.log(arr);
    }
});


const createFormEl = el('form');
const nameInputEl = el('input');
const imgInputEl = el('input');
const submitCreateInputEl = el('input');

const createHeading  = el('h2');
createHeading.textContent = 'Create';

nameInputEl.name = 'name'
imgInputEl .name = 'img'

submitCreateInputEl.type = 'submit';
submitCreateInputEl.value = 'Create';


createFormEl.append(createHeading);
createFormEl.append(nameInputEl);
createFormEl.append(imgInputEl);
createFormEl.append(submitCreateInputEl);

appEl.append(createFormEl);

createFormEl.addEventListener('submit', async (event) =>{
    event.preventDefault();

    const data = new FormData(event.target);
    const name = data.get('name');
    const img = data.get('img');

    try{
        const userToken = sessionStorage.getItem('token');

        if(!userToken){
            throw new Error('You are not authenticated');
        }

        const response = await fetch('http://localhost:3030/data/recipes', {

            method: 'POST',
            headers:{ 
                'Content-Type': 'application/json',
                'X-Authorization': authToken 
            },
            body: JSON.stringify({name, img})
        })

        //peter@abv.bg
        // 123456
        if(!response.ok){
            throw new Error('unsuccessful creation');
        }
        const document = await response.json();
        console.log(document);
    }
    catch (arr){
        console.log(arr);
    }
});

// const navEl = document.getElementById('nav');

// async function loadRecipes(){
//     const recipesListEl = el('ul');
//     recipesListEl.id = 'recipe-list';
//     const response = await fetch('http://localhost:3030/jsonstore/cookbook')
//     const data = await response.json();
//     data.map(rec){

//     }
// }