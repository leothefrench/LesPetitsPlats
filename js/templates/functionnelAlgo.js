// console.log(recipes) // ARRAY OF OBJECTS NO SORTED
const inputSearch = document.querySelector('.inputSearch') // INPUT ZONE FROM USER 
/* *********** SEARCH BY NAME ********** */
let backSearchTitleRecipe = [];

const sortedByName = recipes.sort((a, b) => {
    if(a.name < b.name) {
        return -1;
    }
    return 1;
})
// console.log(sortedByName) // SORTED BY NAME OK
let sortedByNameInLowerCase = sortedByName.map(function(myName) {
    myName.name = myName.name.toLowerCase()
    return myName
})
// console.log(sortedByNameInLowerCase); // RECIPE NAME NOW IN LOWER CASE
inputSearch.addEventListener('keyup', (e) => {
    console.log(e.target.value)
    if(e.target.value.length >= 3) { //BUG CAR L BOUCLE SE FAIT POUR 4, 5, 6, ETC.. - FAIRE UN  NEW SET
        const targetName = e.target.value.toLowerCase() // TRANSFORM IN LOWER CASE THE INPUT FROM USER
        /* FILTER BY NAME */
        const filterByName = sortedByNameInLowerCase.filter(character => {
            return character.name.includes(targetName)
        })
        console.log(filterByName); 

        backSearchTitleRecipe = [...new Set(filterByName.map((item) => {return item}))]
            // filterByName.map(nom => {
            //     if(backSearchTitleRecipe.filter(recipeName => recipeName == nom.name).length == 0) {
            //         console.log('PAF')
            //             backSearchTitleRecipe.push(nom)
            //         return backSearchTitleRecipe;
            //     }              
            // })
        console.log(backSearchTitleRecipe);
        document.querySelector('.recipes-wrapper').innerHTML = ''           // CLEAN DOM RECIPES WRAPPER CONTAINER
        let recipesArrayFilterByName = Object.entries(backSearchTitleRecipe);        // RETURN AN ARRAY OF ARRAYS
        recipesArrayFilterByName.forEach(recipe => createCard(recipe))      // INJECTION IN THE DOM AFTER SORTING BY NAME
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
// console.log(sortedByDescriptionInLowerCase);

inputSearch.addEventListener('keyup', (e) => {
    // console.log(e.target.value)
    if(e.target.value.length >= 3) {
    const targetName = e.target.value.toLowerCase()
    /* FILTER BY DESCRIPTION */
    const filterByDescription = sortedByDescriptionInLowerCase.filter(character => {
        return character.name.includes(targetName)
    })
    
    filterByDescription.map(description => {
        if(backSearchTitleRecipe.filter(recipeDescription => recipeDescription == description.description).length !== 0) {
            filterByDescription.map(recipe => {
                    backSearchTitleRecipe.push(recipe)
            })
            return backSearchTitleRecipe;
        }              
    })
    // console.log(backSearchTitleRecipe);
    }
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








