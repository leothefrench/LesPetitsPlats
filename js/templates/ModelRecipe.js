// console.log(recipes)
// console.log(typeof recipes) // OBJET

let recipesArray = Object.entries(recipes); // RETURN AN ARRAY

// console.log(recipesArray);

function secondarySearch(nameTag, nameClass) {
    // IMPLEMENTATION TAGS LISTS UNDER BTN (INGREDIENTS - APPAREIL - USTENSILS)

    const tags = document.querySelector('.tags')

    let dropdownMenu = document.createElement('div') // DIV CONTAINER FOR BUTTON AND INPUT SEARCH
    dropdownMenu.setAttribute('class', 'dropdownMenu')

    let buttonTag = document.createElement('button') // BUTTON TAGS
    buttonTag.setAttribute('class', `${nameClass}`)
    buttonTag.setAttribute('aria-hidden', 'false')
    buttonTag.textContent = `${nameTag}`
    
    let spanChevronDown = document.createElement('span') // CHEVRON DOWN
    spanChevronDown.innerHTML = `
        <i class="fa-solid fa-chevron-down"></i>
    `
    buttonTag.appendChild(spanChevronDown) // ADDING CHEVRON DOWN TO BUTTON
    dropdownMenu.appendChild(buttonTag) // ADDING BUTTON IN CONTAINER

    let buttonAndInputDiv = document.createElement('div')
    buttonAndInputDiv.classList.add('buttonAndInputDiv')

    let listInputSearch = document.createElement('div') // DIV FOR INPUT SEARCH AND ARROW UP
    listInputSearch.setAttribute('class', 'listInputSearch')
    listInputSearch.setAttribute('aria-hidden', 'true')

    // console.log(listInputSearch)

    let inputSearch = document.createElement('input') // INPUT SEARCH
    inputSearch.classList.add('inputSearchBtn')
    inputSearch.setAttribute('placeholder', 'Rechercher un ingrédient')
     
    let arrowChevronUp = document.createElement('span')
    arrowChevronUp.setAttribute('class', 'spanArrowChevronUp')
    
    arrowChevronUp.innerHTML = `<i class="fa-solid fa-chevron-up"></i>`
    listInputSearch.appendChild(inputSearch)
    listInputSearch.appendChild(arrowChevronUp)

    let listElementsDiv = document.createElement('div')
    listElementsDiv.classList.add('listElements')
    
    let arrayIngredients = []
    
    recipes.map(recette => {
        recette.ingredients.map(ingredient => {
            if(arrayIngredients.filter(ing => ing == ingredient.ingredient).length == 0) {
                arrayIngredients.push(ingredient.ingredient)
            }
       })
    })

    // arrayIngredients()
    // console.log(arrayIngredients)

    // INJECTION DATA LIST INGREDIENTS
    let listIngredients =  arrayIngredients.map(ingredients => {
        return `<p>${ingredients}</p>`    
    }).join('')

    listElementsDiv.innerHTML = listIngredients


    let globalSearch =  document.createElement('div')
    globalSearch.classList.add('globalSearch')

    globalSearch.appendChild(listInputSearch)
    globalSearch.appendChild(listElementsDiv)

    dropdownMenu.appendChild(globalSearch)

    tags.appendChild(dropdownMenu)

    // console.log(tags)

    // ADD EVENT LISTENER ON BUTTON SEARCH BAR
    let search = document.querySelector('.ingredients') // BTN SEARCH
    let globalSearchDiv = document.querySelector('.globalSearch') // DISPLAY 
    let arrowUp = document.querySelector('.spanArrowChevronUp')
    // console.log(arrowChevronUp)

    search.addEventListener('click', () => {
        if(globalSearchDiv.style.display === 'none') {
            globalSearchDiv.style.display = 'block'
            search.style.display = 'none'
        } else{
            globalSearchDiv.style.display = 'none'          
        }
    })

    arrowUp.addEventListener('click', () => {
        if(search.style.display = 'none') {
            search.style.display = 'block'
            globalSearchDiv.style.display  = 'none'
        }
    })
}

secondarySearch('Ingrédients', 'ingredients')
secondarySearch('Appareils', 'appareils')
secondarySearch('Ustensiles', 'ustensiles')

// function arrayIngredients() {
//     let arrayIngredients = []
    
//     recipes.map(recette => {
//         recette.ingredients.map(ingredient => {
//             if(arrayIngredients.filter(ing => ing == ingredient.ingredient).length == 0) {
//                 arrayIngredients.push(ingredient.ingredient)
//             }
//        })
//     })
// }












// FUNCTION CREATION DES ELEMENTS DE LA CARD
const create = (elm, attributes) => {
	const element = document.createElement(elm);
	for (let key in attributes) {
		element.setAttribute(key, attributes[key]) // RETURN KEY AND VALUE
	}
    // console.log(element)
	return element;
}

// FUNCTION CREATION GLOBAL CARD
let createCard = (recipe) => {
    let imgCard = create('div', {class: 'imageCard', alt: 'img-card'}) // IMAGE

    let timerCard = create('div', {class: 'timerClock'}) // CLOCK ICON AND TIME COOKING
    timerCard.innerHTML = `
            <h2 class='titleCard'>${recipe[1].name}</h2>
            <div class='divClock'>
                <i class="fa-regular fa-clock"></i>
                <span>${recipe[1].time} mn</span>
            </div>
        `
    
    let titleAndClockTimer = create('div', {class: 'titleAndClock'})
    titleAndClockTimer.appendChild(timerCard)

    let containerCard = create('article', {class: 'containerCard'})
    containerCard.appendChild(imgCard)
    containerCard.appendChild(timerCard)

    // INGREDIENTS PART
    let divIngredientsList = create('div', {class: 'divIngredientsList'})

    let ingredientsList = recipe[1].ingredients.map(ingredients => {
 
        if(Object.prototype.hasOwnProperty.call(ingredients, 'quantity') && Object.prototype.hasOwnProperty.call(ingredients, 'unit')) { 
           return `<p>${ingredients.ingredient}: <span>${ingredients.quantity} ${ingredients.unit}</span></p>`
        } else if(Object.prototype.hasOwnProperty.call(ingredients, 'quantity') && !(Object.prototype.hasOwnProperty.call(ingredients, 'unit'))) {
           return `<p>${ingredients.ingredient}: <span>${ingredients.quantity}</span></p>`
        } else {
           return `<p>${ingredients.ingredient}</p>`
        }
    }).join('')

    divIngredientsList.innerHTML = ingredientsList;

    let ingredientsAndDescription = create('div', {class: 'divIngredientsAndDescription'})
    ingredientsAndDescription.innerHTML = `
            <p class='description'>${recipe[1].description}</p>
        `
    // DIV FOR INGREDIENTS AND DESCRIPTION
    let divBottomCard = create('div', {class: 'containerIngredientsDescription'})
    divBottomCard.appendChild(divIngredientsList)
    divBottomCard.appendChild(ingredientsAndDescription)

    containerCard.appendChild(divBottomCard)

    document.querySelector('.recipes-wrapper').appendChild(containerCard)
}

recipesArray.forEach(recipe => createCard(recipe))


