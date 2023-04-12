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

    /* FILTER BY DESCRIPTION */
    const dataFilterByDescription = categoriesSearch.filter((item ) => {
        return (item.description.toLowerCase().includes(dataSearch))
    })
    console.log(dataFilterByDescription);
    /* HYDRATION ARRAY WITH RECIPE BY DESCRIPTION WITHOUT DUPLICATE */
    let recipeArrayFilterByDescription = [...new Set(dataFilterByName.map((item) => {return item}))]

    /* FILTER BY USTENSILS */
    const dataFilterByUstensiles = categoriesSearch.filter((item ) => {
        return (item.ustensils[0].toLowerCase().includes(dataSearch)) //BUGGY
    })
    console.log(dataFilterByUstensiles)
    /* HYDRATION ARRAY WITH RECIPE BY UTENSILS WITHOUT DUPLICATE */
    let recipeArrayFilterByUtensils = [...new Set(dataFilterByName.map((item) => {return item}))]

    // ARRAY MERGE WITHOUT DUPLICATE IN ES6 - NEW SET
    const mergeArraysFilter = [...new Set([...recipeArrayFilterByName, ...recipeArrayFilterByDescription, ...recipeArrayFilterByUtensils])]

    console.log(mergeArraysFilter);

    document.querySelector('.recipes-wrapper').innerHTML = ''           // CLEAN DOM RECIPES WRAPPER CONTAINER
    finalRecipeArray = Object.entries(dataFilterByName);        // RETURN AN ARRAY OF ARRAYS
    finalRecipeArray.forEach(recipe => createCard(recipe))      // INJECTION IN THE DOM AFTER SORTING BY NAME
})

/* FILTERING BY ONE TAG OR MANY TAGS */
