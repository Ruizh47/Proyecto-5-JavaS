const totalCards = 12;
const availableImages = [
    'img/rick.png',  // Ruta a las imágenes de los personajes
    'img/morty.png',
    'img/summer.png',
    'img/beth.png',
    'img/jerry.png',
    'img/meeseeks.png'
]; // Usaremos 6 imágenes, cada una se repetirá

let cards = [];
let selectedCards = [];
let valuesUsed = [];
let currentMove = 0;
let currentAttempts = 0;

let cardTemplate = '<div class="card"><div class="back"></div><div class="face"><img src="" alt="image" class="card-image"></div></div>';

function generateCardValues() {
    let possibleValues = [];
    for (let i = 0; i < totalCards / 2; i++) {
        possibleValues.push(i);
        possibleValues.push(i);
    }
    return possibleValues.sort(() => 0.5 - Math.random()); // Mezclamos los valores
}

function activate(e) {
    if (currentMove < 2) {
        let card = e.target.closest('.card');
        if ((!selectedCards[0] || selectedCards[0] !== card) && !card.classList.contains('active')) {
            card.classList.add('active');
            selectedCards.push(card);

            if (++currentMove == 2) {
                currentAttempts++;
                document.querySelector('#stats').innerHTML = currentAttempts + ' intentos';

                let firstImage = selectedCards[0].querySelector('.card-image').src;
                let secondImage = selectedCards[1].querySelector('.card-image').src;

                if (firstImage === secondImage) {
                    selectedCards = [];
                    currentMove = 0;
                } else {
                    setTimeout(() => {
                        selectedCards[0].classList.remove('active');
                        selectedCards[1].classList.remove('active');
                        selectedCards = [];
                        currentMove = 0;
                    }, 600);
                }
            }
        }
    }
}

function initGame() {
    let cardValues = generateCardValues();
    for (let i = 0; i < totalCards; i++) {
        let div = document.createElement('div');
        div.innerHTML = cardTemplate;
        let imageValue = cardValues[i];
        div.querySelector('.card-image').src = availableImages[imageValue]; // Asigna la imagen
        div.querySelector('.card').addEventListener('click', activate);
        cards.push(div);
        document.querySelector('#game').append(cards[i]);
    }
}

initGame();
