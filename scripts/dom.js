import { addMoveEventListener } from './movePokemons.js';
import { fetchPokemon } from "./fetching.js";
export const startAdventure = document.querySelector('.start-adventure')
const firstContainer = document.querySelector('.first')
const secondContainer = document.querySelector('.second')
const thirdContainer = document.querySelector('.third')
const enterTeamName = document.querySelector('#enter-team-name')
const teamName = document.querySelector('.team-name')
const toggleView = document.querySelectorAll('.toggle-view')
const searchPokemon = document.querySelector('#search-pokemon');
const navbar = document.querySelector('.navbar')
const enterTeamNamePromt = document.querySelector('.enter-team-name-prompt')



export const fillPokedex = (pokemonData) => {
	const pokedexList = document.querySelector('#pokedex-list');
	const championsList = document.querySelector('#champions-list');

	pokemonData.forEach((pokemon, index) => {
		const pokemonCard = document.createElement('li');
		pokemonCard.classList.add('poke-card');
		pokemonCard.innerHTML = `
			<img src="${pokemon.image}" alt="${pokemon.name}" />
			<h2 class="pokemon-id">${pokemon.id}. <span class="pokemon-name">${pokemon.name}</span></h2>
			<p class="pokemon-type">Type: ${pokemon.type}</p>
			<input type="text" class="nickname-input" placeholder="Enter nickname">
			<button class="btn save-nickname">Save Nickname</button>
			<button class="btn move-pokemon"></button>
		`;

		if (index < 3) {
			championsList.appendChild(pokemonCard);
			pokemonCard.querySelector('.move-pokemon').innerText = 'Kick';
		} else {
			pokedexList.appendChild(pokemonCard);
			pokemonCard.querySelector('.move-pokemon').innerText = 'Promote';
		}

		addMoveEventListener(pokemonCard, pokedexList, championsList);

	});
}



// START ADVENTURE -- PICK A TEAM NAME 

navbar.classList.add('hidden')
secondContainer.classList.add('hidden')
thirdContainer.classList.add('hidden')
enterTeamNamePromt.classList.add('invisible')

// start image clicked: hide start screen and show team visualViewport

startAdventure.addEventListener('click', (event) => {
	event.preventDefault()
	const textValue = enterTeamName.value.trim();

	if(textValue !== '') {
		//lägg till namn i team name på mina andra vyer
		//dölj firstContainer & visa secondContainer
		teamName.innerText += textValue
		firstContainer.classList.add('hidden')
		secondContainer.classList.remove('hidden')
		navbar.classList.remove('hidden')
		fetchPokemon()
	} else {
		//uppmana användaren till att skriva in ett lagnamn
		enterTeamNamePromt.classList.remove('invisible')

	}
	setTimeout(() => {
		enterTeamNamePromt.classList.add('invisible')
	}, 1500);
})


toggleView.forEach(button => {

	button.addEventListener('click', () => {
		if (thirdContainer.classList.contains('hidden')){
			secondContainer.classList.add('hidden')
			thirdContainer.classList.remove('hidden')
		} else {
			secondContainer.classList.remove('hidden')
			thirdContainer.classList.add('hidden')
		}
	})
})

//POKEDEX SEARCH FUNCTION
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


