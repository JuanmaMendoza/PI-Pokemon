const {Router} = require('express');
const {
    getPokemonsByNameHandler,
    getPokemonByIdHandler,
    getPokemonDataHandler,
} = require('../handlers/pokemonHandlers');
const { Type , Pokemon } = require('../db');
const { getPokemonTypesFromDb } = require('../utils/helpers');
const { validate } = require('uuid');

const pokemonRouter = Router();
const postHandler = async (req, res) => {
    try {
        const {name , image, hp, attack, defense, speed, height, weight, types} = req.body;

        //busca type ids en db
        const filteredDbTypes = (await Type.findAll()).filter((type) => type.includes(type.name));
        const typeIds = filteredDbTypes.map((type) => type.id);
        console.log(typeIds); 

        //asosiacion
        if(!typeIds.lenght)
        throw Error('La tabla de Tipos debe inicializarse antes que la de Pokemons');

        const newPokemon = await Pokemon.create({
            name,
            image,
            hp,
            attack,
            defense,
            speed,
            height,
            weight
        });
        await newPokemon.addTypes(typeIds);

        res.status(200).json({ ...newPokemon.dataValues , types: types})
    }
    catch(error) {
        res.status(400).json(error.message);
    }
} 

pokemonRouter.post('/' , postHandler);



pokemonRouter.get('/' , );




pokemonRouter.get('/' , getPokemonsByNameHandler);

module.exports = pokemonRouter;

