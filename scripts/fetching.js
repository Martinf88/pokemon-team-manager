import { fillPokedex } from "./dom.js";

const promises = [];
export const fetchPokemon = async () => {
	
	for (let i = 1; i <= 6; i++) {
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

// export const fetchPokemon = async () => {
//     try {
//         // Fetch the list of all Pokemon
//         const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1118');
//         const data = await response.json();
//         const allPokemon = data.results;

//         // Fetch details for each Pokemon
//         const promises = allPokemon.map(pokemon => fetch(pokemon.url).then(res => res.json()));
//         const results = await Promise.all(promises);

//         const pokemon = results.map((data) => ({
//             name: data.name,
//             id: data.id,
//             image: data.sprites['front_default'],
//             type: data.types.map((type) => type.type.name).join(', ')
//         }));

//         console.log(pokemon);

//         // call function in dom.js
//         fillPokedex(pokemon);
//     } catch (error) {
//         console.log(error.message);
//     }
// }