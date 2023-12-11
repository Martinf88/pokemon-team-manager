export const generateList = document.querySelector('.generate-list')
const pokemonList = document.querySelector('#pokemon-list')
const championsList = document.querySelector('#champions-list')

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
		// Flyttar hela li-elementet när knappen klickas.
		button.addEventListener('click', (event) => {
			if(event.target.classList.contains('promote')){
				const listItem = button.closest('.poke-card');
				championsList.append(listItem);
				button.innerText = 'Kick'
				event.target.classList.remove('promote')
				event.target.classList.add('kick')
			} else {
				const listItem = event.target.closest('.poke-card');
				pokemonList.append(listItem);
				button.innerText = 'Promote';
				event.target.classList.remove('kick')
				event.target.classList.add('promote')
			}
		});
	})
}

