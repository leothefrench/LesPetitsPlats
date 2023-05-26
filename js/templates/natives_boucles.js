/* RECHERCHE DES RECETTES DANS LA BARRE PRINCIPALE */

/* ADD EVENT LISTENER SUR INPUT DE L'UTILISATEUR DANS LA BARRE PRINCIPALE DE RECHERCHE */
document.querySelector('.inputSearch').addEventListener('keyup', (e) => {
	console.log(e.target.value)
    console.log((recipes))
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
			checkTableau(tableauIngredient, userInput) ||
			checkInput(arrayRecipes[i].name, userInput) ||
			checkInput(arrayRecipes[i].description, userInput)			
		) {
			mergeArraysFilter.push(arrayRecipes[i])
		}
	}

	actualisationChampsIngredients(mergeArraysFilter)
	actualisationChampsAppareils(mergeArraysFilter)
	actualisationChampsUstensiles(mergeArraysFilter)

	return mergeArraysFilter // RETURN ALL RECIPES REMAINING AFTER SEARCH BY NAME, INGREDIENTS & DESCRIPTION
}

const checkInput = (mot, motInput) => {
	return mot.toLowerCase().match(motInput) ? true : false; // toLowerCase()
}

const checkTableau = (tableauMots, motInput) => {
	let nouveauTableau = [];

	for (let i = 0; i < tableauMots.length; i++) {
		nouveauTableau.push(tableauMots[i].toLowerCase());
	}

	let tableauMotsTrouver = [];

	for (let i= 0; i < nouveauTableau.length; i++) {
		if (nouveauTableau[i].match(motInput)) {
			tableauMotsTrouver.push(nouveauTableau[i])
		}

		if (tableauMotsTrouver > 0) {
			return true;
		} else {
			return false;
		}
	}
};

/* FONCTION D'ACTUALISATION DE L'INTERFACE AVEC LES RECETTES RESTANTES APRES FILTRATION */
const hydrateInterface = (arrRecipesRemaining) => {
	const classRecipesWrapper = document.querySelector('.recipes-wrapper')

    if(arrRecipesRemaining == 0) {
        classRecipesWrapper.innerHTML = '<h2>Aucune recette ne correspond à votre critère de recherche, vous pouvez chercher "tarte aux pommes", "poisson", etc.</h2>'
    } else {
        classRecipesWrapper.innerHTML = ''
        finalRecipeArray = Object.entries(arrRecipesRemaining);

        finalRecipeArray.forEach(recipe => createCard(recipe));
    }
}

/* IMPLEMENTATION DE LA FONCTION  GET TAG SEARCH */
function searchByTags(recetteReduite) {
	console.log(recetteReduite);
    /* TAG INGREDIENTS ADDED */
    const ingredientsElementsTags = document.querySelectorAll(".tagDesIngredients")
    const ingredientsIterable = Array.from(ingredientsElementsTags)

    let ingredients = ingredientsIterable.map((item) => {
        return item.innerText
    })
       
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

    hydrateInterface(recettesRestantes)
    return recettesRestantes;
}   

/* FONCTION DE MISE A JOUR DES CHAMPS DE RECHERCHE AVANCES - INGREDIENTS, APPAREILS, USTENSILES */
function actualisationChampsIngredients(recettes) { 
    let tagByIngredient = [];
    
    const ingredientsArrRecipe = recettes.map((arrIngredient) => {
        let tempArray = []

        arrIngredient.ingredients.map(item => {
            tempArray.push(item.ingredient)
        })

        const inter = tempArray.forEach(item => {
            tagByIngredient.push(item)
        })

        const tagByIngredientNoDuplicate = [
            ...new Set(
                tagByIngredient.map((item) => {
                    return item
                })
            )
        ]

        const listIngredientsSorted = tagByIngredientNoDuplicate.sort()

        const ingredientsElementsTags = document.querySelectorAll(".tagDesIngredients")
        const ingredientsIterable = Array.from(ingredientsElementsTags)

        const valueIngredientsTags = []
        ingredientsIterable.forEach(el => valueIngredientsTags.push(el.innerText))

        const containsTags = []
        listIngredientsSorted.filter(item => {
            if(!(valueIngredientsTags.includes(item))) {
                containsTags.push(item)
            }
        })
       
        let listItems = containsTags.map(item => {
            return '<p>' + item + '</p>'
        })
        const listElementsTagIngredients = document.querySelector('.listElementsIngredients')
        listElementsTagIngredients.innerHTML = listItems // INJECTION DANS LE CHAMPS INGREDIENTS

        /* L'UTILISATEUR PRECISE SA RECHERCHE AVEC LE CHAMPS INPUT INGREDIENTS */
        document
            .querySelector('.inputSearchBtnIngredients')
            .addEventListener('keyup', (e) => {
                const inputSearchTag = e.target.value.toLowerCase(); 

            let afterFilterByTagIngredients = []

            tagByIngredientNoDuplicate.filter(item => {
                if(item.toLowerCase().includes(inputSearchTag)) {   
                    afterFilterByTagIngredients.push(item)
                }
            })

            let listItemsTagSecondary = afterFilterByTagIngredients.map(item => {
                return '<p>' + item + '</p>'
            })

            const listElementsTagIngredients = document.querySelector('.listElementsIngredients') // HYDRATE LA LISTE DES ELEMENTS
            listElementsTagIngredients.innerHTML = listItemsTagSecondary

            addTagIngredients()     
        })
        addTagIngredients()
    })
}

/* CHAMPS APPAREILS */
function actualisationChampsAppareils(recettes) {
    let tagApplianceAfterPrincipaleSearch = [] // ARRAY VA RECEVOIR LES APPAREILS

    recettes.forEach(item => {
        tagApplianceAfterPrincipaleSearch.push(item.appliance)
    })

    const tagApplianceAfterPrincipaleSearchNoDuplicate = [...new Set(tagApplianceAfterPrincipaleSearch.map((item) => {return item}))]

    const listAppareilsSorted = tagApplianceAfterPrincipaleSearchNoDuplicate.sort()

    const appareilsElementsTags = document.querySelectorAll(".tagDesAppareils")
    const appareilsIterable = Array.from(appareilsElementsTags)

    const valueAppareilsTags = []
    appareilsIterable.forEach(el => valueAppareilsTags.push(el.innerText))

    const containsAppareilsTags = []
    listAppareilsSorted.filter(item => {
        if(!(valueAppareilsTags.includes(item))) {
            containsAppareilsTags.push(item)
        }
    })

    console.log(containsAppareilsTags)
    // HYDRATATION LIST ELEMENTS TAG APPLIANCE (APPAREILS)
    let listItemsAppliance = containsAppareilsTags.map(item => {
        return '<p>' + item + '</p>'
    })

    const listElementsTagAppliances = document.querySelector('.listElementsAppliances')
    console.log(listElementsTagAppliances)
    listElementsTagAppliances.innerHTML = listItemsAppliance // HYDRATATION LIST DES APPAREILS

    /* L'UTILISATEUR PRECISE SA RECHERCHE AVEC LE CHAMPS APPAREILS */
    const tagFilterAppliances = document.querySelector('.inputSearchBtnAppareils')
    tagFilterAppliances.addEventListener('keyup', (e) => {
        const inputSearchTag = e.target.value.toLowerCase(); 

        let afterFilterByTagAppliances = []

        tagApplianceAfterPrincipaleSearch.filter(item => {
            if(item.toLowerCase().includes(inputSearchTag)) {   
                afterFilterByTagAppliances.push(item)
            }
        })

        const tagByAppliancesNoDuplicate = [...new Set(afterFilterByTagAppliances.map((item) => {return item}))]

        console.log(tagByAppliancesNoDuplicate)

        let listItemsTagSecondaryAppliance = tagByAppliancesNoDuplicate.map(item => {
            return '<p>' + item + '</p>'
        })

        const listElementsTagAppliances = document.querySelector('.listElementsAppareils')
        console.log(listItemsTagSecondaryAppliance)
        listElementsTagAppliances.innerHTML = listItemsTagSecondaryAppliance

        addTagAppliances()
    })
    addTagAppliances()
}

/* CHAMPS USTENSILES */
function actualisationChampsUstensiles(recettes) {
    let tagUtensilsAfterPrincipaleSearch = [] // ARRAY QUI VA RECEVOIR LES USTENSILES DES RECIPES

    const tagFilterByUstensilsSecondary =  recettes.map(ele => {
        ele.ustensils.filter((item) => {
            tagUtensilsAfterPrincipaleSearch.push(item)
        })
    })  

    const arrTagUstensilesSecondaryNoDuplicate = [...new Set(tagUtensilsAfterPrincipaleSearch.map((item) => {return item}))]

    const listUstensilesSorted = arrTagUstensilesSecondaryNoDuplicate.sort()

    const ustensilsElementsTags = document.querySelectorAll(".tagDesUstensiles")
    const ustensilesIterable = Array.from(ustensilsElementsTags)

    const valueUstensilesTags = []
    ustensilesIterable.forEach(el => valueUstensilesTags.push(el.innerText))

    const containsUstensilesTags = []
    listUstensilesSorted.filter(item => {
        if(!(valueUstensilesTags.includes(item))) {
            containsUstensilesTags.push(item)
        }
    })

    // HYDRATATION LIST ELEMENTS TAG USTENSILES
    let listItemsUstensiles = containsUstensilesTags.map(item => {
        return '<p>' + item + '</p>'
    })

    const listElementsTagUtensils = document.querySelector('.listElementsUstensiles')
    listElementsTagUtensils.innerHTML = listItemsUstensiles  // HYDRATATION LISTE USTENSILES DOM

    /* L'UTILISATEUR PRECISE SA RECHERCHE AVEC LE CHAMPS USTENSILES */
    const tagFilterUstensiles = document.querySelector('.inputSearchBtnUstensiles')

    tagFilterUstensiles.addEventListener('keyup', (e) => {
        const inputSearchTag = e.target.value.toLowerCase(); 

        let afterFilterByTagUstensiles = []

        arrTagUstensilesSecondaryNoDuplicate.filter(item => {
            if(item.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").includes(inputSearchTag)) {   
                afterFilterByTagUstensiles.push(item)
            }
        })

        let listItemsTagSecondary = afterFilterByTagUstensiles.map(item => {
            return '<p>' + item + '</p>'
        })

        const listElementsTagUstensiles = document.querySelector('.listElementsUstensiles')
        listElementsTagUstensiles.innerHTML = listItemsTagSecondary

        addTagUstensiles()
    })
    addTagUstensiles()
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

            principalSearch(recipes)

            buttonTag.addEventListener('click', function () {
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

            principalSearch(recipes)

            buttonTag.addEventListener('click', function () {
                groupTags.removeChild(buttonTag)
                principalSearch(recipes)
            })
        })
    })
}

addTagUstensiles()
