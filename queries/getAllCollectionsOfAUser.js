const db = require('../config/db');

async function getAllCollectionsOfAUser({ userId }) {
    try {
        const x = await db.query(`Select * from collections where user_id = ${userId}`);
        return {
            success: true,
            collections: x.rows,
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

module.exports = getAllCollectionsOfAUser;