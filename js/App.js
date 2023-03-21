
class App {
    constructor() {
        this._recipesWrapper = document.querySelector('.recipes-wrapper')
        this._recipesApi = new RecipeCard('./data/recipes.json')
    }

    async main() {
        const recipes = await this._recipesApi.getRecipes()

        recipes.forEach(recipe => {
            const Template = new RecipeCard(recipe)

            this._recipesWrapper.appendChild(Template.createRecipeInterface())
        })
    }
}

const app = new App()

app.main()