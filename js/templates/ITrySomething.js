/* FILTERING SEARCH PRINCIPAL BAR */
// console.log(recipes) // ARRAY OF OBJECTS NO SORTED
// const categoriesSearch = [...new Set(recipes.map((item) => {return item}))]
// console.log(categoriesSearch)

document.querySelector('.inputSearch').addEventListener('keyup', (e) => {
    const dataSearch = e.target.value.toLowerCase(); // INPUT USER IN PRINCIPAL SEARCH BAR

    /* AT LEAST 3 CHARACTERS */
    if(dataSearch.length >= 3 ) {

    /* FILTER BY NAME - PRINCIPAL SEARCH BAR */
    const dataFilterByName = recipes.filter((item ) => {
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
      
    /* HYDRATION ARRAY WITH RECIPE BY DESCRIPTION WITHOUT DUPLICATE */
    let recipeArrayFilterByDescription = [...new Set(dataFilterByDescription.map((item) => {return item}))]
    // console.log(recipeArrayFilterByDescription)
    
    // ARRAY MERGE WITHOUT DUPLICATE IN ES6 - NEW SET
    const mergeArraysFilter = [...new Set([...recipeArrayFilterByName, ...dataFilterByIngredientsLast, ...recipeArrayFilterByDescription])]

    /* HYDRATATION INTERFACE PAGE */
    const classRecipesWrapper = document.querySelector('.recipes-wrapper')
    classRecipesWrapper.innerHTML = ''   // CLEAN DOM RECIPES WRAPPER CONTAINER
    finalRecipeArray = Object.entries(mergeArraysFilter);       // RETURN AN ARRAY OF ARRAYS

    /* TESTING IF NO RECIPES ELSE DO THE NEXT THING */
    if(mergeArraysFilter == 0) {
        classRecipesWrapper.innerHTML = '<p>Aucune recette ne correspond à votre critère de recherche, vous pouvez chercher "tarte aux pommes", "poisson", etc.</p>'
    } else {
        finalRecipeArray.forEach(recipe => createCard(recipe));     // INJECTION IN THE DOM AFTER SORTING BY NAME
        /* ACTUALISATION DE RECHERCHE AVANCE PAR TAG */
        let listChoicetag = document.querySelectorAll('.listElements');

        listChoicetag.forEach(item => {
            return item.innerHTML = ''
        })
        // console.log(dataFilterByIngredientsLast); // ARRAY WITH OBJECT - LIST OF RECIPES AFTER FILTER
        // console.log(mergeArraysFilter); // ARRAY WITH OBJECT - LIST OF RECIPES AFTER FILTER

        /* ACTUALISATION TAG INGREDIENTES APRES RECHERCHE PRINCIPALE */
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

            console.log(tagByIngredientNoDuplicate)
     })

        /* ACTUALISATION TAG APPAREILS APRES RECHERCHE PRINCIPALE */
        // console.log(mergeArraysFilter);
        let tagApplianceAfterPrincipaleSearch = []
        const arrTagApplianceSecondary = mergeArraysFilter.filter((item) => {
            if(item.appliance.toLowerCase()){
                tagApplianceAfterPrincipaleSearch.push(item.appliance)
            }
        })
        // console.log(tagApplianceAfterPrincipaleSearch); // BACK ARRAY APPLIANCES WITH DUPLICATE IN IT
        const tagApplianceAfterPrincipaleSearchNoDuplicate = [...new Set(tagApplianceAfterPrincipaleSearch.map((item) => {return item}))] // BACK ARRAY APPLIANCE WITHOUT DUPLICATE AFTER PRINCIPAL SEARCH

        // console.log(tagApplianceAfterPrincipaleSearchNoDuplicate);

        // HYDRATATION LIST ELEMENTS TAG APPLIANCE (APPAREILS)
        let listItemsAppliance = tagApplianceAfterPrincipaleSearchNoDuplicate.map(item => {
            return '<p>' + item + '</p>'
        })
        const listElementsTagAppliances = document.querySelector('.listElementsAppareils')
        listElementsTagAppliances.innerHTML = listItemsAppliance

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
        }
    }
})



        /* CREATION D'UNE FONCTION DE FILTRATION DES INPUT TAGS APRES FILTRAGE PAR LA BARRE PRINCIPALE */
        // function filterByTagIngrédients(InputTagName) {
        //     const tagFilter = document.querySelector(`.${InputTagName}`)
            
        //     tagFilter.addEventListener('keyup', (e) => {
        //         const inputSearchTag = e.target.value.toLowerCase(); 

        //         const tagFilterByIngredients = tagByIngredientNoDuplicate.filter((item) => {
        //             let afterFilterByTagIngredients = []
        //             if(item.toLowerCase().includes(inputSearchTag)) {        
        //                 afterFilterByTagIngredients.push(item)
        //             }
        //             console.log(afterFilterByTagIngredients)
        //         }) 
        //     })
        // }











/* *********** SCENARIO ALTERNATIF A2 ********** */

filterByTag('inputSearchBtnIngredients')
filterByTag('inputSearchBtnAppareils')
filterByTag('inputSearchBtnUstensiles')

function filterByTag(nameInputTagSearch, baseOfSearch) {
const tagIngredients = document.querySelector(`.${nameInputTagSearch}`)
// console.log(tagIngredients);

tagIngredients.addEventListener('keyup', (e) => {
    const dataSearch = e.target.value.toLowerCase()
    console.log(dataSearch)
    console.log(typeof (dataSearch))
    if(dataSearch.length >= 3) {

    // categoriesSearch.forEach(recipe => createCard(recipe));     // INJECTION IN THE DOM AFTER SORTING BY NAME
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
            const listElementsTagIngredients = document.querySelector('.listElementsIngredients')
            
            //MAP
            
            listElementsTagIngredients.innerHTML = `<ul>
                                                        <li>${arrTagIngredientsSecondaryNoDuplicate}</li>
                                                    </ul>`
    // HYDRATATION INTERFACE RECIPES WITH LAST RECIPES CONTAINING THE INGREDIENT 
    const classRecipesWrapper = document.querySelector('.recipes-wrapper') // CIBLAGE CONTENEUR CARDS
    classRecipesWrapper.innerHTML = ''   // CLEAN DOM RECIPES WRAPPER CONTAINER
    // arrTagIngredientsSecondaryNoDuplicate.forEach(recipe => createCard(recipe));     // INJECTION IN THE DOM
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
            console.log(ele.ustensils);
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
        }  
    })
    
}






