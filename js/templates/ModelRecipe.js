
console.log(recipes)
console.log(typeof recipes) // OBJET

let recipesArray = Object.entries(recipes); // RETURN AN ARRAY

console.log(recipesArray);

// FUNCTION CREATION DES ELEMENTS DE LA CARD
const create = (elm, attributes) => {
	const element = document.createElement(elm);
	for (let key in attributes) {
		element.setAttribute(key, attributes[key]) // RETURN KEY AND VALUE
	}
    // console.log(element)
	return element;
}

let createCard = (recipe) => {
    let imgCard = create('div', {class: 'imageCard', alt: 'img-card'}) // IMAGE

    let timerCard = create('div', {class: 'timerClock'})
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


// IMPLEMENTATION INGREDIENTS ET TAG A FAIRE 
