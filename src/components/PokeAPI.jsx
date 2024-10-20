import { v4 as uuidv4 } from 'uuid';

const pokeAPI = `https://pokeapi.co/api/v2/pokemon?limit=150&offset=0`;

export const fetchData = async () => {
    try {
        const response = await fetch(pokeAPI);
        const data = await response.json();
        const selectedPokemon = [];
        while (selectedPokemon.length < 20) {
            const randomIndex = Math.floor(Math.random() * data.results.length);
            const selected = data.results.splice(randomIndex, 1)[0];
            if (selected) {
                selectedPokemon.push(selected);
            }
        }
        const promises = selectedPokemon.map(async (pokemon) => {
            const pokemonResponse = await fetch(pokemon.url);
            const pokemonData = await pokemonResponse.json();
            return {
                name: pokemon.name,
                image: pokemonData.sprites.front_default,
                id: uuidv4(),
                species: pokemonData.species.name
            }
        })
        const pokemonList = await Promise.all(promises);
        console.log(pokemonList);
        return pokemonList;
    } catch(error) {
        console.log('Error fetching data', error);
    }
}