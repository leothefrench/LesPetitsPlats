/* FILTERING SEARCH PRINCIPAL BAR */
// console.log(recipes) // ARRAY OF OBJECTS NO SORTED
// const categoriesSearch = [...new Set(recipes.map((item) => {return item}))]
// console.log(categoriesSearch)

document.querySelector('.inputSearch').addEventListener('keyup', (e) => {
    const dataSearch = e.target.value.toLowerCase(); // INPUT USER IN PRINCIPAL SEARCH BAR

    /* AT LEAST 3 CHARACTERS */
    if(dataSearch.length >= 3 ) {

    /* FILTER BY NAME - PRINCIPAL SEARCH BAR */
    const dataFilterByName = recipes.filter((item) => {
        return (item.name.toLowerCase().includes(dataSearch)) // A RegExp should be nice here
    })
    console.log(dataFilterByName);

    /* FOR HYDRATION TAG - WITH ARRAY WITH RECIPE FILTERED BY NAME AND WITHOUT DUPLICATE */
    let recipeArrayFilterByName = [...new Set(dataFilterByName.map((item) => {return item}))]
    // console.log(recipeArrayFilterByName);

   /* FILTER BY INGREDIENTS - PRINCIPAL SEARCH BAR */
    let recipeByIngredient = [];
    const ingredientsArrRecipe = recipes.map((arrIngredient) => {
        let tempArray = []

        arrIngredient.ingredients.map(item => {
            tempArray.push(item.ingredient)
        })
        // console.log(tempArray) // BACK AN ARRAY OF THE INGREDIENTS IN EACH RECIPE
        const dataFilterByIngredients = tempArray.filter((item) => {
            if(item.toLowerCase().includes(dataSearch)) {        
                recipeByIngredient.push(arrIngredient)
            }
        }) 
    })
    // console.log(recipeByIngredient) // CHECK RECIPES WITH INGREDIENTS SEARCH BY THE USER

    /* HYDRATION ARRAY WITH RECIPE BY INGREDIENTS WITHOUT DUPLICATE */
    let dataFilterByIngredientsLast = [...new Set(recipeByIngredient.map((item) => {return item}))]
    // console.log(dataFilterByIngredientsLast);

    /* FILTER BY DESCRIPTION - PRINCIPAL SEARCH BAR */
    const dataFilterByDescription = recipes.filter((item ) => {
        return (item.description.toLowerCase().includes(dataSearch))
    })
    // console.log(dataFilterByDescription); // ARRAY WITH OBJECTS
      
    /* HYDRATION ARRAY WITH RECIPES BY DESCRIPTION WITHOUT DUPLICATE */
    let recipeArrayFilterByDescription = [...new Set(dataFilterByDescription.map((item) => {return item}))]
    // console.log(recipeArrayFilterByDescription)
    
    // ARRAY MERGE WITHOUT DUPLICATE IN ES6 - NEW SET
    const mergeArraysFilter = [...new Set([...recipeArrayFilterByName, ...dataFilterByIngredientsLast, ...recipeArrayFilterByDescription])]

    console.log(mergeArraysFilter)

    /* HYDRATATION INTERFACE PAGE */
    const classRecipesWrapper = document.querySelector('.recipes-wrapper')
    classRecipesWrapper.innerHTML = ''   // CLEAN DOM RECIPES WRAPPER CONTAINER
    finalRecipeArray = Object.entries(mergeArraysFilter);       // RETURN AN ARRAY OF ARRAYS

    /* A1 - TESTING IF NO RECIPES ELSE DO THE NEXT THING */
    if(mergeArraysFilter == 0) {
        classRecipesWrapper.innerHTML = '<p>Aucune recette ne correspond à votre critère de recherche, vous pouvez chercher "tarte aux pommes", "poisson", etc.</p>'
    } else {
        finalRecipeArray.forEach(recipe => createCard(recipe));     // INJECTION IN THE DOM AFTER SORTING BY NAME
        
        /* ACTUALISATION DE RECHERCHE AVANCE PAR TAG */
        let listChoicetag = document.querySelectorAll('.listElements');

        listChoicetag.forEach(item => {
            return item.innerHTML = ''
        })

        /* ACTUALISATION TAG INGREDIENTS APRES RECHERCHE PRINCIPALE */
        let tagByIngredient = [];
        const ingredientsArrRecipe = mergeArraysFilter.map((arrIngredient) => {
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
            // console.log(tagByIngredientNoDuplicate); // CHECK THAT DUPLICATE INTO ARRAY OF INGREDIENTS

            let listItems = tagByIngredientNoDuplicate.map(item => {
                return '<p>' + item + '</p>'
            })
            const listElementsTagIngredients = document.querySelector('.listElementsIngredients')
            listElementsTagIngredients.innerHTML = listItems

            /* SECONDARY FILTER BY TAG INGREDIENTS */

/************************************* TAG SECONDAIRE FILTRATION ******************************* */

    function filtrationSecondaireIngredients() {
        const tagFilter = document.querySelector('.inputSearchBtnIngredients')
        // console.log(tagFilter);

        tagFilter.addEventListener('keyup', (e) => {
            const inputSearchTag = e.target.value.toLowerCase(); 
            // console.log(inputSearchTag);

            let afterFilterByTagIngredients = []

            tagByIngredientNoDuplicate.filter(item => {
                if(item.toLowerCase().includes(inputSearchTag)) {   
                    afterFilterByTagIngredients.push(item)
                    // console.log(afterFilterByTagIngredients);
                }
            })
            // console.log(afterFilterByTagIngredients);

            let listItemsTagSecondary = afterFilterByTagIngredients.map(item => {
                return '<p>' + item + '</p>'
            })

            const listElementsTagIngredients = document.querySelector('.listElementsIngredients')
            listElementsTagIngredients.innerHTML = listItemsTagSecondary

            evenementOnChoiceChamps('listElementsIngredients', 'resultTag:first-child', listItemsTagSecondary )   
            
        }) 
    }

    filtrationSecondaireIngredients()

    /* IMPLEMENTATION RECHERCHE AFFINE PAR CHAMPS - INGREDIENTS, APPAREISL & USTENSILES */

    function evenementOnChoiceChamps(nameListChamps, resultChampsChild, listDeRecherche) {
        /* EVENEMENT LORS DU CLIQUE SUR UN MOT DU CHAMPS */
        const listOfChamps = document.querySelectorAll(`.${nameListChamps} > p`)
        // console.log(listOfChamps);

        const listing = [...listOfChamps]
        // console.log(listing)

        listing.forEach((item) => {
            item.addEventListener('click', function() {
                console.log(item.innerText)
                const groupTags = document.querySelector('.groupResultsTags')

                const groupTagsIngredients = document.querySelector(`.${resultChampsChild}`)
                groupTagsIngredients.innerHTML = item.innerText
                groupTags.style.display = 'flex'

                const listSearch = `${listDeRecherche}`
                console.log(listSearch)

                /* RESULTAT DE RECHERCHE ACTUALISE */
                if(listSearch.includes(item.innerText)) {
                    console.log('THE CONDITION IS TRUE');
                }
            })
        })
    }

    function filtrationSecondaireAppareils() {
        /* ACTUALISATION TAG APPAREILS APRES RECHERCHE PRINCIPALE */
        // const tagFilterAppareils = document.querySelector('.inputSearchBtnAppareils')

        let tagApplianceAfterPrincipaleSearch = []
        const arrTagApplianceSecondary = mergeArraysFilter.forEach(item => {

            tagApplianceAfterPrincipaleSearch.push(item.appliance)
        })

        const tagApplianceAfterPrincipaleSearchNoDuplicate = [...new Set(tagApplianceAfterPrincipaleSearch.map((item) => {return item}))]

        // HYDRATATION LIST ELEMENTS TAG APPLIANCE (APPAREILS)
        let listItemsAppliance = tagApplianceAfterPrincipaleSearchNoDuplicate.map(item => {
            return '<p>' + item + '</p>'
        })

        const listElementsTagAppliances = document.querySelector('.listElementsAppareils')
        // console.log(listElementsTagAppliances);
        listElementsTagAppliances.innerHTML = listItemsAppliance

        /* FILTER SECONDARY TAG APPLIANCE */
        const tagFilterAppliances = document.querySelector('.inputSearchBtnAppareils')
        tagFilterAppliances.addEventListener('keyup', (e) => {
            const inputSearchTag = e.target.value.toLowerCase(); 

            let afterFilterByTagAppliances = []

            tagApplianceAfterPrincipaleSearch.filter(item => {
                if(item.toLowerCase().includes(inputSearchTag)) {   
                    afterFilterByTagAppliances.push(item)
                    // console.log(afterFilterByTagIngredients);
                }
            })
            let listItemsTagSecondary = afterFilterByTagAppliances.map(item => {
                console.log(item);
                return '<p>' + item + '</p>'
            })
            
            const listElementsTagAppliances = document.querySelector('.listElementsAppareils')
            listElementsTagAppliances.innerHTML = listItemsTagSecondary

            evenementOnChoiceChamps('listElementsAppareils', 'resultTag:nth-child(2)')  
        })
    }

    filtrationSecondaireAppareils()

    function filtrationSecondaireUstensiles() {
            /* ACTUALISATION TAG USTENSILES APRES RECHERCHE PRINCIPALE */
            
            let tagUtensilsAfterPrincipaleSearch = []
            const tagFilterByUstensilsSecondary =  mergeArraysFilter.map(ele => {
                ele.ustensils.filter((item) => {
                    tagUtensilsAfterPrincipaleSearch.push(item)
                })
            })  
        // console.log(tagUtensilsAfterPrincipaleSearch)
        const arrTagUstensilesSecondaryNoDuplicate = [...new Set(tagUtensilsAfterPrincipaleSearch.map((item) => {return item}))]
        // console.log(arrTagUstensilesSecondaryNoDuplicate);

        // HYDRATATION LIST ELEMENTS TAG UTENSILS
        let listItemsUstensiles = arrTagUstensilesSecondaryNoDuplicate.map(item => {
            return '<p>' + item + '</p>'
        })
        const listElementsTagUtensils = document.querySelector('.listElementsUstensiles')
        listElementsTagUtensils.innerHTML = listItemsUstensiles    

        /* FILTER SECONDARY TAG APPLIANCE */       
        const tagFilterUstensiles = document.querySelector('.inputSearchBtnUstensiles')
        tagFilterUstensiles.addEventListener('keyup', (e) => {
            const inputSearchTag = e.target.value.toLowerCase(); 

            let afterFilterByTagUstensiles = []

            arrTagUstensilesSecondaryNoDuplicate.filter(item => {
                if(item.toLowerCase().includes(inputSearchTag)) {   
                    afterFilterByTagUstensiles.push(item)
                    // console.log(afterFilterByTagIngredients);
                }
            })
            let listItemsTagSecondary = afterFilterByTagUstensiles.map(item => {
                console.log(item);
                return '<p>' + item + '</p>'
            })
            const listElementsTagUstensiles = document.querySelector('.listElementsUstensiles')
            listElementsTagUstensiles.innerHTML = listItemsTagSecondary

            evenementOnChoiceChamps('listElementsUstensiles', 'resultTag:last-child') 
        })
    } 

    filtrationSecondaireUstensiles()
    })

    }
}
})





filterByTag('inputSearchBtnIngredients')
filterByTag('inputSearchBtnAppareils')
filterByTag('inputSearchBtnUstensiles')

function filterByTag(nameInputTagSearch) {
const tagIngredients = document.querySelector(`.${nameInputTagSearch}`)
// console.log(tagIngredients);

tagIngredients.addEventListener('keyup', (e) => {
    const dataSearch = e.target.value.toLowerCase()
    console.log(dataSearch)
    console.log(typeof (dataSearch))
    // if(dataSearch.length >= 3) {

    /* ACTUALISATION DE RECHERCHE AVANCE PAR TAG */
    let listChoicetag = document.querySelectorAll('.listElements');
    
    listChoicetag.forEach(item => {
        return item.innerHTML = ''
    })
    // console.log(dataFilterByIngredientsLast); // ARRAY WITH OBJECT - LIST OF RECIPES AFTER FILTER

    /* ACTUALISATION TAG INGREDIENTES APRES RECHERCHE PRINCIPALE */
        let tagByIngredient = [];
        const ingredientsArrRecipe = recipes.map((arrIngredient) => {
            let tempArray = []

            arrIngredient.ingredients.map(item => {
                tempArray.push(item.ingredient)
            })
            // console.log(tempArray)
            const pouf = tempArray.forEach(item => {
                tagByIngredient.push(item) 
            })
            // console.log(tagByIngredient)
            const arrTagIngredientsSecondary = []

            const tagIngredientsForSecondarySearch = tagByIngredient.filter(item => {
                if(item.toLowerCase().includes(dataSearch)) {
                    arrTagIngredientsSecondary.push(item)
                }
            })
            // console.log(arrTagIngredientsSecondary)
            // SUPPRESSION DES DOUBLONS
        const arrTagIngredientsSecondaryNoDuplicate = [...new Set(arrTagIngredientsSecondary.map((item) => {return item}))]
        console.log(arrTagIngredientsSecondaryNoDuplicate);
            // HYDRATATION LIST ELEMENTS TAG INGREDIENTS
            let listItems = arrTagIngredientsSecondaryNoDuplicate.map(item => {
                return '<p>' + item + '</p>'
            })
            const listElementsTagIngredients = document.querySelector('.listElementsIngredients')
            listElementsTagIngredients.innerHTML = listItems

    // HYDRATATION INTERFACE RECIPES WITH LAST RECIPES CONTAINING THE INGREDIENT 
    const classRecipesWrapper = document.querySelector('.recipes-wrapper') // CIBLAGE CONTENEUR CARDS
    classRecipesWrapper.innerHTML = ''   // CLEAN DOM RECIPES WRAPPER CONTAINER
         })

        /* ACTUALISATION TAG APPAREILS APRES RECHERCHE PRINCIPALE */
        let tagApplianceAfterPrincipaleSearch = []
        const arrTagApplianceSecondary = recipes.filter((item ) => {
            if(item.appliance.toLowerCase().includes(dataSearch)){
                tagApplianceAfterPrincipaleSearch.push(item.appliance)
            }
        })
        // console.log(tagApplianceAfterPrincipaleSearch);
        const tagApplianceAfterPrincipaleSearchNoDuplicate = [...new Set(tagApplianceAfterPrincipaleSearch.map((item) => {return item}))]
        // console.log(tagApplianceAfterPrincipaleSearchNoDuplicate);
        // HYDRATATION LIST ELEMENTS TAG APPLIANCE (APPAREILS)
        
        const listElementsTagAppliances = document.querySelector('.listElementsAppareils')
        listElementsTagAppliances.innerHTML = `<ul>
                                                    <li>${tagApplianceAfterPrincipaleSearchNoDuplicate}</li>
                                                </ul>`

        /* ACTUALISATION TAG USTENSILES APRES RECHERCHE PRINCIPALE */
        let tagUtensilsAfterPrincipaleSearch = []
        const tagFilterByUstensilsSecondary =  recipes.map(ele => {
            // console.log(ele.ustensils);
            // return ele.ustensils
            ele.ustensils.filter((item) => {
                if(item.includes(dataSearch)) {
                    tagUtensilsAfterPrincipaleSearch.push(item.toLowerCase())
                }
            })
        })

        console.log(tagUtensilsAfterPrincipaleSearch)
        const arrTagUstensilesSecondaryNoDuplicate = [...new Set(tagUtensilsAfterPrincipaleSearch.map((item) => {return item}))]
        console.log(arrTagUstensilesSecondaryNoDuplicate);
        // HYDRATATION LIST ELEMENTS TAG UTENSILS
        const listElementsTagUtensils = document.querySelector('.listElementsUstensiles')
        // console.log(listElementsTagUtensils);
        listElementsTagUtensils.innerHTML = `<p>${arrTagUstensilesSecondaryNoDuplicate}</p>` 
        }  )
    }
    
