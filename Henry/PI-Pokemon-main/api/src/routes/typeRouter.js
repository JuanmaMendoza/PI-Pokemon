const {Router} = require('express');
const {getTypeDataHandler, saveTypeDataHandler} = require('../handlers/typeHandler');

const typeRouter = Router();

typeRouter.post('/' , getTypeDataHandler);
typeRouter.post('/' , saveTypeDataHandler);


module.exports = typeRouter;