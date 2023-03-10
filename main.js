const appEl = document.getElementById('app');
const navEl = document.getElementById('nav');
const [homeLinkEl, loginLinkEl, registerLinkEl, logoutLinkEl] = document.querySelectorAll('a');

function el(type) {
    const element = document.createElement(type);
    return element;    
}

async function loadRecipes() {
    const recpiseListEl = el('ul');
    recpiseListEl.id = 'recipe-list'; 
    const response = await fetch('http://localhost:3030/data/recipes')
    const data = await response.json();
    data.map(recipe => {
        const recipeItemEl = el('li');
        const nameEl = el('h3');
        const imgEl = el('img');
        nameEl.textContent = recipe.name;
        imgEl.src = recipe.img;
        recipeItemEl.append(nameEl);
        recipeItemEl.append(imgEl);
        recpiseListEl.append(recipeItemEl);
    })
    appEl.append(recpiseListEl);
}
loadRecipes();

homeLinkEl.addEventListener('click', (event) => {
    appEl.innerHTML = '';
    loadRecipes();
})

loginLinkEl.addEventListener('click', () =>{
    appEl.innerHTML = '';
    loadLoginForm();
})

registerLinkEl.addEventListener('click', () =>{
    appEl.innerHTML = '';
    loadRegisterForm();
})

logoutLinkEl.addEventListener('click', () =>{
    sessionStorage.removeItem('token');
})


function loadLoginForm() {
    const loginFormEl = el('form');
    const emailInputEl = el('input');
    const passwordInputEl = el('input');
    const submitInputEl = el('input');
    const loginHeading = el('h2')
    loginHeading.textContent = 'Login Form'
    
    emailInputEl.name = 'email';
    passwordInputEl.name = 'password';
    submitInputEl.type = 'submit';
    submitInputEl.value = 'Login';
    
    loginFormEl.append(loginHeading);
    loginFormEl.append(emailInputEl);
    loginFormEl.append(passwordInputEl);
    loginFormEl.append(submitInputEl);
    
    appEl.append(loginFormEl);
    
    loginFormEl.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const data = new FormData(event.target);
        const email = data.get('email');
        const password = data.get('password');
    
        try {
            const response = await fetch('http://localhost:3030/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password})
            })
            if (!response.ok) {
                throw new Error('Wrong email or password');
            }
            const userData = await response.json();
            const accessToken = userData.accessToken;
            console.log(accessToken);
            sessionStorage.setItem('token', accessToken);
        } catch (err) {
            console.log(err);
        }
    })    
}

function loadRegisterForm() {
    const registerFormEl = el('form');
    const emailInputEl = el('input');
    const usernameInputEl = el('input');
    const passwordInputEl = el('input');
    const submitInputEl = el('input');
    const registerHeading = el('h2')
    registerHeading.textContent = 'Register Form'
    
    emailInputEl.name = 'email';
    usernameInputEl.name = 'username';
    passwordInputEl.name = 'password';
    submitInputEl.type = 'submit';
    submitInputEl.value = 'Register';
    
    registerFormEl.append(registerHeading);
    registerFormEl.append(emailInputEl);
    registerFormEl.append(usernameInputEl);
    registerFormEl.append(passwordInputEl);
    registerFormEl.append(submitInputEl);
    
    appEl.append(registerFormEl);
    
    registerFormEl.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const data = new FormData(event.target);
        const email = data.get('email');
        const username = data.get('username');
        const password = data.get('password');
    
        try {
            const response = await fetch('http://localhost:3030/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, username, password})
            })
            if (!response.ok) {
                throw new Error('Wrong email or password');
            }
            const userData = await response.json();
            const accessToken = userData.accessToken;
            console.log(accessToken);
            sessionStorage.setItem('token', accessToken);
        } catch (err) {
            console.log(err);
        }
    })    
}

// const createFormEl = el('form');
// const nameInputEl = el('input');
// const imgInputEl = el('input');
// const submitCreateInputEl = el('input');
// const createHeading = el('h2')
// createHeading.textContent = 'Create Form'

// nameInputEl.name = 'name';
// imgInputEl.name = 'img';
// submitCreateInputEl.type = 'submit';
// submitCreateInputEl.value = 'Create';

// createFormEl.append(createHeading);
// createFormEl.append(nameInputEl);
// createFormEl.append(imgInputEl);
// createFormEl.append(submitCreateInputEl);

// appEl.append(createFormEl);

// createFormEl.addEventListener('submit', async (event) => {
//     event.preventDefault();

//     const data = new FormData(event.target);
//     const name = data.get('name');
//     const img = data.get('img');

//     try {
//         const userToken = sessionStorage.getItem('token');

//         if (!userToken) {
//             throw new Error('You are not authenticated');
//         }
//         const response = await fetch('http://localhost:3030/data/recipes', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'X-Authorization': userToken
//             },
//             body: JSON.stringify({name, img})
//         })
//         if (!response.ok) {
//             throw new Error('Unsuccessful creation');
//         }
//         const document = await response.json();
//         console.log(document);
//     } catch (err) {
//         console.log(err);
//     }
// })