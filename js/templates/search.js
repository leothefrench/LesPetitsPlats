/* RECHERCHE DE RECETTES DANS LA BARRE PRINCIPALE */

/* ADD EVENT LISTENER SUR INPUT DE L'UTILISATEUR DANS LA BARRE PRINCIPALE DE RECHERCHE */
document.querySelector('.inputSearch').addEventListener('keyup', (e) => {
    const dataSearch = e.target.value.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, ""); // INPUT USER IN PRINCIPAL SEARCH
    console.log(dataSearch);

    principalSearch(dataSearch, recipes)
})

const tag = [] // POUR L'AJOUT DES VALEURS DES TAGS QUE L'ON VA RECUPERER ???

/* FUNCTION DE RECHERCHE BARRE PRINCIPALE COMMENCANT AVEC AU MOINS DE 3 CARACTERES */
function principalSearch(userInput, recettes) {

    const recipesRemainingAfterSearch = searchUser(userInput, recettes) 
    console.log(recipesRemainingAfterSearch);
    const recettesFinales =  searchByTags(recipesRemainingAfterSearch)

    hydrateInterface(recettesFinales)
}


searchByTags(recipes) // RECHERCHE DIRECTE PAR LES CHAMPS AVANCES

/* SEARCH BY PRINCIPAL BAR */
function searchUser(userInput, arrayRecipes) {
    if(userInput.length < 3) return arrayRecipes

    /* FUNCTION FILTER BY NAME */
    const dataFilterByName = arrayRecipes.filter((item) => {
        return (item.name.toLowerCase().includes(userInput))
    })
    // console.log(dataFilterByName);

    /* RECIPES REMAINING FILTERED BY NAME WITHOUT DUPLICATE */
    let recipeArrayFilterByName = [...new Set(dataFilterByName.map((item) => {return item}))]
    console.log(recipeArrayFilterByName);

    /* RECIPES FILTERED BY INGREDIENTS */
    let allIngredientsOfRecipes = [];   // TEMPORARY ARRAY FOR CONTAINING AT THE END ALL INGREDIENTS
    arrayRecipes.map((arrayIngredients) => {
        let tempArray = [] // ARRAY TEMPORAIRE QUI CONTIENDRA LES ARRAYS INGREDIENTS DE CHQUE RECETTE

        arrayIngredients.ingredients.map(item => {
            tempArray.push(item.ingredient)
        })
        // console.log(tempArray) // BACK ALL ARRAYS INGREDIENTS FOR EACH RECIPE - OK

        const dataFilterByIngredients = tempArray.filter((item) => {
            if(item.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").includes(userInput)) {  
                allIngredientsOfRecipes.push(arrayIngredients)
            }
        }) 
    })

    /* RECIPES REMAINING FILTERED BY INGREDIENTS AND WITHOUT DUPLICATE */ 
    let dataFilterByIngredientsLast = [...new Set(allIngredientsOfRecipes.map((item) => {return item}))]
    console.log(dataFilterByIngredientsLast);

    /* FILTER BY DESCRIPTION - PRINCIPAL SEARCH BAR */
    const dataFilterByDescription = recipes.filter((item) => {
        return (item.description.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").includes(userInput))
    })
    // console.log(dataFilterByDescription);
    /* RECIPES REMAINING FILTERED BY DESCRIPTION AND WIHOUT DUPLICATE */
    let recipeArrayFilterByDescription = [...new Set(dataFilterByDescription.map((item) => {return item}))]
    console.log(recipeArrayFilterByDescription)

    // ARRAY MERGE WITHOUT DUPLICATE IN ES6 - NEW SET WITH SPREAD OPERATOR
    const mergeArraysFilter = [...new Set([...recipeArrayFilterByName, ...dataFilterByIngredientsLast, ...recipeArrayFilterByDescription])]
    console.log(mergeArraysFilter) 


    ActualisationChampsIngredients(mergeArraysFilter) // FONCTION D'ACTUALISATION DU CHAMPS DE RECHERCHE AVANCE INGREDIENTS
    ActualisationChampsAppareils(mergeArraysFilter)
    actualisationChampsUstensiles(mergeArraysFilter)

    return mergeArraysFilter; // RETURN ALL RECIPES REMAINING AFTER SEARCH BY NAME, INGREDIENTS & DESCRIPTION
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

        finalRecipeArray.forEach(recipe => createCard(recipe)); // INJECTION DOM AVEC FONCTION CREATECARD (fichier ModelRecipes.js)
    }
}

/* IMPLEMENTATION DE LA FONCTION  GET TAG SEARCH */

function searchByTags(recetteReduite) {
    console.log(recetteReduite)
    /* TAG INGREDIENTS ADDED */
    const ingredientsElementsTags = document.querySelectorAll(".tagDesIngredients")
    const ingredientsIterable = Array.from(ingredientsElementsTags)

    let ingredients = ingredientsIterable.map((item) => {return item.innerText})
    console.log(ingredients); // JE RECUPERE UN ARRAY AVEC LES INGREDIENTS RESTANTS DES RECETTES REDUITES
         
    /* TAG APPLIANCE ADDED */
    const appliancesElements = document.querySelectorAll(".tagDesAppareils")
    const appliancesIterable = Array.from(appliancesElements)
 
    let appliance = appliancesIterable.map((item) => {return item.innerText})
    console.log(appliance); // JE RECUPERE UN ARRAY AVEC LES APPAREILS RESTANTS DES RECETTES REDUITE

   /* TAG USTENSILES ADDED */
    const ustensilsElements = document.querySelectorAll(".tagDesUstensiles")
    const ustensilsIterable = Array.from(ustensilsElements)

    let ustensiles = ustensilsIterable.map((item) => {return item.innerText})
    console.log(ustensiles); // JE RECUPERE UN ARRAY AVEC LES USTENSILES RESTANTS DES RECETTES REDUITE

    const recettesFinales = recetteReduite.filter(recette => {

        let hasIngredients = true;
        let hasAppliance = true;
        let hasUstensils = true;

        let recette2 = recette.ingredients
        // console.log(recette2);
        let recette3 = recette2.map(item => {return item.ingredient})
        // console.log(recette3);

        ingredients.forEach(ingredient => {
            if (!recette3.includes(ingredient)) { // CA BUG
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

    ActualisationChampsIngredients(recettesFinales) // FONCTION DE MISE A JOUR DES CHAMPS DE RECHERCHE AVANCEE
    ActualisationChampsAppareils(recettesFinales)
    actualisationChampsUstensiles(recettesFinales)
    console.log(recettesFinales);
    hydrateInterface(recettesFinales)
    return recettesFinales;
}   

/* FONCTION DE MISE A JOUR DES CHAMPS DE RECHERCHE AVANCES - INGREDIENTS, APPAREILS, USTENSILES */

function ActualisationChampsIngredients(recettes) { // ON PASSE LES RECIPES RESTANTES APRES FILTRATION - NAME - INGREDIENTS - DESCRIPTION
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

        /* L'UTILISATEUR PRECISE SA RECHERCHE AVEC LE CHAMPS INPUT INGREDIENTS (POINT 5) */
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

            addTagIngredients()     
        })
    })
}
/* CHAMPS APPAREILS */
function ActualisationChampsAppareils(recettes) {
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

        const tagByAppliancesNoDuplicate = [...new Set(afterFilterByTagAppliances.map((item) => {return item}))]

        let listItemsTagSecondary = tagByAppliancesNoDuplicate.map(item => {
            return '<p>' + item + '</p>'
        })
        
        console.log(tagByAppliancesNoDuplicate)

        const listElementsTagAppliances = document.querySelector('.listElementsAppareils')
        listElementsTagAppliances.innerHTML = listItemsTagSecondary // HYDRATATION APRES RECHERCHE UTILISATEUR

        addTagAppliances()
    })
}
/* CHAMPS USTENSILES */
function actualisationChampsUstensiles(recettes) {
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

        let listItemsTagSecondary = afterFilterByTagUstensiles.map(item => {
            return '<p>' + item + '</p>'
        })

        const listElementsTagUstensiles = document.querySelector('.listElementsUstensiles')
        listElementsTagUstensiles.innerHTML = listItemsTagSecondary

        addTagUstensiles()
    })
}

// FONCTION DE RECHERCHE DIRECT PAR TAG QUI ACTUALISE DES ELEMENTS DE CHAQUE CHAMPS DE RECHERCHE AVANCEE
ActualisationChampsIngredients(recipes) 
ActualisationChampsAppareils(recipes)
actualisationChampsUstensiles(recipes)

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

            // buttonTag.innerHTML = `<span class='tagDesIngredients'>${item.innerText}<i class="fa-regular fa-circle-xmark"></i></span>`
            groupTags.appendChild(buttonTag)
            console.log('POUF ONE')

            let cross = document.querySelectorAll('.fa-circle-xmark')
 
            cross.forEach(item => {
                item.addEventListener('click', function() {
                    document.querySelector('.resultTag').style.display = 'none';
                    hydrateInterface(recipes)

                    ActualisationChampsIngredients(recipes) 
                    ActualisationChampsAppareils(recipes)
                    actualisationChampsUstensiles(recipes)

                })
            })
            searchByTags(recipes) // ICI UN BUG ???
       })
    })  
}

addTagIngredients()

/* DEFINITION DE LA FONCTION QUI RECOIT LE CLIQUE UTILISATEUR SUR LE CHAMPS APPAREILS ET AJOUTE LE TAG OU LES TAGS */
function addTagAppliances() {
    const listOfChamps = document.querySelectorAll('.listElementsAppareils > p')
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

            let cross = document.querySelectorAll('.fa-circle-xmark')

            cross.forEach(item => {
                item.addEventListener('click', function() {
                    document.querySelector('.resultTag').style.display = 'none';
                    hydrateInterface(recipes)

                    ActualisationChampsIngredients(recipes) 
                    ActualisationChampsAppareils(recipes)
                    actualisationChampsUstensiles(recipes)
                })
            })
            searchByTags(recipes)
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

            let cross = document.querySelectorAll('.fa-circle-xmark')

            cross.forEach(item => {
                item.addEventListener('click', function() {
                    document.querySelector('.resultTag').style.display = 'none';
                    hydrateInterface(recipes)

                    ActualisationChampsIngredients(recipes) 
                    ActualisationChampsAppareils(recipes)
                    actualisationChampsUstensiles(recipes)
                })
            })
            searchByTags(recipes)
        })
    })
}

addTagUstensiles()
