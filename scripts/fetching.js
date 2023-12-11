import { generateList } from "./dom.js";
import { fillPokedex } from "./dom.js";


generateList.addEventListener('click', () => {
	fetchPokemon()
})



const promises = [];
export const fetchPokemon = async () => {
	// hämtar 1 > ??? antal pokemon.
	for (let i = 1; i <= 10; i++) {
		const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
		promises.push(fetch(url).then((res) => res.json()));
	}

	try {
		const results = await Promise.all(promises);

		const pokemon = results.map((data) => ({
			name: data.name,
			id: data.id,
			image: data.sprites['front_default'],
			type: data.types.map((type) => type.type.name).join(', ')
		}));
		console.log(pokemon);

		// call function in dom.js
		fillPokedex(pokemon);
	} catch (error) {
		console.log(error.message);
	}
}



