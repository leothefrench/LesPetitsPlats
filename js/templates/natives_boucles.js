// INITIALISATION DES ARRAYS VIDE
let recipesFilteredByTags = recipes;
let recipesFilteredBySearch = recipesFilteredByTags;

// let ingredientsList = [];
// let appliancesList = [];
// let ustensilsList = [];

// let ingredientsListFiltered = ingredientsList;
// let appliancesListFiltered = appliancesList;
// let ustensilsListFiltered = ustensilsList;

// let ingredientsTagActivated = [];
// let appliancesTagActivated = [];
// let ustensilsTagActivated = [];

// let allTagActivated = [ingredientsTagActivated, appliancesTagActivated, ustensilsTagActivated];
// console.log(allTagActivated)

/* PRINCIPAL SEARCH */
const mainSearch = (searchValue) => {
	const search = searchValue.toLowerCase();
	recipesFilteredBySearch = recipesFilteredByTags;
	console.log(recipesFilteredBySearch)
	recipesFilteredBySearch = recipesFilteredBySearch.filter(
		(recipe) => recipe.name.toLowerCase().includes(search) || recipe.description.toLowerCase().includes(search) || recipe.ingredients.some((el) => el.ingredient.toLowerCase().includes(search))
	);
    console.log(recipesFilteredBySearch)

	const classRecipesWrapper = document.querySelector('.recipes-wrapper')

    if(recipesFilteredBySearch == 0) {
        classRecipesWrapper.innerHTML = '<h2>Aucune recette ne correspond à votre critère de recherche, vous pouvez chercher "tarte aux pommes", "poisson", etc.</h2>'
    } else {
        classRecipesWrapper.innerHTML = ''   // CLEAN DOM RECIPES WRAPPER CONTAINER
        finalRecipeArray = Object.entries(recipesFilteredBySearch);

        finalRecipeArray.forEach(recipe => createCard(recipe));     // INJECTION IN THE DOM
    }
};

const searchbarValue = (e) => {
	if (e.target.value.length > 2) {
        console.log(e.target.value);
		mainSearch(e.target.value);
	} else {
		mainSearch("");
	}
};

// Input listener on searchbar
let searchUser = document.querySelector(".inputSearch");
// console.log(searchUser);
searchUser.addEventListener("keyup", searchbarValue);

/* LIST INGREDIENTS FOR EACH RECIPE */
const arrayIngredients = [];
let allIngredientsArr = [];

for (let i = 0; i < recipes.length; i++ ) {
	const ingredients = recipes[i].ingredients;
	arrayIngredients.push(ingredients);
}

for (let j = 0; j < arrayIngredients.length; j++) {
	const allIngredientsArr = arrayIngredients[0][j]
}
console.log(arrayIngredients);
console.log(allIngredientsArr);

/* FUNCTION TO GET ALL THE APPLIANCES FOR THE RECIPES WITH NO DUPLICATE */
const getAllAppliance = () => {
	const allAppliancesInLowerCase = []; // TO STOCK ALL APPLIANCE IN LOWER CASE

	for (let i = 0; i < recipes.length; i++) {
		const appliance = recipes[i].appliance.toLowerCase()
		allAppliancesInLowerCase.push(appliance) // STOCK ALL APPLIANCES
	}
	console.log(allAppliancesInLowerCase);

	// DELETE DUPLICATE IN THE ARRAY ALL APPLIANCE IN LOWER CASE
	const allAppliancesInLowerCaseNoDuplicate = [...new Set(allAppliancesInLowerCase)];
	
	console.log(allAppliancesInLowerCaseNoDuplicate);
}

getAllAppliance();
