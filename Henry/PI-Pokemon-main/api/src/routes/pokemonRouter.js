const {Router} = require('express');
const {
    getAllPokemonHandler,
    getPokemonDetailsHandler,
    getPokemonsByNameHandler
} = require('./pokemonHandlers');

const pokemonRouter = Router();

pokemonRouter.get('/pokemons' , getAllPokemonHandler );
pokemonRouter.get(`/pokemons/:id` , getPokemonDetailsHandler);
pokemonRouter.get(`/pokemons/?name` , getPokemonsByNameHandler);

module.exports = pokemonRouter;