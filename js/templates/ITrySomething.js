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
    console.log(dataFilterByDescription); // ARRAY WITH OBJECTS
    // SUPPRIMER LES INGREDIENTS CONTENANT LES SUB-STRING (ex: cocotte qui contient coco) ???

    
    /* HYDRATION ARRAY WITH RECIPE BY DESCRIPTION WITHOUT DUPLICATE */
    let recipeArrayFilterByDescription = [...new Set(dataFilterByDescription.map((item) => {return item}))]
    
    // ARRAY MERGE WITHOUT DUPLICATE IN ES6 - NEW SET
    const mergeArraysFilter = [...new Set([...recipeArrayFilterByName, ...recipeArrayFilterByIngredients, ...recipeArrayFilterByDescription])]

    // HYDRATATION PAGE
    const classRecipesWrapper = document.querySelector('.recipes-wrapper')
    classRecipesWrapper.innerHTML = ''   // CLEAN DOM RECIPES WRAPPER CONTAINER
    finalRecipeArray = Object.entries(mergeArraysFilter);       // RETURN AN ARRAY OF ARRAYS
    // finalRecipeArray = [...new Set([...mergeArraysFilter])]

    console.log(finalRecipeArray);

    /* TESTING IF NO RECIPES */
    if(finalRecipeArray == 0) {
        classRecipesWrapper.innerHTML = '<p>Aucune recette ne correspond à votre critère de recherche, vous pouvez chercher "tarte aux pommes", "poisson", etc.</p>'
    } else {
        finalRecipeArray.forEach(recipe => createCard(recipe));     // INJECTION IN THE DOM AFTER SORTING BY NAME
        /* ACTUALISATION DE RECHERCHE AVANCE PAR TAG */
        let listChoicetag = document.querySelectorAll('.listElements');

        listChoicetag.forEach(item => {
            return item.innerHTML = ''
        })
        console.log(dataFilterByIngredientsLast); // ARRAY WITH OBJECT
        let tagByIngredient = [];
        const ingredientsArrRecipe = dataFilterByIngredientsLast.map((arrIngredient) => {
            let tempArray = []

            arrIngredient.ingredients.map(item => {
                tempArray.push(item.ingredient)
            })
            console.log(tempArray)
            const pouf = tempArray.forEach(item => {
                tagByIngredient.push(item)
            })
            console.log(tagByIngredient)
            const arrTagIngredientsSecondary = []

            const tagIngredientsForSecondarySearch = tagByIngredient.filter(item => {
                if(item.includes(dataSearch)) {
                    arrTagIngredientsSecondary.push(item)
                }
            })
            console.log(arrTagIngredientsSecondary)
            const listElementsTagIngredients = document.querySelector('.listElementsIngredients')
            listElementsTagIngredients.innerHTML = `<ul>
                                                    <li>${arrTagIngredientsSecondary}</li>
                                                </ul>`
        })




    }


/* A2 - FILTERING BY ONE TAG OR MANY TAGS AND ADDING NEW ONE */

// WE NEED TO START WITH THE FINALRECIPEARRAY WITH THE RECIPES LEFT AFTER FILTERING

/* TAG INGREDIENTS FILTER */
const filterIngredients = document.querySelector('.inputSearchBtnIngredients')
// console.log(filterIngredients);

filterIngredients.addEventListener('keyup', (e) => {
   /* FILTER BY INGREDIENTS */
    const dataSearch = e.target.value.toLowerCase(); 

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
   
    /* HYDRATION ARRAY WITH RECIPE BY INGREDIENTS WITHOUT DUPLICATE */
    let recipeArrayFilterByIngredients = [...new Set(dataFilterByIngredientsLast.map((item) => {return item}))]

    // HYDRATATION LIST ELEMENTS TAG FILTER BY INGREDIENTS
    const listsElementsIngredients = document.querySelector('.listElements')
    // console.log(listsElementsIngredients);
    listsElementsIngredients.innerHTML = ''   // CLEAN DOM RECIPES WRAPPER CONTAINER
    finalRecipeArrayIngredients = Object.entries(recipeArrayFilterByIngredients);       // RETURN AN ARRAY OF ARRAYS
    console.log(finalRecipeArrayIngredients);

    finalRecipeArrayIngredients.forEach(el => {
        return el.ingredient
    
    });    


})

/* FILTER BY APPLIANCES */

const filterAppliance = document.querySelector('.inputSearchBtnAppareils')
// console.log(filterAppliance);

filterAppliance.addEventListener('keyup', (e) => {
    const dataSearch = e.target.value.toLowerCase();

    const dataFilterByAppliance = categoriesSearch.filter((item ) => {
        return (item.appliance.toLowerCase().includes(dataSearch))
    })
    console.log(dataFilterByAppliance)
    /* HYDRATION ARRAY WITH RECIPE BY NAME WITHOUT DUPLICATE */
    let recipeArrayFilterByAppliance = [...new Set(dataFilterByAppliance.map((item) => {return item}))]
    console.log(recipeArrayFilterByAppliance);
})

/* FILTER BY UTENSILS */

const filterUstensils = document.querySelector('.inputSearchBtnUstensiles')
// console.log(filterUstensils);

filterUstensils.addEventListener('keyup', (e) => {
    const dataSearch = e.target.value.toLowerCase();

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

    /* MON CODE BY USTENSILS */
    let recipeByUstensils = []
    const ustensilsArrRecipe = categoriesSearch.map((arrUstensils) => {
        let tempArrayUtensils = []

        arrUstensils.ustensils.map(item => {
            tempArrayUtensils.push(item)
        })

        console.log(tempArrayUtensils);

        const dataFilterByUtensils = tempArrayUtensils.filter((item) => {
            if(item.toLowerCase().includes(dataSearch)) {
                recipeByUstensils.push(arrUstensils)
            }
        })
    })
   
    console.log(recipeByUstensils);

    /* HYDRATION ARRAY WITH RECIPE BY NAME WITHOUT DUPLICATE */
    let recipeArrayFilterByUstensils = [...new Set(recipeByUstensils.map((item) => {return item}))]
    console.log(recipeArrayFilterByUstensils);
})

































    
    // document.querySelector('.inputSearchBtnUstensiles').addEventListener('keyup', (e) => {
    //     const ustensilesSearch = e.target.value.toLowerCase()
    // });

    // /* FILTER BY APPLIANCE */
    // const dataFilterByAppliance = categoriesSearch.filter((item ) => {
    //     return (item.appliance.toLowerCase().includes(dataSearch))
    // })
    // // console.log(dataFilterByAppliance);
    // /* HYDRATION ARRAY WITH RECIPE BY APPLIANCE WITHOUT DUPLICATE */
    // let recipeArrayFilterByAppliance = [...new Set(dataFilterByDescription.map((item) => {return item}))]
    // // console.log(recipeArrayFilterByAppliance);

    // /* FILTER BY USTENSILES */

    // // ARRAY MERGE WITHOUT DUPLICATE IN ES6 - NEW SET
    // const mergeArraysFilterTags = [...new Set([...recipeArrayFilterByIngredients, ...recipeArrayFilterByAppliance, ...recipeArrayFilterByUstensiles])]

})