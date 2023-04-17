


const getAllPokemonHandler = (req, res) => {
    res.status(200).send('estas tratando de hacer el get de todos los pokemones de la api');
};

const getPokemonDetailsHandler = (req, res) => {
    const {id} = req.params;
    res.status(200).send(`estas tratando de hacer get de los details de ${id}`);
};

const getPokemonsByNameHandler = (req, res) => {
    const {name} = req.query;
    res.status(200).send(`estas haciendo el get del pokemon ${name}`);
};

module.exports = {
    getAllPokemonHandler,
    getPokemonDetailsHandler,
    getPokemonsByNameHandler
}
