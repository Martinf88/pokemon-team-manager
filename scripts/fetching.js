import { fillPokedex } from "./dom.js";


export const fetchPokemon = async () => {
    try {
        // Fetch the list of all Pokemon
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10');
        const data = await response.json();
        const allPokemon = data.results;

        // Fetch details for each Pokemon
        const promises = allPokemon.map(pokemon => fetch(pokemon.url).then(res => res.json()));
        const results = await Promise.all(promises);

        const pokemon = results.map((data) => ({
            name: data.name,
            id: data.id,
            image: data.sprites['front_default'],
            type: data.types.map((type) => type.type.name).join(', ')
        }));

        console.log(pokemon);

        // calls function in dom.js
        fillPokedex(pokemon);
    } catch (error) {
        console.log(error.message);
    }
}