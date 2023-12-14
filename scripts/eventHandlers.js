const dexMessageBox = document.querySelector('.dex-message-box');
const champMessageBox = document.querySelector('.champ-message-box');

export function addMoveEventListener(pokemonCard, pokedexList, championsList) {
    pokemonCard.querySelector('.move-pokemon').addEventListener('click', () => {
        const moveButton = pokemonCard.querySelector('.move-pokemon');
		const pokemonName = pokemonCard.querySelector('.pokemon-name').textContent;

        if (pokemonCard.parentNode === pokedexList && championsList.childElementCount < 3) {
            const clonedCard = pokemonCard.cloneNode(true);
			clonedCard.classList.add('clone');
            clonedCard.querySelector('.move-pokemon').innerText = 'Kick';
            championsList.appendChild(clonedCard);
            addMoveEventListener(clonedCard, pokedexList, championsList); 

			dexMessageBox.innerText = `${pokemonName} was promoted!`;		
        } else if(pokemonCard.classList.contains('clone')) {
			championsList.removeChild(pokemonCard);
		} else {
            moveButton.innerText = 'Promote';
            pokedexList.appendChild(pokemonCard);
			champMessageBox.innerText = `${pokemonName} was moved to pokedex!`;

        }
		setTimeout(() => {
			champMessageBox.innerText = '';
			dexMessageBox.innerText = '';
		}, 1000);
    });
}