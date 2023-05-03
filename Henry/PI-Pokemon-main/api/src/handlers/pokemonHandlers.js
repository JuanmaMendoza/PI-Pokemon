const { getPokemonsByNameController } = require('../Controllers/getPokemonsByNameController');
const { getPokemonByIdController } = require('../Controllers/getPokemonByIdController');
const { getPokemonDataController } = require('../Controllers/getPokemonDataController');
const { Type , Pokemon } = require('../db');
const { getPokemonTypesFromDb } = require('../utils/helpers');
const { validate } = require('uuid');



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
        res.status(404).json(error.message);
    }
};

const getPokemonDataHandler = async (req , res) => {
    let { name } = req.query;
    try {
        //si no hay query
        if(!name) {
            const allPokemons = await getPokemonDataController();
            return res.status(200).json(allPokemons);
        }

        //si hay query
        const pokemon = await getPokemonsByNameController(name);
        if(!pokemon) throw Error(`No hay un Pokemon de nombre ${name}`);
        return res.status(200).json(pokemon);
    }
    catch(error) {
        res.status(404).send(error.message);
    }
}

const getPokemonByIdHandler = async (req, res) => {
    const { idPokemon } = req.params;
    try {
        //primero tengo que validar el uuid
        if(validate(idPokemon)) {
            //busco en db

            const pokemonInDb = await Pokemon.findByPk(idPokemon);

            if(pokemonInDb) {
                const pokemonTypes = await getPokemonTypesFromDb(pokemonInDb);
                console.log(pokemonTypes);
                return res.status(200).json({...pokemonInDb , types: pokemonTypes});
            }
        }
        if(!parseInt(idPokemon)) throw Error('El ID debe ser un número entero o un UUID.');

        //busco en la api
        const pokemonInApi = await getPokemonByIdController(idPokemon);
        if(!pokemonInApi) throw Error(`El pokemon con ID ${idPokemon} no existe.`);
        return res.status(200).json(pokemonInApi);
    }
    catch(error){
        res.status(404).send(error.message);
    }
};

module.exports = {
    postHandler,
    getPokemonByIdHandler,
    getPokemonDataHandler
}