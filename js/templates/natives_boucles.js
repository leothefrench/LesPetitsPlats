// Init Arrays
let recipesFilteredByTags = recipes;
console.log(recipesFilteredByTags)
let recipesFilteredBySearch = recipesFilteredByTags;

let ingredientsList = [];
let appliancesList = [];
var ustensilsList = [];

let ingredientsListFiltered = ingredientsList;
let appliancesListFiltered = appliancesList;
let ustensilsListFiltered = ustensilsList;

let ingredientsTagActivated = [];
let appliancesTagActivated = [];
let ustensilsTagActivated = [];

let allTagActivated = [ingredientsTagActivated, appliancesTagActivated, ustensilsTagActivated];

// Main Search - Nominal script 
const mainSearch = (searchValue) => {
	const search = searchValue.toLowerCase();
	recipesFilteredBySearch = recipesFilteredByTags;
	recipesFilteredBySearch = recipesFilteredBySearch.filter(
		(recipe) => recipe.name.toLowerCase().includes(search) || recipe.description.toLowerCase().includes(search) || recipe.ingredients.some((el) => el.ingredient.toLowerCase().includes(search))
	);
    console.log(recipesFilteredBySearch)
    createCard(recipesFilteredBySearch)
};

const searchbarValue = (e) => {
	if (e.target.value.length > 2) {
        console.log(e.target.value);
		mainSearch(e.target.value);
	} else {
		mainSearch(""); // INNERHTML DANS LA PAGE WEB
	}
};

// Input listener on searchbar
let searchUser = document.querySelector(".inputSearch");
console.log(searchUser);
searchUser.addEventListener("keyup", searchbarValue);

// Main search with tags
const searchByTags = () => {
	// Reset recipesFilteredByTags array
	recipesFilteredByTags = recipes;
	// Filter recipesFilteredByTags array with ingredients tags
	for (let i = 0; i < ingredientsTagActivated.length; i++) {
		recipesFilteredByTags = recipesFilteredByTags.filter((recipe) => recipe.ingredients.some((el) => el.ingredient.toLowerCase().includes(ingredientsTagActivated[i])));
	}
	// Filter recipesFilteredByTags array with appliances tags
	for (let i = 0; i < appliancesTagActivated.length; i++) {
		recipesFilteredByTags = recipesFilteredByTags.filter((recipe) => recipe.appliance.toLowerCase().includes(appliancesTagActivated[i]));
	}
	// Filter recipesFilteredByTags array with ustensils tags
	for (let i = 0; i < ustensilsTagActivated.length; i++) {
		recipesFilteredByTags = recipesFilteredByTags.filter((recipe) => recipe.ustensils.some((el) => el.toLowerCase().includes(ustensilsTagActivated[i])));
	}
	// Launch mainSearch
	const searchValue = document.querySelector(".inputSearch");
    console.log(searchValue)
	// If searchbar have 3 characters launch search else launch empty search
	if (searchValue.value.length > 2) {
		mainSearch(searchValue.value);
	} else {
		mainSearch("");
	}
};

// search In Tags
const searchInTags = (e, array, arrayFiltered, renderListFunction, wrapper) => {
	const search = e.value.toLowerCase();
	arrayFiltered = array;
	arrayFiltered = arrayFiltered.filter((data) => data.toLowerCase().includes(search));
	renderListFunction(arrayFiltered, wrapper);
};
