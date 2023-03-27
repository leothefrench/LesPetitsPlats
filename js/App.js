
class App {
    constructor() {
        this.recipesWrapper = document.querySelector('.recipes-wrapper')
        this.recipesApi = new RecipeApi('./data/recipes.json')
        console.log(this.recipesApi)
        console.log(typeof this.recipesApi)
    }

    async main() {
        const recipes = await this.recipesApi.getRecipes()
        console.log(recipes)

        recipes.forEach(recipe => {
            const Template = new RecipeCard(recipe)

            this._recipesWrapper.appendChild(Template.createRecipeInterface())
        })
    }
}

const app = new App()

app.main()
