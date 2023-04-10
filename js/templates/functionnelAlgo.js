// console.log(recipes) // ARRAY OF OBJECTS NO SORTED
const inputSearch = document.querySelector('.inputSearch') // INPUT ZONE FROM USER 
// console.log(inputSearch)

/* *********** SEARCH BY NAME ********** */
/* SORTING BY NAME */
// console.log(recipes)
let backSearchTitleRecipe = [];

const sortedByName = recipes.sort((a, b) => {
    if(a.name < b.name) {
        return -1;
    }
    return 1;
})
// console.log(sortedByName)
let sortedByNameInLowerCase = sortedByName.map(function(myName) {
    myName.name = myName.name.toLowerCase()
    return myName
})
// console.log(sortedByNameInLowerCase); // RECIPE NAME NOW IN LOWER CASE
inputSearch.addEventListener('keyup', (e) => {
    console.log(e.target.value)
    if(e.target.value.length >= 3) {
    const targetName = e.target.value.toLowerCase() // TRANSFORM IN LOWER CASE THE INPUT FROM USER
    /* FILTER BY NAME */
    const filterByName = sortedByNameInLowerCase.filter(character => {
        return character.name.includes(targetName)
    })
    console.log(filterByName);

    filterByName.map(recipe => {
        backSearchTitleRecipe.push(recipe)
    })
    console.log(backSearchTitleRecipe);
    }  
})

/* *********** SEARCH BY RECIPE DESCRIPTION ********** */
const sortedByDescription = recipes.sort((a, b) => {
    if(a.description < b.description) {
        return -1;
    }
    return 1;
})

let sortedByDescriptionInLowerCase = sortedByDescription.map(function(myDescription) {
    myDescription.description = myDescription.description.toLowerCase()
    return myDescription
})

inputSearch.addEventListener('keyup', (e) => {
    console.log(e.target.value)
    const targetName = e.target.value.toLowerCase()
    /* FILTER BY DESCRIPTION */
    const filterByDescription = sortedByDescriptionInLowerCase.filter(character => {
        return character.name.includes(targetName)
    })
    console.log(filterByDescription)


})


/* *********** SEARCH BY INGREDIENTS ********** */
let recipesArrayFilterByName = Object.entries(recipes); // RETURN AN ARRAY WITH ARRAYS INSIDE
// console.log(recipesArrayFilterByName); // ARRAY WITH ARRAY -INDEX & OBJECT

function arrayBackIndexOne(startingArray) {
    // console.log( startingArray[1].ingredients)
    return startingArray[1].ingredients
}

recipesArrayFilterByName.forEach(recette => arrayBackIndexOne(recette).sort((a, b) => {
    if(a.ingredients < b.ingredients) {
        return -1;
    }
    return 1;
})) // RETURN ALL THE ARRAY OF INGREDIENTS (INGREDIENT ARE INSIDE)























    // document.querySelector('.recipes-wrapper').innerHTML = ''           // CLEAN DOM RECIPES WRAPPER CONTAINER
    // let recipesArrayFilterByName = Object.entries(filterByName);        // RETURN AN ARRAY OF ARRAYS
    // recipesArrayFilterByName.forEach(recipe => createCard(recipe))      // INJECTION IN THE DOM AFTER SORTING BY NAME

    // document.querySelector('.recipes-wrapper').innerHTML = ''           // CLEAN DOM RECIPES WRAPPER CONTAINER
    // let recipesArrayFilterByDescription = Object.entries(filterByDescription);        // RETURN AN ARRAY OF ARRAYS
    // recipesArrayFilterByDescription.forEach(recipe => createCard(recipe))      // INJECTION IN THE DOM AFTER SORTING BY NAME