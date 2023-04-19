/* FILTERING SEARCH PRINCIPAL BAR */
// console.log(recipes) // ARRAY OF OBJECTS NO SORTED
const categoriesSearch = [...new Set(recipes.map((item) => {return item}))]
// console.log(categoriesSearch)

document.querySelector('.inputSearch').addEventListener('keyup', (e) => {
    const dataSearch = e.target.value.toLowerCase();

    /* FILTER BY NAME */
    const dataFilterByName = categoriesSearch.filter((item ) => {
        return (item.name.toLowerCase().includes(dataSearch))
    })
    // console.log(dataFilterByName);
    /* HYDRATION ARRAY WITH RECIPE BY NAME WITHOUT DUPLICATE */
    let recipeArrayFilterByName= [...new Set(dataFilterByName.map((item) => {return item}))]

   /* FILTER BY INGREDIENTS */
    let recipeByIngredient = [];
    const ingredientsArrRecipe = categoriesSearch.map((arrIngredient) => {
        let tempArray = []

        arrIngredient.ingredients.map(item => {
            tempArray.push(item.ingredient)
        })

        // console.log(tempArray)
        const dataFilterByIngredients = tempArray.filter((item) => {
            if(item.toLowerCase().includes(dataSearch)) {        
                recipeByIngredient.push(arrIngredient)
            }
        })
    })
    let dataFilterByIngredientsLast = [...new Set(recipeByIngredient.map((item) => {return item}))]

    // console.log(dataFilterByIngredientsLast);
    
    /* HYDRATION ARRAY WITH RECIPE BY INGREDIENTS WITHOUT DUPLICATE */
    let recipeArrayFilterByIngredients = [...new Set(dataFilterByIngredientsLast.map((item) => {return item}))]

    /* FILTER BY DESCRIPTION */
    const dataFilterByDescription = categoriesSearch.filter((item ) => {
        return (item.description.toLowerCase().includes(dataSearch))
    })
    // console.log(dataFilterByDescription); // ARRAY WITH OBJECTS
    // SUPPRIMER LES INGREDIENTS CONTENANT LES SUB-STRING (ex: cocotte qui contient coco) ???

    
    /* HYDRATION ARRAY WITH RECIPE BY DESCRIPTION WITHOUT DUPLICATE */
    let recipeArrayFilterByDescription = [...new Set(dataFilterByDescription.map((item) => {return item}))]
    
    // ARRAY MERGE WITHOUT DUPLICATE IN ES6 - NEW SET
    const mergeArraysFilter = [...new Set([...recipeArrayFilterByName, ...recipeArrayFilterByIngredients, ...recipeArrayFilterByDescription])]

    // HYDRATATION PAGE
    const classRecipesWrapper = document.querySelector('.recipes-wrapper')
    classRecipesWrapper.innerHTML = ''   // CLEAN DOM RECIPES WRAPPER CONTAINER
    finalRecipeArray = Object.entries(mergeArraysFilter);       // RETURN AN ARRAY OF ARRAYS

    /* TESTING IF NO RECIPES ELSE DO THE NEXT THING */
    if(finalRecipeArray == 0) {
        classRecipesWrapper.innerHTML = '<p>Aucune recette ne correspond à votre critère de recherche, vous pouvez chercher "tarte aux pommes", "poisson", etc.</p>'
    } else {
        finalRecipeArray.forEach(recipe => createCard(recipe));     // INJECTION IN THE DOM AFTER SORTING BY NAME
        /* ACTUALISATION DE RECHERCHE AVANCE PAR TAG */
        let listChoicetag = document.querySelectorAll('.listElements');

        listChoicetag.forEach(item => {
            return item.innerHTML = ''
        })
        // console.log(dataFilterByIngredientsLast); // ARRAY WITH OBJECT - LIST OF RECIPES AFTER FILTER
        console.log(mergeArraysFilter); // ARRAY WITH OBJECT - LIST OF RECIPES AFTER FILTER

        /* ACTUALISATION TAG INGREDIENTES APRES RECHERCHE PRINCIPALE */
        let tagByIngredient = [];
        const ingredientsArrRecipe = mergeArraysFilter.map((arrIngredient) => {
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
                if(item.includes(dataSearch)) {
                    arrTagIngredientsSecondary.push(item)
                }
            })
            // console.log(arrTagIngredientsSecondary)
            // HYDRATATION LIST ELEMENTS TAG INGREDIENTS
            const listElementsTagIngredients = document.querySelector('.listElementsIngredients')
            
            listElementsTagIngredients.innerHTML = `<ul>
                                                        <li>${arrTagIngredientsSecondary}</li>
                                                    </ul>`
        })
        /* ACTUALISATION TAG APPAREILS APRES RECHERCHE PRINCIPALE */
        let tagApplianceAfterPrincipaleSearch = []
        const arrTagApplianceSecondary = mergeArraysFilter.filter((item ) => {
            if(item.appliance.toLowerCase().includes(dataSearch)){
                tagApplianceAfterPrincipaleSearch.push(item.appliance)
            }
        })
        // console.log(tagApplianceAfterPrincipaleSearch);
        // HYDRATATION LIST ELEMENTS TAG APPLIANCE (APPAREILS)
        const listElementsTagAppliances = document.querySelector('.listElementsAppareils')
        listElementsTagAppliances.innerHTML = `<ul>
                                                    <li>${tagApplianceAfterPrincipaleSearch}</li>
                                                </ul>`

        /* ACTUALISATION TAG USTENSILES APRES RECHERCHE PRINCIPALE */
        const tagFilterByUstensilsSecondary =  mergeArraysFilter.map(ele => {
            return ele.ustensils
        })
        console.log(tagFilterByUstensilsSecondary)

        let tagUtensilsAfterPrincipaleSearch = []
        const arrTagUtensilsSecondary = mergeArraysFilter.filter((item ) => {
            if(item.ustensils.includes(dataSearch)){
                tagUtensilsAfterPrincipaleSearch.push(item.ustensils)
            }
        })

        console.log(tagUtensilsAfterPrincipaleSearch)
        // HYDRATATION LIST ELEMENTS TAG UTENSILS
        const listElementsTagUtensils = document.querySelector('.listElementsUstensiles')
        // console.log(listElementsTagUtensils);
        listElementsTagUtensils.innerHTML = `<p>${tagUtensilsAfterPrincipaleSearch}</p>`     
    }
})

/* A2 - FILTERING BY ONE TAG OR MANY TAGS AND ADDING NEW ONE */
/* *********** TAG INGREDIENTS FILTER ********** */
// const tagIngredients = document.querySelector('.inputSearchBtnIngredients')

// tagIngredients.addEventListener('keyup', (e) => {
//     const dataSearch = e.target.value.toLowerCase()
//     console.log(dataSearch)

//     // categoriesSearch.forEach(recipe => createCard(recipe));     // INJECTION IN THE DOM AFTER SORTING BY NAME
//     /* ACTUALISATION DE RECHERCHE AVANCE PAR TAG */
//     let listChoicetag = document.querySelectorAll('.listElements');
    
//     listChoicetag.forEach(item => {
//         return item.innerHTML = ''
//     })
//     // console.log(dataFilterByIngredientsLast); // ARRAY WITH OBJECT - LIST OF RECIPES AFTER FILTER

//     /* ACTUALISATION TAG INGREDIENTES APRES RECHERCHE PRINCIPALE */
//         let tagByIngredient = [];
//         const ingredientsArrRecipe = categoriesSearch.map((arrIngredient) => {
//             let tempArray = []

//             arrIngredient.ingredients.map(item => {
//                 tempArray.push(item.ingredient)
//             })
//             // console.log(tempArray)
//             const pouf = tempArray.forEach(item => {
//                 tagByIngredient.push(item) 
//             })
//             console.log(tagByIngredient)
//             const arrTagIngredientsSecondary = []

//             const tagIngredientsForSecondarySearch = tagByIngredient.filter(item => {
//                 if(item.toLowerCase().includes(dataSearch)) {
//                     arrTagIngredientsSecondary.push(item)
//                 }
//             })
//             console.log(arrTagIngredientsSecondary)
//             // SUPPRESSION DES DOUBLONS
//         const arrTagIngredientsSecondaryNoDuplicate = [...new Set(arrTagIngredientsSecondary.map((item) => {return item}))]
//         console.log(arrTagIngredientsSecondaryNoDuplicate);
//             // HYDRATATION LIST ELEMENTS TAG INGREDIENTS
//             const listElementsTagIngredients = document.querySelector('.listElementsIngredients')
            
//             listElementsTagIngredients.innerHTML = `<ul>
//                                                         <li>${arrTagIngredientsSecondaryNoDuplicate}</li>
//                                                     </ul>`
//     // HYDRATATION INTERFACE RECIPES WITH LAST RECIPES CONTAINING THE INGREDIENT 
//     const classRecipesWrapper = document.querySelector('.recipes-wrapper') // CIBLAGE CONTENEUR CARDS
//     classRecipesWrapper.innerHTML = ''   // CLEAN DOM RECIPES WRAPPER CONTAINER
//     // arrTagIngredientsSecondaryNoDuplicate.forEach(recipe => createCard(recipe));     // INJECTION IN THE DOM
//         })


//         /* ACTUALISATION TAG APPAREILS APRES RECHERCHE PRINCIPALE */
//         let tagApplianceAfterPrincipaleSearch = []
//         const arrTagApplianceSecondary = categoriesSearch.filter((item ) => {
//             if(item.appliance.toLowerCase().includes(dataSearch)){
//                 tagApplianceAfterPrincipaleSearch.push(item.appliance)
//             }
//         })
//         // console.log(tagApplianceAfterPrincipaleSearch);
//         // HYDRATATION LIST ELEMENTS TAG APPLIANCE (APPAREILS)
//         const listElementsTagAppliances = document.querySelector('.listElementsAppareils')
//         listElementsTagAppliances.innerHTML = `<ul>
//                                                     <li>${tagApplianceAfterPrincipaleSearch}</li>
//                                                 </ul>`

//         /* ACTUALISATION TAG USTENSILES APRES RECHERCHE PRINCIPALE */
//         const tagFilterByUstensilsSecondary =  categoriesSearch.map(ele => {
//             return ele.ustensils
//         })
//         // console.log(tagFilterByUstensilsSecondary)

//         let tagUtensilsAfterPrincipaleSearch = []
//         const arrTagUtensilsSecondary = categoriesSearch.filter((item ) => {
//             if(item.ustensils.includes(dataSearch)){
//                 tagUtensilsAfterPrincipaleSearch.push(item.ustensils)
//             }
//         })

//         console.log(tagUtensilsAfterPrincipaleSearch)
//         // HYDRATATION LIST ELEMENTS TAG UTENSILS
//         const listElementsTagUtensils = document.querySelector('.listElementsUstensiles')
//         // console.log(listElementsTagUtensils);
//         listElementsTagUtensils.innerHTML = `<p>${tagUtensilsAfterPrincipaleSearch}</p>`   
        
//     // HYDRATATION PAGE
//     // const classRecipesWrapper = document.querySelector('.recipes-wrapper') // CIBLAGE CONTENEUR CARDS
//     // classRecipesWrapper.innerHTML = ''   // CLEAN DOM RECIPES WRAPPER CONTAINER
//     // NOW HYDRATATION classRecipesWrapper AVEC UN MERGE SET DES 3 ARRAYS
// })


filterByTag('inputSearchBtnIngredients')
filterByTag('inputSearchBtnAppareils')
filterByTag('inputSearchBtnUstensiles')


function filterByTag(nameInputTagSearch) {
const tagIngredients = document.querySelector(`.${nameInputTagSearch}`)

tagIngredients.addEventListener('keyup', (e) => {
    const dataSearch = e.target.value.toLowerCase()
    // console.log(dataSearch)

    // categoriesSearch.forEach(recipe => createCard(recipe));     // INJECTION IN THE DOM AFTER SORTING BY NAME
    /* ACTUALISATION DE RECHERCHE AVANCE PAR TAG */
    let listChoicetag = document.querySelectorAll('.listElements');
    
    listChoicetag.forEach(item => {
        return item.innerHTML = ''
    })
    // console.log(dataFilterByIngredientsLast); // ARRAY WITH OBJECT - LIST OF RECIPES AFTER FILTER

    /* ACTUALISATION TAG INGREDIENTES APRES RECHERCHE PRINCIPALE */
        let tagByIngredient = [];
        const ingredientsArrRecipe = categoriesSearch.map((arrIngredient) => {
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
        // console.log(arrTagIngredientsSecondaryNoDuplicate);
            // HYDRATATION LIST ELEMENTS TAG INGREDIENTS
            const listElementsTagIngredients = document.querySelector('.listElementsIngredients')
            
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
        const arrTagApplianceSecondary = categoriesSearch.filter((item ) => {
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
        const tagFilterByUstensilsSecondary =  categoriesSearch.map(ele => {
            console.log(ele.ustensils);
            return ele.ustensils
        })

        let tagUtensilsAfterPrincipaleSearch = []
        const arrTagUtensilsSecondary = tagFilterByUstensilsSecondary.filter((item ) => {
            if(item.ustensils.toLowerCase().includes(dataSearch)){
                tagUtensilsAfterPrincipaleSearch.push(item.ustensils)
            }
        })

        console.log(tagUtensilsAfterPrincipaleSearch)
        const arrTagUstensilesSecondaryNoDuplicate = [...new Set(tagUtensilsAfterPrincipaleSearch.map((item) => {return item}))]
        console.log(arrTagUstensilesSecondaryNoDuplicate);
        // HYDRATATION LIST ELEMENTS TAG UTENSILS
        const listElementsTagUtensils = document.querySelector('.listElementsUstensiles')
        // console.log(listElementsTagUtensils);
        listElementsTagUtensils.innerHTML = `<p>${arrTagUstensilesSecondaryNoDuplicate}</p>`   
        
    // HYDRATATION PAGE
    // const classRecipesWrapper = document.querySelector('.recipes-wrapper') // CIBLAGE CONTENEUR CARDS
    // classRecipesWrapper.innerHTML = ''   // CLEAN DOM RECIPES WRAPPER CONTAINER
    // NOW HYDRATATION classRecipesWrapper AVEC UN MERGE SET DES 3 ARRAYS
    })
}






