const { Type } = require('../db');


const saveTypeDataController = async (allTypes) => {
    try {
        const savedTypes = Type.bulkCreate(allTypes);
        return savedTypes;
    }
    catch(error) {
        throw Error(error.message);
    };
};


module.exports = saveTypeDataController;