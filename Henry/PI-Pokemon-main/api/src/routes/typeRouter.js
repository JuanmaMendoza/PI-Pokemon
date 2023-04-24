const {Router} = require('express');
const {createPokemonHandler} = require('../handlers/typeHandler');

const typeRouter = Router();

typeRouter.post('/' , createPokemonHandler);

module.exports = typeRouter;