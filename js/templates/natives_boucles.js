/* SCENARIO NOMINAL */

/* RECHERCHE 3 CARACTERES MINIMUM (1.2 & 3) */
const searchBar =  document.querySelector('.inputSearch')

searchBar.addEventListener('keyup', (e) => {
    const searchedLetters = e.target.value; // Value Enter by user
    const cards = document.querySelectorAll('.containerCard') // All container of the cards

    filterElements(searchedLetters, cards);
})

function filterElements(letters, elements) {
    if(letters.length > 2) {
        for(let i = 0; i < elements.length; i++) {
            if(elements[i].textContent.toLowerCase().includes(letters)) {
                elements[i].style.display = 'block'
            } else {
                elements[i].style.display = 'none'
            }
        }
    }
}
