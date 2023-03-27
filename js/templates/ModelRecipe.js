
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
    // titleAndClockTimer.appendChild(titleCard)
    titleAndClockTimer.appendChild(timerCard)

    let containerCard = create('article', {class: 'containerCard'})
    containerCard.appendChild(imgCard)
    containerCard.appendChild(timerCard)

    // INGREDIENTS PART
    let ingredientsAndUtensils = create('div', {class: 'divIngredientsUtensils'})
    ingredientsAndUtensils.innerHTML = `
            <p class='description'${recipe[1].description}</p>
        `
    
    containerCard.appendChild(ingredientsAndUtensils)

    document.querySelector('.recipes-wrapper').appendChild(containerCard)
}

recipesArray.forEach(recipe => createCard(recipe))


// IMPLEMENTATION INGREDIENTS ET TAG A FAIRE 
