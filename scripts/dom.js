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
	console.log(pokemonList);

	const promoteButtons = document.querySelectorAll('.promote');
	promoteButtons.forEach(button => {
		button.addEventListener('click', () => {
		  // Flyttar hela li-elementet när knappen klickas.
		  const listItem = button.closest('.poke-card');
		  championsList.appendChild(listItem);
		});
	})
}

