const {Router} = require('express');
const {
    postHandler,
    getPokemonByIdHandler,
    getPokemonDataHandler,
} = require('../handlers/pokemonHandlers');

const pokemonRouter = Router();

pokemonRouter.post('/' , postHandler);
pokemonRouter.get('/' , getPokemonDataHandler);
pokemonRouter.get('/:idPokemon' , getPokemonByIdHandler);

module.exports = pokemonRouter;

