const axios = require('axios');
const { parsePokemon, getPokemonTypesFromDb } = require('../utils/helpers')
const { Pokemon } = require('../db')


const getPokemonDataController = async () => {
    try {
        //pokemons en la db
        const pokemonsInDb = await Pokemon.findAll();
        const completedPokemonsInDb = await Promise.all(
            pokemonsInDb.reverse().map(async (pokemonInDb) => {
                //busca type mediante tabla asociativa con el helper
                const pokemonTypes = await getPokemonTypesFromDb(pokemonInDb);
                const completePokemon = {
                    ...pokemonInDb.dataValues, types: pokemonTypes
                };
                return completePokemon;
            })
        );

        //pokemons en la api
        const pokemonPromises = [];
        let i = 1;    

        while( i <= 120){
            let apiData = await axios(`https://pokeapi.co/api/v2/pokemon/${i}`);
            pokemonPromises.push(apiData);
            i++;
        }

        const rawPokemons = (await Promise.all(pokemonPromises)).map(
            (response) => response.data); 
        
        const parsedPokemons = rawPokemons.map((pokemon) => parsePokemon(pokemon));

        const allPokemons = [...completedPokemonsInDb, ...parsedPokemons];
        return allPokemons;
    }
    catch(error) {  
        throw Error(error.message);
    };
};

module.exports = {getPokemonDataController};