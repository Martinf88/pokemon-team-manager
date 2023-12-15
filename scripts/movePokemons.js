const dexMessageBox = document.querySelector('.dex-message-box');
const champMessageBox = document.querySelector('.champ-message-box');

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
			clonedCard.classList.add('clone');
            clonedCard.querySelector('.move-pokemon').innerText = 'Kick';
            championsList.appendChild(clonedCard);
            addMoveEventListener(clonedCard, pokedexList, championsList); 
			
			dexMessageBox.innerText = `${pokemonName} was promoted!`;		
			
        } else if(pokemonCard.classList.contains('clone')) {
			championsList.removeChild(pokemonCard);
			champMessageBox.innerText = `${pokemonName} was deleted!`;

		} else if (pokemonCard.parentNode === championsList || championsList.childElementCount < 3) {
            moveButton.innerText = 'Promote';
            pokedexList.appendChild(pokemonCard);
            champMessageBox.innerText = `${pokemonName} was moved to pokedex!`;

        } else {
			dexMessageBox.innerText = 'Champion limit reached!';
		}
		setTimeout(() => {
			// champMessageBox.innerText = '';
			// dexMessageBox.innerText = '';
			champMessageBox.classList.add('invisible');
            dexMessageBox.classList.add('invisible');
		}, 1500);
    });
}
