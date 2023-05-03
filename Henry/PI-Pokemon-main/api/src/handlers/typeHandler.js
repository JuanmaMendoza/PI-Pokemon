const { Type } = require("../db");
const {getTypeDataController} = require("../Controllers/getTypeDataController");
const {saveTypeDataController} = require("../Controllers/saveTypeDataController");


const getTypeDataHandler = async (req, res) => {
    try {
        // lo busco en db
        const dbTypes = await Type.findAll();
        if (Object.keys(dbTypes).length) {
            return res.status(200).json(dbTypes);
        }
        //si no esta en db, lo busco en la api y lo guardo en la db
        const allTypes = await getTypeDataController();
        const savedTypes = await saveTypeDataController(allTypes);
        return res.status(200).json(savedTypes);
    }
    catch (error) {
        res.status(404).send(error.message);
    }
}

module.exports = { getTypeDataHandler };
