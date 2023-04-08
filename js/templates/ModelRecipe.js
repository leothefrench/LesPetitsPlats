// console.log(recipes)
// console.log(typeof recipes) // OBJET

let recipesArray = Object.entries(recipes); // RETURN AN ARRAY OF ARRAYS

// console.log(recipesArray);

function secondarySearch(nameTag, nameClass, nameFunction, searchBloc, nameChevronUp, inputSearchBtn) {
    // IMPLEMENTATION TAGS LISTS UNDER BTN (INGREDIENTS - APPAREIL - USTENSILS)

    const tags = document.querySelector('.tags')

    let dropdownMenu = document.createElement('div') // DIV CONTAINER FOR BUTTON AND INPUT SEARCH
    dropdownMenu.setAttribute('class', 'dropdownMenu')

    let buttonTag = document.createElement('button') // BUTTON TAGS
    buttonTag.setAttribute('class', `${nameClass}`)
    // buttonTag.setAttribute('aria-hidden', 'false')
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
    inputSearch.classList.add(`${inputSearchBtn}`)
    inputSearch.setAttribute('placeholder', 'Rechercher un ingrédient')
     
    let arrowChevronUp = document.createElement('span')
    // arrowChevronUp.classList.add('spanArrowChevronUp')
    arrowChevronUp.setAttribute('class', `${nameChevronUp}`)
    
    arrowChevronUp.innerHTML = `<i class="fa-solid fa-chevron-up"></i>`
    listInputSearch.appendChild(inputSearch)
    listInputSearch.appendChild(arrowChevronUp)

    let listElementsDiv = document.createElement('div')
    listElementsDiv.classList.add('listElements')

/***********************************ARRAY FOR INGREDIENTS********************************* */
    let listIngredientsWithoutDuplicate = nameFunction()
    // console.log(listIngredientsWithoutDuplicate)

    let listIngredients =  listIngredientsWithoutDuplicate.map(ingredients => {
        return `<p>${ingredients}</p>`    
    }).join('')

    listElementsDiv.innerHTML = listIngredients


    let globalSearch =  document.createElement('div')
    globalSearch.classList.add(`${searchBloc}`)

    globalSearch.appendChild(listInputSearch)
    globalSearch.appendChild(listElementsDiv)

    dropdownMenu.appendChild(globalSearch)

    tags.appendChild(dropdownMenu)
}


secondarySearch('Ingrédients', 'ingredients',arrayForIngredients, 'globalSearchIngredients', 'spanArrowChevronUpIngredients', 'inputSearchBtnIngredients')
secondarySearch('Appareils', 'appareils', arrayForUstensils, 'globalSearchAppareils', 'spanArrowChevronUpAppareils', 'inputSearchBtnAppareils')
secondarySearch('Ustensiles', 'ustensiles', arrayForAppliances, 'globalSearchUstensiles', 'spanArrowChevronUpUstensiles', 'inputSearchBtnUstensiles')


// ADD EVENT LISTENER ON BUTTON SEARCH INGREDIENTS
let btnIngredients = document.querySelector('.ingredients')
// console.log(btnIngredients);
let globalSearchDiv = document.querySelector('.globalSearchIngredients') // DISPLAY 
let arrowUp = document.querySelector('.spanArrowChevronUpIngredients')
let tags = document.querySelector('.tags')

btnIngredients.addEventListener('click', () => {
    if(globalSearchDiv.style.display === 'none') {
        globalSearchDiv.style.display = 'block'
        btnIngredients.style.display = 'none'
        tags.style.position = 'absolute'
        // console.log('POUF ONE')
    } else{
        globalSearchDiv.style.display = 'none'          
    }
})

    arrowUp.addEventListener('click', () => {
        if(globalSearchDiv.style.display = 'none') {
            btnIngredients.style.display = 'block'
            globalSearchDiv.style.display  = 'none'
            tags.style.position = ''
        }
    })

// ADD EVENT LISTENER ON BUTTON SEARCH APPAREILS
let btnAppareils = document.querySelector('.appareils')
// console.log(btnAppareils);
let globalSearchDivAppareils = document.querySelector('.globalSearchAppareils') 
let arrowUpAppareils = document.querySelector('.spanArrowChevronUpAppareils')
// console.log(arrowUpAppareils);

btnAppareils.addEventListener('click', () => {
    if(globalSearchDivAppareils.style.display === 'none') {
        globalSearchDivAppareils.style.display = 'block'
        btnAppareils.style.display = 'none'
        tags.style.position = 'absolute'
    } else{
        globalSearchDivAppareils.style.display = 'none'          
    }
})

    arrowUpAppareils.addEventListener('click', () => {
        if(globalSearchDivAppareils.style.display = 'none') {
            btnAppareils.style.display = 'block'
            globalSearchDivAppareils.style.display  = 'none'
            tags.style.position = ''
        }
    })
// ADD EVENT LISTENER ON BUTTON SEARCH APPAREILS
let btnUstensiles = document.querySelector('.ustensiles')
// console.log(btnUstensiles);
let globalSearchDivUstensiles = document.querySelector('.globalSearchUstensiles') 
let arrowUpUstensiles = document.querySelector('.spanArrowChevronUpUstensiles')
// console.log(arrowUpUstensiles);

btnUstensiles.addEventListener('click', () => {
    if(globalSearchDivUstensiles.style.display === 'none') {
        globalSearchDivUstensiles.style.display = 'block'
        globalSearchDivUstensiles.style.width = '500px'
        btnUstensiles.style.display = 'none'
        tags.style.position = 'absolute'
    } else{
        globalSearchDivUstensiles.style.display = 'none'          
    }
})

    arrowUpUstensiles.addEventListener('click', () => {
        if(globalSearchDivUstensiles.style.display = 'none') {
            btnUstensiles.style.display = 'block'
            globalSearchDivUstensiles.style.display  = 'none'
            tags.style.position = ''
        }
    })

function arrayForIngredients() {
    let arrayIngredients = []
    
    recipes.map(recette => {
        recette.ingredients.map(ingredient => {
            if(arrayIngredients.filter(ing => ing == ingredient.ingredient).length == 0) {
                arrayIngredients.push(ingredient.ingredient)
            }
       })
    })
    return arrayIngredients
}

// console.log(arrayForIngredients())

function arrayForAppliances() {
    let  arrayAppliances = []

    recipes.map(recette => {
        if(arrayAppliances.filter(ing => ing == recette.appliance).length == 0) {
            arrayAppliances.push(recette.appliance)
        }
    } )
    return arrayAppliances
}
// console.log(arrayForAppliances())

function arrayForUstensils() {
    let arrayUstensils = []
    
    recipes.map(recette => {
        recette.ustensils.map(ustensil => {
            if(arrayUstensils.filter(ing => ing == ustensil).length == 0) {
                arrayUstensils.push(ustensil)
            }
       })
    })
    return arrayUstensils
}

// console.log(arrayForUstensils())

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


