/* RECHERCHE DE RECETTES DANS LA BARRE PRINCIPALE */

/* ADD EVENT LISTENER SUR INPUT DE L'UTILISATEUR DANS LA BARRE PRINCIPALE DE RECHERCHE */
document.querySelector('.inputSearch').addEventListener('keyup', (e) => {
    const dataSearch = e.target.value.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, ""); // INPUT USER IN PRINCIPAL SEARCH

    principalSearch(dataSearch, recipes) // INVOCATION FONCTION PRINCIPALSEARCH
})

/* FUNCTION DE RECHERCHE BARRE PRINCIPALE COMMENCANT A PARTIR DE 3 CARACTERES */
function principalSearch(userInput, recettes) {
    if(userInput.length > 2 ) {
        searchUser(userInput, recettes)
    }
}

/* FUNCTION FILTER BY NAME - PRINCIPAL SEARCH BAR */
function searchUser(userInput, arrayRecipes) {
    const dataFilterByName = arrayRecipes.filter((item) => {
        return (item.name.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").includes(userInput))
    })
    console.log(dataFilterByName); // OK

    /* RECIPE FILTERED BY NAME WITHOUT DUPLICATE */
    let recipeArrayFilterByName = [...new Set(dataFilterByName.map((item) => {return item}))]
    // console.log(recipeArrayFilterByName);

    /* RECIPES FILTERED BY INGREDIENTS */
    let allIngredientsOfRecipes = [];   // TEMPORARY ARRAY FOR CONTAINING AT THE END ALL INGREDIENTS
    arrayRecipes.map((arrayIngredients) => {
        let tempArray = [] // ARRAY TEMPORAIRE QUI CONTIENDRA LES ARRAYS INGREDIENTS

        arrayIngredients.ingredients.map(item => {
            tempArray.push(item.ingredient)
        })
        // console.log(tempArray) // BACK ALL ARRAYS INGREDIENTS FOR EACH RECIPE - OK

        const dataFilterByIngredients = tempArray.filter((item) => {
            if(item.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").includes(userInput)) {  
                allIngredientsOfRecipes.push(arrayIngredients) // ?? CELA NE MARCHE PAS POUR LIMONADE
            }
        }) 
    })
    console.log(allIngredientsOfRecipes)    // CHECK ARRAY WITH ALL INGREDIENTS SEARCH BY THE USER IN THE PRINCIPAL SEARCH BAR

    /* RECIPE FILTERED BY INGREDIENTS AND WITHOUT DUPLICATE */ 
    let dataFilterByIngredientsLast = [...new Set(allIngredientsOfRecipes.map((item) => {return item}))]
    console.log(dataFilterByIngredientsLast);

    /* FILTER BY DESCRIPTION - PRINCIPAL SEARCH BAR */
    const dataFilterByDescription = recipes.filter((item) => {
        return (item.description.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").includes(userInput))
    })
    console.log(dataFilterByDescription);
    /* RECIPES FILTERED BY DESCRIPTION AND WIHOUT DUPLICATE */
    let recipeArrayFilterByDescription = [...new Set(dataFilterByDescription.map((item) => {return item}))]
    console.log(recipeArrayFilterByDescription)

    // ARRAY MERGE WITHOUT DUPLICATE IN ES6 - NEW SET WITH SPREAD OPERATOR
    const mergeArraysFilter = [...new Set([...recipeArrayFilterByName, ...dataFilterByIngredientsLast, ...recipeArrayFilterByDescription])]
    console.log(mergeArraysFilter) // LOG DES RECETTES RESTANTES SANS DOUBLONS
    
    hydrateInterface(mergeArraysFilter) // INJECTION RECETTES RESTANTES DANS LE DOM APRES RECHERCHE UTILISATEUR (POINT 3)

    champsIngredients(mergeArraysFilter) 
    champsAppareils(mergeArraysFilter)
    champsUstensiles(mergeArraysFilter)

}

/* FONCTION D'ACTUALISATION DE L'INTERFACE AVEC LES RECETTES RESTANTES APRES FILTRATION */

function hydrateInterface(arrRecipesRemaining) {
    /* A1 - TESTING IF NO RECIPES ELSE DO THE NEXT THING */
    const classRecipesWrapper = document.querySelector('.recipes-wrapper') // CIBLAGE CONTENEUR DES RECIPES
    if(arrRecipesRemaining == 0) {
        classRecipesWrapper.innerHTML = '<h2>Aucune recette ne correspond à votre critère de recherche, vous pouvez chercher "tarte aux pommes", "poisson", etc.</h2>'
    } else {
        classRecipesWrapper.innerHTML = ''   // CLEAN DOM RECIPES WRAPPER CONTAINER
        finalRecipeArray = Object.entries(arrRecipesRemaining);

        finalRecipeArray.forEach(recipe => createCard(recipe));     // INJECTION IN THE DOM AVEC FONCTION CREATECARD (ModelRecipes.js)
    }
}

/* FONCTION DE MISE A JOUR DES CHAMPS DE RECHERCHE AVANCES - INGREDIENTS, APPAREILS, USTENSILES */

function champsIngredients(recettes) { // ON PASSE LES RECIPES RESTANTES APRES FILTRATION - NAME - INGREDIENTS - DESCRIPTION
    let tagByIngredient = []; // VA RECEVOIR TOUS LES INGREDIENTS
    
    const ingredientsArrRecipe = recettes.map((arrIngredient) => {
        let tempArray = []

        arrIngredient.ingredients.map(item => {
            tempArray.push(item.ingredient)
        })
        // console.log(tempArray)
        const inter = tempArray.forEach(item => {
            tagByIngredient.push(item)
        })
        // console.log(tagByIngredient) // RECUPERATION DE TOUS LES INGREDIENTS DANS UN SEUL ARRAY
        const tagByIngredientNoDuplicate = [...new Set(tagByIngredient.map((item) => {return item}))]
        // console.log(tagByIngredientNoDuplicate) // CHECK NO DUPLICATE INTO ARRAY OF INGREDIENTS

        const listIngredientsSorted = tagByIngredientNoDuplicate.sort() // PAR ORDRE ALPHABETIQUE
        // console.log(listIngredientsSorted) // OK
       
        let listItems = listIngredientsSorted.map(item => {
            return '<p>' + item + '</p>'
        })
        const listElementsTagIngredients = document.querySelector('.listElementsIngredients')
        listElementsTagIngredients.innerHTML = listItems // INJECTION DANS LE CHAMPS INGREDIENTS

        /* L'UTILISATEUR PRECISE SA RECHERCHE AVEC LE CHAMPS INGREDIENTS (POINT 5) */
        document.querySelector('.inputSearchBtnIngredients').addEventListener('keyup', (e) => {
            const inputSearchTag = e.target.value.toLowerCase(); 

            let afterFilterByTagIngredients = []

            tagByIngredientNoDuplicate.filter(item => {
                if(item.toLowerCase().includes(inputSearchTag)) {   
                    afterFilterByTagIngredients.push(item)
                    // console.log(afterFilterByTagIngredients);
                }
            })

            let listItemsTagSecondary = afterFilterByTagIngredients.map(item => {
                return '<p>' + item + '</p>'
            })

            const listElementsTagIngredients = document.querySelector('.listElementsIngredients') // HYDRATE LA LISTE DES ELEMENTS
            listElementsTagIngredients.innerHTML = listItemsTagSecondary

            choiceChamps('listElementsIngredients', 'resultTag:first-child', 'resultTag:nth-child(2)', 'resultTag:last-child' ) // FONCTION QUI ECOUTE l'EVENEMENT CLICK SUR INGREDIEN T      
        })
    })
}
/* CHAMPS APPAREILS */
function champsAppareils(recettes) {
    let tagApplianceAfterPrincipaleSearch = [] // ARRAY VA RECEVOIR LES APPAREILS

    recettes.forEach(item => {
        tagApplianceAfterPrincipaleSearch.push(item.appliance)
    })

    // console.log(tagApplianceAfterPrincipaleSearch); // RETOURNE BIEN UN ARRAY AVEC LES APPAREILS DES RECETTES
    const tagApplianceAfterPrincipaleSearchNoDuplicate = [...new Set(tagApplianceAfterPrincipaleSearch.map((item) => {return item}))]
    // console.log(tagApplianceAfterPrincipaleSearchNoDuplicate) // RETOURNE L'ARRAY PRECEDENTS SANS DOUBLONS

    // HYDRATATION LIST ELEMENTS TAG APPLIANCE (APPAREILS)
    let listItemsAppliance = tagApplianceAfterPrincipaleSearchNoDuplicate.map(item => {
        return '<p>' + item + '</p>'
    })

    const listElementsTagAppliances = document.querySelector('.listElementsAppareils')
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
        let listItemsTagSecondary = afterFilterByTagAppliances.map(item => {
            console.log(item);
            return '<p>' + item + '</p>'
        })
        
        console.log(afterFilterByTagAppliances)

        const listElementsTagAppliances = document.querySelector('.listElementsAppareils')
        listElementsTagAppliances.innerHTML = listItemsTagSecondary // HYDRATATION APRES RECHERCHE UTILISATEUR

        choiceChamps('listElementsAppareils', 'resultTag:nth-child(2)', 'resultTag:last-child', 'resultTag:first-child')  // FONCTION QUI ECOUTE l'EVENEMENT CLICK SUR APPAREILS
    })
}
/* CHAMPS USTENSILES */
function champsUstensiles(recettes) {
    let tagUtensilsAfterPrincipaleSearch = [] // ARRAY QUI VA RECEVOIR LES USTENSILES DES RECIPES
    const tagFilterByUstensilsSecondary =  recettes.map(ele => {
        ele.ustensils.filter((item) => {
            tagUtensilsAfterPrincipaleSearch.push(item)
        })
    })  
    // console.log(tagUtensilsAfterPrincipaleSearch);
    const arrTagUstensilesSecondaryNoDuplicate = [...new Set(tagUtensilsAfterPrincipaleSearch.map((item) => {return item}))]
    // console.log(arrTagUstensilesSecondaryNoDuplicate)
    const listUstensilesSorted = arrTagUstensilesSecondaryNoDuplicate.sort()
    // console.log(listUstensilesSorted);

    // HYDRATATION LIST ELEMENTS TAG USTENSILES
    let listItemsUstensiles = listUstensilesSorted.map(item => {
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

        console.log(arrTagUstensilesSecondaryNoDuplicate);

        let listItemsTagSecondary = afterFilterByTagUstensiles.map(item => {
            // console.log(item);
            return '<p>' + item + '</p>'
        })
        const listElementsTagUstensiles = document.querySelector('.listElementsUstensiles')
        listElementsTagUstensiles.innerHTML = listItemsTagSecondary

        choiceChamps('listElementsUstensiles', 'resultTag:last-child', 'resultTag:first-child', 'resultTag:nth-child(2)')
    })
}

/* L'UTILISATEUR CHOISIT UN MOT DANS UN DES CHAMPS QUI AFFICHE LE TAG & DISPLAY NONE LES 2 AUTRES TAGS */

function choiceChamps(nameListChamps, resultChampsChild, brotherOneTag, brotherTwoTag) {
    const listOfChamps = document.querySelectorAll(`.${nameListChamps} > p`)
    const listing = [...listOfChamps] // TRANSFORME EN ARRAY AVEC SPREAD OPERATOR

    listing.forEach((item) => {
        item.addEventListener('click', function() {

        const groupTags = document.querySelector('.groupResultsTags')

        const groupTagsIngredients = document.querySelector(`.${resultChampsChild}`)
        groupTagsIngredients.innerHTML = item.innerText
        groupTags.style.display = 'flex'
  
        const tagBrotherOneDisplay = document.querySelector(`.${brotherOneTag}`)
        tagBrotherOneDisplay.style.display = 'none'

        const tagBrotherTwoDisplay = document.querySelector(`.${brotherTwoTag}`)
        tagBrotherTwoDisplay.style.display = 'none'

        let value = item.innerText
        console.log(value) // J'AI LA VALUE  ET MAINTENANT IL FAUT LA récuperer puis HYDRATER LA PAGE WEB MAIS COMMENT ?


        })
    })
}


/* A2 */
champsIngredients(recipes)
champsAppareils(recipes)
champsUstensiles(recipes)

// INTERSECTION DES ARRAYS SERACH BY TAGS



/* A3 */
/* POUR CHAQUE BOUTON, RECUPERER L'EVENEMENT CLICK, DECLENCHER UNE FONCTION QUI AJOUTE UN ELEMENT TAG
CORRESPONDANT A SA CATEGORIE*/
function addTag() {
    const listOfChamps = document.querySelectorAll(`.${nameListChamps} > p`)
    const listing = [...listOfChamps]

    listing.forEach((item) => {
        item.addEventListener('click', function() {
        
        })
    })
}