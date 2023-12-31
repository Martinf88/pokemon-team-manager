import { addMoveEventListener } from './movePokemons.js';
import { fetchPokemon } from "./fetching.js";
export const startAdventure = document.querySelector('.start-adventure')
const firstContainer = document.querySelector('.first')
const secondContainer = document.querySelector('.second')
const thirdContainer = document.querySelector('.third')
const enterTeamName = document.querySelector('#enter-team-name')
const teamName = document.querySelector('.team-name')
const searchPokemon = document.querySelector('#search-pokemon');
const navbar = document.querySelector('.navbar')
const enterTeamNamePromt = document.querySelector('.enter-team-name-prompt')
const pokedexBtn = document.querySelector('.pokedex-btn')
const championsBtn = document.querySelector('.champions-btn')


//TAKES DATA FROM API AND CREATES LI'S AND FILLS POKEDEX + TEAM
export const fillPokedex = (pokemonData) => {
	const pokedexList = document.querySelector('#pokedex-list');
	const championsList = document.querySelector('#champions-list');


	pokemonData.forEach((pokemon, index) => {
		//CREATES THE POKEMON CARDS
		const pokemonCard = document.createElement('li');
		pokemonCard.classList.add('poke-card');
		if (index < 3) {
			pokemonCard.classList.add('first-three');
		}
		pokemonCard.innerHTML = `
			<img src="${pokemon.image}" alt="${pokemon.name}" />
			<h2 class="pokemon-id">${pokemon.id}. <span class="pokemon-name">${pokemon.name}</span></h2>
			<p class="pokemon-type">Type: ${pokemon.type}</p>
			<input type="text" class="nickname-input" placeholder="Enter nickname">
			<button class="btn save-nickname">Save Nickname</button>
			<button class="btn move-pokemon"></button>
		`;

		//STORES ORIGINAL POKEMON NAMES FOR LATER USER
		const pokemonNameElement = pokemonCard.querySelector('.pokemon-name');
		pokemonNameElement.setAttribute('data-original-name', pokemon.name);
		
		//FIRST THREE POKEMONS ARE ADDED TO TEAM
		if (index < 3) {
			championsList.appendChild(pokemonCard);
			pokemonCard.querySelector('.move-pokemon').innerText = 'Kick';
		} else {
			pokedexList.appendChild(pokemonCard);
			pokemonCard.querySelector('.move-pokemon').innerText = 'Promote';
		}

		
		
		giveNickname(pokemonCard)
		addMoveEventListener(pokemonCard, pokedexList, championsList);
		resetName(pokemonCard, pokemon)
	});
}

// ALLOWS USER TO GIVE NICKNAME
export function giveNickname(pokemonCard) {
		const saveNicknameButton = pokemonCard.querySelector('.save-nickname');
        const nicknameInput = pokemonCard.querySelector('.nickname-input');
        const pokemonNameElement = pokemonCard.querySelector('.pokemon-name');

        saveNicknameButton.addEventListener('click', () => {
            const nickname = nicknameInput.value.trim();
            if (nickname !== '') {
                pokemonNameElement.innerText = nickname;
            }
			nicknameInput.value = '';
        });

}

//RESET NICKNAME TO ORIGINAL NAME
export function resetName(pokemonCard) {
	const resetNamesBtn = document.querySelector('.reset-names-btn')
    const pokemonName = pokemonCard.querySelector('.pokemon-name');
	
    resetNamesBtn.addEventListener('click', () => {
        const originalName = pokemonName.getAttribute('data-original-name');
        pokemonName.innerText = originalName;
    })
}



// START ADVENTURE -- PICK A TEAM NAME 

navbar.classList.add('hidden')
secondContainer.classList.add('hidden')
thirdContainer.classList.add('hidden')
enterTeamNamePromt.classList.add('invisible')

// start image clicked: hide start screen and show team
startAdventure.addEventListener('click', (event) => {
	event.preventDefault()
	const textValue = enterTeamName.value.trim();

	if(textValue !== '') {
		teamName.innerText += textValue
		firstContainer.classList.add('hidden')
		secondContainer.classList.remove('hidden')
		navbar.classList.remove('hidden')
		fetchPokemon()
	} else {
		//SHOW ENTER TEAM NAME MESSAGE
		enterTeamNamePromt.classList.remove('invisible')

	}
	setTimeout(() => {
		enterTeamNamePromt.classList.add('invisible')
	}, 1500);
})


//CHANGE BETWEEN VIEWS
championsBtn.addEventListener('click', () => {
	secondContainer.classList.remove('hidden')
	thirdContainer.classList.add('hidden')
})

pokedexBtn.addEventListener('click', () => {
	thirdContainer.classList.remove('hidden')
	secondContainer.classList.add('hidden')

})


//POKEMON SEARCH FUNCTION
searchPokemon.addEventListener('input', () => {
    const searchTerm = searchPokemon.value.toUpperCase();
    const pokeCards = document.querySelectorAll('.poke-card');

    pokeCards.forEach(pokeCard => {
        if (pokeCard.querySelector('.pokemon-name').innerText.toUpperCase().includes(searchTerm)){
            pokeCard.style.display = 'block';
        } else {
            pokeCard.style.display = 'none';
        }
    })
});


