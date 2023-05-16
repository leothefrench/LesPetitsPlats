// INITIALISATION DES ARRAYS VIDE
let recipesFilteredByTags = recipes;
let recipesFilteredBySearch = recipesFilteredByTags;

console.log(recipes);

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
		// ACTUALISATION DES CHAMPS DE RECEHRCHE AVANCES
		getAllIngredients();
		getAllAppliance();
		getUtensils();
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



/* FUNCTION TO GET ALL THE INGREDIENTS FOR THE RECIPES WITH NO DUPLICATE */
const getAllIngredients = () => {

	let allIngredientsArr = [];
	for (let i = 0; i < recipes.length; i++ ) {
		const ingredients = recipes[i].ingredients;
		allIngredientsArr.push([]);

		for (let j = 0; j < ingredients.length; j++) {
			allIngredientsArr[i].push(ingredients[j].ingredient)
		}
	}

	let allIngredientsLowerCase = [];
	for (let i = 0; i < allIngredientsArr.length; i++ ) {
		const ingredients = allIngredientsArr[i];

		for (let j =0; j < ingredients.length; j++ ) {
			allIngredientsLowerCase.push(ingredients[j].toLowerCase())
		}
	}
	// console.log(allIngredientsLowerCase);

	// DELETE DUPLICATE IN THE ARRAY ALL INGREDIENRS IN LOWER CASE
	const allIngredientsInLowerCaseNoDuplicate = [...new Set(allIngredientsLowerCase)];
	// console.log(allIngredientsInLowerCaseNoDuplicate);

	return allIngredientsInLowerCaseNoDuplicate;

}

getAllIngredients()

/* INJECTION INGREDIENTS IN THE LIST INGREDIENS REMAINING */
const listIngredients = document.querySelector('.listElementsIngredients');
console.log(listIngredients);

listIngredients.innerHTML = '';
for (let i = 0; i < getAllIngredients().length; i++) {
	listIngredients.innerHTML += `<p>${getAllIngredients()[i]}</p>`
}


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
		allUtensils.push(utensils) 
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
getUtensils();

/* INJECTION UTENSILS IN THE LIST UTENSILS REMAINING */

const listUstensiles = document.querySelector('.listElementsUstensiles');
console.log(listUstensiles);

listUstensiles.innerHTML = '';
for (let i = 0; i < getUtensils().length; i++) {
	listUstensiles.innerHTML += `<p>${getUtensils()[i]}</p>`
}

/* FILTRATION PAR CHAMPS AVANCES INGREDIENTS - APPLIANCES & UTENSILS */

/* FILTRATION CHAMPS INGREDIENTS */
let listIngredientsNoDuplicate = getAllIngredients();
console.log(listIngredientsNoDuplicate);
const champsInputIngredients = document.querySelector('.inputSearchBtnIngredients');
console.log(champsInputIngredients)

champsInputIngredients.addEventListener('keyup', (e) => {
	let inputIngredient = e.target.value.toLowerCase()
	console.log(inputIngredient)

	if(inputIngredient.length >= 1) {
		let ingredientsRemaining = [];

		for (let i = 0; i < listIngredientsNoDuplicate.length; i++) {
			if(listIngredientsNoDuplicate[i].match(inputIngredient)) {
				ingredientsRemaining.push(listIngredientsNoDuplicate[i]);
			}
		}
		console.log(ingredientsRemaining);

		/* INJECTION INGREDIENTS IN THE LIST INGREDIENTS REMAINING */
		const listIngredients= document.querySelector('.listElementsIngredients');
		console.log(listIngredients);

		listIngredients.innerHTML = '';
		for (let i = 0; i < ingredientsRemaining.length; i++) {
			listIngredients.innerHTML += `<p>${ingredientsRemaining[i]}</p>`
		}
	}
} )

/* FILTRATION CHAMPS APPLIANCES */
let listAppliancesNoDuplicate = getAllAppliance();
console.log(listAppliancesNoDuplicate);
const champsInputAppliances = document.querySelector('.inputSearchBtnAppareils');
console.log(champsInputAppliances)

champsInputAppliances.addEventListener('keyup', (e) => {
	let inputAppliance = e.target.value.toLowerCase()
	console.log(inputAppliance)

	if(inputAppliance.length >= 1) {
		let appliancesRemaining = [];

		for (let i = 0; i < listAppliancesNoDuplicate.length; i++) {
			if(listAppliancesNoDuplicate[i].match(inputAppliance)) {
				appliancesRemaining.push(listAppliancesNoDuplicate[i]);
			}
		}
		console.log(appliancesRemaining);

		/* INJECTION APPLIANCES IN THE LIST APPLIANCE REMAINING */
		const listAppliances = document.querySelector('.listElementsAppliances');
		console.log(listAppliances);

		listAppliances.innerHTML = '';
		for (let i = 0; i < appliancesRemaining.length; i++) {
			listAppliances.innerHTML += `<p>${appliancesRemaining[i]}</p>`
		}
	}
} )

/* FILTRATION CHAMPS USTENSILES */
let listUstensilesNoDuplicate = getUtensils();
console.log(listUstensilesNoDuplicate);
const champsInputUstensiles = document.querySelector('.inputSearchBtnUstensiles');
console.log(champsInputUstensiles)

champsInputUstensiles.addEventListener('keyup', (e) => {
	let inputUstensile = e.target.value.toLowerCase()
	console.log(inputUstensile)

	if(inputUstensile.length >= 1) {
		let ustensilesRemaining = [];

		for (let i = 0; i < listUstensilesNoDuplicate.length; i++) {
			if(listUstensilesNoDuplicate[i].match(inputUstensile)) {
				ustensilesRemaining.push(listUstensilesNoDuplicate[i]);
			}
		}
		console.log(ustensilesRemaining);

		/* INJECTION APPLIANCES IN THE LIST APPLIANCE REMAINING */
		const listUstensiles = document.querySelector('.listElementsUstensiles');
		console.log(listUstensiles);

		listUstensiles.innerHTML = '';
		for (let i = 0; i < ustensilesRemaining.length; i++) {
			listUstensiles.innerHTML += `<p>${ustensilesRemaining[i]}</p>`
		}

		// HYDRATATION RECETTES RESTANTES

	}
} )

// NOTE : IL FAUT METTRE A JOUR EN MÊME TEMPS LES DEUX AUTRES LISTES DE CHAMPS DE RECHERCHE AVANCES
