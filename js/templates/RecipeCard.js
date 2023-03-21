class RecipeCard {
    constructor(recipe) {
        this._recipe = recipe;
    }

    createRecipeInterface() {
        const wrapper = document.createElement('div')
        wrapper.classList.add('recipeInterface-wrapper')

        const recipeCard = `
            <div class='img-recipe'></div>
            <div>
                <div>
                    <h2>${this._recipe.name}</h2>
                    <ul>
                        <li>${this._recipe.ingredients}</li>
                    </ul>
                </div>
                <div>
                    <i></i>
                    <span>${this._recipe.time}</span>
                    <p>${this._recipe.description}</p>
                </div>
            </div>
        `

        wrapper.innerHTML = recipeCard
       
        return wrapper
    }
}