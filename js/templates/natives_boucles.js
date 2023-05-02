/* SCENARIO NOMINAL */

/* RECHERCHE 3 CARACTERES MINIMUM (1.2 & 3) */
const searchBar =  document.querySelector('.inputSearch')

// searchBar.addEventListener('keyup', (e) => {
//     const searchedLetters = e.target.value; // Value Enter by user
//     const cards = document.querySelectorAll('.containerCard') // All container of the cards

//     filterElements(searchedLetters, cards)
//     /* POINT 4 SCENARIO PRINCIPALE */
//     const itemsOfTags = document.querySelectorAll('.listElements')
//     console.log(itemsOfTags);
// })

// function filterElements(letters, elements) {
//     if(letters.length > 2) {
//         for(let i = 0; i < elements.length; i++) {
//             if(elements[i].textContent.toLowerCase().includes(letters)) {
//                 elements[i].style.display = 'block'
//             } else {
//                 elements[i].style.display = 'none'
//             }
//         }
//     }
// }

console.log(recipes);
/* PARTITION CODE FOR LIST ELEMENTS WITH LEFT AND RIGHT */
const partition = (tableau, gauche, droite) => {
    let pointPivot = tableau[Math.floor(gauche + droite) / 2] // ELEMENT CENTRAL

    while(gauche <= droite) {
        while(tableau[gauche].localeCompare(pointPivot) < 0) {
            gauche++
        }
        while(tableau[droite].localeCompare(pointPivot) > 0) {
            droite--
        }
        if(gauche <= droite) {
            echangePosition(tableau, gauche, droite);
            gauche++
            droite--
        }
    }
    return gauche
}

const echangePosition = (element, indexGauche, indexDroite) => {
    let temporaire = element[indexGauche]
    element[indexGauche] = element[indexDroite]
    element[indexDroite] = temporaire
}

/* FONCTION D'EXTRACTION & DE TRI DES MOTS */
const rapideTri = (tableau, gauche, droite) => {
    let index;

    if(tableau.length > 1) {
        index = partition(tableau, gauche, droite) // Pivot fonction partition

        if(gauche < index -1){ // DES ELEMENTS ENCORE SUR LA GAUCHE
            rapideTri(tableau, gauche, index - 1)
        }
        if(index < right) { // DES ELEMENTS ENCORE SUR LA DROITE
            rapideTri(tableau, index, droite)
        }
    }
    return tableau
}

/* POINT 2 DU SCENARIO NOMINAL - RECHERCHE NAME, INGREDIENTS & DECRIPTION */

// FILTRAGE & RECUPERATION ID, NAME, INGREDIENTS & DESCRIPTION
const creationTableauFiltrer = (tableau) => {
    const tableauFiltrer = []

    for(let i = 0; i < tableau.length; i++) {
        let filtrerElementsArr = (({id, ingredients, name, description }) => ({id, ingredients, name, description }))([i][1])
        console.log(filtrerElementsArr);

        tableauFiltrer.push(filtrerElementsArr)
    }
    return tableauFiltrer
}

const tableauSearch = creationTableauFiltrer(recipes)
console.log(tableauSearch);

