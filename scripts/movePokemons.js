import { giveNickname, resetName } from "./dom.js";

const dexMessageBox = document.querySelector('.dex-message-box');
const champMessageBox = document.querySelector('.champ-message-box');
const teamStatusMessage = document.querySelector('.team-status-message')

let reserveList = document.querySelector('#reserve-list')
let pokedexList = document.querySelector('#pokedex-list');
let championsList = document.querySelector('#champions-list');

dexMessageBox.classList.add('invisible')
champMessageBox.classList.add('invisible')

//Creates a clone of the pokemon when clicked on in the pokedex
function createNewPokemonCard(pokemonCard, list, buttonText) {
	
    const clonedCard = pokemonCard.cloneNode(true);
    clonedCard.querySelector('.move-pokemon').innerText = buttonText;
    giveNickname(clonedCard);
    list.appendChild(clonedCard);
    addMoveEventListener(clonedCard, pokedexList, championsList);
	resetName(clonedCard);
}

function updateMessageBox(messageBox, message) {

    messageBox.classList.remove('invisible');
    messageBox.innerText = message;
    setTimeout(() => {
        messageBox.classList.add('invisible');
    }, 1600);
}

function updateTeamMessages(championsCount) {
    if (championsCount === 3) {
        teamStatusMessage.innerText = 'Your team is full'
    } else {
        teamStatusMessage.innerText = 'Your team has empty slots'
    }
}

export function addMoveEventListener(pokemonCard, pokedexList, championsList) {

    pokemonCard.querySelector('.move-pokemon').addEventListener('click', () => {
		//selects updated list to check if championsList is full or not
        championsList = document.querySelector('#champions-list');
        const moveButton = pokemonCard.querySelector('.move-pokemon');
        const pokemonName = pokemonCard.querySelector('.pokemon-name').textContent;

        if (pokemonCard.parentNode === pokedexList && championsList.childElementCount < 3) {
            createNewPokemonCard(pokemonCard, championsList, 'Kick');
            updateMessageBox(dexMessageBox, `${pokemonName} was promoted!`);
            updateTeamMessages(championsList.childElementCount);

        } else if (pokemonCard.parentNode === championsList) {
            if (!pokemonCard.classList.contains('first-three')) {
                championsList.removeChild(pokemonCard);
                updateMessageBox(champMessageBox, `${pokemonName} was deleted!`);
                updateTeamMessages(championsList.childElementCount);

            } else {
                moveButton.innerText = 'Promote';
                pokemonCard.classList.remove('first-three');
                pokedexList.appendChild(pokemonCard);
                updateMessageBox(champMessageBox, `${pokemonName} was moved to pokedex!`);
                updateTeamMessages(championsList.childElementCount);
            }
        } else if (pokemonCard.parentNode === reserveList) {
			
			if (championsList.childElementCount >= 3) {
				updateMessageBox(champMessageBox, `Your team is full!`);
			} else {
				championsList.appendChild(pokemonCard);
				moveButton.innerText = 'Kick';
				updateMessageBox(champMessageBox, `${pokemonName} was promoted!`);
				updateTeamMessages(championsList.childElementCount);
			}
		} else {
			createNewPokemonCard(pokemonCard, reserveList, 'Promote');
			updateMessageBox(dexMessageBox, `${pokemonName} was moved to reserves`);
			teamStatusMessage.classList.remove('invisible');
			updateTeamMessages(championsList.childElementCount);
		}
    });
}



