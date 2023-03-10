async function loadRecipes(appEl, el) {
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

export {loadRecipes};