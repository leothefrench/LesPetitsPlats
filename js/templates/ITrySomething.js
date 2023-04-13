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
    console.log(dataFilterByName);
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

    console.log(dataFilterByIngredientsLast);
    
    /* HYDRATION ARRAY WITH RECIPE BY INGREDIENTS WITHOUT DUPLICATE */
    let recipeArrayFilterByIngredients = [...new Set(dataFilterByIngredientsLast.map((item) => {return item}))]

    /* FILTER BY DESCRIPTION */
    const dataFilterByDescription = categoriesSearch.filter((item ) => {
        return (item.description.toLowerCase().includes(dataSearch))
    })
    console.log(dataFilterByDescription);
    /* HYDRATION ARRAY WITH RECIPE BY DESCRIPTION WITHOUT DUPLICATE */
    let recipeArrayFilterByDescription = [...new Set(dataFilterByDescription.map((item) => {return item}))]

    // ARRAY MERGE WITHOUT DUPLICATE IN ES6 - NEW SET
    const mergeArraysFilter = [...new Set([...recipeArrayFilterByName, ...recipeArrayFilterByIngredients, ...recipeArrayFilterByDescription])]

    console.log(mergeArraysFilter);

    // HYDRATATION PAGE
    document.querySelector('.recipes-wrapper').innerHTML = ''           // CLEAN DOM RECIPES WRAPPER CONTAINER
    finalRecipeArray = Object.entries(mergeArraysFilter);        // RETURN AN ARRAY OF ARRAYS
    finalRecipeArray.forEach(recipe => createCard(recipe));     // INJECTION IN THE DOM AFTER SORTING BY NAME
})

    /* FILTERING BY ONE TAG OR MANY TAGS AND ADDING NEW ONE */

    // WE START WITH THE FINALRECIPEARRAY WITH THE RECIPES LEFT AFTER FILTERING

    /* TAG INGREDIENTS FILTER */
    document.querySelector('.inputSearchBtnIngredients').addEventListener('keyup', (e) => {
        const dataSearch = e.target.value.toLowerCase()


    })

    document.querySelector('.ustensiles').addEventListener('keyup', (e) => {
        const ustensilesSearch = e.target.value.toLowerCase()
    });

    /* FILTER BY APPLIANCE */
    const dataFilterByAppliance = categoriesSearch.filter((item ) => {
        return (item.appliance.toLowerCase().includes(ustensilesSearch))
    })
    // console.log(dataFilterByAppliance);
    /* HYDRATION ARRAY WITH RECIPE BY APPLIANCE WITHOUT DUPLICATE */
    let recipeArrayFilterByAppliance = [...new Set(dataFilterByDescription.map((item) => {return item}))]
    // console.log(recipeArrayFilterByAppliance);

    /* FILTER BY USTENSILES */

    // ARRAY MERGE WITHOUT DUPLICATE IN ES6 - NEW SET
    const mergeArraysFilterTags = [...new Set([...recipeArrayFilterByIngredients, ...recipeArrayFilterByAppliance, ...recipeArrayFilterByUstensiles])]

