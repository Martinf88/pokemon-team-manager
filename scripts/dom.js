const pokemonList = document.querySelector('#pokemon-list')
const championsList = document.querySelector('#champions-list')
const searchPokemon = document.querySelector('#search-pokemon')
export const startAdventure = document.querySelector('.start-adventure')
const firstContainer = document.querySelector('.first')
const secondContainer = document.querySelector('.second')
const thirdContainer = document.querySelector('.third')
const enterTeamName = document.querySelector('#enter-team-name')
const teamName = document.querySelector('.team-name')
const toggleView = document.querySelectorAll('.toggle-view')

function createPokemonCard(pokemon, buttonClass, buttonText) {
	return`
		<li class="poke-card">
			<img class="card-image" src="${pokemon.image}"/>
			<h2 class="card-title">${pokemon.id}, ${pokemon.name}</h2>
			<p class="card-subtitle">Type: ${pokemon.type}</p>
			<input type="text" class="nickname-input" placeholder="Enter nickname">
            <button class="btn save-nickname">Save Nickname</button>
			<button class="btn ${buttonClass}">${buttonText}</button>
		</li>`;
}

export const fillPokedex = (pokemon) => {
	pokemon.forEach(pokemon => {
		let buttonClass = 'promote';
		let buttonText = 'Promote';
		if (championsList.childElementCount < 3) {
			buttonClass = 'kick';
			buttonText = 'Kick';
		}
		const li = createPokemonCard(pokemon, buttonClass, buttonText);
		if(championsList.childElementCount < 3) {
			championsList.innerHTML += li;
		} else {
			pokemonList.innerHTML += li;
		}
		});

		attachButtonHandlers();
		attachNicknameHandlers();
	}
	
	function attachNicknameHandlers() {
		const saveNickname = document.querySelectorAll('.save-nickname');

		saveNickname.forEach(button => {
			button.addEventListener('click', () => {
				const listItem = button.closest('.poke-card');
				const nicknameInput = listItem.querySelector('.nickname-input');
				const cardTitle = listItem.querySelector('.card-title');

				cardTitle.innerText = nicknameInput.value;
				nicknameInput.value = '';
			})
		})
	}

	function attachButtonHandlers() {
		const promoteButtons = document.querySelectorAll('.promote');
		const kickButtons = document.querySelectorAll('.kick');
	
		promoteButtons.forEach(button => {
			button.addEventListener('click', createPromoteHandler(button))
		});
		
	
		kickButtons.forEach(button => {
			button.addEventListener('click', createKickHandler(button));
		});

	}		


	

	function createPromoteHandler(button) {
		const promoteHandler = (event) => {
			const listItem = button.closest('.poke-card');
				if (championsList.childElementCount < 3) {
					let listItemToMove;
					if (listItem.isClone) {
						listItemToMove = listItem;
					} else {
						listItemToMove = listItem.cloneNode(true);
						listItemToMove.isClone = true;
						// listItemToMove.append(document.createTextNode(" (Clone)"));
					}
	
					championsList.append(listItemToMove);
	
					const buttonToMove = listItemToMove.querySelector('.promote');
					buttonToMove.innerText = 'Kick';
					buttonToMove.classList.remove('promote');
					buttonToMove.classList.add('kick');
	
					buttonToMove.removeEventListener('click', promoteHandler);
					buttonToMove.addEventListener('click', createKickHandler(buttonToMove));

					attachNicknameHandlers();
				} else {

					showTeamIsFullMessage(listItem);
				}
		};
	
		return promoteHandler;
	}

	function showTeamIsFullMessage(listItem) {
		// Check if a 'teamIsFull' element already exists
		const teamIsFull = document.createElement('p');
		if (!listItem.querySelector('.teamIsFull')) {
			teamIsFull.className = 'teamIsFull'; // Add a class for easy reference
			teamIsFull.innerText = 'Your team is at full capacity';
			teamIsFull.style.color = 'red';
			listItem.appendChild(teamIsFull);
			setTimeout(() => {
				listItem.removeChild(teamIsFull);
			}, 1000);
		}
	}
	
	function createKickHandler(button) {
		const kickHandler = (event) => {
			const listItem = button.closest('.poke-card');
			pokemonList.append(listItem);
			button.innerText = 'Promote';
			button.classList.remove('kick');
			button.classList.add('promote');
	
			button.removeEventListener('click', kickHandler);
			button.addEventListener('click', createPromoteHandler(button));
		};
	
		return kickHandler;
	}

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
