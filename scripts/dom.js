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
const toggleView = document.querySelectorAll('.toggle-view')

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
				//closest parent element to button
				const listItem = button.closest('.poke-card');
				
				if (championsList.childElementCount < 3) {
					const clonedListItem = listItem.cloneNode(true); // Clone the listItem
					championsList.append(clonedListItem);
				
					const clonedButton = clonedListItem.querySelector('.promote');
					clonedButton.innerText = 'Kick';
					clonedButton.classList.remove('promote');
					clonedButton.classList.add('kick');

					//click event for clone. fix so that it kan be added again later without making another clone
					clonedButton.addEventListener('click', () => {
						pokemonList.append(clonedListItem)
						clonedListItem.innerHTML += '<p>clone</p>'
						clonedButton.innerText = 'Promote';
						clonedButton.classList.remove('kick');
						clonedButton.classList.add('promote');
					})
				} 
				//if team has 3 adding more is prevented
				else {
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

secondContainer.classList.add('hidden')
thirdContainer.classList.add('hidden')

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
	} else {
		//uppmana användaren till att skriva in ett lagnamn
	}
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
