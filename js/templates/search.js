/* RECHERCHE DE RECETTES DANS LA BARRE PRINCIPALE */

/* ADD EVENT LISTENER SUR INPUT DE LA BARRE PRINCIPALE DE RECHERCHE */
document.querySelector('.inputSearch').addEventListener('keyup', (e) => {
    const dataSearch = e.target.value.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, ""); // INPUT USER IN PRINCIPAL SEARCH

    principalSearch(dataSearch)
})

/* FUNCTION DE RECHERCHE BARRE PRINCIPALE COMMENCANT A PARTIR DE 3 CARACTERES */
function principalSearch(userInput) {
    if(userInput.length > 2 ) {
        searchUser(userInput, recipes)
    }
}

/* FUNCTION FILTER BY NAME - PRINCIPAL SEARCH BAR */
function searchUser(userInput, arrayRecipes) {
    const dataFilterByName = arrayRecipes.filter((item) => {
        return (item.name.toLowerCase().includes(userInput))
    })
    console.log(dataFilterByName);

    /* RECIPE FILTERED BY NAME WITHOUT DUPLICATE */
    let recipeArrayFilterByName = [...new Set(dataFilterByName.map((item) => {return item}))]
    // console.log(recipeArrayFilterByName);

    /* RECIPE FILTERED BY INGREDIENTS */
    let allIngredientsOfRecipes = [];   // TEMPORARY ARRAY FOR CONTAINING ALL INGREDIENTS
    arrayRecipes.map((arrayIngredients) => {
        let tempArray = []

        arrayIngredients.ingredients.map(item => {
            tempArray.push(item.ingredient)
        })
        // console.log(tempArray) // BACK ALL ARRAYS INGREDIENTS FOR EACH RECIPE

        const dataFilterByIngredients = tempArray.filter((item) => {
            if(item.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").includes(userInput)) {  
                allIngredientsOfRecipes.push(arrayIngredients) // BUG ICI
            }
        }) 
    })
    // console.log(allIngredientsOfRecipes)    // CHECK ARRAY WITH ALL INGREDIENTS SEARCH BY THE USER IN THE PRINCIPAL SEARCH BAR

    /* RECIPE FILTERED BY INGREDIENTS AND WITHOUT DUPLICATE */ 
    let dataFilterByIngredientsLast = [...new Set(allIngredientsOfRecipes.map((item) => {return item}))]
    // console.log(dataFilterByIngredientsLast); // BUG LIGNE  45 
    

    /* FILTER BY DESCRIPTION - PRINCIPAL SEARCH BAR */
    const dataFilterByDescription = recipes.filter((item ) => {
        return (item.description.toLowerCase().includes(userInput))
    })
    // console.log(dataFilterByDescription);
    /* RECIPES FILTERED BY DESCRIPTION AND WIHOUT DUPLICATE */
    let recipeArrayFilterByDescription = [...new Set(dataFilterByDescription.map((item) => {return item}))]
    console.log(recipeArrayFilterByDescription)

    // ARRAY MERGE WITHOUT DUPLICATE IN ES6 - NEW SET
    const mergeArraysFilter = [...new Set([...recipeArrayFilterByName, ...dataFilterByIngredientsLast, ...recipeArrayFilterByDescription])]
    // console.log(mergeArraysFilter)
    hydrateInterface(mergeArraysFilter) // INJECTION RECETTES RESTANTES DANS LE DOM APRES RECHERCHE UTILISATEUR

    champsIngredients(mergeArraysFilter) 
    champsAppareils(mergeArraysFilter)
    champsUstensiles(mergeArraysFilter)
}


/* ACTUALISATION DE L'INTERFACE RESTANTES APRES FILTRATION */

function hydrateInterface(arrRecipesRemaining) {
    /* A1 - TESTING IF NO RECIPES ELSE DO THE NEXT THING */
    const classRecipesWrapper = document.querySelector('.recipes-wrapper')
    if(arrRecipesRemaining == 0) {
        classRecipesWrapper.innerHTML = '<h2>Aucune recette ne correspond à votre critère de recherche, vous pouvez chercher "tarte aux pommes", "poisson", etc.</h2>'
    } else {
        classRecipesWrapper.innerHTML = ''   // CLEAN DOM RECIPES WRAPPER CONTAINER
        finalRecipeArray = Object.entries(arrRecipesRemaining);

        finalRecipeArray.forEach(recipe => createCard(recipe));     // INJECTION IN THE DOM AFTER SORTING BY NAME
    }
}

/* MISE A JOUR DES CHAMPS DE RECHERCHE AVANCES - INGREDIENTS, APPAREILS, USTENSILES */
function champsIngredients(recettes) {
    let tagByIngredient = [];
    
    const ingredientsArrRecipe = recettes.map((arrIngredient) => {
        let tempArray = []

        arrIngredient.ingredients.map(item => {
            tempArray.push(item.ingredient)
        })
        // console.log(tempArray)
        const inter = tempArray.forEach(item => {
            tagByIngredient.push(item)
        })
        // console.log(tagByIngredient)
        const tagByIngredientNoDuplicate = [...new Set(tagByIngredient.map((item) => {return item}))]
        // console.log(tagByIngredientNoDuplicate) // CHECK NO DUPLICATE INTO ARRAY OF INGREDIENTS

        const listIngredientsSorted = tagByIngredientNoDuplicate.sort()
        // console.log(listIngredientsSorted)
        
        let listItems = listIngredientsSorted.map(item => {
            return '<p>' + item + '</p>'
        })
        const listElementsTagIngredients = document.querySelector('.listElementsIngredients')
        listElementsTagIngredients.innerHTML = listItems

        /* L'UTILISATEUR PRECISE SA RECHERCHE AVEC LE CHAMPS INGREDIENTS */
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

            const listElementsTagIngredients = document.querySelector('.listElementsIngredients')
            listElementsTagIngredients.innerHTML = listItemsTagSecondary

            choiceChamps('listElementsIngredients', 'resultTag:first-child')
            
        })
    })
}
/* CHAMPS APPAREILS */
function champsAppareils(recettes, clikedValue) {
    let tagApplianceAfterPrincipaleSearch = []

    recettes.forEach(item => {
        tagApplianceAfterPrincipaleSearch.push(item.appliance)
    })

    const tagApplianceAfterPrincipaleSearchNoDuplicate = [...new Set(tagApplianceAfterPrincipaleSearch.map((item) => {return item}))]

    // HYDRATATION LIST ELEMENTS TAG APPLIANCE (APPAREILS)
    let listItemsAppliance = tagApplianceAfterPrincipaleSearchNoDuplicate.map(item => {
        return '<p>' + item + '</p>'
    })

    const listElementsTagAppliances = document.querySelector('.listElementsAppareils')
    listElementsTagAppliances.innerHTML = listItemsAppliance

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
        listElementsTagAppliances.innerHTML = listItemsTagSecondary

        choiceChamps('listElementsAppareils', 'resultTag:nth-child(2)')
    })
}
/* CHAMPS USTENSILES */
function champsUstensiles(recettes, inputSearchTag) {
    let tagUtensilsAfterPrincipaleSearch = []
    const tagFilterByUstensilsSecondary =  recettes.map(ele => {
        ele.ustensils.filter((item) => {
            tagUtensilsAfterPrincipaleSearch.push(item)
        })
    })  

    const arrTagUstensilesSecondaryNoDuplicate = [...new Set(tagUtensilsAfterPrincipaleSearch.map((item) => {return item}))]
    const listUstensilesSorted = arrTagUstensilesSecondaryNoDuplicate.sort()

    // HYDRATATION LIST ELEMENTS TAG USTENSILES
    let listItemsUstensiles = listUstensilesSorted.map(item => {
        return '<p>' + item + '</p>'
    })
    const listElementsTagUtensils = document.querySelector('.listElementsUstensiles')
    listElementsTagUtensils.innerHTML = listItemsUstensiles  

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
            // console.log(item);
            return '<p>' + item + '</p>'
        })
        const listElementsTagUstensiles = document.querySelector('.listElementsUstensiles')
        listElementsTagUstensiles.innerHTML = listItemsTagSecondary

        choiceChamps('listElementsUstensiles', 'resultTag:last-child')
    })
}

/* L'UTILISATEUR CHOISIT UN MOT DANS UN DES CHAMPS QUI AFFICHE LE TAG*/

function choiceChamps(nameListChamps, resultChampsChild) {
    const listOfChamps = document.querySelectorAll(`.${nameListChamps} > p`)
    const listing = [...listOfChamps]

    listing.forEach((item) => {
        item.addEventListener('click', function() {

        const groupTags = document.querySelector('.groupResultsTags')

        const groupTagsIngredients = document.querySelector(`.${resultChampsChild}`)
        groupTagsIngredients.innerHTML = item.innerText
        groupTags.style.display = 'flex'

        const value = item.innerText
        console.log(value) // J'AI LA VALUE  ET MAINTENANT  ???

        })
    })
}

champsIngredients(recipes)
champsAppareils(recipes)
champsUstensiles(recipes)

/* A2 */
// document.querySelector('.inputSearchBtnIngredients').addEventListener('keyup', (e) => {
//     const dataSearchINGREDIENTS = e.target.value.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, ""); // INPUT USER BUTTON
//     console.log(dataSearchINGREDIENTS)
//     champsIngredients(recipes)
//     champsAppareils(recipes)
//     champsUstensiles(recipes)
// })

// document.querySelector('.inputSearchBtnAppareils').addEventListener('keyup', (e) => {
//     const dataSearch = e.target.value.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, ""); // INPUT USER BUTTON

//     champsAppareils(recipes)
//     champsUstensiles(recipes)
//     champsIngredients(recipes)
// })

// document.querySelector('.inputSearchBtnUstensiles').addEventListener('keyup', (e) => {
//     const dataSearch = e.target.value.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, ""); // INPUT USER BUTTON

//     champsUstensiles(recipes)
//     champsIngredients(recipes)
//     champsAppareils(recipes)
// })


/* A3 */

