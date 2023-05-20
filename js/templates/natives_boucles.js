/* RECHERCHE DES RECETTES DANS LA BARRE PRINCIPALE */

/* ADD EVENT LISTENER SUR INPUT DE L'UTILISATEUR DANS LA BARRE PRINCIPALE DE RECHERCHE */
document.querySelector('.inputSearch').addEventListener('keyup', () => {
    principalSearch(recipes)
})

/* FUNCTION DE RECHERCHE BARRE PRINCIPALE COMMENCANT AVEC AU MOINS DE 3 CARACTERES */

function principalSearch(recettes) {
    const dataSearch = document
        .querySelector('.inputSearch')
        .value.toLowerCase()
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, ""); 

    const recipesRemainingAfterSearch = searchUser(dataSearch, recettes)
    const recettesFinales =  searchByTags(recipesRemainingAfterSearch) // IMPLEMENTER SEARCH BY TAGS

    hydrateInterface(recipesRemainingAfterSearch)
}

const hydrateInterface = (arrRecipesRemaining) => {
	const classRecipesWrapper = document.querySelector('.recipes-wrapper')

    if(arrRecipesRemaining == 0) {
        classRecipesWrapper.innerHTML = '<h2>Aucune recette ne correspond à votre critère de recherche, vous pouvez chercher "tarte aux pommes", "poisson", etc.</h2>'
    } else {
        classRecipesWrapper.innerHTML = ''   // CLEAN DOM RECIPES WRAPPER CONTAINER
        finalRecipeArray = Object.entries(arrRecipesRemaining);

        finalRecipeArray.forEach(recipe => createCard(recipe));     // INJECTION IN THE DOM
    }
}

/* SEARCH BY PRINCIPAL BAR */
function searchUser(userInput, arrayRecipes) {
    if(userInput.length < 3) return arrayRecipes

    const tableauFilter = [];

	for (let i = 0; i < arrayRecipes.length; i++) {
		const ingredients = arrayRecipes[i].ingredients;
		const tableauIngredient = [];

		for (let j = 0; j < ingredients.length; j ++) {
			tableauIngredient.push(ingredients[j].ingredient)
		}

		if (
			checkInput(arrayRecipes[i].name, userInput) ||
			checkInput(arrayRecipes[i].description, userInput) ||
			checkTableau(tableauIngredient, userInput)
		) {
			tableauFilter.push(arrayRecipes[i])
		} else {
			console.log('Aucunes recettes');
		}
	}
	console.log(tableauFilter);
	return tableauFilter;
}


const checkInput = (mot, motInput) => {
	return mot.toLowerCase().match(motInput.toLowerCase()) ? true : false;
}

const checkTableau = (tableauMots, motInput) => {
	let nouveauTableau = [];

	for (let i = 0; i < tableauMots.length; i++) {
		nouveauTableau.push(tableauMots[i].toLowerCase());
	}

	let tableauMotsTrouver = [];

	for (let i= 0; i < nouveauTableau.length; i++) {
		if (nouveauTableau[i].match(motInput.toLowerCase())) {
			tableauMotsTrouver.push(nouveauTableau[i])
		}

		if (tableauMotsTrouver > 0) {
			return true;
		} else {
			return false;
		}
	}
};




function searchByTags(recetteReduite) {

	function actualisationChampsIngredients(recetteReduite) {
		let searchIngredient = '';
		let tableauIngredients = [];
		let listeIngredients = document.querySelector('.listElementsIngredients')
		// console.log(listeIngredients)

		let searchBarIngredients = document.querySelector('.inputSearchBtnIngredients')
		// console.log(searchBarIngredients);

		searchBarIngredients.addEventListener('input', () => {
			if ( searchBarIngredients.value.length >= 1) {
				const ingredientsArr = []
				for (let i = 0; i < recetteReduite.length; i++) {
					const ingredients = recetteReduite[i].ingredients;
					ingredientsArr.push([]);
					console.log(ingredients);

					for (let j = 0; j < ingredients.length; j++) {
						ingredientsArr[i].push(ingredients[j].ingredient)
					}
				}
				console.log(ingredientsArr);

				for (let i = 0; i < ingredientsArr.length; i++) {
					const ingredients = ingredientsArr[i];

					for (let j =0; j < ingredients.length; j++) {
						tableauIngredients.push(ingredients[j].toLowerCase())
					}
				}
				console.log(tableauIngredients);
			}
			const tableauIngredientsNoDuplicate = [...new Set(tableauIngredients)]
			console.log(tableauIngredientsNoDuplicate);

			// Search ingredients by user
			searchIngredient =searchBarIngredients.value.toLowerCase()

			// Table with match the search ingredient
			const matchSearchArr = [];
			for (let i = 0; i < tableauIngredientsNoDuplicate.length; i++) {
				if (checkInput(tableauIngredientsNoDuplicate[i], searchIngredient)) {
					matchSearchArr.push(tableauIngredientsNoDuplicate[i])
				}
			}

			console.log(matchSearchArr);

			listeIngredients.innerHTML = '' // CLEAN THE DOM

			for (let i = 0; i < matchSearchArr.length; i++) {
				listeIngredients.innerHTML += `<p>${matchSearchArr[i]}</p>`
			}	
		})
	}

	function actualisationChampsAppareils(recetteReduite) {
		let searchAppareils = '';
		let tableauAppareils = [];
		let listeAppareils = document.querySelector('.listElementsAppliances');
		// console.log(listeAppareils)
		let searchBarAppareils = document.querySelector('.inputSearchBtnAppareils')
		// console.log(searchBarAppareils);

		searchBarAppareils.addEventListener('input', () => {
			if(searchBarAppareils.value.length >= 1) {
				const appareilsArr = [];
				for (let i = 0; i < recetteReduite.length; i++) {
					appareilsArr.push(recetteReduite[i].appliance);
				}

				for (let i = 0; i < appareilsArr.length; i++) {
					tableauAppareils.push(appareilsArr[i].toLowerCase())
				}

				// REMOVE DUPLICATE APPLIANCE
				const tableauAppareilsNoDuplicate = [...new Set(tableauAppareils)]
				console.log(tableauAppareilsNoDuplicate);

				searchAppareils = searchBarAppareils.value.toLowerCase()

				// Table with match the search appareil
        		const matchSearchArrAppliance = [];
        		for (let i = 0; i < tableauAppareilsNoDuplicate.length; i++) {
            		if (checkInput(tableauAppareilsNoDuplicate[i], searchAppareils)) {
                matchSearchArrAppliance.push(tableauAppareilsNoDuplicate[i])
            	}
				console.log(matchSearchArrAppliance);

				listeAppareils.innerHTML = '' // CLEAN THE DOM
				for (let i= 0; i < matchSearchArrAppliance.length; i++)  {
					listeAppareils.innerHTML += `<p>${matchSearchArrAppliance[i]}</p>`
				}
        	}
		}
		})
	}   

	function actualisationChampsUstensiles(recetteReduite) {}
	// console.log(recetteReduite);
		let searchUstensiles = '';
		let tableauUstensiles = [];
		let listeUstensiles = document.querySelector('.listElementsUstensiles')
		// console.log(listeUstensiles)
		let searchBarUstensiles = document.querySelector('.inputSearchBtnUstensiles')
		// console.log(searchBarUstensiles);

		searchBarUstensiles.addEventListener('input', () => {
			if (searchBarUstensiles.value.length >= 1) {
				const ustensilesArr = [];

				for (let i = 0; i < recetteReduite.length; i++) {
					ustensilesArr.push(recetteReduite[i].ustensils)
				}

				for (let i = 0; i < ustensilesArr.length; i++) {
					const ustensiles = ustensilesArr[i];
					for (let j = 0; j < ustensiles.length; j++) {
						tableauUstensiles.push(ustensiles[j].toLowerCase())
					}
				}

				const tableauUstensilesNoDuplicate = [...new Set(tableauUstensiles)]
				console.log(tableauUstensilesNoDuplicate);

				searchUstensiles =  searchBarUstensiles.value.toLowerCase();

				// Table with match the search ustensiles
        		const matchSearchArrUstensile = [];
        		for (let i = 0; i < tableauUstensilesNoDuplicate.length; i++) {
            		if (checkInput(tableauUstensilesNoDuplicate[i], searchUstensiles)) {
                matchSearchArrUstensile.push(tableauUstensilesNoDuplicate[i])
            	}

				listeUstensiles.innerHTML = '' // CLEAN THE DOM
				for (let i= 0; i < matchSearchArrUstensile.length; i++)  {
					listeUstensiles.innerHTML += `<p>${matchSearchArrUstensile[i]}</p>`
				}
			}
		}
	})

    actualisationChampsIngredients(recetteReduite);
	actualisationChampsAppareils(recetteReduite)
    actualisationChampsUstensiles(recetteReduite)

	hydrateInterface(recipes)

    return recetteReduite;
}   

hydrateInterface(recipes) // ACTUALISATION INTERFACE



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

// getAllIngredients()

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
// getAllAppliance();

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

	// DELETE DUPLICATE IN THE ARRAY ALL UTENSILS IN LOWER CASE
	const allUtensilsInLowerCaseNoDuplicate = [...new Set(allUtensilsInLowerCase)];
	
	// console.log(allUtensilsInLowerCaseNoDuplicate);

	return allUtensilsInLowerCaseNoDuplicate
}
// getUtensils();

/* FILTRATION PAR CHAMPS AVANCES INGREDIENTS - APPLIANCES & UTENSILS */

/* FILTRATION CHAMPS INGREDIENTS */
let listIngredientsNoDuplicate = getAllIngredients();
// console.log(listIngredientsNoDuplicate);
const champsInputIngredients = document.querySelector('.inputSearchBtnIngredients');
// console.log(champsInputIngredients)

champsInputIngredients.addEventListener('keyup', (e) => {
	let inputIngredient = e.target.value.toLowerCase()
	// console.log(inputIngredient)

	if(inputIngredient.length >= 1) {
		let ingredientsRemaining = [];

		for (let i = 0; i < listIngredientsNoDuplicate.length; i++) {
			if(listIngredientsNoDuplicate[i].match(inputIngredient)) {
				ingredientsRemaining.push(listIngredientsNoDuplicate[i]);
			}
		}
		// console.log(ingredientsRemaining);

		/* INJECTION INGREDIENTS IN THE LIST INGREDIENTS REMAINING */
		const listIngredients= document.querySelector('.listElementsIngredients');
		// console.log(listIngredients);

		listIngredients.innerHTML = '';
		for (let i = 0; i < ingredientsRemaining.length; i++) {
			listIngredients.innerHTML += `<p>${ingredientsRemaining[i]}</p>`
		}
	}
} )

/* FILTRATION CHAMPS APPLIANCES */
let listAppliancesNoDuplicate = getAllAppliance();
// console.log(listAppliancesNoDuplicate);
const champsInputAppliances = document.querySelector('.inputSearchBtnAppareils');
// console.log(champsInputAppliances)

champsInputAppliances.addEventListener('keyup', (e) => {
	let inputAppliance = e.target.value.toLowerCase()
	// console.log(inputAppliance)

	if(inputAppliance.length >= 1) {
		let appliancesRemaining = [];

		for (let i = 0; i < listAppliancesNoDuplicate.length; i++) {
			if(listAppliancesNoDuplicate[i].match(inputAppliance)) {
				appliancesRemaining.push(listAppliancesNoDuplicate[i]);
			}
		}
		// console.log(appliancesRemaining);

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
// console.log(listUstensilesNoDuplicate);
const champsInputUstensiles = document.querySelector('.inputSearchBtnUstensiles');
// console.log(champsInputUstensiles)

champsInputUstensiles.addEventListener('keyup', (e) => {
	let inputUstensile = e.target.value.toLowerCase()
	// console.log(inputUstensile)

	if(inputUstensile.length >= 1) {
		let ustensilesRemaining = [];

		for (let i = 0; i < listUstensilesNoDuplicate.length; i++) {
			if(listUstensilesNoDuplicate[i].match(inputUstensile)) {
				ustensilesRemaining.push(listUstensilesNoDuplicate[i]);
			}
		}
		// console.log(ustensilesRemaining);

		/* INJECTION APPLIANCES IN THE LIST APPLIANCE REMAINING */
		const listUstensiles = document.querySelector('.listElementsUstensiles');
		// console.log(listUstensiles);

		listUstensiles.innerHTML = '';
		for (let i = 0; i < ustensilesRemaining.length; i++) {
			listUstensiles.innerHTML += `<p>${ustensilesRemaining[i]}</p>`
		}
	}
} )

/* DEFINITION DE LA FONCTION QUI RECOIT LE CLIQUE UTILISATEUR SUR LE CHAMPS INGREDIENTS ET AJOUTE LE TAG OU LES TAGS */

function addTagIngredients() {
    const listOfChamps = document.querySelectorAll('.listElementsIngredients > p')
    const listing = [...listOfChamps] // TRANSFORME EN ARRAY AVEC SPREAD OPERATOR

    listing.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault()
            const groupTags = document.querySelector('.groupResultsTags')
            groupTags.style.display = 'flex'
            const buttonTag = document.createElement('button')
            buttonTag.classList.add('resultTag')
            buttonTag.style.backgroundColor = '#3282F7';
            const spanButton = document.createElement('span')
            spanButton.classList.add('tagDesIngredients')
            spanButton.innerText = `${item.innerText}`
            const crossInsideSpan = document.createElement('i')
            crossInsideSpan.classList.add('fa-regular')
            crossInsideSpan.classList.add('fa-circle-xmark')
            spanButton.appendChild(crossInsideSpan)
            buttonTag.appendChild(spanButton)

            groupTags.appendChild(buttonTag)
  
            principalSearch(recipes)

            spanButton.addEventListener('click', function () {
                console.log(buttonTag, 'BUTTON INGREDIENTS')
                groupTags.removeChild(buttonTag)
                principalSearch(recipes)
            })
       })
    })  
}

addTagIngredients()

/* DEFINITION DE LA FONCTION QUI RECOIT LE CLIQUE UTILISATEUR SUR LE CHAMPS APPAREILS ET AJOUTE LE TAG OU LES TAGS */
function addTagAppliances() {
    const listOfChamps = document.querySelectorAll('.listElementsAppliances > p')
    const listing = [...listOfChamps] // TRANSFORME EN ARRAY AVEC SPREAD OPERATOR

    listing.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault()
            const groupTags = document.querySelector('.groupResultsTags')
            groupTags.style.display = 'flex'
            const buttonTag = document.createElement('button')
            buttonTag.classList.add('resultTag')
            buttonTag.style.backgroundColor = '#68D9A4';
            buttonTag.innerHTML = `<span class='tagDesAppareils'>${item.innerText}<i class="fa-regular fa-circle-xmark"></i></span>`
            groupTags.appendChild(buttonTag)
            console.log('POUF 2')

            principalSearch(recipes)

            buttonTag.addEventListener('click', function () {
                console.log(buttonTag, 'BUTTON APPLIANCE')
                groupTags.removeChild(buttonTag)
                principalSearch(recipes)
            })
        })
    })
}
addTagAppliances()

/* DEFINITION DE LA FONCTION QUI RECOIT LE CLIQUE UTILISATEUR SUR LE CHAMPS USTENSILES ET AJOUTE LE TAG OU LES TAGS */
function addTagUstensiles() {
    const listOfChamps = document.querySelectorAll('.listElementsUstensiles > p')
    const listing = [...listOfChamps] // TRANSFORME EN ARRAY AVEC SPREAD OPERATOR

    listing.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault()
            const groupTags = document.querySelector('.groupResultsTags')
            groupTags.style.display = 'flex'
            const buttonTag = document.createElement('button')
            buttonTag.classList.add('resultTag')
            buttonTag.style.backgroundColor = '#ED6454';
            buttonTag.innerHTML = `<span class='tagDesUstensiles'>${item.innerText}<i class="fa-regular fa-circle-xmark"></i></span>`
            groupTags.appendChild(buttonTag)
            console.log('POUF 3') 

            principalSearch(recipes)

            buttonTag.addEventListener('click', function () {
                console.log(buttonTag, 'BUTTON USTENSILES')
                groupTags.removeChild(buttonTag)
                principalSearch(recipes)
            })
        })
    })
}

addTagUstensiles()

