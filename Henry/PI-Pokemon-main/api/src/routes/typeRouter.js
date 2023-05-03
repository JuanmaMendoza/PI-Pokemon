const {Router} = require('express');
const {getTypeDataHandler} = require('../handlers/typeHandler');

const typeRouter = Router();

typeRouter.get('/' , getTypeDataHandler);

module.exports = typeRouter;