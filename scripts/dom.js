export const generateList = document.querySelector('.generate-list')
const pokemonList = document.querySelector('#pokemon-list')
const championsList = document.querySelector('#champions-list')
const searchPokemon = document.querySelector('#search-pokemon')
const startAdventure = document.querySelector('.start-adventure')
const firstContainer = document.querySelector('.first')
const secondContainer = document.querySelector('.second')
const thirdContainer = document.querySelector('.third')
const enterTeamName = document.querySelector('#enter-team-name')
const teamName = document.querySelector('.team-name')

// triggered by event in fetching.js
// fills up pokedex
export const fillPokedex = (pokemon) => {
	const li = pokemon.map(pokemon => `
	<li class="poke-card">
		<img class="card-image" src="${pokemon.image}"/>
		<h2 class="card-title">${pokemon.id}, ${pokemon.name}</h2>
		<p class="card-subtitle">Type: ${pokemon.type}</p>
		<button class="promote btn">Promote</button>
	</li>
	`).join('');
	pokemonList.innerHTML = li;

	const promoteButtons = document.querySelectorAll('.promote');
	promoteButtons.forEach(button => {
		// moves pokemon from one list to another when button is clicked
		button.addEventListener('click', (event) => {

			if(event.target.classList.contains('promote')){
				const listItem = button.closest('.poke-card');
				
				if (championsList.childElementCount < 3) {
					championsList.append(listItem);
					button.innerText = 'Kick'
					event.target.classList.remove('promote')
					event.target.classList.add('kick')
				//if team has 3 adding more is prevented
				}else {
					const teamIsFull = document.createElement('p')
					teamIsFull.innerText = 'Your team is at full capasity';
					button.style.display = 'none';
					teamIsFull.style.color = 'red';
					listItem.appendChild(teamIsFull)
					setTimeout(() => {
						listItem.removeChild(teamIsFull);
						button.style.display = 'inline-block';
					  }, 600);
				}
			} 
			else {
				const listItem = event.target.closest('.poke-card');
				pokemonList.append(listItem);
				button.innerText = 'Promote';
				event.target.classList.remove('kick')
				event.target.classList.add('promote')
			}
		});
	})

	//POKEDEX SEARCH FUNCTION
	searchPokemon.addEventListener('input', () => {
		
		const searchTerm = searchPokemon.value.toUpperCase();
		const pokeCards = document.querySelectorAll('.poke-card');

		pokeCards.forEach(pokeCard => {
			if (pokeCard.querySelector('.card-title').innerText.toUpperCase().includes(searchTerm)){
				pokeCard.style.display = 'block';
			} else {
				pokeCard.style.display = 'none';
			}
		})
	}); 
	
}


// START ADVENTURE -- PICK A TEAM NAME 

// start image clicked: hide start screen and show team visualViewport

startAdventure.addEventListener('click', (event) => {
	event.preventDefault()
	const textValue = enterTeamName.value.trim();

	if(textValue !== '') {
		//lägg till namn i team name på mina andra vyer
		//dölj firstContainer & visa secondContainer
		teamName.innerText += textValue
		firstContainer.style.display = 'none'
		secondContainer.style.display = 'block'
	} else {
		//uppmana användaren till att skriva in ett lagnamn
	}
})

