const pokedex = document.querySelector('#reserve-list')
const championsList = document.querySelector('#champions-list')
const searchPokemon = document.querySelector('#search-pokemon')
export const startAdventure = document.querySelector('.start-adventure')
const firstContainer = document.querySelector('.first')
const secondContainer = document.querySelector('.second')
const thirdContainer = document.querySelector('.third')
const enterTeamName = document.querySelector('#enter-team-name')
const teamName = document.querySelector('.team-name')
const toggleView = document.querySelectorAll('.toggle-view')

// Returnerar en sträng med HTML för en pokemon
function createPokemonCard(pokemon, promoteKickBtn, promoteKickBtnText) {
	return`
		<pokemonCardLi class="poke-card">
			<img class="card-image" src="${pokemon.image}"/>
			<h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
			<p class="card-subtitle">Type: ${pokemon.type}</p>
			<input type="text" class="nickname-input" placeholder="Enter nickname">
            <button class="btn save-nickname">Save Nickname</button>
			<button class="btn ${promoteKickBtn}">${promoteKickBtnText}</button>
			<p class="team-is-full invisible">Your team is full</p>
		</pokemonCardLi>`;
}

export const fillPokedex = (pokemonData) => {
	pokemonData.forEach(pokemon => {
		let promoteKickBtn = 'promote';
		let promoteKickBtnText = 'Promote';
		if (championsList.childElementCount < 3) {
			promoteKickBtn = 'kick';
			promoteKickBtnText = 'Kick';
		}
		const pokemonCardLi = createPokemonCard(pokemon, promoteKickBtn, promoteKickBtnText);
		if(championsList.childElementCount < 3) {
			championsList.innerHTML += pokemonCardLi;
		} else {
			pokedex.innerHTML += pokemonCardLi;
		}
		});

		attachButtonHandlers();
		attachNicknameHandlers();
	}
	// Hanterar klick på knapparna för att ge smeknamn till pokemon
	function attachNicknameHandlers() {
		pokedex.addEventListener('click', (event) => {
			if (!event.target.matches('.save-nickname')) {
				return;
			}
			const saveBtn = event.target;
			const pokemonCard = saveBtn.closest('.poke-card');
			const nicknameInput = pokemonCard.querySelector('.nickname-input');
			const cardTitle = pokemonCard.querySelector('.card-title');

			cardTitle.innerText = nicknameInput.value;
			nicknameInput.value = '';
		})
	}
	// Hanterar klick på knapparna för att flytta pokemon mellan listorna
	function attachButtonHandlers() {
		const promoteButtons = document.querySelectorAll('.promote');
		const kickButtons = document.querySelectorAll('.kick');
	
		promoteButtons.forEach(button => {
			button.addEventListener('click', createPromoteHandler(button));
		});
		
	
		kickButtons.forEach(button => {
			button.addEventListener('click', createKickHandler(button));
		});

	}		


	
	
	function createPromoteHandler(promoteButton) {
		const promoteHandler = (event) => {
			const pokemonCard = promoteButton.closest('.poke-card');
			const pokemonName = pokemonCard.querySelector('.card-title').innerText;
			if (championsList.childElementCount < 3) {
					let pokemonCardToMove;
					if (pokemonCard.isClone) {
						pokemonCardToMove = pokemonCard;
					} else {
						pokemonCardToMove = pokemonCard.cloneNode(true);
						pokemonCardToMove.isClone = true;
						promoteButton.disabled = true;
						setTimeout(() => {
							promoteButton.disabled = false;
						}, 1000);
						// pokemonCardToMove.append(document.createTextNode(" (Clone)"));
					}
	
					championsList.append(pokemonCardToMove);

					const kickBtn = pokemonCardToMove.querySelector('.promote');
					kickBtn.innerText = 'Kick';
					kickBtn.classList.remove('promote');
					kickBtn.classList.add('kick');
	
					kickBtn.removeEventListener('click', promoteHandler);
					kickBtn.addEventListener('click', createKickHandler(kickBtn));

					attachNicknameHandlers();

					showTeamIsFullMessage(pokemonCard, `${pokemonName} is now a champion!`)

				} else {
					showTeamIsFullMessage(pokemonCard, 'Your team is full');
				}
		};
		return promoteHandler;
	}
	
	function showTeamIsFullMessage(pokemonCard, message) {
		const teamIsFull = pokemonCard.querySelector('.team-is-full');
		teamIsFull.innerText = message;
		if (teamIsFull.classList.contains('invisible')) {
			teamIsFull.classList.remove('invisible');

			setTimeout(() => {
				teamIsFull.classList.add('invisible');
			}, 1000);
		}
	}
	
	function createKickHandler(button) {
		const kickHandler = (event) => {
			const pokemonCard = button.closest('.poke-card');
			pokedex.append(pokemonCard);
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
