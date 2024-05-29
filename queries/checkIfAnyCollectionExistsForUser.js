const db = require('../config/db');

async function checkIfAnyCollectionExistsForUser({ userId }) {
    try {
        const x = await db.query(`Select * from collections where user_id = ${userId}`);
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

module.exports = checkIfAnyCollectionExistsForUser;