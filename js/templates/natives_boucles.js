// INITIALISATION DES ARRAYS VIDE
let recipesFilteredByTags = recipes;
let recipesFilteredBySearch = recipesFilteredByTags;

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

// KEY UP IN PRINCIPAL SEARCH BAR
let searchUser = document.querySelector(".inputSearch");
// console.log(searchUser);
searchUser.addEventListener("keyup", searchbarValue);

/* LIST INGREDIENTS FOR EACH RECIPE */
const getAllIngredients = () => {

	let allIngredientsArr = [];
	for (let i = 0; i < recipes.length; i++ ) {
		const ingredients = recipes[i].ingredients;
		allIngredientsArr.push([]);

		for (let j = 0; j < ingredients.length; j++) {
			allIngredientsArr[i].push(ingredients[j].ingredient)
		}
	}
	console.log(allIngredientsArr);

	let allIngredientsLowerCase = [];
	for (let i = 0; i < allIngredientsArr.length; i++ ) {
		const ingredients = allIngredientsArr[i];

		for (let j =0; j < ingredients.length; j++ ) {
			allIngredientsLowerCase.push(ingredients[j].toLowerCase())
		}
	}
	console.log(allIngredientsLowerCase);

	// DELETE DUPLICATE IN THE ARRAY ALL INGREDIENRS IN LOWER CASE
	const allIngredientsInLowerCaseNoDuplicate = [...new Set(allIngredientsLowerCase)];
	console.log(allIngredientsInLowerCaseNoDuplicate);

}

getAllIngredients()


/* FUNCTION TO GET ALL THE APPLIANCES FOR THE RECIPES WITH NO DUPLICATE */
const getAllAppliance = () => {
	const allAppliancesInLowerCase = []; // TO STOCK ALL APPLIANCE IN LOWER CASE

	for (let i = 0; i < recipes.length; i++) {
		const appliance = recipes[i].appliance.toLowerCase()
		allAppliancesInLowerCase.push(appliance) // STOCK ALL APPLIANCES
	}
	// console.log(allAppliancesInLowerCase);

	// DELETE DUPLICATE IN THE ARRAY ALL APPLIANCE IN LOWER CASE
	const allAppliancesInLowerCaseNoDuplicate = [...new Set(allAppliancesInLowerCase)];
	
	// console.log(allAppliancesInLowerCaseNoDuplicate);

	return allAppliancesInLowerCaseNoDuplicate
}
getAllAppliance();

/* INJECTION APPLIANCES IN THE LIST APPLIANCE REMAINING */
const listAppliance = document.querySelector('.listElementsAppliances');
console.log(listAppliance);

listAppliance.innerHTML = '';
for (let i = 0; i < getAllAppliance().length; i++) {
	listAppliance.innerHTML += `<p>${getAllAppliance()[i]}</p>`
}

/* FUNCTION TO GET ALL THE UTENSILS FOR THE RECIPES WITH NO DUPLICATE */
const getUtensils = () => {
	const allUtensilsInLowerCase = [];

	const allUtensils = []
	for (let i = 0; i < recipes.length; i++) {
		const utensils = recipes[i].ustensils;
		allUtensils.push(utensils) // STOCK ALL APPLIANCES
	}
	// console.log(allUtensils);

	for (let i = 0; i < allUtensils.length; i++) {
		const utensils = allUtensils[i]

		for (let j = 0; j < utensils.length; j++) {
			allUtensilsInLowerCase.push(utensils[j].toLowerCase())
		}
	}

	// console.log(allUtensilsInLowerCase)

	// DELETE DUPLICATE IN THE ARRAY ALL UTENSILS IN LOWER CASE
	const allUtensilsInLowerCaseNoDuplicate = [...new Set(allUtensilsInLowerCase)];
	
	// console.log(allUtensilsInLowerCaseNoDuplicate);

	return allUtensilsInLowerCaseNoDuplicate
}
getUtensils()

/* INJECTION UTENSILS IN THE LIST UTENSILS REMAINING */

const listUstensiles = document.querySelector('.listElementsUstensiles');
console.log(listUstensiles);

listUstensiles.innerHTML = '';
for (let i = 0; i < getUtensils().length; i++) {
	listUstensiles.innerHTML += `<p>${getUtensils()[i]}</p>`
}