/* RECHERCHE DES RECETTES DANS LA BARRE PRINCIPALE */

/* ADD EVENT LISTENER SUR INPUT DE L'UTILISATEUR DANS LA BARRE PRINCIPALE DE RECHERCHE */
document.querySelector('.inputSearch').addEventListener('keyup', (e) => {
	console.log(e.target.value)
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
    const recettesFinales =  searchByTags(recipesRemainingAfterSearch) 

    hydrateInterface(recettesFinales)
}

/* FONCTION D'ACTUALISATION DE L'INTERFACE AVEC LES RECETTES RESTANTES APRES FILTRATION */

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

    const mergeArraysFilter = [];

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
			mergeArraysFilter.push(arrayRecipes[i])
		}
	}
	console.log(mergeArraysFilter);
	actualisationChampsIngredients(mergeArraysFilter)
	actualisationChampsAppareils(mergeArraysFilter)
	actualisationChampsUstensiles(mergeArraysFilter)

	return mergeArraysFilter
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
	console.log(recetteReduite);
    /* TAG INGREDIENTS ADDED */
    const ingredientsElementsTags = document.querySelectorAll(".tagDesIngredients")
    const ingredientsIterable = Array.from(ingredientsElementsTags)

    let ingredients = ingredientsIterable.map((item) => {
        return item.innerText
    })
    console.log(ingredients); // JE RECUPERE UN ARRAY AVEC LES INGREDIENTS RESTANTS DES RECETTES REDUITES
         
    /* TAG APPLIANCE ADDED */
    const appliancesElements = document.querySelectorAll(".tagDesAppareils")
    const appliancesIterable = Array.from(appliancesElements)
 
    let appliance = appliancesIterable.map((item) => {
        return item.innerText
    })

   /* TAG USTENSILES ADDED */
    const ustensilsElements = document.querySelectorAll(".tagDesUstensiles")
    const ustensilsIterable = Array.from(ustensilsElements)

    let ustensiles = ustensilsIterable.map((item) => {
        return item.innerText
    })

    const recettesRestantes = recetteReduite.filter(recette => {
        let hasIngredients = true;
        let hasAppliance = true;
        let hasUstensils = true;

        let recette2 = recette.ingredients
        // console.log(recette2);
        let recette3 = recette2.map(item => {return item.ingredient})

        ingredients.forEach(ingredient => {
            if (!recette3.includes(ingredient)) {
                hasIngredients = false;
            }
        })

        appliance.forEach(appliance => {
            if (!recette.appliance.includes(appliance)) {
                hasAppliance = false;
            }
        })

        ustensiles.forEach(ustensil => {
            console.log(recette.ustensils)
            if (!recette.ustensils.includes(ustensil)) {
                hasUstensils = false;
            }
        })

        if (hasIngredients && hasAppliance && hasUstensils) {
            return true
        } else {
            return false
        }
    })

    actualisationChampsIngredients(recettesRestantes)
    actualisationChampsAppareils(recettesRestantes)
    actualisationChampsUstensiles(recettesRestantes)

    hydrateInterface(recettesRestantes) // ACTUALISATION INTERFACE
    return recettesRestantes;
}   

function actualisationChampsIngredients(recetteReduite) {
console.log(recetteReduite)
	let searchIngredient = '';
	let tableauIngredients = [];
	let listeIngredients = document.querySelector('.listElementsIngredients')

	let searchBarIngredients = document.querySelector('.inputSearchBtnIngredients')

	searchBarIngredients.addEventListener('input', () => {

		if (searchBarIngredients.value.length != 0) {
			const ingredientsArr = []
			for (let i = 0; i < recetteReduite.length; i++) {
				const ingredients = recetteReduite[i].ingredients;
				ingredientsArr.push([]);
				console.log(recetteReduite);
				console.log(ingredients);

				for (let j = 0; j < ingredients.length; j++) {
					ingredientsArr[i].push(ingredients[j].ingredient)
				}
			}
			// console.log(ingredientsArr);

			for (let i = 0; i < ingredientsArr.length; i++) {
				const ingredients = ingredientsArr[i];

				for (let j =0; j < ingredients.length; j++) {
					tableauIngredients.push(ingredients[j].toLowerCase())
				}
			}
			// console.log(tableauIngredients);
			}
		const tableauIngredientsNoDuplicate = [...new Set(tableauIngredients)]
		// console.log(tableauIngredientsNoDuplicate);

		// Search ingredients by user
		searchIngredient =searchBarIngredients.value.toLowerCase()

		// Table with match the search ingredient
		const matchSearchArr = [];
		for (let i = 0; i < tableauIngredientsNoDuplicate.length; i++) {
			if (checkInput(tableauIngredientsNoDuplicate[i], searchIngredient)) {
				matchSearchArr.push(tableauIngredientsNoDuplicate[i])
			}
		}


		listeIngredients.innerHTML = '' // CLEAN THE DOM

		for (let i = 0; i < matchSearchArr.length; i++) {
			listeIngredients.innerHTML += `<p>${matchSearchArr[i]}</p>`
		}
		addTagIngredients()
	})
	// addTagIngredients()
}

function actualisationChampsAppareils(recetteReduite) {

	let searchAppareils = '';
	let tableauAppareils = [];
	let listeAppareils = document.querySelector('.listElementsAppliances');
	
	let searchBarAppareils = document.querySelector('.inputSearchBtnAppareils')

	searchBarAppareils.addEventListener('keyup', (e) => {

		const inputSearchTag = e.target.value.toLowerCase()
		console.log(inputSearchTag);

		if(inputSearchTag) {
			const appareilsArr = [];
			for (let i = 0; i < recetteReduite.length; i++) {
				console.log(recetteReduite);
				appareilsArr.push(recetteReduite[i].appliance);
			}

			for (let i = 0; i < appareilsArr.length; i++) {
				tableauAppareils.push(appareilsArr[i].toLowerCase())
			}

			// REMOVE DUPLICATE APPLIANCE
			const tableauAppareilsNoDuplicate = [...new Set(tableauAppareils)]
			// console.log(tableauAppareilsNoDuplicate);

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
			addTagAppliances()
        }
		// addTagAppliances()
	})
}

function actualisationChampsUstensiles(recetteReduite) {
// console.log(recetteReduite)
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
			// console.log(tableauUstensilesNoDuplicate);

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
		addTagUstensiles()
	}
	// addTagUstensiles()
	})
}

hydrateInterface(recipes) // ACTUALISATION INTERFACE

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

actualisationChampsIngredients(recipes)
actualisationChampsAppareils(recipes)
actualisationChampsUstensiles(recipes)
