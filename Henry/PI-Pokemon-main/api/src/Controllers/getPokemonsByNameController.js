const axios = require('axios');
const { parsePokemon, getPokemonTypesFromDb } = require('../utils/helpers')
const { Pokemon } = require('../db')

const getPokemonsByNameController = async (name) => {
    try {
        const nameNomalized = name.toLowerCase();
        //lo busco en la db
        const pokemonInDb = await Pokemon.findOne({
            where: {name:nameNomalized},
        })
        if(pokemonInDb){
            const pokemonTypes = await getPokemonTypesFromDb(pokemonInDb);
            console.log(pokemonTypes);
            return {...pokemonInDb.dataValues , types: pokemonTypes}
        }

        //lo busco en la api
        const rawPokemon = (await axios(`https://pokeapi.co/api/v2/pokemon/${nameNomalized}`))
        .data;
        const pokemon = parsePokemon(rawPokemon);
        return pokemon;
    }
    catch(error) {
        console.log(error.message);
    }
};

module.exports = {getPokemonsByNameController};