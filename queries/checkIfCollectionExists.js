const db = require('../config/db');

async function checkIfCollectionExists({ collectionId }) {
    try {
        const x = await db.query(`Select * from collections where id = ${collectionId}`);
        return {
            success: x.rows.length > 0,
            err: null
        };
    }
    catch (err) {
        console.log(err);
        return {
            success: false,
            err: 'Internal server error!'
        };
    }
}

module.exports = checkIfCollectionExists;