const axios = require('axios');
const { parsePokemon, getPokemonTypesFromDb } = require('../utils/helpers')
const { Pokemon } = require('../db')

const getPokemonsByNameHandler = async (name) => {
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

const getPokemonDataHandler = async () => {
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

const getPokemonByIdHandler = async (id) => {
    try{
        //busco en la api
        const rawPokemon = (await axios(`https://pokeapi.co/api/v2/pokemon/${id}`))
            .data;
        const pokemon = parsePokemon(rawPokemon);
        return pokemon;
    }
    catch(error) {
        return false;
    }
};




module.exports = {
    getPokemonDataHandler,
    getPokemonByIdHandler,
    getPokemonsByNameHandler
}
