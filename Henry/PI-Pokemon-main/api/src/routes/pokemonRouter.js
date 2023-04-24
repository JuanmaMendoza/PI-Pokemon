const {Router} = require('express');
const {
    getAllPokemonHandler,
    getPokemonDetailsHandler,
    getPokemonsByNameHandler,
} = require('../handlers/pokemonHandlers');

const pokemonRouter = Router();

pokemonRouter.get('/' , getAllPokemonHandler );
pokemonRouter.get('/:id' , getPokemonDetailsHandler);
pokemonRouter.get('/' , getPokemonsByNameHandler);

module.exports = pokemonRouter;

