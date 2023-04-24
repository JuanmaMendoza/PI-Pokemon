const createPokemonHandler = (req, res) => {
    const {name} = req.body;
    res.status(200).send('creaste un usuario');
}

module.exports = {createPokemonHandler};