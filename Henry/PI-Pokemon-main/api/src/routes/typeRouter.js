const {Router} = require('express');
const {createPokemonHandler} = require('../handlers/typeHandler');

const postRouter = Router();

postRouter.post('/' , createPokemonHandler);

module.exports = postRouter;