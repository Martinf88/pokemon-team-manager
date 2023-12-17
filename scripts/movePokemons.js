const dexMessageBox = document.querySelector('.dex-message-box');
const champMessageBox = document.querySelector('.champ-message-box');
const reserveList = document.querySelector('#reserve-list')
const teamIsFull = document.querySelector('.team-is-full')
const teamIsNotFull = document.querySelector('.team-is-not-full')

teamIsFull.classList.add('invisible')
teamIsNotFull.classList.add('invisible')
dexMessageBox.classList.add('invisible')
champMessageBox.classList.add('invisible')

export function addMoveEventListener(pokemonCard, pokedexList, championsList) {
    pokemonCard.querySelector('.move-pokemon').addEventListener('click', () => {
        const moveButton = pokemonCard.querySelector('.move-pokemon');
        const pokemonName = pokemonCard.querySelector('.pokemon-name').textContent;

        dexMessageBox.classList.remove('invisible')
        champMessageBox.classList.remove('invisible')

        if (pokemonCard.parentNode === pokedexList && championsList.childElementCount < 3) {
            const clonedCard = pokemonCard.cloneNode(true);
            clonedCard.querySelector('.move-pokemon').innerText = 'Kick';
			clonedCard.classList.remove('first-three')
            championsList.appendChild(clonedCard);
            addMoveEventListener(clonedCard, pokedexList, championsList); 
            dexMessageBox.innerText = `${pokemonName} was promoted!`;     
            
        } else if (pokemonCard.parentNode === championsList) {
            if (!pokemonCard.classList.contains('first-three')) {
                championsList.removeChild(pokemonCard);
                champMessageBox.innerText = `${pokemonName} was deleted!`;
            } else {
                moveButton.innerText = 'Promote';
                pokedexList.appendChild(pokemonCard);
                champMessageBox.innerText = `${pokemonName} was moved to pokedex!`;
            }
        } else if(pokemonCard.parentNode === reserveList && championsList.childElementCount < 3) {
            pokemonCard.querySelector('.move-pokemon').innerText = 'Kick';
            championsList.appendChild(pokemonCard);
            addMoveEventListener(pokemonCard, pokedexList, championsList); 
            dexMessageBox.innerText = `${pokemonName} was promoted!`;        
        } else {
            const clonedCard = pokemonCard.cloneNode(true);
            dexMessageBox.innerText = `${pokemonName} was moved to reserves`;
			teamIsFull.classList.remove('invisible')
            reserveList.appendChild(clonedCard);
            addMoveEventListener(clonedCard, pokedexList, championsList); 
        }

        setTimeout(() => {
            // champMessageBox.innerText = '';
            // dexMessageBox.innerText = '';
            champMessageBox.classList.add('invisible');
            dexMessageBox.classList.add('invisible');
        }, 1500);
    });
}